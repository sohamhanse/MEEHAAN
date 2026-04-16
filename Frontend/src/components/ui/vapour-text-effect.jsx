import { useEffect, useRef } from 'react';

/**
 * VaporizeText
 * Draws `text` on a hidden canvas, samples its pixels into particles,
 * then animates them drifting upward and fading — "vaporizing" the text.
 *
 * Props:
 *  text       {string}   — text to display
 *  color      {string}   — particle color e.g. '#F5921E'
 *  fontSize   {number}   — px size (auto-calculated if omitted)
 *  fontFamily {string}   — e.g. '"Syne", sans-serif'
 *  fontWeight {string|number}
 *  gap        {number}   — pixel sampling gap (lower = more particles, heavier)
 *  holdMs     {number}   — ms to hold text before vaporizing (default 800)
 *  vaporMs    {number}   — ms for vaporize phase (default 2200)
 *  fadeInMs   {number}   — ms for text fade-in phase (default 500)
 *  onComplete {function} — called when animation finishes
 */
const VaporizeText = ({
  text = 'MEEHAAN',
  color = '#F5921E',
  fontSize,
  fontFamily = '"Syne", "DM Sans", sans-serif',
  fontWeight = 800,
  gap = 4,
  holdMs = 900,
  vaporMs = 2000,
  fadeInMs = 500,
  onComplete,
}) => {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const W = canvas.width = window.innerWidth;
    const H = canvas.height = window.innerHeight;

    // ── Offscreen canvas: render text once to sample pixels ──────────────────
    const off = document.createElement('canvas');
    off.width = W;
    off.height = H;
    const offCtx = off.getContext('2d');

    const fs = fontSize ?? Math.min(W * 0.18, 140, H * 0.3);
    offCtx.font = `${fontWeight} ${fs}px ${fontFamily}`;
    offCtx.fillStyle = '#ffffff';
    offCtx.textAlign = 'center';
    offCtx.textBaseline = 'middle';
    offCtx.fillText(text, W / 2, H / 2);

    // ── Sample lit pixels into particle array ─────────────────────────────────
    const data = offCtx.getImageData(0, 0, W, H).data;
    const particles = [];

    for (let y = 0; y < H; y += gap) {
      for (let x = 0; x < W; x += gap) {
        const idx = (y * W + x) * 4;
        if (data[idx + 3] > 100) {
          particles.push({
            x, y,
            vx: (Math.random() - 0.5) * 0.8,
            vy: -(Math.random() * 1.8 + 0.5),
            size: Math.random() * 1.5 + 0.8,
            alpha: 1,
            // slight colour variation for life
            brightness: 0.85 + Math.random() * 0.3,
          });
        }
      }
    }

    // ── Parse the brand color once ─────────────────────────────────────────────
    // color can be '#F5921E' or 'rgb(...)'. We store as-is and adjust alpha via globalAlpha.
    const TOTAL = fadeInMs + holdMs + vaporMs;
    let startTs = null;

    const animate = (ts) => {
      if (!startTs) startTs = ts;
      const elapsed = ts - startTs;
      const progress = Math.min(elapsed / TOTAL, 1);

      ctx.clearRect(0, 0, W, H);

      if (elapsed < fadeInMs) {
        // Phase 1 — fade in text as solid image
        const t = elapsed / fadeInMs;
        ctx.globalAlpha = t;
        ctx.drawImage(off, 0, 0);
        ctx.globalAlpha = 1;

      } else if (elapsed < fadeInMs + holdMs) {
        // Phase 2 — hold text solid
        ctx.globalAlpha = 1;
        ctx.drawImage(off, 0, 0);
        ctx.globalAlpha = 1;

      } else {
        // Phase 3 — vaporize: replace image pixels with drifting particles
        const vProgress = (elapsed - fadeInMs - holdMs) / vaporMs; // 0 → 1
        const speed = 1 + vProgress * 4;

        particles.forEach((p) => {
          p.x += p.vx * speed;
          p.y += p.vy * speed;
          p.alpha = Math.max(0, 1 - vProgress * 1.6);

          ctx.globalAlpha = p.alpha * p.brightness;
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.globalAlpha = 1;
      }

      if (elapsed < TOTAL) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        onComplete?.();
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [text, color, fontSize, fontFamily, fontWeight, gap, holdMs, vaporMs, fadeInMs, onComplete]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, display: 'block' }}
      aria-hidden="true"
    />
  );
};

export default VaporizeText;
