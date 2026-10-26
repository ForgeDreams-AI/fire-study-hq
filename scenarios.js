/* ============================================================
   SCENARIOS — first-arriving size-up game from the Sets & Reps decks
   NO GRADING: every option is just a pick. Picks are logged as the
   player makes them, and the run ends in a debrief report that mirrors
   the player's own choices back in the On Scene Report deck's framework.
   No scores, no pass/fail, no right/wrong marks anywhere.
   Scenario 1: Ocotillo apartment fire (Sets_Tactical_ Apartment_Ocotillo.pptx)
   Dispatch facts verified against the deck's own slides (slides 1-3, 5).
   Hose: PFD lines are 1\u00be-inch and 2-inch (user, 2026-10-26); an extended
   lay goes to a 1\u00be-inch line. Both sizes are plain options. No rule for
   choosing 2-inch over 1\u00be-inch is stated, and no 150-foot interior rule
   is built in anywhere (user set it aside).
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
        q: 'Conditions have changed. Where do you go now? Tap a marker on the picture \u2014 green arrows move you, blue boxes aim water.',
        hotspots: true
      }
    ]
  }
];
