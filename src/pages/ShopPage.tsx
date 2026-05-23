import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { categories, categoryFoodTypes } from "../data/mockData";
import { useAppContext } from "../context/AppContext";

export function ShopPage() {
  const { products, addToCart } = useAppContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const categoryParam = searchParams.get("category");
  const category = categoryParam && categories.includes(categoryParam as (typeof categories)[number]) ? categoryParam : "All";
  const availableTypes = category === "All" ? [] : categoryFoodTypes[category as (typeof categories)[number]];
  const typeParam = searchParams.get("type");
  const type = typeParam && availableTypes.includes(typeParam) ? typeParam : "All";

  const updateCategory = (nextCategory: string) => {
    if (nextCategory === "All") {
      setSearchParams({});
      return;
    }
    setSearchParams({ category: nextCategory });
  };

  const updateType = (nextType: string) => {
    if (category === "All") return;
    if (nextType === "All") {
      setSearchParams({ category });
      return;
    }
    setSearchParams({ category, type: nextType });
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchCategory = category === "All" || product.category === category;
      const matchType = type === "All" || product.productType === type;
      const matchSearch = product.name.toLowerCase().includes(search.toLowerCase());
      return matchCategory && matchType && matchSearch;
    });
  }, [products, search, category, type]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 md:px-8">
      <h1 className="text-4xl font-semibold text-slate-900">Shop Farm Products</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search products"
          className="rounded-xl border border-slate-300 px-4 py-3"
        />
        <select
          value={category}
          onChange={(event) => updateCategory(event.target.value)}
          className="rounded-xl border border-slate-300 px-4 py-3"
        >
          <option value="All">All Categories</option>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        {category !== "All" && (
          <select value={type} onChange={(event) => updateType(event.target.value)} className="rounded-xl border border-slate-300 px-4 py-3">
            <option value="All">All {category} Types</option>
            {availableTypes.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        )}
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <article key={product.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <img src={product.image} alt={product.name} className="h-56 w-full object-cover" />
            <div className="space-y-2 p-5">
              <p className="text-sm font-medium text-[#0B5D1E]">{product.category} - {product.productType} Market</p>
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
      </div>
    </main>
  );
}
