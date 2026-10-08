import HudCard from "./HudCard.jsx";

export default function MemberCard({ name, role }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <HudCard className="flex items-center gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-neon-blue/40 bg-void-900 font-display text-lg font-semibold text-neon-blue">
        {initials}
      </div>
      <div>
        <p className="font-display text-base font-semibold text-white">{name}</p>
        <p className="font-mono text-xs tracking-wide text-neon-blue/80">{role}</p>
      </div>
    </HudCard>
  );
}
