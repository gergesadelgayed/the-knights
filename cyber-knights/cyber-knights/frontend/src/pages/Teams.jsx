import { motion } from "framer-motion";
import config from "../config.js";
import GlitchTitle from "../components/GlitchTitle.jsx";
import HudCard from "../components/HudCard.jsx";
import MemberCard from "../components/MemberCard.jsx";

export default function Teams() {
  const teams = config.teams;

  return (
    <div className="mx-auto max-w-5xl px-6 pb-24 pt-32">
      <GlitchTitle as="h1" text="TEAMS" className="text-3xl font-bold text-white sm:text-4xl" />
      <p className="mt-6 max-w-2xl text-sm text-slate-300 md:text-base">
        Cyber Knights includes several focus areas. Our first active competitive team:
      </p>

      {/* Focus areas Cyber Knights covers — descriptive for now, no separate
          pages per area yet. */}
      <div className="mt-6 flex flex-wrap gap-2">
        {config.focusAreas.map((area) => (
          <span
            key={area}
            className="border border-white/10 bg-white/[0.02] px-3 py-1 font-mono text-[11px] tracking-wide text-slate-300"
          >
            {area}
          </span>
        ))}
      </div>

      {teams.map((team, i) => (
        <div key={team.id} className={i === 0 ? "mt-12" : "mt-16"}>
          <HudCard>
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <GlitchTitle
                as="h2"
                text={team.name}
                className="text-2xl font-bold text-white sm:text-3xl"
              />
              <span className="font-mono text-xs tracking-[0.2em] text-neon-crimson">
                CTF TEAM
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-400">{team.tagline}</p>

            {team.achievements?.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {team.achievements.map((a) => (
                  <span
                    key={a.event}
                    className="border border-neon-blue/30 bg-void-900/60 px-3 py-1 font-mono text-[11px] tracking-wide text-neon-blue/90"
                  >
                    {a.event} — {a.result}
                  </span>
                ))}
              </div>
            )}
          </HudCard>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {team.members.map((member, i2) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i2 * 0.05 }}
              >
                <MemberCard name={member.name} role={member.role} />
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
