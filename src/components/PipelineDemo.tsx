"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { track } from "@/lib/analytics";
import { InView } from "./InView";

type Stage = { id: string; label: string; what: string; log: string[] };
const STAGES: Stage[] = [
  { id: "commit", label: "Commit", what: "A developer’s change is committed and pushed to version control. That push starts the pipeline.",
    log: ["$ git commit -m \"feat: add health endpoint\"", "[main 3f2a9c1] feat: add health endpoint", "$ git push origin main", "→ pipeline triggered (example)"] },
  { id: "build", label: "Build", what: "The application is compiled and packaged, for example into a container image made of layers.",
    log: ["▸ install dependencies", "▸ compile application", "▸ build container image app:3f2a9c1", "✓ build finished (example)"] },
  { id: "test", label: "Test", what: "Automated checks run against the build: linting, unit tests and integration tests. A failing check stops the release here.",
    log: ["▸ lint", "▸ unit tests", "▸ integration tests", "✓ all checks passed (example result)"] },
  { id: "deploy", label: "Deploy", what: "The release rolls out to an environment a few instances at a time, with a way back if a check fails.",
    log: ["▸ apply manifests to staging (example)", "▸ rolling update 1/3 → 3/3", "▸ readiness checks passing", "✓ release app:3f2a9c1 live in example environment"] },
  { id: "observe", label: "Observe", what: "After release, logs and metrics are watched so problems are caught and fed back into the next commit.",
    log: ["▸ collecting logs", "▸ metric: request_rate (example)", "▸ metric: error_rate (example)", "▸ alert rules evaluated (example)"] },
];
type Status = "pending" | "running" | "done";
const STATUS_TEXT: Record<Status, string> = { pending: "Waiting", running: "Running", done: "Done" };

/** One focused, schematic visual per stage. Shapes only: no numbers, nothing that looks like real telemetry. */
function StageVisual({ id, status }: { id: string; status: Status }) {
  const on = status !== "pending";
  const full = status === "done";
  const ink = "var(--on-dark-muted)", g = "var(--brand-glow)";
  return (
    <svg viewBox="0 0 360 190" role="img" aria-label={`Schematic for the ${id} stage, ${STATUS_TEXT[status].toLowerCase()}`} className="w-full">
      {id === "commit" && [0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <rect x="20" y={20 + i * 30} width={[220, 160, 250, 190, 130][i]} height="12" fill={ink} opacity=".35" />
          {on && i === 2 && <rect x="20" y={20 + i * 30} width="250" height="12" fill={g} />}
          {on && i === 2 && <text x="290" y={31 + i * 30} fill={g} fontSize="12" fontFamily="var(--font-mono-jb)">+ added</text>}
        </g>
      ))}
      {id === "build" && [0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={60 + i * 8} y={20 + (3 - i) * 36} width={240 - i * 16} height="28" fill={full || (on && i < 2) ? g : "none"} fillOpacity={0.85 - i * 0.15} stroke={ink} />
          <text x="76" y={39 + (3 - i) * 36} fill={full || (on && i < 2) ? "var(--forest)" : ink} fontSize="12" fontFamily="var(--font-mono-jb)">{["base image", "dependencies", "application", "app:3f2a9c1"][i]}</text>
        </g>
      ))}
      {id === "test" && ["lint", "unit tests", "integration tests"].map((t, i) => (
        <g key={t}>
          <rect x="30" y={30 + i * 48} width="300" height="36" fill="none" stroke={ink} />
          <text x="46" y={53 + i * 48} fill="var(--on-dark)" fontSize="14" fontFamily="var(--font-mono-jb)">{t}</text>
          <text x="314" y={53 + i * 48} textAnchor="end" fill={full ? g : ink} fontSize="14" fontFamily="var(--font-mono-jb)">{full ? "✓ pass (example)" : on ? "…" : "waiting"}</text>
        </g>
      ))}
      {id === "deploy" && [0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={30 + i * 106} y="50" width="92" height="90" fill={full || (on && i === 0) ? g : "none"} stroke={ink} />
          <text x={76 + i * 106} y="90" textAnchor="middle" fill={full || (on && i === 0) ? "var(--forest)" : ink} fontSize="16" fontFamily="var(--font-mono-jb)">{full || (on && i === 0) ? "new" : "old"}</text>
          <text x={76 + i * 106} y="112" textAnchor="middle" fill={full || (on && i === 0) ? "var(--forest)" : ink} fontSize="12" fontFamily="var(--font-mono-jb)">instance {i + 1}</text>
        </g>
      ))}
      {id === "observe" && ["requests", "errors", "latency"].map((t, i) => (
        <g key={t}>
          <rect x={20 + i * 112} y="30" width="104" height="120" fill="none" stroke={ink} />
          <text x={32 + i * 112} y="52" fill="var(--on-dark)" fontSize="12" fontFamily="var(--font-mono-jb)">{t}</text>
          <path d={`M${32 + i * 112} 120 q 20 ${i === 1 ? 0 : -30} 40 -10 t 40 -10`} fill="none" stroke={on ? g : ink} strokeWidth="2" opacity={on ? 1 : 0.4} />
        </g>
      ))}
      {id === "observe" && <text x="20" y="176" fill={ink} fontSize="11" fontFamily="var(--font-mono-jb)">example shapes, not telemetry</text>}
    </svg>
  );
}

