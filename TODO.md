# OpenClaw Tamagotchi — TODO

## Current priority
- [x] Define concept and V1 scope
- [x] Build deterministic pet engine
- [x] Add persistent local state
- [x] Add Feed / Wash / Walk actions
- [x] Add neglect / decay loop
- [x] Render Telegram-friendly status output
- [x] Generate inline button payloads
- [x] Add local CLI/demo scripts
- [x] Add Telegram-ready JSON payload helpers
- [x] Add local callback simulation
- [x] Tighten project docs for sharing
- [x] Capture a clean demo screenshot / transcript

## Next build step
- [ ] Wire real Telegram/OpenClaw interaction end-to-end
  - [x] Emit Telegram-ready JSON payloads from the local engine
  - [x] Handle callback payloads (`pet:feed`, `pet:wash`, `pet:walk`) locally
  - [ ] Send pet status message with inline buttons through OpenClaw
  - [ ] Route real callback clicks back into the local handler
  - [ ] Send refreshed pet response in-character

## After that
- [ ] Add scheduled decay nudges through OpenClaw
- [ ] Tune decay speed for better “pet pressure”
- [ ] Decide collapse vs death vs runaway behavior
- [ ] Decide whether to add Play action
- [ ] Publish/share more broadly

## Reusability / agent-consumable path
- [ ] Document one clean “clone and run” setup flow
- [ ] Document one clean OpenClaw integration path
- [ ] Decide whether to add helper setup scripts
- [ ] Decide whether to position it as a reusable demo or just a one-off experiment

## Explicitly not now
- [ ] Full autonomous agent behavior
- [ ] Multiple pets
- [ ] Economy/inventory
- [ ] Complex world simulation
