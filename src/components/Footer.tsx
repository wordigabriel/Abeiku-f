import { Link } from "react-router-dom";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="mt-16 bg-[#0B5D1E] px-4 py-12 text-white md:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
        <div>
          <Logo light />
          <p className="mt-4 max-w-sm text-sm text-slate-200">
            Premium farm produce marketplace connecting customers directly to quality-assured farm partners.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide">Contact</h3>
          <p className="mt-3 text-sm text-slate-200">+233 24 000 1122</p>
          <p className="text-sm text-slate-200">+233 55 123 8890</p>
          <p className="text-sm text-slate-200">support@abeikufarms.com</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide">Quick Links</h3>
          <div className="mt-3 space-y-2 text-sm text-slate-200">
            <Link className="block hover:text-white" to="/shop">
              Shop
            </Link>
            <Link className="block hover:text-white" to="/orders">
              Order History
            </Link>
            <Link className="block hover:text-white" to="/tracking">
              Track Order
            </Link>
            <Link className="block hover:text-white" to="/contact">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-7xl border-t border-white/20 pt-4 text-xs text-slate-200">
        Copyright {new Date().getFullYear()} Abeiku Farms. All rights reserved.
      </p>
    </footer>
  );
}