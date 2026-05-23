import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { categories, categoryFoodTypes, testimonials } from "../data/mockData";
import { useAppContext } from "../context/AppContext";

export function HomePage() {
  const { products, addToCart } = useAppContext();
  const featured = products.filter((product) => product.featured).slice(0, 3);

  return (
    <main>
      <section
        className="relative min-h-[78vh] bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(11, 93, 30, 0.72), rgba(11, 93, 30, 0.54)), url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2000&q=80')",
        }}
      >
        <div className="mx-auto flex min-h-[78vh] max-w-7xl flex-col justify-center px-4 py-16 text-white md:px-8">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm tracking-[0.32em] text-emerald-100">
            ABEIKU FARMS
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-4 max-w-3xl text-4xl font-semibold leading-tight md:text-6xl"
          >
            Fresh Farm Produce Delivered To Your Doorstep
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mt-5 max-w-xl text-lg text-emerald-50"
          >
            Trusted supply from local farms, secure checkout, and flexible delivery or pickup options.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Link to="/shop" className="rounded-full bg-white px-6 py-3 font-semibold text-[#0B5D1E] transition hover:shadow-xl">
              Shop Now
            </Link>
            <Link
              to="/contact"
              className="rounded-full border border-white px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-[#0B5D1E]"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <h2 className="text-3xl font-semibold text-slate-900">Product Categories</h2>
        <p className="mt-2 max-w-xl text-slate-600">Curated essentials across fresh produce, proteins, and staples.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category}
              to={`/market/${encodeURIComponent(category)}`}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1"
            >
              <h3 className="text-xl font-semibold text-[#0B5D1E]">{category} Market</h3>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <h2 className="text-3xl font-semibold text-slate-900">Food Types Under Each Category</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {categories.map((category) => (
            <div key={category}>
              <h3 className="text-xl font-semibold text-[#0B5D1E]">{category}</h3>
              <p className="mt-2 text-slate-600">{categoryFoodTypes[category].join(", ")}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-semibold text-slate-900">How It Works</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-4">
            {["Browse products", "Order online", "Pay securely", "Delivery or pickup"].map((step, index) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-2xl bg-white p-5 shadow-sm"
              >
                <p className="text-sm font-semibold text-[#0B5D1E]">Step {index + 1}</p>
                <p className="mt-2 text-lg font-medium text-slate-800">{step}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <h2 className="text-3xl font-semibold text-slate-900">Featured Products</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {featured.map((product) => (
            <article key={product.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <img src={product.image} alt={product.name} className="h-48 w-full object-cover" />
              <div className="p-5">
                <h3 className="text-lg font-semibold text-slate-900">{product.name}</h3>
                <p className="mt-1 text-slate-600">GHS {product.price.toFixed(2)} / {product.unit}</p>
                <button
                  onClick={() => addToCart(product.id)}
                  className="mt-4 rounded-full bg-[#0B5D1E] px-4 py-2 text-sm font-medium text-white"
                >
                  Add to Cart
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-semibold text-slate-900">Customer Testimonials</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="rounded-2xl bg-white p-6 shadow-sm">
                <p className="text-slate-600">"{testimonial.quote}"</p>
                <p className="mt-4 font-semibold text-[#0B5D1E]">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <h2 className="text-3xl font-semibold text-slate-900">Delivery Coverage</h2>
        <p className="mt-3 max-w-2xl text-slate-600">
          We currently deliver across Greater Accra, Tema, Kumasi, and Takoradi with same-day pickup at our office.
        </p>
      </section>
    </main>
  );
}