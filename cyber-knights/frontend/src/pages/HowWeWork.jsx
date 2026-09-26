import { motion } from "framer-motion";
import config from "../config.js";
import GlitchTitle from "../components/GlitchTitle.jsx";
import HudCard from "../components/HudCard.jsx";

export default function HowWeWork() {
  const steps = config.howWeWork ?? [];

  return (
    <div className="mx-auto max-w-4xl px-6 pb-24 pt-32">
      <GlitchTitle
        as="h1"
        text="HOW WE WORK"
        className="text-3xl font-bold text-white sm:text-4xl"
      />
      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-slate-300 md:text-base">
        From your first session to the job market — here's how we take members through
        the journey.
      </p>

      {steps.length > 0 && (
        <div className="relative mt-16">
          {/* Vertical connecting line */}
          <div
            className="absolute bottom-0 left-5 top-0 w-px bg-gradient-to-b from-neon-blue/60 via-neon-blue/20 to-transparent sm:left-6"
            aria-hidden="true"
          />

          <ol className="space-y-8">
            {steps.map((step, i) => (
              <motion.li
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="relative pl-14 sm:pl-16"
              >
                {/* HUD-style step node */}
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-neon-blue/50 bg-void-950 font-mono text-sm font-semibold text-neon-blue shadow-glow-blue sm:h-12 sm:w-12">
                  {String(i + 1).padStart(2, "0")}
                </div>

                <HudCard>
                  <p className="font-display text-base font-semibold text-white sm:text-lg">
                    {step.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300 md:text-base">
                    {step.description}
                  </p>
                </HudCard>
              </motion.li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
