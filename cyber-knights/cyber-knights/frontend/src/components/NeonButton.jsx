import { Link } from "react-router-dom";

export default function NeonButton({
  children,
  to,
  href,
  onClick,
  type = "button",
  variant = "solid", // solid | outline
  color = "blue", // blue | crimson
  disabled = false,
  className = "",
}) {
  const base =
    "inline-flex items-center justify-center gap-2 px-6 py-3 font-display text-sm font-semibold tracking-wide uppercase transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

  const palette =
    color === "crimson"
      ? {
          solid: "bg-neon-crimson/90 text-white shadow-glow-crimson hover:bg-neon-crimson focus-visible:outline-neon-crimson",
          outline:
            "border border-neon-crimson text-neon-crimson hover:bg-neon-crimson/10 hover:shadow-glow-crimson focus-visible:outline-neon-crimson",
        }
      : {
          solid: "bg-neon-blue/90 text-void-950 shadow-glow-blue hover:bg-neon-blue focus-visible:outline-neon-blue",
          outline:
            "border border-neon-blue text-neon-blue hover:bg-neon-blue/10 hover:shadow-glow-blue focus-visible:outline-neon-blue",
        };

  const disabledClasses =
    "pointer-events-none cursor-not-allowed opacity-40 shadow-none hover:bg-transparent hover:shadow-none";

  const classes = `${base} ${palette[variant]} ${disabled ? disabledClasses : ""} ${className}`;

  if (disabled) {
    return (
      <span className={classes} aria-disabled="true">
        {children}
      </span>
    );
  }

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
