// Bake smoke + fire onto CC0 interior photos -> assets/scenarios/inside/*.jpg
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
// Usage: node tools/bake-inside.js <folder with the source photos 00.jpg (bedroom), 01.jpg (living room), 02.jpg (hallway)> [out folder] [names]
const SRC = (process.argv[2] || '.') + '/';
const OUT = process.argv[3] || 'assets/scenarios/inside/';
fs.mkdirSync(OUT, { recursive: true });
const defs = `<defs>
 <filter id="smokeTex" x="-10%" y="-10%" width="120%" height="120%">
  <feTurbulence type="fractalNoise" baseFrequency="0.004 0.012" numOctaves="5" seed="7" result="n"/>
  <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.09  0 0 0 0 0.09  0 0 0 0 0.10  0 0 0 -1.1 1.15" result="tex"/>
  <feComposite in="tex" in2="SourceGraphic" operator="in" result="t2"/>
  <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="t2"/></feMerge>
 </filter>
 <filter id="edge" x="-20%" y="-30%" width="140%" height="160%">
  <feTurbulence type="fractalNoise" baseFrequency="0.006 0.03" numOctaves="3" seed="2" result="n"/>
  <feDisplacementMap in="SourceGraphic" in2="n" scale="90" xChannelSelector="R" yChannelSelector="G" result="d"/>
  <feGaussianBlur in="d" stdDeviation="14"/>
 </filter>
 <filter id="flame" x="-30%" y="-40%" width="160%" height="180%">
  <feTurbulence type="fractalNoise" baseFrequency="0.012 0.045" numOctaves="3" seed="11" result="n"/>
  <feDisplacementMap in="SourceGraphic" in2="n" scale="70" xChannelSelector="R" yChannelSelector="G" result="d"/>
  <feGaussianBlur in="d" stdDeviation="5"/>
 </filter>
 <filter id="soft"><feGaussianBlur stdDeviation="30"/></filter>
 <linearGradient id="smk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0d0b0a" stop-opacity="0.97"/><stop offset="0.7" stop-color="#1d1a17" stop-opacity="0.93"/><stop offset="1" stop-color="#2a2a2c" stop-opacity="0.75"/></linearGradient>
 <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#ffb04a" stop-opacity="0.95"/><stop offset="0.4" stop-color="#ff6418" stop-opacity="0.55"/><stop offset="1" stop-color="#ff3000" stop-opacity="0"/></radialGradient>
 <linearGradient id="fl" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#ffe9a0" stop-opacity="0.9"/><stop offset="0.2" stop-color="#ffb336"/><stop offset="0.6" stop-color="#ff6a10"/><stop offset="1" stop-color="#b81a05" stop-opacity="0"/></linearGradient>
 <linearGradient id="roll" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffcf6a"/><stop offset="0.35" stop-color="#ff7a1a" stop-opacity="0.9"/><stop offset="1" stop-color="#ff3000" stop-opacity="0"/></linearGradient>
</defs>`;
function smoke(bottom) { return `<g filter="url(#edge)"><rect x="-100" y="-100" width="1480" height="${bottom + 100}" fill="url(#smk)" filter="url(#smokeTex)"/></g><rect x="0" y="0" width="1280" height="720" fill="#262628" opacity="0.28"/>`; }
function glow(x, y, rx, ry, o) { return `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="url(#glow)" opacity="${o || 1}" style="mix-blend-mode:screen"/>`; }
function flames(x, base, w, h, seed) {
  seed = seed || 1;
  let s = `<g filter="url(#flame)" style="mix-blend-mode:screen">`;
  const n = Math.max(5, Math.round(w / 38));
  for (let i = 0; i < n; i++) {
    const r = Math.abs(Math.sin(i * 12.9898 + seed * 78.233)) % 1;
    const cx = x - w / 2 + (w / (n - 1)) * i + (r - 0.5) * 30, hh = h * (0.35 + 0.75 * r), ww = (w / n) * (1.4 + r);
    s += `<path d="M${cx - ww / 2},${base} C${cx - ww / 2},${base - hh * 0.5} ${cx - ww * 0.2},${base - hh * 0.8} ${cx + ww * 0.08},${base - hh} C${cx + ww * 0.25},${base - hh * 0.65} ${cx + ww / 2},${base - hh * 0.4} ${cx + ww / 2},${base} Z" fill="url(#fl)" opacity="${0.55 + 0.4 * r}"/>`;
  }
  return s + `</g>`;
}
function rollover(x1, x2, y, d) {
  let p = `M${x1},${y - 10}`;
  const steps = 9, dx = (x2 - x1) / steps;
  for (let i = 0; i < steps; i++) { const a = x1 + dx * i, b = a + dx; p += ` Q${a + dx / 2},${y + d * (i % 2 ? 1.1 : 0.55)} ${b},${y + d * 0.15}`; }
  p += ` L${x2},${y - 40} L${x1},${y - 40} Z`;
  return `<g filter="url(#flame)" style="mix-blend-mode:screen"><path d="${p}" fill="url(#roll)" opacity="0.92"/></g>`;
}
function victim(x, y, s) {
  return `<g transform="translate(${x},${y}) scale(${s})" style="filter:blur(1.6px)" opacity="0.9"><ellipse cx="4" cy="14" rx="125" ry="20" fill="#000" opacity="0.55"/>
  <path d="M-80,-6 C-40,-24 40,-24 70,-10 L128,-8 C146,-6 146,12 128,14 L70,16 C30,24 -40,22 -80,10 Z" fill="#2a3242"/>
  <ellipse cx="-102" cy="0" rx="24" ry="20" fill="#6e5242"/><path d="M-124,-10 q20,-18 42,-4" fill="#1a120e"/>
  <path d="M-36,10 C-16,30 12,32 30,28" stroke="#6e5242" stroke-width="13" fill="none" stroke-linecap="round"/></g>
  <rect x="0" y="0" width="1280" height="720" fill="#1d1a17" opacity="0.18"/>`;
}
const SCENES = {
  'hall': { src: '02.jpg', pos: '50% 50%', bright: 0.42, layers: () => glow(650, 330, 260, 200, 0.95) + flames(655, 420, 150, 150, 3) + smoke(290) + glow(650, 250, 380, 150, 0.7) + rollover(300, 1000, 25, 90) },
  'fireroom': { src: '01.jpg', pos: '50% 50%', bright: 0.4, layers: () => glow(640, 500, 600, 330, 0.95) + flames(640, 600, 720, 300, 5) + flames(560, 470, 260, 300, 9) + smoke(300) + glow(640, 260, 560, 200, 0.7) + rollover(0, 1280, 40, 110) },
  'bedroom': { src: '00.jpg', pos: '50% 50%', bright: 0.38, layers: () => smoke(340) + glow(0, 600, 260, 300, 0.55) },
  'bedroom-victim': { src: '00.jpg', pos: '50% 50%', bright: 0.42, layers: () => smoke(270) + glow(0, 600, 240, 260, 0.45) + victim(300, 612, 1.2) },
  'bedroom-dense': { src: '00.jpg', pos: '50% 50%', bright: 0.3, layers: () => smoke(470) + glow(0, 620, 260, 300, 0.5) },
  'hall-clear': { src: '02.jpg', pos: '50% 50%', bright: 0.45, layers: () => smoke(200) },
  'hall-dense': { src: '02.jpg', pos: '50% 50%', bright: 0.35, layers: () => glow(640, 260, 260, 200, 0.6) + smoke(520) },
};
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1280, height: 720 } });
  for (const [name, sc] of Object.entries(SCENES)) {
    if (process.argv[4] && !process.argv[4].split(',').includes(name)) continue;
    const img = 'data:image/jpeg;base64,' + fs.readFileSync(SRC + sc.src).toString('base64');
    await p.setContent(`<body style="margin:0;background:#000"><div style="position:relative;width:1280px;height:720px;overflow:hidden">
      <img src="${img}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:${sc.pos};filter:brightness(${sc.bright}) contrast(1.12) saturate(0.55) sepia(0.18)">
      <svg viewBox="0 0 1280 720" width="1280" height="720" style="position:absolute;inset:0">${defs}${sc.layers()}
      <radialGradient id="vg" cx="0.5" cy="0.55" r="0.8"><stop offset="0.6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.7"/></radialGradient><rect width="1280" height="720" fill="url(#vg)"/></svg></div></body>`);
    await p.waitForTimeout(150);
    await p.screenshot({ path: OUT + name + '.jpg', type: 'jpeg', quality: 80, clip: { x: 0, y: 0, width: 1280, height: 720 } });
    console.log(name, Math.round(fs.statSync(OUT + name + '.jpg').size / 1024) + ' KB');
  }
  await b.close();
})();
