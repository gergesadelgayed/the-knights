import { useState } from "react";
import { NavLink } from "react-router-dom";
import config from "../config.js";
import helmet from "../assets/helmet-crop.png";
import NeonButton from "./NeonButton.jsx";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `font-display text-sm font-semibold tracking-wide uppercase transition-colors duration-200 ${
      isActive ? "text-neon-blue" : "text-slate-300 hover:text-neon-blue"
    }`;

  return (
    <header className="fixed top-0 z-40 w-full border-b border-white/5 bg-void-950/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <NavLink to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <img
            src={helmet}
            alt="Cyber Knights"
            className="h-9 w-9 rounded-full object-cover animate-pulseGlow"
          />
          <span className="font-display text-lg font-bold tracking-wide text-white">
            {config.brand.name}
          </span>
        </NavLink>

        <div className="hidden items-center gap-8 md:flex">
          {config.nav.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass} end={item.to === "/"}>
              {item.label}
            </NavLink>
          ))}
          <NeonButton href={config.joinUrl} className="!px-4 !py-2 !text-xs">
            Become a Knight
          </NeonButton>
        </div>

        <button
          className="flex flex-col gap-1.5 rounded-sm p-1 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`h-0.5 w-6 bg-neon-blue transition-transform duration-200 ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-0.5 w-6 bg-neon-blue transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-6 bg-neon-blue transition-transform duration-200 ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/5 bg-void-950 px-6 pb-6 md:hidden">
          <div className="flex flex-col gap-4 pt-4">
            {config.nav.map((item) => (
              <NavLink key={item.to} to={item.to} className={linkClass} onClick={() => setOpen(false)} end={item.to === "/"}>
                {item.label}
              </NavLink>
            ))}
            <NeonButton href={config.joinUrl}>Become a Knight</NeonButton>
          </div>
        </div>
      )}
    </header>
  );
}