export function PipelineDemo() {
  const [selected, setSelected] = useState(0);
  const [status, setStatus] = useState<Status[]>(STAGES.map(() => "pending"));
  const [running, setRunning] = useState(false);
  const [announce, setAnnounce] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touched = useRef(false); // once the visitor takes control, never auto-play over them

  const clear = () => { if (timer.current) clearTimeout(timer.current); timer.current = null; };
  useEffect(() => clear, []);
  const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const select = (i: number) => {
    touched.current = true; clear(); setRunning(false);
    setSelected(i); setAnnounce(`${STAGES[i].label} selected. ${STAGES[i].what}`);
    track("pipeline_stage_select", { stage_id: STAGES[i].id });
  };

  const run = useCallback((auto = false) => {
    clear();
    if (!auto) { touched.current = true; track("pipeline_run", { demo_version: "2" }); }
    setSelected(0); setAnnounce("Simulation started.");
    if (reduced()) {
      setStatus(STAGES.map(() => "done")); setSelected(STAGES.length - 1);
      setAnnounce("Simulation finished. All five stages complete."); return;
    }
    setRunning(true);
    setStatus(STAGES.map((_, i) => (i === 0 ? "running" : "pending")));
    const step = (i: number) => {
      timer.current = setTimeout(() => {
        setStatus((s) => s.map((v, k) => (k < i + 1 ? "done" : k === i + 1 ? "running" : v)));
        if (i + 1 < STAGES.length) { setSelected(i + 1); step(i + 1); }
        else { setRunning(false); setAnnounce("Simulation finished. All five stages complete."); }
      }, 1300);
    };
    step(0);
  }, []);

  const reset = () => {
    touched.current = true; clear(); setRunning(false); setSelected(0); setStatus(STAGES.map(() => "pending"));
    setAnnounce("Simulation reset."); track("pipeline_reset", { demo_version: "2" });
  };

  const stage = STAGES[selected];
  const st = status[selected];
  const visibleLog = st === "pending" ? [] : st === "running" ? stage.log.slice(0, 2) : stage.log;
  const pct = (selected / (STAGES.length - 1)) * 100;
  const doneCount = status.filter((s) => s === "done").length;

  return (
    <InView threshold={0.55} onEnter={() => { if (!touched.current && !reduced()) run(true); }}>
      <p className="mb-8 inline-block rounded-md border border-glow/50 px-3 py-2 text-sm text-glow">
        Interactive demo — simulated workflow; not connected to a live deployment.
      </p>

      {/* the path: five stops, the turtle walks it, progress fills behind it */}
      <div className="relative mb-6 hidden h-24 sm:block" aria-hidden>
        <div className="absolute inset-x-[10%] bottom-3 h-0.5 bg-line-dark" />
        <div className="absolute bottom-3 left-[10%] h-0.5 bg-glow transition-[width] duration-700 ease-[var(--ease)]" style={{ width: `${pct * 0.8}%` }} />
        {STAGES.map((s, i) => (
          <span key={s.id} className={`absolute bottom-[7px] size-[9px] -translate-x-1/2 ${i <= selected ? "bg-glow" : "bg-line-dark"}`} style={{ left: `${10 + i * 20}%` }} />
        ))}
        <div className="absolute bottom-3 left-[10%] w-[80%]">
          <div className="absolute bottom-0 w-20 -translate-x-1/2 transition-[left] duration-700 ease-[var(--ease)]" style={{ left: `${pct}%` }}>
            <Image src="/brand/turtle-dark.webp" alt="" width={2394} height={1426} sizes="80px" className="h-auto w-full" style={{ aspectRatio: "2394 / 1426" }} />
          </div>
        </div>
      </div>

      <ol className="grid grid-cols-1 gap-2 sm:grid-cols-5" aria-label="Pipeline stages">
        {STAGES.map((s, i) => (
          <li key={s.id}>
            <button type="button" onClick={() => select(i)} aria-pressed={i === selected} aria-current={i === selected ? "step" : undefined}
              className={`flex min-h-16 w-full items-center justify-between gap-2 border-t-2 px-1 py-3 text-left sm:flex-col sm:items-start sm:justify-start ${i === selected ? "border-glow text-ink" : "border-line-dark text-ondark-muted hover:text-glow-hi"}`}>
              <span className="text-lg font-bold">{s.label}</span>
              <span className={`text-sm ${status[i] === "done" ? "text-glow" : ""}`}>{STATUS_TEXT[status[i]]}{status[i] === "done" ? " ✓" : status[i] === "running" ? "…" : ""}</span>
            </button>
          </li>
        ))}
      </ol>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <h3 className="display text-4xl sm:text-5xl">{stage.label}</h3>
          <p className="mt-4 max-w-md text-lg text-ondark-muted">{stage.what}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button type="button" onClick={() => run()} disabled={running}
              className="inline-flex min-h-11 items-center rounded-full bg-glow px-6 py-2.5 text-sm font-semibold text-forest hover:bg-glow-hi disabled:opacity-50">
              {running ? "Running…" : doneCount === STAGES.length ? "Run again" : "Run pipeline"}
            </button>
            <button type="button" onClick={reset}
              className="inline-flex min-h-11 items-center rounded-full border border-ondark/40 px-6 py-2.5 text-sm font-semibold hover:border-glow hover:text-glow">
              Reset pipeline
            </button>
          </div>
          <p className="mt-4 text-sm text-ondark-muted">Plays once when this section arrives. Pick any stage to stop it and look closer.</p>
        </div>
        <div className="min-w-0">
          <StageVisual id={stage.id} status={st} />
          <p className="mb-2 mt-6 text-sm text-ondark-muted">Illustrative output — not from a real system</p>
          <pre tabIndex={0} aria-label={`Illustrative log for ${stage.label}`}
               className="min-h-36 overflow-x-auto border border-line-dark bg-black/40 p-4 font-mono text-xs leading-relaxed text-ondark sm:text-sm">
            {visibleLog.length ? visibleLog.join("\n") : "Select a stage or run the pipeline to see example output."}
            {running && <span className="anim-caret">▌</span>}
          </pre>
        </div>
      </div>
      <p className="sr-only" role="status" aria-live="polite">{announce}</p>
    </InView>
  );
}
