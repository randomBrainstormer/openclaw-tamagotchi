# OpenClaw Tamagotchi — Integration Plan

## What is built now
The current prototype includes:
- deterministic pet state
- decay tick logic
- action handlers (`feed`, `wash`, `walk`)
- Telegram message rendering
- inline button payloads (`pet:feed`, `pet:wash`, `pet:walk`)
- local CLI/demo for testing the mechanics

## Why this comes first
This avoids overbuilding an agent when the real MVP is a stateful interaction loop.

## Next OpenClaw integration step
Wire the deterministic engine into Telegram delivery.

### Minimal runtime shape
1. Persistent state file lives locally in the project
2. A scheduled process runs `tick` on cadence
3. If a threshold is crossed, send a Telegram message with buttons
4. Button callbacks are received as text in OpenClaw (`callback_data: pet:<action>`)
5. A small handler maps that callback into the correct local action and sends an updated status message

## Important Telegram note
OpenClaw Telegram inline buttons do not require the pet to be a fully autonomous agent.
Buttons can be attached to a normal Telegram send, and callback clicks arrive as text.

## Practical integration approaches
### A. Lightweight wrapper session
Create a small session/runtime that interprets callback texts like:
- `callback_data: pet:feed`
- `callback_data: pet:wash`
- `callback_data: pet:walk`

This wrapper updates local state and replies with a rendered pet status.

### B. Script + cron + message tool
Use local scripts for state changes and a scheduled job for decay, then use OpenClaw messaging for delivery.

This is likely the safest first integration path.

## Recommended next implementation task
Build the script wrapper that:
- accepts `status|tick|action <x>`
- prints rendered Telegram-safe output
- returns button payload structure

That will make OpenClaw wiring straightforward.
