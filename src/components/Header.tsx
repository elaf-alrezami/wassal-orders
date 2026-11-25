export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-wasal-border bg-wasal-surface">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3.5 sm:py-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex shrink-0 items-center gap-2">
            <svg
              className="h-9 w-9 shrink-0"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <rect width="36" height="36" rx="9" fill="#4EB800" />
              <path
                d="M10.5 19.25L15.5 24.25L26 12.75"
                stroke="#FFFFFF"
                strokeWidth="3.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="26.5" cy="24.5" r="2.25" fill="#111111" />
            </svg>
            <span className="text-lg font-bold tracking-tight text-wasal-ink sm:text-xl">
              وصل
            </span>
          </div>

          <span
            className="h-5 w-px shrink-0 bg-wasal-border"
            aria-hidden="true"
          />

          <h1 className="truncate text-base font-semibold text-wasal-ink sm:text-lg">
            متابعة الطلبات
          </h1>
        </div>
      </div>
    </header>
  )
}
