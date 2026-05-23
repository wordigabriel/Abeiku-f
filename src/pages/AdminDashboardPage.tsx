import { FormEvent, useMemo, useState } from "react";
import { categories, categoryFoodTypes } from "../data/mockData";
import { useAppContext } from "../context/AppContext";
import type { OrderStatus, Product } from "../types";

const statuses: OrderStatus[] = ["Pending", "Processing", "Out for delivery", "Delivered"];

const emptyProduct: Omit<Product, "id"> = {
  name: "",
  category: "Vegetables",
  productType: "Tomatoes",
  price: 0,
  stock: 0,
  unit: "kg",
  image: "",
  description: "",
  featured: false,
};

export function AdminDashboardPage() {
  const { products, orders, users, addProduct, updateProduct, deleteProduct, updateOrderStatus } = useAppContext();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Product, "id">>(emptyProduct);
  const typeOptions = categoryFoodTypes[form.category];

  const totalSales = useMemo(() => orders.reduce((sum, order) => sum + order.total, 0), [orders]);
  const lowStock = useMemo(() => products.filter((product) => product.stock < 15), [products]);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (editingId) {
      updateProduct(editingId, form);
      setEditingId(null);
    } else {
      addProduct(form);
    }
    setForm(emptyProduct);
  };

  const startEdit = (product: Product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      category: product.category,
      productType: product.productType,
      price: product.price,
      stock: product.stock,
      unit: product.unit,
      image: product.image,
      description: product.description,
      featured: Boolean(product.featured),
    });
  };

  const loadImageFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, image: String(reader.result ?? "") }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <main className="mx-auto max-w-7xl space-y-10 px-4 py-10 md:px-8">
      <h1 className="text-4xl font-semibold text-slate-900">Admin Dashboard</h1>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 p-5">
          <p className="text-sm text-slate-500">Total Sales</p>
          <p className="text-3xl font-semibold text-[#0B5D1E]">GHS {totalSales.toFixed(2)}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 p-5">
          <p className="text-sm text-slate-500">Total Orders</p>
          <p className="text-3xl font-semibold text-[#0B5D1E]">{orders.length}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 p-5">
          <p className="text-sm text-slate-500">Customers</p>
          <p className="text-3xl font-semibold text-[#0B5D1E]">{users.filter((user) => user.role === "customer").length}</p>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 p-6">
        <h2 className="text-2xl font-semibold">Product Management</h2>
        <form onSubmit={submit} className="mt-6 grid gap-3 md:grid-cols-2">
          <input
            required
            value={form.name}
            onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
            placeholder="Product name"
            className="rounded-xl border border-slate-300 px-4 py-3"
          />
          <select
            value={form.category}
            onChange={(event) => {
              const nextCategory = event.target.value as Product["category"];
              setForm((prev) => ({
                ...prev,
                category: nextCategory,
                productType: categoryFoodTypes[nextCategory][0],
              }));
            }}
            className="rounded-xl border border-slate-300 px-4 py-3"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select
            value={form.productType}
            onChange={(event) => setForm((prev) => ({ ...prev, productType: event.target.value }))}
            className="rounded-xl border border-slate-300 px-4 py-3"
          >
            {typeOptions.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <input
            required
            type="number"
            value={form.price}
            onChange={(event) => setForm((prev) => ({ ...prev, price: Number(event.target.value) }))}
            placeholder="Price"
            className="rounded-xl border border-slate-300 px-4 py-3"
          />
          <input
            required
            type="number"
            value={form.stock}
            onChange={(event) => setForm((prev) => ({ ...prev, stock: Number(event.target.value) }))}
            placeholder="Stock"
            className="rounded-xl border border-slate-300 px-4 py-3"
          />
          <input
            required
            value={form.unit}
            onChange={(event) => setForm((prev) => ({ ...prev, unit: event.target.value }))}
            placeholder="Unit"
            className="rounded-xl border border-slate-300 px-4 py-3"
          />
          <input
            value={form.image}
            onChange={(event) => setForm((prev) => ({ ...prev, image: event.target.value }))}
            placeholder="Image URL"
            className="rounded-xl border border-slate-300 px-4 py-3"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) loadImageFile(file);
            }}
            className="rounded-xl border border-slate-300 px-4 py-3"
          />
          <textarea
            required
            value={form.description}
            onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
            placeholder="Description"
            className="rounded-xl border border-slate-300 px-4 py-3 md:col-span-2"
          />
          <label className="inline-flex items-center gap-2 text-sm text-slate-600 md:col-span-2">
            <input
              type="checkbox"
              checked={Boolean(form.featured)}
              onChange={(event) => setForm((prev) => ({ ...prev, featured: event.target.checked }))}
            />
            Featured product
          </label>
          <button className="rounded-full bg-[#0B5D1E] py-3 text-white md:col-span-2">
            {editingId ? "Update Product" : "Add Product"}
          </button>
        </form>

        <div className="mt-6 space-y-3">
          {products.map((product) => (
            <div key={product.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 p-3">
              <p>
                {product.name} - {product.productType} ({product.stock} in stock)
              </p>
              <div className="flex gap-2">
                <button onClick={() => startEdit(product)} className="rounded-full border px-4 py-1 text-sm">
                  Edit
                </button>
                <button onClick={() => deleteProduct(product.id)} className="rounded-full border px-4 py-1 text-sm text-red-600">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 p-6">
        <h2 className="text-2xl font-semibold">Order Management</h2>
        <div className="mt-5 space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="rounded-xl border border-slate-200 p-4">
              <p className="font-semibold text-[#0B5D1E]">{order.orderNumber}</p>
              <p className="text-sm text-slate-600">{order.customerName}</p>
              <p className="text-sm text-slate-600">GHS {order.total.toFixed(2)}</p>
              <select
                value={order.status}
                onChange={(event) => updateOrderStatus(order.id, event.target.value as OrderStatus)}
                className="mt-3 rounded-lg border border-slate-300 px-3 py-2"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 p-6">
        <h2 className="text-2xl font-semibold">Inventory Management</h2>
        {lowStock.length === 0 ? (
          <p className="mt-4 text-slate-600">All inventory levels are healthy.</p>
        ) : (
          <ul className="mt-4 space-y-2 text-slate-700">
            {lowStock.map((product) => (
              <li key={product.id}>
                {product.name}: {product.stock} left in stock
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}