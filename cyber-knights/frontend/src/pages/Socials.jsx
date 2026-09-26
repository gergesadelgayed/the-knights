import { motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok } from "react-icons/fa";
import config from "../config.js";
import GlitchTitle from "../components/GlitchTitle.jsx";
import HudCard from "../components/HudCard.jsx";
import NeonButton from "../components/NeonButton.jsx";

const socialIcons = {
  facebook: FaFacebook,
  instagram: FaInstagram,
  linkedin: FaLinkedin,
  tiktok: FaTiktok,
};

export default function Socials() {
  return (
    <div className="mx-auto max-w-5xl px-6 pb-24 pt-32">
      <GlitchTitle
        as="h1"
        text="FOLLOW THE KNIGHTS"
        className="text-3xl font-bold text-white sm:text-4xl"
      />
      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-slate-300 md:text-base">
        Wherever you hang out, we're probably there too. Follow along for event
        highlights, write-ups, and the occasional cybersecurity tip.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {config.socials.map((social, i) => {
          const Icon = socialIcons[social.id];
          // Defensive: a social entry with no url renders as a clearly
          // non-interactive "coming soon" card instead of a dead link.
          const comingSoon = !social.url;

          return (
            <motion.div
              key={social.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <HudCard
                muted={comingSoon}
                className="flex h-full flex-col items-center gap-4 text-center"
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-full border ${
                    comingSoon ? "border-white/15 text-slate-500" : "border-neon-blue/40 text-neon-blue"
                  } bg-void-900`}
                >
                  {Icon ? <Icon size={26} /> : null}
                </div>
                <div>
                  <p className="font-display text-lg font-semibold text-white">
                    {social.label}
                  </p>
                  <p className="mt-2 text-sm text-slate-400">{social.description}</p>
                </div>
                <NeonButton
                  href={comingSoon ? undefined : social.url}
                  disabled={comingSoon}
                  variant="outline"
                  className="mt-auto !px-6 !py-2 !text-xs"
                >
                  {comingSoon ? "Coming soon" : "Follow"}
                </NeonButton>
              </HudCard>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
