import type { Order, OrderStatus } from '../types/order'

export interface FetchOrdersOptions {
  signal?: AbortSignal
  forceError?: boolean
}

const MIN_LOADING_DELAY_MS = 500
const DEFAULT_FETCH_ERROR_MESSAGE =
  'تعذر تحميل قائمة الطلبات. يرجى التحقق من الاتصال والمحاولة مجدداً.'
const INVALID_PAYLOAD_ERROR_MESSAGE =
  'تعذر قراءة بيانات الطلبات بشكل صحيح. يرجى المحاولة مجدداً.'

const VALID_ORDER_STATUSES = new Set<OrderStatus>([
  'new',
  'in_transit',
  'delivered',
])

function createAbortError(): DOMException {
  return new DOMException('The operation was aborted.', 'AbortError')
}

export function isAbortError(error: unknown): boolean {
  return (
    (error instanceof DOMException && error.name === 'AbortError') ||
    (error instanceof Error && error.name === 'AbortError')
  )
}

function abortableDelay(ms: number, signal?: AbortSignal): Promise<void> {
  if (signal?.aborted) {
    return Promise.reject(createAbortError())
  }

  return new Promise<void>((resolve, reject) => {
    const onAbort = () => {
      window.clearTimeout(timerId)
      reject(createAbortError())
    }

    const timerId = window.setTimeout(() => {
      signal?.removeEventListener('abort', onAbort)
      resolve()
    }, ms)

    signal?.addEventListener('abort', onAbort, { once: true })
  })
}

function isValidOrderStatus(value: unknown): value is OrderStatus {
  return typeof value === 'string' && VALID_ORDER_STATUSES.has(value as OrderStatus)
}

function isValidOrder(value: unknown): value is Order {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const candidate = value as Record<string, unknown>

  return (
    typeof candidate.id === 'string' &&
    candidate.id.trim().length > 0 &&
    typeof candidate.customerName === 'string' &&
    candidate.customerName.trim().length > 0 &&
    typeof candidate.amount === 'number' &&
    Number.isFinite(candidate.amount) &&
    candidate.amount >= 0 &&
    typeof candidate.createdAt === 'string' &&
    !Number.isNaN(Date.parse(candidate.createdAt)) &&
    isValidOrderStatus(candidate.status)
  )
}

export async function fetchOrders(
  options?: FetchOrdersOptions,
): Promise<Order[]> {
  const signal = options?.signal

  if (signal?.aborted) {
    throw createAbortError()
  }

  if (options?.forceError) {
    await abortableDelay(MIN_LOADING_DELAY_MS, signal)
    throw new Error(DEFAULT_FETCH_ERROR_MESSAGE)
  }

  const startedAt = Date.now()
  let response: Response

  try {
    response = await fetch(`${import.meta.env.BASE_URL}orders.json`, {
      signal,
    })
  } catch (error: unknown) {
    if (isAbortError(error) || signal?.aborted) {
      throw error
    }
    throw new Error(DEFAULT_FETCH_ERROR_MESSAGE, { cause: error })
  }

  if (!response.ok) {
    throw new Error(
      `${DEFAULT_FETCH_ERROR_MESSAGE} (رمز الاستجابة ${response.status})`,
    )
  }

  let payload: unknown
  try {
    payload = await response.json()
  } catch (error: unknown) {
    if (isAbortError(error) || signal?.aborted) {
      throw error
    }
    throw new Error(INVALID_PAYLOAD_ERROR_MESSAGE, { cause: error })
  }

  if (!Array.isArray(payload) || !payload.every(isValidOrder)) {
    throw new Error(INVALID_PAYLOAD_ERROR_MESSAGE)
  }

  const elapsed = Date.now() - startedAt
  const remainingDelay = MIN_LOADING_DELAY_MS - elapsed
  if (remainingDelay > 0) {
    await abortableDelay(remainingDelay, signal)
  }

  return payload
}
