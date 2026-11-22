/* ============================================================
   SCENARIOS — first-arriving size-up game from the Sets & Reps decks
   NO GRADING: every option is just a pick. Picks are logged as the
   player makes them, and the run ends in a debrief report that mirrors
   the player's own choices back in the On Scene Report deck's framework.
   No scores, no pass/fail, no right/wrong marks anywhere.
   Scenario 1: Ocotillo apartment fire (Sets_Tactical_ Apartment_Ocotillo.pptx)
   Dispatch facts verified against the deck's own slides (slides 1-3, 5).
   Scenarios 2-8 (added 2026-11-22): one per fire MP, read in full from the
   City of Phoenix Policies and Procedures index (phoenix.gov), Nov 22 2026.
   2 House — Single-Family Fire (202.04 Fire Control, residential).
   3 Gilbert — 2-Story House Fire (202.04; Sets_Tactical_Gilbert_House_2024.pptx,
   dispatch verified against the deck: 2644 E. Wyatt Way, Solo Stove on the
   upstairs balcony, family evacuating. NOTE: the deck's MCT screen says
   "Apartment Fire" while the title slides say "House Fire" — scenario uses
   House Fire; the visual is unambiguously a house.)
   4 Mid-Rise — Apartment Fire (202.20 Mid Rise Operations).
   5 High-Rise — Tower Fire (202.11 High-Rise Plans).
   6 Strip Mall — Large-Space Fire (202.04A Large-Space Cold Smoke Fires).
   7 Church — Basement Fire (202.04B Basement and Below Grade Fires).
   8 Stick City — High-Piled Storage Fire (202.18 High Piled Outside
   Combustible Storage Fires).
   Each new scenario carries its MP number in the sub line and an "MP
   reference" beat near the end with the MP's must-not-get-wrong lines.
   Hose: PFD lines are 1¾-inch and 2-inch (user, 2026-10-26); an extended
   lay goes to a 1¾-inch line. Both sizes are plain options. No rule for
   choosing 2-inch over 1¾-inch is stated. The 150-foot interior limit from
   M.P. 202.04 / 202.04A appears ONLY as MP reference text inside ungraded
   option picks (the Oct 2026 set-aside was about grading, and there is no
   grading anywhere) — it is never a gate, a fail, or a score.
   On-picture markers: kind 'move' = green arrow pills (where to go);
   kind 'spray' = blue boxes (fire windows/rooms to aim water at).
   Option objects: {t: text, c: [tactical-priority clears it works toward]}
   used only to organize the debrief report, never to judge the pick.
   Steps may carry showIf {label, match}: the step only appears when the
   logged pick for that label contains match (drives the interior chain).
   Steps may carry cat: 'unit' (unit placement) or 'sizeup' (size-up
   questions) for color-coding option buttons.
   ============================================================ */
'use strict';

