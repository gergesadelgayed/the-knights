import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import config from "../config.js";
import heroArt from "../assets/hero-full.png";
import GlitchTitle from "../components/GlitchTitle.jsx";
import NeonButton from "../components/NeonButton.jsx";
import HudCard from "../components/HudCard.jsx";

function TypedTagline({ text }) {
  const [shown, setShown] = useState("");

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, 35);
    return () => clearInterval(id);
  }, [text]);

  return (
    <p className="font-mono text-sm tracking-wide text-neon-blue/90 md:text-base">
      {shown}
      <span className="animate-pulse">▍</span>
    </p>
  );
}

const teasers = [
  { to: "/about", label: "About", body: "Who we are and what we're building." },
  { to: "/teams", label: "Teams", body: "Meet EL FLA73N, our CTF team." },
  { to: "/partnership", label: "Partnership", body: "Our alliance with Cyber Defender." },
  { to: "/join", label: "Join Us", body: "Become a Knight — it's free." },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-24">
        <motion.img
          src={heroArt}
          alt="Cyber Knights helmet artwork"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-30"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-void-950/40 via-void-950/70 to-void-950" />

        <div className="relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <GlitchTitle
              text="CYBER KNIGHTS"
              className="text-4xl font-bold text-white sm:text-6xl md:text-7xl"
            />
          </motion.div>

          <div className="mt-6">
            <TypedTagline text={config.brand.tagline} />
          </div>

          <p className="mt-4 max-w-xl text-sm text-slate-400 md:text-base">
            {config.brand.description}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <NeonButton href={config.joinUrl}>Become a Knight</NeonButton>
            <NeonButton to="/teams" variant="outline">
              Meet the Team
            </NeonButton>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="text-center font-mono text-xs tracking-[0.2em] text-neon-blue/70">
            WHAT WE DO
          </p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {config.whatWeDo.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <HudCard className="h-full text-center">
                  <p className="font-display text-lg font-semibold text-white">
                    {item.title.toUpperCase()}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    {item.description}
                  </p>
                </HudCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats row */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-5xl px-6 py-12">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {config.stats.map((stat) => (
              <div
                key={stat.label}
                className="border border-white/10 bg-white/[0.02] px-4 py-6 text-center"
              >
                <p className="font-display text-3xl font-bold text-neon-blue sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 font-mono text-xs tracking-[0.2em] text-slate-400">
                  {stat.label.toUpperCase()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section teasers */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6 pb-24 pt-16">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teasers.map((t, i) => (
              <motion.div
                key={t.to}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link to={t.to} className="block">
                  <HudCard className="h-full">
                    <p className="font-mono text-xs tracking-[0.2em] text-neon-blue/70">
                      {t.label.toUpperCase()}
                    </p>
                    <p className="mt-2 text-sm text-slate-300">{t.body}</p>
                  </HudCard>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
