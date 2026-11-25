import type { Order } from '../types/order'

const ARABIC_DIACRITICS_AND_TATWEEL = /[\u064B-\u065F\u0670\u0640]/g
const ALEF_VARIANTS = /[أإآ]/g

export function normalizeArabic(text: string): string {
  return text
    .replace(ARABIC_DIACRITICS_AND_TATWEEL, '')
    .replace(ALEF_VARIANTS, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .trim()
    .replace(/\s+/g, ' ')
    .toLowerCase()
}

export function filterOrdersByCustomer(
  orders: readonly Order[],
  query: string,
): Order[] {
  const normalizedQuery = normalizeArabic(query)

  if (normalizedQuery.length === 0) {
    return [...orders]
  }

  return orders.filter((order) =>
    normalizeArabic(order.customerName).includes(normalizedQuery),
  )
}
