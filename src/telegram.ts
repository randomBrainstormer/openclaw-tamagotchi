import { applyAction, statusMessage, tickPet } from './engine.js';
import { ensureState, saveState } from './state.js';
import { actionButtons, renderTelegramMessage } from './render.js';
import { PetAction } from './types.js';

export interface TelegramPayload {
  message: string;
  buttons: { text: string; callback_data: string }[][];
}

export function buildStatusPayload(extraLine?: string): TelegramPayload {
  const state = ensureState();
  const body = renderTelegramMessage(state);
  return {
    message: extraLine ? `${extraLine}\n\n${body}` : body,
    buttons: actionButtons(),
  };
}

export function handleCallback(callbackData: string): TelegramPayload {
  const state = ensureState();
  const prefix = 'pet:';
  if (!callbackData.startsWith(prefix)) {
    return buildStatusPayload(`Unknown callback: ${callbackData}`);
  }

  const action = callbackData.slice(prefix.length) as PetAction;
  if (!['feed', 'wash', 'walk'].includes(action)) {
    return buildStatusPayload(`Unsupported action: ${callbackData}`);
  }

  const result = applyAction(state, action);
  saveState(result.after);
  return buildStatusPayload(result.message);
}

export function runTickAndMaybeBuildPayload(): TelegramPayload | null {
  const state = ensureState();
  const result = tickPet(state);
  saveState(result.after);
  if (!result.crossedThreshold || !result.message) return null;
  return buildStatusPayload(result.message);
}

export function renderForCli(payload: TelegramPayload): string {
  return JSON.stringify(payload, null, 2);
}

export function previewStatusMessage(): string {
  const state = ensureState();
  return statusMessage(state);
}
