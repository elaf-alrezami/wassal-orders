import type { SortOption } from '../types/order'

export interface OrdersToolbarProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  sortBy: SortOption
  onSortChange: (value: SortOption) => void
  visibleCount: number
  totalCount: number
  disabled?: boolean
}

const SORT_OPTIONS: readonly { value: SortOption; label: string }[] = [
  { value: 'date-desc', label: 'الأحدث أولاً' },
  { value: 'date-asc', label: 'الأقدم أولاً' },
  { value: 'amount-desc', label: 'الأعلى مبلغاً' },
  { value: 'amount-asc', label: 'الأقل مبلغاً' },
]

export function OrdersToolbar({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  visibleCount,
  totalCount,
  disabled = false,
}: OrdersToolbarProps) {
  return (
    <section
      aria-label="أدوات البحث والترتيب"
      className="rounded-2xl border border-wasal-border bg-wasal-surface p-3 shadow-xs sm:p-4"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:flex-1">
          <label htmlFor="order-search" className="sr-only">
            البحث باسم الزبون
          </label>

          <svg
            className="pointer-events-none absolute top-1/2 start-3 h-4 w-4 -translate-y-1/2 text-wasal-muted"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>

          <input
            id="order-search"
            type="text"
            inputMode="search"
            autoComplete="off"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            disabled={disabled}
            placeholder="ابحث باسم الزبون..."
            className="min-h-[44px] w-full rounded-xl border border-wasal-border bg-wasal-canvas/60 ps-10 pe-12 text-start text-sm text-wasal-ink placeholder:text-wasal-muted transition-colors focus-visible:border-wasal-green focus-visible:bg-wasal-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wasal-green disabled:cursor-not-allowed disabled:opacity-60"
          />

          {searchQuery.length > 0 && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              disabled={disabled}
              aria-label="مسح البحث"
              className="absolute top-1/2 end-1.5 inline-flex min-h-[44px] min-w-[44px] -translate-y-1/2 items-center justify-center rounded-lg text-wasal-muted transition-colors hover:text-wasal-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wasal-green disabled:cursor-not-allowed disabled:opacity-60"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          )}
        </div>

        <div className="flex w-full shrink-0 items-center gap-2 sm:w-auto">
          <label
            htmlFor="order-sort"
            className="shrink-0 text-xs font-semibold text-wasal-muted"
          >
            ترتيب حسب
          </label>

          <div className="relative flex-1 sm:w-44 sm:flex-none">
            <select
              id="order-sort"
              value={sortBy}
              onChange={(event) =>
                onSortChange(event.target.value as SortOption)
              }
              disabled={disabled}
              className="min-h-[44px] w-full appearance-none rounded-xl border border-wasal-border bg-wasal-surface ps-3.5 pe-9 text-start text-sm font-medium text-wasal-ink transition-colors focus-visible:border-wasal-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wasal-green disabled:cursor-not-allowed disabled:opacity-60"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <svg
              className="pointer-events-none absolute top-1/2 end-3 h-4 w-4 -translate-y-1/2 text-wasal-muted"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>
      </div>

      {totalCount > 0 && (
        <p
          aria-live="polite"
          aria-atomic="true"
          className="mt-3 border-t border-wasal-border/70 pt-2.5 text-start text-xs font-medium text-wasal-muted tabular-nums"
        >
          عرض <span className="font-bold text-wasal-ink">{visibleCount}</span>{' '}
          من <span className="font-bold text-wasal-ink">{totalCount}</span> طلب
        </p>
      )}
    </section>
  )
}
