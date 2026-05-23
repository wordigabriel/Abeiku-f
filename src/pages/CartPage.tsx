import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export function CartPage() {
  const { cart, products, updateCartQuantity, removeFromCart } = useAppContext();
  const navigate = useNavigate();
  const items = cart
    .map((item) => {
      const product = products.find((entry) => entry.id === item.productId);
      if (!product) return null;
      return { ...item, product };
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 md:px-8">
      <h1 className="text-4xl font-semibold text-slate-900">Shopping Cart</h1>
      {items.length === 0 ? (
        <div className="mt-8 rounded-2xl bg-slate-50 p-8 text-center">
          <p className="text-slate-600">Your cart is empty.</p>
          <Link to="/shop" className="mt-4 inline-block rounded-full bg-[#0B5D1E] px-5 py-2 text-white">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.productId} className="flex flex-col gap-4 rounded-2xl border border-slate-200 p-4 sm:flex-row">
                <img src={item.product.image} alt={item.product.name} className="h-24 w-24 rounded-xl object-cover" />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{item.product.name}</h2>
                  <p className="text-slate-600">GHS {item.product.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateCartQuantity(item.productId, item.quantity - 1)}
                    className="h-8 w-8 rounded-full border"
                  >
                    -
                  </button>
                  <p className="w-8 text-center">{item.quantity}</p>
                  <button
                    onClick={() => updateCartQuantity(item.productId, item.quantity + 1)}
                    className="h-8 w-8 rounded-full border"
                  >
                    +
                  </button>
                </div>
                <button onClick={() => removeFromCart(item.productId)} className="text-sm text-red-600">
                  Remove
                </button>
              </div>
            ))}
          </div>
          <aside className="h-fit rounded-2xl border border-slate-200 p-5">
            <h3 className="text-lg font-semibold">Order Summary</h3>
            <p className="mt-3 text-slate-600">Subtotal: GHS {total.toFixed(2)}</p>
            <button onClick={() => navigate("/checkout")} className="mt-6 w-full rounded-full bg-[#0B5D1E] py-3 text-white">
              Proceed to Checkout
            </button>
          </aside>
        </div>
      )}
    </main>
  );
}