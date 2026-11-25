import wasalLogo from '../assets/wasal-logo.png'

export function Header() {
  return (
    <header className="sticky top-0 z-20 bg-wasal-canvas pt-3 pb-2 sm:pt-4">
      <div className="mx-auto max-w-5xl px-4">
        <div className="relative flex items-center justify-between gap-3 overflow-hidden rounded-2xl border border-wasal-border bg-wasal-surface py-3 ps-5 pe-4 shadow-xs sm:py-3.5 sm:ps-6 sm:pe-5">
          <span
            className="absolute inset-y-0 start-0 w-1 bg-wasal-green"
            aria-hidden="true"
          />

          <div className="flex min-w-0 items-center gap-3.5">
            <img
              src={wasalLogo}
              alt="وصل للتوصيل"
              width={282}
              height={106}
              className="h-8 w-auto shrink-0 select-none object-contain sm:h-10"
            />

            <span
              className="h-7 w-px shrink-0 bg-wasal-border"
              aria-hidden="true"
            />

            <div className="min-w-0 text-start">
              <h1 className="truncate text-base font-bold leading-tight text-wasal-ink sm:text-lg">
                متابعة الطلبات
              </h1>
              <p className="mt-0.5 truncate text-xs font-medium text-wasal-muted">
                لوحة التوصيل اليومي
              </p>
            </div>
          </div>

          <div className="hidden shrink-0 items-center gap-1.5 rounded-full border border-wasal-border bg-wasal-canvas px-3 py-1.5 text-xs font-medium text-wasal-muted sm:inline-flex">
            <svg
              className="h-3.5 w-3.5 shrink-0 text-wasal-green-dark"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>صنعاء</span>
          </div>
        </div>
      </div>
    </header>
  )
}
