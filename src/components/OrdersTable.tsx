import type { Order } from '../types/order'
import { formatOrderDate, formatYER } from '../utils/formatters'
import { StatusBadge } from './StatusBadge'

export interface OrdersTableProps {
  orders: readonly Order[]
}

export function OrdersTable({ orders }: OrdersTableProps) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-wasal-border bg-wasal-surface shadow-xs">
      <table className="w-full border-collapse text-start">
        <thead className="border-b border-wasal-border bg-wasal-canvas">
          <tr>
            <th
              scope="col"
              className="whitespace-nowrap px-4 py-3.5 text-start text-xs font-semibold text-wasal-muted"
            >
              رقم الطلب
            </th>
            <th
              scope="col"
              className="px-4 py-3.5 text-start text-xs font-semibold text-wasal-muted"
            >
              اسم الزبون
            </th>
            <th
              scope="col"
              className="whitespace-nowrap px-4 py-3.5 text-start text-xs font-semibold text-wasal-muted"
            >
              المبلغ
            </th>
            <th
              scope="col"
              className="whitespace-nowrap px-4 py-3.5 text-start text-xs font-semibold text-wasal-muted"
            >
              التاريخ
            </th>
            <th
              scope="col"
              className="whitespace-nowrap px-4 py-3.5 text-start text-xs font-semibold text-wasal-muted"
            >
              الحالة
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-wasal-border">
          {orders.map((order) => (
            <tr
              key={order.id}
              className="transition-colors duration-150 hover:bg-wasal-green-soft/70"
            >
              <td className="whitespace-nowrap px-4 py-3.5 text-start">
                <span
                  dir="ltr"
                  className="inline-block font-mono text-sm font-medium text-wasal-muted tabular-nums"
                >
                  {order.id}
                </span>
              </td>
              <td className="px-4 py-3.5 text-start text-sm font-semibold text-wasal-ink">
                {order.customerName}
              </td>
              <td className="whitespace-nowrap px-4 py-3.5 text-start text-sm font-bold text-wasal-ink tabular-nums">
                {formatYER(order.amount)}
              </td>
              <td className="whitespace-nowrap px-4 py-3.5 text-start text-sm text-wasal-muted tabular-nums">
                <time dateTime={order.createdAt}>
                  {formatOrderDate(order.createdAt)}
                </time>
              </td>
              <td className="whitespace-nowrap px-4 py-3.5 text-start">
                <StatusBadge status={order.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
