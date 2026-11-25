import { memo } from 'react'
import type { Order } from '../types/order'
import { formatOrderDate, formatYER } from '../utils/formatters'
import { StatusBadge } from './StatusBadge'

export interface OrderCardProps {
  order: Order
}

export const OrderCard = memo(function OrderCard({ order }: OrderCardProps) {
  return (
    <article className="rounded-2xl border border-wasal-border bg-wasal-surface p-4 shadow-xs">
      <div className="flex items-center justify-between gap-2">
        <span
          dir="ltr"
          className="inline-block font-mono text-xs font-medium text-wasal-muted tabular-nums"
        >
          {order.id}
        </span>
        <StatusBadge status={order.status} />
      </div>

      <h2 className="mt-2.5 break-words text-base font-bold text-wasal-ink">
        {order.customerName}
      </h2>

      <div className="mt-3 flex items-baseline justify-between gap-3 border-t border-wasal-border/70 pt-3">
        <p className="text-base font-bold text-wasal-ink tabular-nums">
          {formatYER(order.amount)}
        </p>
        <time
          dateTime={order.createdAt}
          className="shrink-0 text-xs font-medium text-wasal-muted tabular-nums"
        >
          {formatOrderDate(order.createdAt)}
        </time>
      </div>
    </article>
  )
})
