"use client";

import { useState, useRef, useEffect, useCallback } from "react";

const BOXES = [
  {
    id: 1,
    cat: "sys",
    icon: "🕐",
    text: "Your scheduling lives in a spreadsheet. Or someone's head.",
  },
  {
    id: 2,
    cat: "sys",
    icon: "👥",
    text: "Staff coordination happens over calls, texts, and WhatsApp group chats.",
  },
  {
    id: 3,
    cat: "sys",
    icon: "📒",
    text: "Customer records are scattered across three different tools and a notes app.",
  },
  {
    id: 4,
    cat: "vis",
    icon: "🙈",
    text: "You can't see what's happening in the field without calling someone.",
  },
  {
    id: 5,
    cat: "sys",
    icon: "🧾",
    text: "Invoices, job updates, and payments are handled in completely different places.",
  },
  {
    id: 6,
    cat: "sys",
    icon: "🧩",
    text: "You bought SaaS tools that almost fit. But not quite.",
  },
  {
    id: 7,
    cat: "sys",
    icon: "🔧",
    text: "Your team has built workarounds for the workarounds.",
  },
  {
    id: 8,
    cat: "vis",
    icon: "😔",
    text: "You're spending more time managing the chaos than actually running the business.",
  },
  {
    id: 9,
    cat: "vis",
    icon: "📊",
    text: "There's no single place to see how your business is actually performing.",
  },
];

const LEVELS = [
  {
    min: 0,
    max: 0,
    msg: "Click the boxes that apply to your business",
    bdg: "Not started",
    bc: "badge-0",
  },
  {
    min: 1,
    max: 2,
    msg: "You're not alone — most growing businesses deal with this",
    bdg: "Just starting",
    bc: "badge-1",
  },
  {
    min: 3,
    max: 5,
    msg: "This is costing you more than you think",
    bdg: "Getting real",
    bc: "badge-1",
  },
  {
    min: 6,
    max: 8,
    msg: "You're describing most of our clients almost exactly",
    bdg: "Almost all of it",
    bc: "badge-2",
  },
  {
    min: 9,
    max: 9,
    msg: "This is exactly the problem LaunchBox was built to solve",
    bdg: "That's everything",
    bc: "badge-3",
  },
];

function getLevel(sel) {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (sel >= LEVELS[i].min && sel <= LEVELS[i].max) return LEVELS[i];
  }
  return LEVELS[0];
}

function isQualified(selected, boxes) {
  const selectedBoxes = boxes.filter((b) => selected.has(b.id));
  const hasSys = selectedBoxes.some((b) => b.cat === "sys");
  const hasVis = selectedBoxes.some((b) => b.cat === "vis");
  return hasSys && hasVis;
}

function fireConfetti(canvas) {
  const c = canvas;
  const ctx = c.getContext("2d");
  c.width = window.innerWidth;
  c.height = window.innerHeight;
  const cols = ["#A32D2D", "#FCEBEB", "#F09595", "#E24B4A", "#fff", "#791F1F"];
  const ps = Array.from({ length: 140 }, () => ({
    x: Math.random() * c.width,
    y: -10 - Math.random() * 180,
    w: 5 + Math.random() * 8,
    h: 9 + Math.random() * 6,
    col: cols[Math.floor(Math.random() * cols.length)],
    rot: Math.random() * 360,
    rs: (Math.random() - 0.5) * 7,
    vy: 2 + Math.random() * 3,
    vx: (Math.random() - 0.5) * 2,
    op: 1,
  }));

  let f = 0;
  function draw() {
    ctx.clearRect(0, 0, c.width, c.height);
    ps.forEach((p) => {
      ctx.save();
      ctx.globalAlpha = p.op;
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rot * Math.PI) / 180);
      ctx.fillStyle = p.col;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
      p.y += p.vy;
      p.x += p.vx;
      p.rot += p.rs;
      if (f > 50) p.op -= 0.014;
    });
    f++;
    if (f < 170) requestAnimationFrame(draw);
    else ctx.clearRect(0, 0, c.width, c.height);
  }
  draw();
}

