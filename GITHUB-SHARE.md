# OpenClaw Tamagotchi — Share Notes

## Short version
I built a small Telegram-native Tamagotchi prototype on top of OpenClaw.

It is not a full autonomous agent.
It is a stateful little digital creature with:
- persistent stats
- neglect / decay
- care actions
- personality-flavored reactions

## Why this is interesting
The fun part was not “AI intelligence.”
The fun part was realizing that a Tamagotchi works better as:
- a deterministic state machine
- plus Telegram actions
- plus scheduled annoyance
- plus a bit of creature personality

That made it a much better OpenClaw demo.

## What works right now
- local persistent state
- actions: Feed / Wash / Walk
- mood + neglect behavior
- Telegram-ready text rendering
- button payloads like `pet:feed`
- early Telegram screenshot/demo flow

## Good one-liner
> A weird little Telegram gremlin built on OpenClaw.

## Better explanation
> I wanted to see if OpenClaw could power a Tamagotchi-style digital pet.
> The interesting part turned out not to be an “AI brain,” but state, decay, buttons, and personality.

## Current limitation
Still local-first.
The next step is wiring it to real Telegram callbacks and scheduled nudges.
