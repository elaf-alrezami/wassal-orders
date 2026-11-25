const YER_NUMBER_FORMATTER = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 0,
})

const ORDER_DATE_FORMATTER = new Intl.DateTimeFormat('ar-EG-u-nu-latn', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
})

export function formatYER(amount: number): string {
  if (!Number.isFinite(amount)) {
    return '—'
  }

  return `${YER_NUMBER_FORMATTER.format(amount)} ر.ي`
}

export function formatOrderDate(isoDate: string): string {
  const date = new Date(isoDate)

  if (Number.isNaN(date.getTime())) {
    return '—'
  }

  return ORDER_DATE_FORMATTER.format(date)
}
