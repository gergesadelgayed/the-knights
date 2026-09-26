import { useState } from "react";
import config from "../config.js";
import GlitchTitle from "../components/GlitchTitle.jsx";
import NeonButton from "../components/NeonButton.jsx";
import HudCard from "../components/HudCard.jsx";

const perks = [
  "Weekly hands-on labs and CTF practice",
  "Mentorship from members already working in security",
  "A spot on the path toward joining EL FLA73N",
  "Direct access to partner opportunities like Cyber Defender",
];

const fieldClass =
  "w-full border border-white/10 bg-void-900/60 px-4 py-3 text-sm text-slate-200 outline-none transition-colors duration-200 focus:border-neon-blue";

export default function Join() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sent

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Cyber Knights — message from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${config.partnershipEmail}?subject=${subject}&body=${body}`;
    setStatus("sent");
  };

  return (
    <div className="mx-auto max-w-3xl px-6 pb-24 pt-32 text-center">
      <GlitchTitle
        as="h1"
        text="BECOME A KNIGHT"
        className="text-3xl font-bold text-white sm:text-4xl"
      />
      <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-slate-300 md:text-base">
        No prerequisites, no cost. Just curiosity and a willingness to break things in order to
        understand them.
      </p>

      <div className="mx-auto mt-8 max-w-xl text-left">
        <HudCard>
          <p className="font-mono text-xs tracking-[0.2em] text-neon-blue/70">WHO CAN JOIN?</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-300 md:text-base">
            {config.join.whoCanJoin}
          </p>
        </HudCard>
      </div>

      <div className="mt-12 text-left">
        <HudCard>
          <p className="font-mono text-xs tracking-[0.2em] text-neon-blue/70">WHAT YOU GET</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            {perks.map((p) => (
              <li key={p} className="flex gap-2">
                <span className="text-neon-blue">›</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </HudCard>
      </div>

      <div className="mt-8">
        <NeonButton href={config.joinUrl} className="!px-8 !py-4 !text-base">
          Become a Knight
        </NeonButton>
      </div>

      <div className="mt-16 text-left">
        <p className="font-mono text-xs tracking-[0.2em] text-neon-blue/70">
          OR SEND US A MESSAGE
        </p>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <input
            required
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className={fieldClass}
          />
          <input
            required
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className={fieldClass}
          />
          <textarea
            required
            name="message"
            placeholder="Message"
            rows={4}
            value={form.message}
            onChange={handleChange}
            className={fieldClass}
          />

          <NeonButton type="submit" variant="outline" className="w-full">
            Send Message
          </NeonButton>

          {status === "sent" && (
            <p className="font-mono text-xs text-neon-blue">
              Opening your email client — send it over and we'll be in touch.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
