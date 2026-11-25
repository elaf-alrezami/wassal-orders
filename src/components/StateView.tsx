const MOBILE_SKELETON_COUNT = 5
const DESKTOP_SKELETON_COUNT = 6

const DEFAULT_ERROR_MESSAGE =
  'حدث خطأ أثناء تحميل قائمة الطلبات. يرجى التحقق من الاتصال والمحاولة مجدداً.'

export function LoadingState() {
  return (
    <section role="status" aria-busy="true" className="space-y-4">
      <div className="flex items-center justify-center gap-2 py-1 text-sm font-medium text-wasal-muted">
        <svg
          className="h-4 w-4 text-wasal-green-dark motion-safe:animate-spin"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
        <span>جارٍ تحميل الطلبات...</span>
      </div>

      <div aria-hidden="true" className="space-y-3 md:hidden">
        {Array.from({ length: MOBILE_SKELETON_COUNT }, (_, index) => (
          <div
            key={index}
            className="animate-pulse rounded-2xl border border-wasal-border bg-wasal-surface p-4 shadow-xs"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="h-4 w-20 rounded-md bg-wasal-border/90" />
              <div className="h-6 w-20 rounded-full bg-wasal-border/90" />
            </div>

            <div className="mt-2.5 h-6 w-40 rounded-md bg-wasal-border" />

            <div className="mt-3 flex items-center justify-between gap-3 border-t border-wasal-border/70 pt-3">
              <div className="h-6 w-24 rounded-md bg-wasal-border" />
              <div className="h-4 w-24 rounded-md bg-wasal-border/80" />
            </div>
          </div>
        ))}
      </div>

      <div
        aria-hidden="true"
        className="hidden overflow-x-auto rounded-2xl border border-wasal-border bg-wasal-surface shadow-xs md:block"
      >
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
          <tbody className="animate-pulse divide-y divide-wasal-border">
            {Array.from({ length: DESKTOP_SKELETON_COUNT }, (_, index) => (
              <tr key={index}>
                <td className="px-4 py-3.5">
                  <div className="h-4 w-20 rounded-md bg-wasal-border/90" />
                </td>
                <td className="px-4 py-3.5">
                  <div className="h-4 w-36 rounded-md bg-wasal-border" />
                </td>
                <td className="px-4 py-3.5">
                  <div className="h-4 w-24 rounded-md bg-wasal-border" />
                </td>
                <td className="px-4 py-3.5">
                  <div className="h-4 w-24 rounded-md bg-wasal-border/80" />
                </td>
                <td className="px-4 py-3.5">
                  <div className="h-6 w-20 rounded-full bg-wasal-border/90" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export interface ErrorStateProps {
  message?: string
  onRetry: () => void
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <section
      role="alert"
      className="mx-auto flex max-w-lg flex-col items-center rounded-2xl border border-wasal-border bg-wasal-surface px-6 py-10 text-center shadow-xs"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-red-200 bg-red-50 text-red-700">
        <svg
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" x2="12" y1="8" y2="12" />
          <line x1="12" x2="12.01" y1="16" y2="16" />
        </svg>
      </div>

      <h2 className="mt-4 text-lg font-bold text-wasal-ink">
        تعذر تحميل الطلبات
      </h2>

      <p className="mt-2 max-w-md text-sm leading-relaxed text-wasal-muted">
        {message ?? DEFAULT_ERROR_MESSAGE}
      </p>

      <button
        type="button"
        onClick={onRetry}
        className="mt-6 inline-flex min-h-[44px] cursor-pointer items-center justify-center rounded-xl bg-wasal-green-dark px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-wasal-green-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wasal-green focus-visible:ring-offset-2"
      >
        إعادة المحاولة
      </button>
    </section>
  )
}

export interface EmptySearchStateProps {
  query: string
  onClearSearch: () => void
}

export function EmptySearchState({
  query,
  onClearSearch,
}: EmptySearchStateProps) {
  const trimmedQuery = query.trim()
  const hasQuery = trimmedQuery.length > 0

  return (
    <section
      role="status"
      className="mx-auto flex max-w-lg flex-col items-center rounded-2xl border border-wasal-border bg-wasal-surface px-6 py-10 text-center shadow-xs"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-wasal-border bg-wasal-canvas text-wasal-muted">
        <svg
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m13.5 8.5-5 5" />
          <path d="m8.5 8.5 5 5" />
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </div>

      {hasQuery ? (
        <>
          <h2 className="mt-4 break-words text-base font-bold text-wasal-ink sm:text-lg">
            لا توجد طلبات مطابقة لـ «{trimmedQuery}»
          </h2>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-wasal-muted">
            تأكد من كتابة اسم الزبون بشكل صحيح أو امسح البحث لعرض جميع الطلبات.
          </p>
          <button
            type="button"
            onClick={onClearSearch}
            className="mt-6 inline-flex min-h-[44px] cursor-pointer items-center justify-center rounded-xl border border-wasal-border bg-wasal-surface px-6 py-2.5 text-sm font-semibold text-wasal-ink transition-colors hover:bg-wasal-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wasal-green focus-visible:ring-offset-2"
          >
            مسح البحث
          </button>
        </>
      ) : (
        <h2 className="mt-4 text-base font-bold text-wasal-ink sm:text-lg">
          لا توجد طلبات متاحة حالياً
        </h2>
      )}
    </section>
  )
}
