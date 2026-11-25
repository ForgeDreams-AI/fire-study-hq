/* ============================================================
   SCENES — drawn interior views for the scenarios (no photos, no cost, works offline)
   sceneSVG({kind, smoke, fire, victim, ...}) returns an SVG string, 1280x720 like the
   arrival photos, so hotspot x/y percentages work the same way.
   kinds: door, hall, fireroom, bedroom, stairs
   smoke: 0..1 — how far down from the ceiling the smoke layer reaches
   fire:  0 none, 1 glow, 2 flames, 3 flames + rollover at the ceiling
   victim: where a victim lies, or false — 'window' | 'door' | 'bed'
   The pictures are training drawings, not a real building.
   ============================================================ */
'use strict';

function sceneSVG(o) {
  o = o || {};
  var kind = o.kind || 'hall', smoke = o.smoke == null ? 0.45 : o.smoke, fire = o.fire == null ? 2 : o.fire;
  var W = 1280, H = 720, out = [];
  function add(s) { out.push(s); }
  var defs = '<defs>'
    + '<linearGradient id="sm" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0d0d0f" stop-opacity="0.97"/><stop offset="0.75" stop-color="#26272b" stop-opacity="0.9"/><stop offset="1" stop-color="#3a3b40" stop-opacity="0"/></linearGradient>'
    + '<radialGradient id="glow" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#ffb347" stop-opacity="0.95"/><stop offset="0.45" stop-color="#ff6a1a" stop-opacity="0.55"/><stop offset="1" stop-color="#ff3d00" stop-opacity="0"/></radialGradient>'
    + '<linearGradient id="fl" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#fff3a0"/><stop offset="0.35" stop-color="#ffb02e"/><stop offset="0.75" stop-color="#ff5a14"/><stop offset="1" stop-color="#c41d0a" stop-opacity="0.85"/></linearGradient>'
    + '<linearGradient id="roll" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff7a1a" stop-opacity="0.95"/><stop offset="1" stop-color="#ff3d00" stop-opacity="0"/></linearGradient>'
    + '<radialGradient id="vig" cx="0.5" cy="0.55" r="0.75"><stop offset="0.55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.75"/></radialGradient>'
    + '<linearGradient id="floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2b241e"/><stop offset="1" stop-color="#4a3c30"/></linearGradient>'
    + '<linearGradient id="beam" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#fffbe0" stop-opacity="0.28"/><stop offset="1" stop-color="#fffbe0" stop-opacity="0"/></linearGradient>'
    + '<filter id="blur" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="22"/></filter>'
    + '<filter id="soft" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="7"/></filter>'
    + '</defs>';

  /* flames: a cluster of tongues with its base centered at x,y */
  function flames(x, y, w, h) {
    var s = '<g>';
    s += '<ellipse cx="' + x + '" cy="' + (y - h * 0.35) + '" rx="' + w * 1.1 + '" ry="' + h * 0.9 + '" fill="url(#glow)"/>';
    var n = 5;
    for (var i = 0; i < n; i++) {
      var cx = x - w / 2 + (w / (n - 1)) * i, hh = h * (0.55 + 0.45 * Math.abs(Math.sin(i * 1.7 + 0.4))), ww = w / n * 1.5;
      s += '<path d="M' + (cx - ww / 2) + ',' + y + ' C' + (cx - ww / 2) + ',' + (y - hh * 0.5) + ' ' + (cx - ww * 0.1) + ',' + (y - hh * 0.7) + ' ' + (cx + ww * 0.08) + ',' + (y - hh)
        + ' C' + (cx + ww * 0.3) + ',' + (y - hh * 0.6) + ' ' + (cx + ww / 2) + ',' + (y - hh * 0.45) + ' ' + (cx + ww / 2) + ',' + y + ' Z" fill="url(#fl)" opacity="0.92"/>';
    }
    return s + '</g>';
  }
  /* fire rolling along the ceiling between x1..x2 at depth y */
  function rollover(x1, x2, y, depth) {
    var s = '<path d="M' + x1 + ',' + y;
    var steps = 8, dx = (x2 - x1) / steps;
    for (var i = 0; i < steps; i++) {
      var a = x1 + dx * i, b = a + dx;
      s += ' Q' + (a + dx / 2) + ',' + (y + depth * (i % 2 ? 1.2 : 0.6)) + ' ' + b + ',' + (y + depth * 0.2);
    }
    s += ' L' + x2 + ',' + (y - 6) + ' L' + x1 + ',' + (y - 6) + ' Z" fill="url(#roll)" opacity="0.9"/>';
    return s;
  }
  /* a heavy smoke layer from the ceiling down to bottomY, with a soft, rolling lower edge */
  function smokeLayer(topY, bottomY, x1, x2) {
    var s = '<g filter="url(#blur)">';
    s += '<rect x="' + (x1 - 60) + '" y="' + (topY - 60) + '" width="' + (x2 - x1 + 120) + '" height="' + (bottomY - topY + 40) + '" fill="#18181b" opacity="0.94"/>';
    for (var i = 0; i <= 10; i++) {
      var cx = x1 + (x2 - x1) * i / 10, r = 70 + 40 * Math.abs(Math.sin(i * 2.3));
      s += '<ellipse cx="' + cx + '" cy="' + (bottomY - 10 + 25 * Math.sin(i * 1.3)) + '" rx="' + (r * 1.4) + '" ry="' + r * 0.7 + '" fill="#222226" opacity="0.9"/>';
    }
    s += '</g>';
    s += '<rect x="' + x1 + '" y="' + topY + '" width="' + (x2 - x1) + '" height="720" fill="#2a2a2e" opacity="0.22"/>'; // haze below the layer
    return s;
  }
  function hose(points) {
    return '<path d="' + points + '" fill="none" stroke="#5a1410" stroke-width="30" stroke-linecap="round"/>'
      + '<path d="' + points + '" fill="none" stroke="#a8322a" stroke-width="22" stroke-linecap="round"/>'
      + '<path d="' + points + '" fill="none" stroke="#d0574b" stroke-width="5" stroke-linecap="round" opacity="0.6" stroke-dasharray="40 30"/>';
  }
  function person(x, y, s, rot) {
    // a victim lying on the floor, seen from the doorway
    return '<g transform="translate(' + x + ',' + y + ') rotate(' + (rot || 0) + ') scale(' + s + ')">'
      + '<ellipse cx="4" cy="6" rx="96" ry="26" fill="#000" opacity="0.35"/>'
      + '<ellipse cx="0" cy="0" rx="78" ry="22" fill="#8aa0c4"/>'
      + '<ellipse cx="-92" cy="-4" rx="24" ry="20" fill="#c9a183"/>'
      + '<path d="M-100,-20 q12,-10 26,0" fill="#3a2a20"/>'
      + '<rect x="58" y="-16" width="70" height="26" rx="12" fill="#2f3a4c"/>'
      + '<rect x="-40" y="14" width="56" height="14" rx="7" fill="#c9a183"/>'
      + '</g>';
  }
  function door(x, y, w, h, opts) {
    opts = opts || {};
    var s = '<rect x="' + (x - 8) + '" y="' + (y - 8) + '" width="' + (w + 16) + '" height="' + (h + 8) + '" fill="#6b5a48"/>';
    if (opts.open) {
      s += '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="' + (opts.glow ? '#3b1206' : '#0b0b0c') + '"/>';
      if (opts.glow) s += '<ellipse cx="' + (x + w / 2) + '" cy="' + (y + h * 0.35) + '" rx="' + w * 0.9 + '" ry="' + h * 0.55 + '" fill="url(#glow)"/>';
    } else {
      s += '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="' + (opts.color || '#8a7660') + '"/>'
        + '<rect x="' + (x + w * 0.12) + '" y="' + (y + h * 0.08) + '" width="' + w * 0.76 + '" height="' + h * 0.36 + '" fill="none" stroke="#6e5c49" stroke-width="4"/>'
        + '<rect x="' + (x + w * 0.12) + '" y="' + (y + h * 0.52) + '" width="' + w * 0.76 + '" height="' + h * 0.38 + '" fill="none" stroke="#6e5c49" stroke-width="4"/>'
        + '<circle cx="' + (x + (opts.knobLeft ? w * 0.12 : w * 0.86)) + '" cy="' + (y + h * 0.53) + '" r="' + Math.max(5, w * 0.05) + '" fill="#c8b27a"/>';
    }
    return s;
  }

  add('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '">' + defs);

  if (kind === 'door') {
    // apartment / house front door from the porch, line charged, smoke pushing from the top of the door
    add('<rect width="1280" height="720" fill="#b9ad9c"/>');
    add('<rect y="0" width="1280" height="90" fill="#8f8676"/>');
    add('<rect x="0" y="560" width="1280" height="160" fill="#7d776d"/>');
    add('<rect x="0" y="548" width="1280" height="14" fill="#6c665d"/>');
    add('<rect x="880" y="190" width="260" height="200" fill="#2a2f36"/><rect x="880" y="190" width="260" height="200" fill="none" stroke="#e8e2d6" stroke-width="12"/><line x1="1010" y1="190" x2="1010" y2="390" stroke="#e8e2d6" stroke-width="8"/>');
    add('<rect x="896" y="206" width="228" height="80" fill="#121315" opacity="0.8"/>');
    add('<rect x="408" y="120" width="300" height="440" fill="#5a4a3a"/>'); // frame
    add('<rect x="420" y="132" width="276" height="428" fill="#060606"/>'); // dark gap behind the door
    add('<polygon points="500,132 696,132 696,560 500,560" fill="#7a654e"/>'); // door, swung in partway (hinge on the right)
    add('<polygon points="500,132 520,140 520,552 500,560" fill="#5e4d3b"/>'); // door edge
    add('<circle cx="535" cy="350" r="9" fill="#c8b27a"/>');
    // smoke pushing out the top of the gap, rolling up the face and over the header
    add('<g filter="url(#blur)" fill="#141416"><ellipse cx="462" cy="170" rx="60" ry="70" opacity="0.95"/><ellipse cx="470" cy="110" rx="110" ry="60" opacity="0.95"/><ellipse cx="560" cy="70" rx="200" ry="70" opacity="0.92"/><ellipse cx="700" cy="30" rx="320" ry="80" opacity="0.85"/><ellipse cx="455" cy="250" rx="40" ry="70" opacity="0.8"/></g>');
    add('<rect x="420" y="420" width="80" height="140" fill="#8fa3b5" opacity="0.12"/>'); // clearer air down low
    // charged line coming up the walk to the door, nozzle at the threshold
    add(hose('M230,720 C260,640 300,610 360,590 C400,578 410,570 425,560'));
    add('<rect x="408" y="540" width="58" height="34" rx="8" fill="#2b2b2b"/><rect x="452" y="546" width="30" height="22" rx="4" fill="#b8b8b8"/>');
    // wedge on the porch
    add('<path d="M760,560 l70,0 l-70,-22 z" fill="#c9a34a"/>');
    add('<rect x="0" y="0" width="1280" height="720" fill="url(#vig)"/>');
  } else if (kind === 'stairs') {
    add('<rect width="1280" height="720" fill="#3b3530"/>');
    add('<rect x="0" y="0" width="1280" height="720" fill="#4a423b"/>');
    // stair run going up and away, center
    var top = 140;
    for (var i = 0; i < 9; i++) {
      var y = 640 - i * 56, x1 = 420 + i * 22, x2 = 860 - i * 22;
      add('<rect x="' + x1 + '" y="' + y + '" width="' + (x2 - x1) + '" height="20" fill="#6d5a47"/><rect x="' + x1 + '" y="' + (y + 20) + '" width="' + (x2 - x1) + '" height="36" fill="#3a302a"/>');
    }
    add('<rect x="600" y="' + top + '" width="80" height="16" fill="#2b2622"/>');
    add('<line x1="880" y1="660" x2="660" y2="160" stroke="#8b7356" stroke-width="12"/>');
    for (var j = 0; j < 9; j++) add('<line x1="' + (860 - j * 22) + '" y1="' + (640 - j * 56) + '" x2="' + (860 - j * 22) + '" y2="' + (600 - j * 56) + '" stroke="#8b7356" stroke-width="6"/>');
    // landing glow at the top

    // first-floor rooms off to the sides
    add(door(120, 300, 170, 300, { open: true }));
    add(door(1010, 290, 150, 290, { color: '#7d6a55', knobLeft: true }));
    add('<rect x="0" y="660" width="1280" height="60" fill="url(#floor)"/>');
    add(smokeLayer(0, 720 * smoke + 40, 0, 1280));
    if (fire) add('<ellipse cx="640" cy="130" rx="380" ry="170" fill="url(#glow)" opacity="' + (fire > 1 ? 0.95 : 0.6) + '"/>');
    if (fire > 2) add('<g filter="url(#soft)">' + rollover(330, 950, 30, 80) + '</g>');
    add(hose('M360,720 C420,690 470,680 520,668'));
    add('<rect x="0" y="0" width="1280" height="720" fill="url(#vig)"/>');
  } else {
    // one-point perspective room/corridor
    var vx = 640, vy = 330;
    var back = kind === 'hall' ? { x: 520, y: 220, w: 240, h: 250 } : { x: 300, y: 150, w: 680, h: 380 };
    var bx2 = back.x + back.w, by2 = back.y + back.h;
    add('<polygon points="0,0 1280,0 ' + bx2 + ',' + back.y + ' ' + back.x + ',' + back.y + '" fill="#2e2b28"/>'); // ceiling
    add('<polygon points="0,0 ' + back.x + ',' + back.y + ' ' + back.x + ',' + by2 + ' 0,720" fill="#5b544c"/>'); // left wall
    add('<polygon points="1280,0 ' + bx2 + ',' + back.y + ' ' + bx2 + ',' + by2 + ' 1280,720" fill="#524b44"/>'); // right wall
    add('<polygon points="0,720 ' + back.x + ',' + by2 + ' ' + bx2 + ',' + by2 + ' 1280,720" fill="url(#floor)"/>'); // floor
    add('<rect x="' + back.x + '" y="' + back.y + '" width="' + back.w + '" height="' + back.h + '" fill="#655d54"/>'); // back wall

    if (kind === 'hall') {
      add(door(545, 270, 190, 200, { color: '#7d6a55' })); // bathroom at the end
      // left: closed bedroom door (in perspective)
      add('<polygon points="150,215 330,262 330,560 150,640" fill="#6b5a48"/><polygon points="162,232 318,272 318,552 162,624" fill="#8a7660"/><circle cx="300" cy="420" r="9" fill="#c8b27a"/>');
      // right: open fire-room doorway with glow
      add('<polygon points="1130,205 950,255 950,560 1130,640" fill="#3b1206"/>');
      if (fire) add('<ellipse cx="1040" cy="380" rx="230" ry="260" fill="url(#glow)"/>');
      if (fire > 1) add(flames(1050, 640, 140, 220));
      add('<polygon points="1140,195 1130,205 1130,640 1140,650" fill="#6b5a48"/><polygon points="950,255 940,250 940,565 950,560" fill="#6b5a48"/>');
      add(smokeLayer(0, 720 * smoke + 60, 0, 1280));
      if (fire) add('<ellipse cx="1040" cy="300" rx="200" ry="200" fill="url(#glow)" opacity="0.7"/>');
      if (fire > 2) add('<g filter="url(#soft)">' + rollover(640, 1200, 60, 110) + '</g>');
      add(hose('M420,720 C470,660 520,620 600,585 C640,570 660,560 690,548'));
    } else if (kind === 'fireroom') {
      // window on the back wall
      add('<rect x="440" y="210" width="230" height="170" fill="#1a1d22"/><rect x="440" y="210" width="230" height="170" fill="none" stroke="#857868" stroke-width="12"/><line x1="555" y1="210" x2="555" y2="380" stroke="#857868" stroke-width="8"/>');
      // couch on the right, burning
      add('<rect x="700" y="420" width="300" height="110" rx="14" fill="#4a3426"/><rect x="700" y="380" width="300" height="60" rx="16" fill="#3a2a1f"/><rect x="680" y="410" width="36" height="120" rx="10" fill="#3a2a1f"/><rect x="984" y="410" width="36" height="120" rx="10" fill="#3a2a1f"/>');
      // coffee table, lamp
      add('<rect x="430" y="520" width="200" height="22" fill="#5a4636"/><rect x="450" y="542" width="10" height="40" fill="#3c2f25"/><rect x="600" y="542" width="10" height="40" fill="#3c2f25"/>');
      add('<rect x="330" y="300" width="14" height="230" fill="#2a2420"/><path d="M300,300 l74,0 l-14,-50 l-46,0 z" fill="#6e6252"/>');
      if (fire) add('<ellipse cx="850" cy="380" rx="420" ry="300" fill="url(#glow)"/>');
      if (fire > 1) add(flames(850, 430, 200, 260));
      add(smokeLayer(0, 720 * smoke + 40, 0, 1280));
      if (fire) add('<ellipse cx="850" cy="330" rx="330" ry="220" fill="url(#glow)" opacity="0.75"/>');
      if (fire > 2) add('<g filter="url(#soft)">' + rollover(120, 1200, 90, 130) + '</g>');
      add(hose('M380,720 C420,680 470,660 540,650'));
      add('<rect x="520" y="630" width="70" height="40" rx="8" fill="#2b2b2b"/><rect x="580" y="636" width="34" height="26" rx="4" fill="#b8b8b8"/>');
    } else if (kind === 'bedroom') {
      // window on the back wall, bed left, closet right, door we came through on the left foreground
      add('<rect x="560" y="200" width="200" height="160" fill="#20252c"/><rect x="560" y="200" width="200" height="160" fill="none" stroke="#857868" stroke-width="12"/><line x1="660" y1="200" x2="660" y2="360" stroke="#857868" stroke-width="8"/>');
      add('<polygon points="330,430 620,430 700,560 260,560" fill="#8c8fa6"/><polygon points="260,560 700,560 700,600 260,600" fill="#5c5f75"/><rect x="330" y="380" width="120" height="60" rx="16" fill="#d8d6cf"/><rect x="310" y="330" width="320" height="60" fill="#4b3a2c"/>');
      add('<polygon points="1120,200 960,250 960,560 1120,640" fill="#7d6a55"/><line x1="1040" y1="225" x2="1040" y2="600" stroke="#5e4f40" stroke-width="6"/><circle cx="1020" cy="420" r="8" fill="#c8b27a"/><circle cx="1060" cy="420" r="8" fill="#c8b27a"/>');
      add('<rect x="790" y="360" width="120" height="150" fill="#4f3e30"/><rect x="800" y="380" width="100" height="10" fill="#3a2d22"/><rect x="800" y="430" width="100" height="10" fill="#3a2d22"/>');
      // bedroom door, open, at left foreground with the hall glow behind it
      add('<polygon points="0,90 160,170 160,640 0,720" fill="#2a0d05"/>');
      if (fire) add('<ellipse cx="60" cy="330" rx="200" ry="280" fill="url(#glow)" opacity="0.8"/>');
      add('<polygon points="160,170 300,150 300,600 160,640" fill="#8a7660"/><circle cx="280" cy="380" r="9" fill="#c8b27a"/>');
      add(smokeLayer(0, 720 * smoke + 40, 0, 1280));
      if (o.victim === 'window') add(person(830, 650, 1.3, -3));
      if (o.victim === 'door') add(person(300, 650, 1.35, 8));
      if (o.victim === 'bed') add(person(470, 470, 0.85, -2));
      if (fire) add('<ellipse cx="40" cy="260" rx="190" ry="230" fill="url(#glow)" opacity="0.65"/>');
    }
    // flashlight beam on the floor
    add('<polygon points="560,720 720,720 700,520 600,520" fill="url(#beam)"/>');
    add('<rect x="0" y="0" width="1280" height="720" fill="url(#vig)"/>');
  }
  add('</svg>');
  return out.join('');
}
function sceneDataURI(o) { return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(sceneSVG(o)); }
