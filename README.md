# OpenClaw Tamagotchi

A Telegram-native digital pet prototype built with OpenClaw.

The point is not “make a super-intelligent AI pet.”
The point is to make a weird little creature that:
- has persistent state
- gets worse when ignored
- reacts to simple care actions
- feels alive enough to be funny

This is both:
- a nostalgic toy experiment
- a compact OpenClaw capability demo

---

## Why this exists
The original idea was “what if one of my AI agents became a Tamagotchi?”

That sounded fun, but a fully autonomous agent quickly felt like overkill.
The more interesting design turned out to be:
- deterministic pet mechanics
- Telegram actions/buttons
- scheduled decay
- a thin personality layer on top

That keeps the toy understandable and makes the OpenClaw side actually demoable.

---

## Current status
**Working local prototype.**

Implemented now:
- persistent local pet state
- hunger / hygiene / happiness / energy
- actions: **Feed**, **Wash**, **Walk**
- neglect / decay over time
- mood changes
- Telegram-friendly message rendering
- inline button payload generation (`pet:feed`, `pet:wash`, `pet:walk`)

Not wired yet:
- real Telegram callback handling
- scheduled nudges from OpenClaw
- production chat flow

---

## Architecture
### Deterministic layer
Owns:
- state values
- decay
- action effects
- collapse / death logic

### Personality layer
Owns:
- wording
- reactions
- complaint tone
- creature flavor

This project intentionally does **not** start as a fully autonomous freeform agent.
That would make the mechanics worse, not better.

---

## Quick start
```bash
cd /root/atlas/experiments/projects/openclaw-tamagotchi
npm install
npm run reset
npm run status
npm run demo-neglect
```

Useful commands:

```bash
npm run status        # current pet state + Telegram rendering
npm run tick          # apply one decay tick
npm run feed          # feed the pet
npm run wash          # wash the pet
npm run walk          # walk the pet
npm run demo-neglect  # show the pet getting worse over time
npm run dev           # small local demo flow
npm run build         # TypeScript build check
```

---

## Example interaction model
The target Telegram flow is:
1. pet sends a status / complaint message
2. message includes inline buttons
3. user clicks an action
4. state updates immediately
5. pet responds in-character

Current button payloads:
- `pet:feed`
- `pet:wash`
- `pet:walk`

---

## Tone
Target tone:
- cute
- slightly needy
- mildly chaotic
- not therapy-coded
- not too polished

Think:
> weird little digital creature

Not:
> wellness chatbot in a pet costume

---

## What makes this interesting
This is less about the pet market and more about showing what OpenClaw can do with:
- persistent state
- scheduled behavior
- messaging
- interactive actions
- characterful output

If the pet becomes annoying enough to feel real, the demo works.

---

## Project files
- `V1-SPEC.md` — current product/behavior spec
- `INTEGRATION-PLAN.md` — next step for OpenClaw wiring
- `GITHUB-SHARE.md` — short shareable description
- `src/` — pet engine, state, rendering, CLI

---

## Next step
Wire the local engine into actual OpenClaw Telegram handling so the pet can:
- send real messages
- receive button clicks
- update state from callbacks
- complain on a schedule

That is when it stops being a terminal toy and becomes a real Telegram gremlin.
