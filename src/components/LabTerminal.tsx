"use client";
import { useState } from "react";
import { LAB_DEMO } from "@/content/labs";

/** Step through the example from labs.deboistech.in. Nothing runs: every line is scripted, and the card says so. */
export function LabTerminal() {
  const [n, setN] = useState(0);
  const done = n >= LAB_DEMO.length;
  return (
    <div>
      <div className="dark-surface overflow-hidden rounded-[var(--radius-lg)] border border-line-strong bg-forest shadow-[0_40px_120px_-40px_rgba(74,174,94,0.35)]">
        <div aria-hidden className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span className="size-2.5 rounded-full bg-line-strong" /><span className="size-2.5 rounded-full bg-line-strong" /><span className="size-2.5 rounded-full bg-line-strong" />
          <span className="ml-3 font-mono text-xs text-muted">learner@lab: ~</span>
        </div>
        <pre tabIndex={0} aria-label="Illustrative terminal session" className="min-h-60 overflow-x-auto p-5 font-mono text-sm leading-7 text-ink">
          {LAB_DEMO.slice(0, n).map((l) => (
            <span key={l.cmd} className="block"><span className="text-glow">$ </span>{l.cmd}{l.out && <span className="block text-muted">{l.out}</span>}</span>
          ))}
          {!done && <span className="block"><span className="text-glow">$ </span><span className="anim-caret">▌</span></span>}
          {done && <span className="mt-2 block text-glow">✓ Check passed · deploy.sh is executable</span>}
        </pre>
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button type="button" disabled={done} onClick={() => setN((v) => v + 1)}
          className="inline-flex min-h-12 items-center rounded-full bg-glow px-6 py-3 text-[15px] font-semibold text-forest hover:bg-glow-hi disabled:opacity-40">
          {done ? "Lab complete" : `Run: ${LAB_DEMO[n].cmd}`}
        </button>
        <button type="button" onClick={() => setN(0)} className="inline-flex min-h-12 items-center rounded-full border border-line-strong px-6 py-3 text-[15px] font-semibold hover:border-glow hover:text-glow">Reset walkthrough</button>
      </div>
      <p className="mt-4 max-w-md text-sm text-muted" role="status">
        {done ? "In a real lab, the check inspects your sandbox for the result, however you got there." : "Illustrative walkthrough of the example on labs.deboistech.in. Nothing is executed here."}
      </p>
    </div>
  );
}
