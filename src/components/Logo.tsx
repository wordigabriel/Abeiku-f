import { Link } from "react-router-dom";

interface LogoProps {
  light?: boolean;
}

export function Logo({ light = false }: LogoProps) {
  return (
    <Link to="/" className="flex items-center gap-3" aria-label="Abeiku Farms Home">
      <img src="/assets/abeiku-logo.svg" alt="Abeiku Farms" className="h-10 w-10" />
      <div className="leading-tight">
        <p className={`text-xl font-semibold tracking-[0.22em] ${light ? "text-white" : "text-[#0B5D1E]"}`}>ABEIKU</p>
        <p className={`text-[10px] tracking-[0.5em] ${light ? "text-slate-200" : "text-slate-500"}`}>FARMS</p>
      </div>
    </Link>
  );
}