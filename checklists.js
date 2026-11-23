/* ============================================================
   CHECKLISTS — skill sheets, station routines, probation sign-offs.
   Steps are in order (the app quizzes step order). critical:true = a step
   that fails the skill if missed. Steps not taken from a PFD document are
   marked in src as IFSTA/NFPA — verify against your academy skill sheet.
   ============================================================ */
'use strict';
var CHECKLISTS = [
 {
  "id": "fn-take-hydrant",
  "kind": "skill",
  "stage": "academy",
  "title": "Functional 1: Taking a hydrant",
  "sub": "Forward lay from hydrant to fire; supply the attack engine. Evaluated for safety, timeliness, communication, air mgmt, accountability.",
  "src": "2026 Recruit Exam Study Packet, Sec. Six (functional skills); steps IFSTA/NFPA (verify against your academy skill sheet)",
  "steps": [
   {
    "t": "Don full PPE and confirm radio on correct channel before dismount",
    "critical": false
   },
   {
    "t": "Wait for apparatus to come to a full stop and Engineer's OK before dismounting",
    "critical": true
   },
   {
    "t": "Pull hydrant bag/supply hose and wrap the hydrant (anchor the line)",
    "critical": false
   },
   {
    "t": "Signal or radio the Engineer to proceed (order model)",
    "critical": false
   },
   {
    "t": "Remove the steamer (4.5 in.) cap; inspect threads and outlet for debris",
    "critical": false
   },
   {
    "t": "Crack hydrant open briefly to flush, then shut it",
    "critical": false
   },
   {
    "t": "Connect hydrant valve/gate or supply line to the steamer outlet",
    "critical": false
   },
   {
    "t": "Remove the slack and kinks from the supply line",
    "critical": false
   },
   {
    "t": "Wait for the Engineer's order to charge the line",
    "critical": false
   },
   {
    "t": "Open the hydrant slowly and fully to avoid water hammer",
    "critical": true
   },
   {
    "t": "Check connections for leaks; tighten as needed",
    "critical": false
   },
   {
    "t": "Report 'hydrant charged' to the Engineer and rejoin crew as assigned",
    "critical": false
   }
  ]
 },
 {
  "id": "fn-forcible-entry",
  "kind": "skill",
  "stage": "academy",
  "title": "Functional 2: Forcing entry on a door",
  "sub": "Size up and force an inward-swinging door with the irons (halligan + flathead axe), then control the door.",
  "src": "2026 Recruit Exam Study Packet, Sec. Six (functional skills); MP 202.01 (forcible entry is an Engine and Ladder function); steps IFSTA/NFPA (verify against your academy skill sheet)",
  "steps": [
   {
    "t": "Don full PPE with SCBA on air; carry irons (halligan + flathead axe)",
    "critical": false
   },
   {
    "t": "Try before you pry: check the door is actually locked",
    "critical": false
   },
   {
    "t": "Size up the door: swing direction, construction, lock type, hinges",
    "critical": false
   },
   {
    "t": "Check the door for heat (back of glove) and note smoke conditions",
    "critical": true
   },
   {
    "t": "Place the halligan adz/fork just above or below the lock, bevel toward the door",
    "critical": false
   },
   {
    "t": "Gap the door if needed, then set the fork between door and jamb",
    "critical": false
   },
   {
    "t": "Drive the halligan in with the axe on striker's command ('hit')",
    "critical": false
   },
   {
    "t": "Push the halligan toward the door (inward swing) to force it open",
    "critical": false
   },
   {
    "t": "Control the door: keep it closed or chocked as ordered (flow path control)",
    "critical": true
   },
   {
    "t": "Announce entry achieved to officer/crew; stage irons for the search team",
    "critical": false
   }
  ]
 },
 {
  "id": "fn-advance-line",
  "kind": "skill",
  "stage": "academy",
  "title": "Functional 3: Advancing a hose line into a structure",
  "sub": "Pull, flake, charge and advance an attack line through the door to the seat of the fire.",
  "src": "2026 Recruit Exam Study Packet, Sec. Six (functional skills); MP 202.04 Fire Control; MP 201.03 Accountability; steps IFSTA/NFPA (verify against your academy skill sheet)",
  "steps": [
   {
    "t": "Don full PPE and SCBA; confirm radio and passport delivered to engine (MP 201.03)",
    "critical": false
   },
   {
    "t": "Select and pull the assigned preconnect; shoulder load and walk to the entry point",
    "critical": false
   },
   {
    "t": "Flake out the line at the entry point to eliminate kinks; stage extra hose for the advance",
    "critical": false
   },
   {
    "t": "Call for water from the Engineer (order model)",
    "critical": false
   },
   {
    "t": "Bleed air and check pattern and pressure at the nozzle before entry",
    "critical": false
   },
   {
    "t": "Go on air, check PASS, and check the door for heat before entry",
    "critical": true
   },
   {
    "t": "Enter low with partner; crew goes in together, stays together, comes out together",
    "critical": true
   },
   {
    "t": "Advance to the seat of the fire, feeding hose around corners and obstacles",
    "critical": false
   },
   {
    "t": "Apply water to the fire from the most advantageous position; report 'water on the fire'",
    "critical": false
   },
   {
    "t": "Monitor air supply and conditions; give progress reports",
    "critical": false
   },
   {
    "t": "Hit hot spots and coordinate with ventilation/search crews",
    "critical": false
   },
   {
    "t": "Back the line out along the hose to exit with your crew and retrieve passport",
    "critical": false
   }
  ]
 },
 {
  "id": "fn-search-rescue",
  "kind": "skill",
  "stage": "academy",
  "title": "Functional 4: Executing search and rescue",
  "sub": "Primary search as a team with a tool, maintaining orientation and an exit route.",
  "src": "2026 Recruit Exam Study Packet, Sec. Six (functional skills); MP 202.04 (primary search with fire attack); MP 206.03 (direct supervision); steps IFSTA/NFPA (verify against your academy skill sheet)",
  "steps": [
   {
    "t": "Don full PPE, SCBA and radio; carry a tool and a light",
    "critical": false
   },
   {
    "t": "Confirm assignment and that the crew has a supervisor (MP 206.03 / 201.03)",
    "critical": true
   },
   {
    "t": "Note the entry point and pick a search direction (right- or left-hand)",
    "critical": false
   },
   {
    "t": "Go on air, verify PASS, and check the door for heat",
    "critical": true
   },
   {
    "t": "Close or control doors to isolate fire from the search area",
    "critical": false
   },
   {
    "t": "Search low, keep wall contact, sweep with the tool and limbs",
    "critical": false
   },
   {
    "t": "Search the most likely victim areas first (bedrooms, beside beds, closets, bathtubs, behind doors)",
    "critical": false
   },
   {
    "t": "Communicate and stay in voice/touch contact with partner",
    "critical": false
   },
   {
    "t": "Monitor air and turn around with enough air to exit",
    "critical": false
   },
   {
    "t": "On finding a victim, radio Command and begin removal by the shortest safe route",
    "critical": false
   },
   {
    "t": "Exit along the same wall/route; report areas searched and 'primary all clear' if complete",
    "critical": false
   }
  ]
 },
 {
  "id": "fn-victim-removal",
  "kind": "skill",
  "stage": "academy",
  "title": "Functional 5: Removing victims",
  "sub": "Package and remove a found victim to fresh air and hand off for treatment.",
  "src": "2026 Recruit Exam Study Packet, Sec. Six (functional skills); MP 202.01 (search, rescue and treatment); steps IFSTA/NFPA (verify against your academy skill sheet)",
  "steps": [
   {
    "t": "Radio 'victim found', location and number of victims",
    "critical": false
   },
   {
    "t": "Size up the safest, shortest exit (back the way you came, window, or nearest door)",
    "critical": true
   },
   {
    "t": "Position the victim face-up and secure with drag loop, webbing or clothing",
    "critical": false
   },
   {
    "t": "Choose the carry/drag: SCBA drag (firefighter), blanket/clothing drag, or two-person carry",
    "critical": false
   },
   {
    "t": "Protect the victim's head and airway during the move",
    "critical": false
   },
   {
    "t": "Move together with partner, keeping low and on the hose line or wall",
    "critical": false
   },
   {
    "t": "Call for help/ladder or RIC if needed",
    "critical": false
   },
   {
    "t": "Remove the victim to fresh air outside the hazard zone",
    "critical": false
   },
   {
    "t": "Hand off to Treatment/EMS with report of where found and condition",
    "critical": false
   },
   {
    "t": "Return to crew and report status to Command",
    "critical": false
   }
  ]
 },
 {
  "id": "fn-check-extension",
  "kind": "skill",
  "stage": "academy",
  "title": "Functional 6: Checking for fire extension with hand tools",
  "sub": "Open overhead (attic/ceiling), walls or floor to find hidden fire after knockdown.",
  "src": "2026 Recruit Exam Study Packet, Sec. Six (functional skills); MP 202.01 (provide access/check fire extension); steps IFSTA/NFPA (verify against your academy skill sheet)",
  "steps": [
   {
    "t": "Wear full PPE with SCBA on air; have a charged line in place",
    "critical": false
   },
   {
    "t": "Confirm a charged hose line is ready before opening any void",
    "critical": true
   },
   {
    "t": "Look and feel for signs: discoloration, blistering paint, heat, smoke from seams",
    "critical": false
   },
   {
    "t": "Use a thermal imager if available to target hot areas",
    "critical": false
   },
   {
    "t": "Position yourself between the opening and your exit; stay out from under the area being pulled",
    "critical": false
   },
   {
    "t": "Pull ceiling with a pike pole: punch through, hook, and pull down toward you at an angle",
    "critical": false
   },
   {
    "t": "Open walls/floors with an axe or halligan starting near the fire area and working outward",
    "critical": false
   },
   {
    "t": "Inspect the void for fire, char or heat; call the nozzle team to extinguish",
    "critical": false
   },
   {
    "t": "Keep opening until you reach clean, unburned material",
    "critical": false
   },
   {
    "t": "Report findings (extension/no extension) to officer and Command",
    "critical": false
   }
  ]
 },
 {
  "id": "fn-salvage",
  "kind": "skill",
  "stage": "academy",
  "title": "Functional 7: Salvaging savable property",
  "sub": "Loss control: protect contents from water, smoke and debris (Loss Stopped benchmark).",
  "src": "2026 Recruit Exam Study Packet, Sec. Six (functional skills); MP 202.01 (loss control); MP 202.04 (loss control/property conservation); steps IFSTA/NFPA (verify against your academy skill sheet)",
  "steps": [
   {
    "t": "Size up the area: what is savable and where water will travel",
    "critical": false
   },
   {
    "t": "Ensure the area is safe (fire controlled, no overhead hazard) before working",
    "critical": true
   },
   {
    "t": "Group furniture and contents in the center of the room, off the floor where possible",
    "critical": false
   },
   {
    "t": "Spread salvage covers over the grouped items (one- or two-person throw)",
    "critical": false
   },
   {
    "t": "Cover openings and route water out with chutes, catchalls or water vacuums",
    "critical": false
   },
   {
    "t": "Remove water from floors and stop sprinkler flow if ordered",
    "critical": false
   },
   {
    "t": "Carry out high-value or irreplaceable items with the owner's direction if possible",
    "critical": false
   },
   {
    "t": "Secure the structure (cover holes, board windows/doors) as assigned",
    "critical": false
   },
   {
    "t": "Report 'loss stopped' progress to Command",
    "critical": false
   }
  ]
 },
 {
  "id": "fn-ladder-placement",
  "kind": "skill",
  "stage": "academy",
  "title": "Functional 8: Hand ladder placement",
  "sub": "Carry, raise and place a ground ladder to a window or roof for access/egress.",
  "src": "2026 Recruit Exam Study Packet, Sec. Six (functional skills); MP 202.01 (raise ground ladders); MP 202.06 (secondary means of egress); steps IFSTA/NFPA (verify against your academy skill sheet)",
  "steps": [
   {
    "t": "Select the correct ladder length for the target (window sill or roof edge + 3-5 rungs)",
    "critical": false
   },
   {
    "t": "Remove the ladder from the apparatus on command and carry with crew",
    "critical": false
   },
   {
    "t": "Look up: check for overhead power lines and obstructions before raising",
    "critical": true
   },
   {
    "t": "Place the butt about 1/4 of the working length out from the building",
    "critical": false
   },
   {
    "t": "Raise the ladder (heel and raise) on command, keeping it under control",
    "critical": false
   },
   {
    "t": "Extend the fly and lock the pawls/dogs",
    "critical": false
   },
   {
    "t": "Lower into position: tip at the sill for rescue, or 3-5 rungs above the roof edge",
    "critical": false
   },
   {
    "t": "Check climbing angle (~75 degrees) and that pawls are locked",
    "critical": true
   },
   {
    "t": "Heel or tie off the ladder before anyone climbs",
    "critical": false
   },
   {
    "t": "Announce ladder placement location to crew/Command",
    "critical": false
   }
  ]
 },
 {
  "id": "fn-vertical-vent",
  "kind": "skill",
  "stage": "academy",
  "title": "Functional 9: Vertical ventilation",
  "sub": "Roof sector: coordinated vent hole over the fire compartment (MP 202.06).",
  "src": "MP 202.06 Roof Sector; 2026 Recruit Exam Study Packet, Sec. Six (functional skills); cut technique IFSTA/NFPA (verify against your academy skill sheet)",
  "steps": [
   {
    "t": "Confirm the roof is safe to operate on (no tile, pitched metal, PV tile, or bowstring with attic fire)",
    "critical": true
   },
   {
    "t": "Don full PPE with SCBA facepiece and regulator in place while above the fire",
    "critical": false
   },
   {
    "t": "Access the roof from a safe area with a secondary means of egress; officer with crew",
    "critical": true
   },
   {
    "t": "Sound the roof ahead of every step and walk on supported areas",
    "critical": false
   },
   {
    "t": "Confirm the need for vertical ventilation and sequence it with fire attack (water on the fire)",
    "critical": false
   },
   {
    "t": "Locate the vent area directly over the fire compartment, upwind",
    "critical": false
   },
   {
    "t": "Start the saw on the roof surface safely; cut the standard-size hole (louver/rectangular)",
    "critical": false
   },
   {
    "t": "Pull the decking and punch through the ceiling below",
    "critical": false
   },
   {
    "t": "Move away from the hole; do not enlarge it - cut additional holes a safe distance away if needed",
    "critical": true
   },
   {
    "t": "Report hole completion with fire/smoke conditions and roof stability to Command",
    "critical": false
   },
   {
    "t": "Exit the roof as soon as ventilation objectives are achieved",
    "critical": false
   }
  ]
 },
 {
  "id": "scba-donning",
  "kind": "skill",
  "stage": "academy",
  "title": "SCBA donning (over-the-head or coat method)",
  "sub": "Common academy standard: full PPE + SCBA on air within 60 seconds (1 minute) - confirm the time standard on your PFD skill sheet.",
  "src": "MP 201.03 (SCBA ID markings, exit air); IFSTA/NFPA (verify against your academy skill sheet)",
  "steps": [
   {
    "t": "Check cylinder is full (gauge and pressure at or near rated) and valve closed",
    "critical": false
   },
   {
    "t": "Inspect harness, straps and facepiece; loosen all straps fully",
    "critical": false
   },
   {
    "t": "Open the cylinder valve fully; listen for the low-air alarm sounding as the system pressurizes",
    "critical": false
   },
   {
    "t": "Check the regulator and remote gauge agree (within ~100 psi)",
    "critical": false
   },
   {
    "t": "Don the pack (over-the-head or coat method) and tighten shoulder straps",
    "critical": false
   },
   {
    "t": "Buckle and tighten the waist belt",
    "critical": false
   },
   {
    "t": "Don the facepiece; tighten straps bottom to top and check seal (negative-pressure test)",
    "critical": false
   },
   {
    "t": "Pull the hood up over the facepiece edges with no exposed skin",
    "critical": false
   },
   {
    "t": "Don helmet with chin strap secured",
    "critical": false
   },
   {
    "t": "Connect the regulator and take a breath to go on air",
    "critical": false
   },
   {
    "t": "Verify PASS device is armed and functioning",
    "critical": true
   },
   {
    "t": "Don gloves; partner check for exposed skin and secure straps",
    "critical": false
   }
  ]
 },
 {
  "id": "pre-entry-check",
  "kind": "skill",
  "stage": "academy",
  "title": "PASS / radio check before entry",
  "sub": "Last check at the door before entering an IDLH atmosphere.",
  "src": "MP 205.21 Portable Radios; MP 201.03 Accountability; MP 201.01B GRAB LIVES; MP 205.01 order model",
  "steps": [
   {
    "t": "Confirm radio is on, volume up, on the assigned channel (hazard deck 'A')",
    "critical": false
   },
   {
    "t": "Confirm you are using your assigned radio position per the MCT roster",
    "critical": false
   },
   {
    "t": "Confirm passport delivered to the accountability location (engine pump panel)",
    "critical": false
   },
   {
    "t": "Check air: cylinder full, gauge reading noted",
    "critical": false
   },
   {
    "t": "Arm and test PASS device; confirm it sounds",
    "critical": true
   },
   {
    "t": "Locate the orange emergency button by feel",
    "critical": false
   },
   {
    "t": "Verify crew is intact with a supervisor; all members have radios",
    "critical": false
   },
   {
    "t": "Confirm assignment and exit route with officer",
    "critical": false
   },
   {
    "t": "Partner check of facepiece, hood, collar, gloves",
    "critical": false
   }
  ]
 },
 {
  "id": "ladder-24-raise",
  "kind": "skill",
  "stage": "academy",
  "title": "Ladder raise: 24' extension, two-person",
  "sub": "Two-firefighter flat raise (beam or flat), heeling, extension and placement.",
  "src": "IFSTA/NFPA (verify against your academy skill sheet)",
  "steps": [
   {
    "t": "Both firefighters remove the ladder from the apparatus and assume carry position (low shoulder)",
    "critical": false
   },
   {
    "t": "Carry butt-first to the objective; butt firefighter calls stops",
    "critical": false
   },
   {
    "t": "Look up: check for overhead power lines and obstructions",
    "critical": true
   },
   {
    "t": "Place butt about 1/4 working length from the building; heeler foots the butt",
    "critical": false
   },
   {
    "t": "Raiser walks the ladder up hand-over-hand to vertical while heeler pulls/controls",
    "critical": false
   },
   {
    "t": "Turn the ladder so the fly is in correct position (per manufacturer/department)",
    "critical": false
   },
   {
    "t": "Heeler controls the beams; raiser extends the fly with the halyard to the desired height",
    "critical": false
   },
   {
    "t": "Confirm pawls/dogs are locked over a rung",
    "critical": true
   },
   {
    "t": "Lower the ladder gently into the building together",
    "critical": false
   },
   {
    "t": "Check climbing angle (~75 degrees; arm's length test) and footing",
    "critical": false
   },
   {
    "t": "Tie off halyard and heel/secure before climbing",
    "critical": false
   }
  ]
 },
 {
  "id": "hose-roll-load",
  "kind": "skill",
  "stage": "academy",
  "title": "Hose roll and hose load basics",
  "sub": "Straight/donut roll and reloading a flat or minuteman preconnect.",
  "src": "IFSTA/NFPA (verify against your academy skill sheet)",
  "steps": [
   {
    "t": "Drain the hose and check for damage; clean couplings",
    "critical": false
   },
   {
    "t": "Lay the hose flat and straight with no twists",
    "critical": false
   },
   {
    "t": "Straight roll: start at the male coupling and roll toward the female (male inside, protected)",
    "critical": false
   },
   {
    "t": "Donut roll: fold to put the male end ~3-5 ft short of the female, roll from the fold",
    "critical": false
   },
   {
    "t": "Keep rolls tight and edges even; set on end to finish",
    "critical": false
   },
   {
    "t": "Reload: connect hose to the discharge and load in the bed in the department pattern (flat/accordion/minuteman)",
    "critical": false
   },
   {
    "t": "Keep folds even and staggered; avoid couplings at fold points",
    "critical": false
   },
   {
    "t": "Place loops/pull tabs where the pattern requires",
    "critical": false
   },
   {
    "t": "Attach the nozzle (bail closed) and stow per the preconnect layout",
    "critical": false
   },
   {
    "t": "Check the load pulls clean and report bed ready",
    "critical": false
   }
  ]
 },
 {
  "id": "hydrant-connection",
  "kind": "skill",
  "stage": "academy",
  "title": "Hydrant connection and charging",
  "sub": "Component skill of taking a hydrant: open, flush, connect, charge on command.",
  "src": "IFSTA/NFPA (verify against your academy skill sheet)",
  "steps": [
   {
    "t": "Wrap the hydrant or position supply hose at the hydrant",
    "critical": false
   },
   {
    "t": "Use a hydrant wrench to remove the steamer cap; leave side caps on and tight",
    "critical": false
   },
   {
    "t": "Inspect outlet threads and gasket; check for debris",
    "critical": false
   },
   {
    "t": "Open the hydrant briefly to flush, then close",
    "critical": false
   },
   {
    "t": "Connect hydrant valve or supply line (hand-tight with spanner if needed)",
    "critical": false
   },
   {
    "t": "Straighten kinks and remove slack in the supply line",
    "critical": false
   },
   {
    "t": "Wait for the Engineer's order to charge",
    "critical": false
   },
   {
    "t": "Open the hydrant slowly and fully (counterclockwise); never fast-open or fast-close",
    "critical": true
   },
   {
    "t": "Check for leaks at all couplings",
    "critical": false
   },
   {
    "t": "Stay with the hydrant until released",
    "critical": false
   }
  ]
 },
 {
  "id": "primary-search-oriented",
  "kind": "skill",
  "stage": "academy",
  "title": "Primary search: oriented search",
  "sub": "Officer/anchor stays oriented at a wall while the searcher sweeps rooms off them.",
  "src": "MP 202.04 (primary search); MP 201.03 (crew integrity); technique IFSTA/NFPA (verify against your academy skill sheet)",
  "steps": [
   {
    "t": "Confirm assignment, size up exterior (windows, bedrooms, layout)",
    "critical": false
   },
   {
    "t": "Go on air, PASS armed, radio check; door checked for heat",
    "critical": true
   },
   {
    "t": "Enter and control the door behind you",
    "critical": false
   },
   {
    "t": "Oriented member stays on the wall at the room entry as anchor",
    "critical": false
   },
   {
    "t": "Searcher sweeps the room off the anchor using a tool and voice contact",
    "critical": false
   },
   {
    "t": "Check under/beside beds, closets, bathtubs, behind doors",
    "critical": false
   },
   {
    "t": "Searcher returns to the anchor; announce 'room clear'",
    "critical": false
   },
   {
    "t": "Mark the room searched per department practice",
    "critical": false
   },
   {
    "t": "Move to the next room together, maintaining wall orientation and exit awareness",
    "critical": false
   },
   {
    "t": "Monitor air; turn around with enough air to exit",
    "critical": true
   },
   {
    "t": "Report search progress and 'primary all clear' to Command",
    "critical": false
   }
  ]
 },
 {
  "id": "victim-drag",
  "kind": "skill",
  "stage": "academy",
  "title": "Victim drag / removal",
  "sub": "Basic drags: clothing/blanket drag, webbing drag, firefighter (SCBA strap) drag.",
  "src": "IFSTA/NFPA (verify against your academy skill sheet)",
  "steps": [
   {
    "t": "Announce victim found and position (radio)",
    "critical": false
   },
   {
    "t": "Roll the victim face-up, protecting head and neck",
    "critical": false
   },
   {
    "t": "Grab the clothing at the shoulders, a blanket, or apply a webbing harness",
    "critical": false
   },
   {
    "t": "For a downed firefighter: convert SCBA straps to a drag harness / use drag loop",
    "critical": false
   },
   {
    "t": "Lift the head/shoulders slightly off the floor",
    "critical": false
   },
   {
    "t": "Drag in a straight line using your legs, staying low",
    "critical": false
   },
   {
    "t": "Maintain wall/hoseline contact toward the exit",
    "critical": false
   },
   {
    "t": "Remove to fresh air and hand off to EMS",
    "critical": false
   }
  ]
 },
 {
  "id": "forcible-entry-inward-door",
  "kind": "skill",
  "stage": "academy",
  "title": "Forcible entry: inward-swinging door with irons",
  "sub": "Two-person irons technique (halligan + flathead axe).",
  "src": "IFSTA/NFPA (verify against your academy skill sheet)",
  "steps": [
   {
    "t": "Try the door first ('try before you pry')",
    "critical": false
   },
   {
    "t": "Check the door for heat and observe smoke at the gaps",
    "critical": true
   },
   {
    "t": "Identify swing (hinges inside = inward) and lock location",
    "critical": false
   },
   {
    "t": "Place the halligan fork/adz at the lock area, bevel against the door",
    "critical": false
   },
   {
    "t": "If needed, gap the door with the adz first",
    "critical": false
   },
   {
    "t": "Halligan firefighter calls 'hit'; striker drives the halligan with the flat of the axe",
    "critical": false
   },
   {
    "t": "Drive until the fork is past the door stop/jamb",
    "critical": false
   },
   {
    "t": "Push the halligan toward the door to pop it inward",
    "critical": false
   },
   {
    "t": "Control the door with a strap/hand; do not let it swing wide uncontrolled",
    "critical": true
   },
   {
    "t": "Announce entry and stage tools at the entry point",
    "critical": false
   }
  ]
 },
 {
  "id": "routine-am-engine-check",
  "kind": "routine",
  "stage": "probation",
  "title": "Morning apparatus check - engine",
  "sub": "Generic order. Adjust to your station's own apparatus checklist and your Engineer/Captain's expectations.",
  "src": "MP 205.21 (radio and battery checks each shift); MP 201.03 (passport); general practice",
  "steps": [
   {
    "t": "Report early, change out with off-going member, and get the relief report",
    "critical": false
   },
   {
    "t": "Put your nametag on the passport and helmet ID; confirm MCT roster position",
    "critical": false
   },
   {
    "t": "Check your PPE: turnouts, boots, hood, gloves, helmet, flashlight",
    "critical": false
   },
   {
    "t": "Check your SCBA: cylinder full, harness, facepiece, PASS and low-air alarm",
    "critical": true
   },
   {
    "t": "Check your portable radio works on the correct deck/channel; swap a battery if needed",
    "critical": true
   },
   {
    "t": "Check spare radio batteries and chargers",
    "critical": false
   },
   {
    "t": "Walk-around: tires, lights, body damage, leaks under the rig",
    "critical": false
   },
   {
    "t": "Fluids (with Engineer): oil, coolant, transmission, DEF/fuel level",
    "critical": false
   },
   {
    "t": "Pump/primer check and tank water level (with Engineer)",
    "critical": false
   },
   {
    "t": "Inventory tools by compartment: irons, axes, pike poles, hand tools, saws",
    "critical": false
   },
   {
    "t": "Run saws/fans briefly and check fuel",
    "critical": false
   },
   {
    "t": "Check hose loads, nozzles and appliances are in place",
    "critical": false
   },
   {
    "t": "Check EMS: oxygen levels, monitor/AED battery and pads, EMS bag/drug box",
    "critical": true
   },
   {
    "t": "Check TIC and handlights are charged",
    "critical": false
   },
   {
    "t": "Report deficiencies to Captain/Engineer and red-tag failed equipment",
    "critical": false
   }
  ]
 },
 {
  "id": "routine-shift-change",
  "kind": "routine",
  "stage": "probation",
  "title": "Shift change / relief",
  "sub": "Being relieved and relieving the off-going member.",
  "src": "MP 201.03 (update passport on arrival); MP 205.21 (radio check at start of shift); station practice",
  "steps": [
   {
    "t": "Arrive early and in uniform, ready to work",
    "critical": false
   },
   {
    "t": "Find the member you are relieving; get the relief face-to-face",
    "critical": false
   },
   {
    "t": "Receive the report: calls, equipment problems, station business",
    "critical": false
   },
   {
    "t": "Move your PPE to the rig in your riding position",
    "critical": false
   },
   {
    "t": "Update passport nametags and helmet ID immediately",
    "critical": false
   },
   {
    "t": "Check your SCBA and radio before the off-going member leaves",
    "critical": false
   },
   {
    "t": "Confirm MCT roster/radio position with the Captain",
    "critical": false
   },
   {
    "t": "Report to the Captain that you are in service",
    "critical": false
   },
   {
    "t": "When relieved: give a full report and leave your area clean and stocked",
    "critical": false
   }
  ]
 },
 {
  "id": "routine-scba-daily",
  "kind": "routine",
  "stage": "probation",
  "title": "SCBA daily inspection",
  "sub": "Per PFD SCBA policy (MP 202.05B referenced in PFD MPs) and NFPA 1852 general practice. Use the manufacturer's inspection steps.",
  "src": "MP 202.05B (referenced; not in packet); NFPA 1852; MP 201.03 (SCBA ID markings)",
  "steps": [
   {
    "t": "Confirm SCBA ID markings are present (MP 201.03)",
    "critical": false
   },
   {
    "t": "Inspect backplate, harness, straps and buckles for damage",
    "critical": false
   },
   {
    "t": "Check cylinder hydrostatic test date and condition (no cuts, gouges, heat damage)",
    "critical": false
   },
   {
    "t": "Check cylinder pressure is full (at least ~90% of rated)",
    "critical": true
   },
   {
    "t": "Inspect hoses and connections for cracks or wear",
    "critical": false
   },
   {
    "t": "Inspect the facepiece: lens, head harness, exhalation valve; clean if dirty",
    "critical": false
   },
   {
    "t": "Open the cylinder valve; listen for leaks",
    "critical": false
   },
   {
    "t": "Check that remote gauge and cylinder gauge agree",
    "critical": false
   },
   {
    "t": "Bleed down and confirm the low-air alarm activates at the correct pressure",
    "critical": true
   },
   {
    "t": "Test the PASS: arm, motion alarm, and manual activation",
    "critical": true
   },
   {
    "t": "Close valve, bleed the system, and reset straps fully extended",
    "critical": false
   },
   {
    "t": "Red-tag and report any deficiency; document the inspection",
    "critical": false
   }
  ]
 },
 {
  "id": "signoff-rotation",
  "kind": "signoff",
  "stage": "probation",
  "title": "Rotation sign-off (each 3-month rotation)",
  "sub": "Complete at each of the three station/apparatus assignments (engines and ladders).",
  "src": "Packet Sec. Seven (three ~3-month rotations); MP 202.01; MP 205.21; MP 205.01; MP 201.03; MP 206.03",
  "steps": [
   {
    "t": "Introduce yourself to the Captain; review expectations and experience level (MP 206.03)",
    "critical": false
   },
   {
    "t": "Learn station duties, house rules and daily schedule",
    "critical": false
   },
   {
    "t": "Learn first-due streets, block ranges and response routes",
    "critical": false
   },
   {
    "t": "Locate hydrants and water supply in the first due",
    "critical": false
   },
   {
    "t": "Identify target hazards and pre-plans in the first due",
    "critical": false
   },
   {
    "t": "Inventory the apparatus by compartment from memory",
    "critical": false
   },
   {
    "t": "Demonstrate SCBA, radio and PPE daily checks",
    "critical": false
   },
   {
    "t": "Demonstrate radio procedures: order model, unit IDs, emergency button (MP 205.01/205.21)",
    "critical": true
   },
   {
    "t": "Demonstrate accountability: passport, nametags, crew integrity (MP 201.03)",
    "critical": true
   },
   {
    "t": "Demonstrate each Engine company function (MP 202.01)",
    "critical": false
   },
   {
    "t": "Demonstrate each Ladder company function (MP 202.01)",
    "critical": false
   },
   {
    "t": "Complete assigned probationary training modules and tests",
    "critical": false
   },
   {
    "t": "Review rotation evaluation with the Captain and sign",
    "critical": false
   }
  ]
 },
 {
  "id": "signoff-probation-ready",
  "kind": "signoff",
  "stage": "probation",
  "title": "End of probation readiness",
  "sub": "Self-check before the probationary final evaluation (basic + functional skills, 2 attempts).",
  "src": "Packet Sec. Six (Probationary Training / final evaluation); MP 202.01; MP 201.01B; MP 201.03",
  "steps": [
   {
    "t": "All three rotation sign-offs complete and signed",
    "critical": false
   },
   {
    "t": "All mandatory probationary training modules attended",
    "critical": false
   },
   {
    "t": "Basic skills reviewed to standard (SCBA, ladders, hose, hydrant, forcible entry, search, drags)",
    "critical": false
   },
   {
    "t": "Functional evolutions practiced: hydrant through vertical vent",
    "critical": false
   },
   {
    "t": "Mayday procedures known: Mayday report, B.O.A., GRAB LIVES, emergency button (MP 201.01B)",
    "critical": true
   },
   {
    "t": "Accountability and air management reviewed (MP 201.03)",
    "critical": true
   },
   {
    "t": "Company functions for engine, ladder and rescue known (MP 202.01)",
    "critical": false
   },
   {
    "t": "EMS skills current and EMT certification valid",
    "critical": false
   },
   {
    "t": "District knowledge and radio procedures verified",
    "critical": false
   },
   {
    "t": "Physical fitness maintained",
    "critical": false
   },
   {
    "t": "Final evaluation scheduled; weak areas reviewed with Captain/mentor",
    "critical": false
   }
  ]
 }
];
