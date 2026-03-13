import fs from 'node:fs';
import path from 'node:path';
import { PetState } from './types.js';

const stateDir = path.resolve(process.cwd(), 'state');
const statePath = path.join(stateDir, 'pet.json');

function nowIso() {
  return new Date().toISOString();
}

export function createInitialState(): PetState {
  const now = nowIso();
  return {
    name: 'Clawchi',
    creatureType: 'digital gremlin',
    alive: true,
    hunger: 78,
    hygiene: 74,
    happiness: 72,
    energy: 70,
    mood: 'content',
    lastInteractionAt: now,
    lastDecayAt: now,
    neglectStrikes: 0,
  };
}

export function ensureState(): PetState {
  if (!fs.existsSync(stateDir)) fs.mkdirSync(stateDir, { recursive: true });
  if (!fs.existsSync(statePath)) {
    const initial = createInitialState();
    saveState(initial);
    return initial;
  }
  return loadState();
}

export function loadState(): PetState {
  return JSON.parse(fs.readFileSync(statePath, 'utf8')) as PetState;
}

export function saveState(state: PetState): void {
  if (!fs.existsSync(stateDir)) fs.mkdirSync(stateDir, { recursive: true });
  fs.writeFileSync(statePath, JSON.stringify(state, null, 2) + '\n', 'utf8');
}

export function resetState(): PetState {
  const initial = createInitialState();
  saveState(initial);
  return initial;
}

export function getStatePath(): string {
  return statePath;
}
