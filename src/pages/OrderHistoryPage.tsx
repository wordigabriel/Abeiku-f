import { useAppContext } from "../context/AppContext";

export function OrderHistoryPage() {
  const { orders, currentUser } = useAppContext();
  const userOrders = orders.filter((order) => order.customerId === currentUser?.id);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 md:px-8">
      <h1 className="text-4xl font-semibold text-slate-900">Order History</h1>
      {userOrders.length === 0 ? (
        <p className="mt-6 text-slate-600">No orders yet.</p>
      ) : (
        <div className="mt-8 space-y-4">
          {userOrders.map((order) => (
            <div key={order.id} className="rounded-2xl border border-slate-200 p-5">
              <p className="font-semibold text-[#0B5D1E]">{order.orderNumber}</p>
              <p className="text-slate-600">Status: {order.status}</p>
              <p className="text-slate-600">Total: GHS {order.total.toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}