import { memo } from 'react'
import type { OrderStatus } from '../types/order'

export interface StatusBadgeProps {
  status: OrderStatus
}

interface StatusStyleConfig {
  label: string
  badgeClass: string
  dotClass: string
}

const STATUS_CONFIG: Record<OrderStatus, StatusStyleConfig> = {
  new: {
    label: 'جديد',
    badgeClass:
      'bg-status-new-bg text-status-new-text border-status-new-border',
    dotClass: 'bg-status-new-dot',
  },
  in_transit: {
    label: 'في الطريق',
    badgeClass:
      'bg-status-transit-bg text-status-transit-text border-status-transit-border',
    dotClass: 'bg-status-transit-dot',
  },
  delivered: {
    label: 'تم التوصيل',
    badgeClass:
      'bg-status-delivered-bg text-status-delivered-text border-status-delivered-border',
    dotClass: 'bg-status-delivered-dot',
  },
}

export const StatusBadge = memo(function StatusBadge({
  status,
}: StatusBadgeProps) {
  const config = STATUS_CONFIG[status]

  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold leading-none ${config.badgeClass}`}
    >
      <span
        className={`h-1.5 w-1.5 shrink-0 rounded-full ${config.dotClass}`}
        aria-hidden="true"
      />
      <span>{config.label}</span>
    </span>
  )
})
