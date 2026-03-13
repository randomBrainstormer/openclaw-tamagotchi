# OpenClaw Tamagotchi — Integration Plan

## What is built now
The current prototype includes:
- deterministic pet state
- decay tick logic
- action handlers (`feed`, `wash`, `walk`)
- Telegram message rendering
- inline button payloads (`pet:feed`, `pet:wash`, `pet:walk`)
- local CLI/demo for testing the mechanics
- Telegram-ready JSON payload emission
- local callback simulation through CLI commands

## Why this comes first
This avoids overbuilding an agent when the real MVP is a stateful interaction loop.
The current prototype proves the mechanics and interface shape before full OpenClaw wiring.

## Current interface contract
The project already exposes a usable interface for wrappers, scripts, or agents.

### Commands
- `npm run telegram-status`
- `npm run telegram-callback -- pet:feed`
- `npm run telegram-callback -- pet:wash`
- `npm run telegram-callback -- pet:walk`
- `npm run telegram-tick`

### Expected behavior
- `telegram-status` returns message + buttons JSON
- `telegram-callback` applies an action and returns refreshed message + buttons JSON
- `telegram-tick` returns `NO_MESSAGE` unless a threshold is crossed

This is the current “agent-consumable” boundary.

## Next OpenClaw integration step
Wire the deterministic engine into real Telegram delivery.

### Minimal runtime shape
1. Persistent state file lives locally in the project
2. A scheduled process runs `telegram-tick` on cadence
3. If a threshold is crossed, send a Telegram message with buttons
4. Real button callbacks arrive as `callback_data: pet:<action>`
5. A small handler maps that callback into the correct local action
6. The updated Telegram payload is sent back to the user

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
Build the wrapper that:
- calls `telegram-status` for initial send
- calls `telegram-callback` for action handling
- calls `telegram-tick` on a schedule
- translates returned JSON into actual Telegram sends/updates

## What is still missing for “clone and deploy”
To make this fully turnkey for another agent/operator, the project would still need:
- one documented OpenClaw wiring path
- callback routing instructions
- scheduled tick setup instructions
- maybe a helper script for initial setup

That is not strictly necessary for the current demo, but it is the path if the project becomes more reusable.
