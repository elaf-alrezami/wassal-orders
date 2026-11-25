import type { Order, SortOption } from '../types/order'

function parseTimestamp(isoDate: string): number {
  const parsed = Date.parse(isoDate)
  return Number.isNaN(parsed) ? 0 : parsed
}

function assertUnreachable(value: never): never {
  throw new Error(`Unsupported sort option: ${String(value)}`)
}

export function sortOrders(
  orders: readonly Order[],
  sortBy: SortOption,
): Order[] {
  return [...orders].sort((a, b) => {
    switch (sortBy) {
      case 'date-desc': {
        const timeDiff = parseTimestamp(b.createdAt) - parseTimestamp(a.createdAt)
        return timeDiff !== 0 ? timeDiff : a.id.localeCompare(b.id)
      }
      case 'date-asc': {
        const timeDiff = parseTimestamp(a.createdAt) - parseTimestamp(b.createdAt)
        return timeDiff !== 0 ? timeDiff : a.id.localeCompare(b.id)
      }
      case 'amount-desc': {
        const amountDiff = b.amount - a.amount
        if (amountDiff !== 0) {
          return amountDiff
        }
        const timeDiff = parseTimestamp(b.createdAt) - parseTimestamp(a.createdAt)
        return timeDiff !== 0 ? timeDiff : a.id.localeCompare(b.id)
      }
      case 'amount-asc': {
        const amountDiff = a.amount - b.amount
        if (amountDiff !== 0) {
          return amountDiff
        }
        const timeDiff = parseTimestamp(b.createdAt) - parseTimestamp(a.createdAt)
        return timeDiff !== 0 ? timeDiff : a.id.localeCompare(b.id)
      }
      default:
        return assertUnreachable(sortBy)
    }
  })
}
