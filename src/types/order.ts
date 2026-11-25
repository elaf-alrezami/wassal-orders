export type OrderStatus = 'new' | 'in_transit' | 'delivered'

export type SortOption = 'date-desc' | 'date-asc' | 'amount-desc' | 'amount-asc'

export type AsyncStatus = 'loading' | 'error' | 'success'

export interface Order {
  id: string
  customerName: string
  amount: number
  createdAt: string
  status: OrderStatus
}
