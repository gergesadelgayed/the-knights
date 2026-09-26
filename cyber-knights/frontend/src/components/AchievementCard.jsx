import HudCard from "./HudCard.jsx";

// "2nd place" gets a subtle silver/gold accent instead of the usual
// electric blue — everything else (including 30th place) stays on the
// standard blue accent so no result is visually singled out as a letdown.
const isPodium = (result = "") => /2nd place/i.test(result);

export default function AchievementCard({ achievement, compact = false }) {
  const { competition, result, scope, description } = achievement;
  const podium = isPodium(result);

  return (
    <HudCard className="h-full">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span
            className={`h-1.5 w-1.5 shrink-0 rounded-full ${
              podium ? "bg-amber-300" : "bg-neon-blue"
            }`}
            aria-hidden="true"
          />
          <p className="font-display text-base font-semibold text-white">{competition}</p>
        </div>
        <span
          className={`shrink-0 border px-2 py-0.5 font-mono text-[11px] tracking-wide ${
            podium
              ? "border-amber-300/40 bg-amber-300/10 text-amber-200"
              : "border-neon-blue/30 bg-void-900/60 text-neon-blue/90"
          }`}
        >
          {result}
        </span>
      </div>

      <p className="mt-2 font-mono text-[11px] tracking-wide text-slate-400">{scope}</p>

      {!compact && description && (
        <p className="mt-3 text-sm leading-relaxed text-slate-300">{description}</p>
      )}
    </HudCard>
  );
}
