export default function HudCard({ children, className = "", accent = "blue", muted = false }) {
  const accentColor = accent === "crimson" ? "hover:shadow-glow-crimson" : "hover:shadow-glow-blue";

  return (
    <div
      className={`hud-frame group relative border border-white/10 bg-white/[0.02] p-6 transition-shadow duration-200 ${
        muted ? "cursor-not-allowed opacity-50 hover:shadow-none" : accentColor
      } ${className}`}
    >
      <span className="hud-corner-tr" />
      <span className="hud-corner-bl" />
      {children}
    </div>
  );
}
