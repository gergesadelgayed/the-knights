import { motion } from "framer-motion";
import config from "../config.js";
import GlitchTitle from "../components/GlitchTitle.jsx";
import HudCard from "../components/HudCard.jsx";
import MemberCard from "../components/MemberCard.jsx";
import AchievementCard from "../components/AchievementCard.jsx";

export default function Teams() {
  const teams = config.teams;

  return (
    <div className="mx-auto max-w-5xl px-6 pb-24 pt-32">
      <GlitchTitle as="h1" text="TEAMS" className="text-3xl font-bold text-white sm:text-4xl" />
      <p className="mt-6 max-w-2xl text-sm text-slate-300 md:text-base">
        EL FLA73N is our active CTF team. Additional focus-area teams are currently being
        formed as the community grows.
      </p>

      {/* Focus areas Cyber Knights is building out — badged "Team forming"
          until a given area has its own active team. */}
      <p className="mt-8 font-mono text-xs tracking-[0.2em] text-neon-blue/70">
        New focus-area teams are currently being formed — check back soon.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {config.focusAreas.map((area) => (
          <span
            key={area.label}
            className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.02] px-3 py-1 font-mono text-[11px] tracking-wide text-slate-300"
          >
            {area.label}
            {area.status !== "active" && (
              <span className="border border-white/10 bg-white/[0.04] px-1.5 py-0.5 text-[10px] tracking-wide text-slate-400">
                Team forming
              </span>
            )}
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

          {config.achievements?.length > 0 && (
            <div id="achievements" className="mt-16 scroll-mt-24">
              <p className="font-mono text-xs tracking-[0.2em] text-neon-blue/70">
                EL FLA73N — COMPETITION RECORD
              </p>
              <p className="mt-2 max-w-2xl text-sm text-slate-400">
                Selected results from our participation in cybersecurity competitions.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {config.achievements.map((achievement, i2) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.4, delay: i2 * 0.05 }}
                  >
                    <AchievementCard achievement={achievement} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
