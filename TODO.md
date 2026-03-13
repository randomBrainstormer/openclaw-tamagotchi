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
- [x] Tighten project docs for sharing

## Next build step
- [ ] Wire real Telegram/OpenClaw interaction
  - [ ] Send pet status message with inline buttons
  - [ ] Handle callback payloads (`pet:feed`, `pet:wash`, `pet:walk`)
  - [ ] Update pet state after button actions
  - [ ] Send refreshed pet response in-character

## After that
- [ ] Add scheduled decay nudges through OpenClaw
- [ ] Tune decay speed for better “pet pressure”
- [ ] Decide collapse vs death vs runaway behavior
- [ ] Decide whether to add Play action
- [ ] Capture a clean demo screenshot / transcript
- [ ] Publish/share

## Explicitly not now
- [ ] Full autonomous agent behavior
- [ ] Multiple pets
- [ ] Economy/inventory
- [ ] Complex world simulation
