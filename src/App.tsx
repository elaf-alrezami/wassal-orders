import { useMemo, useState } from 'react'
import { Header } from './components/Header'
import { OrderCard } from './components/OrderCard'
import { OrdersTable } from './components/OrdersTable'
import { OrdersToolbar } from './components/OrdersToolbar'
import {
  EmptySearchState,
  ErrorState,
  LoadingState,
} from './components/StateView'
import { useOrders } from './hooks/useOrders'
import type { SortOption } from './types/order'
import { filterOrdersByCustomer } from './utils/arabicSearch'
import { sortOrders } from './utils/sortOrders'

function App() {
  const { orders, status, error, retry } = useOrders()
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('date-desc')

  const visibleOrders = useMemo(
    () => sortOrders(filterOrdersByCustomer(orders, searchQuery), sortBy),
    [orders, searchQuery, sortBy],
  )

  return (
    <div className="flex min-h-screen flex-col bg-wasal-canvas text-wasal-ink">
      <Header />

      <main className="mx-auto w-full max-w-5xl flex-1 space-y-4 px-4 py-6">
        <OrdersToolbar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          visibleCount={visibleOrders.length}
          totalCount={orders.length}
          disabled={status !== 'success'}
        />

        {status === 'loading' ? (
          <LoadingState />
        ) : status === 'error' ? (
          <ErrorState message={error ?? undefined} onRetry={retry} />
        ) : visibleOrders.length === 0 ? (
          <EmptySearchState
            query={searchQuery}
            onClearSearch={() => setSearchQuery('')}
          />
        ) : (
          <>
            <section
              aria-label="قائمة الطلبات"
              className="space-y-3 md:hidden"
            >
              {visibleOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </section>

            <section aria-label="جدول الطلبات" className="hidden md:block">
              <OrdersTable orders={visibleOrders} />
            </section>
          </>
        )}
      </main>
    </div>
  )
}

export default App
