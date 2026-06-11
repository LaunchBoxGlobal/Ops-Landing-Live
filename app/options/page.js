"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// ─── Shared data ────────────────────────────────────────────────────────────

const SYMPTOMS = [
  {
    id: 1,
    title: "Scheduling lives in a spreadsheet",
    desc: "Or worse, in someone's head. Every change creates another manual follow up.",
    cat: "sys",
  },
  {
    id: 2,
    title: "Staff coordination is scattered",
    desc: "Calls, texts, and WhatsApp group chats are doing the job of an operating system.",
    cat: "sys",
  },
  {
    id: 3,
    title: "Customer records live everywhere",
    desc: "Three tools, one notes app, and no clean source of truth.",
    cat: "sys",
  },
  {
    id: 4,
    title: "Field visibility is missing",
    desc: "You only know what happened after calling someone to ask.",
    cat: "vis",
  },
  {
    id: 5,
    title: "Invoices and payments are disconnected",
    desc: "Job updates, payments, and receipts are all handled in different places.",
    cat: "sys",
  },
  {
    id: 6,
    title: "Your SaaS tools almost fit",
    desc: "They solve 70% of the workflow, then your team fills the gaps manually.",
    cat: "sys",
  },
  {
    id: 7,
    title: "Workarounds have workarounds",
    desc: "The system is technically working, but only because your team keeps saving it.",
    cat: "sys",
  },
  {
    id: 8,
    title: "You manage chaos, not growth",
    desc: "More time goes into chasing updates than improving the business.",
    cat: "vis",
  },
  {
    id: 9,
    title: "No single performance view",
    desc: "You cannot see what is booked, delayed, paid, or stuck in one place.",
    cat: "vis",
  },
];

// ─── Option B: Meter ─────────────────────────────────────────────────────────

