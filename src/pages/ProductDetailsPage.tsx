import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export function ProductDetailsPage() {
  const { id } = useParams();
  const { products, addToCart } = useAppContext();
  const product = products.find((item) => item.id === id);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-20 text-center md:px-8">
        <p className="text-slate-600">Product not found.</p>
        <Link to="/shop" className="mt-4 inline-block rounded-full bg-[#0B5D1E] px-5 py-2 text-white">
          Back to Shop
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 md:px-8">
      <div className="grid gap-10 md:grid-cols-2">
        <img src={product.image} alt={product.name} className="h-[420px] w-full rounded-2xl object-cover" />
        <div>
          <p className="text-sm font-medium text-[#0B5D1E]">{product.category}</p>
          <h1 className="mt-2 text-4xl font-semibold text-slate-900">{product.name}</h1>
          <p className="mt-4 text-lg text-slate-600">{product.description}</p>
          <p className="mt-6 text-3xl font-semibold text-[#0B5D1E]">GHS {product.price.toFixed(2)}</p>
          <p className="mt-2 text-slate-500">Delivery in 24-48 hours, or pickup same day at our office.</p>

          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              className="h-10 w-10 rounded-full border border-slate-300"
            >
              -
            </button>
            <p className="min-w-10 text-center text-lg">{quantity}</p>
            <button onClick={() => setQuantity((prev) => prev + 1)} className="h-10 w-10 rounded-full border border-slate-300">
              +
            </button>
          </div>

          <button
            onClick={() => addToCart(product.id, quantity)}
            className="mt-6 rounded-full bg-[#0B5D1E] px-6 py-3 font-semibold text-white"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </main>
  );
}