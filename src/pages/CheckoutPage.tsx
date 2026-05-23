import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import type { CheckoutPayload } from "../types";

const paymentMethods = ["MTN Mobile Money", "Telecel Cash", "AirtelTigo Money", "Card payment"] as const;

export function CheckoutPage() {
  const { placeOrder, currentUser } = useAppContext();
  const [orderNumber, setOrderNumber] = useState("");
  const [error, setError] = useState("");
  const [form, setForm] = useState<CheckoutPayload>({
    fullName: currentUser?.fullName ?? "",
    phone: currentUser?.phone ?? "",
    deliveryAddress: "",
    gpsLocation: "",
    deliveryOption: "Delivery",
    paymentMethod: "MTN Mobile Money",
  });

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setError("");
    const response = placeOrder(form);
    if (!response.ok) {
      setError(response.message ?? "Unable to complete checkout.");
      return;
    }
    setOrderNumber(response.orderNumber ?? "");
  };

  if (orderNumber) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16 text-center md:px-8">
        <h1 className="text-4xl font-semibold text-[#0B5D1E]">Order Confirmed</h1>
        <p className="mt-4 text-slate-600">Thank you for shopping with Abeiku Farms.</p>
        <p className="mt-4 text-2xl font-semibold">Order Number: {orderNumber}</p>
        <Link to="/tracking" className="mt-8 inline-block rounded-full bg-[#0B5D1E] px-6 py-3 text-white">
          Track This Order
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 md:px-8">
      <h1 className="text-4xl font-semibold text-slate-900">Checkout</h1>
      <form onSubmit={submit} className="mt-8 grid gap-4 rounded-2xl border border-slate-200 bg-white p-6">
        <input
          required
          value={form.fullName}
          onChange={(event) => setForm((prev) => ({ ...prev, fullName: event.target.value }))}
          placeholder="Full name"
          className="rounded-xl border border-slate-300 px-4 py-3"
        />
        <input
          required
          value={form.phone}
          onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
          placeholder="Phone number"
          className="rounded-xl border border-slate-300 px-4 py-3"
        />
        <input
          required
          value={form.deliveryAddress}
          onChange={(event) => setForm((prev) => ({ ...prev, deliveryAddress: event.target.value }))}
          placeholder="Delivery address"
          className="rounded-xl border border-slate-300 px-4 py-3"
        />
        <input
          required
          value={form.gpsLocation}
          onChange={(event) => setForm((prev) => ({ ...prev, gpsLocation: event.target.value }))}
          placeholder="GPS location"
          className="rounded-xl border border-slate-300 px-4 py-3"
        />
        <select
          value={form.deliveryOption}
          onChange={(event) => setForm((prev) => ({ ...prev, deliveryOption: event.target.value as "Delivery" | "Pickup" }))}
          className="rounded-xl border border-slate-300 px-4 py-3"
        >
          <option value="Delivery">Delivery</option>
          <option value="Pickup">Pickup at office/shop</option>
        </select>
        <select
          value={form.paymentMethod}
          onChange={(event) => setForm((prev) => ({ ...prev, paymentMethod: event.target.value as (typeof paymentMethods)[number] }))}
          className="rounded-xl border border-slate-300 px-4 py-3"
        >
          {paymentMethods.map((method) => (
            <option key={method} value={method}>
              {method}
            </option>
          ))}
        </select>

        <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
          Paystack and Hubtel integration structure is prepared on the backend services layer.
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
        <button type="submit" className="rounded-full bg-[#0B5D1E] py-3 font-semibold text-white">
          Confirm and Pay
        </button>
      </form>
    </main>
  );
}