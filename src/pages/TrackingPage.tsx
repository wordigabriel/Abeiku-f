import { FormEvent, useState } from "react";
import { useAppContext } from "../context/AppContext";

const statuses = ["Pending", "Processing", "Out for delivery", "Delivered"] as const;

export function TrackingPage() {
  const { findOrderByNumber } = useAppContext();
  const [orderNumber, setOrderNumber] = useState("");
  const [searched, setSearched] = useState("");

  const order = searched ? findOrderByNumber(searched) : undefined;

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setSearched(orderNumber.trim());
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 md:px-8">
      <h1 className="text-4xl font-semibold text-slate-900">Order Tracking</h1>
      <form onSubmit={submit} className="mt-6 flex gap-3">
        <input
          value={orderNumber}
          onChange={(event) => setOrderNumber(event.target.value)}
          placeholder="Enter order number"
          className="flex-1 rounded-xl border border-slate-300 px-4 py-3"
        />
        <button className="rounded-full bg-[#0B5D1E] px-6 text-white">Track</button>
      </form>

      {searched && !order && <p className="mt-6 text-red-600">Order not found.</p>}

      {order && (
        <div className="mt-8 rounded-2xl border border-slate-200 p-6">
          <p className="text-sm text-slate-500">Order: {order.orderNumber}</p>
          <p className="text-sm text-slate-500">Customer: {order.customerName}</p>
          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {statuses.map((status) => {
              const active = statuses.indexOf(order.status) >= statuses.indexOf(status);
              return (
                <div key={status} className={`rounded-xl border p-4 ${active ? "border-[#0B5D1E] bg-emerald-50" : "border-slate-200"}`}>
                  <p className={`text-sm font-medium ${active ? "text-[#0B5D1E]" : "text-slate-500"}`}>{status}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </main>
  );
}