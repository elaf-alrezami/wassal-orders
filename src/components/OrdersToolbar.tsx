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

type SortField = 'date' | 'amount'
type SortDirection = 'desc' | 'asc'

const FULL_SORT_LABELS: Record<SortOption, string> = {
  'date-desc': 'الأحدث أولاً',
  'date-asc': 'الأقدم أولاً',
  'amount-desc': 'الأعلى مبلغاً',
  'amount-asc': 'الأقل مبلغاً',
}

const SHORT_DIRECTION_LABELS: Record<SortOption, string> = {
  'date-desc': 'الأحدث',
  'date-asc': 'الأقدم',
  'amount-desc': 'الأعلى',
  'amount-asc': 'الأقل',
}

function parseSortOption(sortBy: SortOption): {
  field: SortField
  direction: SortDirection
} {
  const [field, direction] = sortBy.split('-') as [SortField, SortDirection]
  return { field, direction }
}

export function OrdersToolbar({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  visibleCount,
  totalCount,
  disabled = false,
}: OrdersToolbarProps) {
  const { field: activeField, direction: activeDirection } =
    parseSortOption(sortBy)

  const handleFieldSelect = (nextField: SortField) => {
    if (nextField === activeField) {
      return
    }
    onSortChange(`${nextField}-desc`)
  }

  const handleDirectionToggle = () => {
    const nextDirection: SortDirection =
      activeDirection === 'desc' ? 'asc' : 'desc'
    onSortChange(`${activeField}-${nextDirection}`)
  }

  return (
    <section
      aria-label="أدوات البحث والترتيب"
      className="rounded-2xl border border-wasal-border bg-wasal-surface p-3 shadow-xs sm:p-4"
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:flex-1">
          <label htmlFor="order-search" className="sr-only">
            البحث باسم الزبون
          </label>

          <svg
            className="pointer-events-none absolute top-1/2 start-3.5 h-4 w-4 -translate-y-1/2 text-wasal-muted"
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
            className="min-h-[44px] w-full rounded-xl border border-wasal-border bg-wasal-canvas ps-10 pe-12 text-start text-sm text-wasal-ink placeholder:text-wasal-muted transition-colors focus-visible:border-wasal-green focus-visible:bg-wasal-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wasal-green disabled:cursor-not-allowed disabled:opacity-60"
          />

          {searchQuery.length > 0 && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              disabled={disabled}
              aria-label="مسح البحث"
              className="absolute top-1/2 end-1 inline-flex min-h-[44px] min-w-[44px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg text-wasal-muted transition-colors hover:text-wasal-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wasal-green disabled:cursor-not-allowed disabled:opacity-60"
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

        <div
          role="group"
          aria-label="ترتيب الطلبات حسب التاريخ أو المبلغ"
          className="flex w-full shrink-0 items-center gap-2 md:w-auto"
        >
          <div className="grid flex-1 grid-cols-2 gap-1 rounded-xl border border-wasal-border bg-wasal-canvas p-1 md:w-48 md:flex-none">
            <button
              type="button"
              aria-pressed={activeField === 'date'}
              disabled={disabled}
              onClick={() => handleFieldSelect('date')}
              className={`inline-flex min-h-[44px] cursor-pointer items-center justify-center gap-1.5 rounded-lg px-2.5 text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wasal-green disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm ${
                activeField === 'date'
                  ? 'bg-wasal-surface text-wasal-ink shadow-xs ring-1 ring-wasal-border/80'
                  : 'text-wasal-muted hover:text-wasal-ink'
              }`}
            >
              <svg
                className={`h-4 w-4 shrink-0 ${
                  activeField === 'date'
                    ? 'text-wasal-green-dark'
                    : 'text-wasal-muted'
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M8 2v4" />
                <path d="M16 2v4" />
                <rect width="18" height="18" x="3" y="4" rx="2" />
                <path d="M3 10h18" />
              </svg>
              <span>التاريخ</span>
            </button>

            <button
              type="button"
              aria-pressed={activeField === 'amount'}
              disabled={disabled}
              onClick={() => handleFieldSelect('amount')}
              className={`inline-flex min-h-[44px] cursor-pointer items-center justify-center gap-1.5 rounded-lg px-2.5 text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wasal-green disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm ${
                activeField === 'amount'
                  ? 'bg-wasal-surface text-wasal-ink shadow-xs ring-1 ring-wasal-border/80'
                  : 'text-wasal-muted hover:text-wasal-ink'
              }`}
            >
              <svg
                className={`h-4 w-4 shrink-0 ${
                  activeField === 'amount'
                    ? 'text-wasal-green-dark'
                    : 'text-wasal-muted'
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect width="20" height="12" x="2" y="6" rx="2" />
                <circle cx="12" cy="12" r="2" />
                <path d="M6 12h.01M18 12h.01" />
              </svg>
              <span>المبلغ</span>
            </button>
          </div>

          <button
            type="button"
            disabled={disabled}
            onClick={handleDirectionToggle}
            aria-label={`تبديل اتجاه الترتيب، الترتيب الحالي: ${FULL_SORT_LABELS[sortBy]}`}
            title={FULL_SORT_LABELS[sortBy]}
            className="inline-flex min-h-[44px] shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-wasal-border bg-wasal-surface px-3 text-xs font-semibold text-wasal-ink transition-colors hover:border-wasal-green hover:bg-wasal-green-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wasal-green disabled:cursor-not-allowed disabled:opacity-60 sm:min-w-[104px] sm:px-3.5 sm:text-sm"
          >
            <svg
              className="h-4 w-4 shrink-0 text-wasal-green-dark transition-transform duration-150"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {activeDirection === 'desc' ? (
                <>
                  <path d="M12 5v14" />
                  <path d="m19 12-7 7-7-7" />
                </>
              ) : (
                <>
                  <path d="M12 19V5" />
                  <path d="m5 12 7-7 7 7" />
                </>
              )}
            </svg>
            <span>{SHORT_DIRECTION_LABELS[sortBy]}</span>
          </button>
        </div>
      </div>

      {totalCount > 0 && (
        <div className="mt-3 flex items-center justify-between gap-2 border-t border-wasal-border/70 pt-2.5 text-xs font-medium text-wasal-muted">
          <p aria-live="polite" aria-atomic="true" className="tabular-nums">
            عرض <span className="font-bold text-wasal-ink">{visibleCount}</span>{' '}
            من <span className="font-bold text-wasal-ink">{totalCount}</span>{' '}
            طلب
          </p>
          <span className="hidden text-wasal-muted sm:inline">
            الترتيب: <strong className="font-semibold text-wasal-ink">{FULL_SORT_LABELS[sortBy]}</strong>
          </span>
        </div>
      )}
    </section>
  )
}
