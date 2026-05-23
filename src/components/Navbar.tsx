import { Menu, ShoppingCart, UserCircle2, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { Logo } from "./Logo";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/tracking", label: "Track Order" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, currentUser, logout } = useAppContext();
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <Logo />
        <div className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm font-medium transition hover:text-[#0B5D1E] ${isActive ? "text-[#0B5D1E]" : "text-slate-600"}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
        <div className="hidden items-center gap-3 md:flex">
          {currentUser?.role === "admin" && (
            <Link to="/admin" className="text-sm font-medium text-slate-700 hover:text-[#0B5D1E]">
              Dashboard
            </Link>
          )}
          <Link to="/cart" className="relative rounded-full p-2 text-slate-600 hover:bg-slate-100">
            <ShoppingCart size={20} />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#0B5D1E] text-xs text-white">
                {itemCount}
              </span>
            )}
          </Link>
          {currentUser ? (
            <button onClick={logout} className="rounded-full bg-[#0B5D1E] px-4 py-2 text-sm font-medium text-white">
              Logout
            </button>
          ) : (
            <Link to="/login" className="inline-flex items-center gap-1 rounded-full bg-[#0B5D1E] px-4 py-2 text-sm text-white">
              <UserCircle2 size={16} /> Login
            </Link>
          )}
        </div>
        <button className="rounded p-2 md:hidden" onClick={() => setIsOpen((prev) => !prev)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </nav>
      {isOpen && (
        <div className="space-y-3 border-t border-slate-200 px-4 py-4 md:hidden">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} onClick={() => setIsOpen(false)} className="block text-slate-700">
              {item.label}
            </NavLink>
          ))}
          <Link to="/cart" onClick={() => setIsOpen(false)} className="block text-slate-700">
            Cart ({itemCount})
          </Link>
          <Link to="/orders" onClick={() => setIsOpen(false)} className="block text-slate-700">
            Order History
          </Link>
          {currentUser?.role === "admin" && (
            <Link to="/admin" onClick={() => setIsOpen(false)} className="block text-slate-700">
              Dashboard
            </Link>
          )}
          {currentUser ? (
            <button
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              className="rounded bg-[#0B5D1E] px-4 py-2 text-white"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" onClick={() => setIsOpen(false)} className="rounded bg-[#0B5D1E] px-4 py-2 text-white">
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
}