import { useParams } from "react-router-dom";
import GlitchTitle from "../components/GlitchTitle.jsx";
import HudCard from "../components/HudCard.jsx";
import NeonButton from "../components/NeonButton.jsx";
import config from "../config.js";

export default function ProgramDetail() {
  const { programId } = useParams();
  const program = config.programs.find((p) => p.id === programId);

  return (
    <div className="mx-auto max-w-3xl px-6 pb-24 pt-32 text-center">
      <GlitchTitle
        as="h1"
        text={(program?.label || "Program").toUpperCase()}
        className="text-3xl font-bold text-white sm:text-4xl"
      />

      <HudCard className="mt-10">
        {program?.description && (
          <p className="text-sm text-slate-300 md:text-base">{program.description}</p>
        )}
        <p className="mt-4 font-mono text-xs tracking-[0.2em] text-neon-blue/70">
          MORE DETAILS COMING SOON
        </p>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">
          We're still putting together the full page for this program. Check back soon, or
          reach out on our socials in the meantime.
        </p>
      </HudCard>

      <div className="mt-10">
        <NeonButton to="/" variant="outline">
          ← Back to Home
        </NeonButton>
      </div>
    </div>
  );
}
