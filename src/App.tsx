import { Header } from './components/Header'
import { OrderCard } from './components/OrderCard'
import { OrdersTable } from './components/OrdersTable'
import { useOrders } from './hooks/useOrders'

function App() {
  const { orders, status, error } = useOrders()

  return (
    <div className="flex min-h-screen flex-col bg-wasal-canvas text-wasal-ink">
      <Header />

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6">
        {status === 'loading' && (
          <p
            aria-busy="true"
            className="py-12 text-center text-sm font-medium text-wasal-muted"
          >
            جارٍ تحميل الطلبات...
          </p>
        )}

        {status === 'error' && (
          <p
            role="alert"
            className="py-12 text-center text-sm font-medium text-wasal-ink"
          >
            {error ??
              'تعذر تحميل قائمة الطلبات. يرجى التحقق من الاتصال والمحاولة مجدداً.'}
          </p>
        )}

        {status === 'success' && (
          <>
            <section
              aria-label="قائمة الطلبات"
              className="space-y-3 md:hidden"
            >
              {orders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </section>

            <section aria-label="جدول الطلبات" className="hidden md:block">
              <OrdersTable orders={orders} />
            </section>
          </>
        )}
      </main>
    </div>
  )
}

export default App
