import { useState } from "react";
import { motion } from "framer-motion";
import config from "../config.js";
import helmet from "../assets/helmet-crop.png";
import GlitchTitle from "../components/GlitchTitle.jsx";
import HudCard from "../components/HudCard.jsx";
import NeonButton from "../components/NeonButton.jsx";

export default function Partnership() {
  const partner = config.partners[0];
  const [logoFailed, setLogoFailed] = useState(false);

  return (
    <div className="mx-auto max-w-4xl px-6 pb-24 pt-32">
      <GlitchTitle
        as="h1"
        text="PARTNERSHIP"
        className="text-3xl font-bold text-white sm:text-4xl"
      />

      {partner && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-12"
        >
          <HudCard className="text-center">
            <p className="font-mono text-xs tracking-[0.25em] text-neon-crimson">
              OFFICIAL PARTNER
            </p>

            <div className="mt-6 flex flex-col items-center justify-center gap-8 sm:flex-row">
              <div className="flex flex-col items-center gap-2">
                <img src={helmet} alt="" className="h-16 w-16 rounded-full object-cover" />
                <span className="font-display text-sm font-semibold text-white">
                  Cyber Knights
                </span>
              </div>

              <span className="font-display text-2xl font-bold text-neon-blue">×</span>

              <div className="flex flex-col items-center gap-2">
                <HudCard className="flex h-24 w-48 max-w-full items-center justify-center !p-3">
                  {!logoFailed ? (
                    <img
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      onError={() => setLogoFailed(true)}
                      className="max-h-[96px] max-w-full object-contain"
                    />
                  ) : (
                    <span className="px-2 text-center font-mono text-[11px] tracking-wide text-slate-500">
                      Cyber Defender logo
                    </span>
                  )}
                </HudCard>
                <span className="font-display text-sm font-semibold text-white">
                  {partner.name}
                </span>
              </div>
            </div>

            <p className="mx-auto mt-8 max-w-xl text-sm leading-relaxed text-slate-300 md:text-base">
              {partner.description}
            </p>
          </HudCard>

          <div className="mt-12">
            <HudCard>
              <p className="font-mono text-xs tracking-[0.2em] text-neon-blue/70">
                INDUSTRY &amp; ACADEMIC COLLABORATION
              </p>
              <p className="mt-4 text-sm leading-relaxed text-slate-300 md:text-base">
                {config.partnerships.collaborationNote}
              </p>
            </HudCard>
          </div>

          <div className="mt-12">
            <HudCard>
              <p className="font-mono text-xs tracking-[0.2em] text-neon-blue/70">
                FOR COMPANIES &amp; UNIVERSITIES
              </p>
              <p className="mt-4 text-sm leading-relaxed text-slate-300 md:text-base">
                Interested in partnering with Cyber Knights? We work with companies and
                universities on joint training, mentorship, CTF challenges, and early-career
                opportunities for our members. Reach out and let's talk.
              </p>
              <div className="mt-6">
                <NeonButton href={`mailto:${config.partnershipEmail}`} variant="outline">
                  {config.partnershipEmail}
                </NeonButton>
              </div>
            </HudCard>
          </div>
        </motion.div>
      )}
    </div>
  );
}
