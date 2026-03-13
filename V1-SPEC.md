# OpenClaw Tamagotchi — V1 Spec

## Goal
Ship a small Telegram-native digital pet that demonstrates:
- persistent state
- scheduled decay
- interactive user actions
- charming personality

## User story
The user has a little digital creature living in Telegram.
It gets hungry, dirty, bored, or needy over time.
The user can care for it through actions like Feed, Wash, and Walk.
If neglected, it complains or declines.

## Core state
Suggested V1 fields:
- `name`
- `species` or `creature_type`
- `alive` (boolean)
- `hunger` (0-100)
- `hygiene` (0-100)
- `happiness` (0-100)
- `energy` (0-100) — optional if still simple enough
- `last_interaction_at`
- `last_decay_at`
- `mood`
- `stage` (baby / normal / grumpy potato / etc. — optional)

## Core actions
### Feed
Effect:
- hunger improves significantly
- small happiness increase
- maybe tiny hygiene penalty

### Wash
Effect:
- hygiene improves significantly
- maybe slight happiness increase or decrease depending on personality

### Walk
Effect:
- happiness improves
- hygiene may drop slightly
- hunger may worsen slightly

### Optional: Play
Effect:
- happiness improves a lot
- energy drops
- hunger increases

## Decay loop
Run on a schedule.
Suggested cadence for early testing:
- every 4–6 hours

Each tick:
- hunger decreases
- hygiene decreases more slowly
- happiness decreases if hunger/hygiene are low
- if multiple stats stay too low for too long, pet becomes miserable / collapses / dies

## Threshold behavior
Examples:
- low hunger → hungry complaints
- very low hygiene → gross / embarrassed complaints
- low happiness → sulky / needy tone
- all very low → collapse / death / runaway event

## Messaging behavior
Use short, distinctive lines.

Examples of message categories:
- needy prompt
- grateful reaction
- annoyed reaction
- neglect complaint
- collapse/death event

The pet should feel like a creature, not a support chatbot.

## Interaction model
Preferred:
- Telegram message includes inline action buttons
- actions immediately update state and reply with a reaction

Possible button set:
- Feed 🍖
- Wash 🛁
- Walk 🚶
- Play 🎾 (optional)

## State model vs personality model
### Deterministic layer
Owns:
- state values
- decay
- action effects
- death/collapse conditions

### Personality layer
Owns:
- wording
- emotional flavor
- repetition variation
- creature voice

## Tone
Target tone:
- cute
- slightly needy
- mildly chaotic
- not therapy-coded
- not too polished

Think “weird little digital creature,” not “wellness assistant.”

## Success criteria
V1 is good if:
- the pet feels alive enough to care about
- interactions are fun within Telegram
- decay/needs feel real without becoming oppressive
- OpenClaw capabilities are clearly demonstrated
- the project is worth demoing or writing about

## Failure modes
- pet feels like a normal chatbot with fake stats
- actions don’t materially matter
- decay is too fast and annoying
- no charm / no memorable personality
- implementation becomes too agentic and unpredictable too early
