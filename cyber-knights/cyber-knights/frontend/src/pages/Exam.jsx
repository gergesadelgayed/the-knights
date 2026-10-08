import { useCallback, useEffect, useRef, useState } from "react";
import GlitchTitle from "../components/GlitchTitle.jsx";
import HudCard from "../components/HudCard.jsx";
import NeonButton from "../components/NeonButton.jsx";

const API = `${import.meta.env.VITE_API_URL || ""}/api/exam`;
const LEVEL_STYLE = { easy: "text-emerald-400", medium: "text-amber-400", advanced: "text-neon-crimson" };

async function post(path, body) {
  const res = await fetch(`${API}/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");
  return data;
}

const fmt = (ms) => {
  const s = Math.max(0, Math.ceil(ms / 1000));
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
};

export default function Exam() {
  const [phase, setPhase] = useState("intro"); // intro | exam | result
  const [name, setName] = useState("");
  const [exam, setExam] = useState(null);
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [left, setLeft] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const submitting = useRef(false);
  const latest = useRef({});
  latest.current = { exam, answers };

  const submit = useCallback(async () => {
    if (submitting.current) return;
    submitting.current = true;
    setBusy(true);
    setError("");
    try {
      const { exam, answers } = latest.current;
      setResult(await post("submit", { token: exam.token, answers }));
      setPhase("result");
    } catch (e) {
      setError(e.message);
      submitting.current = false;
    } finally {
      setBusy(false);
    }
  }, []);

  useEffect(() => {
    if (phase !== "exam") return;
    const end = Date.now() + exam.durationMs;
    const t = setInterval(() => {
      const rest = end - Date.now();
      setLeft(rest);
      if (rest <= 0) { clearInterval(t); submit(); }
    }, 250);
    return () => clearInterval(t);
  }, [phase, exam, submit]);

  const start = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const data = await post("start", { name });
      submitting.current = false;
      setExam(data); setAnswers({}); setIdx(0); setLeft(data.durationMs); setPhase("exam");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const retake = () => { setPhase("intro"); setResult(null); setExam(null); setError(""); };

  const shell = "mx-auto max-w-3xl px-6 pb-24 pt-32";

  if (phase === "intro") {
    return (
      <div className={shell}>
        <GlitchTitle as="h1" text="NETWORK SECURITY EXAM" className="text-3xl font-bold text-white sm:text-4xl" />
        <p className="mt-6 text-sm leading-relaxed text-slate-300 md:text-base">
          10 random questions — 5 easy, 2 medium, 3 advanced. You need <b className="text-neon-blue">70%</b> to pass.
          The timer starts as soon as you begin, and the exam submits itself when time runs out.
        </p>
        <HudCard className="mt-8">
          <form onSubmit={start} className="flex flex-col gap-4">
            <label htmlFor="name" className="font-display text-sm uppercase tracking-wide text-slate-300">Your name</label>
            <input
              id="name" value={name} onChange={(e) => setName(e.target.value)} maxLength={40} required autoComplete="name"
              className="border border-white/15 bg-void-900 px-4 py-3 text-white placeholder-slate-500 focus:border-neon-blue"
              placeholder="Full name"
            />
            {error && <p role="alert" className="text-sm text-neon-crimson">{error}</p>}
            <NeonButton type="submit" disabled={busy || name.trim().length < 2}>{busy ? "Loading…" : "Start exam"}</NeonButton>
          </form>
        </HudCard>
      </div>
    );
  }

  if (phase === "exam") {
    const q = exam.questions[idx];
    const answered = Object.keys(answers).length;
    const last = idx === exam.questions.length - 1;
    return (
      <div className={shell}>
        <div className="flex items-center justify-between font-mono text-sm">
          <span className="text-slate-300">Question {idx + 1} / {exam.questions.length}</span>
          <span className={left < 60000 ? "text-neon-crimson" : "text-neon-blue"} aria-live="off">⏱ {fmt(left)}</span>
        </div>
        <div className="mt-3 h-1 w-full bg-white/10">
          <div className="h-1 bg-neon-blue shadow-glow-blue transition-all" style={{ width: `${(answered / exam.questions.length) * 100}%` }} />
        </div>

        <HudCard className="mt-8">
          <p className={`font-mono text-xs uppercase tracking-widest ${LEVEL_STYLE[q.level]}`}>{q.level}</p>
          <h2 className="mt-3 text-lg font-semibold text-white md:text-xl">{q.q}</h2>
          <div role="radiogroup" aria-label="Answer options" className="mt-6 flex flex-col gap-3">
            {q.options.map((opt, i) => {
              const on = answers[q.id] === i;
              return (
                <button
                  key={i} type="button" role="radio" aria-checked={on}
                  onClick={() => setAnswers((a) => ({ ...a, [q.id]: i }))}
                  className={`border px-4 py-3 text-left text-sm transition-colors md:text-base ${
                    on ? "border-neon-blue bg-neon-blue/10 text-white shadow-glow-blue" : "border-white/10 text-slate-300 hover:border-neon-blue/60"
                  }`}
                >
                  <span className="mr-3 font-mono text-neon-blue">{String.fromCharCode(65 + i)}</span>{opt}
                </button>
              );
            })}
          </div>
        </HudCard>

        <div className="mt-6 flex flex-wrap items-center gap-2" aria-label="Question navigator">
          {exam.questions.map((x, i) => (
            <button
              key={x.id} type="button" onClick={() => setIdx(i)} aria-label={`Go to question ${i + 1}`} aria-current={i === idx}
              className={`h-9 w-9 border font-mono text-xs ${
                i === idx ? "border-neon-blue text-neon-blue" : answers[x.id] !== undefined ? "border-neon-blue/40 bg-neon-blue/10 text-slate-200" : "border-white/10 text-slate-500"
              }`}
            >{i + 1}</button>
          ))}
        </div>

        {error && <p role="alert" className="mt-4 text-sm text-neon-crimson">{error}</p>}
        <div className="mt-8 flex justify-between gap-3">
          <NeonButton variant="outline" disabled={idx === 0} onClick={() => setIdx(idx - 1)}>Back</NeonButton>
          {last ? (
            <NeonButton color="crimson" disabled={busy} onClick={() => {
              if (answered === exam.questions.length || window.confirm(`You answered ${answered}/${exam.questions.length}. Submit anyway?`)) submit();
            }}>{busy ? "Submitting…" : "Submit exam"}</NeonButton>
          ) : (
            <NeonButton onClick={() => setIdx(idx + 1)}>Next</NeonButton>
          )}
        </div>
      </div>
    );
  }

  const r = result;
  const mm = Math.floor(r.durationSec / 60), ss = r.durationSec % 60;
  return (
    <div className={shell}>
      <GlitchTitle as="h1" text={r.passed ? "MISSION COMPLETE" : "TRY AGAIN"} className="text-3xl font-bold text-white sm:text-4xl" />
      <HudCard className="mt-8 text-center" accent={r.passed ? "blue" : "crimson"}>
        <p className={`font-display text-6xl font-bold ${r.passed ? "text-neon-blue" : "text-neon-crimson"}`}>{r.percent}%</p>
        {r.passed ? (
          <p className="mt-4 text-xl text-white">Congrats, <span className="text-neon-blue">{r.name}</span> 🎉</p>
        ) : (
          <p className="mt-4 text-base text-slate-200">
            You didn't reach {r.passPercent}%. Please contact your mentor.
            <span dir="rtl" className="mt-1 block text-slate-300">تواصل مع المنتور بتاعك.</span>
          </p>
        )}
      </HudCard>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <HudCard><p className="font-mono text-xs uppercase text-slate-400">Score</p><p className="mt-1 text-2xl font-bold text-white">{r.correct} / {r.total}</p></HudCard>
        <HudCard><p className="font-mono text-xs uppercase text-slate-400">Time</p><p className="mt-1 text-2xl font-bold text-white">{mm}m {ss}s</p></HudCard>
        <HudCard><p className="font-mono text-xs uppercase text-slate-400">Unanswered</p><p className="mt-1 text-2xl font-bold text-white">{r.unanswered}</p></HudCard>
      </div>

      <HudCard className="mt-6">
        <p className="font-display text-sm uppercase tracking-wide text-slate-300">By difficulty</p>
        <div className="mt-4 flex flex-col gap-4">
          {Object.entries(r.byLevel).map(([lvl, s]) => (
            <div key={lvl}>
              <div className="flex justify-between font-mono text-xs">
                <span className={`uppercase ${LEVEL_STYLE[lvl]}`}>{lvl}</span><span className="text-slate-300">{s.correct} / {s.total}</span>
              </div>
              <div className="mt-1 h-2 bg-white/10"><div className="h-2 bg-neon-blue" style={{ width: `${s.total ? (s.correct / s.total) * 100 : 0}%` }} /></div>
            </div>
          ))}
        </div>
      </HudCard>

      <div className="mt-8"><NeonButton variant="outline" onClick={retake}>Back to start</NeonButton></div>
    </div>
  );
}