export default function LaunchBoxChecklist() {
  const [selected, setSelected] = useState(new Set());
  const [msgVisible, setMsgVisible] = useState(true);
  const [displayedLevel, setDisplayedLevel] = useState(LEVELS[0]);
  const [glowBtn, setGlowBtn] = useState(false);
  const [shakingId, setShakingId] = useState(null);
  const [ripples, setRipples] = useState({});
  const canvasRef = useRef(null);
  const ctaShownRef = useRef(false);

  const sel = selected.size;
  const pct = Math.round((sel / 9) * 100);
  const qualified = isQualified(selected, BOXES);

  // Fade-swap message when level changes
  useEffect(() => {
    const newLevel = getLevel(sel);
    if (newLevel.msg === displayedLevel.msg) return;
    setMsgVisible(false);
    const t = setTimeout(() => {
      setDisplayedLevel(newLevel);
      setMsgVisible(true);
    }, 180);
    return () => clearTimeout(t);
  }, [sel]); // eslint-disable-line react-hooks/exhaustive-deps

  // CTA glow on first show
  useEffect(() => {
    if (qualified && !ctaShownRef.current) {
      ctaShownRef.current = true;
      const t = setTimeout(() => {
        setGlowBtn(true);
        setTimeout(() => setGlowBtn(false), 1200);
      }, 500);
      return () => clearTimeout(t);
    }
    if (!qualified) ctaShownRef.current = false;
  }, [qualified]);

  const handlePick = useCallback((box, e) => {
    // Capture DOM values synchronously before React nullifies currentTarget
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(
      e.currentTarget.offsetWidth,
      e.currentTarget.offsetHeight,
    );
    const clientX = e.clientX;
    const clientY = e.clientY;

    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(box.id)) {
        next.delete(box.id);
      } else {
        next.add(box.id);
        // Ripple
        const ripple = {
          id: Date.now(),
          size,
          left: clientX - rect.left - size / 2,
          top: clientY - rect.top - size / 2,
        };
        setRipples((r) => ({ ...r, [box.id]: ripple }));
        setTimeout(
          () =>
            setRipples((r) => {
              const c = { ...r };
              delete c[box.id];
              return c;
            }),
          500,
        );
        // Shake
        setShakingId(box.id);
        setTimeout(() => setShakingId(null), 400);
        // Confetti on all 9
        if (next.size === 9 && canvasRef.current)
          fireConfetti(canvasRef.current);
      }
      return next;
    });
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 9999,
        }}
      />
      <div style={styles.page}>
        <div style={styles.card}>
          {/* Header */}
          <div style={styles.header}>
            <h2 style={styles.headline}>
              Your Business Is Growing.
              <br />
              Your Systems <span style={{ color: "#f40e00" }}>Are Not.</span>
            </h2>
            <div>
              <p style={styles.sub}>
                Most service businesses hit a point where the tools that got
                them here start holding them back. Here's what that usually
                looks like.
              </p>
              <div style={styles.pill} className="">
                <span style={styles.dot} />
                Click everything that sounds familiar
              </div>
            </div>
          </div>

          {/* Grid */}
          <div style={styles.grid}>
            {BOXES.map((box) => {
              const isSelected = selected.has(box.id);
              const isShaking = shakingId === box.id;
              const ripple = ripples[box.id];
              return (
                <button
                  key={box.id}
                  onClick={(e) => handlePick(box, e)}
                  style={{
                    ...styles.box,
                    ...(isSelected ? styles.boxSelected : {}),
                    animation: isShaking ? "shake 0.35s ease" : "none",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      ...styles.icon,
                      ...(isSelected
                        ? styles.iconSelected
                        : styles.iconUnselected),
                    }}
                  >
                    {box.icon}
                  </div>
                  <div style={styles.boxText}>{box.text}</div>
                  {ripple && (
                    <span
                      key={ripple.id}
                      style={{
                        position: "absolute",
                        borderRadius: "50%",
                        background: "rgba(163,45,45,0.15)",
                        width: ripple.size,
                        height: ripple.size,
                        left: ripple.left,
                        top: ripple.top,
                        transform: "scale(0)",
                        animation: "ripout 0.5s ease-out forwards",
                        pointerEvents: "none",
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Progress */}
          <div style={styles.progWrap}>
            <div style={styles.progTop}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    ...styles.msg,
                    opacity: msgVisible ? 1 : 0,
                    transition: "opacity 0.2s",
                    fontSize: 13,
                    fontWeight: 500,
                    color: "#111",
                  }}
                >
                  {displayedLevel.msg}
                </span>
                <span
                  style={{ ...styles.badge, ...badgeStyles[displayedLevel.bc] }}
                >
                  {displayedLevel.bdg}
                </span>
              </div>
              <span style={{ fontSize: 13, fontWeight: 500, color: "#A32D2D" }}>
                {sel} selected
              </span>
            </div>
            <div style={styles.track}>
              <div style={{ ...styles.bar, width: `${pct}%` }} />
            </div>

            {/* CTA */}
            <div
              style={{
                ...styles.ctaWrap,
                maxHeight: qualified ? 80 : 0,
                opacity: qualified ? 1 : 0,
                marginTop: qualified ? "0.85rem" : 0,
              }}
            >
              <div style={styles.ctaInner}>
                <div style={styles.ctaLeft}>
                  <strong
                    style={{
                      color: "#fff",
                      fontWeight: 500,
                      display: "block",
                      fontSize: 14,
                      marginBottom: 2,
                    }}
                  >
                    Sounds like we should talk.
                  </strong>
                  Book a free Workflow Audit — no commitment.
                </div>
                <button
                  style={{
                    ...styles.ctaBtn,
                    animation: glowBtn ? "glowpulse 0.6s ease-out 2" : "none",
                  }}
                >
                  Book a Workflow Audit →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.2} }
        @keyframes shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-4px)} 40%{transform:translateX(4px)} 60%{transform:translateX(-3px)} 80%{transform:translateX(2px)} }
        @keyframes ripout { to{transform:scale(4);opacity:0} }
        @keyframes glowpulse { 0%,100%{box-shadow:0 0 0 0 rgba(255,255,255,0)} 50%{box-shadow:0 0 0 6px rgba(255,255,255,0.3)} }
        @keyframes sparkpop { 0%{transform:scale(0.5);opacity:1} 100%{transform:scale(2.5);opacity:0} }
        button { cursor: pointer; border: none; background: none; font-family: inherit; }
      `}</style>
    </>
  );
}

const styles = {
  page: {
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    background: "#f5f5f5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    padding: "2rem",
    boxSizing: "border-box",
  },
  card: {
    background: "#fff",
    borderRadius: 16,
    padding: "2.5rem 2rem",
    maxWidth: 1100,
    width: "100%",
  },
  header: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "2rem",
    alignItems: "start",
    marginBottom: "1.5rem",
  },
  headline: {
    fontSize: "clamp(22px, 3vw, 36px)",
    fontWeight: 700,
    lineHeight: 1.2,
    color: "#111",
    margin: 0,
  },
  sub: {
    fontSize: 14,
    color: "#666",
    lineHeight: 1.7,
    marginBottom: "0.85rem",
  },
  pill: {
    display: "inline-flex",
    alignItems: "center",
    gap: 7,
    background: "#FCEBEB",
    border: "0.5px solid #F09595",
    borderRadius: 20,
    padding: "5px 13px",
    fontSize: 12,
    fontWeight: 500,
    color: "#f40e00",
  },
  dot: {
    display: "inline-block",
    width: 7,
    height: 7,
    borderRadius: "50%",
    background: "#f40e00",
    animation: "blink 1.4s ease-in-out infinite",
    flexShrink: 0,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 12,
    marginBottom: "1.1rem",
  },
  box: {
    border: "1px solid #e5e5e5",
    borderRadius: 12,
    padding: "1rem",
    background: "#fff",
    transition: "border-color 0.2s, background 0.2s",
    minHeight: 100,
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    textAlign: "left",
    width: "100%",
  },
  boxSelected: {
    background: "#FCEBEB",
    borderColor: "#f40e00",
    borderWidth: 1.5,
  },
  icon: {
    width: 30,
    height: 30,
    borderRadius: 7,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 16,
    flexShrink: 0,
  },
  iconUnselected: {
    background: "#FEF2F2",
  },
  iconSelected: {
    background: "#f40e00",
    color: "#f40e00",
  },
  boxText: {
    fontSize: 12.5,
    color: "#111",
    lineHeight: 1.5,
  },
  progWrap: {
    background: "#f9f9f9",
    borderRadius: 12,
    padding: "1rem 1.25rem",
  },
  progTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
    flexWrap: "wrap",
    gap: 8,
  },
  msg: {},
  badge: {
    fontSize: 11,
    fontWeight: 500,
    padding: "2px 9px",
    borderRadius: 20,
  },
  track: {
    height: 6,
    background: "#e5e5e5",
    borderRadius: 3,
    overflow: "hidden",
  },
  bar: {
    height: 6,
    background: "#A32D2D",
    borderRadius: 3,
    transition: "width 0.5s cubic-bezier(0.34,1.56,0.64,1)",
  },
  ctaWrap: {
    overflow: "hidden",
    transition:
      "max-height 0.5s cubic-bezier(0.34,1.56,0.64,1), opacity 0.4s, margin-top 0.4s",
  },
  ctaInner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "linear-gradient(135deg, #A32D2D, #791F1F)",
    borderRadius: 12,
    padding: "0.9rem 1.25rem",
    gap: "0.75rem",
    flexWrap: "wrap",
  },
  ctaLeft: {
    fontSize: 13,
    color: "rgba(255,255,255,0.85)",
    lineHeight: 1.4,
  },
  ctaBtn: {
    background: "#fff",
    color: "#A32D2D",
    borderRadius: 8,
    padding: "8px 18px",
    fontSize: 13,
    fontWeight: 500,
    whiteSpace: "nowrap",
    transition: "transform 0.15s",
    cursor: "pointer",
  },
};

const badgeStyles = {
  "badge-0": { background: "#f0f0f0", color: "#888" },
  "badge-1": { background: "#FAEEDA", color: "#854F0B" },
  "badge-2": { background: "#E6F1FB", color: "#185FA5" },
  "badge-3": { background: "#EAF3DE", color: "#3B6D11" },
};
