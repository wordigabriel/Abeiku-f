import { Link, Navigate, useParams, useSearchParams } from "react-router-dom";
import { categoryFoodTypes, categories } from "../data/mockData";
import { useAppContext } from "../context/AppContext";

export function CategoryMarketPage() {
  const { category: categoryParam } = useParams();
  const [searchParams] = useSearchParams();
  const { products, addToCart } = useAppContext();

  const category = categories.find((item) => item.toLowerCase() === decodeURIComponent(categoryParam ?? "").toLowerCase());
  if (!category) return <Navigate to="/shop" replace />;

  const foodTypes = categoryFoodTypes[category];
  const typeParam = searchParams.get("type");
  const selectedType = typeParam && foodTypes.includes(typeParam) ? typeParam : "All";

  const categoryProducts = products.filter((product) => {
    if (product.category !== category) return false;
    if (selectedType === "All") return true;
    return product.productType === selectedType;
  });

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 md:px-8">
      <p className="text-sm tracking-[0.18em] text-[#0B5D1E]">{category.toUpperCase()} MARKET</p>
      <h1 className="mt-2 text-4xl font-semibold text-slate-900">{selectedType === "All" ? `${category} Market` : `${selectedType} Market`}</h1>
      <p className="mt-3 max-w-3xl text-slate-600">All available food types under {category}, with dedicated market listings.</p>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-slate-900">Food Types In {category}</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            to={`/market/${encodeURIComponent(category)}`}
            className={`rounded-full px-4 py-2 text-sm ${
              selectedType === "All" ? "bg-[#0B5D1E] text-white" : "border border-slate-300 text-slate-700"
            }`}
          >
            All
          </Link>
          {foodTypes.map((foodType) => (
            <Link
              key={foodType}
              to={`/market/${encodeURIComponent(category)}?type=${encodeURIComponent(foodType)}`}
              className={`rounded-full px-4 py-2 text-sm ${
                selectedType === foodType ? "bg-[#0B5D1E] text-white" : "border border-slate-300 text-slate-700"
              }`}
            >
              {foodType}
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categoryProducts.map((product) => (
          <article key={product.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <img src={product.image} alt={product.name} className="h-56 w-full object-cover" />
            <div className="space-y-2 p-5">
              <p className="text-sm font-medium text-[#0B5D1E]">{product.productType} Market</p>
              <h2 className="text-xl font-semibold text-slate-900">{product.name}</h2>
              <p className="text-slate-600">GHS {product.price.toFixed(2)} / {product.unit}</p>
              <p className={product.stock > 0 ? "text-sm text-emerald-700" : "text-sm text-red-600"}>
                {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
              </p>
              <div className="flex gap-3 pt-2">
                <Link to={`/shop/${product.id}`} className="rounded-full border border-[#0B5D1E] px-4 py-2 text-sm text-[#0B5D1E]">
                  Details
                </Link>
                <button
                  onClick={() => addToCart(product.id)}
                  disabled={product.stock === 0}
                  className="rounded-full bg-[#0B5D1E] px-4 py-2 text-sm text-white disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}