function OptionB() {
  const [selected, setSelected] = useState(new Set());
  const [shattered, setShattered] = useState(false);
  const [shards, setShards] = useState([]);

  const count = selected.size;
  const angle = -110 + Math.min(1, count / 9) * 220;

  const meterText =
    count >= 7
      ? "Critical"
      : count >= 4
        ? "Strained"
        : count >= 2
          ? "Warning"
          : "Stable";
  const crackClass =
    count >= 6
      ? "crack-3"
      : count >= 4
        ? "crack-2"
        : count >= 2
          ? "crack-1"
          : "";

  const handleSelect = useCallback(
    (id) => {
      if (shattered) return;
      setSelected((prev) => {
        if (prev.has(id)) return prev;
        const next = new Set(prev);
        next.add(id);
        return next;
      });
    },
    [shattered],
  );

  useEffect(() => {
    if (count >= 4 && !shattered) {
      const generated = Array.from({ length: 24 }, (_, i) => ({
        id: i,
        left: 130 + Math.random() * 130,
        top: 120 + Math.random() * 140,
        x: Math.random() * 520 - 260,
        y: Math.random() * 420 - 210,
        r: Math.random() * 720 - 360,
      }));
      setShards(generated);
      setTimeout(() => setShattered(true), 150);
    }
  }, [count, shattered]);

  const reset = () => {
    setSelected(new Set());
    setShattered(false);
    setShards([]);
  };

  const left = SYMPTOMS.slice(0, 5);
  const right = SYMPTOMS.slice(5);

  return (
    <div>
      <div className="meter-layout">
        {/* Left cards */}
        <div className="side-grid">
          {left.map((s) => (
            <button
              key={s.id}
              className={`meter-card${selected.has(s.id) ? " selected" : ""}`}
              onClick={() => handleSelect(s.id)}
            >
              <strong>{s.title}</strong>
              <span>{s.desc}</span>
            </button>
          ))}
        </div>

        {/* Meter stage */}
        <div className="meter-stage">
          <div className="ambient-ring" />
          <div
            className={`meter${shattered ? " shattered" : ""}${crackClass ? ` ${crackClass}` : ""}`}
          >
            <div className="meter-face">
              <svg
                className="crack-svg"
                viewBox="0 0 300 300"
                aria-hidden="true"
              >
                <path id="b-c1" d="M150 84 L139 112 L153 140 L136 166" />
                <path id="b-c2" d="M190 104 L174 132 L196 154 L181 188" />
                <path id="b-c3" d="M111 121 L130 145 L113 176 L128 205" />
              </svg>
              <div
                className="needle"
                style={{
                  transform: `translate(-50%,-100%) rotate(${angle}deg)`,
                }}
              />
              <div className="hub" />
              <div className="meter-copy">
                <strong>{meterText}</strong>
                <span>{count} symptoms selected</span>
              </div>
            </div>
            <div className="shards-wrap">
              {shards.map((s) => (
                <span
                  key={s.id}
                  className="shard"
                  style={{
                    left: s.left,
                    top: s.top,
                    "--x": `${s.x}px`,
                    "--y": `${s.y}px`,
                    "--r": `${s.r}deg`,
                  }}
                />
              ))}
            </div>
          </div>
          <div className={`meter-cta${shattered ? " show" : ""}`}>
            <h3>Time to rebuild the system.</h3>
            <p>
              These are not random annoyances. They are signals that your
              business has outgrown manual operations.
            </p>
            <button className="cta-button">Book a Workflow Audit →</button>
          </div>
        </div>

        {/* Right cards */}
        <div className="side-grid">
          {right.map((s) => (
            <button
              key={s.id}
              className={`meter-card${selected.has(s.id) ? " selected" : ""}`}
              onClick={() => handleSelect(s.id)}
            >
              <strong>{s.title}</strong>
              <span>{s.desc}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="actions">
        <button className="reset-btn" onClick={reset}>
          Reset Option B
        </button>
      </div>
    </div>
  );
}

// ─── Option C: Reveal List ────────────────────────────────────────────────────

const C_THRESHOLD = 4;

function OptionC({ active }) {
  const [confirmed, setConfirmed] = useState(new Set());
  const [collapsed, setCollapsed] = useState(new Set());
  const [restoring, setRestoring] = useState(new Set());
  const [visible, setVisible] = useState(new Set());

  // Staggered reveal on mount / tab activation
  useEffect(() => {
    if (!active) return;
    const timeouts = SYMPTOMS.map((_, i) =>
      setTimeout(() => setVisible((prev) => new Set([...prev, i])), i * 90),
    );
    return () => timeouts.forEach(clearTimeout);
  }, [active]);

  // Confirm: move row from left list into right tally
  const handleConfirm = useCallback(
    (idx) => {
      if (confirmed.has(idx)) return;
      setConfirmed((prev) => new Set([...prev, idx]));
      setTimeout(() => setCollapsed((prev) => new Set([...prev, idx])), 230);
    },
    [confirmed],
  );

  // Deselect: remove chip from tally, animate row back into left list
  const handleDeselect = useCallback((idx) => {
    setConfirmed((prev) => {
      const n = new Set(prev);
      n.delete(idx);
      return n;
    });
    setCollapsed((prev) => {
      const n = new Set(prev);
      n.delete(idx);
      return n;
    });
    setRestoring((prev) => new Set([...prev, idx]));
    setTimeout(
      () =>
        setRestoring((prev) => {
          const n = new Set(prev);
          n.delete(idx);
          return n;
        }),
      500,
    );
  }, []);

  const count = confirmed.size;
  const pct = Math.min(100, (count / C_THRESHOLD) * 100);
  const qualified = count >= C_THRESHOLD;

  const chips = SYMPTOMS.map((s, i) => ({ idx: i, title: s.title })).filter(
    ({ idx }) => confirmed.has(idx),
  );

  const reset = () => {
    setConfirmed(new Set());
    setCollapsed(new Set());
    setRestoring(new Set());
    setVisible(new Set());
    setTimeout(() => {
      SYMPTOMS.forEach((_, i) => {
        setTimeout(() => setVisible((prev) => new Set([...prev, i])), i * 45);
      });
    }, 50);
  };

  return (
    <div>
      <div className="reveal-wrap">
        <div className="reveal-list">
          {SYMPTOMS.map((s, i) => (
            <button
              key={s.id}
              className={[
                "reveal-row",
                visible.has(i) ? "visible" : "",
                confirmed.has(i) ? "confirmed" : "",
                collapsed.has(i) ? "collapsed" : "",
                restoring.has(i) ? "restoring" : "",
              ].join(" ")}
              style={{ transitionDelay: `${i * 55}ms` }}
              onClick={() => handleConfirm(i)}
            >
              <span className="row-num">{String(i + 1).padStart(2, "0")}</span>
              <span className="row-copy">
                <strong>{s.title}</strong>
                <span>{s.desc}</span>
              </span>
              <span className="row-check">✓</span>
            </button>
          ))}
        </div>

        <aside className={`tally-side${qualified ? " qualified" : ""}`}>
          <div className="tally-top">
            <strong>Confirmed signals</strong>
            <span className="counter-pill">
              {Math.min(count, C_THRESHOLD)} / {C_THRESHOLD}
            </span>
          </div>
          <div className="counter-track">
            <div className="threshold-line">
              <span>CTA unlock</span>
            </div>
            <div className="counter-fill" style={{ height: `${pct}%` }} />
          </div>
          <div className="tally-items">
            {chips.length === 0 ? (
              <div className="empty-state">
                Confirmed rows stack here. Click ✕ on any chip to send it back
                to the list.
              </div>
            ) : (
              chips.map(({ idx, title }) => (
                <div key={idx} className="tally-chip">
                  <span className="chip-label">{title}</span>
                  <button
                    className="chip-remove"
                    onClick={() => handleDeselect(idx)}
                    aria-label={`Remove ${title}`}
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>
          <div className="side-cta">
            <h3>You have enough signals.</h3>
            <p>
              This is exactly where a workflow audit helps — we map the chaos,
              remove manual gaps, and design the system your team actually
              needs.
            </p>
            <button className="cta-button">Book a Workflow Audit →</button>
          </div>
        </aside>
      </div>
      <div className="actions">
        <button className="reset-btn" onClick={reset}>
          Reset Option C
        </button>
      </div>
    </div>
  );
}

// ─── Option D: Chaos Board ────────────────────────────────────────────────────

const D_THRESHOLD = 4;
const NOTE_POSITIONS = [
  { cls: "m1" },
  { cls: "m2" },
  { cls: "m3" },
  { cls: "m4" },
  { cls: "m5" },
  { cls: "m6" },
  { cls: "m7" },
  { cls: "m8" },
  { cls: "m9" },
];

function OptionD() {
  const [selected, setSelected] = useState(new Set());

  const count = selected.size;
  const pct = Math.min(100, (count / D_THRESHOLD) * 100);
  const overlayShown = count >= D_THRESHOLD;

  const handleSelect = useCallback((id) => {
    setSelected((prev) => {
      if (prev.has(id)) return prev;
      return new Set([...prev, id]);
    });
  }, []);

  const reset = () => setSelected(new Set());

  return (
    <div>
      <div className="board-wrap">
        {/* Chaos side */}
        <div className="board-panel chaos-panel">
          <div className="panel-label">Messy operations today</div>
          <svg
            className="chaos-lines"
            viewBox="0 0 560 620"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M95 150 C230 40, 310 250, 480 120"
              fill="none"
              stroke="#a32d2d"
              strokeWidth="3"
              strokeDasharray="8 9"
            />
            <path
              d="M55 410 C190 305, 350 500, 510 340"
              fill="none"
              stroke="#791f1f"
              strokeWidth="2"
              strokeDasharray="5 10"
            />
            <path
              d="M180 555 C260 380, 280 210, 420 80"
              fill="none"
              stroke="#f2a53c"
              strokeWidth="3"
              strokeDasharray="6 8"
            />
            <path
              d="M80 240 L500 520"
              fill="none"
              stroke="#a32d2d"
              strokeWidth="2"
              opacity=".45"
            />
          </svg>
          {SYMPTOMS.map((s, i) => (
            <button
              key={s.id}
              className={`mess-note ${NOTE_POSITIONS[i].cls}${selected.has(s.id) ? " selected" : ""}`}
              onClick={() => handleSelect(s.id)}
            >
              <strong>{s.title}</strong>
              <span>{s.desc}</span>
            </button>
          ))}
        </div>

        {/* Clean side */}
        <div className="board-panel clean-panel">
          <div className="panel-label">Clean system being built</div>
          <div className="dashboard">
            {[
              {
                step: 1,
                title: "Bookings",
                metric: "Live",
                muted:
                  "Requests, schedule changes, and assignments in one workflow.",
              },
              {
                step: 2,
                title: "Team visibility",
                metric: "Clear",
                muted: "No more chasing updates across scattered chat threads.",
              },
              { step: 3, title: "Operations flow", wide: true, workflow: true },
              {
                step: 4,
                title: "Performance view",
                wide: true,
                bars: true,
                muted:
                  "A single place to see booked work, delayed work, revenue signals, and stuck tasks.",
              },
            ].map(({ step, title, metric, muted, wide, workflow, bars }) => (
              <div
                key={step}
                className={`dash-card${count >= step ? " active" : ""}${wide ? " wide" : ""}`}
              >
                <h4>{title}</h4>
                {metric && <div className="metric">{metric}</div>}
                {muted && <p className="muted">{muted}</p>}
                {workflow && (
                  <div className="workflow-line">
                    {["Lead", "Schedule", "Job", "Payment"].map((l) => (
                      <span key={l}>{l}</span>
                    ))}
                  </div>
                )}
                {bars && (
                  <div className="mini-bars">
                    {[1, 2, 3, 4, 5].map((b) => (
                      <i key={b} />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className={`clean-overlay${overlayShown ? " show" : ""}`}>
            <div className="clean-overlay-inner">
              <h3>We can fix this.</h3>
              <p>
                Your operations do not need more patches. They need one clean
                system designed around how your business actually runs.
              </p>
              <button className="cta-button">Book a Workflow Audit →</button>
            </div>
          </div>
        </div>
      </div>

      <div className="board-footer">
        <div className="board-progress">
          <span style={{ width: `${pct}%` }} />
        </div>
        <div className="board-count">{count} selected</div>
        <button className="reset-btn" onClick={reset}>
          Reset Option D
        </button>
      </div>
    </div>
  );
}

// ─── Main comparison shell ────────────────────────────────────────────────────

const TABS = [
  { id: "b", label: "Option B Meter" },
  { id: "c", label: "Option C List" },
  { id: "d", label: "Option D Board" },
];

export default function LaunchBoxComparison() {
  const [activeTab, setActiveTab] = useState("b");

  return (
    <>
      <style>{CSS}</style>
      <div className="page">
        {/* Tab bar */}
        <div className="compare-wrap">
          <div className="compare-top">
            <strong>LaunchBox Interactive Section Comparison</strong>
            <div className="tabbar">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  className={activeTab === t.id ? "active" : ""}
                  onClick={() => setActiveTab(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Option B */}
        {activeTab === "b" && (
          <div className="section-shell">
            <div className="section-head">
              <div>
                <div className="kicker">
                  <span>Option B</span> Symptom Dial / Meter
                </div>
                <h2>
                  Your Business Is Growing.
                  <br />
                  Your Systems <strong className="red-text">Are Not.</strong>
                </h2>
              </div>
              <div>
                <p className="intro">
                  Select the symptoms that feel familiar. The meter moves from
                  healthy to strained, cracks under pressure, and turns into a
                  rebuild CTA when the pattern is clear.
                </p>
                <div className="hint red-text">
                  <i className="hint-dot red-text" />
                  <span className="red-text">
                    Click pain points to move the health meter
                  </span>
                </div>
              </div>
            </div>
            <OptionB />
          </div>
        )}

        {/* Option C */}
        {activeTab === "c" && (
          <div className="section-shell">
            <div className="section-head">
              <div>
                <div className="kicker">
                  <span>Option C</span> Stacked Reveal List
                </div>
                <h2>
                  Your Business Is Growing.
                  <br />
                  Your Systems <strong>Are Not.</strong>
                </h2>
              </div>
              <div>
                <p className="intro">
                  Each pain point appears like a diagnostic checklist. Confirm
                  the rows that match your business, then watch them collapse
                  into a live tally that becomes the audit CTA.
                </p>
                <div className="hint">
                  <i className="hint-dot" />
                  Scroll, reveal, confirm, qualify
                </div>
              </div>
            </div>
            <OptionC active={activeTab === "c"} />
          </div>
        )}

        {/* Option D */}
        {activeTab === "d" && (
          <div className="section-shell">
            <div className="section-head">
              <div>
                <div className="kicker">
                  <span>Option D</span> Chaos Board → Clean Board
                </div>
                <h2>
                  Your Business Is Growing.
                  <br />
                  Your Systems <strong>Are Not.</strong>
                </h2>
              </div>
              <div>
                <p className="intro">
                  The left side starts messy by design. As a visitor confirms
                  pain points, the right side progressively builds the clean
                  dashboard they wish they had.
                </p>
                <div className="hint">
                  <i className="hint-dot" />
                  Select chaos, build clarity
                </div>
              </div>
            </div>
            <OptionD />
          </div>
        )}
      </div>
    </>
  );
}

// ─── CSS ──────────────────────────────────────────────────────────────────────

const CSS = `
:root {
  --ink: #151515;
  --muted: #6d6661;
  --paper: #fffaf5;
  --line: #eaded2;
  --brand: #a32d2d;
  --brand-dark: #791f1f;
  --brand-soft: #fcebeb;
  --amber: #f2a53c;
  --green: #45b783;
  --red: #c93636;
  --shadow: 0 28px 90px rgba(66,38,20,.13);
}
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
button { font: inherit; cursor: pointer; }

.page {
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Inter, Roboto, Arial, sans-serif;
  background:
    radial-gradient(circle at 12% 10%, rgba(163,45,45,.10), transparent 25%),
    radial-gradient(circle at 88% 14%, rgba(242,165,60,.14), transparent 28%),
    linear-gradient(135deg, #f2ebe3, #fffaf5 47%, #f7f0e9);
  color: var(--ink);
  padding: 32px;
}

/* Compare bar */
.compare-wrap { width: min(1240px, 100%); margin: 0 auto 18px; }
.compare-top {
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 24px;
  padding: 16px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  box-shadow: 0 15px 45px rgba(66,38,20,.08);
}
.compare-top strong { font-size: 18px; letter-spacing: -.025em; }
.tabbar { display: flex; gap: 8px; flex-wrap: wrap; }
.tabbar button {
  border: 1px solid rgba(163,45,45,.2);
  background: #fff;
  color: var(--brand-dark);
  border-radius: 999px;
  padding: 9px 13px;
  font-weight: 850;
}
.tabbar button.active { background: #f40e00; color: #fff; border-color: #f40e00; }

/* Section shell */
.section-shell {
  width: min(1200px, 100%);
  margin: 0 auto;
  background: rgba(255,250,245,.88);
  border: 1px solid rgba(234,222,210,.95);
  border-radius: 34px;
  box-shadow: var(--shadow);
  position: relative;
  overflow: hidden;
  padding: 34px;
}
.section-shell::before {
  content: "";
  position: absolute; inset: 0;
  background-image: radial-gradient(rgba(163,45,45,.14) 1px, transparent 1px);
  background-size: 22px 22px;
  opacity: .22;
  pointer-events: none;
}
.section-head {
  display: grid;
  grid-template-columns: 1.05fr .95fr;
  gap: 28px;
  align-items: end;
  position: relative;
  z-index: 2;
  margin-bottom: 28px;
}
.kicker {
  display: inline-flex; align-items: center; gap: 8px; width: max-content;
  border: 1px solid rgba(163,45,45,.22); background: #fff; color: var(--brand-dark);
  border-radius: 999px; padding: 7px 12px; font-size: 12px; font-weight: 800;
  letter-spacing: .02em; margin-bottom: 12px;
}
.kicker span { background: #f40e00; color: #fff; border-radius: 999px; padding: 2px 7px; font-size: 10px; }
h2 { font-size: clamp(32px, 5vw, 60px); line-height: .96; letter-spacing: -.055em; max-width: 720px; }
h2 strong { color: #f40e00; font-weight: 850; }
.intro { max-width: 520px; color: var(--muted); line-height: 1.7; font-size: 15px; }
.hint {
  display: inline-flex; align-items: center; gap: 9px; margin-top: 14px;
  background: #fff; border: 1px solid var(--line); color: var(--brand-dark);
  font-weight: 800; font-size: 12px; border-radius: 999px; padding: 8px 13px;
}
.hint-dot {
  display: inline-block; width: 8px; height: 8px; border-radius: 50%;
  background: #f40e00; box-shadow: 0 0 0 5px rgba(163,45,45,.12);
  animation: pulseDot 1.5s infinite; flex-shrink: 0;
}
@keyframes pulseDot { 50% { transform: scale(.75); opacity: .45; } }
.cta-button {
  border: none; background: #fff; color: #f40e00; border-radius: 14px;
  padding: 13px 18px; font-weight: 850;
  box-shadow: 0 15px 35px rgba(51,26,12,.12); transition: .22s ease; white-space: nowrap;
}
.cta-button:hover { transform: translateY(-2px); }
.reset-btn {
  border: 1px solid rgba(163,45,45,.22); background: #fff; color: var(--brand-dark);
  border-radius: 999px; padding: 10px 13px; font-weight: 800; font-size: 12px; transition: .2s ease;
}
.reset-btn:hover { border-color: #f40e00; transform: translateY(-1px); }
.actions { display: flex; justify-content: flex-end; margin-top: 16px; position: relative; z-index: 2; }

/* ── Option B ── */
.meter-layout {
  display: grid;
  grid-template-columns: 260px 1fr 260px;
  gap: 18px;
  align-items: center;
  position: relative;
  z-index: 2;
}
.side-grid { display: flex; flex-direction: column; gap: 11px; }
.meter-card {
  border: 1px solid var(--line); background: #fff; border-radius: 18px; padding: 13px;
  transition: .22s ease; min-height: 86px; text-align: left; width: 100%;
}
.meter-card:hover { transform: translateY(-3px); border-color: rgba(163,45,45,.45); background: #fff8f8; }
.meter-card.selected {
  background: #f40e00; color: #fff;
  box-shadow: 0 16px 45px rgba(163,45,45,.18);
}
.meter-card strong { display: block; font-size: 13px; margin-bottom: 4px; line-height: 1.25; }
.meter-card span { font-size: 12px; color: var(--muted); line-height: 1.35; display: block; }
.meter-card.selected span { color: rgba(255,255,255,255); }

.meter-stage { min-height: 520px; display: flex; align-items: center; justify-content: center; position: relative; }
.ambient-ring {
  position: absolute; width: 430px; height: 430px; border-radius: 50%;
  border: 1px solid rgba(163,45,45,.14); animation: ambientPulse 2.5s infinite;
}
.ambient-ring::after {
  content: ""; position: absolute; inset: 34px;
  border: 1px dashed rgba(163,45,45,.18); border-radius: 50%;
}
@keyframes ambientPulse {
  0%, 100% { transform: scale(.96); opacity: .7; }
  50% { transform: scale(1.04); opacity: 1; }
}
.meter {
  width: 390px; height: 390px; border-radius: 50%; position: relative;
  background: radial-gradient(circle, #fff 0 54%, #f7eee6 55% 100%);
  box-shadow: inset 0 0 0 16px #fff, 0 24px 70px rgba(66,38,20,.14);
  transition: .35s ease;
}
.meter.stress { animation: meterStress .32s ease; }
@keyframes meterStress {
  25% { transform: translateX(-3px) rotate(-1deg); }
  50% { transform: translateX(3px) rotate(1deg); }
  75% { transform: translateX(-2px); }
}
.meter-face {
  position: absolute; inset: 20px; border-radius: 50%;
  background: conic-gradient(from 230deg, var(--green) 0 28%, var(--amber) 28% 55%, var(--red) 55% 78%, transparent 78% 100%);
  overflow: hidden;
}
.meter-face::after {
  content: ""; position: absolute; inset: 52px; border-radius: 50%;
  background: #fffaf5; box-shadow: inset 0 0 0 1px var(--line);
}
.crack-svg { position: absolute; inset: 0; z-index: 4; pointer-events: none; }
.crack-svg path {
  fill: none; stroke: #5c1515; stroke-width: 3; stroke-linecap: round; stroke-linejoin: round;
  stroke-dasharray: 130; stroke-dashoffset: 130; opacity: 0; transition: .45s ease;
}
.meter.crack-1 #b-c1,
.meter.crack-2 #b-c1, .meter.crack-2 #b-c2,
.meter.crack-3 #b-c1, .meter.crack-3 #b-c2, .meter.crack-3 #b-c3 {
  stroke-dashoffset: 0; opacity: .72;
}
.needle {
  position: absolute; z-index: 5; left: 50%; top: 50%;
  width: 8px; height: 138px;
  background: linear-gradient(180deg, var(--brand-dark), #f40e00);
  border-radius: 999px; transform-origin: 50% 100%;
  transition: transform .75s cubic-bezier(.34, 1.56, .64, 1);
  box-shadow: 0 8px 25px rgba(163,45,45,.2);
}
.hub {
  position: absolute; z-index: 6; left: 50%; top: 50%;
  width: 34px; height: 34px; border-radius: 50%;
  background: #fff; border: 8px solid #f40e00;
  transform: translate(-50%, -50%);
  box-shadow: 0 10px 28px rgba(66,38,20,.18);
}
.meter-copy {
  position: absolute; z-index: 7; left: 50%; top: 61%;
  transform: translateX(-50%); text-align: center;
}
.meter-copy strong { display: block; font-size: 30px; letter-spacing: -.045em; }
.meter-copy span { font-size: 13px; color: var(--muted); font-weight: 800; }

.meter-cta {
  position: absolute; width: 390px; min-height: 390px; border-radius: 42px;
  background: #f40e00;
  display: flex; flex-direction: column; justify-content: center; align-items: flex-start;
  padding: 44px; z-index: 8; opacity: 0; pointer-events: none;
  transform: scale(.82) rotate(-4deg); transition: .65s cubic-bezier(.34, 1.56, .64, 1);
  box-shadow: 0 32px 90px rgba(121,31,31,.28);
  color: #fff;
}
.meter-cta.show { opacity: 1; pointer-events: auto; transform: scale(1) rotate(0deg); }
.meter-cta h3 { font-size: 42px; line-height: .95; letter-spacing: -.055em; margin-bottom: 14px; }
.meter-cta p { color: white; line-height: 1.6; font-size: 15px; margin-bottom: 18px; }
.meter.shattered { opacity: 0; transform: scale(.82); filter: blur(5px); }
.shards-wrap { position: absolute; inset: 0; pointer-events: none; }
.shard {
  position: absolute; width: 42px; height: 42px;
  background: rgba(255,255,255,.86); border: 1px solid rgba(163,45,45,.18);
  clip-path: polygon(50% 0, 100% 100%, 0 70%);
  animation: shardFly .8s ease forwards;
}
@keyframes shardFly { to { transform: translate(var(--x), var(--y)) rotate(var(--r)); opacity: 0; } }

/* ── Option C ── */
.reveal-wrap {
  display: grid; grid-template-columns: minmax(0,1fr) 340px;
  gap: 22px; position: relative; z-index: 2; align-items: start;
}
.reveal-list { display: flex; flex-direction: column; gap: 12px; min-height: 620px; }
.reveal-row {
  border: 1px solid var(--line); background: rgba(255,255,255,.78); border-radius: 20px;
  padding: 16px 17px; width: 100%; text-align: left;
  display: grid; grid-template-columns: 42px 1fr 32px; gap: 13px; align-items: center;
  position: relative; overflow: hidden;
  opacity: 0; transform: translateY(24px);
  transition: opacity .55s ease, transform .55s ease, border-color .2s ease,
    background .2s ease, max-height .5s ease, padding .5s ease, margin .5s ease;
  max-height: 120px;
}
.reveal-row.visible { opacity: 1; transform: translateY(0); }
.reveal-row:hover { border-color: rgba(163,45,45,.45); background: #fff8f8; transform: translateY(-2px); }
.reveal-row.confirmed {
  background: #f40e00; color: #fff; border-color: #f40e00;
  transform: translateX(30px) scale(.98); opacity: .35;
}
.reveal-row.collapsed {
  max-height: 0; padding-top: 0; padding-bottom: 0; margin-top: -12px;
  opacity: 0; pointer-events: none; border-width: 0;
}
.row-num {
  width: 42px; height: 42px; border-radius: 14px; background: var(--brand-soft);
  color: #f40e00; display: flex; align-items: center; justify-content: center;
  font-weight: 900; transition: .2s ease; flex-shrink: 0;
}
.reveal-row.confirmed .row-num { background: #fff; color: #f40e00; }
.row-copy strong { display: block; font-size: 15px; margin-bottom: 4px; letter-spacing: -.01em; }
.row-copy span { display: block; font-size: 13px; color: var(--muted); line-height: 1.45; }
.reveal-row.confirmed .row-copy span { color: rgba(255,255,255,.75); }
.row-check {
  width: 30px; height: 30px; border-radius: 50%; border: 1px solid rgba(163,45,45,.25);
  display: flex; align-items: center; justify-content: center; color: transparent;
  font-weight: 900; background: #fff; flex-shrink: 0;
}
.reveal-row.confirmed .row-check { color: #f40e00; }

.tally-side {
  position: sticky; top: 20px; background: #fff; border: 1px solid var(--line);
  border-radius: 26px; padding: 18px; min-height: 520px; overflow: hidden;
  box-shadow: 0 24px 60px rgba(66,38,20,.10); transition: .55s cubic-bezier(.2,.8,.2,1);
}
.tally-top { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 14px; }
.tally-top strong { font-size: 16px; letter-spacing: -.02em; }
.counter-pill {
  background: var(--brand-soft); color: #f40e00; border-radius: 999px;
  padding: 7px 11px; font-weight: 900; font-size: 12px; white-space: nowrap;
}
.counter-track {
  height: 260px; border-radius: 22px;
  background: linear-gradient(180deg, #f5efe8, #fff); border: 1px solid var(--line);
  position: relative; overflow: hidden; margin-bottom: 14px;
}
.counter-fill {
  position: absolute; left: 0; right: 0; bottom: 0; height: 0%;
  background: linear-gradient(180deg, #d64b4b, #f40e00); border-radius: 22px 22px 0 0;
  transition: height .6s cubic-bezier(.34, 1.56, .64, 1);
}
.counter-fill::before {
  content: ""; position: absolute; inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,.28), transparent);
  animation: shine 2.4s infinite;
}
@keyframes shine { 0% { transform: translateX(-120%); } 100% { transform: translateX(120%); } }
.threshold-line { position: absolute; left: 14px; right: 14px; bottom: 50%; border-top: 2px dashed rgba(163,45,45,.34); }
.threshold-line span {
  position: absolute; right: 0; top: -23px; background: #fff; color: var(--brand-dark);
  font-size: 11px; font-weight: 900; padding: 3px 7px; border-radius: 999px; border: 1px solid var(--line);
}
.tally-items { display: flex; flex-direction: column; gap: 8px; min-height: 112px; }
.empty-state {
  color: var(--muted); font-size: 13px; line-height: 1.55; padding: 10px;
  border: 1px dashed var(--line); border-radius: 14px; background: #fffaf7;
}
.tally-chip {
  background: #fff7f7; border: 1px solid rgba(163,45,45,.18); color: var(--brand-dark);
  border-radius: 14px; padding: 8px 8px 8px 11px; font-size: 12px; font-weight: 800; line-height: 1.35;
  animation: chipIn .35s ease both;
  display: flex; align-items: center; justify-content: space-between; gap: 8px;
}
@keyframes chipIn { from { opacity: 0; transform: translateX(18px) scale(.97); } to { opacity: 1; transform: none; } }
.chip-label { flex: 1; }
.chip-remove {
  flex-shrink: 0; width: 24px; height: 24px; border-radius: 8px; border: none;
  background: rgba(163,45,45,.10); color: #f40e00; font-size: 11px; font-weight: 900;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: background .15s, transform .15s; line-height: 1;
}
.chip-remove:hover { background: #f40e00; color: #fff; transform: scale(1.1); }
.reveal-row.restoring {
  animation: rowReturn .45s cubic-bezier(.34,1.56,.64,1) both;
}
@keyframes rowReturn {
  from { opacity: 0; transform: translateX(-20px) scale(.97); }
  to { opacity: 1; transform: none; }
}
.side-cta {
  position: absolute; inset: 0;
  background: linear-gradient(145deg, #f40e00, var(--brand-dark)); color: #fff;
  padding: 24px; display: flex; flex-direction: column; justify-content: center;
  align-items: flex-start; gap: 14px; opacity: 0; pointer-events: none;
  transform: scale(.94); transition: .5s cubic-bezier(.34, 1.56, .64, 1);
}
.side-cta::before {
  content: ""; position: absolute; width: 240px; height: 240px;
  border: 1px solid rgba(255,255,255,.18); border-radius: 50%; right: -80px; top: -80px;
}
.side-cta h3 { font-size: 32px; line-height: 1; letter-spacing: -.04em; max-width: 260px; position: relative; }
.side-cta p { font-size: 14px; line-height: 1.6; color: rgba(255,255,255,.78); position: relative; }
.side-cta .cta-button { position: relative; }
.tally-side.qualified { min-height: 420px; transform: translateY(-2px); box-shadow: 0 35px 90px rgba(121,31,31,.22); }
.tally-side.qualified .side-cta { opacity: 1; pointer-events: auto; transform: scale(1); }

/* ── Option D ── */
.board-wrap { display: grid; grid-template-columns: 1fr 1fr; gap: 22px; position: relative; z-index: 2; }
.board-panel {
  border: 1px solid var(--line); border-radius: 28px; min-height: 620px;
  position: relative; overflow: hidden; box-shadow: 0 24px 60px rgba(66,38,20,.09);
}
.panel-label {
  position: absolute; left: 18px; top: 18px; z-index: 5;
  background: #fff; border: 1px solid var(--line); border-radius: 999px;
  padding: 8px 12px; font-size: 12px; font-weight: 900; color: var(--brand-dark);
}
.chaos-panel { background: linear-gradient(140deg, #fffaf5, #f9efe9); }
.chaos-lines { position: absolute; inset: 0; width: 100%; height: 100%; opacity: .48; pointer-events: none; }
.mess-note {
  position: absolute; width: 180px; min-height: 96px; background: #fff;
  border: 1px solid rgba(163,45,45,.18); box-shadow: 0 18px 40px rgba(66,38,20,.10);
  border-radius: 18px; padding: 14px; text-align: left;
  transition: .28s cubic-bezier(.2,.8,.2,1); z-index: 3;
}
.mess-note:hover { transform: translateY(-6px) rotate(0deg) !important; border-color: rgba(163,45,45,.50); box-shadow: 0 22px 55px rgba(66,38,20,.15); }
.mess-note.selected {
  background: #f40e00; color: #fff; border-color: #f40e00;
  box-shadow: 0 20px 50px rgba(163,45,45,.26);
}
.mess-note.selected::after {
  content: "✓"; position: absolute; right: 12px; top: 10px;
  width: 24px; height: 24px; border-radius: 50%; background: #fff;
  color: #f40e00; display: flex; align-items: center; justify-content: center; font-weight: 950;
}
.mess-note strong { display: block; font-size: 13px; line-height: 1.25; margin-bottom: 6px; }
.mess-note span { display: block; font-size: 12px; line-height: 1.35; color: var(--muted); }
.mess-note.selected span { color: rgba(255,255,255,.76); }
.m1 { left: 42px; top: 92px; transform: rotate(-7deg); }
.m2 { right: 50px; top: 78px; transform: rotate(8deg); }
.m3 { left: 178px; top: 196px; transform: rotate(3deg); }
.m4 { left: 36px; top: 318px; transform: rotate(6deg); }
.m5 { right: 38px; top: 292px; transform: rotate(-8deg); }
.m6 { left: 205px; bottom: 88px; transform: rotate(-2deg); }
.m7 { left: 54px; bottom: 70px; transform: rotate(9deg); }
.m8 { right: 72px; bottom: 54px; transform: rotate(5deg); }
.m9 { right: 165px; top: 430px; transform: rotate(-9deg); }
.clean-panel { background: linear-gradient(145deg, #fff, #fff8f4); }
.dashboard {
  position: absolute; inset: 70px 24px 24px;
  display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: auto auto 1fr; gap: 14px;
}
.dash-card {
  background: #fff; border: 1px solid var(--line); border-radius: 20px; padding: 16px;
  opacity: .22; filter: grayscale(1); transform: translateY(14px) scale(.97);
  transition: .45s cubic-bezier(.34, 1.56, .64, 1); position: relative; overflow: hidden;
}
.dash-card.active { opacity: 1; filter: grayscale(0); transform: none; }
.dash-card.active::before {
  content: ""; position: absolute; inset: 0;
  background: linear-gradient(90deg, transparent, rgba(163,45,45,.08), transparent);
  animation: dashSweep 1.2s ease both;
}
@keyframes dashSweep { from { transform: translateX(-100%); } to { transform: translateX(100%); } }
.dash-card h4 { font-size: 13px; margin-bottom: 8px; color: var(--brand-dark); }
.metric { font-size: 30px; font-weight: 950; letter-spacing: -.05em; }
.muted { font-size: 12px; color: var(--muted); line-height: 1.5; }
.wide { grid-column: 1 / 3; }
.mini-bars { display: flex; align-items: end; gap: 8px; height: 80px; margin-top: 12px; }
.mini-bars i {
  display: block; flex: 1; border-radius: 8px 8px 4px 4px;
  background: linear-gradient(180deg, #d94e4e, #f40e00); height: 22%; opacity: .2;
  transition: .45s ease; font-style: normal;
}
.dash-card.active .mini-bars i { opacity: 1; }
.dash-card.active .mini-bars i:nth-child(2) { height: 48%; }
.dash-card.active .mini-bars i:nth-child(3) { height: 70%; }
.dash-card.active .mini-bars i:nth-child(4) { height: 52%; }
.dash-card.active .mini-bars i:nth-child(5) { height: 86%; }
.workflow-line { display: grid; grid-template-columns: repeat(4,1fr); gap: 10px; margin-top: 14px; }
.workflow-line span {
  border: 1px solid var(--line); border-radius: 14px; padding: 12px 8px; text-align: center;
  font-size: 12px; font-weight: 850; background: #fff8f8; color: var(--brand-dark); opacity: .32;
}
.dash-card.active .workflow-line span { opacity: 1; }
.clean-overlay {
  position: absolute; inset: 0; background: rgba(121,31,31,.88); backdrop-filter: blur(6px);
  color: #fff; z-index: 10; display: flex; align-items: center; justify-content: center;
  text-align: center; padding: 34px; opacity: 0; pointer-events: none; transition: .55s ease;
}
.clean-overlay.show { opacity: 1; pointer-events: auto; }
.clean-overlay-inner { max-width: 380px; transform: translateY(18px); transition: .55s cubic-bezier(.34,1.56,.64,1); }
.clean-overlay.show .clean-overlay-inner { transform: none; }
.clean-overlay h3 { font-size: 44px; line-height: .95; letter-spacing: -.055em; margin-bottom: 12px; }
.clean-overlay p { font-size: 15px; line-height: 1.65; color: rgba(255,255,255,.78); margin-bottom: 18px; }
.board-footer {
  display: flex; align-items: center; justify-content: space-between; gap: 16px;
  margin-top: 16px; position: relative; z-index: 2;
}
.board-progress { flex: 1; background: #fff; border: 1px solid var(--line); border-radius: 999px; height: 16px; overflow: hidden; }
.board-progress span {
  display: block; height: 100%; width: 0%;
  background: linear-gradient(90deg, var(--amber), #f40e00); border-radius: 999px;
  transition: width .45s cubic-bezier(.34, 1.56, .64, 1);
}
.board-count { font-weight: 900; color: var(--brand-dark); white-space: nowrap; }

/* ── Responsive ── */
@media (max-width: 1050px) {
  .meter-layout { grid-template-columns: 1fr; }
  .side-grid { display: grid; grid-template-columns: repeat(2,1fr); }
  .meter-stage { order: -1; }
  .board-wrap { grid-template-columns: 1fr; }
  .board-panel { min-height: 650px; }
}
@media (max-width: 930px) {
  .reveal-wrap { grid-template-columns: 1fr; }
  .tally-side { position: relative; top: auto; min-height: 430px; }
  .reveal-list { min-height: auto; }
  .counter-track { height: 180px; }
}
@media (max-width: 850px) {
  .page { padding: 16px; }
  .section-shell { padding: 22px; border-radius: 24px; }
  .section-head { grid-template-columns: 1fr; }
  h2 { letter-spacing: -.04em; }
  .compare-top { align-items: flex-start; flex-direction: column; }
}
@media (max-width: 620px) {
  .side-grid { grid-template-columns: 1fr; }
  .meter, .meter-cta { width: 310px; height: 310px; min-height: 310px; }
  .ambient-ring { width: 340px; height: 340px; }
  .needle { height: 105px; }
  .meter-cta { padding: 30px; }
  .meter-cta h3 { font-size: 32px; }
  .mess-note { position: relative !important; left: auto !important; right: auto !important; top: auto !important; bottom: auto !important; width: calc(100% - 32px) !important; transform: none !important; margin: 10px 16px; }
  .chaos-panel { padding-top: 60px; padding-bottom: 20px; }
  .chaos-lines { display: none; }
  .dashboard { position: relative; inset: auto; padding: 74px 16px 16px; grid-template-columns: 1fr; }
  .wide { grid-column: auto; }
  .board-panel { min-height: auto; }
  .clean-overlay h3 { font-size: 34px; }
}
`;
