import { motion } from "framer-motion";
import config from "../config.js";
import GlitchTitle from "../components/GlitchTitle.jsx";
import HudCard from "../components/HudCard.jsx";
import NeonButton from "../components/NeonButton.jsx";

export default function UpcomingEvents() {
  const events = config.showUpcomingEvents ? config.upcomingEvents ?? [] : [];

  return (
    <div className="mx-auto max-w-5xl px-6 pb-24 pt-32">
      <GlitchTitle
        as="h1"
        text="UPCOMING EVENTS"
        className="text-3xl font-bold text-white sm:text-4xl"
      />
      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-slate-300 md:text-base">
        What's next for Cyber Knights.
      </p>

      {events.length > 0 ? (
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {events.map((event, i) => {
            const ctaHref = event.ctaLink || config.joinUrl;

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <HudCard className="flex h-full flex-col gap-4">
                  <div>
                    <p className="font-display text-lg font-semibold text-white">
                      {event.name}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">
                      {event.description}
                    </p>
                  </div>

                  <div className="flex flex-col gap-1 font-mono text-xs tracking-wide text-neon-blue/70">
                    <span>
                      <span className="text-slate-500">DATE:</span> {event.date}
                    </span>
                    <span>
                      <span className="text-slate-500">LOCATION:</span> {event.location}
                    </span>
                  </div>

                  <NeonButton
                    href={ctaHref}
                    variant="outline"
                    className="mt-auto self-start !px-6 !py-2 !text-xs"
                  >
                    {event.ctaLabel || "Learn more"}
                  </NeonButton>
                </HudCard>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <p className="mt-12 text-sm text-slate-400">
          No upcoming events right now — check back soon.
        </p>
      )}
    </div>
  );
}
