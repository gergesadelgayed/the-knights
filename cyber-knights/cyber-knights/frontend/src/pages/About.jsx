import { motion } from "framer-motion";
import config from "../config.js";
import GlitchTitle from "../components/GlitchTitle.jsx";
import HudCard from "../components/HudCard.jsx";

const whatWeDo = [
  "Weekly hands-on sessions covering web exploitation, forensics, reverse engineering, and crypto.",
  "An internal CTF ladder that feeds our competitive team, EL FLA73N.",
  "Mentorship pairing newer members with students who've already broken into the field.",
  "Direct connections to partner organizations for internships and early-career roles.",
];

export default function About() {
  return (
    <div className="mx-auto max-w-5xl px-6 pb-24 pt-32">
      <GlitchTitle
        as="h1"
        text="ABOUT US"
        className="text-3xl font-bold text-white sm:text-4xl"
      />
      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-slate-300 md:text-base">
        {config.brand.name} is a non-profit student community dedicated to teaching students
        cybersecurity, connecting them with job-market requirements, and supporting them
        throughout their education. We're built by students, for students — no gatekeeping,
        no tuition, just people who want to get good at this together.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {config.missions.map((m, i) => (
          <motion.div
            key={m.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <HudCard className="h-full">
              <p className="font-display text-lg font-semibold text-white">{m.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">{m.body}</p>
            </HudCard>
          </motion.div>
        ))}
      </div>

      <div className="mt-16">
        <p className="font-mono text-xs tracking-[0.2em] text-neon-blue/70">WHY CYBER KNIGHTS?</p>
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {config.whyUs.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <HudCard className="h-full">
                <p className="font-display text-lg font-semibold text-white">{item.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{item.body}</p>
              </HudCard>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <p className="font-mono text-xs tracking-[0.2em] text-neon-blue/70">WHAT WE DO</p>
        <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-300 md:text-base">
          {whatWeDo.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-neon-blue">›</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
