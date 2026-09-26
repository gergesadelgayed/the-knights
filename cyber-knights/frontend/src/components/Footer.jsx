import { NavLink } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok } from "react-icons/fa";
import config from "../config.js";
import helmet from "../assets/helmet-crop.png";

const socialIcons = {
  facebook: FaFacebook,
  instagram: FaInstagram,
  linkedin: FaLinkedin,
  tiktok: FaTiktok,
};

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-void-950/60">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-12 md:grid-cols-4">
        <div className="col-span-2 flex items-start gap-3 md:col-span-1">
          <img src={helmet} alt="" className="h-10 w-10 rounded-full object-cover" />
          <div>
            <p className="font-display text-lg font-bold text-white">{config.brand.name}</p>
            <p className="mt-1 max-w-xs text-sm text-slate-400">Non-profit student community</p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-mono text-xs tracking-[0.2em] text-neon-blue/70">NAVIGATE</p>
          {config.nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className="text-sm text-slate-300 transition-colors duration-200 hover:text-neon-blue"
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <p className="font-mono text-xs tracking-[0.2em] text-neon-blue/70">FOLLOW</p>
          <div className="flex items-center gap-4">
            {config.socials.map((social) => {
              const Icon = socialIcons[social.id];
              return (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-slate-300 transition-colors duration-200 hover:text-neon-blue"
                >
                  {Icon ? <Icon size={20} /> : social.label}
                </a>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-mono text-xs tracking-[0.2em] text-neon-blue/70">CONTACT</p>
          <a
            href={`mailto:${config.partnershipEmail}`}
            className="text-sm text-slate-300 transition-colors duration-200 hover:text-neon-blue"
          >
            {config.partnershipEmail}
          </a>
        </div>
      </div>

      <div className="border-t border-white/5 px-6 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {config.brand.name}. Non-profit student community.
      </div>
    </footer>
  );
}
