import { useCallback, useEffect, useRef, useState } from 'react'
import { fetchOrders, isAbortError } from '../services/ordersService'
import type { AsyncStatus, Order } from '../types/order'

export interface UseOrdersResult {
  orders: Order[]
  status: AsyncStatus
  error: string | null
  retry: () => void
}

const FALLBACK_ERROR_MESSAGE =
  'تعذر تحميل قائمة الطلبات. يرجى التحقق من الاتصال والمحاولة مجدداً.'

function hasErrorQueryParam(): boolean {
  return new URLSearchParams(window.location.search).get('error') === '1'
}

function clearErrorQueryParam(): void {
  const url = new URL(window.location.href)
  if (url.searchParams.get('error') !== '1') {
    return
  }

  url.searchParams.delete('error')
  const nextUrl = `${url.pathname}${url.search}${url.hash}`
  window.history.replaceState(window.history.state, '', nextUrl)
}

export function useOrders(): UseOrdersResult {
  const [orders, setOrders] = useState<Order[]>([])
  const [status, setStatus] = useState<AsyncStatus>('loading')
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState<number>(0)

  const controllerRef = useRef<AbortController | null>(null)

  useEffect(() => {
    controllerRef.current?.abort()

    const controller = new AbortController()
    controllerRef.current = controller

    const forceError = retryCount === 0 && hasErrorQueryParam()

    fetchOrders({
      signal: controller.signal,
      forceError,
    })
      .then((data) => {
        if (controller.signal.aborted) {
          return
        }

        setOrders(data)
        setError(null)
        setStatus('success')
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted || isAbortError(err)) {
          return
        }

        const message =
          err instanceof Error && err.message.trim().length > 0
            ? err.message
            : FALLBACK_ERROR_MESSAGE

        setError(message)
        setStatus('error')
      })

    return () => {
      controller.abort()
      if (controllerRef.current === controller) {
        controllerRef.current = null
      }
    }
  }, [retryCount])

  const retry = useCallback(() => {
    clearErrorQueryParam()
    setStatus('loading')
    setError(null)
    setRetryCount((count) => count + 1)
  }, [])

  return { orders, status, error, retry }
}