var SCENARIOS = [
  {
    id: 'ocotillo',
    title: 'Ocotillo \u2014 Apartment Fire',
    sub: 'Woodbridge Apartments \u00b7 6635 N. 19th Ave #214 \u00b7 First-arriving size-up',
    dispatch: 'FD Haz Chan A1 \u00b7 Inc #000001 \u00b7 Apartment Fire \u00b7 6635 N. 19th Ave #214, Phoenix \u00b7 CODE 3 \u00b7 09:15 \u00b7 Units: E1, L1, E2, E3, R3, BC1. Caller reports fire on the 2nd floor.',
    arrival: 'You arrive first on E1: a 2-story apartment building around a courtyard. Heavy black smoke and visible flame from a 2nd-floor unit. Hydrant in the foreground. Occupants unknown \u2014 daytime.',
    image: 'assets/scenarios/ocotillo-arrival.jpg',
    imageAlt: 'Arrival view: 2-story apartment building, heavy black smoke and flame from a 2nd-floor unit, courtyard, hydrant in the foreground.',
    hotspots: [
      { kind: 'move', x: 16, y: 70, label: 'Front door', note: 'Make entry at ground level' },
      { kind: 'move', x: 31, y: 57, label: 'Stairs to 2nd floor', note: 'Climb to the fire floor' },
      { kind: 'move', x: 50, y: 68, label: 'Courtyard', note: 'Move into the courtyard' },
      { kind: 'move', x: 70, y: 72, label: 'Hydrant', note: 'Establish water supply' },
      { kind: 'spray', x: 50, y: 40, w: 14, h: 13, label: 'Fire-unit window', note: 'Reset the fire from outside (exterior attack)', c: ['Fire Control'] },
      { kind: 'spray', x: 16, y: 18, w: 12, h: 14, label: '2nd-floor window', note: 'Reset the fire from outside (exterior attack)', c: ['Fire Control'] }
    ],
    steps: [
      {
        label: 'Approach',
        q: 'You pull up. Where do you go first? Tap a marker on the picture \u2014 green arrows move you, blue boxes aim water.',
        hotspots: true
      },
      {
        label: 'Fireground factors',
        q: 'Size it up. What are the three fireground factors here?',
        opts: [
          'Building: 2-story apartment, courtyard layout. Fire: 2nd-floor unit, heavy black smoke and flame showing. Occupancy: residential, occupants unknown, daytime.',
          'Building: single-story commercial, open lot. Fire: 2nd-floor unit, heavy black smoke and flame showing. Occupancy: residential, occupants unknown, daytime.',
          'Building: 2-story apartment, courtyard layout. Fire: 1st-floor unit, light smoke only. Occupancy: vacant, no life hazard.',
          'Building: 2-story apartment, courtyard layout. Fire: 2nd-floor unit, heavy black smoke and flame showing. Occupancy: residential, confirmed empty.'
        ]
      },
      {
        label: 'Risk profile',
        q: 'What is your risk profile on this fire?',
        opts: [
          'Risk a lot \u2014 savable lives in an occupied residential building, fire room reachable.',
          'Risk a little \u2014 protect exposures and property, no interior commitment yet.',
          'Risk nothing \u2014 defensive from the start; the smoke and flame are too much.',
          'Risk a lot \u2014 the building is the priority, regardless of occupants.'
        ]
      },
      {
        label: 'Strategy',
        q: 'What strategy do you declare?',
        opts: [
          'Offensive',
          'Defensive',
          'Offensive, shifting to defensive if conditions worsen',
          'Wait for BC1 before declaring'
        ]
      },
      {
        label: 'Incident action plan',
        q: 'What is your IAP?',
        opts: [
          'Primary search and fire attack',
          'Fire attack only \u2014 no search until the fire is knocked',
          'Search, fire attack, and exposure protection',
          'Exposure protection first, then fire attack'
        ]
      },
      {
        label: 'Tactical priorities',
        q: 'In what order do you work the tactical priorities?',
        opts: [
          'All Clear (primary search) \u2192 Fire Control \u2192 Loss Stopped',
          'Fire Control \u2192 All Clear (primary search) \u2192 Loss Stopped',
          'Loss Stopped \u2192 Fire Control \u2192 All Clear (primary search)',
          'All Clear (primary search) \u2192 Loss Stopped \u2192 Fire Control'
        ]
      },
      {
        label: 'On-scene report',
        q: 'Give your on-scene report \u2014 which version do you send?',
        opts: [
          'E1 on scene, 6635 N. 19th Ave #214. E1 has command. 2-story apartment, fire in one 2nd-floor unit, heavy black smoke and flame showing. Offensive strategy. IAP is primary search and fire attack. First 3 companies to IAP tasks, 1 held as tactical reserve. Requesting additional resources.',
          'E1 on scene, 6635 N. 19th Ave #214. 2-story apartment, fire in one 2nd-floor unit, heavy black smoke and flame showing. Offensive strategy. IAP is primary search and fire attack. First 3 companies to IAP tasks, 1 held as tactical reserve.',
          'E1 on scene, 6635 N. 19th Ave #214. E1 has command. 2-story apartment, fire in one 2nd-floor unit, heavy black smoke and flame showing. IAP is primary search and fire attack. First 3 companies to IAP tasks, 1 held as tactical reserve.',
          'E1 on scene, 6635 N. 19th Ave #214. E1 has command. 2-story apartment, fire in one 2nd-floor unit. Offensive strategy. IAP is primary search and fire attack.'
        ]
      },
      {
        label: 'Initial 3 & 1',
        q: 'How do you run the initial 3 & 1?',
        opts: [
          'First 3 companies to IAP tasks, 1 held as tactical reserve; call for more resources before assigning the reserve.',
          'All 4 companies to IAP tasks; the reserve comes from the next alarm.',
          'First 2 companies to IAP tasks, 2 held as reserve.',
          'Assign the reserve first to the hardest task, then call for more resources.'
        ]
      },
      {
        label: 'Roof type',
        cat: 'sizeup',
        q: 'Size-up: what roof type do you see?',
        opts: [
          'Flat roof',
          'Pitched roof',
          'Mixed \u2014 flat over the main building, pitched over the units',
          'Can\u2019t tell from here'
        ]
      },
      {
        label: 'House style',
        cat: 'sizeup',
        q: 'Size-up: what style of building is this?',
        opts: [
          'Garden-style apartment \u2014 2-story, courtyard layout',
          'Townhouse-style attached units',
          'Mid-rise apartment building',
          'Single-story converted building'
        ]
      },
      {
        label: 'Attic',
        cat: 'sizeup',
        q: 'Size-up: what about the attic?',
        opts: [
          'Common attic across units',
          'Separate attic per unit',
          'No attic \u2014 flat roof with a cockloft',
          'Unknown \u2014 can\u2019t confirm from outside'
        ]
      },
      {
        label: 'What\u2019s happening inside?',
        cat: 'sizeup',
        q: 'What\u2019s happening inside? Your first read:',
        opts: [
          'Fire in one 2nd-floor unit, smoke showing',
          'Smoke throughout the 2nd floor',
          'Fire already extending into the attic',
          'Unknown \u2014 no interior report yet'
        ]
      },
      {
        label: 'Victim status',
        cat: 'sizeup',
        q: 'Are people hurt? What do you know right now?',
        opts: [
          'Unknown \u2014 no victims reported yet',
          'Occupants seen leaving, no injuries reported',
          'Occupants possibly still inside',
          'Injuries reported \u2014 medical needed'
        ]
      },
      {
        label: 'Attack flow',
        q: 'How do you attack it?',
        opts: [
          'Reset the fire from outside, then move interior (transitional attack)',
          'Hit it from outside only \u2014 stay exterior'
        ]
      },
      {
        label: 'Go interior',
        showIf: { label: 'Attack flow', match: 'interior' },
        q: 'You go interior \u2014 then what?',
        opts: [
          'Search the fire unit',
          'Attack the fire room directly',
          'Move to the next room \u2014 check the hallway',
          'Open up \u2014 check for extension'
        ]
      },
      {
        label: 'Crew of 4',
        kind: 'crew',
        q: 'Deploy your 4-person engine crew \u2014 who does what?',
        opts: [
          { t: 'Officer + 1 firefighter to primary search, 2 firefighters to the attack line.', c: ['All Clear', 'Fire Control'] },
          { t: 'All 4 to fire attack \u2014 put the fire out first.', c: ['Fire Control'] },
          { t: 'Officer establishes command, 3 firefighters to primary search.', c: ['All Clear'] },
          { t: '2 firefighters to the attack line, 2 to exposure protection.', c: ['Fire Control', 'Loss Stopped'] }
        ]
      },
      {
        label: 'Assign E2',
        unit: 'E2',
        q: 'Where do you send E2, and what task?',
        opts: [
          { t: '2nd attack line to the fire floor.', c: ['Fire Control'] },
          { t: 'Backup / RIT for the interior crews.', c: [] },
          { t: 'Exposure protection on the adjacent units.', c: ['Loss Stopped'] },
          { t: 'Water supply.', c: [] },
          { t: 'Hold as tactical reserve.', c: [] }
        ]
      },
      {
        label: '2nd engine placement',
        unit: 'E2',
        cat: 'unit',
        q: 'Where does the 2nd engine go?',
        opts: [
          'Front of the building',
          'Rear / courtyard access',
          'Hydrant \u2014 water supply position',
          'Staging until assigned'
        ]
      },
      {
        label: 'Assign L1',
        unit: 'L1',
        q: 'Where do you send L1, and what task?',
        opts: [
          { t: 'Primary search, 2nd floor.', c: ['All Clear'] },
          { t: 'Ventilation \u2014 vertical, over the fire.', c: ['Fire Control'] },
          { t: 'Ladder the building for rescue.', c: ['All Clear'] },
          { t: 'Hold as tactical reserve.', c: [] }
        ]
      },
      {
        label: 'Ladder placement',
        unit: 'L1',
        cat: 'unit',
        q: 'Where does the ladder go?',
        opts: [
          'Front \u2014 rescue and ventilation',
          'Rear \u2014 courtyard side',
          'Roof position',
          'Staging until assigned'
        ]
      },
      {
        label: 'Assign E3',
        unit: 'E3',
        q: 'Where do you send E3, and what task?',
        opts: [
          { t: 'Exposure protection.', c: ['Loss Stopped'] },
          { t: '2nd line to the floor above.', c: ['Fire Control'] },
          { t: 'Water supply.', c: [] },
          { t: 'Hold as tactical reserve.', c: [] }
        ]
      },
      {
        label: 'Assign R3',
        unit: 'R3',
        q: 'Where do you send R3, and what task?',
        opts: [
          { t: 'RIT / rescue standby.', c: [] },
          { t: 'Primary search with E1.', c: ['All Clear'] },
          { t: 'Medical / rehab sector.', c: [] },
          { t: 'Hold as tactical reserve.', c: [] }
        ]
      },
      {
        label: 'Assign BC1',
        unit: 'BC1',
        q: 'Where do you send BC1, and what task?',
        opts: [
          { t: 'Assume command \u2014 E1 officer goes interior.', c: [] },
          { t: 'Safety / accountability sector.', c: [] },
          { t: 'Division supervisor, fire floor.', c: [] },
          { t: 'Staging and additional resources.', c: [] }
        ]
      },
      {
        label: 'Stretch check (hose)',
        q: 'What line do you bring, and how do you decide?',
        opts: [
          '1\u00be-inch \u2014 sized by walking the stretch: courtyard, one flight up, hallway to the unit, enough to reach, work, and turn.',
          '2-inch \u2014 sized the same way: courtyard, one flight up, hallway, enough to reach, work, and turn.',
          '1\u00be-inch \u2014 an extended lay goes to a 1\u00be-inch line.',
          'Biggest line on the rig \u2014 length does not matter as long as it is big.'
        ]
      },
      {
        label: 'What\u2019s happening inside? (update)',
        cat: 'sizeup',
        q: 'What\u2019s happening inside? Update your read:',
        opts: [
          'Interior report: fire contained to the unit of origin',
          'Fire extending \u2014 attic involvement suspected',
          'Smoke clearing, no extension seen',
          'Still unknown from outside'
        ]
      },
      {
        label: 'Victim status (update)',
        cat: 'sizeup',
        q: 'Are people hurt? Update:',
        opts: [
          'Still unknown',
          'Occupants out, no injuries',
          'Victims found \u2014 rescue underway',
          'Injuries confirmed \u2014 medical requested'
        ]
      },
      {
        label: 'Reposition',
        q: 'Conditions have changed. Where do you go now? Tap a marker on the picture — green arrows move you, blue boxes aim water.',
        hotspots: true
      }
    ]
  },
  {
    id: 'house',
    title: 'House — Single-Family Fire',
    sub: 'M.P. 202.04 Fire Control · Residential · First-arriving size-up',
    dispatch: 'House fire. Single-story single-family home, smoke showing. Units: E1, L1, E2, E3, R3, BC1. Occupants unknown.',
    arrival: 'You arrive first on E1: a single-story house. Flame blowing out of a front window on the left, heavy black smoke pushing from the roof over that room. Garage on the right. Occupants unknown.',
    image: 'assets/scenarios/house-arrival.jpg',
    imageAlt: 'Arrival view: single-story house, flame from a front window, heavy black smoke from the roof over that room, garage on the right.',
    hotspots: [
      { kind: 'move', x: 40, y: 58, label: 'Front door', note: 'Make entry at the front' },
      { kind: 'move', x: 62, y: 68, label: 'Garage', note: 'Check the garage' },
      { kind: 'move', x: 9, y: 74, label: 'Side yard', note: 'Walk the 360' },
      { kind: 'spray', x: 24, y: 54, w: 13, h: 15, label: 'Fire window', note: 'Reset the fire from outside (exterior attack)', c: ['Fire Control'] }
    ],
    steps: [
      {
        label: 'Approach',
        q: 'You pull up. Where do you go first? Tap a marker on the picture — green arrows move you, blue boxes aim water.',
        hotspots: true
      },
      {
        label: 'Fireground factors',
        q: 'Size it up. What are the fireground factors here?',
        opts: [
          'Building: single-story house, pitched roof, garage attached on the right. Fire: front room on the left, flame showing from the window, heavy black smoke from the roof over that room. Occupancy: residential, occupants unknown.',
          'Building: 2-story house, flat roof. Fire: front room on the left, flame showing. Occupancy: residential, occupants unknown.',
          'Building: single-story house, pitched roof. Fire: garage fire, smoke from the right side. Occupancy: residential, confirmed empty.',
          'Building: single-story house, pitched roof, garage attached on the right. Fire: front room on the left, light smoke only. Occupancy: commercial, closed for the day.'
        ]
      },
      {
        label: 'Risk profile',
        q: 'What is your risk profile on this fire?',
        opts: [
          'Risk a lot — savable lives in an occupied residential building, fire room reachable.',
          'Risk a little — protect exposures and property, no interior commitment yet.',
          'Risk nothing — defensive from the start; the smoke and flame are too much.',
          'Risk a lot — the building is the priority, regardless of occupants.'
        ]
      },
      {
        label: 'Strategy',
        q: 'What strategy do you declare?',
        opts: [
          'Offensive',
          'Defensive',
          'Offensive, shifting to defensive if conditions worsen',
          'Wait for BC1 before declaring'
        ]
      },
      {
        label: 'Incident action plan',
        q: 'What is your IAP?',
        opts: [
          'Primary search and fire attack',
          'Fire attack only — no search until the fire is knocked',
          'Search, fire attack, and exposure protection',
          'Exposure protection first, then fire attack'
        ]
      },
      {
        label: 'Tactical priorities',
        q: 'In what order do you work the tactical priorities?',
        opts: [
          'All Clear (primary search) → Fire Control → Loss Stopped',
          'Fire Control → All Clear (primary search) → Loss Stopped',
          'Loss Stopped → Fire Control → All Clear (primary search)',
          'All Clear (primary search) → Loss Stopped → Fire Control'
        ]
      },
      {
        label: 'On-scene report',
        q: 'Give your on-scene report — which version do you send?',
        opts: [
          'E1 on scene, house fire. E1 has command. Single-story house, fire in one front room, flame showing from the window, heavy black smoke from the roof. Offensive strategy. IAP is primary search and fire attack. First 3 companies to IAP tasks, 1 held as tactical reserve. Requesting additional resources.',
          'E1 on scene, house fire. Single-story house, fire in one front room, flame showing from the window, heavy black smoke from the roof. Offensive strategy. IAP is primary search and fire attack. First 3 companies to IAP tasks, 1 held as tactical reserve.',
          'E1 on scene, house fire. E1 has command. Single-story house, fire in one front room, flame showing from the window, heavy black smoke from the roof. IAP is primary search and fire attack. First 3 companies to IAP tasks, 1 held as tactical reserve.',
          'E1 on scene, house fire. E1 has command. Single-story house, fire in one front room. Offensive strategy. IAP is primary search and fire attack.'
        ]
      },
      {
        label: 'Initial 3 & 1',
        q: 'How do you run the initial 3 & 1?',
        opts: [
          'First 3 companies to IAP tasks, 1 held as tactical reserve; call for more resources before assigning the reserve.',
          'All 4 companies to IAP tasks; the reserve comes from the next alarm.',
          'First 2 companies to IAP tasks, 2 held as reserve.',
          'Assign the reserve first to the hardest task, then call for more resources.'
        ]
      },
      {
        label: 'Roof type',
        cat: 'sizeup',
        q: 'Size-up: what roof type do you see?',
        opts: [
          'Pitched roof',
          'Flat roof',
          'Mixed — pitched over the house, flat over the garage',
          'Can’t tell from here'
        ]
      },
      {
        label: 'Construction',
        cat: 'sizeup',
        q: 'Size-up: what is the construction?',
        opts: [
          'Wood frame with stucco exterior',
          'Block construction',
          'Brick construction',
          'Can’t tell from here'
        ]
      },
      {
        label: 'What’s happening inside?',
        cat: 'sizeup',
        q: 'What’s happening inside? Your first read:',
        opts: [
          'Fire in one front room, smoke showing',
          'Smoke throughout the house',
          'Fire already extending into the attic',
          'Unknown — no interior report yet'
        ]
      },
      {
        label: 'Victim status',
        cat: 'sizeup',
        q: 'Are people hurt? What do you know right now?',
        opts: [
          'Unknown — no victims reported yet',
          'Occupants seen leaving, no injuries reported',
          'Occupants possibly still inside',
          'Injuries reported — medical needed'
        ]
      },
      {
        label: 'Attack flow',
        q: 'How do you attack it?',
        opts: [
          'Reset the fire from outside, then move interior (transitional attack)',
          'Hit it from outside only — stay exterior'
        ]
      },
      {
        label: 'Go interior',
        showIf: { label: 'Attack flow', match: 'interior' },
        q: 'You go interior — then what?',
        opts: [
          'Search the fire room',
          'Attack the fire room directly',
          'Move to the next room — check the hallway',
          'Open up — check for extension'
        ]
      },
      {
        label: 'Flow',
        q: 'M.P. 202.04: what flow does a residential fire get?',
        opts: [
          '150 GPM — 1¾-inch line with an automatic nozzle.',
          '250 GPM — 2-inch line.',
          '300 GPM — 2½-inch line.',
          '500 GPM — portable monitor.'
        ]
      },
      {
        label: '150-foot rule',
        q: 'M.P. 202.04 sets a limit on how far inside you operate. What is it?',
        opts: [
          '150 feet max inside with smoke and fire conditions — and never past your ability to get back to an area of safe refuge before your low air alarm.',
          '200 feet — the length of the crosslay.',
          'As far as the line reaches.',
          '300 feet if you have a backup line.'
        ]
      },
      {
        label: 'Search with attack',
        q: 'In a residential fire, when does search happen?',
        opts: [
          'With the attack when possible — putting the fire out is the best thing for savable lives.',
          'Only after the fire is fully out.',
          'Only if someone is confirmed inside.',
          'Search runs first, attack waits.'
        ]
      },
      {
        label: 'Crew of 4',
        kind: 'crew',
        q: 'Deploy your 4-person engine crew — who does what?',
        opts: [
          { t: 'Officer + 1 firefighter to primary search, 2 firefighters to the attack line.', c: ['All Clear', 'Fire Control'] },
          { t: 'All 4 to fire attack — put the fire out first.', c: ['Fire Control'] },
          { t: 'Officer establishes command, 3 firefighters to primary search.', c: ['All Clear'] },
          { t: '2 firefighters to the attack line, 2 to exposure protection.', c: ['Fire Control', 'Loss Stopped'] }
        ]
      },
      {
        label: 'Assign E2',
        unit: 'E2',
        q: 'Where do you send E2, and what task?',
        opts: [
          { t: '2nd attack line to the fire room.', c: ['Fire Control'] },
          { t: 'Backup / RIT for the interior crews.', c: [] },
          { t: 'Exposure protection on the garage and the neighbor’s house.', c: ['Loss Stopped'] },
          { t: 'Water supply.', c: [] },
          { t: 'Hold as tactical reserve.', c: [] }
        ]
      },
      {
        label: '2nd engine placement',
        unit: 'E2',
        cat: 'unit',
        q: 'Where does the 2nd engine go?',
        opts: [
          'Front of the building',
          'Rear access',
          'Hydrant — water supply position',
          'Staging until assigned'
        ]
      },
      {
        label: 'Assign L1',
        unit: 'L1',
        q: 'Where do you send L1, and what task?',
        opts: [
          { t: 'Primary search.', c: ['All Clear'] },
          { t: 'Ventilation — vertical, over the fire.', c: ['Fire Control'] },
          { t: 'Ladder the building for rescue.', c: ['All Clear'] },
          { t: 'Hold as tactical reserve.', c: [] }
        ]
      },
      {
        label: 'Ladder placement',
        unit: 'L1',
        cat: 'unit',
        q: 'Where does the ladder go?',
        opts: [
          'Front — rescue and ventilation',
          'Rear — back of the house',
          'Roof position',
          'Staging until assigned'
        ]
      },
      {
        label: 'Assign E3',
        unit: 'E3',
        q: 'Where do you send E3, and what task?',
        opts: [
          { t: 'Exposure protection.', c: ['Loss Stopped'] },
          { t: '2nd line to the back of the house.', c: ['Fire Control'] },
          { t: 'Water supply.', c: [] },
          { t: 'Hold as tactical reserve.', c: [] }
        ]
      },
      {
        label: 'Assign R3',
        unit: 'R3',
        q: 'Where do you send R3, and what task?',
        opts: [
          { t: 'RIT / rescue standby.', c: [] },
          { t: 'Primary search with E1.', c: ['All Clear'] },
          { t: 'Medical / rehab sector.', c: [] },
          { t: 'Hold as tactical reserve.', c: [] }
        ]
      },
      {
        label: 'Assign BC1',
        unit: 'BC1',
        q: 'Where do you send BC1, and what task?',
        opts: [
          { t: 'Assume command — E1 officer goes interior.', c: [] },
          { t: 'Safety / accountability sector.', c: [] },
          { t: 'Division supervisor, fire floor.', c: [] },
          { t: 'Staging and additional resources.', c: [] }
        ]
      },
      {
        label: 'Stretch check (hose)',
        q: 'What line do you bring, and how do you decide?',
        opts: [
          '1¾-inch — sized by walking the stretch: front door, hallway to the fire room, enough to reach, work, and turn.',
          '2-inch — sized the same way: front door, hallway, enough to reach, work, and turn.',
          '1¾-inch — an extended lay goes to a 1¾-inch line.',
          'Biggest line on the rig — length does not matter as long as it is big.'
        ]
      },
      {
        label: 'What’s happening inside? (update)',
        cat: 'sizeup',
        q: 'What’s happening inside? Update your read:',
        opts: [
          'Interior report: fire contained to the room of origin',
          'Fire extending — attic involvement suspected',
          'Smoke clearing, no extension seen',
          'Still unknown from outside'
        ]
      },
      {
        label: 'Victim status (update)',
        cat: 'sizeup',
        q: 'Are people hurt? Update:',
        opts: [
          'Still unknown',
          'Occupants out, no injuries',
          'Victims found — rescue underway',
          'Injuries confirmed — medical requested'
        ]
      },
      {
        label: 'MP reference',
        q: 'M.P. 202.04 Fire Control — the lines that matter here: residential fires get 150 GPM on a 1¾-inch line. Never use residential tactics or flow rates on a commercial fire. Never ventilate without coordination. Attack through the inlet of the flow path, cool surfaces first, then hit the fuel. Never operate more than 150 feet inside with smoke and fire conditions.',
        opts: [
          'Understood — show my debrief'
        ]
      },
      {
        label: 'Reposition',
        q: 'Conditions have changed. Where do you go now? Tap a marker on the picture — green arrows move you, blue boxes aim water.',
        hotspots: true
      }
    ]
  },
  {
    id: 'gilbert',
    title: 'Gilbert — 2-Story House Fire',
    sub: 'M.P. 202.04 Fire Control · Residential · Sets & Reps deck, 2644 E. Wyatt Way',
    dispatch: 'FD Haz Chan A1 · Inc #000001 · House Fire · 2644 E. Wyatt Way, Gilbert · CODE 3 · 09:15 · Units: E1, E2, L1, E3, R3, BC1. Homeowner says he was using a Solo Stove on the upstairs balcony, could not control the fire, family evacuating.',
    arrival: 'You arrive first on E1: a 2-story house. Heavy black smoke pushing from the roof over the rear. The fire started on the upstairs balcony. The family is getting out. Yellow hydrant in the front yard.',
    image: 'assets/scenarios/gilbert-arrival.jpg',
    imageAlt: 'Arrival view: 2-story house, heavy black smoke from the roof over the rear, upstairs balcony on the right, yellow hydrant in the front yard, aerial map inset at lower right.',
    hotspots: [
      { kind: 'move', x: 36, y: 64, label: 'Front door', note: 'Make entry at the front' },
      { kind: 'move', x: 31, y: 78, label: 'Hydrant', note: 'Establish water supply' },
      { kind: 'move', x: 8, y: 72, label: 'Side yard', note: 'Walk the 360' },
      { kind: 'spray', x: 56, y: 38, w: 12, h: 14, label: 'Balcony', note: 'Reset the balcony fire from outside (exterior attack)', c: ['Fire Control'] }
    ],
    steps: [
      {
        label: 'Approach',
        q: 'You pull up. Where do you go first? Tap a marker on the picture — green arrows move you, blue boxes aim water.',
        hotspots: true
      },
      {
        label: 'Fireground factors',
        q: 'Size it up. What are the fireground factors here?',
        opts: [
          'Building: 2-story house, pitched tile roof, open loft over the living room. Fire: started on the upstairs balcony, heavy black smoke from the roof over the rear. Occupancy: residential, family evacuating.',
          'Building: single-story house, flat roof. Fire: started on the upstairs balcony, heavy black smoke. Occupancy: residential, family evacuating.',
          'Building: 2-story house, pitched tile roof. Fire: 1st-floor kitchen, light smoke. Occupancy: residential, confirmed empty.',
          'Building: 2-story house, pitched tile roof, open loft. Fire: garage fire, smoke from the right side. Occupancy: commercial, closed.'
        ]
      },
      {
        label: 'Risk profile',
        q: 'What is your risk profile on this fire?',
        opts: [
          'Risk a lot — savable lives, family evacuating, fire room reachable from the stairs.',
          'Risk a little — protect exposures and property, no interior commitment yet.',
          'Risk nothing — defensive from the start; the smoke and flame are too much.',
          'Risk a lot — the building is the priority, regardless of occupants.'
        ]
      },
      {
        label: 'Strategy',
        q: 'What strategy do you declare?',
        opts: [
          'Offensive',
          'Defensive',
          'Offensive, shifting to defensive if conditions worsen',
          'Wait for BC1 before declaring'
        ]
      },
      {
        label: 'Incident action plan',
        q: 'What is your IAP?',
        opts: [
          'Primary search and fire attack',
          'Fire attack only — no search until the fire is knocked',
          'Search, fire attack, and exposure protection',
          'Exposure protection first, then fire attack'
        ]
      },
      {
        label: 'Tactical priorities',
        q: 'In what order do you work the tactical priorities?',
        opts: [
          'All Clear (primary search) → Fire Control → Loss Stopped',
          'Fire Control → All Clear (primary search) → Loss Stopped',
          'Loss Stopped → Fire Control → All Clear (primary search)',
          'All Clear (primary search) → Loss Stopped → Fire Control'
        ]
      },
      {
        label: 'On-scene report',
        q: 'Give your on-scene report — which version do you send?',
        opts: [
          'E1 on scene, 2644 E. Wyatt Way. E1 has command. 2-story house, fire started on the upstairs balcony, heavy black smoke from the roof over the rear, family evacuating. Offensive strategy. IAP is primary search and fire attack. First 3 companies to IAP tasks, 1 held as tactical reserve. Requesting additional resources.',
          'E1 on scene, 2644 E. Wyatt Way. 2-story house, fire started on the upstairs balcony, heavy black smoke from the roof over the rear, family evacuating. Offensive strategy. IAP is primary search and fire attack. First 3 companies to IAP tasks, 1 held as tactical reserve.',
          'E1 on scene, 2644 E. Wyatt Way. E1 has command. 2-story house, fire started on the upstairs balcony, heavy black smoke from the roof over the rear, family evacuating. IAP is primary search and fire attack. First 3 companies to IAP tasks, 1 held as tactical reserve.',
          'E1 on scene, 2644 E. Wyatt Way. E1 has command. 2-story house, fire started on the upstairs balcony. Offensive strategy. IAP is primary search and fire attack.'
        ]
      },
      {
        label: 'Initial 3 & 1',
        q: 'How do you run the initial 3 & 1?',
        opts: [
          'First 3 companies to IAP tasks, 1 held as tactical reserve; call for more resources before assigning the reserve.',
          'All 4 companies to IAP tasks; the reserve comes from the next alarm.',
          'First 2 companies to IAP tasks, 2 held as reserve.',
          'Assign the reserve first to the hardest task, then call for more resources.'
        ]
      },
      {
        label: 'Roof type',
        cat: 'sizeup',
        q: 'Size-up: what roof type do you see?',
        opts: [
          'Pitched tile roof',
          'Flat roof',
          'Mixed — pitched over the house, flat over the garage',
          'Can’t tell from here'
        ]
      },
      {
        label: 'Open loft',
        cat: 'sizeup',
        q: 'The 2nd floor has an open loft over the living room. What does that change?',
        opts: [
          'Smoke and heat rise straight to the loft and the rooms off it — check the loft and the bedrooms first.',
          'Nothing — the loft is not part of the fire.',
          'It means the fire is contained to the balcony.',
          'It makes the stairs the only thing that matters.'
        ]
      },
      {
        label: 'Balcony fire',
        cat: 'sizeup',
        q: 'The fire started on the upstairs balcony. What do you watch for?',
        opts: [
          'Extension from the balcony into the attic and the 2nd-floor rooms — and the patio cover above the balcony.',
          'Only the balcony — exterior fires stay exterior.',
          'The garage first.',
          'The 1st floor — fire drops down.'
        ]
      },
      {
        label: 'What’s happening inside?',
        cat: 'sizeup',
        q: 'What’s happening inside? Your first read:',
        opts: [
          'Fire on the balcony extending into the 2nd floor, smoke showing',
          'Smoke throughout both floors',
          'Fire already in the attic',
          'Unknown — no interior report yet'
        ]
      },
      {
        label: 'Victim status',
        cat: 'sizeup',
        q: 'Are people hurt? What do you know right now?',
        opts: [
          'Family evacuating — homeowner says everyone is getting out',
          'Unknown — no victims reported yet',
          'Occupants possibly still inside',
          'Injuries reported — medical needed'
        ]
      },
      {
        label: 'Attack flow',
        q: 'How do you attack it?',
        opts: [
          'Reset the fire from outside, then move interior (transitional attack)',
          'Hit it from outside only — stay exterior'
        ]
      },
      {
        label: 'Go interior',
        showIf: { label: 'Attack flow', match: 'interior' },
        q: 'You go interior — then what?',
        opts: [
          'Search the 2nd floor and the loft',
          'Attack the fire from the 2nd-floor rooms',
          'Move to the next room — check the hallway',
          'Open up — check for extension into the attic'
        ]
      },
      {
        label: 'Flow',
        q: 'M.P. 202.04: what flow does a residential fire get?',
        opts: [
          '150 GPM — 1¾-inch line with an automatic nozzle.',
          '250 GPM — 2-inch line.',
          '300 GPM — 2½-inch line.',
          '500 GPM — portable monitor.'
        ]
      },
      {
        label: 'Stairs',
        q: 'The fire is upstairs. What do you think about on the way up?',
        opts: [
          'The stairwell is the flow path — enter at the air intake side, air at your back, and keep the line between you and the fire.',
          'Go up fast — speed matters more than the flow path.',
          'The stairs are safe no matter what — the fire is on the balcony.',
          'Take the line up the outside ladder instead.'
        ]
      },
      {
        label: 'Crew of 4',
        kind: 'crew',
        q: 'Deploy your 4-person engine crew — who does what?',
        opts: [
          { t: 'Officer + 1 firefighter to primary search on the 2nd floor, 2 firefighters to the attack line.', c: ['All Clear', 'Fire Control'] },
          { t: 'All 4 to fire attack — put the fire out first.', c: ['Fire Control'] },
          { t: 'Officer establishes command, 3 firefighters to primary search.', c: ['All Clear'] },
          { t: '2 firefighters to the attack line, 2 to exposure protection.', c: ['Fire Control', 'Loss Stopped'] }
        ]
      },
      {
        label: 'Assign E2',
        unit: 'E2',
        q: 'Where do you send E2, and what task?',
        opts: [
          { t: '2nd attack line to the 2nd floor.', c: ['Fire Control'] },
          { t: 'Backup / RIT for the interior crews.', c: [] },
          { t: 'Exposure protection on the neighboring house.', c: ['Loss Stopped'] },
          { t: 'Water supply.', c: [] },
          { t: 'Hold as tactical reserve.', c: [] }
        ]
      },
      {
        label: '2nd engine placement',
        unit: 'E2',
        cat: 'unit',
        q: 'Where does the 2nd engine go?',
        opts: [
          'Front of the building',
          'Rear access',
          'Hydrant — water supply position',
          'Staging until assigned'
        ]
      },
      {
        label: 'Assign L1',
        unit: 'L1',
        q: 'Where do you send L1, and what task?',
        opts: [
          { t: 'Primary search, 2nd floor.', c: ['All Clear'] },
          { t: 'Ventilation — vertical, over the fire.', c: ['Fire Control'] },
          { t: 'Ladder the building for rescue from the balcony.', c: ['All Clear'] },
          { t: 'Hold as tactical reserve.', c: [] }
        ]
      },
      {
        label: 'Ladder placement',
        unit: 'L1',
        cat: 'unit',
        q: 'Where does the ladder go?',
        opts: [
          'Front — rescue and ventilation',
          'Rear — balcony side',
          'Roof position',
          'Staging until assigned'
        ]
      },
      {
        label: 'Assign E3',
        unit: 'E3',
        q: 'Where do you send E3, and what task?',
        opts: [
          { t: 'Exposure protection.', c: ['Loss Stopped'] },
          { t: '2nd line to the floor above the fire.', c: ['Fire Control'] },
          { t: 'Water supply.', c: [] },
          { t: 'Hold as tactical reserve.', c: [] }
        ]
      },
      {
        label: 'Assign R3',
        unit: 'R3',
        q: 'Where do you send R3, and what task?',
        opts: [
          { t: 'RIT / rescue standby.', c: [] },
          { t: 'Primary search with E1.', c: ['All Clear'] },
          { t: 'Medical / rehab sector.', c: [] },
          { t: 'Hold as tactical reserve.', c: [] }
        ]
      },
      {
        label: 'Assign BC1',
        unit: 'BC1',
        q: 'Where do you send BC1, and what task?',
        opts: [
          { t: 'Assume command — E1 officer goes interior.', c: [] },
          { t: 'Safety / accountability sector.', c: [] },
          { t: 'Division supervisor, fire floor.', c: [] },
          { t: 'Staging and additional resources.', c: [] }
        ]
      },
      {
        label: 'Stretch check (hose)',
        q: 'What line do you bring, and how do you decide?',
        opts: [
          '1¾-inch — sized by walking the stretch: front door, up one flight, hallway to the balcony side, enough to reach, work, and turn.',
          '2-inch — sized the same way: front door, up one flight, hallway, enough to reach, work, and turn.',
          '1¾-inch — an extended lay goes to a 1¾-inch line.',
          'Biggest line on the rig — length does not matter as long as it is big.'
        ]
      },
      {
        label: 'What’s happening inside? (update)',
        cat: 'sizeup',
        q: 'What’s happening inside? Update your read:',
        opts: [
          'Interior report: fire contained to the balcony and one 2nd-floor room',
          'Fire extending — attic involvement suspected',
          'Patio cover above the 2nd-story balcony collapsed',
          'Still unknown from outside'
        ]
      },
      {
        label: 'Victim status (update)',
        cat: 'sizeup',
        q: 'Are people hurt? Update:',
        opts: [
          'Family out, no injuries',
          'Still unknown',
          'Victims found — rescue underway',
          'Injuries confirmed — medical requested'
        ]
      },
      {
        label: 'MP reference',
        q: 'M.P. 202.04 Fire Control — the lines that matter here: residential fires get 150 GPM on a 1¾-inch line. Search runs with the attack when possible. Attack through the inlet of the flow path and enter at the air intake side. Cool surfaces first, then hit the fuel. A 2-story house with an open loft gives smoke and heat a straight shot to the 2nd floor — check the loft and the bedrooms first.',
        opts: [
          'Understood — show my debrief'
        ]
      },
      {
        label: 'Reposition',
        q: 'Conditions have changed. Where do you go now? Tap a marker on the picture — green arrows move you, blue boxes aim water.',
        hotspots: true
      }
    ]
  },
  {
    id: 'midrise',
    title: 'Mid-Rise — Apartment Fire',
    sub: 'M.P. 202.20 Mid Rise Operations · Residential · First-arriving size-up',
    dispatch: 'Apartment fire. 4-story mid-rise apartment building, smoke showing from the 3rd floor. Units: E1, L1, E2, E3, R3, BC1. Multiple callers, occupants unknown.',
    arrival: 'You arrive first on E1: a 4-story mid-rise apartment building. Smoke pushing from the 3rd-floor balcony band. Big parking lot in front, room for apparatus. The building looks sealed up — not much showing for the smoke you can see.',
    image: 'assets/scenarios/midrise-arrival.jpg',
    imageAlt: 'Arrival view: 4-story mid-rise apartment building, smoke from the 3rd-floor balcony band, ground-floor entrance with yellow doors, parking lot in front, aerial map inset at lower left.',
    hotspots: [
      { kind: 'move', x: 28, y: 52, label: 'Stairwell', note: 'Attack stairwell vs evacuation stairwell' },
      { kind: 'move', x: 52, y: 62, label: 'Main entrance', note: 'Find the alarm panel and the attack stairwell' },
      { kind: 'move', x: 70, y: 72, label: 'Hydrant', note: 'Establish water supply — FDC' },
      { kind: 'spray', x: 55, y: 32, w: 14, h: 10, label: 'Fire floor windows', note: 'Reset from the exterior — aerial or ground ladder', c: ['Fire Control'] },
      { kind: 'move', x: 30, y: 80, label: 'Aerial position', note: 'Room for the ladder — rescues from balconies' }
    ],
    steps: [
      {
        label: 'Approach',
        q: 'You pull up. Where do you go first? Tap a marker on the picture — green arrows move you, blue boxes aim water.',
        hotspots: true
      },
      {
        label: 'Fireground factors',
        q: 'Size it up. What are the fireground factors here?',
        opts: [
          'Building: 4-story mid-rise apartment, masonry lower level, wood frame upper levels, interior hallways. Fire: 3rd floor, smoke showing from the balcony band. Occupancy: residential, high density, occupants unknown.',
          'Building: high-rise with a fire control room and a lobby sector. Fire: 3rd floor, smoke showing. Occupancy: residential, high density, occupants unknown.',
          'Building: 2-story garden apartment. Fire: 3rd floor, smoke showing. Occupancy: residential, high density, occupants unknown.',
          'Building: 4-story mid-rise apartment, masonry lower level, wood frame upper levels. Fire: 1st floor, light smoke. Occupancy: vacant, no life hazard.'
        ]
      },
      {
        label: 'Risk profile',
        q: 'What is your risk profile on this fire?',
        opts: [
          'Risk a lot — savable lives in a high-density residential building, fire floor reachable.',
          'Risk a little — protect exposures and property, no interior commitment yet.',
          'Risk nothing — defensive from the start; the building is too big to go in.',
          'Risk a lot — the building is the priority, regardless of occupants.'
        ]
      },
      {
        label: 'Strategy',
        q: 'What strategy do you declare?',
        opts: [
          'Offensive',
          'Defensive',
          'Offensive, shifting to defensive if conditions worsen',
          'Wait for BC1 before declaring'
        ]
      },
      {
        label: 'Incident action plan',
        q: 'What is your IAP?',
        opts: [
          'Primary search and fire attack',
          'Fire attack only — no search until the fire is knocked',
          'Search, fire attack, and exposure protection',
          'Exposure protection first, then fire attack'
        ]
      },
      {
        label: 'Tactical priorities',
        q: 'In what order do you work the tactical priorities?',
        opts: [
          'All Clear (primary search) → Fire Control → Loss Stopped',
          'Fire Control → All Clear (primary search) → Loss Stopped',
          'Loss Stopped → Fire Control → All Clear (primary search)',
          'All Clear (primary search) → Loss Stopped → Fire Control'
        ]
      },
      {
        label: 'On-scene report',
        q: 'Give your on-scene report — which version do you send?',
        opts: [
          'E1 on scene, mid-rise apartment fire. E1 has command. 4-story mid-rise, fire on the 3rd floor, smoke showing from the balcony band. Offensive strategy. IAP is primary search and fire attack. First 3 companies to IAP tasks, 1 held as tactical reserve. Requesting additional resources.',
          'E1 on scene, mid-rise apartment fire. 4-story mid-rise, fire on the 3rd floor, smoke showing from the balcony band. Offensive strategy. IAP is primary search and fire attack. First 3 companies to IAP tasks, 1 held as tactical reserve.',
          'E1 on scene, mid-rise apartment fire. E1 has command. 4-story mid-rise, fire on the 3rd floor, smoke showing from the balcony band. IAP is primary search and fire attack. First 3 companies to IAP tasks, 1 held as tactical reserve.',
          'E1 on scene, mid-rise apartment fire. E1 has command. 4-story mid-rise, fire on the 3rd floor. Offensive strategy. IAP is primary search and fire attack.'
        ]
      },
      {
        label: 'Initial 3 & 1',
        q: 'How do you run the initial 3 & 1?',
        opts: [
          'First 3 companies to IAP tasks, 1 held as tactical reserve; call for more resources before assigning the reserve.',
          'All 4 companies to IAP tasks; the reserve comes from the next alarm.',
          'First 2 companies to IAP tasks, 2 held as reserve.',
          'Assign the reserve first to the hardest task, then call for more resources.'
        ]
      },
      {
        label: 'Nothing showing',
        cat: 'sizeup',
        q: 'The building is tightly sealed and not much is showing. What does M.P. 202.20 say about that?',
        opts: [
          '"Nothing showing means nothing." A serious fire can have zero exterior signs in a mid-rise.',
          'If nothing is showing, the fire is small.',
          'Sealed buildings mean the fire is contained.',
          'Wait for more smoke before committing.'
        ]
      },
      {
        label: 'Standpipe',
        cat: 'sizeup',
        q: 'What do you need to know about the standpipe here?',
        opts: [
          'Connections can be up to 200 feet apart, may sit in interior hallways, and FDC caps may be KNOX-locked — and city pressure above ground level may not be enough for an effective attack.',
          'Every stairwell has one, standard pressure.',
          'There is no standpipe in a mid-rise.',
          'The FDC is always at the main entrance.'
        ]
      },
      {
        label: 'Wood frame uppers',
        cat: 'sizeup',
        q: 'Modern residential mid-rise: what is the construction?',
        opts: [
          'Masonry and concrete on the lower level, wood frame on the upper levels — fire in the structure eats the wood frame fast.',
          'All concrete.',
          'All wood frame, top to bottom.',
          'Steel frame throughout.'
        ]
      },
      {
        label: 'Stairwells',
        cat: 'sizeup',
        q: 'Attack stairwell vs evacuation stairwell — what do you do?',
        opts: [
          'Identify both from each floor — occupants head for the route they know best, not the one you picked.',
          'Use one stairwell for everything.',
          'Evacuation stairwell first, attack second.',
          'Stairwells do not matter in a mid-rise.'
        ]
      },
      {
        label: 'What’s happening inside?',
        cat: 'sizeup',
        q: 'What’s happening inside? Your first read:',
        opts: [
          'Fire on the 3rd floor, smoke in the hallway and stairwell',
          'Smoke throughout the building',
          'Fire already in the wood frame above',
          'Unknown — no interior report yet'
        ]
      },
      {
        label: 'Victim status',
        cat: 'sizeup',
        q: 'Are people hurt? What do you know right now?',
        opts: [
          'Unknown — no victims reported yet',
          'Occupants seen leaving, no injuries reported',
          'Occupants possibly still inside',
          'Injuries reported — medical needed'
        ]
      },
      {
        label: 'Attack flow',
        q: 'How do you attack it?',
        opts: [
          'Reset the fire from outside, then move interior (transitional attack)',
          'Hit it from outside only — stay exterior'
        ]
      },
      {
        label: 'Go interior',
        showIf: { label: 'Attack flow', match: 'interior' },
        q: 'You go interior — then what?',
        opts: [
          'Take the attack stairwell to the fire floor',
          'Search the fire floor',
          'Attack the fire room directly',
          'Open up — check for extension into the void spaces'
        ]
      },
      {
        label: 'Flow',
        q: 'M.P. 202.20: what line do you take off the standpipe?',
        opts: [
          '2-inch line — 250 GPM or better, sized for standpipe pressures.',
          '1¾-inch auto nozzle — 150 GPM.',
          '2½-inch — 300 GPM.',
          'Booster line.'
        ]
      },
      {
        label: 'Floor above',
        q: 'When do you search the floor above the fire?',
        opts: [
          'Large-area targeted search, room by room, only after fire control — never a primary search, never in smoke and fire conditions without lines and SCBA.',
          'Primary search the floor above first.',
          'Search it with the attack.',
          'Skip it — the fire floor is the only floor that matters.'
        ]
      },
      {
        label: 'Crew of 4',
        kind: 'crew',
        q: 'Deploy your 4-person engine crew — who does what?',
        opts: [
          { t: 'Officer + 1 firefighter to primary search on the fire floor, 2 firefighters to the attack line.', c: ['All Clear', 'Fire Control'] },
          { t: 'All 4 to fire attack — put the fire out first.', c: ['Fire Control'] },
          { t: 'Officer establishes command, 3 firefighters to primary search.', c: ['All Clear'] },
          { t: '2 firefighters to the attack line, 2 to exposure protection.', c: ['Fire Control', 'Loss Stopped'] }
        ]
      },
      {
        label: 'Assign E2',
        unit: 'E2',
        q: 'Where do you send E2, and what task?',
        opts: [
          { t: '2nd attack line to the fire floor.', c: ['Fire Control'] },
          { t: 'Backup / RIT for the interior crews.', c: [] },
          { t: 'Water supply — FDC and standpipe support.', c: [] },
          { t: 'Exposure protection on the floor above.', c: ['Loss Stopped'] },
          { t: 'Hold as tactical reserve.', c: [] }
        ]
      },
      {
        label: '2nd engine placement',
        unit: 'E2',
        cat: 'unit',
        q: 'Where does the 2nd engine go?',
        opts: [
          'Front of the building — FDC position',
          'Rear access',
          'Hydrant — water supply position',
          'Staging until assigned'
        ]
      },
      {
        label: 'Assign L1',
        unit: 'L1',
        q: 'Where do you send L1, and what task?',
        opts: [
          { t: 'Aerial rescue from the balconies.', c: ['All Clear'] },
          { t: 'Ventilation — roof access and stairwell pressurization.', c: ['Fire Control'] },
          { t: 'Primary search, floor above the fire.', c: ['All Clear'] },
          { t: 'Hold as tactical reserve.', c: [] }
        ]
      },
      {
        label: 'Ladder placement',
        unit: 'L1',
        cat: 'unit',
        q: 'Where does the ladder go?',
        opts: [
          'Front — balcony rescues',
          'Rear — courtyard side',
          'Roof position',
          'Staging until assigned'
        ]
      },
      {
        label: 'Assign E3',
        unit: 'E3',
        q: 'Where do you send E3, and what task?',
        opts: [
          { t: 'Floor above — rescue profile and fire extension.', c: ['All Clear', 'Fire Control'] },
          { t: 'Exposure protection.', c: ['Loss Stopped'] },
          { t: 'Water supply.', c: [] },
          { t: 'Hold as tactical reserve.', c: [] }
        ]
      },
      {
        label: 'Assign R3',
        unit: 'R3',
        q: 'Where do you send R3, and what task?',
        opts: [
          { t: 'RIT / rescue standby.', c: [] },
          { t: 'Primary search with E1.', c: ['All Clear'] },
          { t: 'Medical / rehab sector.', c: [] },
          { t: 'Hold as tactical reserve.', c: [] }
        ]
      },
      {
        label: 'Assign BC1',
        unit: 'BC1',
        q: 'Where do you send BC1, and what task?',
        opts: [
          { t: 'Assume command — E1 officer goes interior.', c: [] },
          { t: 'Safety / accountability sector.', c: [] },
          { t: 'Division supervisor, fire floor.', c: [] },
          { t: 'Staging and additional resources.', c: [] }
        ]
      },
      {
        label: 'Stretch check (hose)',
        q: 'What line do you bring, and how do you decide?',
        opts: [
          '2-inch off the standpipe — sized by walking the stretch: stairwell, hallway, up to 200 feet between standpipe connections, enough to reach, work, and turn.',
          '1¾-inch — an extended lay goes to a 1¾-inch line.',
          '2½-inch — biggest line that fits the standpipe.',
          'Biggest line on the rig — length does not matter as long as it is big.'
        ]
      },
      {
        label: 'What’s happening inside? (update)',
        cat: 'sizeup',
        q: 'What’s happening inside? Update your read:',
        opts: [
          'Interior report: fire contained to the unit of origin',
          'Fire extending — wood frame involvement suspected',
          'Smoke clearing, no extension seen',
          'Still unknown from outside'
        ]
      },
      {
        label: 'Victim status (update)',
        cat: 'sizeup',
        q: 'Are people hurt? Update:',
        opts: [
          'Still unknown',
          'Occupants out, no injuries',
          'Victims found — rescue underway',
          'Injuries confirmed — medical requested'
        ]
      },
      {
        label: 'MP reference',
        q: 'M.P. 202.20 Mid Rise Operations — the lines that matter here: "Nothing showing means nothing." Do not assume a fire control room, an alarm panel at your entrance, a fire pump, or a standpipe in every stairwell. Standpipe connections can be up to 200 feet apart and FDC caps may be KNOX-locked. City pressure in a wet standpipe may not be enough above ground level. Wood frame upper floors over masonry lower floors — fire in structural members can force writing off part or all of the building. Hose stretches can run over 150 feet, and you still never go past your ability to get back to safe refuge before low air.',
        opts: [
          'Understood — show my debrief'
        ]
      },
      {
        label: 'Reposition',
        q: 'Conditions have changed. Where do you go now? Tap a marker on the picture — green arrows move you, blue boxes aim water.',
        hotspots: true
      }
    ]
  },
  {
    id: 'highrise',
    title: 'High-Rise — Tower Fire',
    sub: 'M.P. 202.11 High-Rise Plans · Commercial · First-arriving size-up',
    dispatch: 'High-rise fire. Fire showing from upper floors of a downtown high-rise, Van Buren. Units: E1, L1, E2, E3, R3, BC1. Multiple callers, building occupied.',
    arrival: 'You arrive first on E1: a downtown high-rise, flame blowing out of three windows on an upper floor, heavy black smoke above. Palm trees and traffic at street level. The lobby is at the base of the tower.',
    image: 'assets/scenarios/highrise-arrival.jpg',
    imageAlt: 'Arrival view: tall downtown high-rise tower, flame from three upper-floor windows, heavy black smoke above, street level with palm trees at the base.',
    hotspots: [
      { kind: 'move', x: 48, y: 84, label: 'Lobby', note: 'Fire Control Room — meet the building engineer, check the alarm panel' },
      { kind: 'move', x: 28, y: 90, label: 'FDC', note: 'Connect to the standpipe system' },
      { kind: 'move', x: 62, y: 90, label: 'Staging', note: 'Lobby staging for arriving companies' },
      { kind: 'spray', x: 50, y: 40, w: 16, h: 10, label: 'Fire floor windows', note: 'Exterior water will not reach — this is a standpipe fire', c: ['Fire Control'] },
      { kind: 'move', x: 78, y: 80, label: 'Aerial', note: 'Spot for rescue or defensive firefight' }
    ],
    steps: [
      {
        label: 'Approach',
        q: 'You pull up. Where do you go first? Tap a marker on the picture — green arrows move you, blue boxes aim water.',
        hotspots: true
      },
      {
        label: 'Fireground factors',
        q: 'Size it up. What are the fireground factors here?',
        opts: [
          'Building: high-rise, 6 or more elevator stops, well sealed, large internal capacity for smoke. Fire: upper floor, flame from three windows, heavy black smoke. Occupancy: commercial, occupied, daytime.',
          'Building: mid-rise, 4 stories, no fire control room. Fire: upper floor, flame from three windows. Occupancy: commercial, occupied.',
          'Building: high-rise, 6 or more elevator stops. Fire: 1st floor lobby, light smoke. Occupancy: vacant, no life hazard.',
          'Building: high-rise, 6 or more elevator stops, well sealed. Fire: upper floor, flame from three windows. Occupancy: residential, confirmed empty.'
        ]
      },
      {
        label: 'Risk profile',
        q: 'What is your risk profile on this fire?',
        opts: [
          'Risk a lot — savable lives in an occupied high-rise, fire floor reachable by stairwell.',
          'Risk a little — protect exposures and property, no interior commitment yet.',
          'Risk nothing — defensive from the start; the building is too tall to go in.',
          'Risk a lot — the building is the priority, regardless of occupants.'
        ]
      },
      {
        label: 'Strategy',
        q: 'What strategy do you declare?',
        opts: [
          'Offensive',
          'Defensive',
          'Offensive, shifting to defensive if conditions worsen',
          'Wait for BC1 before declaring'
        ]
      },
      {
        label: 'Incident action plan',
        q: 'What is your IAP?',
        opts: [
          'Primary search and fire attack',
          'Fire attack only — no search until the fire is knocked',
          'Search, fire attack, and exposure protection',
          'Exposure protection first, then fire attack'
        ]
      },
      {
        label: 'Tactical priorities',
        q: 'In what order do you work the tactical priorities?',
        opts: [
          'All Clear (primary search) → Fire Control → Loss Stopped',
          'Fire Control → All Clear (primary search) → Loss Stopped',
          'Loss Stopped → Fire Control → All Clear (primary search)',
          'All Clear (primary search) → Loss Stopped → Fire Control'
        ]
      },
      {
        label: 'On-scene report',
        q: 'Give your on-scene report — which version do you send?',
        opts: [
          'E1 on scene, high-rise fire, Van Buren. E1 has command. High-rise tower, fire on an upper floor, flame from three windows, heavy black smoke. Offensive strategy. IAP is primary search and fire attack. First 3 companies to IAP tasks, 1 held as tactical reserve. Requesting additional resources — minimum 3rd alarm.',
          'E1 on scene, high-rise fire, Van Buren. High-rise tower, fire on an upper floor, flame from three windows, heavy black smoke. Offensive strategy. IAP is primary search and fire attack. First 3 companies to IAP tasks, 1 held as tactical reserve.',
          'E1 on scene, high-rise fire, Van Buren. E1 has command. High-rise tower, fire on an upper floor, flame from three windows, heavy black smoke. IAP is primary search and fire attack. First 3 companies to IAP tasks, 1 held as tactical reserve.',
          'E1 on scene, high-rise fire, Van Buren. E1 has command. High-rise tower, fire on an upper floor. Offensive strategy. IAP is primary search and fire attack.'
        ]
      },
      {
        label: 'Initial 3 & 1',
        q: 'How do you run the initial 3 & 1?',
        opts: [
          'First 3 companies to IAP tasks, 1 held as tactical reserve; call for more resources before assigning the reserve.',
          'All 4 companies to IAP tasks; the reserve comes from the next alarm.',
          'First 2 companies to IAP tasks, 2 held as reserve.',
          'Assign the reserve first to the hardest task, then call for more resources.'
        ]
      },
      {
        label: 'On-deck',
        cat: 'sizeup',
        q: 'Where do you stage the attack?',
        opts: [
          'On-deck, a minimum of 2 floors below the fire floor, in a clean environment — the floor directly below lays out the lines.',
          'On the fire floor.',
          'One floor below the fire floor.',
          'In the lobby.'
        ]
      },
      {
        label: 'Lines',
        cat: 'sizeup',
        q: 'Where do the lines connect?',
        opts: [
          'Attack line at the closest standpipe below the fire floor. Backup and stairwell protection lines one floor below that.',
          'All lines on the fire floor.',
          'All lines in the lobby.',
          'Attack line on the fire floor, backup in the stairwell.'
        ]
      },
      {
        label: 'Elevators',
        cat: 'sizeup',
        q: 'What about the elevators?',
        opts: [
          'Never for rescue in smoke or fire. Typically not used if the fire floor is 10 or less. Must be Phase II, prepped, with a dedicated operator.',
          'Use them — fastest way up.',
          'Use them for rescue only.',
          'Use the freight elevator for the attack team.'
        ]
      },
      {
        label: 'Air',
        cat: 'sizeup',
        q: 'Air management going up?',
        opts: [
          'Every crew brings a spare bottle per member. Check air together every 5 floors on the stairs. Air cart to on-deck.',
          'One spare bottle per crew.',
          'Check air at the fire floor.',
          'Air is not a factor — the stairs are short.'
        ]
      },
      {
        label: 'What’s happening inside?',
        cat: 'sizeup',
        q: 'What’s happening inside? Your first read:',
        opts: [
          'Fire on one upper floor, smoke in the stairwell',
          'Smoke throughout the tower',
          'Fire extending to the floor above',
          'Unknown — no interior report yet'
        ]
      },
      {
        label: 'Victim status',
        cat: 'sizeup',
        q: 'Are people hurt? What do you know right now?',
        opts: [
          'Unknown — no victims reported yet',
          'Occupants seen leaving, no injuries reported',
          'Occupants possibly still inside',
          'Injuries reported — medical needed'
        ]
      },
      {
        label: 'Attack flow',
        q: 'How do you attack it?',
        opts: [
          'Standpipe attack from on-deck — lines up the attack stairwell, enter the fire floor only when attack, backup, and stairwell protection lines are in place',
          'Hit it from outside only — stay exterior'
        ]
      },
      {
        label: 'Go interior',
        showIf: { label: 'Attack flow', match: 'Standpipe' },
        q: 'You go interior — then what?',
        opts: [
          'Attack the fire floor from on-deck',
          'Search the fire floor',
          'Check the floor above for extension',
          'Open up — check for extension into the void spaces'
        ]
      },
      {
        label: 'Flow',
        q: 'M.P. 202.11: what lines go on the fire floor?',
        opts: [
          '2-inch attack line at 250+ GPM, 2½-inch backup and 2½-inch stairwell protection lines — two lines on the fire floor make the NFPA 1710 500 GPM.',
          '1¾-inch auto nozzle — 150 GPM, one line is enough.',
          '2½-inch attack line only.',
          'Booster line from the lobby.'
        ]
      },
      {
        label: 'Alarm',
        q: 'How big is this assignment?',
        opts: [
          'Minimum 3rd alarm for a working high-rise fire — and a minimum 1st alarm of companies stays in the lobby.',
          '1st alarm is enough.',
          '2nd alarm.',
          'Call it when BC1 gets there.'
        ]
      },
      {
        label: 'Crew of 4',
        kind: 'crew',
        q: 'Deploy your 4-person engine crew — who does what?',
        opts: [
          { t: 'Officer + 1 firefighter to the Fire Control Room for Building Systems, 2 firefighters to the FDC connection.', c: [] },
          { t: 'All 4 to the fire floor — put the fire out first.', c: ['Fire Control'] },
          { t: 'Officer establishes command, 3 firefighters to primary search.', c: ['All Clear'] },
          { t: '2 firefighters to the attack line from on-deck, 2 to the stairwell team.', c: ['Fire Control'] }
        ]
      },
      {
        label: 'Assign E2',
        unit: 'E2',
        q: 'Where do you send E2, and what task?',
        opts: [
          { t: 'FDC connection and stair team.', c: [] },
          { t: 'Attack team leader — on-deck, lines, air bottles.', c: ['Fire Control'] },
          { t: 'Lobby sector.', c: [] },
          { t: 'Hold as tactical reserve.', c: [] }
        ]
      },
      {
        label: '2nd engine placement',
        unit: 'E2',
        cat: 'unit',
        q: 'Where does the 2nd engine go?',
        opts: [
          'As close to the FDC as possible',
          'Rear of the building',
          'Hydrant — water supply position',
          'Staging until assigned'
        ]
      },
      {
        label: 'Assign L1',
        unit: 'L1',
        q: 'Where do you send L1, and what task?',
        opts: [
          { t: 'Aerial rescue from the fire floor balconies.', c: ['All Clear'] },
          { t: 'Ventilation — roof access and built-in systems.', c: ['Fire Control'] },
          { t: 'Attack team with high-rise packs.', c: ['Fire Control'] },
          { t: 'Hold as tactical reserve.', c: [] }
        ]
      },
      {
        label: 'Ladder placement',
        unit: 'L1',
        cat: 'unit',
        q: 'Where does the ladder go?',
        opts: [
          'Front — aerial rescue position',
          'Rear — courtyard side',
          'Roof position',
          'Staging until assigned'
        ]
      },
      {
        label: 'Assign E3',
        unit: 'E3',
        q: 'Where do you send E3, and what task?',
        opts: [
          { t: 'Attack team — fire floor.', c: ['Fire Control'] },
          { t: 'Evacuation stair team.', c: ['All Clear'] },
          { t: 'Lobby sector.', c: [] },
          { t: 'Hold as tactical reserve.', c: [] }
        ]
      },
      {
        label: 'Assign R3',
        unit: 'R3',
        q: 'Where do you send R3, and what task?',
        opts: [
          { t: 'RIC — on-deck.', c: [] },
          { t: 'Primary search with E1.', c: ['All Clear'] },
          { t: 'Medical / treatment sector.', c: [] },
          { t: 'Hold as tactical reserve.', c: [] }
        ]
      },
      {
        label: 'Assign BC1',
        unit: 'BC1',
        q: 'Where do you send BC1, and what task?',
        opts: [
          { t: 'Fire Floor Sector from on-deck.', c: [] },
          { t: 'Assume command — E1 officer goes interior.', c: [] },
          { t: 'Safety / accountability sector.', c: [] },
          { t: 'Staging and additional resources.', c: [] }
        ]
      },
      {
        label: 'Stretch check (hose)',
        q: 'What line do you bring, and how do you decide?',
        opts: [
          '2-inch off the standpipe — 250+ GPM, sized for standpipe pressures, plus 50 to 75 feet extra on the backup line to reach as far as the attack line.',
          '1¾-inch auto nozzle — 150 GPM is enough.',
          '2½-inch — biggest line that fits the standpipe.',
          'Biggest line on the rig — length does not matter as long as it is big.'
        ]
      },
      {
        label: 'What’s happening inside? (update)',
        cat: 'sizeup',
        q: 'What’s happening inside? Update your read:',
        opts: [
          'Interior report: fire contained to the floor of origin',
          'Fire extending — floor above involved',
          'Smoke banking down the stairwell — reverse stack effect',
          'Still unknown from outside'
        ]
      },
      {
        label: 'Victim status (update)',
        cat: 'sizeup',
        q: 'Are people hurt? Update:',
        opts: [
          'Still unknown',
          'Occupants out, no injuries',
          'Victims found — rescue underway',
          'Injuries confirmed — medical requested'
        ]
      },
      {
        label: 'MP reference',
        q: 'M.P. 202.11 High-Rise Plans — the lines that matter here: a high-rise is 6 elevator stops or more, or 75 feet or more. On-deck is a minimum of 2 floors below the fire floor, not 1. Never enter the fire floor until attack, backup, and stairwell protection lines are in place, the roof door is closed, and the stair team is out of the stairwell. Never use elevators for rescue in smoke or fire. Every crew brings a spare bottle per member, air checked every 5 floors. Working high-rise fire means a minimum 3rd alarm, and a minimum 1st alarm of companies stays in the lobby.',
        opts: [
          'Understood — show my debrief'
        ]
      },
      {
        label: 'Reposition',
        q: 'Conditions have changed. Where do you go now? Tap a marker on the picture — green arrows move you, blue boxes aim water.',
        hotspots: true
      }
    ]
  },
  {
    id: 'stripmall',
    title: 'Strip Mall — Large-Space Fire',
    sub: 'M.P. 202.04A Large-Space Cold Smoke Fires · Commercial · First-arriving size-up',
    dispatch: 'Commercial fire. Strip mall, light smoke showing from the laundromat and the thrift store. Sprinkler bell ringing. Units: E1, L1, E2, E3, R3, BC1. Occupancy unknown, stores may be open.',
    arrival: 'You arrive first on E1: a strip mall — thrift store, sweets shop, coin laundry. Not much smoke showing, just a thin column over the laundry and haze at the storefronts. The sprinkler bell is ringing. The building is big and mostly one open space inside.',
    image: 'assets/scenarios/stripmall-arrival.jpg',
    imageAlt: 'Arrival view: strip mall with thrift store, sweets shop, and coin laundry, light smoke over the laundry, cars parked in front.',
    hotspots: [
      { kind: 'move', x: 15, y: 60, label: 'Thrift store', note: 'Front entrance — check for occupants' },
      { kind: 'move', x: 82, y: 58, label: 'Laundry', note: 'Smoke is showing here — coin laundry' },
      { kind: 'move', x: 50, y: 75, label: 'Rear', note: 'Walk the 360 — check the back' },
      { kind: 'spray', x: 88, y: 55, w: 12, h: 12, label: 'Laundromat storefront', note: 'Water through the storefront — transitional', c: ['Fire Control'] },
      { kind: 'move', x: 60, y: 85, label: 'Staging', note: 'Parking lot — room for apparatus' }
    ],
    steps: [
      {
        label: 'Approach',
        q: 'You pull up. Where do you go first? Tap a marker on the picture — green arrows move you, blue boxes aim water.',
        hotspots: true
      },
      {
        label: 'Fireground factors',
        q: 'Size it up. What are the fireground factors here?',
        opts: [
          'Building: large-space commercial, one big open interior, truss roof, sprinklered. Fire: location unknown, light smoke from the laundry and the thrift store, sprinkler bell ringing. Occupancy: commercial, stores may be open, occupants unknown.',
          'Building: small residential house. Fire: laundry room, heavy smoke. Occupancy: residential, occupants unknown.',
          'Building: large-space commercial, one big open interior, truss roof, sprinklered. Fire: fully involved, flame through the roof. Occupancy: vacant, no life hazard.',
          'Building: high-rise with a fire control room. Fire: laundry, light smoke. Occupancy: commercial, confirmed empty.'
        ]
      },
      {
        label: 'Risk profile',
        q: 'What is your risk profile on this fire?',
        opts: [
          'Risk a lot — savable lives if the stores are open and occupied.',
          'Risk a little — protect exposures and property, find the fire before committing deep.',
          'Risk nothing — defensive from the start; the building is too big to go in.',
          'Risk a lot — the building is the priority, regardless of occupants.'
        ]
      },
      {
        label: 'Strategy',
        q: 'What strategy do you declare?',
        opts: [
          'Offensive',
          'Defensive',
          'Offensive, shifting to defensive if conditions worsen',
          'Wait for BC1 before declaring'
        ]
      },
      {
        label: 'Incident action plan',
        q: 'What is your IAP?',
        opts: [
          'Locate the fire and attack it',
          'Fire attack only — no search until the fire is knocked',
          'Search, fire attack, and exposure protection',
          'Exposure protection first, then fire attack'
        ]
      },
      {
        label: 'Tactical priorities',
        q: 'In what order do you work the tactical priorities?',
        opts: [
          'All Clear (primary search) → Fire Control → Loss Stopped',
          'Fire Control → All Clear (primary search) → Loss Stopped',
          'Loss Stopped → Fire Control → All Clear (primary search)',
          'All Clear (primary search) → Loss Stopped → Fire Control'
        ]
      },
      {
        label: 'On-scene report',
        q: 'Give your on-scene report — which version do you send?',
        opts: [
          'E1 on scene, strip mall fire. E1 has command. Large-space commercial, light smoke from the laundromat and the thrift store, sprinkler bell ringing. Offensive strategy. IAP is locate the fire and attack it. First 3 companies to IAP tasks, 1 held as tactical reserve. Requesting additional resources.',
          'E1 on scene, strip mall fire. Large-space commercial, light smoke from the laundromat and the thrift store, sprinkler bell ringing. Offensive strategy. IAP is locate the fire and attack it. First 3 companies to IAP tasks, 1 held as tactical reserve.',
          'E1 on scene, strip mall fire. E1 has command. Large-space commercial, light smoke from the laundromat and the thrift store, sprinkler bell ringing. IAP is locate the fire and attack it. First 3 companies to IAP tasks, 1 held as tactical reserve.',
          'E1 on scene, strip mall fire. E1 has command. Large-space commercial, light smoke from the laundromat. Offensive strategy. IAP is locate the fire and attack it.'
        ]
      },
      {
        label: 'Initial 3 & 1',
        q: 'How do you run the initial 3 & 1?',
        opts: [
          'First 3 companies to IAP tasks, 1 held as tactical reserve; call for more resources before assigning the reserve.',
          'All 4 companies to IAP tasks; the reserve comes from the next alarm.',
          'First 2 companies to IAP tasks, 2 held as reserve.',
          'Assign the reserve first to the hardest task, then call for more resources.'
        ]
      },
      {
        label: 'Cold smoke',
        cat: 'sizeup',
        q: 'There is only a little calm smoke. What does M.P. 202.04A say?',
        opts: [
          '"A small amount of smoke from one or more locations can mean a significant fire." Cold smoke has lost its velocity — it is extremely dangerous.',
          'Little smoke means a little fire.',
          'Calm smoke means the fire is out.',
          'Cold smoke is safe to walk into.'
        ]
      },
      {
        label: '150-foot penetration',
        cat: 'sizeup',
        q: 'How far inside do you go looking for the fire?',
        opts: [
          '150 feet max without additional support from Command. If you cannot find the fire, pull out and make another plan.',
          'As far as the line reaches.',
          'Until you find it, no matter the distance.',
          '300 feet with a backup line.'
        ]
      },
      {
        label: 'Truss roof',
        cat: 'sizeup',
        q: 'What is over your head in a large open space?',
        opts: [
          'Usually truss construction — it can collapse early if the sprinklers do not contain the fire. A partial roof collapse means the sprinkler system is compromised.',
          'Concrete deck — no collapse risk.',
          'Steel that holds up for hours.',
          'No roof structure to worry about.'
        ]
      },
      {
        label: 'Rack storage',
        cat: 'sizeup',
        q: 'What is inside?',
        opts: [
          'Rack or floor storage — wet stock gets heavier, packaging breaks down, racks can collapse. Rolled paper is a known killer.',
          'Empty space.',
          'Office furniture only.',
          'Nothing that changes the attack.'
        ]
      },
      {
        label: 'What’s happening inside?',
        cat: 'sizeup',
        q: 'What’s happening inside? Your first read:',
        opts: [
          'Fire location unknown — cold smoke, sprinklers flowing',
          'Fire in the laundromat, smoke showing',
          'Fire already through the roof',
          'Unknown — no interior report yet'
        ]
      },
      {
        label: 'Victim status',
        cat: 'sizeup',
        q: 'Are people hurt? What do you know right now?',
        opts: [
          'Unknown — no victims reported yet',
          'Occupants seen leaving, no injuries reported',
          'Occupants possibly still inside',
          'Injuries reported — medical needed'
        ]
      },
      {
        label: 'Attack flow',
        q: 'How do you attack it?',
        opts: [
          'Reset the fire from outside, then move interior (transitional attack)',
          'Hit it from outside only — stay exterior'
        ]
      },
      {
        label: 'Go interior',
        showIf: { label: 'Attack flow', match: 'interior' },
        q: 'You go interior — then what?',
        opts: [
          'Stay on the hose line and use the TIC to find the fire',
          'Search the whole space first',
          'Split up and cover more ground',
          'Open up — check for extension into the common attic'
        ]
      },
      {
        label: 'FDC',
        q: 'The bell is ringing — water is flowing from the sprinklers. What do you do at the FDC?',
        opts: [
          'Pump the FDC — extra GPM and pressure helps the sprinklers a lot. But think about crews inside first: a sudden jump can collapse racks. Never shut the sprinklers down before fire control is verified.',
          'Shut the sprinklers down so you can see.',
          'Ignore the FDC — the sprinklers have it.',
          'Pump the FDC only after the fire is out.'
        ]
      },
      {
        label: 'Flow',
        q: 'M.P. 202.04: what flow does a commercial fire get?',
        opts: [
          '250 GPM minimum per handline — 2-inch and 2½-inch lines, NFPA 1710 minimum three handlines and 500+ GPM total.',
          '150 GPM — 1¾-inch line.',
          '300 GPM — one 2½-inch line is enough.',
          '500 GPM — portable monitor only.'
        ]
      },
      {
        label: 'Crew of 4',
        kind: 'crew',
        q: 'Deploy your 4-person engine crew — who does what?',
        opts: [
          { t: 'Officer + 1 firefighter to locate the fire with the TIC, 2 firefighters to the attack line.', c: ['Fire Control'] },
          { t: 'All 4 to fire attack — put the fire out first.', c: ['Fire Control'] },
          { t: 'Officer establishes command, 3 firefighters to primary search.', c: ['All Clear'] },
          { t: '2 firefighters to the attack line, 2 to exposure protection.', c: ['Fire Control', 'Loss Stopped'] }
        ]
      },
      {
        label: 'Assign E2',
        unit: 'E2',
        q: 'Where do you send E2, and what task?',
        opts: [
          { t: '2nd attack line — back up the first line.', c: ['Fire Control'] },
          { t: 'FDC — pump the sprinkler system.', c: [] },
          { t: 'Exposure protection on the neighboring units.', c: ['Loss Stopped'] },
          { t: 'Water supply.', c: [] },
          { t: 'Hold as tactical reserve.', c: [] }
        ]
      },
      {
        label: '2nd engine placement',
        unit: 'E2',
        cat: 'unit',
        q: 'Where does the 2nd engine go?',
        opts: [
          'Front of the building — FDC position',
          'Rear access',
          'Hydrant — water supply position',
          'Staging until assigned'
        ]
      },
      {
        label: 'Assign L1',
        unit: 'L1',
        q: 'Where do you send L1, and what task?',
        opts: [
          { t: 'Ventilation — roof vents, skylights, rollup doors.', c: ['Fire Control'] },
          { t: 'Primary search.', c: ['All Clear'] },
          { t: 'Ladder the building for roof access.', c: [] },
          { t: 'Hold as tactical reserve.', c: [] }
        ]
      },
      {
        label: 'Ladder placement',
        unit: 'L1',
        cat: 'unit',
        q: 'Where does the ladder go?',
        opts: [
          'Front — ventilation and roof access',
          'Rear — back of the building',
          'Roof position',
          'Staging until assigned'
        ]
      },
      {
        label: 'Assign E3',
        unit: 'E3',
        q: 'Where do you send E3, and what task?',
        opts: [
          { t: 'Exposure protection.', c: ['Loss Stopped'] },
          { t: '2nd line to the far side of the space.', c: ['Fire Control'] },
          { t: 'Water supply.', c: [] },
          { t: 'Hold as tactical reserve.', c: [] }
        ]
      },
      {
        label: 'Assign R3',
        unit: 'R3',
        q: 'Where do you send R3, and what task?',
        opts: [
          { t: 'RIT / rescue standby.', c: [] },
          { t: 'Primary search with E1.', c: ['All Clear'] },
          { t: 'Medical / rehab sector.', c: [] },
          { t: 'Hold as tactical reserve.', c: [] }
        ]
      },
      {
        label: 'Assign BC1',
        unit: 'BC1',
        q: 'Where do you send BC1, and what task?',
        opts: [
          { t: 'Assume command — E1 officer goes interior.', c: [] },
          { t: 'Safety / accountability sector.', c: [] },
          { t: 'Division supervisor, fire floor.', c: [] },
          { t: 'Staging and additional resources.', c: [] }
        ]
      },
      {
        label: 'Stretch check (hose)',
        q: 'What line do you bring, and how do you decide?',
        opts: [
          '2-inch — 250 GPM, sized by walking the stretch: front door, across the open space, enough to reach the fire, work, and turn — and never past 150 feet without Command support.',
          '1¾-inch — 150 GPM is enough for commercial.',
          '2½-inch — biggest line that fits.',
          'Biggest line on the rig — length does not matter as long as it is big.'
        ]
      },
      {
        label: 'What’s happening inside? (update)',
        cat: 'sizeup',
        q: 'What’s happening inside? Update your read:',
        opts: [
          'Interior report: fire located, sprinklers holding it',
          'Fire growing — sprinklers not controlling it',
          'Smoke clearing, no extension seen',
          'Still unknown from outside'
        ]
      },
      {
        label: 'Victim status (update)',
        cat: 'sizeup',
        q: 'Are people hurt? Update:',
        opts: [
          'Still unknown',
          'Occupants out, no injuries',
          'Victims found — rescue underway',
          'Injuries confirmed — medical requested'
        ]
      },
      {
        label: 'MP reference',
        q: 'M.P. 202.04A Large-Space Cold Smoke Fires — the lines that matter here: never treat a little calm smoke as a small fire. Never go past 150 feet without Command support. Never shut the sprinklers down before confirmed control. Never pump the FDC without thinking about crews inside and rack collapse. If you cannot find the fire, get out — do not keep pushing deeper. If the sprinklers fail to control it, the fire grows fast — anticipate defensive operations and exterior master streams outside the collapse zone.',
        opts: [
          'Understood — show my debrief'
        ]
      },
      {
        label: 'Reposition',
        q: 'Conditions have changed. Where do you go now? Tap a marker on the picture — green arrows move you, blue boxes aim water.',
        hotspots: true
      }
    ]
  },
  {
    id: 'basement',
    title: 'Church — Basement Fire',
    sub: 'M.P. 202.04B Basement and Below Grade Fires · Commercial · First-arriving size-up',
    dispatch: 'Church fire. Smoke showing, report of a fire in the basement. Units: E1, L1, E2, E3, R3, BC1. Occupancy unknown.',
    arrival: 'You arrive first on E1: a brick church. The deck labels it a basement fire. No flame showing from the street. The main entrance is up the stairs on the left; there is a dark opening at the basement level in the center and a side door on the right.',
    image: 'assets/scenarios/basement-arrival.jpg',
    imageAlt: 'Arrival view: brick church labeled "Basement fire", main entrance up stairs on the left, dark basement-level opening in the center, side door on the right.',
    hotspots: [
      { kind: 'move', x: 20, y: 70, label: 'Main entrance', note: '1st floor — do NOT work above the fire yet' },
      { kind: 'move', x: 62, y: 72, label: 'Side door', note: 'Check the side access' },
      { kind: 'move', x: 85, y: 80, label: 'Rear', note: 'Walk the 360' },
      { kind: 'spray', x: 48, y: 80, w: 12, h: 10, label: 'Basement opening', note: 'Put water in at the basement level', c: ['Fire Control'] }
    ],
    steps: [
      {
        label: 'Approach',
        q: 'You pull up. Where do you go first? Tap a marker on the picture — green arrows move you, blue boxes aim water.',
        hotspots: true
      },
      {
        label: 'Fireground factors',
        q: 'Size it up. What are the fireground factors here?',
        opts: [
          'Building: brick church, basement below grade, main floor above. Fire: basement level, smoke showing, no flame from the street. Occupancy: public assembly, occupants unknown.',
          'Building: brick church, attic fire. Fire: roof level, flame showing. Occupancy: public assembly, occupants unknown.',
          'Building: brick church, basement below grade. Fire: 1st floor, flame showing from the main entrance. Occupancy: vacant, no life hazard.',
          'Building: single-story house. Fire: basement level, smoke showing. Occupancy: residential, confirmed empty.'
        ]
      },
      {
        label: 'Risk profile',
        q: 'What is your risk profile on this fire?',
        opts: [
          'Risk a lot — savable lives if the building is occupied, fire reachable from the basement level.',
          'Risk a little — protect exposures and property, find the basement access before committing.',
          'Risk nothing — defensive from the start; basement fires are too dangerous to go in.',
          'Risk a lot — the building is the priority, regardless of occupants.'
        ]
      },
      {
        label: 'Strategy',
        q: 'What strategy do you declare?',
        opts: [
          'Offensive',
          'Defensive',
          'Offensive, shifting to defensive if conditions worsen',
          'Wait for BC1 before declaring'
        ]
      },
      {
        label: 'Incident action plan',
        q: 'What is your IAP?',
        opts: [
          'Basement attack and primary search',
          'Fire attack only — no search until the fire is knocked',
          'Search, fire attack, and exposure protection',
          'Exposure protection first, then fire attack'
        ]
      },
      {
        label: 'Tactical priorities',
        q: 'In what order do you work the tactical priorities?',
        opts: [
          'All Clear (primary search) → Fire Control → Loss Stopped',
          'Fire Control → All Clear (primary search) → Loss Stopped',
          'Loss Stopped → Fire Control → All Clear (primary search)',
          'All Clear (primary search) → Loss Stopped → Fire Control'
        ]
      },
      {
        label: 'On-scene report',
        q: 'Give your on-scene report — which version do you send?',
        opts: [
          'E1 on scene, church fire. E1 has command. Brick church, fire in the basement, smoke showing, no flame from the street. Offensive strategy. IAP is basement attack and primary search. First 3 companies to IAP tasks, 1 held as tactical reserve. Requesting additional resources.',
          'E1 on scene, church fire. Brick church, fire in the basement, smoke showing, no flame from the street. Offensive strategy. IAP is basement attack and primary search. First 3 companies to IAP tasks, 1 held as tactical reserve.',
          'E1 on scene, church fire. E1 has command. Brick church, fire in the basement, smoke showing, no flame from the street. IAP is basement attack and primary search. First 3 companies to IAP tasks, 1 held as tactical reserve.',
          'E1 on scene, church fire. E1 has command. Brick church, fire in the basement. Offensive strategy. IAP is basement attack and primary search.'
        ]
      },
      {
        label: 'Initial 3 & 1',
        q: 'How do you run the initial 3 & 1?',
        opts: [
          'First 3 companies to IAP tasks, 1 held as tactical reserve; call for more resources before assigning the reserve.',
          'All 4 companies to IAP tasks; the reserve comes from the next alarm.',
          'First 2 companies to IAP tasks, 2 held as reserve.',
          'Assign the reserve first to the hardest task, then call for more resources.'
        ]
      },
      {
        label: 'Same level',
        cat: 'sizeup',
        q: 'Where does the attack start?',
        opts: [
          '"When a fire is located at the basement level, fire attack must begin on that level." From basement windows, doors, or stairwells — minimum 150 GPM.',
          'From the 1st floor above — attack down.',
          'From the roof.',
          'From outside only.'
        ]
      },
      {
        label: 'Floor above',
        cat: 'sizeup',
        q: 'Can anyone work on the 1st floor above the fire?',
        opts: [
          'No — not until fire control is achieved and the smoke is ventilated so the floor sheeting and joists can be checked.',
          'Yes — the 1st floor is the safest place to work.',
          'Yes, with a hose line.',
          'Yes, for search only.'
        ]
      },
      {
        label: 'Ventilation',
        cat: 'sizeup',
        q: 'What about ventilation?',
        opts: [
          'Minimize ventilation before extinguishment — opening the basement level can push unsurvivable heat to the floor above. Ventilate after water is on the fire.',
          'Ventilate the basement first — open it up.',
          'Cut the roof first.',
          'Open every door and window.'
        ]
      },
      {
        label: 'TIC',
        cat: 'sizeup',
        q: 'Can the thermal camera tell you if the floor will hold?',
        opts: [
          'No — thermal imagers and sounding the floor are not reliable for floor integrity, especially in lightweight construction. Rugs and furniture can hide burned-away floor.',
          'Yes — the TIC shows joist integrity.',
          'Sounding the floor is enough.',
          'If the floor looks fine, it is fine.'
        ]
      },
      {
        label: 'What’s happening inside?',
        cat: 'sizeup',
        q: 'What’s happening inside? Your first read:',
        opts: [
          'Fire in the basement, smoke pushing up to the 1st floor',
          'Fire on the 1st floor, smoke in the basement',
          'Fire already through the floor',
          'Unknown — no interior report yet'
        ]
      },
      {
        label: 'Victim status',
        cat: 'sizeup',
        q: 'Are people hurt? What do you know right now?',
        opts: [
          'Unknown — no victims reported yet',
          'Occupants seen leaving, no injuries reported',
          'Occupants possibly still inside',
          'Injuries reported — medical needed'
        ]
      },
      {
        label: 'Attack flow',
        q: 'How do you attack it?',
        opts: [
          'Attack on the basement level — windows, doors, or stairwell, minimum 150 GPM',
          'Attack from the 1st floor above the fire',
          'Hit it from outside only — stay exterior'
        ]
      },
      {
        label: 'Go interior',
        showIf: { label: 'Attack flow', match: 'basement level' },
        q: 'You go interior at the basement level — then what?',
        opts: [
          'Cool the structural surfaces — walls, ceiling, floor joists — not just the air',
          'Cool the air first, then the surfaces',
          'Search the basement first',
          'Open up — check for extension to the floor above'
        ]
      },
      {
        label: 'Basement type',
        q: 'What kind of basement is this?',
        opts: [
          'No-access (internal access only), limited-access (external window only), or full-access (external door or large escape window) — and finished (drywall protects the floor) or unfinished (no protection).',
          'All basements are the same.',
          'Only the size matters.',
          'Basement type does not change the attack.'
        ]
      },
      {
        label: 'Flow',
        q: 'M.P. 202.04B: what is the minimum fire attack flow for a basement fire?',
        opts: [
          '150 GPM.',
          '250 GPM.',
          '300 GPM.',
          '500 GPM.'
        ]
      },
      {
        label: 'Crew of 4',
        kind: 'crew',
        q: 'Deploy your 4-person engine crew — who does what?',
        opts: [
          { t: 'Officer + 1 firefighter to the basement attack line, 2 firefighters to search the 1st floor only after control.', c: ['Fire Control', 'All Clear'] },
          { t: 'All 4 to fire attack — put the fire out first.', c: ['Fire Control'] },
          { t: 'Officer establishes command, 3 firefighters to primary search on the 1st floor.', c: ['All Clear'] },
          { t: '2 firefighters to the attack line, 2 to exposure protection.', c: ['Fire Control', 'Loss Stopped'] }
        ]
      },
      {
        label: 'Assign E2',
        unit: 'E2',
        q: 'Where do you send E2, and what task?',
        opts: [
          { t: '2nd attack line to the basement level.', c: ['Fire Control'] },
          { t: 'Backup / RIT for the interior crews.', c: [] },
          { t: 'Exposure protection.', c: ['Loss Stopped'] },
          { t: 'Water supply.', c: [] },
          { t: 'Hold as tactical reserve.', c: [] }
        ]
      },
      {
        label: '2nd engine placement',
        unit: 'E2',
        cat: 'unit',
        q: 'Where does the 2nd engine go?',
        opts: [
          'Front of the building',
          'Rear access',
          'Hydrant — water supply position',
          'Staging until assigned'
        ]
      },
      {
        label: 'Assign L1',
        unit: 'L1',
        q: 'Where do you send L1, and what task?',
        opts: [
          { t: 'Ventilation — after extinguishment, most effective method.', c: ['Fire Control'] },
          { t: 'Primary search, 1st floor — only after control and joist check.', c: ['All Clear'] },
          { t: 'Ladder the building for roof access.', c: [] },
          { t: 'Hold as tactical reserve.', c: [] }
        ]
      },
      {
        label: 'Ladder placement',
        unit: 'L1',
        cat: 'unit',
        q: 'Where does the ladder go?',
        opts: [
          'Front — ventilation and roof access',
          'Rear — back of the building',
          'Roof position',
          'Staging until assigned'
        ]
      },
      {
        label: 'Assign E3',
        unit: 'E3',
        q: 'Where do you send E3, and what task?',
        opts: [
          { t: 'Floor above — after control, check joists and search.', c: ['All Clear'] },
          { t: 'Exposure protection.', c: ['Loss Stopped'] },
          { t: 'Water supply.', c: [] },
          { t: 'Hold as tactical reserve.', c: [] }
        ]
      },
      {
        label: 'Assign R3',
        unit: 'R3',
        q: 'Where do you send R3, and what task?',
        opts: [
          { t: 'RIT / rescue standby.', c: [] },
          { t: 'Primary search with E1.', c: ['All Clear'] },
          { t: 'Medical / rehab sector.', c: [] },
          { t: 'Hold as tactical reserve.', c: [] }
        ]
      },
      {
        label: 'Assign BC1',
        unit: 'BC1',
        q: 'Where do you send BC1, and what task?',
        opts: [
          { t: 'Assume command — E1 officer goes interior.', c: [] },
          { t: 'Safety / accountability sector.', c: [] },
          { t: 'Division supervisor, basement level.', c: [] },
          { t: 'Staging and additional resources.', c: [] }
        ]
      },
      {
        label: 'Stretch check (hose)',
        q: 'What line do you bring, and how do you decide?',
        opts: [
          '1¾-inch — 150 GPM minimum, sized by walking the stretch: basement entrance, stairs or window, enough to reach, work, and turn.',
          '2-inch — 250 GPM for a basement.',
          '2½-inch — biggest line that fits.',
          'Biggest line on the rig — length does not matter as long as it is big.'
        ]
      },
      {
        label: 'What’s happening inside? (update)',
        cat: 'sizeup',
        q: 'What’s happening inside? Update your read:',
        opts: [
          'Interior report: fire contained to the basement',
          'Fire extending — floor joists involved',
          'Smoke clearing, joists checked, floor above clear to work',
          'Still unknown from outside'
        ]
      },
      {
        label: 'Victim status (update)',
        cat: 'sizeup',
        q: 'Are people hurt? Update:',
        opts: [
          'Still unknown',
          'Occupants out, no injuries',
          'Victims found — rescue underway',
          'Injuries confirmed — medical requested'
        ]
      },
      {
        label: 'MP reference',
        q: 'M.P. 202.04B Basement and Below Grade Fires — the lines that matter here: never work on the floor above a basement fire before the fire is out and the floor is checked. Never trust a TIC or sounding the floor to judge joist integrity. Never ventilate the basement level before water is on the fire. Never attack from above — attack on the same level as the fire at a minimum of 150 GPM. Cool the structural surfaces, not just the air.',
        opts: [
          'Understood — show my debrief'
        ]
      },
      {
        label: 'Reposition',
        q: 'Conditions have changed. Where do you go now? Tap a marker on the picture — green arrows move you, blue boxes aim water.',
        hotspots: true
      }
    ]
  },
  {
    id: 'stickcity',
    title: 'Stick City — High-Piled Storage Fire',
    sub: 'M.P. 202.18 High Piled Outside Combustible Storage · Commercial · First-arriving size-up',
    dispatch: 'Outside fire. Large unfinished wood-frame construction project fully involved, exposures downwind. Units: E1, L1, E2, E3, R3, BC1. No reports of anyone inside.',
    arrival: 'You arrive first on E1: a stick-built apartment project under construction, exposed trusses, fully involved on the right side with a huge black column. Crane on the left, lumber piles everywhere. The street gives you room to stage upwind.',
    image: 'assets/scenarios/stickcity-arrival.jpg',
    imageAlt: 'Arrival view: unfinished wood-frame construction with exposed trusses, fire on the right side with a large black smoke column, crane on the left, lumber piles, street in the foreground.',
    hotspots: [
      { kind: 'move', x: 22, y: 86, label: 'Staging', note: 'Stage upwind, clear of the collapse zone' },
      { kind: 'move', x: 78, y: 60, label: 'Exposure', note: 'Check the downwind exposures' },
      { kind: 'move', x: 8, y: 74, label: 'Hydrant', note: 'Water supply — start building it now' },
      { kind: 'spray', x: 80, y: 58, w: 16, h: 16, label: 'Main body of fire', note: 'Master stream from outside the collapse zone', c: ['Fire Control'] },
      { kind: 'move', x: 55, y: 75, label: 'Collapse zone edge', note: 'Stay out of the collapse zone' }
    ],
    steps: [
      {
        label: 'Approach',
        q: 'You pull up. Where do you go first? Tap a marker on the picture — green arrows move you, blue boxes aim water.',
        hotspots: true
      },
      {
        label: 'Fireground factors',
        q: 'Size it up. What are the fireground factors here?',
        opts: [
          'Building: large unfinished wood-frame construction, exposed trusses, no compartmentation. Fire: fully involved on the right side, large black smoke column, rapid spread. Occupancy: under construction, no reports of anyone inside. Arrangement: exposures downwind, lumber piles, crane on site.',
          'Building: occupied residential apartment. Fire: fully involved on the right side. Occupancy: residential, occupants unknown.',
          'Building: large unfinished wood-frame construction. Fire: small brush fire at the edge of the lot. Occupancy: under construction, no exposures.',
          'Building: large unfinished wood-frame construction, exposed trusses. Fire: fully involved. Occupancy: commercial, confirmed empty, no exposures.'
        ]
      },
      {
        label: 'Risk profile',
        q: 'What is your risk profile on this fire?',
        opts: [
          'Risk a little — no savable lives reported, property already going. Protect exposures.',
          'Risk a lot — go interior and save the building.',
          'Risk nothing — defensive from the start; nothing here is worth a life.',
          'Risk a lot — the building is the priority, regardless of occupants.'
        ]
      },
      {
        label: 'Strategy',
        q: 'What strategy do you declare?',
        opts: [
          'Defensive',
          'Offensive',
          'Defensive with a short rescue window if anyone is reported inside',
          'Wait for BC1 before declaring'
        ]
      },
      {
        label: 'Incident action plan',
        q: 'What is your IAP?',
        opts: [
          'Exposure protection and defensive fire attack',
          'Primary search and fire attack',
          'Fire attack only — interior',
          'Exposure protection first, then fire attack'
        ]
      },
      {
        label: 'Tactical priorities',
        q: 'In what order do you work the tactical priorities?',
        opts: [
          'All Clear (primary search) → Fire Control → Loss Stopped',
          'Fire Control → All Clear (primary search) → Loss Stopped',
          'Loss Stopped → Fire Control → All Clear (primary search)',
          'All Clear (primary search) → Loss Stopped → Fire Control'
        ]
      },
      {
        label: 'On-scene report',
        q: 'Give your on-scene report — which version do you send?',
        opts: [
          'E1 on scene, outside fire. E1 has command. Large unfinished wood-frame construction project fully involved, exposures downwind, no reports of anyone inside. Defensive strategy. IAP is exposure protection and defensive fire attack. First 3 companies to IAP tasks, 1 held as tactical reserve. Requesting additional resources.',
          'E1 on scene, outside fire. Large unfinished wood-frame construction project fully involved, exposures downwind, no reports of anyone inside. Defensive strategy. IAP is exposure protection and defensive fire attack. First 3 companies to IAP tasks, 1 held as tactical reserve.',
          'E1 on scene, outside fire. E1 has command. Large unfinished wood-frame construction project fully involved, exposures downwind, no reports of anyone inside. IAP is exposure protection and defensive fire attack. First 3 companies to IAP tasks, 1 held as tactical reserve.',
          'E1 on scene, outside fire. E1 has command. Large unfinished wood-frame construction project fully involved. Defensive strategy. IAP is exposure protection and defensive fire attack.'
        ]
      },
      {
        label: 'Initial 3 & 1',
        q: 'How do you run the initial 3 & 1?',
        opts: [
          'First 3 companies to IAP tasks, 1 held as tactical reserve; call for more resources before assigning the reserve.',
          'All 4 companies to IAP tasks; the reserve comes from the next alarm.',
          'First 2 companies to IAP tasks, 2 held as reserve.',
          'Assign the reserve first to the hardest task, then call for more resources.'
        ]
      },
      {
        label: 'Objectives order',
        cat: 'sizeup',
        q: 'M.P. 202.18 lists the tactical objectives in order. What is the order?',
        opts: [
          '1. Firefighter Safety, 2. Exposure Protection, 3. Environmental Protection, 4. Fire Control.',
          '1. Fire Control, 2. Exposure Protection, 3. Firefighter Safety, 4. Environmental Protection.',
          '1. Exposure Protection, 2. Fire Control, 3. Firefighter Safety, 4. Environmental Protection.',
          'All four at once, no order.'
        ]
      },
      {
        label: 'Over-commit',
        cat: 'sizeup',
        q: 'What is the first mistake to avoid?',
        opts: [
          'Over-committing before the critical factors are evaluated — initial information will change and conditions evolve fast.',
          'Waiting too long to attack.',
          'Calling for too many resources.',
          'Staging too far away.'
        ]
      },
      {
        label: 'Water supply',
        cat: 'sizeup',
        q: 'How do you feed big water here?',
        opts: [
          'Pumped water, reversing off the forward pumper, relay operations, drafting — water supply is critical and it takes time to build.',
          'Tank water is enough.',
          'One hydrant, one line.',
          'The engine tank will carry it.'
        ]
      },
      {
        label: 'Collapse zone',
        cat: 'sizeup',
        q: 'Where do you put the master streams?',
        opts: [
          'Outside the collapse zone — defensive operations from the most advantageous positions, everyone clear of the structure.',
          'As close as possible.',
          'Inside the building footprint.',
          'On the roof.'
        ]
      },
      {
        label: 'What’s happening inside?',
        cat: 'sizeup',
        q: 'What’s happening inside? Your first read:',
        opts: [
          'No one inside reported — structure fully involved, trusses failing',
          'Fire contained to one section',
          'Fire already out',
          'Unknown — no interior report yet'
        ]
      },
      {
        label: 'Victim status',
        cat: 'sizeup',
        q: 'Are people hurt? What do you know right now?',
        opts: [
          'No reports of anyone inside',
          'Occupants seen leaving, no injuries reported',
          'Workers possibly still on site',
          'Injuries reported — medical needed'
        ]
      },
      {
        label: 'Attack flow',
        q: 'How do you attack it?',
        opts: [
          'Defensive — master streams from outside the collapse zone',
          'Interior attack — go in and hit it',
          'Hit it from outside only with handlines'
        ]
      },
      {
        label: 'Go interior',
        showIf: { label: 'Attack flow', match: 'Interior attack' },
        q: 'You go interior — then what?',
        opts: [
          'Reconsider — an unfinished wood-frame building fully involved is a collapse risk with nothing to save inside',
          'Attack the fire room directly',
          'Search the structure first',
          'Open up — check for extension'
        ]
      },
      {
        label: 'Let it burn',
        q: 'What are the fire control options?',
        opts: [
          'Big-water suppression, removing fuel with heavy equipment, or letting the fire burn itself out — weighed against exposure protection and environmental impact.',
          'Interior attack only.',
          'Master streams only.',
          'Let it burn — never use water outside.'
        ]
      },
      {
        label: 'Flow',
        q: 'Defensive operations: what is the master stream guideline?',
        opts: [
          'At least 750 GPM per master stream.',
          '150 GPM — 1¾-inch line.',
          '250 GPM — 2-inch line.',
          '300 GPM — 2½-inch line.'
        ]
      },
      {
        label: 'Crew of 4',
        kind: 'crew',
        q: 'Deploy your 4-person engine crew — who does what?',
        opts: [
          { t: 'Officer establishes command, 2 firefighters to exposure protection, 1 firefighter to water supply.', c: ['Loss Stopped'] },
          { t: 'All 4 to fire attack — put the fire out first.', c: ['Fire Control'] },
          { t: 'Officer + 1 firefighter to primary search, 2 firefighters to the attack line.', c: ['All Clear', 'Fire Control'] },
          { t: '2 firefighters to the master stream, 2 to exposure protection.', c: ['Fire Control', 'Loss Stopped'] }
        ]
      },
      {
        label: 'Assign E2',
        unit: 'E2',
        q: 'Where do you send E2, and what task?',
        opts: [
          { t: '2nd geographical sector — exposures downwind.', c: ['Loss Stopped'] },
          { t: 'Master stream on the main body of fire.', c: ['Fire Control'] },
          { t: 'Water supply — relay or drafting.', c: [] },
          { t: 'Hold as tactical reserve.', c: [] }
        ]
      },
      {
        label: '2nd engine placement',
        unit: 'E2',
        cat: 'unit',
        q: 'Where does the 2nd engine go?',
        opts: [
          'Downwind — exposure side',
          'Upwind — staging',
          'Hydrant — water supply position',
          'Staging until assigned'
        ]
      },
      {
        label: 'Assign L1',
        unit: 'L1',
        q: 'Where do you send L1, and what task?',
        opts: [
          { t: 'Aerial master stream from outside the collapse zone.', c: ['Fire Control'] },
          { t: 'Primary search.', c: ['All Clear'] },
          { t: 'Ventilation.', c: ['Fire Control'] },
          { t: 'Hold as tactical reserve.', c: [] }
        ]
      },
      {
        label: 'Ladder placement',
        unit: 'L1',
        cat: 'unit',
        q: 'Where does the ladder go?',
        opts: [
          'Upwind — master stream position',
          'Downwind — exposure side',
          'Roof position',
          'Staging until assigned'
        ]
      },
      {
        label: 'Assign E3',
        unit: 'E3',
        q: 'Where do you send E3, and what task?',
        opts: [
          { t: 'Exposure protection.', c: ['Loss Stopped'] },
          { t: 'Water supply — relay operations.', c: [] },
          { t: '2nd line to the main body.', c: ['Fire Control'] },
          { t: 'Hold as tactical reserve.', c: [] }
        ]
      },
      {
        label: 'Assign R3',
        unit: 'R3',
        q: 'Where do you send R3, and what task?',
        opts: [
          { t: 'Safety / accountability sector.', c: [] },
          { t: 'RIT / rescue standby.', c: [] },
          { t: 'Medical / rehab sector.', c: [] },
          { t: 'Hold as tactical reserve.', c: [] }
        ]
      },
      {
        label: 'Assign BC1',
        unit: 'BC1',
        q: 'Where do you send BC1, and what task?',
        opts: [
          { t: 'Assume command — sectorize early, 2&1 to the most critical sector.', c: [] },
          { t: 'Safety / accountability sector.', c: [] },
          { t: 'Division supervisor, exposure side.', c: [] },
          { t: 'Staging and additional resources.', c: [] }
        ]
      },
      {
        label: 'Stretch check (hose)',
        q: 'What line do you bring, and how do you decide?',
        opts: [
          'Master streams — 750 GPM or better, fed by relay or drafting, positioned outside the collapse zone.',
          '2-inch handline — 250 GPM.',
          '1¾-inch — 150 GPM.',
          'Biggest line on the rig — length does not matter as long as it is big.'
        ]
      },
      {
        label: 'What’s happening inside? (update)',
        cat: 'sizeup',
        q: 'What’s happening inside? Update your read:',
        opts: [
          'Structure collapsing — trusses failing, stay clear',
          'Fire contained to one section',
          'Smoke clearing, no extension seen',
          'Still unknown from outside'
        ]
      },
      {
        label: 'Victim status (update)',
        cat: 'sizeup',
        q: 'Are people hurt? Update:',
        opts: [
          'Still no reports of anyone inside',
          'Workers accounted for, no injuries',
          'Victims found — rescue underway',
          'Injuries confirmed — medical requested'
        ]
      },
      {
        label: 'MP reference',
        q: 'M.P. 202.18 High Piled Outside Combustible Storage — the lines that matter here: never over-commit before the critical factors are evaluated. Never assume it is a safe outside fire — treat it with the same decision model as a structure fire. Never risk lives for property that is already lost. In most cases the correct call is defensive, and everyone must know the strategy. Objectives in order: firefighter safety, exposure protection, environmental protection, fire control.',
        opts: [
          'Understood — show my debrief'
        ]
      },
      {
        label: 'Reposition',
        q: 'Conditions have changed. Where do you go now? Tap a marker on the picture — green arrows move you, blue boxes aim water.',
        hotspots: true
      }
    ]
  }
];
