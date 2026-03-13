export type PetAction = 'feed' | 'wash' | 'walk';

export type PetMood =
  | 'happy'
  | 'content'
  | 'hungry'
  | 'dirty'
  | 'lonely'
  | 'miserable'
  | 'collapsed';

export interface PetState {
  name: string;
  creatureType: string;
  alive: boolean;
  hunger: number;
  hygiene: number;
  happiness: number;
  energy: number;
  mood: PetMood;
  lastInteractionAt: string;
  lastDecayAt: string;
  lastAction?: PetAction;
  neglectStrikes: number;
}

export interface TickResult {
  before: PetState;
  after: PetState;
  changed: boolean;
  crossedThreshold: boolean;
  message?: string;
}

export interface ActionResult {
  before: PetState;
  after: PetState;
  message: string;
}
