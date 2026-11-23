/* ============================================================
   SCENARIOS — first-arriving size-up game from the Sets & Reps decks
   Each beat is a pick. Beats with `best` + `mp` get an MP check right after
   the pick: the app shows whether the call matches the Phoenix M.P. and quotes
   what the M.P. says. Beats without `best` are judgment reads (what's happening
   inside, victim status) and are logged without a check. The debrief mirrors the
   run in the On Scene Report deck's framework and lists the MP check results.
   Source for every MP note: Phoenix Regional SOP Volume II (Jan 2025 book),
   text in build/fire-mps/ and build/sop-vol2/.
   Fields: hotspots {kind:'move'|'spray', x,y[,w,h], label, note, c}; step
   {label, q, opts:[string|{t,c}], best?, mp?, cat?, unit?, kind?, showIf?}.
   `c` lists the clears an option works toward (All Clear / Fire Control /
   Loss Stopped) for the debrief. Options are shuffled at display.
   Scenarios 1-8: Ocotillo, House, Gilbert, Mid-Rise (202.20), High-Rise (202.11),
   Strip Mall (202.04A), Church basement (202.04B), Stick City (202.18).
   Scenarios 9-13 (Nov 2026, photos from the department command-process deck):
   Garage apartments (202.16), Ranch first-due command (202.04/201.01),
   Tile roof 2-story (202.06), Parking garage (202.16/202.04B),
   Pizza restaurant strip mall (202.04/202.06).
   Scenarios 14-17: probie seat — nozzle, hydrant & supply, primary search, backup line & standpipe.
   ============================================================ */
'use strict';

var SCENARIOS = [
 {
  "id": "ocotillo",
  "title": "Ocotillo — Apartment Fire",
  "sub": "Woodbridge Apartments · 6635 N. 19th Ave #214 · First-arriving size-up",
  "dispatch": "FD Haz Chan A1 · Inc #000001 · Apartment Fire · 6635 N. 19th Ave #214, Phoenix · CODE 3 · 09:15 · Units: E1, L1, E2, E3, R3, BC1. Caller reports fire on the 2nd floor.",
  "arrival": "You arrive first on E1: a 2-story apartment building around a courtyard. Heavy black smoke and visible flame from a 2nd-floor unit. Hydrant in the foreground. Occupants unknown — daytime.",
  "image": "assets/scenarios/ocotillo-arrival.jpg",
  "imageAlt": "Arrival view: 2-story apartment building, heavy black smoke and flame from a 2nd-floor unit, courtyard, hydrant in the foreground.",
  "hotspots": [
   {
    "kind": "move",
    "x": 16,
    "y": 70,
    "label": "Front door",
    "note": "Make entry at ground level"
   },
   {
    "kind": "move",
    "x": 31,
    "y": 57,
    "label": "Stairs to 2nd floor",
    "note": "Climb to the fire floor"
   },
   {
    "kind": "move",
    "x": 50,
    "y": 68,
    "label": "Courtyard",
    "note": "Move into the courtyard"
   },
   {
    "kind": "move",
    "x": 70,
    "y": 72,
    "label": "Hydrant",
    "note": "Establish water supply"
   },
   {
    "kind": "spray",
    "x": 50,
    "y": 40,
    "w": 14,
    "h": 13,
    "label": "Fire-unit window",
    "note": "Reset the fire from outside (exterior attack)",
    "c": [
     "Fire Control"
    ]
   },
   {
    "kind": "spray",
    "x": 16,
    "y": 18,
    "w": 12,
    "h": 14,
    "label": "2nd-floor window",
    "note": "Reset the fire from outside (exterior attack)",
    "c": [
     "Fire Control"
    ]
   }
  ],
  "steps": [
   {
    "label": "Approach",
    "q": "You pull up. Where do you go first? Tap a number on the picture or pick from the list.",
    "hotspots": true,
    "best": 4,
    "mp": "M.P. 202.02B: with fire showing, \"before making entry\" reset or darken down the fire with a straight stream to the compartment ceiling for 15–30 seconds, then go in aggressively. M.P. 202.04: initiate the attack on the same level as the fire — the closest door doesn't pick your line."
   },
   {
    "label": "Fireground factors",
    "q": "Size it up. Which read gets the building, fire and occupancy factors right?",
    "opts": [
     "Building: 2-story garden apartment, courtyard layout. Fire: one 2nd-floor unit, heavy black smoke and flame showing. Occupancy: residential, occupants unknown, daytime.",
     "Building: single-story commercial strip, open lot. Fire: one 2nd-floor unit, heavy black smoke and flame showing. Occupancy: residential, occupants unknown, daytime.",
     "Building: 2-story garden apartment, courtyard layout. Fire: 1st-floor unit, light gray smoke from the eaves only. Occupancy: vacant building, no life hazard expected.",
     "Building: 2-story garden apartment, courtyard layout. Fire: one 2nd-floor unit, heavy smoke and flame. Occupancy: residential, daytime, so assume everyone is away at work."
    ],
    "best": 0,
    "mp": "M.P. 202.02B lists the fireground factors: Building, Fire & Smoke, Life Hazard, Occupancy, Arrangement, Resources. Nail the building, the fire and the occupancy first, and never write off occupants on a guess — unknown means you search until you have the All Clear."
   },
   {
    "label": "Risk profile",
    "q": "What is your risk profile on this fire?",
    "opts": [
     "Risk a lot — savable lives possible in an occupied residential building.",
     "Risk a little — protect the exposures and property, no interior commitment yet.",
     "Risk nothing — go defensive now; the smoke and flame are too much.",
     "Risk a lot — the building is the priority whether anyone is inside or not."
    ],
    "best": 0,
    "mp": "M.P. 202.02B Risk Management Plan: \"We will risk our lives a lot, in a calculated manner, to save SAVABLE lives.\" Risk a little is for savable property; risk nothing is for what is already lost. The building never outranks the people."
   },
   {
    "label": "Strategy",
    "q": "What strategy do you declare?",
    "opts": [
     "Offensive — interior attack and search for savable lives",
     "Defensive — exterior streams until the fire darkens down",
     "Offensive inside, with a master stream outside backing it up",
     "No declaration yet — let BC1 set the strategy on arrival"
    ],
    "best": 0,
    "mp": "M.P. 202.02B: structure fires are Offensive or Defensive — one or the other, declared by the first IC in the on-scene report. Never run interior crews and exterior master streams in the same fire area; \"the fireground strategy cannot be a mystery.\""
   },
   {
    "label": "Incident action plan",
    "q": "What is your IAP?",
    "opts": [
     "Primary search and fire attack, with coordinated support",
     "Fire attack only — hold the search until the fire is out",
     "Master streams on the fire, then search once it’s dark",
     "Exposure protection first, then fire attack and search"
    ],
    "best": 0,
    "mp": "M.P. 202.04 Basic Offensive Plan: fire attack from the most advantageous position, \"conduct a primary search in coordination with fire attack when possible,\" and coordinated support (ventilation, forcible entry, loss control). Exposure protection leads a defensive plan, not an offensive one."
   },
   {
    "label": "Tactical priorities",
    "q": "In what order do you work the tactical priorities?",
    "opts": [
     "All Clear (primary search) → Fire Control → Loss Stopped",
     "Fire Control → All Clear (primary search) → Loss Stopped",
     "Loss Stopped → Fire Control → All Clear (primary search)",
     "All Clear (primary search) → Loss Stopped → Fire Control"
    ],
    "best": 0,
    "mp": "M.P. 202.02A: Rescue, Fire Control, Property Conservation — benchmarks \"All clear,\" \"Under control,\" \"Loss stopped.\" They run concurrently and are driven by conditions, but rescue leads; often fire control is what makes the search possible."
   },
   {
    "label": "On-scene report",
    "q": "Give your on-scene report — which version do you send?",
    "opts": [
     "E1 on scene, medium 2-story apartment building, working fire on the 2nd floor, heavy smoke and flame showing. E1 is laying a line and going in for search and fire attack. This is an offensive fire. E1 will be 19th Avenue Command.",
     "E1 on scene, medium 2-story apartment building, working fire on the 2nd floor, heavy smoke and flame showing. E1 is laying a line and going in for search and fire attack. E1 will be 19th Avenue Command. Give me the balance of a 1st Alarm.",
     "E1 on scene, medium 2-story apartment building, working fire on the 2nd floor, heavy smoke and flame showing. Offensive strategy, search and fire attack, first 3 companies to IAP tasks and 1 in reserve. E1 has command.",
     "E1 on scene at 6635 N. 19th Ave. E1 is laying a line and going in for search and fire attack. This is an offensive fire. E1 will be 19th Avenue Command. E1 will be north side accountability."
    ],
    "best": 0,
    "mp": "M.P. 201.01 On-Scene Report: unit on scene, building (occupancy, size, height), conditions, action taken, declared strategy, and command confirmation with a name (\"Engine 11 will be 7th Street Command\"). Accountability location and the balance of the alarm belong in the follow-up report."
   },
   {
    "label": "Initial 3 & 1",
    "q": "How do you run the initial 3 & 1?",
    "opts": [
     "First 3 companies to IAP tasks, 1 as tactical reserve; add resources before using it.",
     "All 4 companies to IAP tasks right away; ask for a reserve when the next alarm arrives.",
     "First 2 companies to IAP tasks, 2 held back as reserve until the fire is located.",
     "Put the reserve on the hardest task first, then call for more resources."
    ],
    "best": 0,
    "mp": "Deck 3 & 1 / M.P. 201.06: deploy resources to the IAP and keep a tactical reserve; request more before you commit the reserve, and go up by alarms (3 & 1, then 1st Alarm), not piecemeal. M.P. 201.01 fast attack: assign an attack team of 2 engines and a ladder; the rest stage."
   },
   {
    "label": "Roof type",
    "cat": "sizeup",
    "q": "Size-up: what roof type do you see?",
    "opts": [
     "Flat roof",
     "Pitched roof",
     "Mixed — flat over the main building, pitched over the units",
     "Can’t tell from here"
    ]
   },
   {
    "label": "House style",
    "cat": "sizeup",
    "q": "Size-up: what style of building is this?",
    "opts": [
     "Garden-style apartment — 2-story, courtyard layout",
     "Townhouse-style attached units",
     "Mid-rise apartment building",
     "Single-story converted building"
    ]
   },
   {
    "label": "Attic",
    "cat": "sizeup",
    "q": "Size-up: what about the attic?",
    "opts": [
     "Common attic across units",
     "Separate attic per unit",
     "No attic — flat roof with a cockloft",
     "Unknown — can’t confirm from outside"
    ],
    "mp": "M.P. 202.06: determining the attic, common voids and extension in common attics is a Roof Sector job. M.P. 202.02B: where fire gets into concealed spaces, find it and open it early — \"early identification and response to concealed space fires will save the building.\""
   },
   {
    "label": "What’s happening inside?",
    "cat": "sizeup",
    "q": "What’s happening inside? Your first read:",
    "opts": [
     "Fire in one 2nd-floor unit, smoke showing",
     "Smoke throughout the 2nd floor",
     "Fire already extending into the attic",
     "Unknown — no interior report yet"
    ]
   },
   {
    "label": "Victim status",
    "cat": "sizeup",
    "q": "Are people hurt? What do you know right now?",
    "opts": [
     "Unknown — no victims reported yet",
     "Occupants seen leaving, no injuries reported",
     "Occupants possibly still inside",
     "Injuries reported — medical needed"
    ]
   },
   {
    "label": "Attack flow",
    "q": "How do you attack it?",
    "opts": [
     "Reset the fire from outside, then move interior (transitional attack)",
     "Hit it from outside only — stay exterior and let it darken down"
    ],
    "best": 0,
    "mp": "M.P. 202.02B: \"Before making entry\" with fire showing, reset or darken down the fire with a straight stream to the compartment ceiling for 15–30 seconds — and \"this tactic must be followed by an aggressive interior attack.\" M.P. 202.04: consider a transitional attack when conditions must be changed from the exterior before entry."
   },
   {
    "label": "Go interior",
    "showIf": {
     "label": "Attack flow",
     "match": "interior"
    },
    "q": "You go interior — then what?",
    "opts": [
     "Finish the fire unit with the line while the search pair works the rooms",
     "Search every room in the unit first, then bring the attack line in behind you",
     "Bypass the fire unit — check the hallway and the units next door",
     "Pull ceiling to check extension before you knock the main fire"
    ],
    "best": 0,
    "mp": "M.P. 202.02B: the reset \"must be followed by an aggressive interior attack to complete fire extinguishment,\" and \"search, rescue and fire attack are simultaneous operations.\" M.P. 202.04: \"extinguishing the fire makes everything better on the fireground.\""
   },
   {
    "label": "Crew of 4",
    "kind": "crew",
    "q": "Deploy your 4-person engine crew — who does what?",
    "opts": [
     {
      "t": "Officer + 1 firefighter to primary search, 2 firefighters to the attack line.",
      "c": [
       "All Clear",
       "Fire Control"
      ]
     },
     {
      "t": "All 4 on the attack line — knock the fire down first, then search once it’s dark.",
      "c": [
       "Fire Control"
      ]
     },
     {
      "t": "Officer stays outside as command, 3 firefighters go in on primary search.",
      "c": [
       "All Clear"
      ]
     },
     {
      "t": "2 firefighters on the attack line, 2 setting up exposure lines on the outside.",
      "c": [
       "Fire Control",
       "Loss Stopped"
      ]
     }
    ],
    "best": 0,
    "mp": "M.P. 202.04 / 202.02B: search runs simultaneously with fire attack. A 1¾-inch line at 150 GPM is a one-firefighter line (about 65 lb nozzle reaction), so two on the line and two on search covers both clears. Make the 2 in / 2 out decision before entry."
   },
   {
    "label": "Assign E2",
    "unit": "E2",
    "q": "Where do you send E2, and what task?",
    "opts": [
     {
      "t": "2nd line to the fire floor to back up E1’s attack.",
      "c": [
       "Fire Control"
      ]
     },
     {
      "t": "Backup / RIT outside the fire unit for the interior crews.",
      "c": []
     },
     {
      "t": "Exposure lines on the units on both sides of the fire.",
      "c": [
       "Loss Stopped"
      ]
     },
     {
      "t": "Water supply — catch the hydrant and feed E1.",
      "c": []
     },
     {
      "t": "Hold in staging as the tactical reserve.",
      "c": []
     }
    ],
    "best": 0,
    "mp": "M.P. 201.01 fast attack: the IC assigns an attack team (2 engines and a ladder), and responding companies \"back up the basic attack.\" M.P. 202.04 Basic Offensive Plan: \"support fire attack from the next most advantageous position.\""
   },
   {
    "label": "2nd engine placement",
    "unit": "E2",
    "cat": "unit",
    "q": "Where does the 2nd engine go?",
    "opts": [
     "Front of the building",
     "Rear / courtyard access",
     "Hydrant — water supply position",
     "Staging until assigned"
    ]
   },
   {
    "label": "Assign L1",
    "unit": "L1",
    "q": "Where do you send L1, and what task?",
    "opts": [
     {
      "t": "Primary search of the 2nd floor and the fire unit.",
      "c": [
       "All Clear"
      ]
     },
     {
      "t": "Vertical ventilation over the fire, coordinated with E1.",
      "c": [
       "Fire Control"
      ]
     },
     {
      "t": "Ground ladders to the 2nd-floor balconies for rescue.",
      "c": [
       "All Clear"
      ]
     },
     {
      "t": "Hold in staging as the tactical reserve.",
      "c": []
     }
    ],
    "mp": "M.P. 202.01: ladder functions include search and rescue, coordinated horizontal and vertical ventilation, ground ladders and checking extension — the MP doesn't pick one here; that's your call off conditions. M.P. 202.04: any ventilation must be coordinated with the attack; uncoordinated vent makes fire control harder."
   },
   {
    "label": "Ladder placement",
    "unit": "L1",
    "cat": "unit",
    "q": "Where does the ladder go?",
    "opts": [
     "Front — rescue and ventilation",
     "Rear — courtyard side",
     "Roof position",
     "Staging until assigned"
    ]
   },
   {
    "label": "Assign E3",
    "unit": "E3",
    "q": "Where do you send E3, and what task?",
    "opts": [
     {
      "t": "Exposure lines on the neighboring units.",
      "c": [
       "Loss Stopped"
      ]
     },
     {
      "t": "3rd line into the fire unit with E1.",
      "c": [
       "Fire Control"
      ]
     },
     {
      "t": "Water supply off a second hydrant.",
      "c": []
     },
     {
      "t": "Hold in staging as the tactical reserve.",
      "c": []
     }
    ],
    "best": 3,
    "mp": "Deck 3 & 1 / M.P. 201.06: E1, E2 and L1 are your three working companies; the fourth company is the tactical reserve. \"Request more resources before you assign your tactical reserve.\" Command must always have a reserve ready for the unexpected, including a firefighter rescue."
   },
   {
    "label": "Assign R3",
    "unit": "R3",
    "q": "Where do you send R3, and what task?",
    "opts": [
     {
      "t": "RIT / rescue standby outside the fire building.",
      "c": []
     },
     {
      "t": "Primary search alongside E1’s search pair.",
      "c": [
       "All Clear"
      ]
     },
     {
      "t": "Medical / rehab sector, ready to treat and transport.",
      "c": []
     },
     {
      "t": "Hold in staging as part of the reserve.",
      "c": []
     }
    ],
    "mp": "M.P. 202.01: rescue companies do search, rescue and treatment, and \"should communicate commitment and location to Command and maintain a retrievable status for victim treatment and transportation.\" The MP doesn't fix one assignment — keep them retrievable."
   },
   {
    "label": "Assign BC1",
    "unit": "BC1",
    "q": "Where do you send BC1, and what task?",
    "opts": [
     {
      "t": "Take command through transfer of command; set up the CP.",
      "c": []
     },
     {
      "t": "Run a safety and accountability sector for the crews.",
      "c": []
     },
     {
      "t": "Division supervisor working on the fire floor.",
      "c": []
     },
     {
      "t": "Run staging and request the additional resources.",
      "c": []
     }
    ],
    "best": 0,
    "mp": "M.P. 201.01: \"The first arriving Command Officer should assume Command\" through the Transfer of Command procedure and becomes IC #2 at a stationary command post outside the hazard zone. Fast-attack mobile command \"should not last more than a few minutes.\""
   },
   {
    "label": "Stretch check (hose)",
    "q": "What line do you bring, and how do you decide?",
    "opts": [
     "1¾-inch, sized by walking it: courtyard, one flight up, hall to the unit — reach, work, turn.",
     "2-inch line, sized by walking it: courtyard, one flight up, hall to the unit — reach, work, turn.",
     "1¾-inch off the crosslay nearest the engine — the closest door picks the line.",
     "Biggest line on the rig — length doesn’t matter as long as the flow is big."
    ],
    "best": 0,
    "mp": "M.P. 202.04: residential fires get 150 GPM on a 1¾-inch line, and lines must be \"of adequate length and size\" — size up the distances and obstacles. Tactical consideration: \"the closest door to the apparatus should not dictate line placement.\""
   },
   {
    "label": "What’s happening inside? (update)",
    "cat": "sizeup",
    "q": "What’s happening inside? Update your read:",
    "opts": [
     "Interior report: fire contained to the unit of origin",
     "Fire extending — attic involvement suspected",
     "Smoke clearing, no extension seen",
     "Still unknown from outside"
    ]
   },
   {
    "label": "Victim status (update)",
    "cat": "sizeup",
    "q": "Are people hurt? Update:",
    "opts": [
     "Still unknown",
     "Occupants out, no injuries",
     "Victims found — rescue underway",
     "Injuries confirmed — medical requested"
    ]
   },
   {
    "label": "Reposition",
    "q": "Conditions have changed. Where do you go now? Tap a number on the picture or pick from the list.",
    "hotspots": true
   }
  ]
 },
 {
  "id": "house",
  "title": "House — Single-Family Fire",
  "sub": "M.P. 202.04 Fire Control · Residential · First-arriving size-up",
  "dispatch": "House fire. Single-story single-family home, smoke showing. Units: E1, L1, E2, E3, R3, BC1. Occupants unknown.",
  "arrival": "You arrive first on E1: a single-story house. Flame blowing out of a front window on the left, heavy black smoke pushing from the roof over that room. Garage on the right. Occupants unknown.",
  "image": "assets/scenarios/house-arrival.jpg",
  "imageAlt": "Arrival view: single-story house, flame from a front window, heavy black smoke from the roof over that room, garage on the right.",
  "hotspots": [
   {
    "kind": "move",
    "x": 40,
    "y": 58,
    "label": "Front door",
    "note": "Make entry at the front"
   },
   {
    "kind": "move",
    "x": 62,
    "y": 68,
    "label": "Garage",
    "note": "Check the garage"
   },
   {
    "kind": "move",
    "x": 9,
    "y": 74,
    "label": "Side yard",
    "note": "Walk the 360"
   },
   {
    "kind": "spray",
    "x": 24,
    "y": 54,
    "w": 13,
    "h": 15,
    "label": "Fire window",
    "note": "Reset the fire from outside (exterior attack)",
    "c": [
     "Fire Control"
    ]
   }
  ],
  "steps": [
   {
    "label": "Approach",
    "q": "You pull up. Where do you go first? Tap a number on the picture or pick from the list.",
    "hotspots": true,
    "best": 3,
    "mp": "M.P. 202.02B: with fire venting out a window, \"before making entry\" reset or darken down the fire with a straight stream to the ceiling for 15–30 seconds, then follow with an aggressive interior attack. Get your 360 information as you go — flow path, fire location, survivable spaces."
   },
   {
    "label": "Fireground factors",
    "q": "Size it up. Which read gets the building, fire and occupancy factors right?",
    "opts": [
     "Building: single-story house, pitched roof, attached garage on the right. Fire: front room on the left, flame out the window, heavy black smoke over that room. Occupancy: residential, occupants unknown.",
     "Building: 2-story house, flat roof, attached garage on the right. Fire: front room on the left, flame out the window, heavy black smoke rolling from the roof over that room. Occupancy: residential, occupants unknown.",
     "Building: single-story house, pitched roof, attached garage on the right. Fire: garage fire, smoke pushing from the right side. Occupancy: residential, cars are gone so likely empty.",
     "Building: single-story house, pitched roof, attached garage on the right. Fire: front room on the left, light smoke only. Occupancy: home business, closed for the day, nobody inside."
    ],
    "best": 0,
    "mp": "M.P. 202.02B lists the fireground factors: Building, Fire & Smoke, Life Hazard, Occupancy, Arrangement, Resources. Nail the building, the fire and the occupancy first, and never write off occupants on a guess — unknown means you search until you have the All Clear."
   },
   {
    "label": "Risk profile",
    "q": "What is your risk profile on this fire?",
    "opts": [
     "Risk a lot — savable lives possible in an occupied residential building.",
     "Risk a little — protect the exposures and property, no interior commitment yet.",
     "Risk nothing — go defensive now; the smoke and flame are too much.",
     "Risk a lot — the building is the priority whether anyone is inside or not."
    ],
    "best": 0,
    "mp": "M.P. 202.02B Risk Management Plan: \"We will risk our lives a lot, in a calculated manner, to save SAVABLE lives.\" Risk a little is for savable property; risk nothing is for what is already lost. The building never outranks the people."
   },
   {
    "label": "Strategy",
    "q": "What strategy do you declare?",
    "opts": [
     "Offensive — interior attack and search for savable lives",
     "Defensive — exterior streams until the fire darkens down",
     "Offensive inside, with a master stream outside backing it up",
     "No declaration yet — let BC1 set the strategy on arrival"
    ],
    "best": 0,
    "mp": "M.P. 202.02B: structure fires are Offensive or Defensive — one or the other, declared by the first IC in the on-scene report. Never run interior crews and exterior master streams in the same fire area; \"the fireground strategy cannot be a mystery.\""
   },
   {
    "label": "Incident action plan",
    "q": "What is your IAP?",
    "opts": [
     "Primary search and fire attack, with coordinated support",
     "Fire attack only — hold the search until the fire is out",
     "Master streams on the fire, then search once it’s dark",
     "Exposure protection first, then fire attack and search"
    ],
    "best": 0,
    "mp": "M.P. 202.04 Basic Offensive Plan: fire attack from the most advantageous position, \"conduct a primary search in coordination with fire attack when possible,\" and coordinated support (ventilation, forcible entry, loss control). Exposure protection leads a defensive plan, not an offensive one."
   },
   {
    "label": "Tactical priorities",
    "q": "In what order do you work the tactical priorities?",
    "opts": [
     "All Clear (primary search) → Fire Control → Loss Stopped",
     "Fire Control → All Clear (primary search) → Loss Stopped",
     "Loss Stopped → Fire Control → All Clear (primary search)",
     "All Clear (primary search) → Loss Stopped → Fire Control"
    ],
    "best": 0,
    "mp": "M.P. 202.02A: Rescue, Fire Control, Property Conservation — benchmarks \"All clear,\" \"Under control,\" \"Loss stopped.\" They run concurrently and are driven by conditions, but rescue leads; often fire control is what makes the search possible."
   },
   {
    "label": "On-scene report",
    "q": "Give your on-scene report — which version do you send?",
    "opts": [
     "E1 on scene, small single-story house, working fire in a front room, flame out the window and heavy black smoke. E1 is pulling a line for search and fire attack. This is an offensive fire. E1 will be Maple Street Command.",
     "E1 on scene, small single-story house, working fire in a front room, flame out the window and heavy black smoke. E1 is pulling a line for search and fire attack. E1 will be Maple Street Command. Give me the balance of a 1st Alarm.",
     "E1 on scene, small single-story house, working fire in a front room, flame out the window and heavy black smoke. Offensive strategy, search and fire attack, 3 companies to IAP tasks and 1 in reserve. E1 has command.",
     "E1 on scene, house fire. E1 is pulling a line for search and fire attack. This is an offensive fire. E1 will be Maple Street Command. E1 will be the front side accountability location."
    ],
    "best": 0,
    "mp": "M.P. 201.01 On-Scene Report: unit on scene, building (occupancy, size, height), conditions, action taken, declared strategy, and command confirmation with a name (\"Engine 11 will be 7th Street Command\"). Accountability location and the balance of the alarm belong in the follow-up report."
   },
   {
    "label": "Initial 3 & 1",
    "q": "How do you run the initial 3 & 1?",
    "opts": [
     "First 3 companies to IAP tasks, 1 as tactical reserve; add resources before using it.",
     "All 4 companies to IAP tasks right away; ask for a reserve when the next alarm arrives.",
     "First 2 companies to IAP tasks, 2 held back as reserve until the fire is located.",
     "Put the reserve on the hardest task first, then call for more resources."
    ],
    "best": 0,
    "mp": "Deck 3 & 1 / M.P. 201.06: deploy resources to the IAP and keep a tactical reserve; request more before you commit the reserve, and go up by alarms (3 & 1, then 1st Alarm), not piecemeal. M.P. 201.01 fast attack: assign an attack team of 2 engines and a ladder; the rest stage."
   },
   {
    "label": "Roof type",
    "cat": "sizeup",
    "q": "Size-up: what roof type do you see?",
    "opts": [
     "Pitched roof",
     "Flat roof",
     "Mixed — pitched over the house, flat over the garage",
     "Can’t tell from here"
    ]
   },
   {
    "label": "Construction",
    "cat": "sizeup",
    "q": "Size-up: what is the construction?",
    "opts": [
     "Wood frame with stucco exterior",
     "Block construction",
     "Brick construction",
     "Can’t tell from here"
    ]
   },
   {
    "label": "What’s happening inside?",
    "cat": "sizeup",
    "q": "What’s happening inside? Your first read:",
    "opts": [
     "Fire in one front room, smoke showing",
     "Smoke throughout the house",
     "Fire already extending into the attic",
     "Unknown — no interior report yet"
    ]
   },
   {
    "label": "Victim status",
    "cat": "sizeup",
    "q": "Are people hurt? What do you know right now?",
    "opts": [
     "Unknown — no victims reported yet",
     "Occupants seen leaving, no injuries reported",
     "Occupants possibly still inside",
     "Injuries reported — medical needed"
    ]
   },
   {
    "label": "Attack flow",
    "q": "How do you attack it?",
    "opts": [
     "Reset the fire from outside, then move interior (transitional attack)",
     "Hit it from outside only — stay exterior and let it darken down"
    ],
    "best": 0,
    "mp": "M.P. 202.02B: \"Before making entry\" with fire showing, reset or darken down the fire with a straight stream to the compartment ceiling for 15–30 seconds — and \"this tactic must be followed by an aggressive interior attack.\" M.P. 202.04: consider a transitional attack when conditions must be changed from the exterior before entry."
   },
   {
    "label": "Go interior",
    "showIf": {
     "label": "Attack flow",
     "match": "interior"
    },
    "q": "You go interior — then what?",
    "opts": [
     "Finish the fire room with the line while the search pair works the house",
     "Search every room in the house first, then bring the attack line in behind you",
     "Bypass the fire room — check the hallway and the bedrooms",
     "Pull ceiling to check extension before you knock the main fire"
    ],
    "best": 0,
    "mp": "M.P. 202.02B: the reset \"must be followed by an aggressive interior attack to complete fire extinguishment,\" and \"search, rescue and fire attack are simultaneous operations.\" M.P. 202.04: \"extinguishing the fire makes everything better on the fireground.\""
   },
   {
    "label": "Flow",
    "q": "M.P. 202.04: what flow does a residential fire get?",
    "opts": [
     "150 GPM — 1¾-inch line, automatic nozzle.",
     "250 GPM — 2-inch line, smooth bore nozzle.",
     "300 GPM — 2½-inch line, smooth bore nozzle.",
     "500 GPM — portable monitor off a 2½-inch."
    ],
    "best": 0,
    "mp": "M.P. 202.04: residential fires get 150 GPM — 1¾-inch line with an automatic nozzle. 250 GPM and up is the commercial standard, and \"residential fire tactics and flow rates should not be used in commercial fires.\""
   },
   {
    "label": "150-foot rule",
    "q": "M.P. 202.04 sets a limit on how far inside you operate. What is it?",
    "opts": [
     "150 feet in smoke and fire — and never past getting back to safe refuge before low air.",
     "200 feet — the length of the longest crosslay, as long as the line stays charged the whole way.",
     "As far as the line reaches, as long as the crew stays together on the hose.",
     "300 feet, but only with a backup line and a RIT crew in place behind you."
    ],
    "best": 0,
    "mp": "M.P. 202.04 150-foot rule: no company advances more than 150 feet inside with smoke and fire conditions, set by attack-line lengths and SCBA air. The bottom line: never operate \"beyond their ability to retreat to an area of safe refuge prior to their low air alarm.\""
   },
   {
    "label": "Search with attack",
    "q": "In a residential fire, when does search happen?",
    "opts": [
     "Alongside the attack when possible — fire control helps every victim.",
     "Only after the fire is fully out and the smoke has lifted.",
     "Only when a neighbor or family member confirms someone is still inside.",
     "Search goes first; the attack line waits at the front door."
    ],
    "best": 0,
    "mp": "M.P. 202.04: \"When possible, search and rescue efforts should be performed simultaneously with fire attack to allow for the best outcomes.\" Fire control improves the odds for savable lives — \"extinguishing the fire makes everything better on the fireground.\""
   },
   {
    "label": "Crew of 4",
    "kind": "crew",
    "q": "Deploy your 4-person engine crew — who does what?",
    "opts": [
     {
      "t": "Officer + 1 firefighter to primary search, 2 firefighters to the attack line.",
      "c": [
       "All Clear",
       "Fire Control"
      ]
     },
     {
      "t": "All 4 on the attack line — knock the fire down first, then search once it’s dark.",
      "c": [
       "Fire Control"
      ]
     },
     {
      "t": "Officer stays outside as command, 3 firefighters go in on primary search.",
      "c": [
       "All Clear"
      ]
     },
     {
      "t": "2 firefighters on the attack line, 2 setting up exposure lines on the outside.",
      "c": [
       "Fire Control",
       "Loss Stopped"
      ]
     }
    ],
    "best": 0,
    "mp": "M.P. 202.04 / 202.02B: search runs simultaneously with fire attack. A 1¾-inch line at 150 GPM is a one-firefighter line (about 65 lb nozzle reaction), so two on the line and two on search covers both clears. Make the 2 in / 2 out decision before entry."
   },
   {
    "label": "Assign E2",
    "unit": "E2",
    "q": "Where do you send E2, and what task?",
    "opts": [
     {
      "t": "2nd line into the house to back up E1’s attack.",
      "c": [
       "Fire Control"
      ]
     },
     {
      "t": "Backup / RIT at the front door for the interior crews.",
      "c": []
     },
     {
      "t": "Exposure lines on the garage and the neighbor’s house.",
      "c": [
       "Loss Stopped"
      ]
     },
     {
      "t": "Water supply — catch the hydrant and feed E1.",
      "c": []
     },
     {
      "t": "Hold in staging as the tactical reserve.",
      "c": []
     }
    ],
    "best": 0,
    "mp": "M.P. 201.01 fast attack: the IC assigns an attack team (2 engines and a ladder), and responding companies \"back up the basic attack.\" M.P. 202.04 Basic Offensive Plan: \"support fire attack from the next most advantageous position.\""
   },
   {
    "label": "2nd engine placement",
    "unit": "E2",
    "cat": "unit",
    "q": "Where does the 2nd engine go?",
    "opts": [
     "Front of the building",
     "Rear access",
     "Hydrant — water supply position",
     "Staging until assigned"
    ]
   },
   {
    "label": "Assign L1",
    "unit": "L1",
    "q": "Where do you send L1, and what task?",
    "opts": [
     {
      "t": "Primary search of the bedrooms and the rest of the house.",
      "c": [
       "All Clear"
      ]
     },
     {
      "t": "Vertical ventilation over the fire, coordinated with E1.",
      "c": [
       "Fire Control"
      ]
     },
     {
      "t": "Ground ladders to the windows for rescue.",
      "c": [
       "All Clear"
      ]
     },
     {
      "t": "Hold in staging as the tactical reserve.",
      "c": []
     }
    ],
    "mp": "M.P. 202.01: ladder functions include search and rescue, coordinated horizontal and vertical ventilation, ground ladders and checking extension — the MP doesn't pick one here; that's your call off conditions. M.P. 202.04: any ventilation must be coordinated with the attack; uncoordinated vent makes fire control harder."
   },
   {
    "label": "Ladder placement",
    "unit": "L1",
    "cat": "unit",
    "q": "Where does the ladder go?",
    "opts": [
     "Front — rescue and ventilation",
     "Rear — back of the house",
     "Roof position",
     "Staging until assigned"
    ]
   },
   {
    "label": "Assign E3",
    "unit": "E3",
    "q": "Where do you send E3, and what task?",
    "opts": [
     {
      "t": "Exposure lines on the neighbor’s house and yard.",
      "c": [
       "Loss Stopped"
      ]
     },
     {
      "t": "2nd line to the back of the house.",
      "c": [
       "Fire Control"
      ]
     },
     {
      "t": "Water supply off a second hydrant.",
      "c": []
     },
     {
      "t": "Hold in staging as the tactical reserve.",
      "c": []
     }
    ],
    "best": 3,
    "mp": "Deck 3 & 1 / M.P. 201.06: E1, E2 and L1 are your three working companies; the fourth company is the tactical reserve. \"Request more resources before you assign your tactical reserve.\" Command must always have a reserve ready for the unexpected, including a firefighter rescue."
   },
   {
    "label": "Assign R3",
    "unit": "R3",
    "q": "Where do you send R3, and what task?",
    "opts": [
     {
      "t": "RIT / rescue standby outside the fire building.",
      "c": []
     },
     {
      "t": "Primary search alongside E1’s search pair.",
      "c": [
       "All Clear"
      ]
     },
     {
      "t": "Medical / rehab sector, ready to treat and transport.",
      "c": []
     },
     {
      "t": "Hold in staging as part of the reserve.",
      "c": []
     }
    ],
    "mp": "M.P. 202.01: rescue companies do search, rescue and treatment, and \"should communicate commitment and location to Command and maintain a retrievable status for victim treatment and transportation.\" The MP doesn't fix one assignment — keep them retrievable."
   },
   {
    "label": "Assign BC1",
    "unit": "BC1",
    "q": "Where do you send BC1, and what task?",
    "opts": [
     {
      "t": "Take command through transfer of command; set up the CP.",
      "c": []
     },
     {
      "t": "Run a safety and accountability sector for the crews.",
      "c": []
     },
     {
      "t": "Division supervisor working on the fire floor.",
      "c": []
     },
     {
      "t": "Run staging and request the additional resources.",
      "c": []
     }
    ],
    "best": 0,
    "mp": "M.P. 201.01: \"The first arriving Command Officer should assume Command\" through the Transfer of Command procedure and becomes IC #2 at a stationary command post outside the hazard zone. Fast-attack mobile command \"should not last more than a few minutes.\""
   },
   {
    "label": "Stretch check (hose)",
    "q": "What line do you bring, and how do you decide?",
    "opts": [
     "1¾-inch, sized by walking it: front door, hall to the fire room — reach, work, turn.",
     "2-inch line, sized by walking it: front door, hall to the fire room — reach, work, turn.",
     "1¾-inch off the crosslay nearest the engine — the closest door picks the line.",
     "Biggest line on the rig — length doesn’t matter as long as the flow is big."
    ],
    "best": 0,
    "mp": "M.P. 202.04: residential fires get 150 GPM on a 1¾-inch line, and lines must be \"of adequate length and size\" — size up the distances and obstacles. Tactical consideration: \"the closest door to the apparatus should not dictate line placement.\""
   },
   {
    "label": "What’s happening inside? (update)",
    "cat": "sizeup",
    "q": "What’s happening inside? Update your read:",
    "opts": [
     "Interior report: fire contained to the room of origin",
     "Fire extending — attic involvement suspected",
     "Smoke clearing, no extension seen",
     "Still unknown from outside"
    ]
   },
   {
    "label": "Victim status (update)",
    "cat": "sizeup",
    "q": "Are people hurt? Update:",
    "opts": [
     "Still unknown",
     "Occupants out, no injuries",
     "Victims found — rescue underway",
     "Injuries confirmed — medical requested"
    ]
   },
   {
    "label": "MP reference",
    "q": "M.P. 202.04 Fire Control — the lines that matter here: residential fires get 150 GPM on a 1¾-inch line with an automatic nozzle. Residential tactics and flow rates should not be used on a commercial fire. Ventilation must be coordinated with the attack — uncoordinated vent makes fire control harder. When the fire is ventilation-limited, attack through the inlet of the flow path: cool the interior surfaces first, then hit the burning fuel. Search runs with the attack when possible. Never operate more than 150 feet inside with smoke and fire conditions, or past your ability to reach safe refuge before your low-air alarm.",
    "opts": [
     "Understood — show my debrief"
    ]
   },
   {
    "label": "Reposition",
    "q": "Conditions have changed. Where do you go now? Tap a number on the picture or pick from the list.",
    "hotspots": true
   }
  ]
 },
 {
  "id": "gilbert",
  "title": "Gilbert — 2-Story House Fire",
  "sub": "M.P. 202.04 Fire Control · Residential · Sets & Reps deck, 2644 E. Wyatt Way",
  "dispatch": "FD Haz Chan A1 · Inc #000001 · House Fire · 2644 E. Wyatt Way, Gilbert · CODE 3 · 09:15 · Units: E1, E2, L1, E3, R3, BC1. Homeowner says he was using a Solo Stove on the upstairs balcony, could not control the fire, family evacuating.",
  "arrival": "You arrive first on E1: a 2-story house. Heavy black smoke pushing from the roof over the rear. The fire started on the upstairs balcony. The family is getting out. Yellow hydrant in the front yard.",
  "image": "assets/scenarios/gilbert-arrival.jpg",
  "imageAlt": "Arrival view: 2-story house, heavy black smoke from the roof over the rear, upstairs balcony on the right, yellow hydrant in the front yard, aerial map inset at lower right.",
  "hotspots": [
   {
    "kind": "move",
    "x": 36,
    "y": 64,
    "label": "Front door",
    "note": "Make entry at the front"
   },
   {
    "kind": "move",
    "x": 31,
    "y": 78,
    "label": "Hydrant",
    "note": "Establish water supply"
   },
   {
    "kind": "move",
    "x": 8,
    "y": 72,
    "label": "Side yard",
    "note": "Walk the 360"
   },
   {
    "kind": "spray",
    "x": 56,
    "y": 38,
    "w": 12,
    "h": 14,
    "label": "Balcony",
    "note": "Reset the balcony fire from outside (exterior attack)",
    "c": [
     "Fire Control"
    ]
   }
  ],
  "steps": [
   {
    "label": "Approach",
    "q": "You pull up. Where do you go first? Tap a number on the picture or pick from the list.",
    "hotspots": true,
    "best": 2,
    "mp": "M.P. 202.02B: \"Gather 360° of information; identify the flow path and the most likely location of the fire and survivable environments for victims.\" The smoke is over the rear and the fire started on a balcony — go see it before you pick your attack."
   },
   {
    "label": "Fireground factors",
    "q": "Size it up. Which read gets the building, fire and occupancy factors right?",
    "opts": [
     "Building: 2-story house, pitched tile roof, open loft over the living room. Fire: started on the upstairs balcony, heavy black smoke from the roof over the rear. Occupancy: residential, family evacuating.",
     "Building: single-story house, flat roof, open loft over the living room. Fire: started on the upstairs balcony, heavy black smoke from the roof. Occupancy: residential, family evacuating.",
     "Building: 2-story house, pitched tile roof, open loft over the living room. Fire: 1st-floor kitchen, light smoke from the front door. Occupancy: residential, family evacuating.",
     "Building: 2-story house, pitched tile roof, open loft over the living room. Fire: balcony only, staying on the exterior. Occupancy: residential, everyone out per the homeowner."
    ],
    "best": 0,
    "mp": "M.P. 202.02B lists the fireground factors: Building, Fire & Smoke, Life Hazard, Occupancy, Arrangement, Resources. Nail the building, the fire and the occupancy first, and never write off occupants on a guess — unknown means you search until you have the All Clear. Family evacuating is not an All Clear, and smoke from the roof says the fire is inside, not just on the balcony."
   },
   {
    "label": "Risk profile",
    "q": "What is your risk profile on this fire?",
    "opts": [
     "Risk a lot — savable lives possible until the search proves everyone is out.",
     "Risk a little — protect the exposures and property, no interior commitment yet.",
     "Risk nothing — go defensive now; the smoke and flame are too much.",
     "Risk a lot — the building is the priority whether anyone is inside or not."
    ],
    "best": 0,
    "mp": "M.P. 202.02B Risk Management Plan: \"We will risk our lives a lot, in a calculated manner, to save SAVABLE lives.\" Risk a little is for savable property; risk nothing is for what is already lost. The building never outranks the people."
   },
   {
    "label": "Strategy",
    "q": "What strategy do you declare?",
    "opts": [
     "Offensive — interior attack and search for savable lives",
     "Defensive — exterior streams until the fire darkens down",
     "Offensive inside, with a master stream outside backing it up",
     "No declaration yet — let BC1 set the strategy on arrival"
    ],
    "best": 0,
    "mp": "M.P. 202.02B: structure fires are Offensive or Defensive — one or the other, declared by the first IC in the on-scene report. Never run interior crews and exterior master streams in the same fire area; \"the fireground strategy cannot be a mystery.\""
   },
   {
    "label": "Incident action plan",
    "q": "What is your IAP?",
    "opts": [
     "Primary search and fire attack, with coordinated support",
     "Fire attack only — hold the search until the fire is out",
     "Master streams on the fire, then search once it’s dark",
     "Exposure protection first, then fire attack and search"
    ],
    "best": 0,
    "mp": "M.P. 202.04 Basic Offensive Plan: fire attack from the most advantageous position, \"conduct a primary search in coordination with fire attack when possible,\" and coordinated support (ventilation, forcible entry, loss control). Exposure protection leads a defensive plan, not an offensive one."
   },
   {
    "label": "Tactical priorities",
    "q": "In what order do you work the tactical priorities?",
    "opts": [
     "All Clear (primary search) → Fire Control → Loss Stopped",
     "Fire Control → All Clear (primary search) → Loss Stopped",
     "Loss Stopped → Fire Control → All Clear (primary search)",
     "All Clear (primary search) → Loss Stopped → Fire Control"
    ],
    "best": 0,
    "mp": "M.P. 202.02A: Rescue, Fire Control, Property Conservation — benchmarks \"All clear,\" \"Under control,\" \"Loss stopped.\" They run concurrently and are driven by conditions, but rescue leads; often fire control is what makes the search possible."
   },
   {
    "label": "On-scene report",
    "q": "Give your on-scene report — which version do you send?",
    "opts": [
     "E1 on scene, medium 2-story house, fire on the upstairs balcony with heavy black smoke from the roof, family evacuating. E1 is laying a line and going in for search and fire attack. This is an offensive fire. E1 will be Wyatt Command.",
     "E1 on scene, medium 2-story house, fire on the upstairs balcony with heavy black smoke from the roof, family evacuating. E1 is laying a line and going in for search and fire attack. E1 will be Wyatt Command. Give me the balance of a 1st Alarm.",
     "E1 on scene, medium 2-story house, fire on the upstairs balcony with heavy black smoke from the roof, family evacuating. Offensive strategy, search and fire attack, 3 companies to IAP tasks, 1 in reserve. E1 has command.",
     "E1 on scene at 2644 E. Wyatt Way. E1 is laying a line and going in for search and fire attack. This is an offensive fire. E1 will be Wyatt Command. E1 will be the north side accountability location."
    ],
    "best": 0,
    "mp": "M.P. 201.01 On-Scene Report: unit on scene, building (occupancy, size, height), conditions, action taken, declared strategy, and command confirmation with a name (\"Engine 11 will be 7th Street Command\"). Accountability location and the balance of the alarm belong in the follow-up report."
   },
   {
    "label": "Initial 3 & 1",
    "q": "How do you run the initial 3 & 1?",
    "opts": [
     "First 3 companies to IAP tasks, 1 as tactical reserve; add resources before using it.",
     "All 4 companies to IAP tasks right away; ask for a reserve when the next alarm arrives.",
     "First 2 companies to IAP tasks, 2 held back as reserve until the fire is located.",
     "Put the reserve on the hardest task first, then call for more resources."
    ],
    "best": 0,
    "mp": "Deck 3 & 1 / M.P. 201.06: deploy resources to the IAP and keep a tactical reserve; request more before you commit the reserve, and go up by alarms (3 & 1, then 1st Alarm), not piecemeal. M.P. 201.01 fast attack: assign an attack team of 2 engines and a ladder; the rest stage."
   },
   {
    "label": "Roof type",
    "cat": "sizeup",
    "q": "Size-up: what roof type do you see?",
    "opts": [
     "Pitched tile roof",
     "Flat roof",
     "Mixed — pitched over the house, flat over the garage",
     "Can’t tell from here"
    ],
    "mp": "M.P. 202.06: \"No firefighters will operate on the roof to ventilate a single-family or duplex structure fire covered with concrete or clay roof tiles.\" Plan horizontal or positive pressure ventilation with the attack companies instead."
   },
   {
    "label": "Open loft",
    "cat": "sizeup",
    "q": "The 2nd floor has an open loft over the living room. What does that change?",
    "opts": [
     "Smoke and heat rise straight to the loft and the rooms off it — check the loft and the bedrooms first.",
     "Nothing — the loft is not part of the fire.",
     "It means the fire is contained to the balcony.",
     "It makes the stairs the only thing that matters."
    ]
   },
   {
    "label": "Balcony fire",
    "cat": "sizeup",
    "q": "The fire started on the upstairs balcony. What do you watch for?",
    "opts": [
     "Extension from the balcony into the attic and the 2nd-floor rooms — and the patio cover above the balcony.",
     "Only the balcony — exterior fires stay exterior.",
     "The garage first.",
     "The 1st floor — fire drops down."
    ],
    "mp": "M.P. 202.02B: address all seven sides — front, rear, both sides, top, bottom and interior — and get into concealed spaces (attics, voids) early. \"Early identification and response to concealed space fires will save the building.\""
   },
   {
    "label": "What’s happening inside?",
    "cat": "sizeup",
    "q": "What’s happening inside? Your first read:",
    "opts": [
     "Fire on the balcony extending into the 2nd floor, smoke showing",
     "Smoke throughout both floors",
     "Fire already in the attic",
     "Unknown — no interior report yet"
    ]
   },
   {
    "label": "Victim status",
    "cat": "sizeup",
    "q": "Are people hurt? What do you know right now?",
    "opts": [
     "Family evacuating — homeowner says everyone is getting out",
     "Unknown — no victims reported yet",
     "Occupants possibly still inside",
     "Injuries reported — medical needed"
    ]
   },
   {
    "label": "Attack flow",
    "q": "How do you attack it?",
    "opts": [
     "Reset the fire from outside, then move interior (transitional attack)",
     "Hit it from outside only — stay exterior and let it darken down"
    ],
    "best": 0,
    "mp": "M.P. 202.02B: \"Before making entry\" with fire showing, reset or darken down the fire with a straight stream to the compartment ceiling for 15–30 seconds — and \"this tactic must be followed by an aggressive interior attack.\" M.P. 202.04: consider a transitional attack when conditions must be changed from the exterior before entry."
   },
   {
    "label": "Go interior",
    "showIf": {
     "label": "Attack flow",
     "match": "interior"
    },
    "q": "You go interior — then what?",
    "opts": [
     "Finish the fire on the 2nd floor while the search pair takes the loft",
     "Search the whole 2nd floor and the loft first, then bring the line up after",
     "Bypass the fire rooms — check the 1st floor and the garage first",
     "Pull ceiling to check the attic before you knock the main fire"
    ],
    "best": 0,
    "mp": "M.P. 202.02B: the reset \"must be followed by an aggressive interior attack to complete fire extinguishment,\" and \"search, rescue and fire attack are simultaneous operations.\" M.P. 202.04: \"extinguishing the fire makes everything better on the fireground.\""
   },
   {
    "label": "Flow",
    "q": "M.P. 202.04: what flow does a residential fire get?",
    "opts": [
     "150 GPM — 1¾-inch line, automatic nozzle.",
     "250 GPM — 2-inch line, smooth bore nozzle.",
     "300 GPM — 2½-inch line, smooth bore nozzle.",
     "500 GPM — portable monitor off a 2½-inch."
    ],
    "best": 0,
    "mp": "M.P. 202.04: residential fires get 150 GPM — 1¾-inch line with an automatic nozzle. 250 GPM and up is the commercial standard, and \"residential fire tactics and flow rates should not be used in commercial fires.\""
   },
   {
    "label": "Stairs",
    "q": "The fire is upstairs. What do you think about on the way up?",
    "opts": [
     "The stairs are a flow path — go in on the intake side, air at your back.",
     "Speed beats everything — get up the stairs before the line is even charged.",
     "The stairs are safe — the fire is out on the balcony, not inside.",
     "Skip the stairs — take the line up a ground ladder to the balcony."
    ],
    "best": 0,
    "mp": "M.P. 202.02B: \"Make every effort to enter the structure at the air intake side of the flow path. You want the air at your back,\" and keep openings closed until you have a charged line in place. M.P. 202.04: initiate your fire attack on the same level as the fire."
   },
   {
    "label": "Crew of 4",
    "kind": "crew",
    "q": "Deploy your 4-person engine crew — who does what?",
    "opts": [
     {
      "t": "Officer + 1 firefighter to primary search on the 2nd floor, 2 firefighters to the attack line.",
      "c": [
       "All Clear",
       "Fire Control"
      ]
     },
     {
      "t": "All 4 on the attack line — knock the fire down first, then search once it’s dark.",
      "c": [
       "Fire Control"
      ]
     },
     {
      "t": "Officer stays outside as command, 3 firefighters go in on primary search.",
      "c": [
       "All Clear"
      ]
     },
     {
      "t": "2 firefighters on the attack line, 2 setting up exposure lines on the outside.",
      "c": [
       "Fire Control",
       "Loss Stopped"
      ]
     }
    ],
    "best": 0,
    "mp": "M.P. 202.04 / 202.02B: search runs simultaneously with fire attack. A 1¾-inch line at 150 GPM is a one-firefighter line (about 65 lb nozzle reaction), so two on the line and two on search covers both clears. Make the 2 in / 2 out decision before entry."
   },
   {
    "label": "Assign E2",
    "unit": "E2",
    "q": "Where do you send E2, and what task?",
    "opts": [
     {
      "t": "2nd line to the 2nd floor to back up E1’s attack.",
      "c": [
       "Fire Control"
      ]
     },
     {
      "t": "Backup / RIT at the front door for the interior crews.",
      "c": []
     },
     {
      "t": "Exposure lines on the house next door.",
      "c": [
       "Loss Stopped"
      ]
     },
     {
      "t": "Water supply — catch the yellow hydrant and feed E1.",
      "c": []
     },
     {
      "t": "Hold in staging as the tactical reserve.",
      "c": []
     }
    ],
    "best": 0,
    "mp": "M.P. 201.01 fast attack: the IC assigns an attack team (2 engines and a ladder), and responding companies \"back up the basic attack.\" M.P. 202.04 Basic Offensive Plan: \"support fire attack from the next most advantageous position.\""
   },
   {
    "label": "2nd engine placement",
    "unit": "E2",
    "cat": "unit",
    "q": "Where does the 2nd engine go?",
    "opts": [
     "Front of the building",
     "Rear access",
     "Hydrant — water supply position",
     "Staging until assigned"
    ]
   },
   {
    "label": "Assign L1",
    "unit": "L1",
    "q": "Where do you send L1, and what task?",
    "opts": [
     {
      "t": "Primary search, 2nd floor and the loft.",
      "c": [
       "All Clear"
      ]
     },
     {
      "t": "Vertical vent — cut the roof over the fire.",
      "c": [
       "Fire Control"
      ]
     },
     {
      "t": "Ground ladder to the balcony for a rescue.",
      "c": [
       "All Clear"
      ]
     },
     {
      "t": "Hold in staging as the tactical reserve.",
      "c": []
     }
    ],
    "best": 0,
    "mp": "M.P. 202.06: no firefighters operate on a single-family tile roof to ventilate — plan horizontal or PPV with the attack. The fire started on the balcony, so that's no rescue spot. That leaves L1 on primary search of the 2nd floor and loft (M.P. 202.01), the first tactical objective."
   },
   {
    "label": "Ladder placement",
    "unit": "L1",
    "cat": "unit",
    "q": "Where does the ladder go?",
    "opts": [
     "Front — rescue and ventilation",
     "Rear — balcony side",
     "Roof position",
     "Staging until assigned"
    ],
    "mp": "M.P. 202.06: ladder placement should give safe access, a way off and a defensive option — but on a single-family tile roof nobody goes up to ventilate. Place for 2nd-floor access and rescue, not for roof work."
   },
   {
    "label": "Assign E3",
    "unit": "E3",
    "q": "Where do you send E3, and what task?",
    "opts": [
     {
      "t": "Exposure lines on the two neighboring houses.",
      "c": [
       "Loss Stopped"
      ]
     },
     {
      "t": "3rd line to the 2nd floor with E1.",
      "c": [
       "Fire Control"
      ]
     },
     {
      "t": "Water supply off a second hydrant.",
      "c": []
     },
     {
      "t": "Hold in staging as the tactical reserve.",
      "c": []
     }
    ],
    "best": 3,
    "mp": "Deck 3 & 1 / M.P. 201.06: E1, E2 and L1 are your three working companies; the fourth company is the tactical reserve. \"Request more resources before you assign your tactical reserve.\" Command must always have a reserve ready for the unexpected, including a firefighter rescue."
   },
   {
    "label": "Assign R3",
    "unit": "R3",
    "q": "Where do you send R3, and what task?",
    "opts": [
     {
      "t": "RIT / rescue standby outside the fire building.",
      "c": []
     },
     {
      "t": "Primary search alongside E1’s search pair.",
      "c": [
       "All Clear"
      ]
     },
     {
      "t": "Medical / rehab sector, ready to treat and transport.",
      "c": []
     },
     {
      "t": "Hold in staging as part of the reserve.",
      "c": []
     }
    ],
    "mp": "M.P. 202.01: rescue companies do search, rescue and treatment, and \"should communicate commitment and location to Command and maintain a retrievable status for victim treatment and transportation.\" The MP doesn't fix one assignment — keep them retrievable."
   },
   {
    "label": "Assign BC1",
    "unit": "BC1",
    "q": "Where do you send BC1, and what task?",
    "opts": [
     {
      "t": "Take command through transfer of command; set up the CP.",
      "c": []
     },
     {
      "t": "Run a safety and accountability sector for the crews.",
      "c": []
     },
     {
      "t": "Division supervisor working on the fire floor.",
      "c": []
     },
     {
      "t": "Run staging and request the additional resources.",
      "c": []
     }
    ],
    "best": 0,
    "mp": "M.P. 201.01: \"The first arriving Command Officer should assume Command\" through the Transfer of Command procedure and becomes IC #2 at a stationary command post outside the hazard zone. Fast-attack mobile command \"should not last more than a few minutes.\""
   },
   {
    "label": "Stretch check (hose)",
    "q": "What line do you bring, and how do you decide?",
    "opts": [
     "1¾-inch, sized by walking it: front door, up the stairs, hall to the fire — reach, work, turn.",
     "2-inch line, sized by walking it: front door, up the stairs, hall to the fire — reach, work, turn.",
     "1¾-inch off the crosslay nearest the engine — the closest door picks the line.",
     "Biggest line on the rig — length doesn’t matter as long as the flow is big."
    ],
    "best": 0,
    "mp": "M.P. 202.04: residential fires get 150 GPM on a 1¾-inch line, and lines must be \"of adequate length and size\" — size up the distances and obstacles. Tactical consideration: \"the closest door to the apparatus should not dictate line placement.\""
   },
   {
    "label": "What’s happening inside? (update)",
    "cat": "sizeup",
    "q": "What’s happening inside? Update your read:",
    "opts": [
     "Interior report: fire contained to the balcony and one 2nd-floor room",
     "Fire extending — attic involvement suspected",
     "Patio cover above the 2nd-story balcony collapsed",
     "Still unknown from outside"
    ]
   },
   {
    "label": "Victim status (update)",
    "cat": "sizeup",
    "q": "Are people hurt? Update:",
    "opts": [
     "Family out, no injuries",
     "Still unknown",
     "Victims found — rescue underway",
     "Injuries confirmed — medical requested"
    ]
   },
   {
    "label": "MP reference",
    "q": "The MPs behind this one: M.P. 202.04 Fire Control — residential fires get 150 GPM on a 1¾-inch line; search runs with the attack when possible; cool interior surfaces first, then hit the burning fuel. M.P. 202.02B Fireground Strategy — reset the fire from outside when you can, then attack aggressively, and enter on the air intake side of the flow path. M.P. 202.06 Roof Sector — no firefighters on a single-family tile roof; plan horizontal or PPV ventilation. Size-up call (not MP text): an open loft gives smoke and heat a straight shot to the 2nd floor, so search the loft and bedrooms early.",
    "opts": [
     "Understood — show my debrief"
    ]
   },
   {
    "label": "Reposition",
    "q": "Conditions have changed. Where do you go now? Tap a number on the picture or pick from the list.",
    "hotspots": true
   }
  ]
 },
 {
  "id": "midrise",
  "title": "Mid-Rise — Apartment Fire",
  "sub": "M.P. 202.20 Mid Rise Operations · Residential · First-arriving size-up",
  "dispatch": "Apartment fire. 4-story mid-rise apartment building, smoke showing from the 3rd floor. Units: E1, L1, E2, E3, R3, BC1. Multiple callers, occupants unknown.",
  "arrival": "You arrive first on E1: a 4-story mid-rise apartment building. Smoke pushing from the 3rd-floor balcony band. Big parking lot in front, room for apparatus. The building looks sealed up — not much showing for the smoke you can see.",
  "image": "assets/scenarios/midrise-arrival.jpg",
  "imageAlt": "Arrival view: 4-story mid-rise apartment building, smoke from the 3rd-floor balcony band, ground-floor entrance with yellow doors, parking lot in front, aerial map inset at lower left.",
  "hotspots": [
   {
    "kind": "move",
    "x": 28,
    "y": 52,
    "label": "Stairwell",
    "note": "Attack stairwell vs evacuation stairwell"
   },
   {
    "kind": "move",
    "x": 52,
    "y": 62,
    "label": "Main entrance",
    "note": "Find the alarm panel and the attack stairwell"
   },
   {
    "kind": "move",
    "x": 70,
    "y": 72,
    "label": "Hydrant",
    "note": "Establish water supply — FDC"
   },
   {
    "kind": "spray",
    "x": 55,
    "y": 32,
    "w": 14,
    "h": 10,
    "label": "Fire floor windows",
    "note": "Reset from the exterior — aerial or ground ladder",
    "c": [
     "Fire Control"
    ]
   },
   {
    "kind": "move",
    "x": 30,
    "y": 80,
    "label": "Aerial position",
    "note": "Room for the ladder — rescues from balconies"
   }
  ],
  "steps": [
   {
    "label": "Approach",
    "q": "You pull up. Where do you go first? Tap a number on the picture or pick from the list.",
    "hotspots": true,
    "best": 1,
    "mp": "M.P. 202.20: locate the fire as early as possible. The fire alarm panel (required in construction since 2002) is typically at the main entrance near the management offices — and there may be none at remote entrances."
   },
   {
    "label": "Fireground factors",
    "q": "Size it up. Which read gets the building, fire and occupancy factors right?",
    "opts": [
     "Building: 4-story mid-rise apartment, masonry lower level, wood frame above, interior hallways. Fire: smoke from the 3rd-floor balcony band, exact unit unknown. Occupancy: residential, high density, occupants unknown.",
     "Building: high-rise with a fire control room, fire pump and lobby. Fire: smoke from the 3rd-floor balcony band, exact unit unknown. Occupancy: residential, high density, occupants unknown.",
     "Building: 4-story mid-rise apartment, masonry lower level, wood frame above, interior hallways. Fire: light smoke only, likely a small fire. Occupancy: residential, high density, occupants unknown.",
     "Building: 4-story mid-rise apartment, masonry lower level, wood frame above, interior hallways. Fire: smoke from the 3rd-floor balcony band. Occupancy: residential, most will shelter in place."
    ],
    "best": 0,
    "mp": "M.P. 202.20: a mid-rise is over 3 stories and under 75 feet — not a high-rise, so don't expect a fire control room or a fire pump. Residential mid-rises are high density, \"nothing showing means nothing,\" and occupants \"may not shelter in place.\""
   },
   {
    "label": "Risk profile",
    "q": "What is your risk profile on this fire?",
    "opts": [
     "Risk a lot — savable lives possible in a high-density residential building.",
     "Risk a little — protect the exposures and property, no interior commitment yet.",
     "Risk nothing — go defensive now; the building is too big to go in.",
     "Risk a lot — the building is the priority whether anyone is inside or not."
    ],
    "best": 0,
    "mp": "M.P. 202.02B Risk Management Plan: \"We will risk our lives a lot, in a calculated manner, to save SAVABLE lives.\" Risk a little is for savable property; risk nothing is for what is already lost. The building never outranks the people."
   },
   {
    "label": "Strategy",
    "q": "What strategy do you declare?",
    "opts": [
     "Offensive — interior attack and search for savable lives",
     "Defensive — exterior streams until the fire darkens down",
     "Offensive inside, with a master stream outside backing it up",
     "No declaration yet — let BC1 set the strategy on arrival"
    ],
    "best": 0,
    "mp": "M.P. 202.02B: structure fires are Offensive or Defensive — one or the other, declared by the first IC in the on-scene report. Never run interior crews and exterior master streams in the same fire area; \"the fireground strategy cannot be a mystery.\""
   },
   {
    "label": "Incident action plan",
    "q": "What is your IAP?",
    "opts": [
     "Primary search and fire attack, with coordinated support",
     "Fire attack only — hold the search until the fire is out",
     "Master streams on the fire, then search once it’s dark",
     "Exposure protection first, then fire attack and search"
    ],
    "best": 0,
    "mp": "M.P. 202.04 Basic Offensive Plan: fire attack from the most advantageous position, \"conduct a primary search in coordination with fire attack when possible,\" and coordinated support (ventilation, forcible entry, loss control). Exposure protection leads a defensive plan, not an offensive one."
   },
   {
    "label": "Tactical priorities",
    "q": "In what order do you work the tactical priorities?",
    "opts": [
     "All Clear (primary search) → Fire Control → Loss Stopped",
     "Fire Control → All Clear (primary search) → Loss Stopped",
     "Loss Stopped → Fire Control → All Clear (primary search)",
     "All Clear (primary search) → Loss Stopped → Fire Control"
    ],
    "best": 0,
    "mp": "M.P. 202.02A: Rescue, Fire Control, Property Conservation — benchmarks \"All clear,\" \"Under control,\" \"Loss stopped.\" They run concurrently and are driven by conditions, but rescue leads; often fire control is what makes the search possible."
   },
   {
    "label": "On-scene report",
    "q": "Give your on-scene report — which version do you send?",
    "opts": [
     "E1 on scene, large 4-story mid-rise apartment building, smoke showing from the 3rd floor. E1 is going in with standpipe packs to locate the fire for search and fire attack. This is an offensive fire. E1 will be Parkway Command.",
     "E1 on scene, large 4-story mid-rise apartment building, smoke showing from the 3rd floor. E1 is going in with standpipe packs to locate the fire for search and fire attack. E1 will be Parkway Command. Give me the balance of a 1st Alarm.",
     "E1 on scene, large 4-story mid-rise apartment building, smoke showing from the 3rd floor. Offensive strategy, search and fire attack, first 3 companies to IAP tasks and 1 in reserve. E1 has command.",
     "E1 on scene, apartment fire. E1 is going in with standpipe packs to locate the fire for search and fire attack. This is an offensive fire. E1 will be Parkway Command. E1 will be east side accountability."
    ],
    "best": 0,
    "mp": "M.P. 201.01 On-Scene Report: unit on scene, building (occupancy, size, height), conditions, action taken, declared strategy, and command confirmation with a name (\"Engine 11 will be 7th Street Command\"). Accountability location and the balance of the alarm belong in the follow-up report. Height matters here — report the 4 stories."
   },
   {
    "label": "Initial 3 & 1",
    "q": "How do you run the initial 3 & 1?",
    "opts": [
     "First 3 companies to IAP tasks, 1 as tactical reserve; add resources before using it.",
     "All 4 companies to IAP tasks right away; ask for a reserve when the next alarm arrives.",
     "First 2 companies to IAP tasks, 2 held back as reserve until the fire is located.",
     "Put the reserve on the hardest task first, then call for more resources."
    ],
    "best": 0,
    "mp": "Deck 3 & 1 / M.P. 201.06: deploy resources to the IAP and keep a tactical reserve; request more before you commit the reserve, and go up by alarms (3 & 1, then 1st Alarm), not piecemeal. M.P. 201.01 fast attack: assign an attack team of 2 engines and a ladder; the rest stage."
   },
   {
    "label": "Nothing showing",
    "cat": "sizeup",
    "q": "The building is tightly sealed and not much is showing. What does M.P. 202.20 say about that?",
    "opts": [
     "\"Nothing showing means nothing\" — a serious fire can show no exterior signs.",
     "Little showing means a small fire — one line and one crew will handle it fine.",
     "Sealed buildings hold the fire in one unit — the walls are doing your job.",
     "Hold the commitment until smoke shows and confirms where the fire is."
    ],
    "best": 0,
    "mp": "M.P. 202.20: \"Nothing showing means nothing\" — \"it is likely to have a serious fire with no external signs on arrival.\" Tightly sealed mid-rises go ventilation-limited; size up pessimistically and locate the fire early."
   },
   {
    "label": "Standpipe",
    "cat": "sizeup",
    "q": "What do you need to know about the standpipe here?",
    "opts": [
     "Not in every stairwell, outlets up to 200 ft apart or in hallways, caps may be KNOX-locked, city pressure may fall short.",
     "Every stairwell has one and a fire pump keeps the pressure up — connect at the nearest outlet and go.",
     "A mid-rise under 75 feet has no standpipe — plan to stretch every line from the engine up the stairs.",
     "The FDC is always at the main entrance with the alarm panel, and the caps come off by hand."
    ],
    "best": 0,
    "mp": "M.P. 202.20: \"Standpipes may not be present in every stairwell,\" connections can be up to 200 feet apart, FDC and outlet caps may need the KNOX \"dog bone\" key, and mid-rises usually have no fire pump — \"wet standpipe systems with city water pressure above ground level may have inadequate water volume and pressure.\""
   },
   {
    "label": "Wood frame uppers",
    "cat": "sizeup",
    "q": "Modern residential mid-rise: what is the construction?",
    "opts": [
     "Masonry and concrete below, wood frame above — fire in the structure erodes it fast.",
     "All concrete — a mid-rise is built like a high-rise, so collapse isn’t really a factor.",
     "All wood frame top to bottom, including the parking level underneath.",
     "Steel frame throughout — the structure will hold well past fire control."
    ],
    "best": 0,
    "mp": "M.P. 202.20: modern residential mid-rises \"combine masonry and concrete in the lower level and wood framed construction in the upper levels.\" Fire in structural members is very dangerous — report it to Command immediately; it can mean writing off part or all of the building."
   },
   {
    "label": "Stairwells",
    "cat": "sizeup",
    "q": "Attack stairwell vs evacuation stairwell — what do you do?",
    "opts": [
     "Identify both from each floor — occupants take the route they know, not yours.",
     "Use a single stairwell for everything — attack, evacuation and the backup line.",
     "Evacuate through the attack stairwell first, then start the attack from it.",
     "Take the stairwell closest to the engine; sort out the others later."
    ],
    "best": 0,
    "mp": "M.P. 202.20: \"Clearly identify attack and evacuation stairwells from each floor.\" Occupants \"may not shelter in place\" and may leave by their most familiar route — even if that's your attack stairwell."
   },
   {
    "label": "Critical positions",
    "q": "Pessimistic resource read for this mid-rise — which positions need companies?",
    "opts": [
     "Fire floor for attack and rescue, floor above for rescue and extension, plus critical exposures.",
     "Fire floor only — get the fire out and the rest of the building takes care of itself.",
     "Fire floor and the floor below as a staging floor, the same setup as a high-rise.",
     "Every floor at once, one company each, before anyone has located the fire."
    ],
    "best": 0,
    "mp": "M.P. 202.20: it is necessary \"to appropriately support the fire floor for fire attack and rescue, the floor above for rescue and fire extension, and the critical exposures for loss control\" — plus resources for exterior rescue. Size it up pessimistically and strike alarms early."
   },
   {
    "label": "What’s happening inside?",
    "cat": "sizeup",
    "q": "What’s happening inside? Your first read:",
    "opts": [
     "Fire on the 3rd floor, smoke in the hallway and stairwell",
     "Smoke throughout the building",
     "Fire already in the wood frame above",
     "Unknown — no interior report yet"
    ]
   },
   {
    "label": "Victim status",
    "cat": "sizeup",
    "q": "Are people hurt? What do you know right now?",
    "opts": [
     "Unknown — no victims reported yet",
     "Occupants seen leaving, no injuries reported",
     "Occupants possibly still inside",
     "Injuries reported — medical needed"
    ]
   },
   {
    "label": "Attack flow",
    "q": "How do you attack it?",
    "opts": [
     "Reset the fire from outside, then move interior (transitional attack)",
     "Hit it from outside only — stay exterior and work off the aerial",
     "Locate the fire, then go interior off the standpipe in the attack stairwell"
    ],
    "best": 2,
    "mp": "M.P. 202.04 tactical consideration: interior suppression with only smoke showing. M.P. 202.20: locate the fire early and attack from the attack stairwell; an exterior or aerial attack is the option \"if interior access is delayed\" or conditions won't allow safe operations."
   },
   {
    "label": "Go interior",
    "showIf": {
     "label": "Attack flow",
     "match": "interior"
    },
    "q": "You go interior — then what?",
    "opts": [
     "Connect in the attack stairwell, then stretch onto the fire floor",
     "Search the fire floor first — the attack line follows once it’s charged",
     "Open up the void spaces before you find the fire unit",
     "Stretch from the engine up through the evacuation stairwell"
    ],
    "best": 0,
    "mp": "M.P. 202.20: \"Determine and monitor the fire attack stairwell\" and keep the evacuation stairwell for occupants. Stairwells are your area of safe refuge (M.P. 202.04) — start the attack there, on the same level as the fire."
   },
   {
    "label": "Flow",
    "q": "Off the standpipe, which attack line do you take?",
    "opts": [
     "2-inch smooth bore — 250+ GPM at standpipe pressures.",
     "1¾-inch automatic nozzle — 150 GPM, same as any apartment.",
     "2½-inch smooth bore — 300 GPM, one firefighter on it.",
     "Booster line — light and fast up the stairs."
    ],
    "best": 0,
    "mp": "M.P. 202.11: 2-inch handlines \"operate effectively at lower psi's typically seen in standpipe operations and provide greater gpm of 250+\"; 1¾-inch automatics give \"150 gpm at best.\" M.P. 202.04: a 2-inch takes 2 firefighters minimum, a 2½-inch takes 3. M.P. 202.20: pick the line \"for reach and appropriate water volume.\""
   },
   {
    "label": "Floor above",
    "q": "Fire's knocked on the 3rd floor and the 4th took smoke. What is the large-area targeted search up there?",
    "opts": [
     "Room by room after fire control in exposed areas — not the primary search for an All Clear.",
     "It is the primary search — finish it and report the All Clear for the whole building.",
     "A fast hallway walk-through without SCBA, since the fire is already under control.",
     "A search of the fire floor only — the occupants above will self-evacuate down the stairs on their own."
    ],
    "best": 0,
    "mp": "M.P. 202.20: the large-area targeted search is room by room or unit by unit in areas exposed to smoke and heat, after fire control, with multiple crews and enough time. It \"should not be confused with a primary search to achieve an all clear\" and is never done in IDLH conditions without hose lines or SCBA."
   },
   {
    "label": "Crew of 4",
    "kind": "crew",
    "q": "Deploy your 4-person engine crew — who does what?",
    "opts": [
     {
      "t": "Officer + 1 firefighter to primary search on the fire floor, 2 firefighters to the attack line.",
      "c": [
       "All Clear",
       "Fire Control"
      ]
     },
     {
      "t": "All 4 on the attack line — knock the fire down first, then search once it’s dark.",
      "c": [
       "Fire Control"
      ]
     },
     {
      "t": "Officer stays outside as command, 3 firefighters go in on primary search.",
      "c": [
       "All Clear"
      ]
     },
     {
      "t": "2 firefighters on the attack line, 2 setting up exposure lines on the outside.",
      "c": [
       "Fire Control",
       "Loss Stopped"
      ]
     }
    ],
    "best": 0,
    "mp": "M.P. 202.04 / 202.20: search runs simultaneously with fire attack — target the areas of greatest danger to victims. A 2-inch standpipe line needs 2 firefighters minimum (M.P. 202.04), so two on the line and two on search covers both clears."
   },
   {
    "label": "Assign E2",
    "unit": "E2",
    "q": "Where do you send E2, and what task?",
    "opts": [
     {
      "t": "2nd line off the standpipe to back up E1.",
      "c": [
       "Fire Control"
      ]
     },
     {
      "t": "Backup / RIT outside the fire floor for the crews.",
      "c": []
     },
     {
      "t": "Supply the FDC and support the standpipe.",
      "c": []
     },
     {
      "t": "Exposure lines on the floor above the fire.",
      "c": [
       "Loss Stopped"
      ]
     },
     {
      "t": "Hold in staging as the tactical reserve.",
      "c": []
     }
    ],
    "best": 2,
    "mp": "M.P. 202.20: mid-rises usually have no fire pump and run standpipes on city pressure, and wet standpipes above ground \"may have inadequate water volume and pressure to mount an effective fire attack.\" \"Establish and monitor effective water supply to fire floor\" — pump the FDC early."
   },
   {
    "label": "2nd engine placement",
    "unit": "E2",
    "cat": "unit",
    "q": "Where does the 2nd engine go?",
    "opts": [
     "Front of the building — FDC position",
     "Rear access",
     "Hydrant — water supply position",
     "Staging until assigned"
    ]
   },
   {
    "label": "Assign L1",
    "unit": "L1",
    "q": "Where do you send L1, and what task?",
    "opts": [
     {
      "t": "Aerial rescue and access from the balconies.",
      "c": [
       "All Clear"
      ]
     },
     {
      "t": "Ventilation — roof access and PPV in the stairwell.",
      "c": [
       "Fire Control"
      ]
     },
     {
      "t": "Primary search on the floor above the fire.",
      "c": [
       "All Clear"
      ]
     },
     {
      "t": "Hold in staging as the tactical reserve.",
      "c": []
     }
    ],
    "mp": "M.P. 202.20: exterior rescue is a critical position — \"determine the location and means of removal\" — and ladder companies also search from exterior access points. Stairwell PPV and the floor above are real tasks too; conditions decide which comes first."
   },
   {
    "label": "Ladder placement",
    "unit": "L1",
    "cat": "unit",
    "q": "Where does the ladder go?",
    "opts": [
     "Front — balcony side, aerial set for rescue and access",
     "Rear — courtyard side, away from the parking lot and balconies",
     "Roof position — up top to cut a vent hole first",
     "Staging — park it until command assigns it"
    ],
    "best": 0,
    "mp": "M.P. 202.20: to make exterior rescues possible, \"apparatus placement becomes a critical consideration\" — make aerial positions a priority, leave room for multiple ladders, and use them for access or an aerial standpipe if the interior attack is delayed."
   },
   {
    "label": "Assign E3",
    "unit": "E3",
    "q": "Where do you send E3, and what task?",
    "opts": [
     {
      "t": "Floor above — rescue profile and fire extension.",
      "c": [
       "All Clear",
       "Fire Control"
      ]
     },
     {
      "t": "Exposure lines on the units next to the fire.",
      "c": [
       "Loss Stopped"
      ]
     },
     {
      "t": "Water supply — second hydrant to the FDC.",
      "c": []
     },
     {
      "t": "Hold in staging as the tactical reserve.",
      "c": []
     }
    ],
    "mp": "Deck 3 & 1 / M.P. 201.06 says hold a tactical reserve and call for more before you commit it. M.P. 202.20 says the floor above needs companies for rescue and extension. Both are true — the fix is striking more alarms early, not choosing between them."
   },
   {
    "label": "Assign R3",
    "unit": "R3",
    "q": "Where do you send R3, and what task?",
    "opts": [
     {
      "t": "RIT / rescue standby outside the fire building.",
      "c": []
     },
     {
      "t": "Primary search alongside E1’s search pair.",
      "c": [
       "All Clear"
      ]
     },
     {
      "t": "Medical / rehab sector, ready to treat and transport.",
      "c": []
     },
     {
      "t": "Hold in staging as part of the reserve.",
      "c": []
     }
    ],
    "mp": "M.P. 202.01: rescue companies do search, rescue and treatment, and \"should communicate commitment and location to Command and maintain a retrievable status for victim treatment and transportation.\" The MP doesn't fix one assignment — keep them retrievable."
   },
   {
    "label": "Assign BC1",
    "unit": "BC1",
    "q": "Where do you send BC1, and what task?",
    "opts": [
     {
      "t": "Take command through transfer of command; set up the CP.",
      "c": []
     },
     {
      "t": "Run a safety and accountability sector for the crews.",
      "c": []
     },
     {
      "t": "Division supervisor working on the fire floor.",
      "c": []
     },
     {
      "t": "Run staging and request the additional resources.",
      "c": []
     }
    ],
    "best": 0,
    "mp": "M.P. 201.01: \"The first arriving Command Officer should assume Command\" through the Transfer of Command procedure and becomes IC #2 at a stationary command post outside the hazard zone. Fast-attack mobile command \"should not last more than a few minutes.\""
   },
   {
    "label": "Sector officer",
    "q": "BC1 makes you the fire-floor sector officer. Where do you run the sector from?",
    "opts": [
     "Outside the smoke — stairwell or safe refuge, managing crews by radio.",
     "Inside the smoke with the attack crew, so you can see the fire yourself.",
     "On the floor above, in the smoke, to watch for extension firsthand.",
     "Wherever the hose goes — follow the line in and manage from the nozzle."
    ],
    "best": 0,
    "mp": "M.P. 202.20: \"Sector management must be done from a position outside of the smoke and fire conditions\" — an officer in the smoke can't run the work and the radio while managing their own air. Keep 3-deep resources (working, on-deck, recycling) and run accountability by radio when needed."
   },
   {
    "label": "Stretch check (hose)",
    "q": "What line do you bring, and how do you decide?",
    "opts": [
     "2-inch off the standpipe, sized by walking it: stairwell to the fire unit — reach, work, turn.",
     "1¾-inch off the standpipe with an automatic nozzle — the very same pack you’d pull on a house fire.",
     "2½-inch off the engine, stretched up the stairwell from the parking lot.",
     "Biggest line on the rig — length doesn’t matter as long as the flow is big."
    ],
    "best": 0,
    "mp": "M.P. 202.11: 2-inch lines work at the lower pressures standpipes deliver and flow 250+. M.P. 202.20: outlets can be up to 200 feet apart, so measure the stretch from the outlet to the fire unit — and if it runs past 150 feet, stop and reassess the risk."
   },
   {
    "label": "Long stretch",
    "q": "The nearest standpipe outlet is more than 150 feet from the fire unit down a long hallway. Now what?",
    "opts": [
     "Stop and reassess — weigh the stretch and your air against the risk plan before you commit.",
     "Go anyway — the 150-foot rule only applies to houses and commercial buildings.",
     "Add hose until you reach it; distance stops mattering once you’re on a standpipe.",
     "Leave the line and search toward the unit with a water can, then call for water."
    ],
    "best": 0,
    "mp": "M.P. 202.20: when the layout requires hose stretches over 150 feet, \"a clear assessment of the required action and the position in the risk management plan is critical.\" M.P. 202.04: in a mid-rise the 150 feet is measured from the area of safe refuge (the stairwell) to the end of the hoseline."
   },
   {
    "label": "Air management",
    "q": "Your crew is working the fire floor off a long stretch. When do you plan your exit?",
    "opts": [
     "Before the low-air alarm — back to the stairwell refuge or out in time.",
     "When the low-air alarm goes off — that’s exactly what the alarm is for.",
     "When the fire is out, whatever the gauge says, so everyone leaves together.",
     "When the Captain calls it — firefighters don’t need to track their own air."
    ],
    "best": 0,
    "mp": "M.P. 202.20: \"Plan for an exit of the contaminated hazard zone prior to low air alarm sounding,\" check air at standard triggers, and change bottles in an area of safe refuge. \"Firefighters running out of air in contaminated atmosphere is not an option.\""
   },
   {
    "label": "What’s happening inside? (update)",
    "cat": "sizeup",
    "q": "What’s happening inside? Update your read:",
    "opts": [
     "Interior report: fire contained to the unit of origin",
     "Fire extending — wood frame involvement suspected",
     "Smoke clearing, no extension seen",
     "Still unknown from outside"
    ]
   },
   {
    "label": "Victim status (update)",
    "cat": "sizeup",
    "q": "Are people hurt? Update:",
    "opts": [
     "Still unknown",
     "Occupants out, no injuries",
     "Victims found — rescue underway",
     "Injuries confirmed — medical requested"
    ]
   },
   {
    "label": "MP reference",
    "q": "M.P. 202.20 Mid Rise Operations — the lines that matter here: \"Nothing showing means nothing.\" Locate the fire early. Do not assume a fire control room, an alarm panel at your entrance, a fire pump, or a standpipe in every stairwell. Standpipe connections can be up to 200 feet apart and FDC caps may be KNOX-locked. City pressure in a wet standpipe may not be enough above ground level. Identify attack and evacuation stairwells from each floor. Resource the fire floor, the floor above, and the exposures. A large-area targeted search is not a primary search. Wood frame upper floors over masonry lower floors — fire in structural members can force writing off part or all of the building. Hose stretches can run over 150 feet; you still never go past your ability to get back to safe refuge before low air. Sector officers work outside the smoke.",
    "opts": [
     "Understood — show my debrief"
    ]
   },
   {
    "label": "Reposition",
    "q": "Conditions have changed. Where do you go now? Tap a number on the picture or pick from the list.",
    "hotspots": true
   }
  ]
 },
 {
  "id": "highrise",
  "title": "High-Rise — Tower Fire",
  "sub": "M.P. 202.11 High-Rise Plans · Commercial · First-arriving size-up",
  "dispatch": "High-rise fire. Fire showing from upper floors of a downtown high-rise, Van Buren. Units: E1, L1, E2, E3, R3, BC1. Multiple callers, building occupied.",
  "arrival": "You arrive first on E1: a downtown high-rise, flame blowing out of three windows on an upper floor, heavy black smoke above. Palm trees and traffic at street level. The lobby is at the base of the tower.",
  "image": "assets/scenarios/highrise-arrival.jpg",
  "imageAlt": "Arrival view: tall downtown high-rise tower, flame from three upper-floor windows, heavy black smoke above, street level with palm trees at the base.",
  "hotspots": [
   {
    "kind": "move",
    "x": 48,
    "y": 84,
    "label": "Lobby",
    "note": "Fire Control Room — meet the building engineer, check the alarm panel"
   },
   {
    "kind": "move",
    "x": 28,
    "y": 90,
    "label": "FDC",
    "note": "Connect to the standpipe system"
   },
   {
    "kind": "move",
    "x": 62,
    "y": 90,
    "label": "Staging",
    "note": "Lobby staging for arriving companies"
   },
   {
    "kind": "spray",
    "x": 50,
    "y": 40,
    "w": 16,
    "h": 10,
    "label": "Fire floor windows",
    "note": "Exterior water will not reach — this is a standpipe fire",
    "c": [
     "Fire Control"
    ]
   },
   {
    "kind": "move",
    "x": 78,
    "y": 80,
    "label": "Aerial",
    "note": "Spot for rescue or defensive firefight"
   }
  ],
  "steps": [
   {
    "label": "Approach",
    "q": "You pull up. Where do you go first? Tap a number on the picture or pick from the list.",
    "hotspots": true,
    "best": 0,
    "mp": "M.P. 202.11: the first-arriving company assumes Command, enters the building, locates the Fire Control Room or alarm panel, and meets the building engineer. Exterior water will not reach an upper floor — this is a standpipe fire."
   },
   {
    "label": "Fireground factors",
    "q": "Size it up. What are the fireground factors here?",
    "opts": [
     "Building: high-rise, 6+ elevator stops, well sealed, big internal capacity for smoke. Fire: upper floor, flame from three windows, heavy black smoke. Occupancy: commercial, occupied, daytime.",
     "Building: high-rise, 6+ elevator stops, standpipes in every stair. Fire: upper floor, flame from three windows, heavy smoke. Occupancy: commercial, but callers say the floors are already evacuated.",
     "Building: mid-rise under 75 feet, so the high-rise plan does not apply. Fire: upper floor, flame from three windows, heavy black smoke. Occupancy: commercial, occupied, daytime.",
     "Building: high-rise, 6+ elevator stops, well sealed. Fire: three windows only, so a single-room fire that will stay small. Occupancy: commercial, occupied, daytime."
    ],
    "best": 0,
    "mp": "M.P. 202.11: a high-rise is 6 elevator stops or more, or 75 feet or more. From outside they \"often hide fire and smoke due to building being well sealed and large internal capacity for smoke,\" and size-up must decide residential or commercial."
   },
   {
    "label": "Risk profile",
    "q": "What is your risk profile on this fire?",
    "opts": [
     "Risk a lot — an occupied high-rise with savable lives, and a fire floor you can reach by stairwell.",
     "Risk a little — no confirmed victims yet, so treat it as a property fire until the floors report in to you.",
     "Risk nothing — defensive from the start; the fire is too high up for a safe interior attack.",
     "Risk a lot — a high-value tower like this is worth an aggressive push all on its own."
    ],
    "best": 0,
    "mp": "M.P. 202.11 risk assessment starts with \"Is the building occupied?\" Multiple callers in an occupied daytime tower means savable lives, and M.P. 202.02B: \"We will risk our lives a lot, in a calculated manner, to save SAVABLE lives.\""
   },
   {
    "label": "Strategy",
    "q": "What strategy do you declare?",
    "opts": [
     "Offensive — standpipe attack on the fire floor",
     "Defensive — protect the floors above from outside",
     "Marginal — offensive now, defensive if it worsens",
     "No declaration yet — let BC1 make that call"
    ],
    "best": 0,
    "mp": "M.P. 202.02B: fireground operations \"fall in one of two strategies, Offensive or Defensive,\" declared by the IC — in the on-scene report (M.P. 201.01). Savable lives and a fire floor reachable by standpipe = offensive. \"Marginal\" in M.P. 202.02B means defensive conditions with a known rescue — not \"offensive until it gets bad.\""
   },
   {
    "label": "Incident action plan",
    "q": "What is your IAP?",
    "opts": [
     "Rescue and fire attack — secure the stairwells, search, standpipe attack",
     "Fire attack only — hold all search until the fire floor has been knocked down",
     "Search, fire attack, and exposure lines on the neighboring buildings",
     "Defensive aerial streams into the fire floor first, then interior attack"
    ],
    "best": 0,
    "mp": "M.P. 202.11 tactical objectives: Rescue (\"secure and maintain viable evacuation and fire attack stairwells,\" remove threatened occupants), Fire attack via the standpipe system, then Property conservation. The deck's offensive IAP: controlled aggressive search and fire attack."
   },
   {
    "label": "Tactical priorities",
    "q": "In what order do you work the tactical priorities?",
    "opts": [
     "All Clear (primary search) → Fire Control → Loss Stopped",
     "Fire Control → All Clear (primary search) → Loss Stopped",
     "Loss Stopped → Fire Control → All Clear (primary search)",
     "All Clear (primary search) → Loss Stopped → then Fire Control"
    ],
    "best": 0,
    "mp": "M.P. 202.02A: Rescue, Fire Control, Property Conservation — announced as \"All clear,\" \"Under control,\" \"Loss stopped.\" They often run at the same time, but that is the order of priority."
   },
   {
    "label": "On-scene report",
    "q": "Give your on-scene report — which version do you send?",
    "opts": [
     "E1 on scene: large high-rise office tower, fire showing from three windows on an upper floor, heavy black smoke. E1 assuming command, going to the Fire Control Room. Offensive strategy. E1 will be Van Buren Command.",
     "E1 on scene: large high-rise office tower, fire showing from three windows on an upper floor, heavy black smoke. E1 is heading up the attack stairwell with high-rise packs to find the fire floor. This is an offensive fire.",
     "E1 on scene: large high-rise office tower, fire showing from three windows on an upper floor, heavy black smoke. E1 assuming command in the Fire Control Room. E1 will be Van Buren Command.",
     "E1 on scene with a working fire in a high-rise. Give me a 3rd alarm. E1 is going up to the fire floor for search and fire attack. Offensive strategy. E1 will be Van Buren Command."
    ],
    "best": 0,
    "mp": "M.P. 201.01 on-scene report: unit on scene, building (occupancy, size, height), conditions, action taken, strategy, and command confirmation with a name. Resource requests go in the follow-up. On a high-rise the IC works from the Fire Control Room — \"ascending the stairwell is not a good location for the I.C.\" (M.P. 202.11)."
   },
   {
    "label": "Initial 3 & 1",
    "q": "How do you run the initial 3 & 1?",
    "opts": [
     "First 3 companies to IAP tasks, 1 held as tactical reserve; call for more before you assign it.",
     "All 4 companies straight to IAP tasks; the next alarm that shows up becomes your tactical reserve.",
     "First 2 companies to IAP tasks, 2 held back until the crews inside can tell you what they found.",
     "Send the reserve to the hardest task first, then call for more resources once it is committed."
    ],
    "best": 0,
    "mp": "M.P. 201.06: \"Command must provide for a tactical reserve of fire companies\" — enough to manage the incident and to handle a firefighter rescue. Call for more resources early (\"if you begin to debate whether to call another alarm, call for it\"), and before the reserve is committed. On a high-rise, on-deck companies provide the RIC capability (M.P. 202.11)."
   },
   {
    "label": "Command position",
    "cat": "sizeup",
    "q": "You are the initial IC. Where do you run the incident from?",
    "opts": [
     "Near the Fire Control Room — close to building systems and the engineer, with radio reach to incoming units.",
     "Up the attack stairwell with the stair team, so you can see the conditions and report them to everyone yourself.",
     "In the cab of E1 out front, where the radio works best and you can keep eyes on the fire floor windows.",
     "On the on-deck floor with the attack team, so you personally control the entry onto the fire floor."
    ],
    "best": 0,
    "mp": "M.P. 202.11: \"The initial I.C. must be able to clearly communicate with incoming companies. A position close to the fire control room is preferred. Ascending the stairwell is not a good location for the I.C. due to communication limitations.\""
   },
   {
    "label": "On-deck",
    "cat": "sizeup",
    "q": "Where do you stage the attack?",
    "opts": [
     "Minimum 2 floors below the fire floor, in a clean environment; the floor below the fire is for laying out lines.",
     "One floor below the fire floor: the closest clean floor, the shortest stretch, and the fastest water on the fire.",
     "In the lobby with Command and the passports, then straight up to the fire floor once the team is ordered up.",
     "On the fire floor at the stairwell door, so the attack team is in position the moment water arrives."
    ],
    "best": 0,
    "mp": "M.P. 202.11: Fire Floor Sector sets on-deck \"in a 'clean' environment (minimum 2 floors below actual fire floor to allow the floor directly below the fire to be used to lay out attack lines).\" All fire floor operations start from on-deck."
   },
   {
    "label": "Lines",
    "cat": "sizeup",
    "q": "Where do the lines connect?",
    "opts": [
     "Attack line at the closest standpipe below the fire floor; backup and stairwell protection lines one floor below that.",
     "Attack line from the fire floor standpipe outlet; backup and stairwell protection lines from the floor just below it.",
     "All three lines off the lobby standpipe connection, so pressures and hose are managed from one place.",
     "Attack and backup lines both at the closest standpipe below the fire floor; skip the stairwell protection line."
    ],
    "best": 0,
    "mp": "M.P. 202.11: \"The initial attack line connection should be at the closest standpipe below the fire floor. The back up line and stairwell protection line should both be connected the floor below the initial line attachment.\" The backup needs an extra 50–75 feet to reach as far."
   },
   {
    "label": "Elevators",
    "cat": "sizeup",
    "q": "What about the elevators?",
    "opts": [
     "Never for rescue in smoke or fire. Usually not used if the fire is on floor 10 or below. Phase II, prepped, dedicated operator.",
     "Take the freight elevator straight to the fire floor — it is the larger car, serves every floor, and saves crews the long climb.",
     "Use them to rescue occupants from the floors above the fire; firefighters climb the stairs with all the gear.",
     "Use any car that still runs, but get off one floor below the fire so you never open the doors onto the fire."
    ],
    "best": 0,
    "mp": "M.P. 202.11: \"Elevators will not be used as a means of rescue in smoke or fire conditions.\" Typically not used if the fire floor is 10 or less; a car that is used must be Phase II capable and prepped (roof hatch open, tools, ladder) with a dedicated firefighter operator."
   },
   {
    "label": "Elevator recall",
    "cat": "sizeup",
    "q": "In the lobby, every elevator car is sitting on the ground floor with its doors open. What does that tell you?",
    "opts": [
     "Assume smoke or fire in the hoistway or machine room — do not use the elevators.",
     "Recall worked as designed — key one into Phase II and take it up toward the fire.",
     "The building engineer parked them for you, so they are safe for the attack team.",
     "Nothing yet — check the alarm panel, and if there is no hoistway alarm, use them."
    ],
    "best": 0,
    "mp": "M.P. 202.11, Lobby: \"If all elevators are down on the ground floor with doors open on arrival, it is assumed there is smoke or fire in the elevator mechanical room or the elevator hoistway and the elevators should not be used.\""
   },
   {
    "label": "Air",
    "cat": "sizeup",
    "q": "Air management going up?",
    "opts": [
     "A spare bottle per member, a collective air check every 5 floors on the stairs, and an air cart to on-deck.",
     "One spare bottle per crew, and a quick air check once the crew reaches the on-deck floor before entry.",
     "Each member checks their own air at the fire floor door, right before the attack team makes entry.",
     "Spare bottles stay in the lobby; crews come back down to change bottles where the air is clean."
    ],
    "best": 0,
    "mp": "M.P. 202.11: all crews bring a minimum of 1 spare SCBA bottle — \"1 spare per crewmember initially.\" Climbing, crews \"collectively check their air supply every 5 floors, managed by the captain.\" You cannot just step outside to change a bottle."
   },
   {
    "label": "Stair team",
    "cat": "sizeup",
    "q": "E2 is your stair team in the attack stairwell. What do they carry, and what do they do?",
    "opts": [
     "Air bottles, irons, and a PW can — no hose. Find the fire floor, redirect evacuees, close the roof door, then get out of the stairwell.",
     "A high-rise pack and a standpipe bag, so they can hook up and start knocking down the fire as soon as they find the fire floor.",
     "Air bottles and irons only. Open the roof door to vent the stairwell, then hold at the fire floor door until the attack team gets there.",
     "Air bottles, irons, and a PW can. Search the whole fire floor first, then report the fire location to Command from inside the floor."
    ],
    "best": 0,
    "mp": "M.P. 202.11: the stair team takes \"only air bottles, Irons, and a PW can (No hose lines).\" It identifies the fire floor, redirects evacuees, checks the sprinkler isolation valve is open, controls the roof door, and stages out of the stairway during the attack."
   },
   {
    "label": "What’s happening inside?",
    "cat": "sizeup",
    "q": "What’s happening inside? Your first read:",
    "opts": [
     "Fire on one upper floor, smoke in the stairwell",
     "Smoke throughout the tower",
     "Fire extending to the floor above",
     "Unknown — no interior report yet"
    ],
    "mp": "M.P. 202.11: high-rises \"often hide fire and smoke due to building being well sealed and large internal capacity for smoke.\" Get the alarm panel and the stair team's report before you trust your read."
   },
   {
    "label": "Victim status",
    "cat": "sizeup",
    "q": "Are people hurt? What do you know right now?",
    "opts": [
     "Unknown — no victims reported yet",
     "Occupants seen leaving, no injuries reported",
     "Occupants possibly still inside",
     "Injuries reported — medical needed"
    ]
   },
   {
    "label": "Attack flow",
    "q": "How do you attack it?",
    "opts": [
     "Standpipe attack from on-deck — lines up the attack stairwell, enter the fire floor only when attack, backup, and stairwell protection lines are in place",
     "Exterior only — put the aerial stream into the fire floor windows and keep every crew out of the building until it darkens down"
    ],
    "best": 0,
    "mp": "M.P. 202.11: water comes from the standpipe system, and \"all fire floor operations will be initiated from the on-deck floor.\" Exterior streams will not reach an upper floor of a high-rise."
   },
   {
    "label": "Go interior",
    "showIf": {
     "label": "Attack flow",
     "match": "Standpipe"
    },
    "q": "You go interior — then what?",
    "opts": [
     "Advance the attack line from on-deck onto the fire floor once all three lines are in place",
     "Search the fire floor ahead of the attack line while the hose crews are still making their hookups",
     "Go to the floor above first and check for extension before the fire floor gets attacked",
     "Open the ceilings on the fire floor and check the void spaces before flowing any water"
    ],
    "best": 0,
    "mp": "M.P. 202.11: entry onto the fire floor waits until attack, backup and stairwell protection lines are in place, the roof door is closed and the stair team is out of the stairwell. As the team enters, Command announces \"all units hold all non-emergency radio traffic.\""
   },
   {
    "label": "Flow",
    "q": "M.P. 202.11: what lines go on the fire floor?",
    "opts": [
     "2-inch attack line (250+ GPM) plus 2½-inch backup and stairwell protection — two lines on the floor meet NFPA 1710's 500 GPM.",
     "1¾-inch auto nozzle at 150 GPM — light enough to carry up the stairs, and one line can hold a single office floor.",
     "One 2½-inch attack line with a smooth bore — a single big line is enough, so skip the backup and stair lines.",
     "Two 1¾-inch lines at 150 GPM each from the floor below — speed matters more than flow on a standpipe job."
    ],
    "best": 0,
    "mp": "M.P. 202.11: the initial line can be 1¾, 2 or 2½-inch, but \"1¾ hose lines with automatic nozzles provide 150 gpm at best\"; 2-inch works at standpipe pressures for 250+ GPM. Backup and stairwell protection are 2½-inch smooth bores, and two lines on the fire floor meet NFPA 1710's 500 GPM."
   },
   {
    "label": "Alarm",
    "q": "How big is this assignment?",
    "opts": [
     "Consider a minimum 3rd alarm for a working high-rise fire, and keep at least a 1st alarm of companies in the lobby.",
     "Hold at the 1st alarm until the stair team confirms the fire floor, then add companies as you need them.",
     "A 2nd alarm, with every company staging outside the building until it is given a specific assignment.",
     "Strike a 3rd alarm, then send every company that reaches the lobby straight up to the fire floor the moment it arrives."
    ],
    "best": 0,
    "mp": "M.P. 202.11: \"Consider a minimum 3rd alarm assignment in working high-rise fires.\" After a working fire is declared, 1st and 2nd alarm companies go directly to Lobby Sector, and Lobby keeps \"a minimum of a 1st alarm of companies in lobby at all times.\""
   },
   {
    "label": "Crew of 4",
    "kind": "crew",
    "q": "Deploy your 4-person engine crew — who does what?",
    "opts": [
     {
      "t": "Captain stays the IC near the Fire Control Room; the other 3 run Building Systems Sector with the building engineer.",
      "c": []
     },
     {
      "t": "All 4 up the stairs to the fire floor with high-rise packs — knock the fire down first, sort out command later.",
      "c": [
       "Fire Control"
      ]
     },
     {
      "t": "Captain takes command from the street; the 3 firefighters head up the stairs to search all the floors above the fire.",
      "c": [
       "All Clear"
      ]
     },
     {
      "t": "2 firefighters take the attack line from on-deck while the other 2 set up the stairwell protection line.",
      "c": [
       "Fire Control"
      ]
     }
    ],
    "best": 0,
    "mp": "M.P. 202.11: the first company establishes Command and goes to the Fire Control Room — \"Captain remains the initial I.C. Remainder of company manages Systems Sector duties in the Fire Control room.\" The FDC belongs to the next engine."
   },
   {
    "label": "Assign E2",
    "unit": "E2",
    "q": "Where do you send E2, and what task?",
    "opts": [
     {
      "t": "Connect to the FDC, then take the attack stairwell as the stair team.",
      "c": []
     },
     {
      "t": "Attack Team leader — announce on-deck and make the hose hookups.",
      "c": [
       "Fire Control"
      ]
     },
     {
      "t": "Lobby Sector — passports, freight elevator check, lobby staging.",
      "c": []
     },
     {
      "t": "Hold as tactical reserve in the lobby until the stair team finds the fire floor.",
      "c": []
     }
    ],
    "best": 0,
    "mp": "M.P. 202.11: the next engine connects to the FDC (engineer stays with the pumper), meets the IC at the Fire Control Room, and is assigned the attack stairwell as Stair Team. Attack Team leader is the 3rd company; Lobby comes from the 7th."
   },
   {
    "label": "2nd engine placement",
    "unit": "E2",
    "cat": "unit",
    "q": "Where does the 2nd engine go?",
    "opts": [
     "As close to the FDC as possible, with a water supply",
     "Rear of the building, to cover the second stairwell",
     "At the hydrant, set up as a key pumper for the ladder",
     "In staging a block out, until it gets an assignment"
    ],
    "best": 0,
    "mp": "M.P. 202.11: the second engine will \"secure a water supply and spot apparatus as close to FDC as possible,\" then establish the water connection to the building standpipe system."
   },
   {
    "label": "Assign L1",
    "unit": "L1",
    "q": "Where do you send L1, and what task?",
    "opts": [
     {
      "t": "Spot the aerial for rescue or defensive use; crew brings 2½ high-rise packs to the Fire Control Room.",
      "c": [
       "Fire Control"
      ]
     },
     {
      "t": "Raise the aerial to the fire floor windows and take the occupants off the balconies — the fastest rescue.",
      "c": [
       "All Clear"
      ]
     },
     {
      "t": "Ventilation — send the crew up the attack stairwell to the roof to open the roof door and vent it.",
      "c": [
       "Fire Control"
      ]
     },
     {
      "t": "Hold as tactical reserve with the aerial set up until the stair team has found the fire floor.",
      "c": []
     }
    ],
    "best": 0,
    "mp": "M.P. 202.11: the first ladder spots \"to utilize aerial device for rescue, water supply, or defensive firefight if necessary,\" brings 2½ high-rise packs with smooth bores, and the captain and crew report to the Fire Control Room for assignment. The roof door stays closed for the attack."
   },
   {
    "label": "Ladder placement",
    "unit": "L1",
    "cat": "unit",
    "q": "Where does the ladder go?",
    "opts": [
     "Front — aerial position for rescue or defensive use",
     "Rear — courtyard side, away from all the falling glass",
     "Beside the FDC so it can help supply the standpipe",
     "Staging, out of the way until it gets an assignment"
    ],
    "best": 0,
    "mp": "M.P. 202.11: spot the ladder where the aerial can be used for rescue, water supply or a defensive firefight — and estimate the potential for falling debris, guiding companies around it."
   },
   {
    "label": "Assign E3",
    "unit": "E3",
    "q": "Where do you send E3, and what task?",
    "opts": [
     {
      "t": "Attack Team leader — bring air, irons, standpipe bag and high-rise packs.",
      "c": [
       "Fire Control"
      ]
     },
     {
      "t": "Evacuation Stair Team — help occupants down the evacuation stairwell.",
      "c": [
       "All Clear"
      ]
     },
     {
      "t": "Lobby Sector — passports, freight elevator check, and lobby staging.",
      "c": []
     },
     {
      "t": "Hold as tactical reserve on the street until the stair team confirms the fire floor.",
      "c": []
     }
    ],
    "best": 0,
    "mp": "M.P. 202.11: the 3rd company is Attack Team leader — brings air bottles, irons, standpipe bag and high-rise packs, announces on-deck (two floors below), assumes the floor-number sector, and makes the hose hookups. Lobby and Evacuation Stair Team come from the 7th company on."
   },
   {
    "label": "Assign R3",
    "unit": "R3",
    "q": "Where do you send R3, and what task?",
    "opts": [
     {
      "t": "RIC — stage on-deck, two floors below the fire.",
      "c": []
     },
     {
      "t": "Primary search of the fire floor with E1's crew.",
      "c": [
       "All Clear"
      ]
     },
     {
      "t": "Fire Floor Treatment — at or below the on-deck floor.",
      "c": []
     },
     {
      "t": "Hold in the lobby as the tactical reserve.",
      "c": []
     }
    ],
    "mp": "M.P. 202.11: on-deck companies provide RIC capability (the fire floor BC/FIT brings the RIC bag), and Treatment sets up at or directly below on-deck for injured firefighters. M.P. 202.01: Rescues keep a retrievable status for treatment and transport — and a Rescue should not take command (M.P. 202.11)."
   },
   {
    "label": "Assign BC1",
    "unit": "BC1",
    "q": "Where do you send BC1, and what task?",
    "opts": [
     {
      "t": "Fire Floor Sector — run it from the on-deck floor.",
      "c": []
     },
     {
      "t": "Assume command — the E1 captain joins his crew inside.",
      "c": []
     },
     {
      "t": "Safety and accountability officer in the lobby.",
      "c": []
     },
     {
      "t": "Staging officer for the incoming 2nd and 3rd alarms.",
      "c": []
     }
    ],
    "best": 0,
    "mp": "M.P. 202.11: \"The BC/FIT will assume the fire floor sector from the on-deck floor,\" and \"Phoenix BC1 should be considered to manage the Fire Floor Sector when possible.\" The BC brings the high-rise radio and the RIC bag to on-deck."
   },
   {
    "label": "Stretch check (hose)",
    "q": "What line do you bring, and how do you decide?",
    "opts": [
     "2-inch off the standpipe for 250+ GPM at standpipe pressures, and add 50–75 feet to the backup line so it reaches as far.",
     "1¾-inch with an auto nozzle — 150 GPM, light to carry up the stairs, and the same length as a house fire stretch.",
     "2½-inch for every line, all cut to the same length, since all three lines start from the same standpipe outlet.",
     "Whatever is lightest to carry up — the standpipe makes up the flow, so line size and length barely matter."
    ],
    "best": 0,
    "mp": "M.P. 202.11: 2-inch lines \"operate effectively at lower psi's typically seen in standpipe operations and provide greater gpm of 250+.\" The backup and stairwell lines hook up a floor lower, so the backup needs an extra 50–75 feet."
   },
   {
    "label": "What’s happening inside? (update)",
    "cat": "sizeup",
    "q": "What’s happening inside? Update your read:",
    "opts": [
     "Interior report: fire contained to the floor of origin",
     "Fire extending — floor above involved",
     "Smoke banking down the stairwell — reverse stack effect",
     "Still unknown from outside"
    ],
    "mp": "M.P. 202.11, Hazard Sector: smoke and CO may bank down in the stairwell from the \"reverse stack effect\" when the interior is cooler than outside — common in Phoenix. Monitor CO and O2 at on-deck."
   },
   {
    "label": "Victim status (update)",
    "cat": "sizeup",
    "q": "Are people hurt? Update:",
    "opts": [
     "Still unknown",
     "Occupants out, no injuries",
     "Victims found — rescue underway",
     "Injuries confirmed — medical requested"
    ]
   },
   {
    "label": "MP reference",
    "q": "M.P. 202.11 High-Rise Plans — the lines that matter here: a high-rise is 6 elevator stops or more, or 75 feet or more. The first company takes command and goes to the Fire Control Room; the IC stays there, not in the stairwell. On-deck is a minimum of 2 floors below the fire floor, not 1. Never enter the fire floor until attack, backup, and stairwell protection lines are in place, the roof door is closed, and the stair team is out of the stairwell. Never use elevators for rescue in smoke or fire. Every crew brings a spare bottle per member, air checked every 5 floors. For a working high-rise fire, consider a minimum 3rd alarm, and keep a minimum 1st alarm of companies in the lobby.",
    "opts": [
     "Understood — show my debrief"
    ]
   },
   {
    "label": "Reposition",
    "q": "Conditions have changed. Where do you go now? Tap a number on the picture or pick from the list.",
    "hotspots": true,
    "mp": "No single right answer here. M.P. 202.11 keeps the IC near the Fire Control Room, arriving companies flowing through Lobby Sector, and all fire floor work starting from on-deck."
   }
  ]
 },
 {
  "id": "stripmall",
  "title": "Strip Mall — Large-Space Fire",
  "sub": "M.P. 202.04A Large-Space Cold Smoke Fires · Commercial · First-arriving size-up",
  "dispatch": "Commercial fire. Strip mall, light smoke showing from the laundromat and the thrift store. Sprinkler bell ringing. Units: E1, L1, E2, E3, R3, BC1. Occupancy unknown, stores may be open.",
  "arrival": "You arrive first on E1: a strip mall — thrift store, sweets shop, coin laundry. Not much smoke showing, just a thin column over the laundry and haze at the storefronts. The sprinkler bell is ringing. The building is big and mostly one open space inside.",
  "image": "assets/scenarios/stripmall-arrival.jpg",
  "imageAlt": "Arrival view: strip mall with thrift store, sweets shop, and coin laundry, light smoke over the laundry, cars parked in front.",
  "hotspots": [
   {
    "kind": "move",
    "x": 15,
    "y": 60,
    "label": "Thrift store",
    "note": "Front entrance — check for occupants"
   },
   {
    "kind": "move",
    "x": 82,
    "y": 58,
    "label": "Laundry",
    "note": "Smoke is showing here — coin laundry"
   },
   {
    "kind": "move",
    "x": 50,
    "y": 75,
    "label": "Rear",
    "note": "Walk the 360 — check the back"
   },
   {
    "kind": "spray",
    "x": 88,
    "y": 55,
    "w": 12,
    "h": 12,
    "label": "Laundromat storefront",
    "note": "Water through the storefront — transitional",
    "c": [
     "Fire Control"
    ]
   },
   {
    "kind": "move",
    "x": 60,
    "y": 85,
    "label": "Staging",
    "note": "Parking lot — room for apparatus"
   }
  ],
  "steps": [
   {
    "label": "Approach",
    "q": "You pull up. Where do you go first? Tap a number on the picture or pick from the list.",
    "hotspots": true,
    "best": 2,
    "mp": "M.P. 202.04A: \"Early assessment of the seven sides of the structure is a high priority.\" Find the smoke, flame, water runoff, the FDC and the red bell before anyone commits inside."
   },
   {
    "label": "Fireground factors",
    "q": "Size it up. What are the fireground factors here?",
    "opts": [
     "Building: large-space commercial, open interior, truss roof, sprinklered. Fire: location unknown, light cold smoke from the laundry and thrift store, bell ringing. Occupancy: retail, stores may be open.",
     "Building: large-space commercial, open interior, truss roof, sprinklered. Fire: a small dryer fire in the coin laundry, light smoke, and the sprinklers already have it. Occupancy: retail, stores may be open.",
     "Building: separate small shops behind fire walls, concrete roof deck. Fire: laundry, light smoke, bell ringing. Occupancy: retail, stores may be open, occupants unknown.",
     "Building: large-space commercial, open interior, truss roof, sprinklered. Fire: location unknown, light smoke. Occupancy: closed for the night, so no life hazard to weigh."
    ],
    "best": 0,
    "mp": "M.P. 202.04A: large-space buildings are big non-compartmentalized spaces — shopping centers included — usually over truss roofs. \"A small amount of smoke from one or more locations can mean a significant fire,\" and a ringing bell means water is very likely flowing."
   },
   {
    "label": "Risk profile",
    "q": "What is your risk profile on this fire?",
    "opts": [
     "Risk a lot — stores may be open, so push deep and search the whole open space for occupants.",
     "Risk a little — sprinklered, no report of anyone trapped: property focus, controlled advance.",
     "Risk nothing — defensive from the start; the building is too big to send anyone inside.",
     "Risk a lot — high-value retail stock is worth an aggressive push regardless of the smoke."
    ],
    "best": 1,
    "mp": "M.P. 202.04A: civilian deaths in sprinklered buildings are \"extremely rare.\" \"In the absence of a report of people trapped, we can anticipate our actions being focused on property protection and our application of risk management must align as such.\" Risk a little, in a calculated manner."
   },
   {
    "label": "Strategy",
    "q": "What strategy do you declare?",
    "opts": [
     "Offensive — find the fire and put it out",
     "Defensive — master streams from the lot",
     "Marginal — go in, and back out if it changes",
     "Hold off — let BC1 declare the strategy"
    ],
    "best": 0,
    "mp": "M.P. 202.02B: risking a little to save savable property is still an offensive strategy, and the IC declares it. M.P. 202.04A: anticipate defensive operations if the sprinklers fail to control the fire — nothing here says they have. \"Marginal\" in M.P. 202.02B means defensive conditions with a known rescue — not \"offensive until it gets bad.\""
   },
   {
    "label": "Incident action plan",
    "q": "What is your IAP?",
    "opts": [
     "Locate the fire and attack it — stay on the line, TIC, 150 feet",
     "Primary search of the whole open space first, then fire attack",
     "Search, fire attack, and exposure lines into the neighboring units",
     "Exposure protection first, then master streams on the laundry"
    ],
    "best": 0,
    "mp": "M.P. 202.04 commercial: search in large open areas with worsening smoke is \"ineffective and dangerous,\" and \"all resources should be directed to fire attack operations from the onset unless a known rescue is present.\" Putting the fire out is the best thing for anyone inside."
   },
   {
    "label": "Tactical priorities",
    "q": "In what order do you work the tactical priorities?",
    "opts": [
     "All Clear (primary search) → Fire Control → Loss Stopped",
     "Fire Control → All Clear (primary search) → Loss Stopped",
     "Loss Stopped → Fire Control → All Clear (primary search)",
     "All Clear (primary search) → Loss Stopped → then Fire Control"
    ],
    "best": 0,
    "mp": "M.P. 202.02A: Rescue, Fire Control, Property Conservation (All clear, Under control, Loss stopped). The objectives run together — in a big commercial space, the fire attack is how you protect anyone inside (M.P. 202.04)."
   },
   {
    "label": "On-scene report",
    "q": "Give your on-scene report — which version do you send?",
    "opts": [
     "E1 on scene: large one-story strip mall, light smoke from the laundromat and thrift store, bell ringing. E1 assuming command, investigating with a line. Offensive strategy. E1 will be Strip Mall Command.",
     "E1 on scene: large one-story strip mall, light smoke from the laundromat and thrift store, sprinkler bell ringing. E1 is assuming command and investigating with a line inside. E1 will be Strip Mall Command.",
     "E1 on scene: strip mall, nothing showing, sprinklers are handling it. E1 investigating. Offensive strategy. Give me the balance of a 1st alarm. E1 will be Strip Mall Command.",
     "E1 on scene: large one-story strip mall, light smoke from the laundromat and thrift store, sprinkler bell ringing. E1 is taking a line in to find the fire. This is an offensive fire."
    ],
    "best": 0,
    "mp": "M.P. 201.01 on-scene report: unit on scene, building (occupancy, size, height), conditions (smoke showing — amount and location), action taken, strategy, and command confirmation with a name. Calling cold smoke \"nothing showing\" undersells it, and resource requests belong in the follow-up."
   },
   {
    "label": "Initial 3 & 1",
    "q": "How do you run the initial 3 & 1?",
    "opts": [
     "First 3 companies to IAP tasks, 1 held as tactical reserve; call for more before you assign it.",
     "All 4 companies straight to IAP tasks; the next alarm that shows up becomes your tactical reserve.",
     "First 2 companies to IAP tasks, 2 held back until the crews inside can tell you what they found.",
     "Send the reserve to the hardest task first, then call for more resources once it is committed."
    ],
    "best": 0,
    "mp": "M.P. 201.06: \"Command must provide for a tactical reserve of fire companies\" — enough to manage the incident and to handle a firefighter rescue. Call for more resources early (\"if you begin to debate whether to call another alarm, call for it\"), and before the reserve is committed. \"Evidence of significant fire, but companies are unable to determine location and extent\" is one of the listed reasons to call more."
   },
   {
    "label": "Cold smoke",
    "cat": "sizeup",
    "q": "There is only a little calm smoke. What does M.P. 202.04A say?",
    "opts": [
     "\"A small amount of smoke from one or more locations can mean a significant fire.\" Cold smoke is extremely dangerous.",
     "Calm, lazy smoke means the sprinklers have already knocked the fire down — this is mostly overhaul work from here on.",
     "Little smoke means a little fire — one crew with one line and a quick look inside will handle it.",
     "Cold smoke is just cooled-off smoke — it is safe to walk into on air and no real threat to the crew."
    ],
    "best": 0,
    "mp": "M.P. 202.04A: cold smoke \"has lost its velocity and flows calmly… Cold smoke is extremely dangerous,\" and it can be present with or without sprinkler control. Its presence at size-up is significant."
   },
   {
    "label": "Seven sides",
    "cat": "sizeup",
    "q": "Walking the building, what are you looking for?",
    "opts": [
     "All seven sides: smoke, flame, water runoff, the red bell, horns and strobes, the FDC, and hazmat signs.",
     "Front and back only, for smoke and flame. The bell and the FDC can wait until the fire is found.",
     "Wherever the smoke is thickest — that is the fire, so put the first line in through that storefront right away.",
     "The roof only: get the ladder up and look for smoke from the vents before anyone goes inside."
    ],
    "best": 0,
    "mp": "M.P. 202.04A: \"Early assessment of the seven sides of the structure is a high priority.\" Look for smoke, flames, water runoff, fire protection signs and the FDC, a ringing red bell, horns and strobes, and hazmat signs such as 704 diamonds."
   },
   {
    "label": "150-foot penetration",
    "cat": "sizeup",
    "q": "How far inside do you go looking for the fire?",
    "opts": [
     "150 feet max without added support from Command. Can't find the fire? Pull out and make another plan.",
     "As far as the line reaches — the 200-foot crosslay sets the limit for how deep the crew goes.",
     "Until you find it — keep pushing deeper on the TIC for as long as everyone on the crew still has air left.",
     "300 feet, as long as a backup line is stretched in behind you and RIC is standing by at the door."
    ],
    "best": 0,
    "mp": "M.P. 202.04A: \"Companies must not extend hose lines more than 150 feet into the building.\" M.P. 202.04's 150-foot rule: no company operates beyond its ability to retreat to safe refuge before the low-air alarm."
   },
   {
    "label": "Truss roof",
    "cat": "sizeup",
    "q": "What is over your head in a large open space?",
    "opts": [
     "Usually truss — early collapse if the sprinklers don't contain it. Partial roof collapse means the sprinklers are compromised.",
     "A concrete deck over heavy steel — big buildings are built heavy, so collapse is not an early concern in here.",
     "Protected steel that holds for hours while the sprinklers flow, so collapse is a late-stage worry at most.",
     "Truss, but flowing sprinklers keep it cool, so the roof stays solid even if one section starts to sag in."
    ],
    "best": 0,
    "mp": "M.P. 202.04A: large open spaces typically require truss construction that \"can lead to early structural collapse if fire is not contained by the fire sprinkler system. Partial roof collapse should be assumed to have compromised the fire sprinkler system.\""
   },
   {
    "label": "Rack storage",
    "cat": "sizeup",
    "q": "What is inside?",
    "opts": [
     "Rack or floor storage: wet stock gets heavier, packaging breaks down, racks collapse. Rolled paper has killed firefighters.",
     "Retail shelving only — it is low and light, and nothing on it changes how you run the attack in here.",
     "Mostly washers and dryers — heavy, noncombustible, and good landmarks to work your way around.",
     "Stock gets lighter as it burns off, so the racks get safer the longer the sprinklers keep flowing."
    ],
    "best": 0,
    "mp": "M.P. 202.04A: \"As materials get wet, they get heavier, and packaging can begin to break down causing rack storage collapse.\" Retail may hide rack storage. In 1978 three firefighters died in overhaul when 600-pound paper rolls toppled."
   },
   {
    "label": "What’s happening inside?",
    "cat": "sizeup",
    "q": "What’s happening inside? Your first read:",
    "opts": [
     "Fire location unknown — cold smoke, sprinklers flowing",
     "Fire in the laundromat, smoke showing",
     "Fire already through the roof",
     "Unknown — no interior report yet"
    ],
    "mp": "M.P. 202.04A: cold smoke can be present with or without sprinkler control — the bell tells you water is flowing, not that the fire is controlled."
   },
   {
    "label": "Victim status",
    "cat": "sizeup",
    "q": "Are people hurt? What do you know right now?",
    "opts": [
     "Unknown — no victims reported yet",
     "Occupants seen leaving, no injuries reported",
     "Occupants possibly still inside",
     "Injuries reported — medical needed"
    ]
   },
   {
    "label": "Attack flow",
    "q": "How do you attack it?",
    "opts": [
     "Go interior — stay on the hose line, find it with the TIC, 150-foot limit",
     "Hit it from outside only — stay exterior and let the sprinklers work on it"
    ],
    "best": 0,
    "mp": "M.P. 202.04A: interior firefighters \"must stay on the hose line, no complacency,\" use the TIC to locate the fire, and never go past 150 feet. With the fire location unknown there is nothing to hit from outside yet."
   },
   {
    "label": "Go interior",
    "showIf": {
     "label": "Attack flow",
     "match": "interior"
    },
    "q": "You go interior — then what?",
    "opts": [
     "Stay on the hose line and use the TIC to find the fire",
     "Search the whole space first, then bring the line to the fire",
     "Split up off the line to cover more ground with two TICs",
     "Open the ceiling — check for fire in the common attic first"
    ],
    "best": 0,
    "mp": "M.P. 202.04A: \"firefighters must stay on the hose line, no complacency.\" The TIC \"is an excellent tool to support accountability and locating the fire.\" False ceilings and common attics can hide fire — check them, but from the line."
   },
   {
    "label": "FDC",
    "q": "The bell is ringing — water is flowing from the sprinklers. What do you do at the FDC?",
    "opts": [
     "Pump it — extra GPM and pressure help the sprinklers a lot. Check for crews inside first. Never shut the sprinklers down early.",
     "Shut the sprinklers down so the smoke lifts and crews can see well enough to find the seat of the fire.",
     "Leave the FDC alone — the building has a fire pump, so pumping in only adds risk to the piping and crews.",
     "Pump it only after the fire is out, to refill and pressure the system before the sprinklers get reset."
    ],
    "best": 0,
    "mp": "M.P. 202.04A: \"Pumping the FDC is a good thing.\" Before pumping, consider crews inside and whether a sudden jump in pressure could collapse racks. With a fire pump, connecting is a precaution against pump failure. \"We should not shut down the fire sprinkler system prior to verification of fire control.\""
   },
   {
    "label": "Plan B",
    "q": "Your crew is at 150 feet in cold smoke and the TIC shows nothing. What now?",
    "opts": [
     "Pull them out, regroup, pump the FDC and ventilate — time is on your side.",
     "Add a second line and push another 100 feet — the fire has to be close by now.",
     "Hold them in place and send the ladder to the roof to cut a hole over the smoke.",
     "Swap in the reserve crew at the 150-foot mark so the search keeps moving deeper."
    ],
    "best": 0,
    "mp": "M.P. 202.04A: \"If you cannot find the fire, pull the firefighters out of the building and implement another plan\" — pump the FDC and ventilate. The IC must be decisive. \"If firefighters cannot reach the fire, pull them out of the building. At this point, time is on your side.\""
   },
   {
    "label": "Past 150 feet",
    "q": "The smoke has cleared and the incident looks stable. Can crews now go deeper than 150 feet?",
    "opts": [
     "Yes, if safe — with a Shift Commander approving the plan and a BC with a Battalion Safety Officer on the sector.",
     "Yes — once the smoke clears, the 150-foot limit no longer applies and companies can work wherever they are needed.",
     "Never — 150 feet is an absolute limit, even after the building has been ventilated and fully cleared.",
     "Yes, as long as the company officer judges it safe and keeps a TIC on the crew the whole way in."
    ],
    "best": 0,
    "mp": "M.P. 202.04A: once smoke has cleared and the incident has stabilized, companies \"may go deeper than 150 feet into the building, if it is safe to do so.\" A Shift Commander should approve any such plan, with a Battalion Chief and Battalion Safety Officer managing the sector."
   },
   {
    "label": "Flow",
    "q": "M.P. 202.04: what flow does a commercial fire get?",
    "opts": [
     "250 GPM minimum per handline (2-inch and 2½-inch). NFPA 1710: at least three handlines, 500+ GPM total.",
     "150 GPM per 1¾-inch line — the residential package is faster and easier to move through a store.",
     "300 GPM from a single 2½-inch line — one big line is plenty when the sprinklers are already flowing water.",
     "500 GPM from a portable monitor only — handlines are too small for any commercial building fire."
    ],
    "best": 0,
    "mp": "M.P. 202.04: \"Residential fire tactics and flow rates should not be used in commercial fires.\" Commercial handlines flow 250 GPM (2-inch and 2½-inch), and NFPA 1710 is \"a minimum of three hand lines with an overall volume of 500 GPM or greater.\""
   },
   {
    "label": "Crew of 4",
    "kind": "crew",
    "q": "Deploy your 4-person engine crew — who does what?",
    "opts": [
     {
      "t": "Engineer pumps; captain and 2 firefighters take one 2-inch line in together, captain on the TIC.",
      "c": [
       "Fire Control"
      ]
     },
     {
      "t": "All 4 go in on the line — nobody needs to stay outside when the sprinklers are already flowing.",
      "c": [
       "Fire Control"
      ]
     },
     {
      "t": "Captain takes command outside; the 3 firefighters spread out to search the open sales floor.",
      "c": [
       "All Clear"
      ]
     },
     {
      "t": "Captain and 1 firefighter scout ahead with the TIC; 2 firefighters bring the line in behind them.",
      "c": [
       "Fire Control"
      ]
     }
    ],
    "best": 0,
    "mp": "M.P. 202.04A: interior crews \"must stay on the hose line\" and use the TIC to locate the fire and support accountability. M.P. 202.01: engines stretch, operate and pump hose lines. Scouting ahead of the line is how crews get lost in cold smoke."
   },
   {
    "label": "Assign E2",
    "unit": "E2",
    "q": "Where do you send E2, and what task?",
    "opts": [
     {
      "t": "Backup line — same or bigger flow behind E1's line.",
      "c": [
       "Fire Control"
      ]
     },
     {
      "t": "FDC — connect and pump the sprinkler system early.",
      "c": [
       "Fire Control"
      ]
     },
     {
      "t": "Exposure protection on the neighboring storefronts.",
      "c": [
       "Loss Stopped"
      ]
     },
     {
      "t": "Water supply — lay in and feed E1's attack line.",
      "c": []
     },
     {
      "t": "Hold as tactical reserve out in the parking lot.",
      "c": []
     }
    ],
    "best": 1,
    "mp": "M.P. 202.04: \"When present, building fire suppression systems should be supported as early as possible.\" M.P. 202.04A: pumping the FDC \"is a good thing\" — coordinate it with crews inside. The backup line comes from the next engine."
   },
   {
    "label": "2nd engine placement",
    "unit": "E2",
    "cat": "unit",
    "q": "Where does the 2nd engine go?",
    "opts": [
     "Front of the building — FDC position",
     "Rear access, to check the back doors",
     "Hydrant — key pumper for the attack",
     "Staging in the lot until it is assigned"
    ],
    "best": 0,
    "mp": "Follows the E2 assignment: to pump the sprinklers, spot at the FDC. M.P. 202.04A: finding the FDC is part of the initial size-up."
   },
   {
    "label": "Assign L1",
    "unit": "L1",
    "q": "Where do you send L1, and what task?",
    "opts": [
     {
      "t": "Ventilation — roof vents, skylights, doors, coordinated with the attack.",
      "c": [
       "Fire Control"
      ]
     },
     {
      "t": "Primary search of the open sales floor ahead of the hose line.",
      "c": [
       "All Clear"
      ]
     },
     {
      "t": "Cut a vertical vent hole over the smoke right away, before the attack goes in.",
      "c": [
       "Fire Control"
      ]
     },
     {
      "t": "Hold as tactical reserve with the aerial set up out front.",
      "c": []
     }
    ],
    "best": 0,
    "mp": "M.P. 202.04A: ventilation options include roof vents, skylights, doors, rollup doors and building systems, coordinated — and \"ventilation of cold smoke is a slow process.\" M.P. 202.04: it may be impossible to cut a hole big enough for the building, and uncoordinated ventilation makes fire control harder."
   },
   {
    "label": "Ladder placement",
    "unit": "L1",
    "cat": "unit",
    "q": "Where does the ladder go?",
    "opts": [
     "Front — ventilation and roof access",
     "Rear — back of the building",
     "Roof position",
     "Staging until assigned"
    ]
   },
   {
    "label": "Assign E3",
    "unit": "E3",
    "q": "Where do you send E3, and what task?",
    "opts": [
     {
      "t": "Exposure protection on the next storefront over.",
      "c": [
       "Loss Stopped"
      ]
     },
     {
      "t": "Backup line — protect the first crew's way out.",
      "c": [
       "Fire Control"
      ]
     },
     {
      "t": "Water supply — key pumper on the hydrant.",
      "c": []
     },
     {
      "t": "Hold as tactical reserve out in the parking lot.",
      "c": []
     }
    ],
    "best": 1,
    "mp": "M.P. 202.12E: backup lines \"should be deployed to protect a means of egress\" and be \"of the same or greater water volumes when possible.\" In cold smoke, the backup protects the first crew's way out."
   },
   {
    "label": "Assign R3",
    "unit": "R3",
    "q": "Where do you send R3, and what task?",
    "opts": [
     {
      "t": "RIT / rescue standby.",
      "c": []
     },
     {
      "t": "Primary search with E1.",
      "c": [
       "All Clear"
      ]
     },
     {
      "t": "Medical / rehab sector.",
      "c": []
     },
     {
      "t": "Hold as tactical reserve.",
      "c": []
     }
    ],
    "mp": "No single MP answer. M.P. 202.01: Rescue companies do search, rescue and treatment and keep a retrievable status for treatment and transport. M.P. 201.06: Command keeps a reserve able to handle a firefighter rescue."
   },
   {
    "label": "Assign BC1",
    "unit": "BC1",
    "q": "Where do you send BC1, and what task?",
    "opts": [
     {
      "t": "Assume command — upgrade to a command post outside the hazard zone.",
      "c": []
     },
     {
      "t": "Safety and accountability at the front entrance, tracking crews inside.",
      "c": []
     },
     {
      "t": "Interior sector — go in with the crews to watch the 150-foot mark.",
      "c": []
     },
     {
      "t": "Staging officer for the balance of the 1st alarm out in the lot.",
      "c": []
     }
    ],
    "best": 0,
    "mp": "M.P. 201.01: the first arriving Command Officer assumes command through Transfer of Command and becomes IC #2, from an upgraded command post outside the hazard zone. M.P. 202.04A calls for \"a strong command presence\" on these fires."
   },
   {
    "label": "Stretch check (hose)",
    "q": "What line do you bring, and how do you decide?",
    "opts": [
     "2-inch at 250 GPM, sized by walking the stretch: in the front door, across the space, enough to work — never past 150 feet.",
     "1¾-inch at 150 GPM — a commercial job still goes faster with whichever line moves the easiest.",
     "2½-inch at 300 GPM — and stretch every foot on the rig so the crew can push as deep as it needs to.",
     "The full 200-foot 2-inch crosslay, every foot of it — deeper is better when you still can't see the fire."
    ],
    "best": 0,
    "mp": "M.P. 202.04: commercial lines flow 250 GPM (2-inch and 2½-inch); residential flows are not for commercial fires. M.P. 202.04A: \"Companies must not extend hose lines more than 150 feet into the building.\""
   },
   {
    "label": "What’s happening inside? (update)",
    "cat": "sizeup",
    "q": "What’s happening inside? Update your read:",
    "opts": [
     "Interior report: fire located, sprinklers holding it",
     "Fire growing — sprinklers not controlling it",
     "Smoke clearing, no extension seen",
     "Still unknown from outside"
    ],
    "mp": "M.P. 202.04A: \"If the fire sprinkler system fails to control the fire for any reason, the fire will grow quickly\" — anticipate defensive operations with master streams outside the collapse zone."
   },
   {
    "label": "Victim status (update)",
    "cat": "sizeup",
    "q": "Are people hurt? Update:",
    "opts": [
     "Still unknown",
     "Occupants out, no injuries",
     "Victims found — rescue underway",
     "Injuries confirmed — medical requested"
    ]
   },
   {
    "label": "MP reference",
    "q": "M.P. 202.04A Large-Space Cold Smoke Fires — the lines that matter here: never treat a little calm smoke as a small fire. With no report of anyone trapped in a sprinklered building, risk management is aimed at property protection. Stay on the hose line and never go past 150 feet without Command support. Never shut the sprinklers down before confirmed control. Pumping the FDC is a good thing — but think about crews inside and rack collapse first. If you cannot find the fire, get out, pump the FDC, and ventilate — time is on your side. If the sprinklers fail to control it, the fire grows fast — anticipate defensive operations and exterior master streams outside the collapse zone.",
    "opts": [
     "Understood — show my debrief"
    ]
   },
   {
    "label": "Reposition",
    "q": "Conditions have changed. Where do you go now? Tap a number on the picture or pick from the list.",
    "hotspots": true,
    "mp": "No single right answer here. M.P. 202.04A: if conditions change, the IC — not the building — decides: pull crews that cannot find the fire, pump the FDC, and keep master streams outside the collapse zone if the sprinklers fail."
   }
  ]
 },
 {
  "id": "basement",
  "title": "Church — Basement Fire",
  "sub": "M.P. 202.04B Basement and Below Grade Fires · Commercial · First-arriving size-up",
  "dispatch": "Church fire. Smoke showing, report of a fire in the basement. Units: E1, L1, E2, E3, R3, BC1. Occupancy unknown.",
  "arrival": "You arrive first on E1: a brick church. The deck labels it a basement fire. No flame showing from the street. The main entrance is up the stairs on the left; there is a dark opening at the basement level in the center and a side door on the right.",
  "image": "assets/scenarios/basement-arrival.jpg",
  "imageAlt": "Arrival view: brick church labeled \"Basement fire\", main entrance up stairs on the left, dark basement-level opening in the center, side door on the right.",
  "hotspots": [
   {
    "kind": "move",
    "x": 20,
    "y": 70,
    "label": "Main entrance",
    "note": "1st floor — do NOT work above the fire yet"
   },
   {
    "kind": "move",
    "x": 62,
    "y": 72,
    "label": "Side door",
    "note": "Check the side access"
   },
   {
    "kind": "move",
    "x": 85,
    "y": 80,
    "label": "Rear",
    "note": "Walk the 360"
   },
   {
    "kind": "spray",
    "x": 48,
    "y": 80,
    "w": 12,
    "h": 10,
    "label": "Basement opening",
    "note": "Put water in at the basement level",
    "c": [
     "Fire Control"
    ]
   }
  ],
  "steps": [
   {
    "label": "Approach",
    "q": "You pull up. Where do you go first? Tap a number on the picture or pick from the list.",
    "hotspots": true,
    "best": 2,
    "mp": "M.P. 202.04B: early identification of basements and their access is critical and part of the 360° size-up. The main entrance puts you on the floor above the fire, in the exhaust side of the flowpath."
   },
   {
    "label": "Fireground factors",
    "q": "Size it up. What are the fireground factors here?",
    "opts": [
     "Building: brick church, basement below grade, main floor above. Fire: basement level, smoke showing, no flame from the street. Occupancy: public assembly, occupants unknown.",
     "Building: brick church, basement below grade, main floor above. Fire: main floor, smoke from the front doors, no flame showing. Occupancy: public assembly, occupants unknown.",
     "Building: brick church on a slab, no basement. Fire: main floor, smoke showing, no flame from the street. Occupancy: public assembly, occupants unknown.",
     "Building: brick church, basement below grade, main floor above. Fire: basement level, smoke showing. Occupancy: closed today, so no life hazard to weigh."
    ],
    "best": 0,
    "mp": "M.P. 202.04B: the location and level of the fire is a critical part of size-up, and the presence or lack of a basement must be communicated. A church is a commercial building under M.P. 202.04 — non-residential, and it can be multi-story above and below grade."
   },
   {
    "label": "Risk profile",
    "q": "What is your risk profile on this fire?",
    "opts": [
     "Risk a lot — savable lives if the church is occupied; the fire is reachable from the basement level.",
     "Risk a little — protect the property and find the basement access before anyone at all commits inside.",
     "Risk nothing — defensive from the start; basement fires are too dangerous to go in on at all.",
     "Risk a lot — send crews in the front door fast to search the main floor right above the fire."
    ],
    "best": 0,
    "mp": "M.P. 202.04B: \"Life safety should be a serious consideration in assessing the fire location, interior access, and searchable space.\" Risk a lot for savable lives — but manage that risk by attacking from the basement level, not from above."
   },
   {
    "label": "Strategy",
    "q": "What strategy do you declare?",
    "opts": [
     "Offensive — attack from the basement level",
     "Defensive — basement fires are too risky",
     "Marginal — in the front, out if it goes bad",
     "Hold off — let BC1 declare the strategy"
    ],
    "best": 0,
    "mp": "M.P. 202.04B: offensive is appropriate when crews can extinguish the basement fire from the most advantageous position on the same level. Consider defensive when water cannot get into the basement from that level, or the floor joists cannot be assessed. \"Marginal\" in M.P. 202.02B means defensive conditions with a known rescue — not \"offensive until it gets bad.\""
   },
   {
    "label": "Incident action plan",
    "q": "What is your IAP?",
    "opts": [
     "Basement attack from the same level, then search once the joists are checked",
     "Fire attack only — no search anywhere until the fire is completely knocked out",
     "Primary search of the main floor first, while a line goes to the basement",
     "Exposure protection first, then a line down the interior basement stairs"
    ],
    "best": 0,
    "mp": "M.P. 202.04B: extinguish from the same level as the fire before anyone enters the level above. \"Search operations above the fire require the extinguishment of the fire in the basement and the evaluation of the integrity of the floor joists.\""
   },
   {
    "label": "Tactical priorities",
    "q": "In what order do you work the tactical priorities?",
    "opts": [
     "All Clear (primary search) → Fire Control → Loss Stopped",
     "Fire Control → All Clear (primary search) → Loss Stopped",
     "Loss Stopped → Fire Control → All Clear (primary search)",
     "All Clear (primary search) → Loss Stopped → then Fire Control"
    ],
    "best": 0,
    "mp": "M.P. 202.02A: Rescue, Fire Control, Property Conservation. M.P. 202.04B: an effective basement attack \"is about extinguishment as well as creating and maintaining searchable space\" — fire control is what makes the all clear possible here."
   },
   {
    "label": "On-scene report",
    "q": "Give your on-scene report — which version do you send?",
    "opts": [
     "E1 on scene: medium brick church with a basement, smoke showing, fire reported in the basement. E1 assuming command, taking a line to the basement level. Offensive strategy. E1 will be Church Command.",
     "E1 on scene: medium brick church with a basement, smoke showing, fire reported in the basement. E1 is taking a handline in through the main entrance to attack it from the floor above. Offensive strategy.",
     "E1 on scene: medium brick church with a basement, smoke showing, fire reported in the basement. E1 assuming command, taking a line to the basement level. E1 will be Church Command.",
     "E1 on scene: church, smoke showing. Give me the balance of a 1st alarm. E1 is going in the front for search and attack. Offensive strategy. E1 will be Church Command."
    ],
    "best": 0,
    "mp": "M.P. 201.01 on-scene report: unit on scene, building (occupancy, size, height), conditions, action taken, strategy, and command confirmation with a name. M.P. 202.04B: the basement and the fire's level must be recognized early so no crew ends up working above it."
   },
   {
    "label": "Initial 3 & 1",
    "q": "How do you run the initial 3 & 1?",
    "opts": [
     "First 3 companies to IAP tasks, 1 held as tactical reserve; call for more before you assign it.",
     "All 4 companies straight to IAP tasks; the next alarm that shows up becomes your tactical reserve.",
     "First 2 companies to IAP tasks, 2 held back until the crews inside can tell you what they found.",
     "Send the reserve to the hardest task first, then call for more resources once it is committed."
    ],
    "best": 0,
    "mp": "M.P. 201.06: \"Command must provide for a tactical reserve of fire companies\" — enough to manage the incident and to handle a firefighter rescue. Call for more resources early (\"if you begin to debate whether to call another alarm, call for it\"), and before the reserve is committed."
   },
   {
    "label": "Follow-up report",
    "q": "Command is established. What has to be in your follow-up report on this fire?",
    "opts": [
     "Safety concerns — basement confirmed, fire on the basement level — accountability location, resources, IRIC.",
     "Basement details can wait for the interior crew's CAN report; just give accountability and resources.",
     "Only a request for the balance of the 1st alarm; the details already went out in the on-scene report.",
     "Safety concerns and IRIC only; accountability can wait until the first crew is inside working in the basement."
    ],
    "best": 0,
    "mp": "M.P. 202.04B: \"The presence or lack of a basement must be communicated in the follow up report,\" along with the fire's level, so no crew ends up working above a basement fire without knowing it. M.P. 201.01 follow-up: safety concerns, accountability location, resource disposition, IRIC."
   },
   {
    "label": "Same level",
    "cat": "sizeup",
    "q": "Where does the attack start?",
    "opts": [
     "\"When a fire is located at the basement level, fire attack must begin on that level\" — windows, doors, or stairwells.",
     "From the main floor above, down the interior stairs — that keeps the crew between the fire and any occupants.",
     "Through the main entrance, then flow water down through a hole cut in the floor right over the fire.",
     "From outside only, with a distributor nozzle pushed through the floor so no crew enters the building."
    ],
    "best": 0,
    "mp": "M.P. 202.04B: \"When a fire is located at the basement level, fire attack must begin on that level. That includes basement windows, doors, or stairwells.\" Fog streams and distributors \"should not require firefighters to work from above the fire.\""
   },
   {
    "label": "Floor above",
    "cat": "sizeup",
    "q": "Can anyone work on the 1st floor above the fire?",
    "opts": [
     "No — not until fire control is achieved and the smoke is ventilated so the sheeting and joists can be checked.",
     "Yes — the main floor is the safest spot to work from, since the fire is still a full level below where you stand.",
     "Yes, with a charged hose line, as long as the crew stays close to the walls and near the exits.",
     "Yes, for a fast primary search only, with a TIC watching the floor for hot spots underfoot."
    ],
    "best": 0,
    "mp": "M.P. 202.04B: crews on the first floor above the fire \"should not be done until fire control has been achieved and the smoke has been ventilated to determine the integrity of the floor sheeting and joists.\" That floor is also the exhaust side of the flowpath."
   },
   {
    "label": "Ventilation",
    "cat": "sizeup",
    "q": "What about ventilation?",
    "opts": [
     "Minimize it until water is on the fire — basement openings can push unsurvivable heat to the floor above.",
     "Ventilate the basement first so the attack crew can see where they are going on the stairs.",
     "Cut the roof right away — vertical ventilation lifts the smoke out of the whole church at once.",
     "Open every door and window on the main floor to let the heat out ahead of the attack crew."
    ],
    "best": 0,
    "mp": "M.P. 202.04B: minimize ventilation before extinguishment. Enlarging a basement opening with an exhaust open on the first floor can create \"unsurvivable heat conditions\" for anyone in that flowpath. Ventilate after the fire is out, using the most effective method."
   },
   {
    "label": "TIC",
    "cat": "sizeup",
    "q": "Can the thermal camera tell you if the floor will hold?",
    "opts": [
     "No — TICs and sounding are not reliable for floor integrity, especially lightweight construction. Rugs can hide burned-out floor.",
     "Yes — a TIC sweep shows the hot joists, so any floor area that reads cool on the camera is safe to cross and work on.",
     "Not by itself, but a TIC scan plus sounding the floor with a tool ahead of every step is enough to trust it will hold.",
     "If the floor feels solid underfoot and looks normal under the carpet and rugs, it is solid — keep moving."
    ],
    "best": 0,
    "mp": "M.P. 202.04B: \"Thermal imagers and sounding the floor are not reliable means of determining the structural integrity of the floor system, especially in buildings using lightweight construction materials. Rugs and furniture can hide the areas of floor collapse.\""
   },
   {
    "label": "Basement signs",
    "cat": "sizeup",
    "q": "Which exterior signs point to a fire in the basement?",
    "opts": [
     "Smoke filling the whole first-floor doorway with no neutral plane, smoke from roof vent pipes, or a low opening pulling air in.",
     "Heavy smoke from the attic vents, plus a clear neutral plane about halfway down the front doors and windows.",
     "Flame showing from the first-floor windows, and smoke lifting high off the roof line instead of hugging it.",
     "Smoke pushing out of a basement window — a basement window pulling air in means there is no fire down there."
    ],
    "best": 0,
    "mp": "M.P. 202.04B lists them: full exhaust at the first-floor entry \"without the presence of a neutral plane,\" smoke from roof vent pipes or a chimney, and a below-grade window or door acting as an air intake without a neutral plane."
   },
   {
    "label": "What’s happening inside?",
    "cat": "sizeup",
    "q": "What’s happening inside? Your first read:",
    "opts": [
     "Fire in the basement, smoke pushing up to the 1st floor",
     "Fire on the 1st floor, smoke in the basement",
     "Fire already through the floor",
     "Unknown — no interior report yet"
    ],
    "mp": "M.P. 202.04B: size up with a TIC from the most advantageous positions — it helps locate the fire, but it \"is a poor assessment tool in assessing structural integrity.\""
   },
   {
    "label": "Victim status",
    "cat": "sizeup",
    "q": "Are people hurt? What do you know right now?",
    "opts": [
     "Unknown — no victims reported yet",
     "Occupants seen leaving, no injuries reported",
     "Occupants possibly still inside",
     "Injuries reported — medical needed"
    ]
   },
   {
    "label": "Attack flow",
    "q": "How do you attack it?",
    "opts": [
     "Attack on the basement level — windows, doors, or stairwell, minimum 150 GPM",
     "Attack from the main floor above, coming down the interior stairs to the fire",
     "Exterior only — keep everyone out and flow water in from outside"
    ],
    "best": 0,
    "mp": "M.P. 202.04B: attack on the same level as the fire with a minimum of 150 GPM. Interior stairs from the floor above \"will likely become the chimney\" for superheated air leaving the basement."
   },
   {
    "label": "Go interior",
    "showIf": {
     "label": "Attack flow",
     "match": "basement level"
    },
    "q": "You go interior at the basement level — then what?",
    "opts": [
     "Cool the structural surfaces — walls, ceiling, floor joists — not just the air",
     "Cool the air with short fog bursts first, then go to work on the surfaces after",
     "Search the basement first, then bring the line in once victims are out",
     "Send a crew upstairs now to check for extension into the floor above"
    ],
    "best": 0,
    "mp": "M.P. 202.04B: \"Attempting to extinguish the fire by cooling the air and not the surfaces will be counterproductive and will not be effective.\" Get water on the walls, ceiling and floor joists."
   },
   {
    "label": "Basement type",
    "q": "What kind of basement is this?",
    "opts": [
     "No-access (inside stairs only), limited-access (window only), full-access (door or big window) — and finished or unfinished.",
     "Just finished or unfinished — access does not change the attack once you know the basement is there.",
     "Small, medium, or large by square footage — size sets the flow, and access gets decided once inside.",
     "Residential or commercial — church basements are always full-access, so the type never matters here."
    ],
    "best": 0,
    "mp": "M.P. 202.04B: three standard types — no-access (internal access only), limited-access (external window only), full-access (external door or large escape window) — each finished (structural protection) or unfinished (none). A no-access basement leaves almost no good attack position."
   },
   {
    "label": "Flow",
    "q": "M.P. 202.04B: what is the minimum fire attack flow for a basement fire?",
    "opts": [
     "150 GPM.",
     "250 GPM.",
     "300 GPM.",
     "500 GPM."
    ],
    "best": 0,
    "mp": "M.P. 202.04B: \"The fire attack must be with a minimum of 150 gpm.\" That is the floor for any basement — on a commercial building like this church, M.P. 202.04 commercial flows (250 GPM handlines) apply."
   },
   {
    "label": "Defensive trigger",
    "q": "When should this basement fire go defensive?",
    "opts": [
     "When you can't get water into the basement from the same level, can't assess the joists, or know they're gone.",
     "Only when the fire breaks through the main floor — until then, a crew working upstairs can still hold it back.",
     "As soon as the first line reaches the basement stairs and meets heavy heat coming up toward it.",
     "Whenever the church is confirmed empty, since nothing left in there is worth any risk at all."
    ],
    "best": 0,
    "mp": "M.P. 202.04B: consider defensive \"when crews cannot effectively apply water into the basement from the most advantageous positions on the same level,\" or when there is limited or zero capability to assess the floor joists, or they are known to be compromised."
   },
   {
    "label": "Crew of 4",
    "kind": "crew",
    "q": "Deploy your 4-person engine crew — who does what?",
    "opts": [
     {
      "t": "Engineer pumps; captain and 2 firefighters take one line to the basement level. No one goes upstairs yet.",
      "c": [
       "Fire Control"
      ]
     },
     {
      "t": "All 4 down the interior stairs with the line — put the fire out first, starting from the top of the stairs.",
      "c": [
       "Fire Control"
      ]
     },
     {
      "t": "Captain takes command; the 3 firefighters go in the main entrance to search the main floor.",
      "c": [
       "All Clear"
      ]
     },
     {
      "t": "2 firefighters on the basement line, 2 on the main floor checking for extension and searching.",
      "c": [
       "Fire Control",
       "All Clear"
      ]
     }
    ],
    "best": 0,
    "mp": "M.P. 202.04B: the attack goes in on the basement level before anyone enters the floor above. M.P. 202.01: engines stretch, operate and pump hose lines. Putting two members on the main floor puts them above the fire and in the exhaust flowpath."
   },
   {
    "label": "Assign E2",
    "unit": "E2",
    "q": "Where do you send E2, and what task?",
    "opts": [
     {
      "t": "Backup line to the basement level — same or bigger flow.",
      "c": [
       "Fire Control"
      ]
     },
     {
      "t": "RIT at the front door for the crews working inside the basement.",
      "c": []
     },
     {
      "t": "Exposure protection on the buildings next door.",
      "c": [
       "Loss Stopped"
      ]
     },
     {
      "t": "Water supply — lay in and become the key pumper.",
      "c": []
     },
     {
      "t": "Hold as tactical reserve out front of the church.",
      "c": []
     }
    ],
    "best": 0,
    "mp": "M.P. 202.12E: backup lines protect a means of egress and should be \"of the same or greater water volumes when possible.\" M.P. 201.01: the companies coming in behind the first engine back up the basic attack — here, on the basement level."
   },
   {
    "label": "2nd engine placement",
    "unit": "E2",
    "cat": "unit",
    "q": "Where does the 2nd engine go?",
    "opts": [
     "Front of the building",
     "Rear access",
     "Hydrant — water supply position",
     "Staging until assigned"
    ]
   },
   {
    "label": "Assign L1",
    "unit": "L1",
    "q": "Where do you send L1, and what task?",
    "opts": [
     {
      "t": "Ventilation — hold openings until water is on the fire, then vent the best way.",
      "c": [
       "Fire Control"
      ]
     },
     {
      "t": "Primary search of the main floor right away, while the attack starts below.",
      "c": [
       "All Clear"
      ]
     },
     {
      "t": "Ventilation — open up the basement windows now so the attack crew can see.",
      "c": [
       "Fire Control"
      ]
     },
     {
      "t": "Hold as tactical reserve with ground ladders ready along the side of the church.",
      "c": []
     }
    ],
    "best": 0,
    "mp": "M.P. 202.04B: ventilation is \"coordinated prior to and during the fire attack,\" minimized before extinguishment, then done the most effective way after. Searching the floor above waits for extinguishment and a joist check."
   },
   {
    "label": "Ladder placement",
    "unit": "L1",
    "cat": "unit",
    "q": "Where does the ladder go?",
    "opts": [
     "Front — ventilation and roof access",
     "Rear — back of the building",
     "Roof position",
     "Staging until assigned"
    ]
   },
   {
    "label": "Assign E3",
    "unit": "E3",
    "q": "Where do you send E3, and what task?",
    "opts": [
     {
      "t": "Floor above — after control and a joist check, check extension and search.",
      "c": [
       "All Clear"
      ]
     },
     {
      "t": "Floor above — get in there now and search while the basement attack begins.",
      "c": [
       "All Clear"
      ]
     },
     {
      "t": "Exposure protection on the buildings on both sides of the church.",
      "c": [
       "Loss Stopped"
      ]
     },
     {
      "t": "Water supply — lay a second supply line in from another hydrant.",
      "c": []
     }
    ],
    "best": 0,
    "mp": "M.P. 202.04B: \"Search operations above the fire require the extinguishment of the fire in the basement and the evaluation of the integrity of the floor joists.\" Crews go upstairs only after both."
   },
   {
    "label": "Assign R3",
    "unit": "R3",
    "q": "Where do you send R3, and what task?",
    "opts": [
     {
      "t": "RIT / rescue standby.",
      "c": []
     },
     {
      "t": "Primary search with E1.",
      "c": [
       "All Clear"
      ]
     },
     {
      "t": "Medical / rehab sector.",
      "c": []
     },
     {
      "t": "Hold as tactical reserve.",
      "c": []
     }
    ],
    "mp": "No single MP answer. M.P. 202.01: Rescue companies do search, rescue and treatment and keep a retrievable status for treatment and transport. M.P. 201.06: Command keeps a reserve able to handle a firefighter rescue."
   },
   {
    "label": "Assign BC1",
    "unit": "BC1",
    "q": "Where do you send BC1, and what task?",
    "opts": [
     {
      "t": "Assume command — upgrade to a command post outside the hazard zone.",
      "c": []
     },
     {
      "t": "Safety and accountability at the basement entrance, tracking every crew.",
      "c": []
     },
     {
      "t": "Basement sector — go down with the crews and run the attack there.",
      "c": []
     },
     {
      "t": "Staging officer for the balance of the 1st alarm out front.",
      "c": []
     }
    ],
    "best": 0,
    "mp": "M.P. 201.01: the first arriving Command Officer assumes command through Transfer of Command and becomes IC #2, from an upgraded command post outside the hazard zone."
   },
   {
    "label": "Stretch check (hose)",
    "q": "What line do you bring, and how do you decide?",
    "opts": [
     "2-inch at 250 GPM — the church is commercial. Walk the stretch to the basement entrance: reach, work, and turn.",
     "1¾-inch at 150 GPM — the basement minimum is all you need, and it is easier to handle on the stairs.",
     "2½-inch, every foot on the rig — a basement fire always needs the biggest line you carry, no matter what.",
     "The front bumper line — it is pre-connected and the closest line to the church's basement opening."
    ],
    "best": 0,
    "mp": "M.P. 202.04: \"Residential fire tactics and flow rates should not be used in commercial fires\" — commercial handlines flow 250 GPM. M.P. 202.04B's 150 GPM is the minimum for any basement. Walk the stretch: it has to reach the seat of the fire, not the closest door."
   },
   {
    "label": "What’s happening inside? (update)",
    "cat": "sizeup",
    "q": "What’s happening inside? Update your read:",
    "opts": [
     "Interior report: fire contained to the basement",
     "Fire extending — floor joists involved",
     "Smoke clearing, joists checked, floor above clear to work",
     "Still unknown from outside"
    ],
    "mp": "M.P. 202.04B: a change in the air inlets on the basement level can turn the first floor into the exhaust path — listen for it in the interior reports."
   },
   {
    "label": "Victim status (update)",
    "cat": "sizeup",
    "q": "Are people hurt? Update:",
    "opts": [
     "Still unknown",
     "Occupants out, no injuries",
     "Victims found — rescue underway",
     "Injuries confirmed — medical requested"
    ]
   },
   {
    "label": "MP reference",
    "q": "M.P. 202.04B Basement and Below Grade Fires — the lines that matter here: identify the basement in the 360 and report it in the follow-up. Never work on the floor above a basement fire before the fire is out and the floor is checked. Never trust a TIC or sounding the floor to judge joist integrity. Never ventilate the basement level before water is on the fire. Never attack from above — attack on the same level as the fire at a minimum of 150 GPM (and commercial flows on a commercial building, per M.P. 202.04). Cool the structural surfaces, not just the air. Go defensive if you cannot get water in from the same level or cannot assess the joists.",
    "opts": [
     "Understood — show my debrief"
    ]
   },
   {
    "label": "Reposition",
    "q": "Conditions have changed. Where do you go now? Tap a number on the picture or pick from the list.",
    "hotspots": true,
    "mp": "No single right answer here. M.P. 202.04B: keep the attack on the basement level, stay off the floor above until the joists are checked, and do not create new basement openings before water is on the fire."
   }
  ]
 },
 {
  "id": "stickcity",
  "title": "Stick City — High-Piled Storage Fire",
  "sub": "M.P. 202.18 High Piled Outside Combustible Storage · Commercial · First-arriving size-up",
  "dispatch": "Outside fire. Large unfinished wood-frame construction project fully involved, exposures downwind. Units: E1, L1, E2, E3, R3, BC1. No reports of anyone inside.",
  "arrival": "You arrive first on E1: a stick-built apartment project under construction, exposed trusses, fully involved on the right side with a huge black column. Crane on the left, lumber piles everywhere. The street gives you room to stage upwind.",
  "image": "assets/scenarios/stickcity-arrival.jpg",
  "imageAlt": "Arrival view: unfinished wood-frame construction with exposed trusses, fire on the right side with a large black smoke column, crane on the left, lumber piles, street in the foreground.",
  "hotspots": [
   {
    "kind": "move",
    "x": 22,
    "y": 86,
    "label": "Staging",
    "note": "Stage upwind, clear of the collapse zone"
   },
   {
    "kind": "move",
    "x": 78,
    "y": 60,
    "label": "Exposure",
    "note": "Check the downwind exposures"
   },
   {
    "kind": "move",
    "x": 8,
    "y": 74,
    "label": "Hydrant",
    "note": "Water supply — start building it now"
   },
   {
    "kind": "spray",
    "x": 80,
    "y": 58,
    "w": 16,
    "h": 16,
    "label": "Main body of fire",
    "note": "Master stream from outside the collapse zone",
    "c": [
     "Fire Control"
    ]
   },
   {
    "kind": "move",
    "x": 55,
    "y": 75,
    "label": "Collapse zone edge",
    "note": "Stay out of the collapse zone"
   }
  ],
  "steps": [
   {
    "label": "Approach",
    "q": "You pull up. Where do you go first? Tap a number on the picture or pick from the list.",
    "hotspots": true,
    "best": 0,
    "mp": "M.P. 202.18: \"It is important to approach these incidents slowly and cautiously\" — dispatch info is rarely complete, and over-committing can endanger crews and apparatus. Stage upwind and out of the collapse zone while you size it up."
   },
   {
    "label": "Fireground factors",
    "q": "Size it up. What are the fireground factors here?",
    "opts": [
     "Building: big unfinished wood frame, exposed trusses, no compartments. Fire: right side fully involved, big black column, fast spread. Occupancy: under construction, no one reported inside. Arrangement: exposures downwind, lumber piles, crane.",
     "Building: big unfinished wood frame, exposed trusses, no compartments. Fire: right side fully involved, fast spread. Occupancy: under construction, no one reported. Arrangement: the wind is light right now, so the exposures are not a factor yet.",
     "Building: occupied apartment complex, finished units with drywall. Fire: right side fully involved, big black column. Occupancy: residential, occupants unknown. Arrangement: exposures downwind, lumber piles, crane.",
     "Building: big unfinished wood frame, exposed trusses. Fire: right side involved, but the open frame vents it, so the spread will be slow. Occupancy: under construction, none inside. Arrangement: exposures downwind, crane."
    ],
    "best": 0,
    "mp": "M.P. 202.18 counts large unfinished construction projects (\"stick cities\") as high piled outside combustible storage. Size-up: material burning, fire growth potential, exposures, water supply, access and hazards — and \"forecast how quickly the incident will escalate.\""
   },
   {
    "label": "Risk profile",
    "q": "What is your risk profile on this fire?",
    "opts": [
     "Risk a little — the frame is still savable property, so a quick knock from inside is worth it.",
     "Risk a lot — workers could still be in there, so search it before anyone writes it off.",
     "Risk nothing — the building is lost and no one is reported inside. Protect exposures from safe spots.",
     "Risk a lot — a project this size is worth an aggressive push regardless of the conditions."
    ],
    "best": 2,
    "mp": "M.P. 202.18: \"We will not risk our lives at all for property that is already lost,\" with \"a pessimistic application of the Risk Management System which includes realistic forecasting.\" Exposures still get protected — from defensive positions, with \"no reason to endanger firefighters.\""
   },
   {
    "label": "Strategy",
    "q": "What strategy do you declare?",
    "opts": [
     "Defensive — master streams, protect exposures",
     "Offensive — quick interior knock on the frame",
     "Defensive, with crews searching the frame first",
     "Hold off — let BC1 declare the strategy first"
    ],
    "best": 0,
    "mp": "M.P. 202.18: an offensive rescue strategy is unlikely, the window for offensive property saves is very small, and \"in most cases, a defensive operation is appropriate.\" Incident Commanders must make sure everyone on scene knows the strategy."
   },
   {
    "label": "Incident action plan",
    "q": "What is your IAP?",
    "opts": [
     "Firefighter safety, find the main body and spread paths, protect exposures and environment, master streams",
     "Quick aggressive rescue and fire attack to stop the spread early, with a continuous water supply throughout",
     "Interior attack on the burning section to cut it off before it reaches the rest of the frame",
     "Master streams on the main body only — the exposures will be safe once the fire is knocked down"
    ],
    "best": 0,
    "mp": "M.P. 202.18 defensive IAP: \"Provide for firefighter safety, identify main body of fire and paths for extension through pessimistic forecasting, address exposures including public health, address environmental protection, and extinguish fire using master streams, if appropriate.\" The rescue-and-attack option is the offensive IAP."
   },
   {
    "label": "Tactical priorities",
    "q": "In what order do you work the tactical priorities?",
    "opts": [
     "All Clear (primary search) → Fire Control → Loss Stopped",
     "Fire Control → All Clear (primary search) → Loss Stopped",
     "Loss Stopped → Fire Control → All Clear (primary search)",
     "All Clear (primary search) → Loss Stopped → then Fire Control"
    ],
    "best": 0,
    "mp": "M.P. 202.02A order still holds: Rescue, Fire Control, Property Conservation. Defensive from the start means no primary search of the fire building (M.P. 202.02B) — the all clears are in the exposures. M.P. 202.18 adds its own order: firefighter safety, exposures, environment, fire control."
   },
   {
    "label": "On-scene report",
    "q": "Give your on-scene report — which version do you send?",
    "opts": [
     "E1 on scene: large unfinished wood-frame apartment project, fully involved, exposures downwind. E1 laying a supply line and setting up master streams on the exposures. Defensive strategy. E1 will be Construction Command.",
     "E1 on scene: large unfinished wood-frame apartment project, fully involved, exposures downwind. E1 laying a supply line and pulling a handline into the frame for a quick knock. Offensive strategy. E1 will be Construction Command.",
     "E1 on scene: large unfinished wood-frame apartment project, fully involved, exposures downwind. E1 laying a supply line and setting up master streams on the exposures. E1 will be Construction Command.",
     "E1 on scene: large unfinished wood-frame apartment project, fully involved, exposures downwind. E1 laying a supply line and setting up master streams on the exposures. This is a defensive fire."
    ],
    "best": 0,
    "mp": "M.P. 201.01's defensive example: \"medium size warehouse fully involved with exposures to the east. Engine 11 is laying a supply line and attacking the fire with a stang gun… This is a defensive fire. Engine 11 will be Buckeye Command.\" Strategy and command name both go in."
   },
   {
    "label": "Initial 3 & 1",
    "q": "How do you run the initial 3 & 1?",
    "opts": [
     "First 3 companies to IAP tasks, 1 held as tactical reserve; call for more before you assign it.",
     "All 4 companies straight to IAP tasks; the next alarm that shows up becomes your tactical reserve.",
     "First 2 companies to IAP tasks, 2 held back until the crews inside can tell you what they found.",
     "Send the reserve to the hardest task first, then call for more resources once it is committed."
    ],
    "best": 0,
    "mp": "M.P. 201.06: \"Command must provide for a tactical reserve of fire companies\" — enough to manage the incident and to handle a firefighter rescue. Call for more resources early (\"if you begin to debate whether to call another alarm, call for it\"), and before the reserve is committed. M.P. 202.18: a first alarm for defensive operations should cover 2 geographical sectors — consider additional resources."
   },
   {
    "label": "Objectives order",
    "cat": "sizeup",
    "q": "M.P. 202.18 lists the tactical objectives in order. What is the order?",
    "opts": [
     "1. Firefighter Safety, 2. Exposure Protection, 3. Environmental Protection, 4. Fire Control.",
     "1. Fire Control, 2. Exposure Protection, 3. Firefighter Safety, 4. Environmental Protection.",
     "1. Exposure Protection, 2. Fire Control, 3. Firefighter Safety, 4. Environmental Protection.",
     "1. Firefighter Safety, 2. Fire Control, 3. Exposure Protection, 4. Environmental Protection, in that order."
    ],
    "best": 0,
    "mp": "M.P. 202.18: \"1. Firefighter Safety 2. Exposure Protection 3. Environmental Protection (including public health) 4. Fire Control.\" Fire control comes last — letting it burn can be an acceptable choice."
   },
   {
    "label": "Over-commit",
    "cat": "sizeup",
    "q": "What is the first mistake to avoid?",
    "opts": [
     "Over-committing before the critical factors are evaluated — the first info will change and it grows fast.",
     "Waiting too long to attack — every minute spent sizing it up lets the fire reach the next big lumber pile.",
     "Calling too many resources early — they jam the street and get in the way of the first alarm.",
     "Staging too far out — master streams have to be close to the fire to make any real difference."
    ],
    "best": 0,
    "mp": "M.P. 202.18: \"Over-committing prior to fully evaluating the critical factors can pose significant danger to firefighters, as well as unnecessary damage to apparatus and equipment.\" Assume the first information will change."
   },
   {
    "label": "Water supply",
    "cat": "sizeup",
    "q": "How do you feed big water here?",
    "opts": [
     "Pumped water, reversing off the forward pumper, relay or drafting — it is critical and takes time to build.",
     "Tank water first — 500 gallons buys enough time to knock it down before a hydrant is even needed.",
     "One hydrant, one 4-inch line straight to the first master stream — that covers the whole fire.",
     "Each engine lays its own line from the nearest hydrant, and nobody pumps from a key pumper."
    ],
    "best": 0,
    "mp": "M.P. 202.18: \"Water supply is critical (pumped water/reversing off forward pumper, relay operations, drafting operations).\" M.P. 202.12E: big-water master streams use a forward and key pumper with two supply lines."
   },
   {
    "label": "Collapse zone",
    "cat": "sizeup",
    "q": "Where do you put the master streams?",
    "opts": [
     "Outside the collapse zone, from the most advantageous spots, with everyone clear of the structure.",
     "As close as the heat allows — reach matters more than distance when the whole wood frame is burning.",
     "Inside the footprint, between the fire and the unburned section, to cut the fire off there.",
     "Right at the edge of the frame, since an open wood frame falls straight down, never outward."
    ],
    "best": 0,
    "mp": "M.P. 202.12E: \"Command and sector officers must maintain all members in positions outside the collapse zone.\" M.P. 202.02B: master streams are generally the most effective defensive tactic."
   },
   {
    "label": "Sectors",
    "cat": "sizeup",
    "q": "How do you organize the first alarm on this fire?",
    "opts": [
     "Sectorize early — 2&1 to the most critical sector, geographic sectors in priority, first alarm covering two.",
     "One sector for the whole fire; keep every company on your channel until the fire is under control.",
     "Assign by task only — attack, water, exposures — and add geographic sectors once the 2nd alarm companies arrive.",
     "Put every company on the main body first; set up exposure sectors once the column starts laying down."
    ],
    "best": 0,
    "mp": "M.P. 202.18: \"Sectorize early (2&1 to most critical sector)\" and \"consider geographical sectors in order of priority.\" A first alarm for defensive operations \"should cover 2 geographical sectors.\""
   },
   {
    "label": "What’s happening inside?",
    "cat": "sizeup",
    "q": "What’s happening inside? Your first read:",
    "opts": [
     "No one inside reported — structure fully involved, trusses failing",
     "Fire contained to one section",
     "Fire already out",
     "Unknown — no interior report yet"
    ],
    "mp": "M.P. 202.18: forecast how quickly it will escalate and identify the path of fire spread — pessimistic forecasting."
   },
   {
    "label": "Victim status",
    "cat": "sizeup",
    "q": "Are people hurt? What do you know right now?",
    "opts": [
     "No reports of anyone inside",
     "Occupants seen leaving, no injuries reported",
     "Workers possibly still on site",
     "Injuries reported — medical needed"
    ]
   },
   {
    "label": "Primary search notice",
    "q": "You are defensive from the start. What do you tell Alarm about the primary search?",
    "opts": [
     "That no primary search will be completed on the affected structure.",
     "That the primary search is delayed until the fire is brought under control.",
     "Nothing — a defensive fire does not need any report about search.",
     "That the all clear is given, since no one was reported inside."
    ],
    "best": 0,
    "mp": "M.P. 202.02B: \"If defensive operations are conducted from the onset of the incident, Command will notify Alarm that there will not be a primary search completed for the affected structure(s).\" No report of anyone inside is not an all clear."
   },
   {
    "label": "Attack flow",
    "q": "How do you attack it?",
    "opts": [
     "Defensive — master streams from outside the collapse zone",
     "Interior attack — go in and hit it before it takes the frame",
     "Exterior handlines only — 1¾-inch lines worked along the frame"
    ],
    "best": 0,
    "mp": "M.P. 202.02B: master streams (at least 750 GPM) are the main defensive tool. M.P. 202.12E: shut down 1¾-inch lines on a defensive fire so well-meaning firefighters do not creep into the hazard zone."
   },
   {
    "label": "Go interior",
    "showIf": {
     "label": "Attack flow",
     "match": "Interior attack"
    },
    "q": "You go interior — then what?",
    "opts": [
     "Back out — a fully involved open frame is a collapse risk with nothing to save inside",
     "Attack the burning section directly and cut it off from the rest of the frame",
     "Search the frame for workers first, then bring the line in behind the search",
     "Open up the walls and check for extension into the unburned section of the frame"
    ],
    "best": 0,
    "mp": "M.P. 202.18: \"We will not risk our lives at all for property that is already lost,\" and \"there is no reason to endanger firefighters during defensive operations.\" Get out and set up master streams."
   },
   {
    "label": "Let it burn",
    "q": "What are the fire control options?",
    "opts": [
     "Big water, pulling fuel apart with heavy equipment, or letting it burn out — weighed against exposures and environment.",
     "Big water only — every outside fire gets put out as fast as possible, whatever the runoff ends up costing.",
     "Interior handlines only — master streams waste water and wreck whatever is left standing of the frame.",
     "Let it burn, every time — water on an outside storage fire only makes the runoff and smoke worse."
    ],
    "best": 0,
    "mp": "M.P. 202.18: \"fire suppression with big-water, removing fuel from the fire with heavy equipment, and letting the fire burn itself out are all acceptable considerations for fire control,\" weighed against the consequences of letting the material burn vs. big water."
   },
   {
    "label": "Flow",
    "q": "Defensive operations: what is the master stream guideline?",
    "opts": [
     "At least 750 GPM per master stream.",
     "At least 500 GPM per portable monitor.",
     "250 GPM per 2-inch line, three lines.",
     "At least 1,500 GPM per master stream."
    ],
    "best": 0,
    "mp": "M.P. 202.02B: \"For tactical purposes, a standard master stream flow of at least 750 GPM should be the guideline,\" adjusted up or down from there. Aerial devices are 1,000+ GPM appliances (M.P. 202.12E)."
   },
   {
    "label": "Exposure first",
    "q": "Water is limited and the downwind exposure is starting to smoke. Where does the water go?",
    "opts": [
     "On the exposure first, then the main body and the thermal column once it is protected.",
     "Main body first — knock the fire down and the exposure takes care of itself.",
     "Split it evenly between the main body and the exposure so neither one gets ahead of you.",
     "Thermal column first, to cut the radiant heat, then the exposure and main body."
    ],
    "best": 0,
    "mp": "M.P. 202.02B: \"When the exposure is severe, and water is limited, the most effective tactic is to put water on the exposure. Once exposure protection is established, attention may be directed to knocking down the main body of fire and thermal column cooling.\""
   },
   {
    "label": "Crew of 4",
    "kind": "crew",
    "q": "Deploy your 4-person engine crew — who does what?",
    "opts": [
     {
      "t": "Captain runs command upwind; engineer pumps; 2 firefighters put a big line on the downwind exposure.",
      "c": [
       "Loss Stopped"
      ]
     },
     {
      "t": "All 4 work a handline into the burning frame — knock the fire down before it can spread any further at all.",
      "c": [
       "Fire Control"
      ]
     },
     {
      "t": "Captain and 1 firefighter search the frame for workers; 2 firefighters take the attack line.",
      "c": [
       "All Clear",
       "Fire Control"
      ]
     },
     {
      "t": "2 firefighters on the deck gun at the main body, 2 dragging lines over to the downwind exposure.",
      "c": [
       "Fire Control",
       "Loss Stopped"
      ]
     }
    ],
    "best": 0,
    "mp": "M.P. 202.18: exposure protection is objective 2; fire control is last. M.P. 201.01: incidents with potential for rapid expansion demand strong, stationary command from the outset. M.P. 202.12E: 2- and 2½-inch lines can protect exposures from defensive positions."
   },
   {
    "label": "Assign E2",
    "unit": "E2",
    "q": "Where do you send E2, and what task?",
    "opts": [
     {
      "t": "2nd geographic sector — the downwind exposures.",
      "c": [
       "Loss Stopped"
      ]
     },
     {
      "t": "Deck gun on the main body from the front of the lot.",
      "c": [
       "Fire Control"
      ]
     },
     {
      "t": "Water supply — reverse lay as E1's key pumper.",
      "c": []
     },
     {
      "t": "Hold as tactical reserve upwind in staging.",
      "c": []
     }
    ],
    "best": 0,
    "mp": "M.P. 202.18: \"First alarm for defensive operations should cover 2 geographical sectors,\" set up in order of priority — and exposures come before fire control."
   },
   {
    "label": "2nd engine placement",
    "unit": "E2",
    "cat": "unit",
    "q": "Where does the 2nd engine go?",
    "opts": [
     "Downwind — exposure side, outside the collapse zone",
     "Upwind — right next to E1 in front of the fire",
     "Hydrant — water supply position for E1's lines",
     "Staging until assigned, upwind and well out of the way"
    ],
    "best": 0,
    "mp": "Follows the E2 assignment: the second geographic sector is the downwind exposure side (M.P. 202.18), positioned outside the collapse zone (M.P. 202.12E)."
   },
   {
    "label": "Assign L1",
    "unit": "L1",
    "q": "Where do you send L1, and what task?",
    "opts": [
     {
      "t": "Aerial master stream from outside the collapse zone.",
      "c": [
       "Fire Control"
      ]
     },
     {
      "t": "Primary search of the unburned end of the frame.",
      "c": [
       "All Clear"
      ]
     },
     {
      "t": "Roof ventilation over the unburned section of the frame.",
      "c": [
       "Fire Control"
      ]
     },
     {
      "t": "Hold as tactical reserve with the aerial upwind.",
      "c": []
     }
    ],
    "best": 0,
    "mp": "M.P. 202.02B: master streams are generally the most effective defensive tactic. M.P. 202.12E: an aerial is a 1,000+ GPM appliance fed by a big-water forward and key pumper — and every member stays outside the collapse zone."
   },
   {
    "label": "Ladder placement",
    "unit": "L1",
    "cat": "unit",
    "q": "Where does the ladder go?",
    "opts": [
     "Upwind — master stream position",
     "Downwind — exposure side",
     "Roof position",
     "Staging until assigned"
    ]
   },
   {
    "label": "Assign E3",
    "unit": "E3",
    "q": "Where do you send E3, and what task?",
    "opts": [
     {
      "t": "Exposure protection on the next building over, downwind.",
      "c": [
       "Loss Stopped"
      ]
     },
     {
      "t": "Water supply — key pumper for L1's big-water feed.",
      "c": []
     },
     {
      "t": "2nd master stream on the main body of the fire.",
      "c": [
       "Fire Control"
      ]
     },
     {
      "t": "Hold as tactical reserve upwind in staging.",
      "c": []
     }
    ],
    "best": 1,
    "mp": "M.P. 202.12E: later companies should be ready to be assigned as key pumpers, and big-water ladder pipes need a forward and key pumper with two supply lines. M.P. 202.18: water supply is critical and takes time to build."
   },
   {
    "label": "Assign R3",
    "unit": "R3",
    "q": "Where do you send R3, and what task?",
    "opts": [
     {
      "t": "Safety / accountability sector.",
      "c": []
     },
     {
      "t": "RIT / rescue standby.",
      "c": []
     },
     {
      "t": "Medical / rehab sector.",
      "c": []
     },
     {
      "t": "Hold as tactical reserve.",
      "c": []
     }
    ],
    "mp": "No single MP answer. M.P. 202.18 hazards include rapid fire spread, toxic exposure, fatigue, heavy equipment and master streams. M.P. 201.06: forecast exhaustion and support personnel in advance. M.P. 202.01: Rescues stay retrievable for treatment and transport."
   },
   {
    "label": "Assign BC1",
    "unit": "BC1",
    "q": "Where do you send BC1, and what task?",
    "opts": [
     {
      "t": "Assume command — sectorize early, 2&1 to the most critical sector.",
      "c": []
     },
     {
      "t": "Safety and accountability at the edge of the collapse zone.",
      "c": []
     },
     {
      "t": "Exposure sector supervisor on the downwind side of the fire.",
      "c": []
     },
     {
      "t": "Staging officer for the 2nd alarm down at the upwind end of the street.",
      "c": []
     }
    ],
    "best": 0,
    "mp": "M.P. 201.01: the first Command Officer assumes command as IC #2. M.P. 202.18: \"Sectorize early (2&1 to most critical sector).\""
   },
   {
    "label": "Stretch check (hose)",
    "q": "What line do you bring, and how do you decide?",
    "opts": [
     "Master streams — 750 GPM or more, fed by relay or drafting, set up outside the collapse zone.",
     "2-inch handlines at 250 GPM — mobile enough to chase the fire around the lumber piles.",
     "1¾-inch at 150 GPM — fast to stretch, and on an outside fire speed matters more than flow.",
     "2½-inch handlines at 300 GPM worked right up to the frame for the best possible reach."
    ],
    "best": 0,
    "mp": "M.P. 202.02B: master streams of at least 750 GPM are the defensive guideline. M.P. 202.12E: on a defensive fire, shut down 1¾-inch lines — they are ineffective and let crews creep into the hazard zone."
   },
   {
    "label": "What’s happening inside? (update)",
    "cat": "sizeup",
    "q": "What’s happening inside? Update your read:",
    "opts": [
     "Structure collapsing — trusses failing, stay clear",
     "Fire contained to one section",
     "Smoke clearing, no extension seen",
     "Still unknown from outside"
    ],
    "mp": "M.P. 202.12E: whatever the read, Command and sector officers keep every member outside the collapse zone."
   },
   {
    "label": "Victim status (update)",
    "cat": "sizeup",
    "q": "Are people hurt? Update:",
    "opts": [
     "Still no reports of anyone inside",
     "Workers accounted for, no injuries",
     "Victims found — rescue underway",
     "Injuries confirmed — medical requested"
    ]
   },
   {
    "label": "MP reference",
    "q": "M.P. 202.18 High Piled Outside Combustible Storage — the lines that matter here: never over-commit before the critical factors are evaluated. Never assume it is a safe outside fire — use the same decision model as a structure fire. Never risk lives for property that is already lost. In most cases the correct call is defensive, and everyone must know the strategy. Objectives in order: firefighter safety, exposure protection, environmental protection, fire control. Water supply is critical; sectorize early with 2&1 to the most critical sector. Master streams at 750 GPM or more, from outside the collapse zone (M.P. 202.02B). Defensive from the start: tell Alarm no primary search will be completed.",
    "opts": [
     "Understood — show my debrief"
    ]
   },
   {
    "label": "Reposition",
    "q": "Conditions have changed. Where do you go now? Tap a number on the picture or pick from the list.",
    "hotspots": true,
    "mp": "No single right answer here. M.P. 202.18: keep re-forecasting fire spread, protect exposures in priority order, and keep everyone outside the collapse zone."
   }
  ]
 },
 {
  "id": "garageapt",
  "title": "Garage Apartments — Vehicle Fire Below Units",
  "sub": "M.P. 202.16 Car Fires · 202.04 Fire Control · 202.02C Rescue · Multi-family residential",
  "dispatch": "FD Haz Chan A1 · Inc #000214 · Vehicle Fire Into Structure · 3518 W. Palo Verde Dr, Phoenix · CODE 3 · 21:42 · Units: E1, L1, E2, E3, R3, BC1. Caller says a pickup is burning in the garages under the apartments, flames up the front of the building, tenants upstairs.",
  "arrival": "You arrive first on E1: a 2-story stucco apartment building with a row of ground-floor garages and apartments directly above them. A pickup is burning at the open bay on the far left, fire rolling up the opening toward the units overhead. Closed garage doors to the right, wood fence along the left. Tenant status unknown.",
  "image": "assets/scenarios/garage-apt-arrival.jpg",
  "imageAlt": "Arrival view: 2-story stucco apartment building, pickup truck burning at an open garage bay on the left with fire and smoke rolling up toward the apartments above, four closed garage doors, wood fence in the foreground, balcony unit on the right.",
  "hotspots": [
   {
    "kind": "move",
    "x": 41,
    "y": 10,
    "label": "Apartments above",
    "note": "Send search up to the units over the fire"
   },
   {
    "kind": "spray",
    "x": 19,
    "y": 55,
    "w": 16,
    "h": 34,
    "label": "Burning pickup / open bay",
    "note": "First water on the truck and the bay from a 45-degree angle",
    "c": [
     "Fire Control"
    ]
   },
   {
    "kind": "move",
    "x": 31,
    "y": 66,
    "label": "Next garage bay",
    "note": "Force the closed bay next door and check for extension"
   },
   {
    "kind": "move",
    "x": 90,
    "y": 16,
    "label": "Balcony unit",
    "note": "Check the exposed units at the far end"
   },
   {
    "kind": "move",
    "x": 8,
    "y": 80,
    "label": "Fence line",
    "note": "Walk the 360 around the fence"
   }
  ],
  "steps": [
   {
    "label": "Approach",
    "q": "You pull up. Where do you go first? Tap a number on the picture or pick from the list.",
    "hotspots": true,
    "best": 1,
    "mp": "M.P. 202.16: the minimum line for a vehicle fire is a 1¾-inch handline, and you \"initiate the fire attack from a 45-degree angle.\" M.P. 202.04: \"extinguishing the fire makes everything better.\" Knocking the truck down is what protects the units above while search goes up."
   },
   {
    "label": "Fireground factors",
    "q": "Size it up. What are the fireground factors here?",
    "opts": [
     "Building: 2-story apartments over a row of garages. Fire: one vehicle in a detached carport, no extension. Occupancy: residential, tenants out on the lawn.",
     "Building: 2-story stucco apartments, garages below with units directly above. Fire: pickup burning at an open bay, extending into the garage. Occupancy: multi-family, tenants unknown.",
     "Building: 1-story row of storage garages, no living space above. Fire: pickup burning at an open bay. Occupancy: storage, nobody inside at night.",
     "Building: 2-story stucco apartments, garages below. Fire: dumpster fire against the wall, light smoke. Occupancy: multi-family, tenants unknown."
    ],
    "best": 1,
    "mp": "M.P. 202.02B fireground factors: Building, Fire & Smoke, Life Hazard, Occupancy, Arrangement, Resources. Here the arrangement is the whole problem — a working vehicle fire in a garage with occupied units on top of it."
   },
   {
    "label": "Risk profile",
    "q": "What is your risk profile on this fire?",
    "opts": [
     "Risk a little — it's only a car fire; protect the building and stay out of the garage.",
     "Risk nothing — a burning truck with a fuel tank is too dangerous to approach.",
     "Risk a lot, in a calculated manner — savable lives likely in the units above the fire.",
     "Risk a lot — save the truck and the garage contents before they're lost."
    ],
    "best": 2,
    "mp": "M.P. 202.02B: \"We will risk our lives a lot, in a calculated manner, to save SAVABLE lives.\" Night call, occupied units directly over a working fire — that's savable lives until a primary search says otherwise."
   },
   {
    "label": "Strategy",
    "q": "What strategy do you declare?",
    "opts": [
     "Offensive on the truck, defensive on the building above",
     "Defensive — let the truck burn and protect the units",
     "Offensive — search above and attack the fire",
     "Hold the strategy until BC1 arrives and decides"
    ],
    "best": 2,
    "mp": "M.P. 202.02B: avoid \"simultaneous OFFENSIVE and DEFENSIVE strategies in the same fire area.\" The truck and the units above are one fire area. Declare offensive and put it in your on-scene report."
   },
   {
    "label": "Incident action plan",
    "q": "What is your IAP?",
    "opts": [
     "Fire attack on the truck only — it's a vehicle fire, no search of the units needed",
     "Search the units above and attack the truck and garage, with support work behind it",
     "Protect the units above with a line and let the truck burn itself out in the bay",
     "Evacuate the building first, then start the fire attack on the truck"
    ],
    "best": 1,
    "mp": "Offensive IAP: a controlled, aggressive search and fire attack with support operations (ventilation, salvage, overhaul). M.P. 202.02C: the IC \"shall direct a primary search in all involved and exposed occupancies.\" The let-it-burn option in 202.16 is for vehicles with no life hazard or exposure."
   },
   {
    "label": "Tactical priorities",
    "q": "In what order do you work the tactical priorities?",
    "opts": [
     "Fire Control → All Clear (primary search) → Loss Stopped",
     "All Clear (primary search) → Fire Control → Loss Stopped",
     "Loss Stopped → Fire Control → All Clear (primary search)",
     "All Clear (primary search) → Loss Stopped → Fire Control"
    ],
    "best": 1,
    "mp": "M.P. 202.02C: \"Life safety is the highest tactical priority.\" All Clear, Fire Control, Loss Stopped — but in a working fire the attack runs at the same time as the search, because knocking the fire down protects the people above."
   },
   {
    "label": "On-scene report",
    "q": "Give your on-scene report — which version do you send?",
    "opts": [
     "E1 on scene, 3518 W. Palo Verde. Medium 2-story apartment building, working vehicle fire in a ground-floor garage extending up toward the units above. E1 is attacking with a 1¾-inch line and starting search. This is an offensive fire. E1 will be Palo Verde Command.",
     "E1 on scene, 3518 W. Palo Verde. Medium 2-story apartment building, working vehicle fire in a ground-floor garage extending up toward the units above. E1 is attacking with a 1¾-inch line and starting search. E1 will be Palo Verde Command.",
     "E1 on scene, 3518 W. Palo Verde. Working vehicle fire in a garage. E1 is attacking with a 1¾-inch line and starting search. This is an offensive fire. Give me the balance of a 1st Alarm, E1 will be North side accountability.",
     "E1 on scene, 3518 W. Palo Verde. Medium 2-story apartment building, working vehicle fire in a ground-floor garage extending up toward the units above. E1 is attacking with a 1¾-inch line and starting search. This is an offensive fire."
    ],
    "best": 0,
    "mp": "M.P. 201.01 on-scene report: unit on scene, building description (occupancy, size, height), conditions, action taken, declaration of strategy, command confirmation with name. Missing strategy or command name leaves incoming units guessing; accountability and resources belong in the follow-up."
   },
   {
    "label": "Follow-up report",
    "q": "E1 is on the attack. Give your follow-up report — which version do you send?",
    "opts": [
     "Palo Verde Command to Alarm — offensive fire, E1 attacking with a 1¾-inch line. Primary search is underway in the units upstairs. Give me the balance of a 1st Alarm.",
     "Palo Verde Command to Alarm — vehicle hazards, keep clear of the bumpers. E1 will be Side A accountability. Give me the balance of a 1st Alarm. E1 has an IRIC in place.",
     "Palo Verde Command to Alarm — vehicle hazards, keep clear of the bumpers. Give me the balance of a 1st Alarm. E1 has an IRIC in place. Will advise on conditions.",
     "Palo Verde Command to Alarm — E1 will be Side A accountability. Return E3 and R3, we have this handled. E1 has an IRIC in place."
    ],
    "best": 1,
    "mp": "M.P. 201.01 follow-up report: immediate safety concerns, accountability started (announce the location), disposition of resources (hold/add/return), IRIC in place. Strategy already went out in the on-scene report — don't repeat it here at the expense of accountability."
   },
   {
    "label": "Initial 3 & 1",
    "q": "How do you run the initial 3 & 1?",
    "opts": [
     "All 4 companies to IAP tasks right away; the tactical reserve comes from the next alarm up.",
     "First 2 companies to IAP tasks, 2 held as reserve until the fire is out.",
     "First 3 companies to IAP tasks, 1 held as tactical reserve; ask for more before using it.",
     "Commit the reserve first to the hardest task, then call for more resources."
    ],
    "best": 2,
    "mp": "Command deck and M.P. 201.06: deploy enough resources to address the IAP plus a tactical reserve, and request more resources before you assign your tactical reserve."
   },
   {
    "label": "Garage construction",
    "cat": "sizeup",
    "q": "Size-up: the units sit right on top of the garages. What does that tell you?",
    "opts": [
     "Nothing much — stucco and drywall make the garage a fire-rated box.",
     "The floor of the units is the garage ceiling — fire in the bay attacks it directly.",
     "Only the garage door matters; the floor above is concrete in every apartment building.",
     "The units are safe until the fire breaks out the 2nd-floor windows."
    ],
    "best": 1,
    "mp": "M.P. 202.05: \"light weight truss and bar joist roof construction can be expected to fail after minimal fire exposure.\" Don't assume what's over the bay — size up the ceiling and the floor above early."
   },
   {
    "label": "Closed bays",
    "cat": "sizeup",
    "q": "The bays next to the burning truck are closed. What do you do with them?",
    "opts": [
     "Leave them shut — opening them now only feeds the fire in the truck.",
     "Treat them as exposures: force them with a line ready, check for extension.",
     "Open every bay right away to vent the smoke and heat out of the whole garage.",
     "Ignore them — the fire is in one bay and the walls will hold it there."
    ],
    "best": 1,
    "mp": "M.P. 202.02B: \"Fires cannot be considered under control until all seven sides are addressed.\" Size up what is not burning yet — the next bay and the space above it are where the fire is going."
   },
   {
    "label": "Vehicle hazards",
    "cat": "sizeup",
    "q": "Approaching the truck — what can hurt your crew?",
    "opts": [
     "Bumper struts, hood and tailgate lift cylinders, tires and rims, the fuel tank.",
     "Only the airbags — once they deploy the truck is safe to work around.",
     "Only the battery — disconnect it and every other hazard goes away.",
     "Nothing unusual — gas trucks are the safe ones; only EVs are dangerous."
    ],
    "best": 0,
    "mp": "M.P. 202.16: heated bumper cylinders can release the bumper assembly — \"Bumper assemblies have been known to travel 25 feet.\" Lift cylinders can fly open, tires and rims can explode. Approach from a 45-degree angle, out of the bumper path."
   },
   {
    "label": "Fuel tank",
    "q": "Fire is impinging on the truck's fuel tank. What do you do?",
    "opts": [
     "Pull the gas cap to relieve the pressure before it ruptures.",
     "Put a straight stream into the fill opening to cool the tank from inside.",
     "Cool the area around the tank; don't pull the cap or flow into the fill.",
     "Back everyone off and switch to dry chemical only — never water on fuel."
    ],
    "best": 2,
    "mp": "M.P. 202.16: \"Do not remove gas cap, as tank may have become pressurized. Do not direct hose stream into tank\" — it can spew burning fuel. First water goes on for several seconds to cool down the area around the fuel tank."
   },
   {
    "label": "What’s happening inside?",
    "cat": "sizeup",
    "q": "What’s happening inside? Your first read:",
    "opts": [
     "Fire in the open bay, smoke pushing into the garage and up the front",
     "Smoke getting into the units above the garage",
     "Fire already through the garage ceiling into the units",
     "Unknown — no interior report yet"
    ]
   },
   {
    "label": "Victim status",
    "cat": "sizeup",
    "q": "Are people hurt? What do you know right now?",
    "opts": [
     "Unknown — tenants upstairs not accounted for",
     "A tenant on the balcony says everyone is out",
     "Tenants possibly still inside the units above",
     "Injuries reported — burns on the truck owner"
    ],
    "mp": "M.P. 202.02C: \"Command and operating companies cannot depend solely upon reports from residents and spectators\" — complete a primary search wherever entry is possible."
   },
   {
    "label": "Attack flow",
    "q": "How do you attack it?",
    "opts": [
     "Knock the truck down from outside, then push in (transitional to interior)",
     "Hit it from outside only — stay exterior and drown the truck and bay"
    ],
    "best": 0,
    "mp": "M.P. 202.04: a transitional attack \"should be considered when you are passing fire to fight fire and/or conditions need to be changed from the exterior prior to making entry.\" Darken the truck, then get into the bay to check the ceiling and walls."
   },
   {
    "label": "Go interior",
    "showIf": {
     "label": "Attack flow",
     "match": "interior"
    },
    "q": "The truck is knocked down and you push into the garage — then what?",
    "opts": [
     "Pop the hood and the tailgate right away to finish off the truck",
     "Open up the ceiling and walls over the bay, check for extension",
     "Open every bay door to vent the smoke out of the garage",
     "Leave the garage and go straight upstairs to search the units"
    ],
    "best": 1,
    "mp": "M.P. 202.02B: \"Where the fire involves concealed spaces (attics, ceiling areas, construction voids, etc.), it becomes paramount that companies identify and operate fire streams into such areas.\" The space over the bay is a concealed space under occupied units."
   },
   {
    "label": "Line selection",
    "q": "What line do you pull for the truck and the garage?",
    "opts": [
     "Dry chemical first; pull a line only if it won't go out",
     "1¾-inch handline minimum — residential flow, 150 GPM",
     "2½-inch — it's a structure fire now, so go big",
     "The front bumper line on low pressure, one firefighter"
    ],
    "best": 1,
    "mp": "M.P. 202.16: \"The minimum size of hose line to initiate an attack on a vehicle fire is the 1 ¾ inch handline,\" and water is best except in a large fuel fire. M.P. 202.04: residential flow is 150 GPM on a 1¾-inch line."
   },
   {
    "label": "Search priority",
    "q": "Where does the primary search go first?",
    "opts": [
     "The balcony unit on the far end — that's where the caller is",
     "The units on the far end first, then work your way back toward the fire bay",
     "The units directly over the burning bay, then the neighbors, then the rest",
     "The garages — check the bays for people before going upstairs"
    ],
    "best": 2,
    "mp": "M.P. 202.02C: search the \"most severely threatened\" first, then the largest number, the remainder of the fire area, and the exposed areas. Smoke and heat rise — the units right over the bay are the most threatened."
   },
   {
    "label": "Smoke spread",
    "q": "Smoke is pushing into the units above. What does command do?",
    "opts": [
     "Evaluate where the smoke is going and evacuate the affected units",
     "Leave everyone in place — moving tenants clogs the stairs",
     "Pressurize the units with fans from the street before anyone searches them",
     "Wait for the truck to be out before moving anyone"
    ],
    "best": 0,
    "mp": "M.P. 202.16: \"If the garage is attached to an occupied structure, command must evaluate smoke spread and evacuate occupants from the affected areas.\" M.P. 202.02C allows sheltering in place only where occupants are safer in their rooms."
   },
   {
    "label": "Crew of 4",
    "kind": "crew",
    "q": "Deploy your 4-person engine crew — who does what?",
    "opts": [
     {
      "t": "Officer + 1 firefighter to search the units above, 2 on the attack line on the truck.",
      "c": [
       "All Clear",
       "Fire Control"
      ]
     },
     {
      "t": "All 4 on the truck — put the vehicle out first, then think about search.",
      "c": [
       "Fire Control"
      ]
     },
     {
      "t": "Officer runs command from the street, 3 firefighters search upstairs, no line.",
      "c": [
       "All Clear"
      ]
     },
     {
      "t": "2 on the attack line, 2 pulling a second line to the far end of the building.",
      "c": [
       "Fire Control",
       "Loss Stopped"
      ]
     }
    ],
    "best": 0,
    "mp": "M.P. 202.04: \"When possible, search and rescue efforts should be performed simultaneously with fire attack.\" M.P. 202.02B: \"Search, rescue and fire attack are simultaneous operations.\""
   },
   {
    "label": "Apparatus placement",
    "cat": "unit",
    "q": "Where does E1 park for this one?",
    "opts": [
     "Nose-in to the open bay so the crosslay reaches without a stretch",
     "Upwind and uphill if you can, angled so the crosslays pull clean",
     "Downhill of the garage so the runoff drains away from the rig",
     "Around the corner out of sight — keep the street open for L1"
    ],
    "best": 1,
    "mp": "M.P. 202.16: \"Apparatus should be placed upwind and uphill of the incident if possible\" to stay out of fuel and vapors, and angled \"to better allow the removal of any hose from the preconnected cross-lay compartments.\""
   },
   {
    "label": "Assign E2",
    "unit": "E2",
    "q": "Where do you send E2, and what task?",
    "opts": [
     {
      "t": "Water supply into E1 from the hydrant down the street.",
      "c": []
     },
     {
      "t": "2nd line to the units above — protect the search, check extension.",
      "c": [
       "All Clear",
       "Fire Control"
      ]
     },
     {
      "t": "Exposure line on the apartment building next door, on the west side.",
      "c": [
       "Loss Stopped"
      ]
     },
     {
      "t": "Backup / RIT standing by for the interior crews at the bay.",
      "c": []
     },
     {
      "t": "Hold as tactical reserve until the 1st Alarm arrives.",
      "c": []
     }
    ],
    "best": 1,
    "mp": "M.P. 202.02C: \"hose lines must be placed in a manner to control interior access, confine the fire, and protect avenues of escape.\" The second line goes where the people are — over the fire."
   },
   {
    "label": "Assign L1",
    "unit": "L1",
    "q": "Where do you send L1, and what task?",
    "opts": [
     {
      "t": "Search & rescue in the units above, ladders to windows and the balcony.",
      "c": [
       "All Clear"
      ]
     },
     {
      "t": "Vertical ventilation on the roof over the garage right now, ahead of E1's line.",
      "c": [
       "Fire Control"
      ]
     },
     {
      "t": "Force every closed garage door with the saw to vent the bays.",
      "c": [
       "Fire Control"
      ]
     },
     {
      "t": "Hold as tactical reserve until the 1st Alarm companies arrive.",
      "c": []
     }
    ],
    "best": 0,
    "mp": "M.P. 202.02C: use normal interior access to remove victims whenever possible; secondary means — \"aerial platforms and ladders, ground ladders\" — \"in their order of effectiveness.\" Uncoordinated ventilation makes it worse (202.04)."
   },
   {
    "label": "Assign E3",
    "unit": "E3",
    "q": "Where do you send E3, and what task?",
    "opts": [
     {
      "t": "Exposure line on the apartment building next door.",
      "c": [
       "Loss Stopped"
      ]
     },
     {
      "t": "3rd line into the garage behind E1's attack line, checking extension.",
      "c": [
       "Fire Control"
      ]
     },
     {
      "t": "Second water supply from the hydrant on the corner.",
      "c": []
     },
     {
      "t": "Hold as tactical reserve, on deck near the command post.",
      "c": []
     }
    ],
    "best": 3,
    "mp": "Command deck (3 & 1): first 3 companies to IAP tasks, 1 held as tactical reserve. M.P. 201.06: \"Command must provide for a tactical reserve of fire companies.\" Ask for more resources before you commit it."
   },
   {
    "label": "Assign R3",
    "unit": "R3",
    "q": "Where do you send R3, and what task?",
    "opts": [
     {
      "t": "Medical — set up treatment for tenants coming out.",
      "c": []
     },
     {
      "t": "Primary search with E1 in the units upstairs.",
      "c": [
       "All Clear"
      ]
     },
     {
      "t": "Cut the burning truck's battery cable to disable it.",
      "c": []
     },
     {
      "t": "Hold as a second tactical reserve behind E3.",
      "c": []
     }
    ],
    "best": 0,
    "mp": "M.P. 202.02C: \"Command must structure treatment of victims after removal,\" with multiple victims brought to one location for triage and treatment."
   },
   {
    "label": "Assign BC1",
    "unit": "BC1",
    "q": "Where do you send BC1, and what task?",
    "opts": [
     {
      "t": "Take command by transfer — E1 officer stays with the crew.",
      "c": []
     },
     {
      "t": "Roof sector over the garage to watch for extension into the units.",
      "c": []
     },
     {
      "t": "Division supervisor for the 2nd-floor units.",
      "c": []
     },
     {
      "t": "Staging officer for the 1st Alarm companies.",
      "c": []
     }
    ],
    "best": 0,
    "mp": "M.P. 201.01: fast-attack command \"should not last more than a few minutes\" and ends when command is transferred to a later-arriving command officer working from a command post outside the hazard zone."
   },
   {
    "label": "Stretch check (hose)",
    "q": "What line do you bring, and how do you decide?",
    "opts": [
     "1¾-inch — walk it: curb to the bay, plus enough to work the truck and push into the garage.",
     "2-inch — walk it the same way: curb to the bay, plus enough to work the truck and push inside.",
     "1¾-inch — whatever is on top of the bed; the garage is close enough not to measure.",
     "Biggest line on the rig — the length doesn't matter as long as the flow is big."
    ],
    "best": 0,
    "mp": "M.P. 202.04: attack lines must be \"of adequate length and size for the desired water flow\" — size up the distance and obstacles before you stretch. Residential flow is 150 GPM on 1¾-inch."
   },
   {
    "label": "What’s happening inside? (update)",
    "cat": "sizeup",
    "q": "What’s happening inside? Update your read:",
    "opts": [
     "Truck knocked down, fire held to the bay — no extension above",
     "Fire found in the garage ceiling below the unit over the bay",
     "Smoke in the units above, clearing with ventilation",
     "Still unknown from outside"
    ]
   },
   {
    "label": "Victim status (update)",
    "cat": "sizeup",
    "q": "Are people hurt? Update:",
    "opts": [
     "All Clear upstairs — tenants out, no injuries",
     "One tenant removed from the unit over the bay — smoke inhalation",
     "Still waiting on the primary search",
     "Truck owner with minor burns — R3 treating"
    ]
   },
   {
    "label": "Loss stopped",
    "q": "Fire is knocked down. What gets you to Loss Stopped?",
    "opts": [
     "Pick up and go — the truck is out and nothing else burned",
     "Check above the bay and next door for heat; salvage the units",
     "Overhaul the truck down to bare metal, then release the scene",
     "Have the tenants check their own units for damage and report back"
    ],
    "best": 1,
    "mp": "Command deck: \"Loss stopped\" is the third tactical priority — offensive IAP includes salvage and overhaul. M.P. 202.02B: the fire isn't under control until all seven sides — including the top — are addressed."
   },
   {
    "label": "MP reference",
    "q": "M.P. 202.16 Car Fires — the lines that matter here: minimum 1¾-inch handline, attack from a 45-degree angle. Bumper assemblies \"have been known to travel 25 feet.\" Do not remove the gas cap or direct a stream into the fuel tank. Apparatus upwind and uphill. If the garage is attached to an occupied structure, evaluate smoke spread and evacuate the affected areas. M.P. 202.02C: primary search in all involved and exposed occupancies — most threatened first.",
    "opts": [
     "Understood — show my debrief"
    ]
   }
  ]
 },
 {
  "id": "ranch",
  "title": "Ranch — First-Due Command",
  "sub": "M.P. 201.01 Command · 202.02B Strategy · 202.04 Fire Control · Learn the command process",
  "dispatch": "FD Haz Chan A1 · Inc #000317 · House Fire · 3016 W. Mariposa St, Phoenix · CODE 3 · 14:08 · Units: E1, L1, E2, E3, R3, BC1. Neighbor reports black smoke from the front of the house; does not know if anyone is home.",
  "arrival": "You arrive first on E1: a 1-story ranch house, painted block, pitched shingle roof. Fire and heavy black smoke from a front window just left of the front door on Side A. Carport and driveway on the right, block wall and gate on the left. Occupants unknown.",
  "image": "assets/scenarios/ranch-arrival.jpg",
  "imageAlt": "Arrival view: 1-story ranch house with a pitched shingle roof, fire glowing in a front window left of the front door with a heavy black smoke column, front lawn, carport and driveway on the right, wood gate on the left.",
  "hotspots": [
   {
    "kind": "move",
    "x": 51,
    "y": 56,
    "label": "Front door",
    "note": "Make entry at the front door"
   },
   {
    "kind": "spray",
    "x": 39,
    "y": 49,
    "w": 9,
    "h": 11,
    "label": "Fire window",
    "note": "Reset the fire from outside, then go in",
    "c": [
     "Fire Control"
    ]
   },
   {
    "kind": "move",
    "x": 19,
    "y": 50,
    "label": "Bedroom window",
    "note": "Check the bedroom next to the fire room"
   },
   {
    "kind": "move",
    "x": 85,
    "y": 70,
    "label": "Carport",
    "note": "Walk the 360 up the driveway"
   },
   {
    "kind": "move",
    "x": 4,
    "y": 57,
    "label": "Side gate",
    "note": "Walk the 360 through the side gate"
   }
  ],
  "steps": [
   {
    "label": "Approach",
    "q": "You pull up. Where do you go first? Tap a number on the picture or pick from the list.",
    "hotspots": true,
    "best": 1,
    "mp": "M.P. 202.04: a transitional attack \"should be considered when... conditions need to be changed from the exterior prior to making entry.\" M.P. 202.02B: before entry, reset the fire with a straight stream to the ceiling of the fire compartment for 15–30 seconds — then go in aggressively. Get the 360 done as soon as you can (202.02C)."
   },
   {
    "label": "Fireground factors",
    "q": "Size it up. What are the fireground factors here?",
    "opts": [
     "Building: 1-story ranch, pitched roof, block walls. Fire: front room left of the door, fire and heavy black smoke from the window. Occupancy: residential, occupants unknown.",
     "Building: 1-story ranch, flat roof, wood frame. Fire: carport fire extending into the attic. Occupancy: residential, occupants unknown.",
     "Building: 1-story ranch, pitched roof, block walls. Fire: front room left of the door, light smoke only. Occupancy: residential, confirmed empty.",
     "Building: 2-story house, pitched roof. Fire: 2nd-floor bedroom over the front door, heavy smoke. Occupancy: residential, occupants unknown."
    ],
    "best": 0,
    "mp": "M.P. 202.02B fireground factors: Building, Fire & Smoke, Life Hazard, Occupancy, Arrangement, Resources. Occupants unknown is not occupants out — it's a life hazard until the primary search says otherwise."
   },
   {
    "label": "Risk profile",
    "q": "What is your risk profile on this fire?",
    "opts": [
     "Risk a little — protect the property; nobody is confirmed inside.",
     "Risk nothing — the smoke is black and heavy; this one is lost.",
     "Risk a lot — the house is savable, so commit every company and everything to it.",
     "Risk a lot, in a calculated manner — occupants unknown, the house is savable."
    ],
    "best": 3,
    "mp": "M.P. 202.02B: \"We will risk our lives a lot, in a calculated manner, to save SAVABLE lives.\" A room-and-contents fire in an occupied-type house at 2 p.m. with occupants unknown — you're searching."
   },
   {
    "label": "Strategy",
    "q": "What strategy do you declare?",
    "opts": [
     "Defensive until the smoke lightens up",
     "Offensive — search and attack from the inside",
     "Marginal — hold outside and wait and see",
     "Hold the strategy until BC1 arrives and decides"
    ],
    "best": 1,
    "mp": "M.P. 202.02B: \"Fireground strategy is determined and declared by the Incident Commander on all structure fire incidents,\" and the initial IC includes it in the on-scene report. Everyone must operate in the same strategy."
   },
   {
    "label": "Incident action plan",
    "q": "What is your IAP?",
    "opts": [
     "Fire attack first; search only after the fire is knocked down",
     "Exposure protection on both neighbors, then fire attack",
     "Primary search and fire attack, ventilation and salvage in support",
     "Primary search only — no water on the fire until the All Clear comes"
    ],
    "best": 2,
    "mp": "Offensive IAP: a controlled, aggressive search and fire attack that provides for firefighter safety and support operations (ventilation, salvage, overhaul). \"IAP achieves tactical priorities.\""
   },
   {
    "label": "Tactical priorities",
    "q": "In what order do you work the tactical priorities?",
    "opts": [
     "Fire Control → All Clear (primary search) → Loss Stopped",
     "Loss Stopped → Fire Control → All Clear (primary search)",
     "All Clear (primary search) → Loss Stopped → Fire Control",
     "All Clear (primary search) → Fire Control → Loss Stopped"
    ],
    "best": 3,
    "mp": "Command deck: Search & Rescue = All Clear; Fire under control = Fire Control; Loss stopped = Loss Stopped. M.P. 202.02C: \"Life safety is the highest tactical priority on the fireground.\""
   },
   {
    "label": "Command mode",
    "q": "M.P. 201.01: which command option fits this arrival?",
    "opts": [
     "Investigative — mobile IC on a portable, looking for the problem",
     "Fast attack — give the report, go in with the crew on a portable",
     "Command mode — stay at the rig and send the rest of the crew in alone",
     "No command — it's one house, the BC will set it up"
    ],
    "best": 1,
    "mp": "M.P. 201.01: fast attack fits a \"visible working fire in a house or small commercial occupancy\" where the officer's direct involvement makes a difference. It should last only a few minutes and ends with stabilization or transfer of command."
   },
   {
    "label": "On-scene report",
    "q": "Give your on-scene report — which version do you send?",
    "opts": [
     "E1 on scene, 3016 W. Mariposa. Small 1-story house, working fire in a front room with heavy black smoke. E1 is pulling a 1¾-inch line for search and fire attack. Give me the balance of a 1st Alarm. E1 will be Mariposa Command.",
     "E1 on scene, 3016 W. Mariposa. Small 1-story house, working fire in a front room with heavy black smoke. E1 is pulling a 1¾-inch line for search and fire attack. This is an offensive fire. E1 will be Mariposa Command.",
     "E1 on scene, 3016 W. Mariposa. Working fire, heavy black smoke. E1 is pulling a 1¾-inch line for search and fire attack. This is an offensive fire. E1 will be Front side accountability. E1 will be Mariposa Command.",
     "E1 on scene, 3016 W. Mariposa. Small 1-story house, working fire in a front room with heavy black smoke. This is an offensive fire. E1 has an IRIC in place. E1 will be Mariposa Command."
    ],
    "best": 1,
    "mp": "M.P. 201.01 on-scene report, in order: clear alarm, unit on scene, building (occupancy, size, height), conditions, action taken, strategy, command confirmation with name. Resources, accountability and IRIC go in the follow-up."
   },
   {
    "label": "Follow-up report",
    "q": "Line is going in. Give your follow-up report — which version do you send?",
    "opts": [
     "Mariposa Command to Alarm — offensive fire, E1 going in for search and attack. Give me the balance of a 1st Alarm. Will advise on conditions.",
     "Mariposa Command to Alarm — E1 will be Side A accountability. Give me the balance of a 1st Alarm. E1 has an IRIC in place.",
     "Mariposa Command to Alarm — E1 will be Side A accountability. Return all other units; one line will handle it. E1 has an IRIC in place.",
     "Mariposa Command to Alarm — small 1-story house, fire in a front room, heavy black smoke. E1 has an IRIC in place. Will advise."
    ],
    "best": 1,
    "mp": "M.P. 201.01 follow-up report: any immediate safety concerns, accountability started (announce the initial accountability location), disposition of resources (hold/add/return), IRIC in place and identified. Example: \"Engine 11 will be North side accountability. Give me the balance a 1st Alarm; Engine 11 has an IRIC in place.\""
   },
   {
    "label": "IRIC",
    "q": "You and one firefighter go in for a rapid search. Who is your IRIC?",
    "opts": [
     "Nobody yet — L1 will be RIC when it arrives in a few minutes",
     "The engineer alone, running the pump and watching the front door for you",
     "Engineer and the other firefighter, one monitoring the tactical channel",
     "A neighbor who knows the house, standing by at the front door"
    ],
    "best": 2,
    "mp": "M.P. 201.05A: when a rapid search by the first-arriving 4-person crew can resolve a life hazard, \"a Firefighter and Engineer can fill this role while the IC and the other firefighter conduct a rapid search.\" One member monitors the tactical channel; both stand ready to help."
   },
   {
    "label": "Initial 3 & 1",
    "q": "How do you run the initial 3 & 1?",
    "opts": [
     "First 3 companies to IAP tasks, 1 held as tactical reserve; ask for more before using it.",
     "All 4 companies to IAP tasks right away; the reserve comes from the next alarm.",
     "First 2 companies to IAP tasks, 2 held in reserve until the fire is out.",
     "Commit the reserve first to the hardest task, then call for more resources."
    ],
    "best": 0,
    "mp": "Command deck: deploy resources to address the IAP and achieve tactical priorities, plus a tactical reserve — and request more resources before you assign your tactical reserve."
   },
   {
    "label": "Tactical reserve",
    "q": "E2 reports a second room involved and needs another line. Your reserve is E3. What now?",
    "opts": [
     "Send E3 in now and hope the 1st Alarm companies show up fast",
     "Request more resources, then commit E3 to the second line",
     "Pull E2 out and give the room to E3 when it's ready",
     "Hold E3 and tell E2 to make do with one line"
    ],
    "best": 1,
    "mp": "Command deck: \"request more resources before you assign your tactical reserve.\" M.P. 201.06: \"The early call for additional resources will tend to consistently save the day.\""
   },
   {
    "label": "Roof type",
    "cat": "sizeup",
    "q": "Size-up: what roof type do you see?",
    "opts": [
     "Pitched shingle roof",
     "Flat built-up roof",
     "Pitched concrete tile roof",
     "Can’t tell from here"
    ]
   },
   {
    "label": "Construction",
    "cat": "sizeup",
    "q": "Size-up: what is the construction?",
    "opts": [
     "Block walls, wood roof framing",
     "Wood frame with stucco exterior",
     "Steel frame, metal panels",
     "Can’t tell from here"
    ]
   },
   {
    "label": "What’s happening inside?",
    "cat": "sizeup",
    "q": "What’s happening inside? Your first read:",
    "opts": [
     "Fire in one front room, smoke filling the house",
     "Fire through the ceiling into the attic",
     "Smoke only — fire hidden in a back room",
     "Unknown — no interior report yet"
    ]
   },
   {
    "label": "Victim status",
    "cat": "sizeup",
    "q": "Are people hurt? What do you know right now?",
    "opts": [
     "Unknown — neighbor doesn't know if anyone is home",
     "A car in the carport — someone may be home",
     "Neighbor now says the owner is at work",
     "Injuries reported — neighbor burned trying to get in"
    ],
    "mp": "M.P. 202.02C: don't depend solely on reports from residents and spectators. Every fire starts with \"the expectation that we will encounter fire and smoke conditions that are endangering the occupants.\""
   },
   {
    "label": "Attack flow",
    "q": "How do you attack it?",
    "opts": [
     "Reset the fire from outside, then move interior (transitional attack)",
     "Hit it from outside only — stay exterior and drown the room"
    ],
    "best": 0,
    "mp": "M.P. 202.02B: \"This tactic must be followed by an aggressive interior attack to complete fire extinguishment and evacuate any victims.\" An exterior-only hit doesn't search the house."
   },
   {
    "label": "Go interior",
    "showIf": {
     "label": "Attack flow",
     "match": "interior"
    },
    "q": "You go interior — then what?",
    "opts": [
     "Push past the fire room and search the bedrooms down the hall",
     "Hit the fire room from the doorway — cool the ceiling, then the fuel",
     "Open every window you pass to clear the smoke out ahead of you",
     "Pull ceilings in the living room to check the attic before attacking"
    ],
    "best": 1,
    "mp": "M.P. 202.04: \"Interior surface cooling with water, then followed by water application to the burning fuels/contents is the most effective extinguishing tactic.\" Search runs simultaneously with the attack — your partner searches while the line holds the fire room."
   },
   {
    "label": "Reset",
    "q": "M.P. 202.02B: how do you reset the fire from outside before entry?",
    "opts": [
     "Fog pattern into the window until the smoke turns white",
     "Straight stream off the ceiling of the fire room for 15–30 seconds",
     "Wide fog into the window for a full minute, then wait for it to vent",
     "Straight stream into the front door to push the fire back"
    ],
    "best": 1,
    "mp": "M.P. 202.02B: \"reset or darken down the fire using a straight stream applied to the ceiling of the fire compartment. 15-30 seconds of water applied in this manner will dramatically reduce temperatures and improve tenability.\""
   },
   {
    "label": "Entry point",
    "q": "The fire window is right next to the front door. Which door and why?",
    "opts": [
     "The closest door to the rig — it's the fastest line",
     "The back door — go in opposite the fire so you don't push it",
     "The air intake side of the flow path, air at your back",
     "Whichever door is unlocked — save the forcible entry"
    ],
    "best": 2,
    "mp": "M.P. 202.02B: \"Make every effort to enter the structure at the air intake side of the flow path. You want the air at your back.\" M.P. 202.04 tactical consideration: the closest door to the apparatus should not dictate line placement."
   },
   {
    "label": "Flow",
    "q": "M.P. 202.04: what flow does a residential fire get?",
    "opts": [
     "250 GPM — 2-inch line with a smooth bore.",
     "150 GPM — 1¾-inch line with an automatic nozzle.",
     "300 GPM — 2½-inch line with a smooth bore nozzle.",
     "500 GPM — portable monitor from the yard."
    ],
    "best": 1,
    "mp": "M.P. 202.04: residential — \"150 GPM – (2.5 gallons per second) (1.75\" hose lines with automatic nozzles).\""
   },
   {
    "label": "Crew of 4",
    "kind": "crew",
    "q": "Deploy your 4-person engine crew — who does what?",
    "opts": [
     {
      "t": "All 4 on the attack line — put the fire out first, then search after.",
      "c": [
       "Fire Control"
      ]
     },
     {
      "t": "Officer + 1 in with the line to search and attack; engineer + firefighter as IRIC.",
      "c": [
       "All Clear",
       "Fire Control"
      ]
     },
     {
      "t": "Officer runs command from the street, 3 firefighters search with no line.",
      "c": [
       "All Clear"
      ]
     },
     {
      "t": "2 on the attack line, 2 pulling exposure lines to both neighbors.",
      "c": [
       "Fire Control",
       "Loss Stopped"
      ]
     }
    ],
    "best": 1,
    "mp": "M.P. 202.02B: \"Address 2 in / 2 out decision prior to entry\" and \"Search, rescue and fire attack are simultaneous operations.\" M.P. 201.05A: firefighter and engineer as IRIC while the IC and the other firefighter search."
   },
   {
    "label": "Assign E2",
    "unit": "E2",
    "q": "Where do you send E2, and what task?",
    "opts": [
     {
      "t": "Back up E1 with a 2nd line and finish the primary search.",
      "c": [
       "All Clear",
       "Fire Control"
      ]
     },
     {
      "t": "Exposure protection on both neighbors' houses right away.",
      "c": [
       "Loss Stopped"
      ]
     },
     {
      "t": "Water supply into E1 from the hydrant at the corner.",
      "c": []
     },
     {
      "t": "Hold as tactical reserve until the 1st Alarm arrives.",
      "c": []
     }
    ],
    "best": 0,
    "mp": "M.P. 202.04 Basic Offensive Plan: \"Support fire attack from the next most advantageous position with appropriate water volume\" and conduct the primary search in coordination with fire attack."
   },
   {
    "label": "2nd engine placement",
    "unit": "E2",
    "cat": "unit",
    "q": "Where does the 2nd engine go?",
    "opts": [
     "Hydrant — bring a supply line to E1",
     "Nose-in on the lawn at the front door",
     "Behind E1 at the curb, no supply",
     "Staging two blocks out until assigned"
    ],
    "best": 0,
    "mp": "M.P. 202.04: E1 carries about 500 gallons. \"The establishment of an uninterrupted water supply for declared working fires can be a critical component\" of an effective and safe attack."
   },
   {
    "label": "Assign L1",
    "unit": "L1",
    "q": "Where do you send L1, and what task?",
    "opts": [
     {
      "t": "Vertical ventilation over the fire, coordinated with E1's attack.",
      "c": [
       "Fire Control"
      ]
     },
     {
      "t": "Vertical ventilation right away, before the line is even in place.",
      "c": [
       "Fire Control"
      ]
     },
     {
      "t": "Search & rescue in the bedrooms off the hallway, ahead of E1.",
      "c": [
       "All Clear"
      ]
     },
     {
      "t": "Hold as tactical reserve until the 1st Alarm arrives.",
      "c": []
     }
    ],
    "best": 0,
    "mp": "M.P. 202.06: vertical ventilation directly over the fire is most efficient and \"is best executed when sequenced simultaneous to and or immediately following an effective fire attack.\" Uncoordinated ventilation \"will make the fire conditions worse.\""
   },
   {
    "label": "Assign E3",
    "unit": "E3",
    "q": "Where do you send E3, and what task?",
    "opts": [
     {
      "t": "3rd line to the back of the house through the carport gate.",
      "c": [
       "Fire Control"
      ]
     },
     {
      "t": "Exposure protection on the neighbor to the west.",
      "c": [
       "Loss Stopped"
      ]
     },
     {
      "t": "Second water supply from the hydrant behind E2.",
      "c": []
     },
     {
      "t": "Hold as tactical reserve, on deck near the command post.",
      "c": []
     }
    ],
    "best": 3,
    "mp": "Command deck (3 & 1): first 3 companies to IAP tasks, 1 held as tactical reserve. M.P. 201.06: \"Command must provide for a tactical reserve of fire companies.\""
   },
   {
    "label": "Assign R3",
    "unit": "R3",
    "q": "Where do you send R3, and what task?",
    "opts": [
     {
      "t": "Medical and rehab for victims and crews coming out.",
      "c": []
     },
     {
      "t": "Primary search with E1 in the bedrooms down the hall.",
      "c": [
       "All Clear"
      ]
     },
     {
      "t": "Exposure line on the neighbor's house to the west.",
      "c": [
       "Loss Stopped"
      ]
     },
     {
      "t": "Hold as a second tactical reserve behind E3.",
      "c": []
     }
    ],
    "best": 0,
    "mp": "M.P. 202.02C: \"Command must structure treatment of victims after removal.\" A rescue company on a house fire sets up for victims and crews coming out."
   },
   {
    "label": "Assign BC1",
    "unit": "BC1",
    "q": "Where do you send BC1, and what task?",
    "opts": [
     {
      "t": "Take command by transfer — E1 officer stays with the crew.",
      "c": []
     },
     {
      "t": "Safety / accountability sector at the front.",
      "c": []
     },
     {
      "t": "Roof sector, supervising L1's vent hole over the fire room.",
      "c": []
     },
     {
      "t": "Staging officer for the 1st Alarm companies.",
      "c": []
     }
    ],
    "best": 0,
    "mp": "M.P. 201.01: fast-attack command ends when \"Command is transferred from the fast attack company officer IC to a later arriving command officer,\" who runs it from a command post outside the hazard zone."
   },
   {
    "label": "Stretch check (hose)",
    "q": "What line do you bring, and how do you decide?",
    "opts": [
     "1¾-inch — whatever is on top; it's a small house, no need to measure.",
     "2-inch — sized by walking it: curb, front door, fire room, plus enough to reach, work and turn.",
     "1¾-inch — sized by walking it: curb, front door, fire room, enough to reach, work and turn.",
     "Biggest line on the rig — length does not matter as long as the flow is big."
    ],
    "best": 2,
    "mp": "M.P. 202.04: lines must be \"of adequate length and size for the desired water flow,\" and the company officer sizes up the distances and obstacles. Residential flow is 150 GPM on 1¾-inch."
   },
   {
    "label": "All Clear",
    "q": "Your partner finishes the primary search — nobody inside. What goes over the radio?",
    "opts": [
     "\"Search & rescue complete, nothing found\"",
     "\"All Clear\" — primary search complete",
     "\"Under control\" — the house is clear",
     "\"Secondary complete, no victims\""
    ],
    "best": 1,
    "mp": "M.P. 202.02C: \"The term 'SEARCH & RESCUE' should be used when assigning companies to a primary search over the radio; 'ALL CLEAR' should be used only as a completion report.\" A secondary search follows, preferably by different companies."
   },
   {
    "label": "What’s happening inside? (update)",
    "cat": "sizeup",
    "q": "What’s happening inside? Update your read:",
    "opts": [
     "Fire knocked down, held to the front room",
     "Fire extending — attic involvement over the front room",
     "Smoke clearing with ventilation, no extension",
     "Still unknown from outside"
    ]
   },
   {
    "label": "Victim status (update)",
    "cat": "sizeup",
    "q": "Are people hurt? Update:",
    "opts": [
     "All Clear — nobody home, no injuries",
     "Victim found in the bedroom next to the fire room — removed",
     "Still waiting on the primary search",
     "Dog removed — owner on the way home"
    ]
   },
   {
    "label": "MP reference",
    "q": "M.P. 201.01 Command — on-scene report: unit on scene, building, conditions, action taken, strategy, command name. Follow-up report: safety concerns, accountability location, disposition of resources, IRIC in place. M.P. 202.02B: reset with a straight stream to the ceiling for 15–30 seconds, then an aggressive interior attack; enter on the air intake side. M.P. 202.04: 150 GPM on 1¾-inch. Deck: request more resources before you assign your tactical reserve.",
    "opts": [
     "Understood — show my debrief"
    ]
   }
  ]
 },
 {
  "id": "tileroof",
  "title": "Tile Roof — 2nd-Floor Fire",
  "sub": "M.P. 202.04 Fire Control · 202.06 Roof Sector · 202.02C Rescue · 2-story residential",
  "dispatch": "FD Haz Chan A1 · Inc #000452 · House Fire · 4127 E. Quail Canyon Rd, Phoenix · CODE 3 · 16:51 · Units: E1, L1, E2, E3, R3, BC1. Caller is the mother, outside: flames from an upstairs window, her 14-year-old son was asleep in his bedroom upstairs.",
  "arrival": "You arrive first on E1: a 2-story stucco Southwest-style house with a concrete tile roof. Fire venting from a 2nd-floor window, heavy black smoke over the whole roof. A pickup is parked in front of the garage. Desert hillside behind. Mother in the street says her son is still upstairs.",
  "image": "assets/scenarios/tileroof-arrival.jpg",
  "imageAlt": "Arrival view: 2-story stucco Southwest-style house with a concrete tile roof, fire venting from a 2nd-floor window, heavy black smoke over the roof, arched front entry, garage on the right with a silver pickup parked in front, desert hillside in the background.",
  "hotspots": [
   {
    "kind": "move",
    "x": 30,
    "y": 63,
    "label": "Front door",
    "note": "Make entry and take the line up the interior stairs"
   },
   {
    "kind": "spray",
    "x": 59,
    "y": 26,
    "w": 10,
    "h": 14,
    "label": "2nd-floor fire window",
    "note": "Hit the upstairs window from the yard",
    "c": [
     "Fire Control"
    ]
   },
   {
    "kind": "move",
    "x": 82,
    "y": 42,
    "label": "Tile roof",
    "note": "Put a crew on the roof to cut a vent hole"
   },
   {
    "kind": "move",
    "x": 88,
    "y": 58,
    "label": "Garage",
    "note": "Force the garage and go in through the house door"
   },
   {
    "kind": "move",
    "x": 5,
    "y": 66,
    "label": "Side yard",
    "note": "Walk the 360"
   }
  ],
  "steps": [
   {
    "label": "Approach",
    "q": "You pull up. Where do you go first? Tap a number on the picture or pick from the list.",
    "hotspots": true,
    "best": 0,
    "mp": "Known rescue upstairs. M.P. 202.02C: victims in elevated locations are at higher risk, and normal interior access (stairs, halls) is used to remove victims whenever possible. M.P. 202.04 tactical consideration: initiate your fire attack on the same level as the fire. Front door, up the stairs, line and search together."
   },
   {
    "label": "Fireground factors",
    "q": "Size it up. What are the fireground factors here?",
    "opts": [
     "Building: 2-story stucco house, concrete tile roof. Fire: one 2nd-floor room venting out the window, heavy smoke. Life hazard: boy reported upstairs.",
     "Building: 2-story stucco house, flat roof. Fire: 1st-floor room venting out the window, heavy smoke. Life hazard: boy reported upstairs.",
     "Building: 2-story stucco house, concrete tile roof. Fire: garage fire extending up, light smoke. Life hazard: everyone out with the mother.",
     "Building: 2-story stucco house, concrete tile roof. Fire: attic fully involved, roof sagging. Life hazard: no occupants reported."
    ],
    "best": 0,
    "mp": "M.P. 202.02B fireground factors: Building, Fire & Smoke, Life Hazard, Occupancy, Arrangement, Resources. The life hazard drives this one — a reported victim on the fire floor."
   },
   {
    "label": "Risk profile",
    "q": "What is your risk profile on this fire?",
    "opts": [
     "Risk a little — protect the house; let the ladder handle the rescue from outside.",
     "Risk a lot, in a calculated manner — known victim upstairs, savable conditions.",
     "Risk nothing — fire is venting from the 2nd floor; the room is already lost.",
     "Risk a lot — the house is high-value, commit everything to saving it."
    ],
    "best": 1,
    "mp": "M.P. 202.02B: \"We will risk our lives a lot, in a calculated manner, to save SAVABLE lives.\" One room venting with a reported victim nearby — that is the definition of savable."
   },
   {
    "label": "Strategy",
    "q": "What strategy do you declare?",
    "opts": [
     "Offensive — search and attack from the inside",
     "Defensive until L1 gets a look at the roof",
     "Offensive inside, master stream on the window outside",
     "Hold the strategy until BC1 arrives and decides"
    ],
    "best": 0,
    "mp": "M.P. 202.02B: avoid simultaneous offensive and defensive strategies in the same fire area — \"committing personnel to interior positions, then operating master streams from exterior positions\" puts interior crews in danger."
   },
   {
    "label": "Incident action plan",
    "q": "What is your IAP?",
    "opts": [
     "Ladder rescue from outside only — no interior until the fire is out",
     "Primary search of the 2nd floor and fire attack, with coordinated ventilation",
     "Fire attack from the yard first, then search once the smoke clears out upstairs",
     "Exposure protection on the houses next door, then fire attack"
    ],
    "best": 1,
    "mp": "Offensive IAP: a controlled, aggressive search and fire attack with support operations. M.P. 202.02C: \"In smoke showing and working fire situations, fire control efforts must be extended simultaneously with rescue operations.\""
   },
   {
    "label": "Tactical priorities",
    "q": "In what order do you work the tactical priorities?",
    "opts": [
     "Fire Control → All Clear (primary search) → Loss Stopped",
     "All Clear (primary search) → Loss Stopped → Fire Control",
     "All Clear (primary search) → Fire Control → Loss Stopped",
     "Loss Stopped → Fire Control → All Clear (primary search)"
    ],
    "best": 2,
    "mp": "M.P. 202.02C: \"Life safety is the highest tactical priority.\" All Clear, Fire Control, Loss Stopped — with the attack running alongside the search because fire knockdown \"may be a critical factor in completing a primary search.\""
   },
   {
    "label": "On-scene report",
    "q": "Give your on-scene report — which version do you send?",
    "opts": [
     "E1 on scene, 4127 E. Quail Canyon. Medium 2-story house, fire showing from a 2nd-floor window, one reported trapped upstairs. E1 is taking a 1¾-inch line to the 2nd floor for search & rescue and fire attack. E1 will be Quail Canyon Command.",
     "E1 on scene, 4127 E. Quail Canyon. Medium 2-story house, fire showing from a 2nd-floor window, one reported trapped upstairs. E1 is taking a 1¾-inch line to the 2nd floor for search & rescue and fire attack. This is an offensive fire. E1 will be Quail Canyon Command.",
     "E1 on scene, 4127 E. Quail Canyon. Medium house, fire showing, one reported trapped. E1 is going in for search & rescue and fire attack. This is an offensive fire. E1 will be Quail Canyon Command. Give me the balance of a 1st Alarm.",
     "E1 on scene, 4127 E. Quail Canyon. Medium 2-story house, fire showing from a 2nd-floor window, one reported trapped upstairs, mother in the street. This is an offensive fire. E1 will be Quail Canyon Command."
    ],
    "best": 1,
    "mp": "M.P. 201.01 on-scene report: building with height — \"assumed 1 story unless reported otherwise\" — conditions, action taken, strategy, command name. Say \"2-story\" or the incoming units picture the wrong house."
   },
   {
    "label": "Follow-up report",
    "q": "Line is going upstairs. Give your follow-up report — which version do you send?",
    "opts": [
     "Quail Canyon Command to Alarm — tile roof, no roof operations. E1 will be Side A accountability. Give me the balance of a 1st Alarm. E1 has an IRIC in place.",
     "Quail Canyon Command to Alarm — offensive fire, E1 on the 2nd floor. One reported trapped upstairs. Give me the balance of a 1st Alarm. E1 has an IRIC in place.",
     "Quail Canyon Command to Alarm — tile roof, no roof operations. E1 will be Side A accountability. E1 has an IRIC in place. Will advise on resources.",
     "Quail Canyon Command to Alarm — E1 will be Side A accountability. Give me the balance of a 1st Alarm. L1 to the roof for vertical ventilation."
    ],
    "best": 0,
    "mp": "M.P. 201.01 follow-up report: immediate safety concerns, accountability started (announce the location), disposition of resources, IRIC in place. The tile roof is a safety item worth broadcasting — no one goes up there (202.06)."
   },
   {
    "label": "Initial 3 & 1",
    "q": "How do you run the initial 3 & 1?",
    "opts": [
     "All 4 companies to IAP tasks — it's a rescue, the tactical reserve can come later on.",
     "First 3 companies to IAP tasks, 1 held as tactical reserve; ask for more before using it.",
     "First 2 companies to IAP tasks, 2 held in reserve until the boy is found.",
     "Commit the reserve first to the rescue, then call for more resources."
    ],
    "best": 1,
    "mp": "Command deck: deploy resources to address the IAP plus a tactical reserve. M.P. 202.02C: \"The most urgent reason for calling additional alarms is for the purpose of effectively managing the life safety potential.\""
   },
   {
    "label": "Water supply",
    "q": "Hydrant is 300 feet back. Does E1 lay in?",
    "opts": [
     "Yes — never make entry on a working fire without a hydrant line",
     "No — go in on tank water for the rescue; E2 brings the supply",
     "No — the fire is small, tank water will do for the whole fire",
     "Yes — lay in, then wait for E2 before entering the house"
    ],
    "best": 1,
    "mp": "M.P. 202.04: it is reasonable for a first-due engine with at least 450 gallons not to lay a supply line for \"fires with a known rescue situation requiring immediate action.\" The IC still has to make sure an uninterrupted supply gets established."
   },
   {
    "label": "Roof type",
    "cat": "sizeup",
    "q": "Size-up: what roof type do you see?",
    "opts": [
     "Pitched concrete tile roof",
     "Flat roof with parapets",
     "Pitched shingle roof",
     "Can’t tell from here"
    ]
   },
   {
    "label": "Roof operations",
    "q": "L1 asks for the roof to cut a vent hole over the fire room. Your call?",
    "opts": [
     "Yes — vertical vent over the fire is always the most efficient option we have",
     "Yes, but only from the aerial platform, not walking the tile",
     "No — no one operates on a single-family tile roof; plan horizontal or PPV",
     "No roof now; send them up after the fire is knocked down"
    ],
    "best": 2,
    "mp": "M.P. 202.06: \"No firefighters will operate on the roof to ventilate a single-family or duplex structure fire covered with concrete or clay roof tiles. It will be necessary to develop a plan for horizontal or positive pressure ventilation with the fire attack companies.\""
   },
   {
    "label": "Ventilation plan",
    "q": "No roof ops. How do you ventilate?",
    "opts": [
     "Break out every upstairs window as soon as L1 gets ladders up",
     "Horizontal or PPV, coordinated with E1 so it happens when water is flowing",
     "Set a fan at the front door the moment you arrive, before the line is even in",
     "Skip ventilation entirely — opening up only makes the fire bigger"
    ],
    "best": 1,
    "mp": "M.P. 202.04: \"Uncoordinated ventilation will make fire control more difficult\" and \"access and egress openings must be considered as ventilation.\" M.P. 202.06: ventilation \"will make the fire conditions worse if not done in concert with effective water application.\""
   },
   {
    "label": "Tile roof weight",
    "cat": "sizeup",
    "q": "If the fire gets into the attic under that tile, what are you watching for?",
    "opts": [
     "Nothing new — tile is noncombustible, so the roof can't fail",
     "Heavy load on the roof framing; sagging roofline means get out from under it",
     "Tiles sliding off the eaves — the only real collapse hazard is down in the front yard",
     "Tile holds heat in, so the attic fire will smother itself"
    ],
    "best": 1,
    "mp": "M.P. 202.05: \"light weight truss and bar joist roof construction can be expected to fail after minimal fire exposure.\" Collapse signs include \"sagging or otherwise distorted rooflines\" and time of fire involvement."
   },
   {
    "label": "Search priority",
    "q": "Where does the primary search go first?",
    "opts": [
     "The 1st floor — clear it on the way up the stairs so nobody gets missed",
     "The garage first — kids hide in cars when they're scared",
     "The boy's bedroom and the rooms near the fire on the 2nd floor",
     "The room that's venting fire — he's probably in there"
    ],
    "best": 2,
    "mp": "M.P. 202.02C: search the \"most severely threatened\" first. Victims \"in elevated locations are at a higher risk\" from heat and smoke. Use the mother's information to target the search — but complete it everywhere."
   },
   {
    "label": "Interior stairs",
    "q": "The only way up is the open interior staircase. What do you think about on the way up?",
    "opts": [
     "Go up fast — speed matters more than the flow path here",
     "Stairs are the flow path — air at your back, line ahead of you",
     "Take the line up a ground ladder to the window instead",
     "Leave the line at the bottom; search upstairs faster without it"
    ],
    "best": 1,
    "mp": "M.P. 202.02B: \"Make every effort to enter the structure at the air intake side of the flow path. You want the air at your back.\" M.P. 202.02C: hose lines placed to \"control interior access, confine the fire, and protect avenues of escape\" — that stair is the boy's way out."
   },
   {
    "label": "What’s happening inside?",
    "cat": "sizeup",
    "q": "What’s happening inside? Your first read:",
    "opts": [
     "One 2nd-floor room involved, smoke banked down the stairs",
     "Smoke throughout both floors",
     "Fire already in the attic under the tile",
     "Unknown — no interior report yet"
    ]
   },
   {
    "label": "Victim status",
    "cat": "sizeup",
    "q": "Are people hurt? What do you know right now?",
    "opts": [
     "One reported trapped — boy asleep in his upstairs bedroom",
     "Unknown — mother isn't sure he's home",
     "Neighbor thinks he saw the boy leave earlier",
     "Mother has smoke inhalation from trying to go up"
    ],
    "mp": "M.P. 202.02C: use reports of the location, number and condition of victims to support the primary search, but \"must extend and complete a primary search wherever entry is possible.\""
   },
   {
    "label": "Attack flow",
    "q": "How do you attack it?",
    "opts": [
     "Hit the window from the yard, then take the line inside and up (transitional, then interior)",
     "Take the line straight inside and up the stairs — attack on the fire floor"
    ],
    "mp": "M.P. 202.04: a transitional attack \"should be considered\" when conditions need changing before entry, and the UL tactical considerations include \"Initiate your fire attack on the same level as the fire.\" Either way the line ends up on the 2nd floor, with the search."
   },
   {
    "label": "Go interior",
    "showIf": {
     "label": "Attack flow",
     "match": "inside"
    },
    "q": "You're on the 2nd floor — then what?",
    "opts": [
     "Partner searches the boy's room while the line holds the hallway",
     "Both of you search — leave the line at the top of the stairs",
     "Open the attic hatch to check for extension first",
     "Close yourself into the bedroom and wait for the ladder"
    ],
    "best": 0,
    "mp": "M.P. 202.04: \"search and rescue efforts should be performed simultaneously with fire attack.\" M.P. 202.02C: \"Do we remove the victims from the fire, or do we remove the fire from the victims?\" — with a line in the hall, you're doing both."
   },
   {
    "label": "Crew of 4",
    "kind": "crew",
    "q": "Deploy your 4-person engine crew — who does what?",
    "opts": [
     {
      "t": "All 4 on the line upstairs — put the fire out first, then search after.",
      "c": [
       "Fire Control"
      ]
     },
     {
      "t": "Officer runs command from the street, 3 firefighters search with no line.",
      "c": [
       "All Clear"
      ]
     },
     {
      "t": "Officer + 1 up the stairs with the line, search and attack; engineer + FF as IRIC.",
      "c": [
       "All Clear",
       "Fire Control"
      ]
     },
     {
      "t": "2 throw a ground ladder up to the fire window, 2 hit the window from the front yard.",
      "c": [
       "Fire Control"
      ]
     }
    ],
    "best": 2,
    "mp": "M.P. 201.05A: with a life hazard a rapid search can resolve, \"a Firefighter and Engineer can fill this role while the IC and the other firefighter conduct a rapid search.\" M.P. 202.02B: search, rescue and fire attack are simultaneous."
   },
   {
    "label": "Apparatus placement",
    "cat": "unit",
    "q": "The pickup is parked in front of the garage. Where does E1 go?",
    "opts": [
     "Past the house, leaving the front open for L1 to reach the 2nd floor",
     "Nose-in on the driveway behind the pickup, as close to the house as you can get",
     "Right in front of the door, blocking the street for everyone else",
     "Down the block — wait to see where L1 wants to set up"
    ],
    "best": 0,
    "mp": "M.P. 202.06: \"Ladder apparatus should be strategically placed\" for safe access and in tactical positions that permit defensive operations if needed. Don't let the engine steal the ladder's spot in front of the 2nd-floor windows."
   },
   {
    "label": "Assign E2",
    "unit": "E2",
    "q": "Where do you send E2, and what task?",
    "opts": [
     {
      "t": "Water supply into E1, then a 2nd line up the stairs.",
      "c": [
       "Fire Control"
      ]
     },
     {
      "t": "Exposure protection on the house next door.",
      "c": [
       "Loss Stopped"
      ]
     },
     {
      "t": "Hit the 2nd-floor window from the yard.",
      "c": [
       "Fire Control"
      ]
     },
     {
      "t": "Hold as tactical reserve until the 1st Alarm arrives.",
      "c": []
     }
    ],
    "best": 0,
    "mp": "M.P. 202.04: when the first engine skips the supply line for a rescue, the IC must ensure \"adequate, uninterrupted water supplies are in place\" — then support the attack from the next most advantageous position."
   },
   {
    "label": "Assign L1",
    "unit": "L1",
    "q": "Where do you send L1, and what task?",
    "opts": [
     {
      "t": "Roof — cut a vent hole directly over the fire room.",
      "c": [
       "Fire Control"
      ]
     },
     {
      "t": "Ladder the 2nd-floor windows, then search the 2nd floor.",
      "c": [
       "All Clear"
      ]
     },
     {
      "t": "Force the garage and search the 1st floor from the house door.",
      "c": [
       "All Clear"
      ]
     },
     {
      "t": "Hold as tactical reserve until the 1st Alarm arrives.",
      "c": []
     }
    ],
    "best": 1,
    "mp": "M.P. 202.02C: secondary means of rescue — \"aerial platforms and ladders, ground ladders\" — are used in their order of effectiveness. M.P. 202.06: no roof ops on a single-family tile roof."
   },
   {
    "label": "Ladder placement",
    "unit": "L1",
    "cat": "unit",
    "q": "Where does the ladder go?",
    "opts": [
     "Side A front — reach the 2nd-floor windows for rescue",
     "Rear, up on the hillside — out of the smoke and heat",
     "Aerial to the roof, to get a look at the tile",
     "Staging down the street until you assign it"
    ],
    "best": 0,
    "mp": "M.P. 202.06: ladder placement should allow safe access, emergency exit, and positions that would permit effective defensive operations if needed. Up front it covers the bedroom windows and a defensive fallback."
   },
   {
    "label": "Assign E3",
    "unit": "E3",
    "q": "Where do you send E3, and what task?",
    "opts": [
     {
      "t": "Exposure protection on the house next door.",
      "c": [
       "Loss Stopped"
      ]
     },
     {
      "t": "Backup line up the stairs to the 2nd floor, right behind E1.",
      "c": [
       "Fire Control"
      ]
     },
     {
      "t": "Second water supply from the hydrant down the block.",
      "c": []
     },
     {
      "t": "Hold as tactical reserve, on deck near the command post.",
      "c": []
     }
    ],
    "best": 3,
    "mp": "Command deck (3 & 1): first 3 companies to IAP tasks, 1 held as tactical reserve. Request more resources before you assign it."
   },
   {
    "label": "Assign R3",
    "unit": "R3",
    "q": "Where do you send R3, and what task?",
    "opts": [
     {
      "t": "Treatment — ready for the boy when he comes out.",
      "c": []
     },
     {
      "t": "Primary search with E1 on the 2nd floor.",
      "c": [
       "All Clear"
      ]
     },
     {
      "t": "Roof sector with L1 to check the tile.",
      "c": []
     },
     {
      "t": "Hold as a second tactical reserve behind E3.",
      "c": []
     }
    ],
    "best": 0,
    "mp": "M.P. 202.02C: \"Command must structure treatment of victims after removal\" and assign treatment companies as required."
   },
   {
    "label": "Assign BC1",
    "unit": "BC1",
    "q": "Where do you send BC1, and what task?",
    "opts": [
     {
      "t": "Take command by transfer — E1 officer stays with the crew.",
      "c": []
     },
     {
      "t": "Division supervisor for the 2nd-floor search and attack crews.",
      "c": []
     },
     {
      "t": "Safety / accountability sector at the front.",
      "c": []
     },
     {
      "t": "Staging officer for the 1st Alarm companies.",
      "c": []
     }
    ],
    "best": 0,
    "mp": "M.P. 201.01: the fast-attack IC hands off to the later-arriving command officer, who runs it from a command post outside the hazard zone."
   },
   {
    "label": "Stretch check (hose)",
    "q": "What line do you bring, and how do you decide?",
    "opts": [
     "1¾-inch — walk it: front door, up the stairs, down the hall, enough to reach, work and turn.",
     "2-inch — walk it the same way: front door, up the stairs, down the hall, enough to reach and work.",
     "1¾-inch — the shortest crosslay; it's only a house and the stairs are right inside.",
     "Biggest line on the rig — the length doesn't matter as long as the flow is big."
    ],
    "best": 0,
    "mp": "M.P. 202.04: residential flow is 150 GPM on 1¾-inch, and lines must be \"of adequate length and size.\" A flight of stairs eats hose — come up short and the line stops at the landing."
   },
   {
    "label": "What’s happening inside? (update)",
    "cat": "sizeup",
    "q": "What’s happening inside? Update your read:",
    "opts": [
     "Fire knocked down in the 2nd-floor room, no attic extension",
     "Fire in the attic over the fire room",
     "Smoke clearing with PPV, hallway tenable",
     "Still unknown from outside"
    ]
   },
   {
    "label": "Victim status (update)",
    "cat": "sizeup",
    "q": "Are people hurt? Update:",
    "opts": [
     "Boy found behind his bedroom door — removed down the stairs",
     "Boy rescued over the ladder from his window",
     "All Clear — boy was at a friend's house",
     "Still searching"
    ]
   },
   {
    "label": "MP reference",
    "q": "M.P. 202.06 Roof Sector: \"No firefighters will operate on the roof to ventilate a single-family or duplex structure fire covered with concrete or clay roof tiles\" — plan horizontal or positive pressure ventilation with the attack companies. M.P. 202.02C: victims in elevated locations are at higher risk; use the stairs for removal when possible. M.P. 202.04: a first-due engine with 450+ gallons may skip the supply line for a known rescue; 150 GPM on 1¾-inch; never ventilate without coordination.",
    "opts": [
     "Understood — show my debrief"
    ]
   }
  ]
 },
 {
  "id": "parkinggarage",
  "title": "Parking Garage — Below-Grade Vehicle Fire",
  "sub": "M.P. 202.16 Car Fires · 202.04B Below Grade · Parking structure · First-arriving size-up",
  "dispatch": "Engine 1, car fire. 2200 block East Vista Ridge Drive, cross street 22nd Street, underground parking garage, level P1, beneath the 4-story Vista Ridge Apartments. Caller reports a car on fire and smoke in the garage. Engine 1 only. Time out 0214.",
  "arrival": "You stop E1 at the top of the ramp — the clearance bar won't take the rig — and walk down to P1 with your crew on air. It is not one car. At least three cars are burning in the center row between the concrete columns, a fourth is starting beyond the column, and grey smoke is banked under a low ceiling full of pipes and sprinkler mains. An exit door at the far wall leads to the stairs of the occupied apartment building above.",
  "image": "assets/scenarios/parkinggarage-arrival.jpg",
  "imageAlt": "Arrival view: low-ceiling underground parking garage, several cars burning in the center row between white concrete columns, smoke banked under overhead pipes, uninvolved white car on the left, red car and an exit door on the right.",
  "hotspots": [
   {
    "kind": "spray",
    "x": 35,
    "y": 61,
    "w": 12,
    "h": 12,
    "label": "Burning cars — center row",
    "note": "Water from reach at a 45 — knock the cars down and cool the ceiling",
    "c": [
     "Fire Control"
    ]
   },
   {
    "kind": "move",
    "x": 8,
    "y": 63,
    "label": "White car — left",
    "note": "Next car in the row — the fire is heading this way"
   },
   {
    "kind": "move",
    "x": 50,
    "y": 60,
    "label": "Center column",
    "note": "Concrete taking direct heat — look for spalling"
   },
   {
    "kind": "spray",
    "x": 57,
    "y": 64,
    "w": 10,
    "h": 10,
    "label": "Car beyond the column",
    "note": "Fourth car just catching — hit it before it spreads",
    "c": [
     "Fire Control"
    ]
   },
   {
    "kind": "move",
    "x": 96,
    "y": 58,
    "label": "Exit door — stairs",
    "note": "Stair to the apartments above — smoke travel path and standpipe access"
   },
   {
    "kind": "move",
    "x": 55,
    "y": 12,
    "label": "Overhead mains",
    "note": "Sprinkler and standpipe piping — is the system flowing?"
   }
  ],
  "steps": [
   {
    "label": "Approach",
    "q": "You are on P1 with a charged line coming down the ramp. Where do you go first? Tap a number on the picture or pick from the list.",
    "hotspots": true,
    "best": 0,
    "mp": "M.P. 202.16: \"initiate the fire attack from a 45-degree angle, utilizing the reach of the fire stream.\" First water goes on the burning cars and protects the passenger compartments so an all clear can be obtained — every second you wait, the next car lights."
   },
   {
    "label": "Fireground factors",
    "q": "Size it up. What are the fireground factors here?",
    "best": 1,
    "opts": [
     "Building: open-air surface lot, no ceiling to trap heat. Fire: one car, passenger compartment, light smoke. Occupancy: parking only, nothing attached. Resources: E1 handles it with one crosslay.",
     "Building: below-grade concrete garage under occupied apartments, low ceiling, sprinkler mains overhead. Fire: three-plus cars burning, smoke banked down. Occupancy: parking, residents above. Resources: one engine is not enough.",
     "Building: below-grade concrete garage under apartments. Fire: one car burning, no spread. Occupancy: parking only, residents unaffected because the concrete deck stops smoke. Resources: E1 is enough for this one with a single crosslay.",
     "Building: concrete garage, noncombustible so no structural concern. Fire: several cars burning, smoke at the ceiling. Occupancy: empty garage, no life hazard anywhere. Resources: hold at E1."
    ],
    "mp": "M.P. 202.16 (Vehicles in Parking Garage) wants a thorough size-up: what level, above or below grade, what exposures are attached, is there a life hazard in them, and where the smoke is traveling. Concrete is noncombustible but \"can be weakened by extended exposure to the heat of a fire.\""
   },
   {
    "label": "Risk profile",
    "q": "What is your risk profile on this fire?",
    "best": 2,
    "opts": [
     "Risk a little — it is only cars, which is property. The apartments upstairs are a separate building.",
     "Risk nothing — it's a concrete garage, let the cars burn out and protect the ramp.",
     "Risk a lot, calculated — people may be in the garage and smoke is moving into the occupied building.",
     "Risk a lot — the cars and the garage itself are high-value property worth saving."
    ],
    "mp": "M.P. 202.05: \"We may risk our lives a lot, in a calculated manner, to protect savable lives.\" M.P. 202.16 asks: \"Is there a life hazard in the exposed areas?\" An occupied building on top of the garage is the life hazard — the cars themselves are not."
   },
   {
    "label": "Strategy",
    "q": "What strategy do you declare?",
    "best": 0,
    "opts": [
     "Offensive — water on the cars from the most effective position, check the building above.",
     "Defensive — below grade is too dangerous; flow from the top of the ramp only.",
     "Hold the strategy until the balance of the alarm arrives and BC1 is on scene.",
     "Offensive on the cars, but nobody checks the building above until it is out."
    ],
    "mp": "M.P. 202.04: an offensive strategy is \"an exterior and/or interior fire attack, from inside the hazard zone\" with support work to keep spaces tenable. Command must declare the strategy on arrival — and cars caught early in a sprinklered garage are a winnable fight."
   },
   {
    "label": "Incident action plan",
    "q": "What is your IAP?",
    "best": 3,
    "opts": [
     "Hold E1 at the ramp and wait for the full alarm before anyone goes down.",
     "Attack the cars only — the building above is somebody else's problem later.",
     "Evacuate the whole complex first, then decide on attacking the cars.",
     "Attack the cars, support the sprinklers, and check smoke spread above."
    ],
    "mp": "Deck: the offensive IAP is a controlled, aggressive search and fire attack with support operations. M.P. 202.16: \"Supporting the sprinkler system is a high priority to limit fire spread,\" and Command must \"evaluate smoke spread and evacuate occupants from the affected areas.\""
   },
   {
    "label": "Tactical priorities",
    "q": "In what order do you work the tactical priorities?",
    "best": 1,
    "opts": [
     "Fire Control → All Clear (primary search) → Loss Stopped",
     "All Clear (primary search) → Fire Control → Loss Stopped",
     "Loss Stopped → Fire Control → All Clear (primary search)",
     "All Clear (primary search) → Loss Stopped → Fire Control"
    ],
    "mp": "Deck: Search & Rescue = All Clear, then Fire Control, then Loss Stopped. M.P. 202.16 puts it in car terms: first water protects the passenger compartment \"and an all clear should be obtained.\" Then the building above."
   },
   {
    "label": "On-scene report",
    "q": "Give your on-scene report — which version do you send?",
    "best": 0,
    "opts": [
     "Engine 1 to Alarm, on scene, below-grade garage under a 4-story apartment building, multiple cars burning on P1, smoke banked down. Upgrade to a 3 & 1. E1 attacking with a handline. Offensive. E1 will be Vista Ridge Command.",
     "Engine 1 to Alarm, on scene, car fire in the garage under the apartments, handling it with one line, you can hold the assignment as dispatched. E1 attacking with a handline. Offensive strategy. E1 will be Vista Ridge Command.",
     "Engine 1 to Alarm, on scene, below-grade garage under a 4-story apartment building, multiple cars burning on P1, smoke banked down. Upgrade to a 3 & 1. E1 attacking with a handline. Defensive. Vista Ridge Command.",
     "Engine 1 to Alarm, on scene, below-grade garage under a 4-story apartment building, multiple cars burning, smoke banked down. Upgrade to a 3 & 1. E1 attacking with a handline. Offensive. Command name to follow."
    ],
    "mp": "M.P. 201.01 on-scene report: unit on scene, building description, occupancy, size, height, conditions, action taken, strategy, and command confirmation with a name. M.P. 202.16: for any vehicle fire in a parking garage, \"Upgrade the assignment to a 3 & 1.\""
   },
   {
    "label": "Follow-up report",
    "q": "Now the follow-up report. Which one covers it?",
    "best": 2,
    "opts": [
     "Vista Ridge Command to Alarm — fire is below grade, it's going to be a long one. Have the balance of the alarm stage at the top of the ramp until I call them.",
     "Vista Ridge Command to Alarm — E1 is accountability at the top of the ramp. Give me the balance of the 3 & 1. We'll set up IRIC once E2 gets here.",
     "Vista Ridge Command to Alarm — safety: smoke moving to the apartments, concrete under heat. E1 is ramp-side accountability. Give me the balance of the 3 & 1. E1 has IRIC in place.",
     "Vista Ridge Command to Alarm — safety: smoke moving into the apartments above. Accountability will be set when BC1 arrives. Give me the balance of the 3 & 1. E1 has IRIC in place."
    ],
    "mp": "M.P. 201.01 follow-up report: (1) any immediate safety concerns, (2) accountability started — announce the initial accountability location, (3) disposition of resources (hold/add/return), (4) IRIC in place and identified. All four, every time."
   },
   {
    "label": "Initial 3 & 1",
    "q": "The upgrade is rolling. How do you run the 3 & 1?",
    "best": 3,
    "opts": [
     "All 4 companies straight to tasks below grade — the reserve can come from a 2nd alarm later.",
     "2 companies to tasks, 2 held at the ramp until the fire shows what it is going to do.",
     "Put the reserve on the hardest task first, then call for more if it gets worse.",
     "3 companies to IAP tasks, 1 as tactical reserve; ask for more before using the reserve."
    ],
    "mp": "Deck: deploy enough resources to address the IAP plus a tactical reserve, and request more resources before you assign your tactical reserve. Below grade, with air and distance limits, that reserve is your relief crew."
   },
   {
    "label": "Dispatched as a car fire",
    "cat": "sizeup",
    "q": "Dispatch sent E1 alone for a car fire. What does the MP say once it is in a parking garage?",
    "best": 1,
    "opts": [
     "Stay with one engine unless the fire extends into the building structure itself above.",
     "Upgrade to a 3 & 1 — any vehicle fire in a parking garage poses unique challenges.",
     "Add one engine for water supply; car fires never need a ladder or a chief.",
     "Hold the assignment and let the sprinklers handle it until E1 reports back."
    ],
    "mp": "M.P. 202.16: \"Any vehicle fire in a parking garage poses unique challenges. Upgrade the assignment to a 3 & 1. This will provide additional resources.\" Do it on arrival — not after the fourth car lights."
   },
   {
    "label": "Below grade",
    "cat": "sizeup",
    "q": "You are one level below grade. What changes?",
    "best": 0,
    "opts": [
     "Heat and smoke bank under the low ceiling, few exhaust points, limited access — attack on the same level, manage the flowpath.",
     "Nothing changes — a car fire in a garage behaves just like a car fire in an open lot, same line, same tactics.",
     "Smoke vents itself up the ramp and out, so crews can work on the level above the fire without much added risk.",
     "Cut a vent hole through the deck above right away — vertical ventilation is the first move below grade."
    ],
    "mp": "M.P. 202.04B: below grade spaces \"pose significant threats to firefighters\" — \"access and ventilation opportunities are limited.\" M.P. 202.05 lists \"below ground fires\" and \"limited access — one way in/out\" as positions requiring caution."
   },
   {
    "label": "Support the sprinklers",
    "cat": "sizeup",
    "q": "The mains overhead are flowing. What about the FDC?",
    "best": 2,
    "opts": [
     "Leave the FDC alone — city pressure is designed to supply the sprinkler system without any help.",
     "Shut the sprinkler valve so the steam and runoff don't hurt the attack crew.",
     "Pump the FDC early — many garages run combination sprinkler/standpipe on city pressure.",
     "Pump the FDC only after the cars are knocked down, to help with overhaul."
    ],
    "mp": "M.P. 202.16: \"Supporting the sprinkler system is a high priority to limit fire spread.\" Many buildings have a combination system \"charged with municipal pressure\" and no fire pump — \"Pumping the FDC increases the GPM flow and pressure for both the sprinklers and the attack line.\""
   },
   {
    "label": "Concrete",
    "cat": "sizeup",
    "q": "The column next to the cars is taking direct flame. What is the concern?",
    "best": 3,
    "opts": [
     "None — concrete is noncombustible, so the structure is never a factor in a garage.",
     "Only the cars matter; columns fail after hours, long after the fire is out.",
     "It is cosmetic. Spalling is only a problem for the insurance adjuster later.",
     "Concrete weakens under extended heat — watch for spalling and report it."
    ],
    "mp": "M.P. 202.16: \"Although non-combustible, the concrete structure can be weakened by extended exposure to the heat of a fire.\" Spalling over your head is a structural warning — report it to Command."
   },
   {
    "label": "EV in the row",
    "cat": "sizeup",
    "q": "One of the burning cars has a charge port and white vapor pushing from under the rocker panel. Now what?",
    "best": 1,
    "opts": [
     "Hit it with AFFF — foam smothers the battery and saves water on a long stretch.",
     "Treat it as energized: big water, uninterrupted supply, no cutting the pack, 3-1 Hazmat.",
     "Pry the battery pack open so you can get water directly onto the burning cells.",
     "Once the flames are knocked down, it is done — release it to the waiting tow company right away."
    ],
    "mp": "M.P. 202.16: EV batteries \"shall always be considered energized.\" It can take \"3,000 gallons or more\" and an uninterrupted water supply; balance to a 3-1 Hazmat; \"Do not cut into or puncture the battery pack\"; AFFF is contraindicated. Post-fire: never stored inside a building."
   },
   {
    "label": "Air and distance",
    "cat": "sizeup",
    "q": "The stretch from the ramp to the cars is long and below grade. How do you manage air?",
    "best": 0,
    "opts": [
     "Plan the exit before the alarm — out with 33% left, inside 150 feet, two escape routes.",
     "Work until the low-air alarm sounds, then follow the hose line back out and up the ramp.",
     "Air is not a concern — garages are open spaces with plenty of room to get out.",
     "Swap bottles at the cars so the crew can stay on the line without leaving."
    ],
    "mp": "M.P. 202.05C: \"it is unacceptable to leave the hazard zone with low air alarms activated\" — the last 33% is emergency reserve. M.P. 202.04: no company beyond 150 feet. M.P. 202.05: below grade, \"establish at least two separate escape routes.\""
   },
   {
    "label": "What’s happening inside?",
    "cat": "sizeup",
    "q": "What’s happening inside? Your first read:",
    "opts": [
     "Multiple cars burning, spreading car to car",
     "One car burning, the rest is smoke",
     "Fire into the building above",
     "Unknown — smoke too thick to read"
    ]
   },
   {
    "label": "Victim status",
    "cat": "sizeup",
    "q": "Are people hurt? What do you know right now?",
    "opts": [
     "Unknown — passenger compartments not cleared yet",
     "Garage appears empty, no injuries reported",
     "Residents calling about smoke in the hallways",
     "Injuries reported — medical needed"
    ],
    "mp": "Judgment call. M.P. 202.16: first water protects the passenger compartment and \"an all clear should be obtained.\" The building above counts too — where is the smoke traveling?"
   },
   {
    "label": "Attack flow",
    "q": "How do you attack it?",
    "best": 2,
    "opts": [
     "Flow into the garage from the top of the ramp and wait for the smoke to lift",
     "Walk straight down the center aisle to the cars and hit each one from close range, side-on",
     "Advance on the garage level at a 45 from reach, cars first, then cool the ceiling",
     "Open the stair door up top first so the smoke clears before you go in"
    ],
    "mp": "M.P. 202.16: attack \"from a 45-degree angle, utilizing the reach of the fire stream.\" M.P. 202.04B: when the fire is below grade, attack on that level from the most advantageous position and \"minimize any ventilation prior to extinguishment.\""
   },
   {
    "label": "Advance",
    "showIf": {
     "label": "Attack flow",
     "match": "45"
    },
    "q": "You are advancing on the cars — what do you watch for?",
    "best": 3,
    "opts": [
     "Nothing special — just keep your stream on the flames and move in tight",
     "Stand at the sides so you can reach both the front and rear of each car",
     "Open the trunks and hatches early to get water deep into the cargo areas",
     "Bumpers, struts and tires can let go — approach from the front or rear"
    ],
    "mp": "M.P. 202.16: energy-absorbing bumpers \"have been known to travel 25 feet\"; heated hood and hatch struts can fail; exploding rims throw debris out the sides — \"Approach from the front or rear of the vehicle.\""
   },
   {
    "label": "Smoke into the building",
    "q": "Residents above report smoke in the hallways. What does Command do?",
    "best": 1,
    "opts": [
     "Tell residents to stay put — the concrete garage deck keeps the smoke contained down below.",
     "Control the garage ventilation system, size up smoke travel, evacuate affected areas.",
     "Ignore it until the cars are out — smoke in the hallways will clear on its own.",
     "Send the attack crew upstairs to search, leaving the cars to burn for now."
    ],
    "mp": "M.P. 202.16: \"Controlling the ventilation system will aid in the protection of occupants of the parking garage and the exposures.\" If the garage is attached to an occupied structure, \"command must evaluate smoke spread and evacuate occupants from the affected areas.\""
   },
   {
    "label": "Crew of 4",
    "kind": "crew",
    "q": "Deploy your 4-person engine crew — who does what?",
    "best": 0,
    "opts": [
     {
      "t": "Officer + 2 firefighters on the attack line at the cars; engineer charges the line and the FDC.",
      "c": [
       "Fire Control"
      ]
     },
     {
      "t": "All 4 down to P1 on the cars with two lines — nobody left up top to pump, connect, or supply.",
      "c": [
       "Fire Control"
      ]
     },
     {
      "t": "Officer runs command from the top of the ramp; 3 firefighters go upstairs to search the apartments.",
      "c": [
       "All Clear"
      ]
     },
     {
      "t": "2 firefighters on the line, 2 moving uninvolved cars away from the fire with the keys.",
      "c": [
       "Fire Control",
       "Loss Stopped"
      ]
     }
    ],
    "mp": "M.P. 202.16: the minimum line on a vehicle fire is the 1¾-inch, with full PPE and SCBA, and \"Pumping the FDC increases the GPM flow and pressure for both the sprinklers and the attack line.\" Keep the engineer on the pump."
   },
   {
    "label": "Assign E2",
    "unit": "E2",
    "q": "Where do you send E2, and what task?",
    "best": 1,
    "opts": [
     {
      "t": "Down to P1 with a second line on the same cars as E1.",
      "c": [
       "Fire Control"
      ]
     },
     {
      "t": "Hydrant supply to the FDC and an uninterrupted feed for E1.",
      "c": [
       "Fire Control"
      ]
     },
     {
      "t": "Upstairs to search the apartments floor by floor.",
      "c": [
       "All Clear"
      ]
     },
     {
      "t": "Hold at the top of the ramp as tactical reserve.",
      "c": []
     }
    ],
    "mp": "M.P. 202.16: supporting the sprinklers is \"a high priority,\" and an EV battery may need 3,000+ gallons — \"This will require an uninterrupted water supply.\" E1's tank won't carry that."
   },
   {
    "label": "2nd engine placement",
    "unit": "E2",
    "cat": "unit",
    "q": "Where does the 2nd engine go?",
    "opts": [
     "Hydrant near the FDC on the street side",
     "Down the ramp next to the burning cars",
     "Rear access to the apartment lobby",
     "Staging until assigned"
    ]
   },
   {
    "label": "Assign L1",
    "unit": "L1",
    "q": "Where do you send L1, and what task?",
    "best": 2,
    "opts": [
     {
      "t": "Roof of the apartment building to cut a vent hole.",
      "c": [
       "Fire Control"
      ]
     },
     {
      "t": "Down to P1 to help push the uninvolved cars away from the fire.",
      "c": [
       "Loss Stopped"
      ]
     },
     {
      "t": "Building above — check smoke spread, search and evacuate.",
      "c": [
       "All Clear"
      ]
     },
     {
      "t": "Hold at the top of the ramp as tactical reserve.",
      "c": []
     }
    ],
    "mp": "M.P. 202.16: \"A size up of the smoke travel/spread must be performed\" and occupants evacuated from the affected areas. That's search and evacuation in the exposure — the life hazard here."
   },
   {
    "label": "Assign E3",
    "unit": "E3",
    "q": "Where do you send E3, and what task?",
    "best": 0,
    "opts": [
     {
      "t": "Second line to P1 — back up E1 and cut off the next car.",
      "c": [
       "Fire Control"
      ]
     },
     {
      "t": "Cut power to the whole building from the main panel.",
      "c": []
     },
     {
      "t": "Water supply from a second hydrant on the far side.",
      "c": []
     },
     {
      "t": "Ventilate the garage with fans from the ramp now.",
      "c": [
       "Fire Control"
      ]
     }
    ],
    "mp": "M.P. 202.04: support the attack \"from the next most advantageous position with appropriate water volume.\" M.P. 202.04B warns against ventilating before water is on the fire."
   },
   {
    "label": "Assign R3",
    "unit": "R3",
    "q": "Where do you send R3, and what task?",
    "opts": [
     {
      "t": "RIT / rescue standby at the ramp.",
      "c": []
     },
     {
      "t": "Primary search on P1 with E1.",
      "c": [
       "All Clear"
      ]
     },
     {
      "t": "Medical / rehab for crews coming off air.",
      "c": []
     },
     {
      "t": "Hold as tactical reserve.",
      "c": []
     }
    ],
    "mp": "Judgment call. M.P. 202.05C: Command must provide replacement crews \"layered in as either working, on-deck or recycling\" — a below-grade fight eats air fast."
   },
   {
    "label": "Assign BC1",
    "unit": "BC1",
    "q": "Where do you send BC1, and what task?",
    "opts": [
     {
      "t": "Assume command — E1 officer stays with the crew.",
      "c": []
     },
     {
      "t": "Safety / accountability sector.",
      "c": []
     },
     {
      "t": "Division supervisor, garage level P1.",
      "c": []
     },
     {
      "t": "Staging and additional resources.",
      "c": []
     }
    ],
    "mp": "Judgment call. M.P. 202.05C: as the incident escalates, Command must assign a Chief Officer to manage sector operations, crew air and work cycles."
   },
   {
    "label": "Stretch check (hose)",
    "q": "What line do you bring, and how do you decide?",
    "best": 2,
    "opts": [
     "1¾-inch preconnect off the front bumper — a car fire is a car fire, period.",
     "Booster line — fast to pull, light to move, and plenty for burning cars.",
     "Commercial-flow line from the stair standpipe, sized to reach, inside 150 feet.",
     "Longest line on the rig stretched down the ramp — length doesn't matter if it reaches."
    ],
    "mp": "M.P. 202.16 sets the 1¾-inch as the minimum for one car. Multiple cars in a building is a commercial fire — M.P. 202.04: \"Residential fire tactics and flow rates should not be used,\" 250 GPM lines, never beyond 150 feet from safe refuge such as a stairwell."
   },
   {
    "label": "What’s happening inside? (update)",
    "cat": "sizeup",
    "q": "What’s happening inside? Update your read:",
    "opts": [
     "Knockdown on the cars, sprinklers holding",
     "Spreading to more cars — not controlled",
     "Spalling at the column, smoke lifting",
     "Still unknown from the ramp"
    ]
   },
   {
    "label": "Victim status (update)",
    "cat": "sizeup",
    "q": "Are people hurt? Update:",
    "opts": [
     "Still unknown",
     "Cars clear, residents evacuated, no injuries",
     "Resident found in a smoky hallway — rescue underway",
     "Injuries confirmed — medical requested"
    ]
   },
   {
    "label": "Wrap-up",
    "q": "The cars are out. What do you leave behind?",
    "best": 3,
    "opts": [
     "Release the EV to the tow company right away and shut the sprinklers off.",
     "Leave the sprinklers off and the control valve closed — the owner can reset it in the morning.",
     "Store the burned EV in the corner of the garage until the owner arrives.",
     "Sprinklers back in service, EV temps stable an hour, EV towed out of the building."
    ],
    "mp": "M.P. 202.16: don't leave \"building fire protection systems inoperable.\" An EV needs \"a stable or reducing temperature for at least one hour\" before tow, then 50 feet of clear space \"and never inside a building.\""
   },
   {
    "label": "MP reference",
    "q": "M.P. 202.16 Car Fires and 202.04B Below Grade — the lines that matter here: \"Any vehicle fire in a parking garage poses unique challenges. Upgrade the assignment to a 3 & 1.\" Attack from a 45 using reach; first water protects the passenger compartment for the all clear. \"Supporting the sprinkler system is a high priority to limit fire spread\" — pump the FDC. Concrete \"can be weakened by extended exposure to the heat of a fire.\" Evaluate smoke spread into attached buildings and evacuate. EV batteries are always energized: big water, no cutting the pack. Below grade: attack on the same level, limit ventilation before water, out with 33% air, two ways out, never past 150 feet.",
    "opts": [
     "Understood — show my debrief"
    ]
   },
   {
    "label": "Reposition",
    "q": "Conditions have changed. Where do you go now? Tap a number on the picture or pick from the list.",
    "hotspots": true
   }
  ]
 },
 {
  "id": "pizza",
  "title": "Pizza Restaurant — Strip-Mall Kitchen Fire",
  "sub": "M.P. 202.04 Commercial Fire Control · 202.06 Roof Sector · Common attic · First-arriving size-up",
  "dispatch": "Commercial fire. Kitchen fire at a pizza restaurant, 4800 block West Desert Bloom Road, cross street 47th Avenue, Desert Bloom Plaza. Passerby reports smoke from the roof. Business is closed. Units: E1, L1, E2, E3, R3, BC1. Time out 2347.",
  "arrival": "You arrive first on E1: a one-story strip mall, block front, one continuous roofline over five or six shops. Every storefront is dark and locked. Smoke is drifting from the roofline — not just over the pizza place on the west end but further east, over the unit next door. No fire showing. Nobody around.",
  "image": "assets/scenarios/pizza-arrival.jpg",
  "imageAlt": "Night arrival view: one-story strip mall with dark storefronts, a lit restaurant sign on the west end, smoke rising from the roofline toward the middle of the building, empty parking lot.",
  "hotspots": [
   {
    "kind": "move",
    "x": 21,
    "y": 60,
    "label": "Pizza restaurant — front",
    "note": "Locked, dark — forcible entry to the kitchen"
   },
   {
    "kind": "move",
    "x": 46,
    "y": 30,
    "label": "Roofline smoke",
    "note": "Smoke pushing from the roof east of the restaurant — common attic?"
   },
   {
    "kind": "move",
    "x": 47,
    "y": 68,
    "label": "Next unit east",
    "note": "Dark storefront under the smoke — exposure"
   },
   {
    "kind": "move",
    "x": 10,
    "y": 66,
    "label": "West end door",
    "note": "Exposure / end unit on the west side"
   },
   {
    "kind": "move",
    "x": 90,
    "y": 74,
    "label": "East corner — to the rear",
    "note": "Walk the 360: back doors, gas meter, hood fan on the roof"
   },
   {
    "kind": "spray",
    "x": 21,
    "y": 63,
    "w": 10,
    "h": 12,
    "label": "Restaurant storefront",
    "note": "Flow through the front glass from outside",
    "c": [
     "Fire Control"
    ]
   }
  ],
  "steps": [
   {
    "label": "Approach",
    "q": "You pull into the lot. Where do you go first? Tap a number on the picture or pick from the list.",
    "hotspots": true,
    "best": 4,
    "mp": "M.P. 202.04A: \"Early assessment of the seven sides of the structure is a high priority\" in shopping centers. The rear shows you the kitchen door, the gas meter and the hood exhaust — and whether the attic is already carrying fire east."
   },
   {
    "label": "Fireground factors",
    "q": "Size it up. What are the fireground factors here?",
    "best": 3,
    "opts": [
     "Building: freestanding restaurant, its own roof, no shared walls or attic. Fire: kitchen only, smoke from the hood stack. Occupancy: closed restaurant, no exposures to worry about at all.",
     "Building: strip mall, common roof. Fire: kitchen, fully involved, flame through the roof over three units. Occupancy: closed businesses. Life hazard: none. Go defensive.",
     "Building: strip mall, masonry fire walls to the roof deck between units. Fire: kitchen, light smoke. Occupancy: open restaurant, full of customers. Exposures: none.",
     "Building: one-story strip mall, one roof over 5–6 units, common attic likely. Fire: kitchen, smoke from the roofline past the restaurant. Occupancy: closed, dark. Exposures: both sides."
    ],
    "mp": "Deck: Building, Fire, Occupancy, Life Hazard, Arrangement, Resources. M.P. 202.04A: \"False ceilings and common attics can lead to fire spread throughout the structure\" and \"result in fires burning undetected.\" Smoke east of the restaurant is your arrangement clue."
   },
   {
    "label": "Risk profile",
    "q": "What is your risk profile on this fire?",
    "best": 0,
    "opts": [
     "Risk a little, calculated — closed at night, no reported occupants; still confirm the all clear.",
     "Risk a lot — assume every dark unit is full of people and search every one of them before water.",
     "Risk nothing — closed business at night, nobody inside; go defensive from the parking lot.",
     "Risk a lot — the business owners stand to lose everything, so push deep regardless."
    ],
    "mp": "M.P. 202.05: \"We may risk our lives a little, in a calculated manner, to protect savable property.\" M.P. 202.04: in commercial buildings \"the best thing we can do for any potential victims is to extinguish the fire.\" Closed doesn't mean confirmed empty — the all clear still gets done."
   },
   {
    "label": "Strategy",
    "q": "What strategy do you declare?",
    "best": 2,
    "opts": [
     "Defensive — common attic fires always take the whole strip, so protect the ends.",
     "Hold the strategy until L1 gives a roof report and BC1 is on scene.",
     "Offensive — attack the kitchen and get into the ceiling ahead of the extension.",
     "Offensive in the restaurant only; the units next door can wait until later."
    ],
    "mp": "M.P. 202.04: \"The best opportunity to extinguish commercial fires is to catch them at their smallest state after arrival.\" No fire through the roof, roof intact — offensive. Command declares on arrival and reconfirms as conditions change."
   },
   {
    "label": "Incident action plan",
    "q": "What is your IAP?",
    "best": 1,
    "opts": [
     "Vent the roof over the restaurant first, then make the attack once the smoke lifts.",
     "Force the restaurant, hit the kitchen, open ceilings ahead of the extension.",
     "Search every unit in the strip before any company puts water on the fire.",
     "Master streams from the lot onto the roofline to protect both exposures."
    ],
    "mp": "M.P. 202.02B: \"Where the fire involves concealed spaces (attics, ceiling areas, construction voids, etc.), it becomes paramount that companies identify and operate fire streams into such areas. Early identification and response to concealed space fires will save the building.\""
   },
   {
    "label": "Tactical priorities",
    "q": "In what order do you work the tactical priorities?",
    "best": 0,
    "opts": [
     "All Clear (primary search) → Fire Control → Loss Stopped",
     "Fire Control → All Clear (primary search) → Loss Stopped",
     "Loss Stopped → Fire Control → All Clear (primary search)",
     "All Clear (primary search) → Loss Stopped → Fire Control"
    ],
    "mp": "Deck: All Clear, Fire Control, Loss Stopped. In a closed commercial row the all clear rides with the attack — M.P. 202.04: search is done \"in coordination with fire attack when possible.\""
   },
   {
    "label": "On-scene report",
    "q": "Give your on-scene report — which version do you send?",
    "best": 2,
    "opts": [
     "Engine 1 to Alarm, on scene of a medium one-story strip mall, closed restaurant, smoke from the roof. Engine 1 going in with a line for fire attack and search. Offensive strategy. Command name to follow in a minute.",
     "Engine 1 to Alarm, on scene of a medium one-story strip mall, closed restaurant, smoke from the roof. Engine 1 is going in with a line. Engine 1 will be Desert Bloom Command.",
     "Engine 1 to Alarm, on scene of a medium one-story strip mall, closed restaurant, smoke from the roofline over two units. Engine 1 forcing entry with a line for fire attack. Offensive. Desert Bloom Command.",
     "Engine 1 to Alarm, smoke from the roof at the plaza, closed restaurant. We'll investigate and get back to you. Offensive strategy. Engine 1 will be Desert Bloom Command."
    ],
    "mp": "M.P. 201.01 on-scene report: unit on scene, building, occupancy, size, height, conditions (smoke showing — amount and location), action taken, strategy, and command confirmation with a name. Leave one out and the next units are guessing."
   },
   {
    "label": "Follow-up report",
    "q": "Now the follow-up report. Which one covers it?",
    "best": 1,
    "opts": [
     "Desert Bloom Command to Alarm — smoke traveling through the common attic. Accountability TBD. Give me the balance of the 1st alarm. IRIC once E2 arrives.",
     "Desert Bloom Command to Alarm — safety: smoke in the common attic, both exposures. E1 is front-side accountability. Balance of the 1st alarm. E1 has IRIC in place.",
     "Desert Bloom Command to Alarm — E1 is front-side accountability. Balance of the 1st alarm. E1 has IRIC in place. We'll update conditions once we're inside.",
     "Desert Bloom Command to Alarm — safety: attic involvement, both exposures threatened. E1 is front-side accountability. Return E3 and R3, we have enough companies here."
    ],
    "mp": "M.P. 201.01 follow-up report: (1) immediate safety concerns, (2) accountability started with the initial location announced, (3) disposition of resources — hold, add or return, (4) IRIC in place and identified."
   },
   {
    "label": "Initial 3 & 1",
    "q": "How do you run the initial 3 & 1?",
    "best": 2,
    "opts": [
     "All 4 companies to tasks right away; the reserve comes from a 2nd alarm.",
     "First 2 companies to tasks, 2 held out in the lot until L1 reports from the roof.",
     "3 companies to IAP tasks, 1 as tactical reserve; call for more before using it.",
     "Assign the reserve first to the worst exposure, then call for more resources."
    ],
    "mp": "Deck: provide enough resources to address the IAP plus a tactical reserve, and request more resources before you assign your tactical reserve. A common-attic strip can outrun a first alarm."
   },
   {
    "label": "Common attic",
    "cat": "sizeup",
    "q": "Smoke is coming from the roof over the unit next door, not the restaurant. What does it tell you?",
    "best": 3,
    "opts": [
     "Wind is blowing the smoke east down the roof — it is still just a kitchen fire in the restaurant.",
     "The neighbor has a separate fire; give it its own company and its own command.",
     "The roof is about to collapse over the restaurant, so pull everyone out of there.",
     "Fire or smoke is traveling in the common attic — it can burn undetected above the ceilings."
    ],
    "mp": "M.P. 202.04A: \"False ceilings and common attics can lead to fire spread throughout the structure ... burning undetected in areas not visible.\" M.P. 202.02B: the unburned portion \"represents where the fire is going.\""
   },
   {
    "label": "Hood and duct",
    "cat": "sizeup",
    "q": "The fire started on the cooking line under the hood. Where does it go from there?",
    "best": 0,
    "opts": [
     "Up the grease duct into the attic and roof — open the ceiling and check the duct path early.",
     "Nowhere — commercial hood ducts are sealed, so it stays on the cooking line until it burns out.",
     "Down into the floor drains under the line; check below the kitchen floor first.",
     "Out the front of the dining room only — the ceiling and attic stay clear of it."
    ],
    "mp": "M.P. 202.02B: \"Officers who hesitate to gain access to concealed spaces because they don't want to beat up the building may lose the entire structure.\" Get into the ceiling along the duct run."
   },
   {
    "label": "Hood system",
    "cat": "sizeup",
    "q": "The hood suppression system may have discharged. Fryers are full of hot oil. What do you keep in mind?",
    "best": 2,
    "opts": [
     "A discharged hood system means the fire is out — skip the ceiling and wrap up.",
     "Blast a straight stream into the burning fryer to cool the oil and knock the fire down fast.",
     "No water stream into burning grease — boilover. Check the system; still check the duct.",
     "Reset the hood system yourself before you leave so the restaurant can reopen."
    ],
    "mp": "M.P. 201.01D: water added to burning oil \"sinks to the bottom,\" flashes to steam and expels the fuel — boilover. M.P. 202.19: a kitchen hood activation gets C99 so the system is restored by a licensed contractor, not by us."
   },
   {
    "label": "Forcible entry",
    "cat": "sizeup",
    "q": "Every door is locked and dark. How do you get in?",
    "best": 1,
    "opts": [
     "Wait for the owner and keys — damage to a closed business is a liability for the department.",
     "Key box if there is one; if not, force it — the fire is moving, damage matters less.",
     "Break the big front window and go in through the glass with the line.",
     "Pick the lock on the rear door carefully so nothing is damaged."
    ],
    "mp": "M.P. 202.19A: \"If a key box is present ... access the building.\" Forcible entry is \"a trade-off in time versus damage ... The more critical the fire, the less important forcible entry damage becomes.\""
   },
   {
    "label": "Utilities",
    "cat": "sizeup",
    "q": "Gas feeds the ovens and the fryers. What about utilities?",
    "best": 3,
    "opts": [
     "Leave the gas on so the ovens don't relight improperly when the owner returns.",
     "Utilities are the gas company's job — don't touch the meter on a commercial job.",
     "Shut the power only; gas lines can't feed a fire once the hood system trips.",
     "Shut the gas at the meter and secure the electric — assign it early."
    ],
    "mp": "M.P. 201.05A lists \"Secure Utilities\" among the support duties Command can assign (C957 on first alarms). With gas feeding the cooking line and hidden fire in the attic, get it secured early."
   },
   {
    "label": "Exposures",
    "q": "Both neighbors share the attic. How do you protect them?",
    "best": 0,
    "opts": [
     "Get ahead of it — open the ceilings in both exposures with lines in place.",
     "Wait until fire actually shows in an exposure, then send a company there.",
     "Exposures are the owners' concern; one line on the restaurant is enough.",
     "Flow into the exposures' storefronts from the parking lot with a deck gun."
    ],
    "mp": "M.P. 202.02B: \"Command must 'get ahead' of the fire ... Set up adequately ahead of the fire, then overpower it.\" M.P. 202.04: \"Exposure protection may require interior and roof positions.\""
   },
   {
    "label": "Roof report",
    "cat": "sizeup",
    "q": "L1 is on the roof. What should their report give you?",
    "best": 2,
    "opts": [
     "How big a hole they cut, and that they'll keep enlarging it until the smoke clears.",
     "Just a thumbs up — the roof is fine, they're starting the vent cut right away.",
     "Roof type and integrity, attic present, extension in the common attic, exposures.",
     "That the fire is out, based on the color of the smoke from the hood stack."
    ],
    "mp": "M.P. 202.06: Roof Sector determines roof type and integrity, \"the presence of an attic space,\" and \"fire extension in common attics.\" For attic fires: do not vertically ventilate as the initial attack option — and holes are never made larger."
   },
   {
    "label": "What’s happening inside?",
    "cat": "sizeup",
    "q": "What’s happening inside? Your first read:",
    "opts": [
     "Kitchen fire extending into the attic",
     "Kitchen fire contained to the hood",
     "Fire in the unit next door",
     "Unknown — doors still locked"
    ]
   },
   {
    "label": "Victim status",
    "cat": "sizeup",
    "q": "Are people hurt? What do you know right now?",
    "opts": [
     "Unknown — closed, nobody reported",
     "Owner on the phone says staff left at 2200",
     "Possible employee still inside",
     "Injuries reported — medical needed"
    ],
    "mp": "Judgment call. Closed is not confirmed empty — a closing employee or someone sleeping in a back office is a real possibility. The all clear still has to be called."
   },
   {
    "label": "Attack flow",
    "q": "How do you attack it?",
    "best": 1,
    "opts": [
     "Flow through the storefront glass from outside and stay exterior",
     "Interior — kitchen first, then pull ceiling and hit the attic",
     "Cut the roof over the restaurant first, then go in after it vents",
     "Go to the unit next door and attack the smoke from there first"
    ],
    "mp": "M.P. 202.04: \"overwhelm fire conditions with well-placed water application\" from the most advantageous position. M.P. 202.06: attic fires are extinguished \"at their source,\" not vented first."
   },
   {
    "label": "Go interior",
    "showIf": {
     "label": "Attack flow",
     "match": "kitchen"
    },
    "q": "You go interior in the restaurant — then what?",
    "best": 3,
    "opts": [
     "Pull every ceiling in the dining room before you even find the kitchen",
     "Push straight through to the rear door and let the smoke out",
     "Split the crew — one to the kitchen, one to the next unit alone",
     "Stay on the line, knock the kitchen, then open the ceiling by the hood"
    ],
    "mp": "M.P. 202.04A: stay on the hose line — \"no complacency.\" M.P. 202.02B: identify concealed spaces and \"operate fire streams into such areas.\""
   },
   {
    "label": "Flow",
    "q": "M.P. 202.04: what flow does a commercial fire get?",
    "best": 0,
    "opts": [
     "250 GPM minimum per handline; three lines, 500+ GPM total.",
     "150 GPM — a 1¾-inch is plenty for a restaurant kitchen.",
     "100 GPM booster — it's a small kitchen, keep the damage down.",
     "500 GPM from a portable monitor at the front door only."
    ],
    "mp": "M.P. 202.04: \"Residential fire tactics and flow rates should not be used in commercial fires.\" Large-volume handlines \"capable of flowing a minimum of 250 GPM\"; NFPA 1710 is \"a minimum of three hand lines with an overall volume of 500 GPM or greater.\""
   },
   {
    "label": "Crew of 4",
    "kind": "crew",
    "q": "Deploy your 4-person engine crew — who does what?",
    "best": 2,
    "opts": [
     {
      "t": "All 4 on the line through the front door — force it together, then everyone advances in.",
      "c": [
       "Fire Control"
      ]
     },
     {
      "t": "Officer runs command, 3 firefighters search the dark units one by one.",
      "c": [
       "All Clear"
      ]
     },
     {
      "t": "Officer + firefighter force entry and attack; 2 firefighters back on the line and hook.",
      "c": [
       "Fire Control",
       "All Clear"
      ]
     },
     {
      "t": "2 firefighters on the line, 2 cut a vent hole over the restaurant.",
      "c": [
       "Fire Control"
      ]
     }
    ],
    "mp": "M.P. 202.04: a 2-inch line flowing 240 GPM is \"2 Firefighter minimum operation,\" and the attack crew needs forcible entry first. Search rides with the attack — M.P. 202.04: \"in coordination with fire attack when possible.\""
   },
   {
    "label": "Assign E2",
    "unit": "E2",
    "q": "Where do you send E2, and what task?",
    "best": 0,
    "opts": [
     {
      "t": "Force the unit east, line in, open the ceiling ahead.",
      "c": [
       "Fire Control",
       "Loss Stopped"
      ]
     },
     {
      "t": "Second line through the restaurant door behind E1.",
      "c": [
       "Fire Control"
      ]
     },
     {
      "t": "Master stream on the roofline from the parking lot.",
      "c": [
       "Loss Stopped"
      ]
     },
     {
      "t": "Hold out in the lot as tactical reserve for now.",
      "c": []
     }
    ],
    "mp": "M.P. 202.02B: \"Command must consider the most critical direction and avenues of fire extension.\" The smoke is east — that exposure is the cutoff point."
   },
   {
    "label": "2nd engine placement",
    "unit": "E2",
    "cat": "unit",
    "q": "Where does the 2nd engine go?",
    "opts": [
     "Front of the east exposure",
     "Rear access behind the restaurant",
     "Hydrant — water supply position",
     "Staging until assigned"
    ]
   },
   {
    "label": "Assign L1",
    "unit": "L1",
    "q": "Where do you send L1, and what task?",
    "best": 1,
    "opts": [
     {
      "t": "Cut a big vent hole over the restaurant, then enlarge it.",
      "c": [
       "Fire Control"
      ]
     },
     {
      "t": "Roof sector — size-up, roof report, extension in the attic.",
      "c": [
       "Fire Control"
      ]
     },
     {
      "t": "Search the dark units along the strip one by one.",
      "c": [
       "All Clear"
      ]
     },
     {
      "t": "Hold out in the lot as tactical reserve for now.",
      "c": []
     }
    ],
    "mp": "M.P. 202.06: Command \"should consider assigning companies to roof sector\" to evaluate fire/smoke conditions, roof structure and extension in common attics — then coordinate any ventilation with the interior crews."
   },
   {
    "label": "Ladder placement",
    "unit": "L1",
    "cat": "unit",
    "q": "Where does the ladder go?",
    "opts": [
     "Front, on an uninvolved unit — safe roof access",
     "Directly in front of the restaurant",
     "Rear — back of the building",
     "Staging until assigned"
    ],
    "mp": "M.P. 202.06: ladder placement allows \"safe access to the roof, emergency exit from the roof\" and a defensive position if needed. M.P. 202.05: ladder near corners or fire walls."
   },
   {
    "label": "Assign E3",
    "unit": "E3",
    "q": "Where do you send E3, and what task?",
    "best": 2,
    "opts": [
     {
      "t": "Water supply from the nearest hydrant to E1.",
      "c": []
     },
     {
      "t": "Second line into the restaurant kitchen.",
      "c": [
       "Fire Control"
      ]
     },
     {
      "t": "West exposure — open the ceiling, line in.",
      "c": [
       "Loss Stopped"
      ]
     },
     {
      "t": "Search the restaurant's back office.",
      "c": [
       "All Clear"
      ]
     }
    ],
    "mp": "M.P. 202.02B: \"Command must consider the seven sides\" — \"Failure to address all seven sides will frequently result in fire extension.\" The attic runs both ways."
   },
   {
    "label": "Assign R3",
    "unit": "R3",
    "q": "Where do you send R3, and what task?",
    "opts": [
     {
      "t": "RIT / rescue standby.",
      "c": []
     },
     {
      "t": "Primary search with E1.",
      "c": [
       "All Clear"
      ]
     },
     {
      "t": "Medical / rehab sector.",
      "c": []
     },
     {
      "t": "Hold as tactical reserve.",
      "c": []
     }
    ]
   },
   {
    "label": "Assign BC1",
    "unit": "BC1",
    "q": "Where do you send BC1, and what task?",
    "opts": [
     {
      "t": "Assume command — E1 officer goes interior.",
      "c": []
     },
     {
      "t": "Safety / accountability sector.",
      "c": []
     },
     {
      "t": "Roof sector supervisor.",
      "c": []
     },
     {
      "t": "Staging and additional resources.",
      "c": []
     }
    ]
   },
   {
    "label": "Stretch check (hose)",
    "q": "What line do you bring, and how do you decide?",
    "best": 1,
    "opts": [
     "1¾-inch — light, fast, and it's only a kitchen.",
     "2-inch — 250 GPM, sized to reach the kitchen and work.",
     "Booster reel — just enough to knock the hood.",
     "Longest line on the rig, regardless of the actual stretch."
    ],
    "mp": "M.P. 202.04: commercial lines are \"250 GPM ... 2\" and 2.5\" hose lines.\" Size the stretch by the distance from the door to the kitchen plus enough to work — and never past 150 feet."
   },
   {
    "label": "What’s happening inside? (update)",
    "cat": "sizeup",
    "q": "What’s happening inside? Update your read:",
    "opts": [
     "Kitchen knocked, attic opened, extension cut off",
     "Fire running the attic into both exposures",
     "Roof sagging over the restaurant",
     "Still unknown from outside"
    ]
   },
   {
    "label": "Victim status (update)",
    "cat": "sizeup",
    "q": "Are people hurt? Update:",
    "opts": [
     "Still unknown",
     "All units searched, all clear, no injuries",
     "Employee found in the back office — rescue underway",
     "Injuries confirmed — medical requested"
    ]
   },
   {
    "label": "MP reference",
    "q": "M.P. 202.04 Commercial Fire Control, 202.02B Concealed Spaces, 202.06 Roof Sector — the lines that matter here: catch commercial fires \"at their smallest state\" with 250 GPM lines; residential flows don't belong in a commercial fire. Common attics \"can result in fires burning undetected\" — the unburned portion is where the fire is going. \"Early identification and response to concealed space fires will save the building.\" Get ahead of it in both exposures. Roof Sector reports roof type, integrity, attic and extension; attic fires are not vented first, and holes are never made larger. No water stream into burning grease. Force entry when the fire is moving. Secure the gas.",
    "opts": [
     "Understood — show my debrief"
    ]
   },
   {
    "label": "Reposition",
    "q": "Conditions have changed. Where do you go now? Tap a number on the picture or pick from the list.",
    "hotspots": true
   }
  ]
 },
 {
  "id": "probie-nozzle",
  "title": "Probie: Nozzle — Ranch fire",
  "sub": "Probie seat · Nozzle FF on E1 · M.P. 202.04 Fire Control · 202.02B · 202.05C Air Management",
  "dispatch": "FD Haz Chan A1 · Inc #000412 · House Fire · 3016 W. Mariposa St, Phoenix · CODE 3 · 14:08 · Units: E1, L1, E2, E3, R3, BC1. Neighbor reports black smoke from the front of the house; does not know if anyone is home.",
  "arrival": "You're the nozzle firefighter on E1, six months out of the academy. Your captain gives the on-scene report: small 1-story ranch, fire and heavy black smoke from a front window just left of the front door, offensive, E1 going fast attack. He turns to you: \"Pull the line. Front door. You're with me.\" The engineer is on the pump; the other firefighter and the engineer are your IRIC. Occupants unknown.",
  "image": "assets/scenarios/ranch-arrival.jpg",
  "imageAlt": "Arrival view: 1-story ranch house with a pitched shingle roof, fire glowing in a front window left of the front door with a heavy black smoke column, front lawn, carport and driveway on the right, wood gate on the left.",
  "hotspots": [
   {
    "kind": "move",
    "x": 51,
    "y": 55,
    "label": "Front door",
    "note": "Stretch to the front door and flake out the line"
   },
   {
    "kind": "spray",
    "x": 39,
    "y": 49,
    "w": 9,
    "h": 11,
    "label": "Fire window",
    "note": "Straight stream off the fire-room ceiling through the window",
    "c": [
     "Fire Control"
    ]
   },
   {
    "kind": "move",
    "x": 19,
    "y": 50,
    "label": "Bedroom window",
    "note": "Take the line to the bedroom window on the far left"
   },
   {
    "kind": "move",
    "x": 63,
    "y": 51,
    "label": "Picture window",
    "note": "Break the big picture window right of the door and go in there"
   },
   {
    "kind": "move",
    "x": 86,
    "y": 70,
    "label": "Carport",
    "note": "Stretch up the driveway and around to the back door"
   }
  ],
  "steps": [
   {
    "label": "Gear up",
    "q": "Dispatch upgrades it to a working fire. What do you have done before your boots hit the street?",
    "opts": [
     "Full PPE, SCBA on and bottle checked full, radio on the tactical channel",
     "Full PPE and SCBA on; you'll check the bottle and radio at the front door",
     "Coat and helmet on; finish suiting up while the engineer charges the line",
     "Full PPE, SCBA on, and your mask on now so you're breathing air on arrival"
    ],
    "best": 0,
    "mp": "M.P. 202.05C: know your air level before you enter the hazard zone — the \"round trip ticket.\" M.P. 205.21: carry your assigned radio on every incident. Going on air in the cab just burns bottle you'll want inside."
   },
   {
    "label": "Crew of 4",
    "kind": "crew",
    "q": "Captain is going fast attack. Who does what on E1's crew of 4?",
    "opts": [
     {
      "t": "Captain and you on the line for search and attack; engineer and FF2 as IRIC.",
      "c": [
       "All Clear",
       "Fire Control"
      ]
     },
     {
      "t": "All four go in — more hands inside means a faster search and knockdown.",
      "c": [
       "All Clear",
       "Fire Control"
      ]
     },
     {
      "t": "You take the line in alone while the captain searches the bedrooms.",
      "c": [
       "All Clear",
       "Fire Control"
      ]
     },
     {
      "t": "Captain and you go in with no line to search fast; FF2 pulls it later.",
      "c": [
       "All Clear"
      ]
     }
    ],
    "best": 0,
    "mp": "M.P. 201.04: with the fast-attack captain inside with one firefighter, \"the plug person assumes the primary 2 in / 2 out position and the engineer assumes the secondary.\" M.P. 206.03: a probie is directly supervised the moment they enter a building with smoke or fire."
   },
   {
    "label": "Which line",
    "q": "Captain: \"Pull a line.\" Which one does M.P. 202.04 put on a house fire?",
    "opts": [
     "2-inch with the smooth bore — 250 GPM for a fast knock",
     "2½-inch smooth bore — the biggest water you carry",
     "1¾-inch crosslay with the automatic nozzle — 150 GPM",
     "Booster reel — it's one room and it pulls the fastest"
    ],
    "best": 2,
    "mp": "M.P. 202.04: residential — \"150 GPM – (2.5 gallons per second) (1.75\" hose lines with automatic nozzles).\" Engines carry two 1¾-inch lines minimum: 150-foot and 200-foot crosslays plus a bumper line."
   },
   {
    "label": "Stretch check (hose)",
    "q": "Rig at the curb, about 60 feet to the door, fire room right inside. 150-foot or 200-foot crosslay?",
    "opts": [
     "200-foot — always grab the longest line so you never come up short",
     "150-foot — curb to door to fire room, plus enough to work and turn",
     "Bumper line — shortest pull, and the house is small anyway",
     "150-foot — it's the default; no reason to think about distance"
    ],
    "best": 1,
    "mp": "M.P. 202.04: lines must be \"of adequate length and size for the desired water flow\" — size up the distances and obstacles. Sixty feet to the door plus the room plus slack to work: the 150 makes it with hose to spare. Too long means a pile of kinks in the yard."
   },
   {
    "label": "Approach",
    "hotspots": true,
    "q": "Line's on your shoulder. Where do you stretch it? Tap a number on the picture or pick from the list.",
    "best": 0,
    "mp": "M.P. 202.02B: \"Make every effort to enter the structure at the air intake side of the flow path. You want the air at your back.\" The fire window is the exhaust; the front door is your intake and your captain's call. M.P. 202.04: the closest door shouldn't dictate line placement — here it happens to be the right one."
   },
   {
    "label": "Flaking",
    "q": "You hit the front door with 80 feet of extra hose behind you. What do you do with it before it's charged?",
    "opts": [
     "Leave it piled at the curb — the line straightens out once it's charged",
     "Drag it all up to the porch in a pile so it's right at the door",
     "Flake it in loops on the lawn near the door so it feeds in clean",
     "Stretch it straight back to the rig so it lies flat along the street"
    ],
    "best": 2,
    "mp": "IFSTA: flake excess hose out near the entry point — not in a pile — so it pays out without kinks once charged and as you advance. A kink at the curb starves your nozzle; 150 GPM on paper means nothing if it never reaches the tip."
   },
   {
    "label": "Bleed the line",
    "q": "The engineer charges the line. Before you go to the door, what do you do at the nozzle?",
    "opts": [
     "Keep the bail shut — flowing outside wastes your 500-gallon tank",
     "Open it away from the door: bleed the air, check pattern and pressure",
     "Open it on full fog at the front door to pre-cool before entry",
     "Crack it into the smoke at the eaves so the air comes out up high"
    ],
    "best": 1,
    "mp": "IFSTA: bleed the air out of a newly charged line and confirm the pattern and pressure before entry — you don't want to discover air, a kink or a fog setting at the fire-room doorway. M.P. 202.04: the automatic nozzle runs 70–200 GPM; make sure yours is really flowing."
   },
   {
    "label": "Door control",
    "q": "Captain checks the front door — unlocked, it swings in. Before you're ready to go, what happens with that door?",
    "opts": [
     "Prop it wide open so the smoke starts venting out ahead of you",
     "Pull it off the hinges so it can't swing shut behind your line",
     "Open it, back off, and wait for the smoke to lift before entry",
     "Keep it closed or controlled until the charged line is ready to go"
    ],
    "best": 3,
    "mp": "M.P. 202.02B: \"Keep the building openings closed if possible to reduce ventilation of the fire until you have a charged hose line in place and are prepared to make entry.\" M.P. 202.04: \"Access and egress openings must be considered as ventilation.\" An open door is an air intake feeding the fire."
   },
   {
    "label": "Reading smoke",
    "q": "Door cracked: thick black smoke pushing hard out the top half, a little clear air down low. What is it telling you?",
    "opts": [
     "Fire's mostly out — dark smoke is just smoldering contents",
     "High heat, air-starved fire close by — water on it, stay low",
     "Fast smoke at the door means the fire moved to the back rooms",
     "Normal house-fire smoke — nothing changes about how you go in"
    ],
    "best": 1,
    "mp": "IFSTA reads smoke by volume, velocity, density and color: thick, dark, pressurized smoke means high heat and a ventilation-limited fire that grows when it gets air. M.P. 202.04: when ventilation-limited conditions are found, \"an interior fire attack is typically the best option\" — with the door controlled."
   },
   {
    "label": "Reset point",
    "hotspots": true,
    "q": "Captain: \"Reset it before we go in.\" Where does your first water go? Tap a number or pick from the list.",
    "best": 1,
    "mp": "M.P. 202.02B: \"*Before making entry* When possible reset or darken down the fire using a straight stream applied to the ceiling of the fire compartment.\" M.P. 202.04: a transitional attack fits when \"conditions need to be changed from the exterior prior to making entry.\""
   },
   {
    "label": "Reset",
    "q": "How do you flow the reset through the fire window?",
    "opts": [
     "Wide fog into the window until the smoke turns white and lazy",
     "Straight stream into the black smoke at the top of the window",
     "Straight stream off the fire-room ceiling for 15–30 seconds",
     "Narrow fog at the window frame for a full minute to cool it"
    ],
    "best": 2,
    "mp": "M.P. 202.02B: \"15-30 seconds of water applied in this manner will dramatically reduce temperatures and improve tenability throughout the occupancy.\" Ceiling, straight stream, short — then shut down and go."
   },
   {
    "label": "Go interior",
    "q": "Reset's done and the window darkens. Captain: \"Let's go.\" What now?",
    "opts": [
     "Keep flowing from the yard — it's dark, no reason to go inside now",
     "Wait at the door until the smoke clears enough to see the room",
     "Advance through the front door now and finish it from inside",
     "Shut down and hold at the door until L1 cuts the roof open"
    ],
    "best": 2,
    "mp": "M.P. 202.02B: the reset \"must be followed by an aggressive interior attack to complete fire extinguishment and evacuate any victims.\" The window hit buys time; it doesn't put the fire out or search the house."
   },
   {
    "label": "Fire attack",
    "q": "On your knees at the fire-room doorway, fire rolling across the ceiling. How do you put it out?",
    "opts": [
     "Go straight for the base of the fire on the floor; skip the ceiling",
     "Cool the ceiling and walls first, then hit the burning contents",
     "Whip wide fog around the room to push the heat out the window",
     "Hold the bail shut until you can see the fire through the smoke"
    ],
    "best": 1,
    "mp": "M.P. 202.04: \"Interior surface cooling with water, then followed by water application to the burning fuels/contents is the most effective extinguishing tactic.\" Straight stream or narrow pattern; hitting with wide fog in a closed room steams you and pushes fire into the house."
   },
   {
    "label": "Stay on the line",
    "q": "Your captain moves off to check a bedroom and you lose sight of him in the smoke. What do you do?",
    "opts": [
     "Keep pushing toward the fire — he knows where the line is going",
     "Stop, stay on the line, and call him by voice or radio until you reconnect",
     "Drop the nozzle and crawl back toward the door to wait for him",
     "Go look for him in the next room, then come back for the line"
    ],
    "best": 1,
    "mp": "M.P. 206.03: a probie in a smoke-filled building must be directly supervised. M.P. 201.01B: company officers instill \"the standard that firefighters should always stay on a hoseline.\" The line is your way out and how RIC finds you."
   },
   {
    "label": "Victim status",
    "cat": "sizeup",
    "q": "Are people hurt? What do you know right now?",
    "opts": [
     "Unknown — captain is searching off the line as you advance",
     "Captain found a victim in the hallway — removing now",
     "Neighbor now says the owner is at work",
     "Unknown — and nobody's checking until the fire is out"
    ],
    "mp": "M.P. 202.04: \"When possible, search and rescue efforts should be performed simultaneously with fire attack.\" M.P. 202.02C: companies \"cannot depend solely upon reports from residents and spectators.\""
   },
   {
    "label": "What’s happening inside?",
    "cat": "sizeup",
    "q": "What’s happening inside? Your read from the nozzle:",
    "opts": [
     "Fire in the front room darkening down, heat lifting",
     "Fire rolling over your head into the hallway",
     "Smoke only — you can't find the seat of the fire",
     "Heat dropping but visibility still near zero"
    ]
   },
   {
    "label": "Knockdown report",
    "q": "Fire's dark. Who puts \"under control\" on the radio?",
    "opts": [
     "You — the nozzle saw it go out, so you key up and report it",
     "The engineer — he can see the smoke change color from the pump",
     "Nobody — BC1 will call it when he sees the smoke stop",
     "Your captain as IC — you tell him face to face what you see"
    ],
    "best": 3,
    "mp": "M.P. 202.02A: \"Under control\" is the Fire Control benchmark, announced to Command — and on a fast attack your captain is Command. Your job is to tell him exactly what you see; he owns the report."
   },
   {
    "label": "Air check",
    "q": "Ten minutes in, the captain asks for your air. Your gauge reads about half. What do you tell him?",
    "opts": [
     "Round it up — \"plenty left\" — so he doesn't pull you off the nozzle",
     "Nothing yet — you'll speak up when your low-air alarm goes off",
     "Give him the real number — \"half\" — so he can plan the exit",
     "Tell him later during overhaul — the fire's already knocked down"
    ],
    "best": 2,
    "mp": "M.P. 202.05C: \"It is the individual firefighter's responsibility to continually assess and report his/her air consumption to his/her company officer.\" Captains use triggers — benchmarks, elapsed time, 50% alarms — and can only manage what you tell them."
   },
   {
    "label": "Low-air rule",
    "q": "M.P. 202.05C: when do you leave the hazard zone?",
    "opts": [
     "When the low-air alarm goes off — that's what the alarm is for",
     "When the job is done — it's a small house and the door is close",
     "Before the low-air alarm — the last third is emergency reserve",
     "At half a bottle — anything below that is the reserve air"
    ],
    "best": 2,
    "mp": "M.P. 202.05C: \"the last 33% of the air supply in an SCBA is the emergency reserve,\" and \"it is unacceptable to leave the hazard zone with low air alarms activated during normal operations.\" Small house or big box, same rule."
   },
   {
    "label": "Mayday",
    "q": "Overhaul, back bedroom: a ceiling comes down and you're pinned and turned around. You can't fix it in 30 seconds. What now?",
    "opts": [
     "Work free on your own first — Mayday is for when you're out of air",
     "Hit your PASS and wait quietly so you don't clog the channel",
     "Pull your mask off to hear better and yell for your captain",
     "\"Mayday, Mayday, Mayday\" on the radio now, then GRAB LIVES"
    ],
    "best": 3,
    "mp": "M.P. 201.01B: a Mayday is any situation where you can't safely exit the hazard zone or \"an event that cannot be resolved by that individual within 30 seconds.\" Call it early: \"The longer it takes to declare a Mayday situation the less likely a successful resolution is possible.\""
   },
   {
    "label": "Exit plan",
    "q": "Time to back out with your captain. How do you get out?",
    "opts": [
     "Take the nearest window — faster than backing the line out",
     "Follow your hose line back out the way you came in, together",
     "Walk out the back door — the smoke's lifted enough to see",
     "Leave the line where it is and head for daylight any way you can"
    ],
    "best": 1,
    "mp": "M.P. 202.05C: \"The best plan includes leaving the hazard zone following the hose line out that you came in on.\" M.P. 201.03: crews leaving by a different point must immediately notify their accountability officer."
   },
   {
    "label": "Overhaul air",
    "q": "Fire's out, smoke is thin and white. L1 is pulling ceiling over the fire room. Your mask?",
    "opts": [
     "Off — the smoke is white now, so the dangerous part is over",
     "On — overhaul smoke is toxic until the air is tested safe",
     "Off, but stay low near the floor where the air is cleaner",
     "Off once the windows are open and a fan is moving air"
    ],
    "best": 1,
    "mp": "M.P. 202.05B: \"Premature removal of SCBA must be avoided at all times. This is particularly significant during overhaul when smoldering materials produce increased quantities of toxic substances including carcinogens.\" Keep it on until the atmosphere is established safe by testing."
   },
   {
    "label": "PAR",
    "q": "BC1 asks E1 for a PAR after \"under control.\" What is your captain confirming?",
    "opts": [
     "Every crew member is accounted for and has adequate exit air",
     "Conditions, actions and needs — a progress report on the fire",
     "Each member's exact gauge reading, read out to Command",
     "The primary search is finished and the house is All Clear"
    ],
    "best": 0,
    "mp": "M.P. 201.03: \"The PAR is a confirmation that all members are accounted for and have an adequate exit air supply.\" PARs are required as companies report All Clear and under control, after any sudden hazardous event, and every 30 minutes."
   },
   {
    "label": "Ready state",
    "q": "Back at the rig. Before E1 goes back in service, what about your SCBA?",
    "opts": [
     "Hang it back up as-is — you'll check it at the next shift change",
     "Leave it for the engineer — he handles the crew's bottles",
     "Swap to a full bottle and check the pack — ready for the next one",
     "Top off the bottle only if it reads under the low-air mark"
    ],
    "best": 2,
    "mp": "M.P. 202.05B: each member checks their SCBA \"at the beginning of each shift, after each use, and at any other time it may be necessary to render the equipment in a ready state.\" It's your pack — you're accountable for it."
   },
   {
    "label": "MP reference",
    "q": "Nozzle FF checklist — M.P. 202.04: 1¾-inch at 150 GPM for residential; lines of adequate length; surface cooling then fuels. M.P. 202.02B: doors closed until the charged line is ready; reset with a straight stream to the ceiling for 15–30 seconds, then an aggressive interior attack from the air-intake side. M.P. 206.03: probies are directly supervised in smoke and fire — stay on the line. M.P. 202.05C: report your air; leave before the low-air alarm; follow your line out. M.P. 201.01B: can't fix it in 30 seconds — Mayday. M.P. 202.05B: mask stays on in overhaul.",
    "opts": [
     "Understood — show my debrief"
    ]
   }
  ]
 },
 {
  "id": "probie-hydrant",
  "title": "Probie: Hydrant & supply — Garage apartments",
  "sub": "Probie seat · Plug FF on E1 · M.P. 202.12E Water Supply · 202.16 Car Fires · 201.04 2 In / 2 Out",
  "dispatch": "FD Haz Chan A1 · Inc #000588 · Vehicle Fire Into Structure · 3518 W. Palo Verde Dr, Phoenix · CODE 3 · 21:42 · Units: E1, L1, E2, E3, R3, BC1. Caller says a pickup is burning in the garages under the apartments, flames up the front of the building, tenants upstairs.",
  "arrival": "You're the plug firefighter on E1. A block out, your captain sees the glow and the column: \"Working fire — we're laying in. Hydrant at the corner.\" The engineer stops at the plug and you step off with the hydrant bag. Up the street: a 2-story stucco apartment building over a row of garages, a pickup burning in the open bay on the far left, fire rolling up the opening toward the units above. Tenant status unknown.",
  "image": "assets/scenarios/garage-apt-arrival.jpg",
  "imageAlt": "Arrival view: 2-story stucco apartment building, pickup truck burning at an open garage bay on the left with fire and smoke rolling up toward the apartments above, four closed garage doors, wood fence in the foreground, balcony unit on the right.",
  "hotspots": [
   {
    "kind": "spray",
    "x": 19,
    "y": 55,
    "w": 16,
    "h": 34,
    "label": "Burning pickup / open bay",
    "note": "First water from a 45 — passenger compartment, then the bay",
    "c": [
     "Fire Control"
    ]
   },
   {
    "kind": "move",
    "x": 41,
    "y": 10,
    "label": "Apartments above",
    "note": "Units over the fire — the search goes up there"
   },
   {
    "kind": "move",
    "x": 47,
    "y": 65,
    "label": "Closed garage bays",
    "note": "Force the bay next door and check for extension"
   },
   {
    "kind": "move",
    "x": 22,
    "y": 77,
    "label": "Rear bumper",
    "note": "Feed hose standing right behind the truck's bumper"
   },
   {
    "kind": "move",
    "x": 8,
    "y": 82,
    "label": "Fence line",
    "note": "Walk the 360 around the fence"
   }
  ],
  "steps": [
   {
    "label": "Lay in",
    "q": "Why does your captain lay in from the hydrant instead of driving straight up on tank water?",
    "opts": [
     "Department rule — the first engine lays a line on every call",
     "Working fire — it needs an uninterrupted supply, not 500 gallons",
     "So the engineer can park closer and block the street with the rig",
     "Vehicle fires can only be knocked down with hydrant pressure"
    ],
    "best": 1,
    "mp": "M.P. 202.12E: \"First due engine companies approaching the scene with any evidence of a working fire should secure a water supply.\" \"An uninterrupted water supply is necessary to sustain effective water volumes during a fire attack.\" The engine carries about 500 gallons."
   },
   {
    "label": "Lay exceptions",
    "q": "When would the first-due engine skip the lay, per M.P. 202.12E?",
    "opts": [
     "Known rescue needing the full crew, fire location unknown in a complex, or a high-rise",
     "Any vehicle fire, any building under 3 stories, or a hydrant more than 300 feet from the fire",
     "Night fires, rain, or any time the second engine is less than 3 minutes out",
     "Never — the first engine lays in on every working fire, with no exceptions"
    ],
    "best": 0,
    "mp": "M.P. 202.12E exceptions: \"Known or highly suspected rescue requiring a full crew,\" \"Unsure of actual fire location in multi-unit residential or commercial building complex,\" and \"Fire in a high-rise building.\""
   },
   {
    "label": "Wrap the plug",
    "q": "Engineer stops at the hydrant. What do you do first?",
    "opts": [
     "Hook the supply line to the hydrant and open it, then wave him on",
     "Ride to the fire, help pull hose, and walk back for the hydrant",
     "Stand in the street holding the hose and wave the engineer forward",
     "Step off curbside, anchor the hose at the hydrant, signal him to go"
    ],
    "best": 3,
    "mp": "IFSTA forward lay: the hydrant firefighter steps off on the curb side, anchors the supply line at the hydrant, signals the engineer to proceed, and stays clear while the hose pays out. No water until the line is connected at the engine and the engineer calls for it."
   },
   {
    "label": "Lay side",
    "q": "The supply line pays out behind E1 as it heads for the building. Where should it lie?",
    "opts": [
     "Down the center of the street so cars can pass on both sides",
     "Along the hydrant side, crossing over at the fire if needed",
     "In the far gutter, as far from the hydrant as the street allows",
     "Zigzagged across the lanes so there's slack to move the rig later"
    ],
    "best": 1,
    "mp": "M.P. 202.12E: \"When possible, lay the supply hose along the hydrant-side of the roadway and cross over at the fire if necessary. Slow down when laying lines\" — it keeps hose off the road, protects people, and gives the captain time to size up."
   },
   {
    "label": "Prep the plug",
    "q": "While E1 lays in, how do you get the hydrant ready?",
    "opts": [
     "Cap off, flush briefly to clear debris, then connect the supply line",
     "Connect straight to the outlet — flushing wastes time and water",
     "Open it fully with the caps on so it's pressurized for the engineer",
     "Pull every cap and leave them off so the engineer can pick one"
    ],
    "best": 0,
    "mp": "IFSTA: remove the cap, flush the hydrant briefly to clear rocks and debris and confirm it flows, shut it, then connect. Debris in the supply line ends up in the pump or the nozzle screen."
   },
   {
    "label": "Charge it",
    "q": "Engineer on the radio: \"Pump to hydrant, charge it.\" What do you do and say?",
    "opts": [
     "Spin it open fast and say nothing — he'll see the line fill",
     "Open it halfway to protect the hose, then report \"water on\"",
     "Open it slowly all the way, then: \"Hydrant to Pump, water on the way\"",
     "Open it fully, then run up to the fire to tell the captain in person"
    ],
    "best": 2,
    "mp": "IFSTA: open the hydrant slowly to avoid water hammer, then all the way so the engineer gets full flow. M.P. 205.01 order model: acknowledge with a brief restatement — he knows water is coming and can plan his tank."
   },
   {
    "label": "Tank water",
    "q": "The attack line is flowing off the tank before your supply arrives. 500 gallons at 150 GPM lasts about how long?",
    "opts": [
     "About 3 minutes",
     "About 10 minutes",
     "About 1 minute",
     "About 6 minutes"
    ],
    "best": 0,
    "mp": "M.P. 202.04: a 1¾-inch line flows 150 GPM (2.5 gallons per second). 500 ÷ 150 ≈ 3.3 minutes. That's why the plug firefighter moves with purpose — the tank is a bridge, not a water supply."
   },
   {
    "label": "Stuck cap",
    "q": "The cap won't break loose. Engineer: \"How's my water? Tank's at a quarter.\" What do you do?",
    "opts": [
     "Tell him straight — \"Cap's stuck, working it\" — and keep at it",
     "Say nothing until it's fixed so you don't tie up the channel",
     "Leave the hydrant and run up to the rig to help pull hose",
     "Tell him \"water on the way\" so he doesn't worry about it"
    ],
    "mp": "No MP script for a stuck cap — but the engineer is managing a few minutes of tank water for a crew on the nozzle. He needs the truth so he can tell the captain, gate down, or get help. A false \"water on the way\" can leave a crew inside with nothing."
   },
   {
    "label": "Walk the line",
    "q": "Water's on and the supply line is hard. What do you do on your way up to the engine?",
    "opts": [
     "Walk the supply line to the rig, clearing kinks and checking for leaks",
     "Jog straight up the sidewalk — the engineer will spot any problem from the pump",
     "Stay at the hydrant for the rest of the fire in case it shuts off",
     "Shut the hydrant halfway so the hose isn't under so much pressure"
    ],
    "best": 0,
    "mp": "IFSTA: check the supply line on the way to the engine — kinks and bad couplings rob flow. M.P. 202.12E: an unsupported 500-foot lay of 4-inch can flow about 800 GPM, but only if the line is clear."
   },
   {
    "label": "Your next job",
    "q": "You reach E1. Captain and FF2 are taking the line to the truck, then up to the units. Where are you?",
    "opts": [
     "Back at the hydrant — someone has to guard it the whole fire",
     "Primary IRIC with the engineer — PPE on, radio up, tracking the crew",
     "Inside on the line with them — three hands make a faster knockdown",
     "Off on your own to walk the 360 around the back of the building"
    ],
    "best": 1,
    "mp": "M.P. 201.04: on a four-person crew with the captain in fast attack, \"the plug person assumes the primary 2 in / 2 out position and the engineer assumes the secondary.\" The primary member \"must be solely dedicated to tracking interior personnel.\""
   },
   {
    "label": "Passport",
    "q": "Where does E1's passport go once the attack line is charged?",
    "opts": [
     "In the captain's pocket — it goes inside with the crew",
     "On the dash, where it stays for the entire incident",
     "On the discharge gate for that line, at the pump panel",
     "With BC1 at the command post, handed over in person"
    ],
    "best": 2,
    "mp": "M.P. 201.03: the engineer is the accountability officer for crews off his rig and \"places passport/pouch on discharge gate when hoseline is charged.\" \"Passports never enter the hot zone.\""
   },
   {
    "label": "Mask up",
    "q": "You're outside at the rig, 40 feet from the burning truck, smoke drifting across the drive. SCBA?",
    "opts": [
     "Not needed — vehicle fires outdoors don't call for a mask",
     "Only if the smoke turns black and drifts over the engine",
     "On air — visible products of combustion, vehicle fire or not",
     "Only for the crew on the nozzle; IRIC stays off air until going in"
    ],
    "best": 2,
    "mp": "M.P. 202.05B: SCBA is required \"where products of combustion are visible in the atmosphere, including vehicle fires and dumpster fires.\" M.P. 202.16: \"The minimum level of protection for firefighters is full protective clothing breathing air from their SCBA.\""
   },
   {
    "label": "Approach",
    "hotspots": true,
    "q": "Before you settle in as IRIC you help the crew flake out. Where does the first water go? Tap a number on the picture or pick from the list.",
    "best": 0,
    "mp": "M.P. 202.16: \"initiate the fire attack from a 45-degree angle, utilizing the reach of the fire stream.\" \"First water should be applied to extinguish or protect the passenger compartment and an all clear should be obtained.\" Then the bay and the fire climbing toward the units."
   },
   {
    "label": "Vehicle type",
    "q": "M.P. 202.16 lists three steps for every vehicle fire. What's step 1?",
    "opts": [
     "Pop the hood and cut both battery cables right away",
     "Identify the vehicle type and address life safety",
     "Chock the wheels and turn off the ignition",
     "Pull the truck out of the bay with the engine"
    ],
    "best": 1,
    "mp": "M.P. 202.16: \"1. Identify the vehicle type and address life safety. 2. Address scene safety, apparatus placement... chock wheels. 3. Disable the vehicle.\" EV, hybrid, LPG or CNG changes everything that follows."
   },
   {
    "label": "Line size",
    "q": "What's the minimum attack line for a vehicle fire, per M.P. 202.16?",
    "opts": [
     "1-inch booster line",
     "2½-inch line only",
     "1¾-inch handline",
     "Any size, with foam"
    ],
    "best": 2,
    "mp": "M.P. 202.16: \"The minimum size of hose line to initiate an attack on a vehicle fire is the 1 ¾ inch handline.\" This one is in a garage under occupied units — it gets treated like the structure fire it's about to be."
   },
   {
    "label": "Approach angle",
    "q": "How does the crew you're supporting approach the burning pickup?",
    "opts": [
     "Straight at the front bumper so the stream hits the engine bay",
     "Straight in from the side to get water on the cab the fastest",
     "From the rear at the tailgate, aiming at the fuel fill to cool the tank",
     "From a 45-degree angle, full PPE, on air, using the stream's reach"
    ],
    "best": 3,
    "mp": "M.P. 202.16: \"Approach the vehicle with full PPE and SCBA with facepiece, initiate the fire attack from a 45-degree angle, utilizing the reach of the fire stream.\" Bumpers launch, rims blow out sideways — the corner keeps you out of both lines of fire."
   },
   {
    "label": "Bumper hazard",
    "q": "Why does your captain keep you off the pickup's bumpers while you feed hose?",
    "opts": [
     "Heated energy-absorbing bumpers can let go and travel 25 feet",
     "Plastic bumpers melt and drip burning fuel onto the garage floor",
     "Bumpers hide the fuel tank; a stream hitting them can rupture it",
     "Chrome bumpers conduct battery current when they get wet"
    ],
    "best": 0,
    "mp": "M.P. 202.16: energy-absorbing bumpers \"will develop high pressures which may result in the sudden release of the bumper assembly... Bumper assemblies have been known to travel 25 feet.\""
   },
   {
    "label": "Fuel tank",
    "q": "Fire is working near the fuel fill. What's the rule on the tank?",
    "opts": [
     "Pop the gas cap so the pressure bleeds off before it ruptures",
     "Don't pull the cap or put a stream into the tank — it's pressurized",
     "Fill the tank with water through the fill neck to cool it from inside",
     "Cover the fill with foam before anyone works near the cab"
    ],
    "best": 1,
    "mp": "M.P. 202.16: \"Do not remove gas cap, as tank may have become pressurized. Do not direct hose stream into tank, as this will cause pressurization of tank, with a possible result of burning fuel spewing from the tank fill opening.\""
   },
   {
    "label": "Hood and hatch",
    "q": "The crew wants the hood open to get water on the engine fire. What's the hazard?",
    "opts": [
     "Heated lift struts can fail — the hood can fly open with force",
     "The hood is the battery ground; touching it can shock you",
     "Opening the hood always flashes the fire back into the cab",
     "Hoods lock when heated and can only be cut open with a saw"
    ],
    "best": 0,
    "mp": "M.P. 202.16: when gas cylinders in hold-open devices are heated, \"excessive pressure may develop in lift assists causing a trunk, hatch, or hood to fly open with explosive force when the latch mechanism is released.\" Give it room when you pop the latch."
   },
   {
    "label": "Victim status",
    "cat": "sizeup",
    "q": "Are people hurt? What do you know right now?",
    "opts": [
     "Unknown — tenants above, nobody has checked the units yet",
     "A neighbor says the truck's owner got out and is in the lot",
     "Tenant on the balcony yelling that smoke is in her unit",
     "Injuries reported — someone burned trying to move the truck"
    ],
    "mp": "M.P. 202.02C: on residential fires, Command directs \"a primary search in all involved and exposed occupancies.\" The units above the bay are exposed — somebody is going up there."
   },
   {
    "label": "What’s happening inside?",
    "cat": "sizeup",
    "q": "What’s happening inside? Your read from the pump panel:",
    "opts": [
     "Truck darkening down, smoke pushing into the units above",
     "Fire through the garage ceiling into the apartment over it",
     "Fire spreading into the closed bays next door",
     "Unknown — no report from the crew yet"
    ]
   },
   {
    "label": "IRIC Mayday",
    "q": "As IRIC you hear your captain upstairs: \"Mayday, Mayday, Mayday.\" What do you do?",
    "opts": [
     "Run in alone right away — every second counts, the engineer has to pump",
     "Stay put — IRIC only watches the door, it never goes in for anyone",
     "Shut down the pump so the crew inside knows something is wrong",
     "Tell Command what you're doing, then go in as a team, not alone"
    ],
    "best": 3,
    "mp": "M.P. 201.04: \"any rescue efforts be initiated as a team (2 members) and well communicated prior to action,\" and 2 in / 2 out members \"must communicate their actions with Command or AHQ.\" A solo rescuer becomes the second Mayday."
   },
   {
    "label": "Shut down",
    "q": "Fire's out. Engineer: \"Shut down the hydrant.\" How?",
    "opts": [
     "Slam it shut fast so the line drains before you break it down",
     "Close it slowly to avoid water hammer, then drain the line",
     "Leave it open and just break the coupling at the engine",
     "Close it halfway and let the rest bleed off on its own"
    ],
    "best": 1,
    "mp": "IFSTA: close hydrants slowly — snapping one shut sends a water hammer back through the main and the hose. Then bleed and drain the supply line before you break couplings."
   },
   {
    "label": "PAR",
    "q": "Command calls \"under control\" and asks for a PAR. What is it?",
    "opts": [
     "A progress report: conditions, actions and needs",
     "Every member accounted for, with adequate exit air",
     "Each member's exact air pressure, read on the radio",
     "Primary search in the units is done and clear"
    ],
    "best": 1,
    "mp": "M.P. 201.03: \"The PAR is a confirmation that all members are accounted for and have an adequate exit air supply,\" required as companies report under control and All Clear, after any sudden hazardous event, and every 30 minutes."
   },
   {
    "label": "MP reference",
    "q": "Plug FF checklist — M.P. 202.12E: any sign of a working fire, secure a water supply; lay on the hydrant side and slow down. IFSTA: anchor, flush, connect, open slowly and fully, close slowly. M.P. 202.04: 500 gallons at 150 GPM is about 3 minutes. M.P. 201.04: the plug person is primary 2 in / 2 out — rescue as a team, communicated. M.P. 201.03: passport on the discharge gate. M.P. 202.16: identify the vehicle, 1¾-inch minimum, 45-degree approach, passenger compartment first, never into the fuel tank, bumpers and struts can launch. M.P. 202.05B: SCBA on at vehicle fires.",
    "opts": [
     "Understood — show my debrief"
    ]
   }
  ]
 },
 {
  "id": "probie-search",
  "title": "Probie: Search — Tile roof 2nd floor",
  "sub": "Probie seat · L1 search FF · M.P. 202.02C Rescue · 206.03 Supervision · 201.01B Mayday",
  "dispatch": "FD Haz Chan A1 · Inc #000452 · House Fire · 4127 E. Quail Canyon Rd, Phoenix · CODE 3 · 16:51 · Units: E1, L1, E2, E3, R3, BC1. Caller is the mother, outside: flames from an upstairs window, her 14-year-old son was asleep in his bedroom upstairs.",
  "arrival": "You're the probie on L1, four months on the job. E1 is stretching a line to the front door. Command: \"L1, Search & Rescue, second floor.\" The mother grabs your captain's arm — her son's room is upstairs on the right. 2-story stucco house, concrete tile roof, fire venting from a 2nd-floor window, heavy black smoke over the whole roof.",
  "image": "assets/scenarios/tileroof-arrival.jpg",
  "imageAlt": "Arrival view: 2-story stucco Southwest-style house with a concrete tile roof, fire venting from a 2nd-floor window, heavy black smoke over the roof, arched front entry, garage on the right with a silver pickup parked in front, desert hillside in the background.",
  "hotspots": [
   {
    "kind": "move",
    "x": 30,
    "y": 63,
    "label": "Front door",
    "note": "Go in behind E1's line and up the interior stairs"
   },
   {
    "kind": "spray",
    "x": 59,
    "y": 26,
    "w": 10,
    "h": 14,
    "label": "2nd-floor fire window",
    "note": "Hit the upstairs fire window from the yard",
    "c": [
     "Fire Control"
    ]
   },
   {
    "kind": "move",
    "x": 77,
    "y": 36,
    "label": "Upstairs bedroom windows",
    "note": "Ladder the son's bedroom window — vent, enter, isolate, search"
   },
   {
    "kind": "move",
    "x": 87,
    "y": 42,
    "label": "Tile roof",
    "note": "Get up on the roof and open it up"
   },
   {
    "kind": "move",
    "x": 51,
    "y": 55,
    "label": "Barred front windows",
    "note": "Search the first floor through the barred windows"
   },
   {
    "kind": "move",
    "x": 88,
    "y": 58,
    "label": "Garage",
    "note": "Force the garage and go in through the house door"
   }
  ],
  "steps": [
   {
    "label": "Supervision",
    "q": "Captain: \"You stay on me. Hand on my boot or on my coat.\" Why isn't that optional for you?",
    "opts": [
     "Probies share the captain's radio, so you can't be out of reach",
     "M.P. 206.03: probies get direct supervision in smoke or fire",
     "Only until the fire is knocked down — then you search alone",
     "Ladder company rule; engine probies can work on their own"
    ],
    "best": 1,
    "mp": "M.P. 206.03: \"Direct supervision will be required at the moment the fire fighter enters an area that exposes the fire fighter to potential injury or death,\" starting with \"Entering a building involved with smoke or fire.\" Inexperienced people in zero visibility \"can easily take inappropriate action.\""
   },
   {
    "label": "Less experienced",
    "q": "Under M.P. 206.03, who counts as a \"less experienced\" firefighter?",
    "opts": [
     "Only probies — once you pass probation you're on your own",
     "Anyone under five years, or anyone new to the station",
     "Only recruits still in the academy, not field probies",
     "A probie, or anyone under two years on firefighting duty"
    ],
    "best": 3,
    "mp": "M.P. 206.03: \"A. Probationary fire fighter. B. Any member with less than two years total experience assigned to fire fighting duties.\" They're supervised by the company officer or a firefighter with more than two years — and two years doesn't automatically make you experienced."
   },
   {
    "label": "Radio terms",
    "q": "\"Search & Rescue\" versus \"All Clear\" on the radio — what's the difference?",
    "opts": [
     "Search & Rescue is the assignment; All Clear is only the completion report",
     "They're interchangeable — either one means the search is underway",
     "All Clear is the assignment; Search & Rescue means a victim was found",
     "Search & Rescue means a victim was found; All Clear means nobody lives there"
    ],
    "best": 0,
    "mp": "M.P. 202.02C: \"The term 'SEARCH & RESCUE' should be used when assigning companies to a primary search over the radio; 'ALL CLEAR' should be used only as a completion report.\""
   },
   {
    "label": "Approach",
    "hotspots": true,
    "q": "Where do you and your captain go to start the search? Tap a number on the picture or pick from the list.",
    "best": 2,
    "mp": "M.P. 202.02C: extend rescue efforts to the \"most severely threatened\" first — a reported victim upstairs, above the fire. IFSTA vent-enter-isolate-search puts you in that room fastest from a ladder, and the first move inside is closing the bedroom door. The interior stairs stay with E1's line."
   },
   {
    "label": "Coordinate the window",
    "q": "Before you take out the bedroom window, your captain radios Command. Why?",
    "opts": [
     "So Alarm can log the exact time the search was started",
     "A broken window is ventilation — it must match E1's attack",
     "So E1 shuts down its line while you climb in the window",
     "Only to ask permission before breaking a homeowner's window"
    ],
    "best": 1,
    "mp": "M.P. 202.02B: \"Co-ordinate all ventilation of the structure.\" M.P. 202.04: \"Access and egress openings must be considered as ventilation,\" and \"uncoordinated ventilation will make fire control more difficult.\" Your entry point is a vent point."
   },
   {
    "label": "Ladder",
    "q": "You throw a ground ladder to the bedroom window. Where does the tip go?",
    "opts": [
     "Just below the sill, so you can step in and bring a victim out",
     "2–3 feet above the sill so it shows up through the smoke",
     "At the top of the window frame to clear the glass with the beam",
     "On the wall beside the window, out of the smoke coming out"
    ],
    "best": 0,
    "mp": "IFSTA: for entry and rescue, set the tip at or just below the sill so you can get in and out and carry a victim onto the ladder. The 2–3 feet above rule is for roof access (M.P. 202.05), not a window."
   },
   {
    "label": "Sound the floor",
    "q": "Glass cleared. Before you go in, what do you do?",
    "opts": [
     "Dive in headfirst — speed matters more than anything now",
     "Wait on the ladder for the smoke to clear out the window",
     "Sound the floor inside with a tool, then go in low",
     "Step down onto whatever is under the window — it's solid"
    ],
    "best": 2,
    "mp": "IFSTA: sound the floor below the window with a tool before you commit your weight — fire under you or a hole in the floor kills firefighters. Sweeping the sill area also finds a victim who collapsed trying to get out the window."
   },
   {
    "label": "Isolate",
    "q": "You're in the bedroom. First thing you do?",
    "opts": [
     "Search the closet first — kids hide in there",
     "Open the bedroom door to clear smoke out the window",
     "Shout for the boy and wait by the window for an answer",
     "Find the bedroom door and close it — isolate the room"
    ],
    "best": 3,
    "mp": "IFSTA VEIS: isolate the room by closing the door before you search, or the window you just opened pulls the fire down the hall at you. M.P. 202.02C: a closed interior door protects victims from smoke and heat."
   },
   {
    "label": "Search pattern",
    "q": "How do you search the room with your captain?",
    "opts": [
     "Crawl straight to the middle of the room and sweep in circles",
     "Stand up and walk it fast — it's just one small bedroom",
     "Stay on one wall around the room, sweeping beds and floor",
     "Search only the bed — that's where a sleeper will be"
    ],
    "best": 2,
    "mp": "IFSTA: oriented, systematic search — keep contact with a wall, work one direction around the room, sweep out with a tool or your leg, under and on the bed, and keep your captain informed. You end up back at your exit without getting lost."
   },
   {
    "label": "Where kids are",
    "q": "A 14-year-old. Where do you make sure you check?",
    "opts": [
     "Only the bed and the open floor — teens don't hide",
     "In the hallway only — kids always try to run for the front door",
     "Under the bed, in the closet, behind the door, by the window",
     "Under the window only — everyone heads for the light"
    ],
    "best": 2,
    "mp": "IFSTA: victims are often found near exits (doors and windows), and kids hide — under beds, in closets, behind doors. M.P. 202.02C: elevated victims above the fire face the worst toxic and thermal exposure."
   },
   {
    "label": "TIC",
    "q": "Your captain is running the TIC. How should you treat it?",
    "opts": [
     "If the TIC shows nothing, the room is clear — move on",
     "It speeds the search — it doesn't replace the wall and the sweep",
     "It sees through walls, so search only where it shows heat",
     "It's for finding the fire, not for finding victims"
    ],
    "best": 1,
    "mp": "M.P. 202.05A: \"The primary use of the TIC for the fire department is for conducting search/rescue and crew accountability tasks\" — but \"sole reliance on the camera is not prudent fire fighting,\" and it can malfunction."
   },
   {
    "label": "Victim found",
    "q": "Your hand hits a leg beside the bed: the boy, unresponsive. Now what?",
    "opts": [
     "Tell your captain, then remove him together by the safest path",
     "Pass him out the window to whoever's there, then keep searching",
     "Carry him down the ladder yourself while the captain finishes",
     "Leave him for now, finish the room, and come back with help"
    ],
    "best": 0,
    "mp": "M.P. 202.02C: \"Normal means of interior access (e.g., stairs, halls...) should be utilized to remove victims whenever possible. Secondary means of rescue (e.g., ... ground ladders...) must be utilized in their order of effectiveness.\" M.P. 206.03: you stay with your captain."
   },
   {
    "label": "Victim status",
    "cat": "sizeup",
    "q": "Are people hurt? What do you know right now?",
    "opts": [
     "Son found in the right-side bedroom, unresponsive — being removed",
     "Unknown — still searching the second floor",
     "Mother now says he may have gone out the back",
     "Two victims now — a friend was sleeping over"
    ],
    "mp": "M.P. 202.02C: \"Command and operating companies cannot depend solely upon reports from residents and spectators\" — use them to aim the search, then search everything you can reach."
   },
   {
    "label": "Victim report",
    "q": "Who tells Command about the victim, and when?",
    "opts": [
     "You call \"All Clear\" — the reported victim has been found",
     "Your captain, right away: \"L1, one victim, second floor, removing\"",
     "Nobody until he's outside, so you don't clog the radio",
     "R3 — the rescue company is the one that reports every victim on scene"
    ],
    "best": 1,
    "mp": "M.P. 202.02C: \"When primary search companies encounter and remove victims, Command must assign other companies to continue to cover the interior positions vacated by those companies.\" Command can't backfill your area if it doesn't know you left it."
   },
   {
    "label": "Not clear yet",
    "q": "The boy is out. Is the second floor \"All Clear\"?",
    "opts": [
     "Yes — the reported victim is out, so the primary search is complete",
     "Yes, as long as the mother confirms nobody else lives there",
     "No — the rest still needs a primary; another company covers it",
     "No — but nobody searches until the fire is completely out"
    ],
    "best": 2,
    "mp": "M.P. 202.02C: a primary search means companies \"have quickly gone through all affected areas and verified the removal and/or safety of all occupants.\" One victim out is not every room searched."
   },
   {
    "label": "Treatment",
    "q": "Where does the boy go once he's out of the house?",
    "opts": [
     "To R3 and the treatment area set up outside",
     "Hand him to his mother in the street and go back in",
     "Lay him on the lawn by the door and go back up",
     "Into the back of E1's cab until an ambulance shows"
    ],
    "best": 0,
    "mp": "M.P. 202.02C: \"Command must structure treatment of victims after removal.\" M.P. 202.01: rescue companies do search, rescue, treatment and transport — and keep a retrievable status for exactly this."
   },
   {
    "label": "All Clear",
    "q": "You and your captain finish the rest of the 2nd floor — nobody else. What goes on the radio?",
    "opts": [
     "You: \"Search complete, nothing else found\"",
     "Captain: \"L1 to Command, All Clear, second floor\"",
     "Captain: \"Under control, second floor\"",
     "Captain: \"Secondary complete, second floor\""
    ],
    "best": 1,
    "mp": "M.P. 202.02C: \"The completion of the primary search is reported utilizing the standard radio reporting term 'All Clear.'\" Command records it as the benchmark. \"Under control\" is fire control, and a secondary comes later."
   },
   {
    "label": "PAR",
    "q": "Command acknowledges the All Clear. What does M.P. 201.03 require at that point?",
    "opts": [
     "A PAR — your captain confirms the crew is together with exit air",
     "Nothing — PARs are only for Maydays and collapses",
     "A secondary search by your own crew before you leave",
     "Your passport handed to Command in person, right away"
    ],
    "best": 0,
    "mp": "M.P. 201.03: a PAR is required \"as companies report an all clear\" — \"a confirmation that all members are accounted for and have an adequate exit air supply.\""
   },
   {
    "label": "Secondary",
    "q": "Who does the secondary search, and when?",
    "opts": [
     "Your crew, right now, while you know the layout",
     "A different company, after fire control and venting",
     "Nobody — a secondary only happens on commercial fires",
     "The same crew, after the passports are retrieved"
    ],
    "best": 1,
    "mp": "M.P. 202.02C: a secondary search comes after initial fire control and ventilation and \"should preferably be completed by different companies than those involved in the primary.\" Thoroughness, not time, is the critical factor."
   },
   {
    "label": "Air trigger",
    "q": "Right after the All Clear, your captain asks for your air. Why then?",
    "opts": [
     "Benchmarks are air-check triggers — he plans the exit off your number",
     "He has to read every gauge to Command with the All Clear",
     "It's only a habit; air checks matter only on commercial fires",
     "Because the low-air alarms should be going off by about now"
    ],
    "best": 0,
    "mp": "M.P. 202.05C: captains use triggers to check crew air — \"the announcement of the completion of tactical benchmarks, elapsed time notifications or built in 50% notification alarms.\" Then he plans your exit before the low-air alarm."
   },
   {
    "label": "Mayday",
    "q": "Back in the hallway, you get separated and your SCBA is snagged on wires. 30 seconds, still stuck. What first?",
    "opts": [
     "Keep working at it quietly — you'll call once your air gets low",
     "Pull your mask off to see the wires better and work free",
     "\"Mayday, Mayday, Mayday\" on the radio, then work GRAB LIVES",
     "Hit your PASS and wait — radio traffic just slows the rescue"
    ],
    "best": 2,
    "mp": "M.P. 201.01B: a Mayday is \"an event that cannot be resolved by that individual within 30 seconds,\" initiated by \"Mayday, Mayday, Mayday\" on the portable. Then B.O.A. — Breathe, Organize, Act — and disentanglement from your survival training."
   },
   {
    "label": "LUNAR",
    "q": "Command answers your Mayday. What do you give them?",
    "opts": [
     "Your air pressure only — they'll find you by your PASS",
     "LUNAR: Location, Unit, Name, Assignment, Resources needed",
     "Your name and \"I'm okay for now\" so nobody panics",
     "The fire conditions in the hallway and your crew's search progress"
    ],
    "best": 1,
    "mp": "LUNAR (taught in IFSTA and fireground survival training): Location, Unit, Name, Assignment/air, Resources needed. M.P. 201.01B: early, clear communication and \"controlling an emotional response\" give RIC what it needs to find you."
   },
   {
    "label": "GRAB LIVES",
    "q": "M.P. 201.01B GRAB LIVES — what are G, R and A?",
    "opts": [
     "Get out, Retreat, Abandon the hoseline",
     "Grab the hoseline, Reverse direction, Advance to a window",
     "Gauge, Rescue yourself, Ask your partner",
     "Check air Gauge, Radio for help, Activate PASS"
    ],
    "best": 3,
    "mp": "M.P. 201.01B GRAB LIVES: Gauge, Radio, Activate PASS, control Breathing, stay Low, Illuminate, Volume (make noise), find an Exit, Shield your airway (last ditch)."
   },
   {
    "label": "What’s happening inside?",
    "cat": "sizeup",
    "q": "What’s happening inside? Your read from the 2nd floor:",
    "opts": [
     "Fire room darkening down, heat lifting in the hallway",
     "Fire extending into the attic over the bedrooms",
     "Heavy heat at the top of the stairs, conditions worsening",
     "Smoke clearing out the bedroom window you opened"
    ]
   },
   {
    "label": "MP reference",
    "q": "Search FF checklist — M.P. 206.03: probies (or under two years) are directly supervised the moment they enter smoke or fire. M.P. 202.02C: \"Search & Rescue\" assigns, \"All Clear\" completes; most threatened first; victims out by normal routes when possible; report removals so Command backfills; secondary by a different company. IFSTA: tip below the sill, sound the floor, close the door, oriented search. M.P. 202.05A: the TIC helps, never replaces the search. M.P. 201.03: PAR with every All Clear. M.P. 201.01B: can't fix it in 30 seconds — Mayday; GRAB LIVES. LUNAR for the report.",
    "opts": [
     "Understood — show my debrief"
    ]
   }
  ]
 },
 {
  "id": "probie-backup",
  "title": "Probie: Backup line & RIC — Mid-rise",
  "sub": "Probie seat · FF on E2 · M.P. 202.20 Mid Rise · 202.12E Backup lines · 201.03 Accountability · 202.05C Air",
  "dispatch": "FD Haz Chan A1 · Inc #000902 · Apartment Fire · 4-story mid-rise apartment building, smoke showing from the 3rd floor · CODE 3 · Units: E1, L1, E2, E3, L2, R3, BC1. Multiple callers, occupants unknown.",
  "arrival": "You're the probie on E2, second-due. E1's crew is already headed up the west stairwell with the standpipe pack; smoke is pushing from the 3rd-floor balcony band of a sealed-up 4-story building. Command: \"E2, backup line for E1, third floor, west stairwell. Passports to the lobby.\" E3 is ordered On-Deck as RIC. Your captain: \"Grab the standpipe bag and stay on my hip.\"",
  "image": "assets/scenarios/midrise-arrival.jpg",
  "imageAlt": "Arrival view: 4-story mid-rise apartment building, smoke from the 3rd-floor balcony band, white stair tower on the left end, ground-floor entrance with yellow doors, hydrant at the right edge of the parking lot, aerial map inset at lower left.",
  "hotspots": [
   {
    "kind": "move",
    "x": 32,
    "y": 42,
    "label": "West stair tower",
    "note": "E1's attack stairwell — standpipe outlets on the landings"
   },
   {
    "kind": "move",
    "x": 60,
    "y": 63,
    "label": "Main entrance",
    "note": "Alarm panel and lobby — passports go here"
   },
   {
    "kind": "move",
    "x": 51,
    "y": 61,
    "label": "Side door",
    "note": "Closest door to the rig — take any stairs you find"
   },
   {
    "kind": "spray",
    "x": 50,
    "y": 37,
    "w": 14,
    "h": 9,
    "label": "Fire floor balconies",
    "note": "Hit the 3rd floor from the parking lot",
    "c": [
     "Fire Control"
    ]
   },
   {
    "kind": "move",
    "x": 89,
    "y": 66,
    "label": "Hydrant",
    "note": "Supply the FDC so the standpipe has real pressure"
   }
  ],
  "steps": [
   {
    "label": "Passports",
    "q": "Mid-rise. Where does E2's passport go?",
    "opts": [
     "On E1's pump panel, like at a house fire",
     "In your captain's pocket, up the stairs with you",
     "To the building lobby for Lobby to track",
     "On E2's dash for the whole incident"
    ],
    "best": 2,
    "mp": "M.P. 201.03 multi-story: \"All crews reporting to the building will deliver their passports to the building lobby.\" Each crew takes its hoseline ID tag to mark its line at the standpipe. \"Passports never enter the hot zone.\""
   },
   {
    "label": "On-Deck",
    "q": "Command puts E3 On-Deck as RIC. Where is E3?",
    "opts": [
     "Just outside the immediate hazard zone, ready to go",
     "In Level 1 staging a block away, waiting for orders",
     "On the fire floor right behind E1, sharing the line",
     "At the command post, helping track accountability"
    ],
    "best": 0,
    "mp": "M.P. 201.01A: On-Deck companies are \"located just outside the immediate hazard zone, safely distanced from the entrance of a tactical position,\" and the most likely On-Deck assignment is Rapid Intervention Crew."
   },
   {
    "label": "RIC",
    "q": "What is a RIC under M.P. 201.05A?",
    "opts": [
     "Any two firefighters left outside while a crew goes in",
     "A four-person crew, fully equipped, ready to rescue firefighters",
     "The engineer and plug firefighter of the first-due engine",
     "A crew sent in to help any company that needs more hands"
    ],
    "best": 1,
    "mp": "M.P. 201.05A: Rapid Intervention Crew — \"Four-person crew fully equipped on site, in a ready state, to immediately react and respond to rescue firefighters.\" The two-person IRIC is the first-due's temporary version."
   },
   {
    "label": "Approach",
    "hotspots": true,
    "q": "You step off E2 with the standpipe bag. Where do you head? Tap a number on the picture or pick from the list.",
    "best": 0,
    "mp": "M.P. 202.20: \"Determine and monitor the fire attack stairwell,\" and \"clearly identify attack and evacuation stairwells from each floor.\" Standpipes may not be in every stairwell — go where E1 is."
   },
   {
    "label": "Which stairwell",
    "q": "The building has two stair towers. Which one do you use?",
    "opts": [
     "Whichever is closest to the rig — save the walk",
     "The east one, so you don't crowd E1's hose on the stairs",
     "The attack stairwell E1 is in; the other is for residents",
     "Both — split the crew up so you can cover more floors faster"
    ],
    "best": 2,
    "mp": "M.P. 202.20: \"Clearly identify attack and evacuation stairwells from each floor.\" The attack stairwell holds the standpipe and the lines; the evacuation stairwell stays clean for residents getting out."
   },
   {
    "label": "Residents",
    "q": "Residents are coming down your attack stairwell, past the hose. What do you do?",
    "opts": [
     "Tell your captain so Command knows — keep them moving down",
     "Send them back up to their units to shelter in place",
     "Stop and walk them out yourself, then come back up",
     "Ignore them — the hose is your only job right now"
    ],
    "mp": "M.P. 202.20: occupants \"may not shelter in place\" and \"may attempt to exit the building floor via most familiar routes\" — even your attack stairwell. No MP script for the probie here: stay with your captain and get the word to Command."
   },
   {
    "label": "Missing standpipe",
    "q": "Second-floor landing, west stairwell: no standpipe outlet. Most likely reason?",
    "opts": [
     "Mid-rises never have standpipes — you stretch from the engine",
     "Standpipes may not be in every stairwell or on every landing",
     "It's behind the fire control room door, like in a high-rise",
     "It's only on the fire floor — that's all the code requires"
    ],
    "best": 1,
    "mp": "M.P. 202.20: \"Standpipes may not be present in every stairwell,\" connections \"may be present in interior hallways,\" and \"some standpipe connections can be up to 200' apart.\" Mid-rises typically have no fire control room."
   },
   {
    "label": "Hookup floor",
    "q": "E1 hooked up on the 2nd-floor landing for its 3rd-floor attack. Where does your backup line connect?",
    "opts": [
     "The floor below E1's connection, with extra hose to reach",
     "The same outlet as E1, with a gated wye on the valve",
     "The fire-floor outlet, right at the hallway door so it's close",
     "The floor above the fire, to stop extension upward"
    ],
    "best": 0,
    "mp": "M.P. 202.11 (the department's standpipe model, written for high-rise): \"The back up line and stairwell protection line should both be connected the floor below the initial line attachment,\" so the backup needs an extra 50–75 feet to reach as far."
   },
   {
    "label": "Locked cap",
    "q": "The outlet has a strange locked cap on it. What is it?",
    "opts": [
     "A KNOX locking cap — it takes the \"dog bone\" key",
     "A dry-system cap — it pops off once the FDC is charged",
     "An out-of-service cap — go find another outlet",
     "A pressure-reducing cap — leave it on and connect over it"
    ],
    "best": 0,
    "mp": "M.P. 202.20: \"Fire department connections (FDC) and interior standpipe connections may have KNOX locking caps in place and require the 'dog bone' keys for access.\" Standpipe cap lock removal is a listed task-level skill."
   },
   {
    "label": "Flush the outlet",
    "q": "Cap's off. Before you connect your hose?",
    "opts": [
     "Connect right away — the valve is clean inside the wall",
     "Crack the valve to flush debris and check for water, then connect",
     "Open it fully into the stairwell first to bleed all the air out of it",
     "Connect, then hammer the valve to knock out any scale"
    ],
    "best": 1,
    "mp": "IFSTA: briefly flush a standpipe outlet into the stairwell before connecting to clear debris and confirm water, then shut it and hook up. Junk in the riser ends up in your nozzle."
   },
   {
    "label": "Weak standpipe",
    "q": "You open the valve and the line comes up soft. Why, per M.P. 202.20?",
    "opts": [
     "Your hose is too big — standpipes only feed 1½-inch lines",
     "Fire pumps take 5 minutes to spin up after the alarm",
     "Someone left the FDC caps off, so the water's leaking out",
     "No fire pump — city-pressure wet standpipes can run short"
    ],
    "best": 3,
    "mp": "M.P. 202.20: mid-rises \"do not typically have fire pumps,\" and \"wet standpipe systems with city water pressure above ground level may have inadequate water volume and pressure to mount an effective fire attack.\""
   },
   {
    "label": "Fix the pressure",
    "q": "What fixes the soft standpipe?",
    "opts": [
     "An engine supplied from a hydrant pumping the FDC",
     "Opening the outlet valve on the fire floor to bleed air",
     "Switching to a fog nozzle so it uses less water",
     "Moving your hookup up to the 3rd-floor outlet"
    ],
    "best": 0,
    "mp": "M.P. 202.16: these buildings \"often have no fire pump, and the system is charged with municipal pressure. Pumping the FDC increases the GPM flow and pressure for both the sprinklers and the attack line.\" M.P. 202.20 lists standpipe pumping as a fundamental task."
   },
   {
    "label": "Backup line size",
    "q": "E1 is on a 1¾-inch. What should the backup line be?",
    "opts": [
     "Smaller than E1's — it's only a backup, so it should move faster",
     "Same or greater flow — a 2-inch works at standpipe pressure",
     "The same 1¾-inch as E1, just flowing at a lower pressure",
     "A portable master stream device set up in the hallway"
    ],
    "best": 1,
    "mp": "M.P. 202.12E: \"Back up lines should be of the same or greater water volumes when possible.\" M.P. 202.11: 2-inch lines \"operate effectively at lower psi's typically seen in standpipe operations and provide greater gpm of 250+.\""
   },
   {
    "label": "Backup job",
    "q": "What is your backup line there to do?",
    "opts": [
     "Attack a second unit on its own, away from E1",
     "Protect E1's way out and be ready to reinforce the attack",
     "Hit the floor above the fire so the fire can't extend up there",
     "Wet down the stairwell so residents can get out"
    ],
    "best": 1,
    "mp": "M.P. 202.12E: \"Back up hose lines should be deployed to protect a means of egress when necessary (always bear in mind the presence of Fire personnel operating in opposing positions).\""
   },
   {
    "label": "Flake in the stairwell",
    "q": "You've got extra hose at the outlet. Where do you flake it?",
    "opts": [
     "Down the stairs below the outlet, out of everyone's way going up",
     "Piled on the landing so it's easy to grab from",
     "Up the stairs toward the floor above, so it feeds down clean",
     "Out into the fire-floor hallway before it's charged"
    ],
    "best": 2,
    "mp": "IFSTA standpipe operations: flake excess hose up the stairs toward the floor above so gravity feeds it down and onto the fire floor without kinks. Piles on a landing kink when charged."
   },
   {
    "label": "Stairwell door",
    "q": "Your line runs through the fire-floor stairwell door. What about the door?",
    "opts": [
     "Prop it wide open — you need to be able to see E1 down the hall",
     "Take it off its closer so it can't pinch the hose",
     "Leave it however it ends up — the hose decides",
     "Keep it as closed as the hose allows — it's your refuge"
    ],
    "best": 3,
    "mp": "M.P. 202.04: \"Areas of safe refuge are considered stair wells, stair landings, or any area that can be protected by doors.\" A door chocked wide open turns your refuge and the residents' way out into a chimney."
   },
   {
    "label": "Long stretch",
    "q": "The fire unit is at the far end of a long hall — your stretch will run past 150 feet from the stairwell. What happens?",
    "opts": [
     "Nothing — 150 feet is a commercial-fire rule only",
     "Add another length and keep going — the line will lead you back out",
     "Tell your captain now — past 150 feet needs a risk call first",
     "Drop the backup and go help E1 on its line instead"
    ],
    "best": 2,
    "mp": "M.P. 202.20: \"It is possible the building layout could require hose stretches of more than 150 feet. When this occurs a clear assessment of the required action and the position in the risk management plan is critical.\" \"Firefighters running out of air in contaminated atmosphere is not an option.\""
   },
   {
    "label": "150 feet from where",
    "q": "In a mid-rise, where is the 150 feet measured from?",
    "opts": [
     "From the engine at the curb to the nozzle at the fire",
     "From the stairwell — the safe refuge — to the end of the line",
     "From the front door of the building to the fire unit",
     "From the fire-floor hallway door to the seat of the fire itself"
    ],
    "best": 1,
    "mp": "M.P. 202.04: for mid-rise and high-rise, \"this is measured from any area of safe refuge to the end of the hoseline length stretched into the building.\" Stairwells and landings protected by doors are areas of safe refuge."
   },
   {
    "label": "Bottle change",
    "q": "Your air is getting into the work you planned. Where do you plan the bottle change?",
    "opts": [
     "Out at the rig — always go all the way outside",
     "Right where you are in the hallway, as fast as you can",
     "Inside the building, in an area of safe refuge",
     "Whenever the low-air alarm sounds, wherever you are"
    ],
    "best": 2,
    "mp": "M.P. 202.20 task-level air management: \"Plan for an exit of the contaminated hazard zone prior to low air alarm sounding\" and \"plan for bottle change-out inside the building in an area of safe refuge.\" Communicate air status with your captain."
   },
   {
    "label": "Structure on fire",
    "q": "Opening up a wall in the fire unit, you see the wood studs burning. What do you do?",
    "opts": [
     "Tell your captain now — it gets reported to Command right away",
     "Hit it and keep going — studs burn in every apartment fire",
     "Keep it to yourself until the fire's out, then mention it",
     "Leave the building on your own — it's coming down"
    ],
    "best": 0,
    "mp": "M.P. 202.20: \"When fire has spread into the structural members of a wood framed mid-rise building, this is a very dangerous situation... Recognition of fire involving the structure should be reported to Command immediately.\" Command decides whether to stay offensive."
   },
   {
    "label": "Radio inside",
    "q": "Your radio keeps cutting out on the 3rd floor. What does M.P. 202.20 expect?",
    "opts": [
     "Switch to a quieter channel where you can get through",
     "Stay on the hazard-zone channel; relay radio-to-radio if needed",
     "Turn the radio off to save battery until you're outside",
     "Go back outside every time you need to talk to Command"
    ],
    "best": 1,
    "mp": "M.P. 202.20: mid-rise radio problems \"may require similar communication work arounds such as in high rise buildings including radio to radio relaying,\" and \"all mid-rise fire operations always be conducted on hazard zone radio channels.\""
   },
   {
    "label": "PAR",
    "q": "E1 reports a flashover in the fire unit. Command calls for PARs. What does your captain report?",
    "opts": [
     "Conditions, actions and needs on the 3rd floor",
     "Every E2 member accounted for, with exit air",
     "Each member's exact air reading, one at a time",
     "That E2 is ready to be the RIC if needed"
    ],
    "best": 1,
    "mp": "M.P. 201.03: a PAR is required after \"any sudden hazardous event at the incident — flash over, back draft, collapse, May Day,\" and confirms \"all members are accounted for and have an adequate exit air supply.\" Face to face within the company when possible."
   },
   {
    "label": "PAR triggers",
    "q": "Besides a sudden hazard, when else does M.P. 201.03 require a PAR?",
    "opts": [
     "Missing firefighter, offensive to defensive, All Clear, under control, every 30 minutes",
     "Only when a Mayday is called and when the fire is declared under control",
     "Every 10 minutes of elapsed time and whenever a new company arrives",
     "Every time a crew changes bottles and every time a crew enters the building"
    ],
    "best": 0,
    "mp": "M.P. 201.03 PAR triggers: any report of a missing or trapped firefighter, any change from offensive to defensive, any sudden hazardous event, as companies report an All Clear or under control, every 30 minutes of elapsed time, and any time Command feels it's necessary."
   },
   {
    "label": "Victim status",
    "cat": "sizeup",
    "q": "Are people hurt? What do you know right now?",
    "opts": [
     "Unknown — high-density building, searches still underway",
     "Residents coming down the stairs, none reported hurt yet",
     "L1 reports a rescue from a 3rd-floor balcony",
     "Manager says the fire unit's tenant is at work"
    ],
    "mp": "M.P. 202.20: residential mid-rises \"can have high density occupancy,\" and rescues \"may be required from exterior positions.\" M.P. 202.02C: don't depend on reports from residents and spectators."
   },
   {
    "label": "What’s happening inside?",
    "cat": "sizeup",
    "q": "What’s happening inside? Your read from the 3rd-floor landing:",
    "opts": [
     "Fire unit darkening down, hallway smoke lifting",
     "Smoke banking down the stairwell below the fire floor",
     "Fire into the walls and the floor above",
     "Unknown — no report from E1 yet"
    ],
    "mp": "M.P. 202.20: watch for stack effect \"with smoke well below the fire impacting life safety and egress,\" and fire in spaces between floors. Nothing showing outside meant nothing — the building is sealed tight."
   },
   {
    "label": "MP reference",
    "q": "Backup FF checklist — M.P. 201.03: passports to the lobby; PAR after sudden hazards, All Clear, under control and every 30 minutes. M.P. 201.01A / 201.05A: On-Deck is just outside the hazard zone; RIC is a ready four-person crew. M.P. 202.20: attack vs evacuation stairwells; standpipes not in every stairwell; KNOX caps; city-pressure standpipes can run short — pump the FDC; over 150 feet needs a risk call; change bottles in safe refuge; report structural fire immediately; stay on hazard-zone channels. M.P. 202.12E: backup protects egress with same or greater flow. M.P. 202.04: 150 feet measured from safe refuge.",
    "opts": [
     "Understood — show my debrief"
    ]
   }
  ]
 }
];
