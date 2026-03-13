import { ActionResult, PetAction, PetMood, PetState, TickResult } from './types.js';

function clamp(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function hoursBetween(a: string, b: string): number {
  const ms = new Date(b).getTime() - new Date(a).getTime();
  return Math.max(0, ms / (1000 * 60 * 60));
}

export function deriveMood(state: PetState): PetMood {
  if (!state.alive) return 'collapsed';
  const lowest = Math.min(state.hunger, state.hygiene, state.happiness, state.energy);
  if (lowest <= 18) return 'miserable';
  if (state.hunger <= 35) return 'hungry';
  if (state.hygiene <= 35) return 'dirty';
  if (state.happiness <= 35 || state.energy <= 30) return 'lonely';
  if (state.hunger >= 78 && state.hygiene >= 75 && state.happiness >= 78) return 'happy';
  return 'content';
}

export function summarize(state: PetState): string {
  const status = state.alive ? 'alive' : 'collapsed';
  return `${state.name} is ${status} · mood=${state.mood} · hunger=${state.hunger} hygiene=${state.hygiene} happiness=${state.happiness} energy=${state.energy}`;
}

export function tickPet(state: PetState, now = new Date().toISOString()): TickResult {
  const before: PetState = structuredClone(state);
  if (!state.alive) {
    return { before, after: structuredClone(state), changed: false, crossedThreshold: false };
  }

  const hours = hoursBetween(state.lastDecayAt, now);
  const decayFactor = Math.max(1, Math.floor(hours / 4));

  state.hunger = clamp(state.hunger - 14 * decayFactor);
  state.hygiene = clamp(state.hygiene - 10 * decayFactor);
  state.energy = clamp(state.energy - 8 * decayFactor);

  if (state.hunger < 45 || state.hygiene < 45 || state.energy < 35) {
    state.happiness = clamp(state.happiness - 12 * decayFactor);
    state.neglectStrikes += 1;
  }

  if (state.neglectStrikes >= 3) {
    state.happiness = clamp(state.happiness - 8 * decayFactor);
  }

  if (state.hunger <= 5 || state.hygiene <= 5 || state.happiness <= 5 || state.energy <= 5) {
    state.alive = false;
  }

  state.mood = deriveMood(state);
  state.lastDecayAt = now;

  const after = structuredClone(state);
  const crossedThreshold = before.mood !== after.mood || before.alive !== after.alive;
  const message = crossedThreshold ? statusMessage(after) : undefined;

  return {
    before,
    after,
    changed: summarize(before) !== summarize(after),
    crossedThreshold,
    message,
  };
}

export function applyAction(state: PetState, action: PetAction, now = new Date().toISOString()): ActionResult {
  const before: PetState = structuredClone(state);

  if (!state.alive) {
    return {
      before,
      after: structuredClone(state),
      message: `${state.name} is collapsed and ignores your ${action}. Brutal.`,
    };
  }

  if (action === 'feed') {
    state.hunger = clamp(state.hunger + 28);
    state.happiness = clamp(state.happiness + 8);
    state.hygiene = clamp(state.hygiene - 2);
  }

  if (action === 'wash') {
    state.hygiene = clamp(state.hygiene + 32);
    state.happiness = clamp(state.happiness + 4);
  }

  if (action === 'walk') {
    state.happiness = clamp(state.happiness + 18);
    state.energy = clamp(state.energy - 8);
    state.hunger = clamp(state.hunger - 6);
    state.hygiene = clamp(state.hygiene - 4);
  }

  state.lastInteractionAt = now;
  state.lastAction = action;
  state.neglectStrikes = Math.max(0, state.neglectStrikes - 1);
  state.mood = deriveMood(state);

  return {
    before,
    after: structuredClone(state),
    message: actionMessage(state, action),
  };
}

export function statusMessage(state: PetState): string {
  if (!state.alive) return `${state.name} has collapsed from neglect. Tiny digital tragedy.`;
  switch (state.mood) {
    case 'hungry':
      return `${state.name}: i am STARVING. this is a scandal.`;
    case 'dirty':
      return `${state.name}: i smell like a forgotten sock. wash me immediately.`;
    case 'lonely':
      return `${state.name}: hello??? i require enrichment. walk me.`;
    case 'miserable':
      return `${state.name}: everything is terrible and this is definitely your fault.`;
    case 'happy':
      return `${state.name} is thriving. suspiciously wholesome.`;
    default:
      return `${state.name} is plotting minor chaos but remains stable.`;
  }
}

function actionMessage(state: PetState, action: PetAction): string {
  if (action === 'feed') return `${state.name} devours the food and looks less judgmental.`;
  if (action === 'wash') return `${state.name} is now clean enough to rejoin society.`;
  return `${state.name} enjoyed the walk and is temporarily less chaotic.`;
}
