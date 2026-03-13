import { PetAction, PetState } from './types.js';

export function renderTelegramMessage(state: PetState): string {
  const heart = state.alive ? '🟢' : '💀';
  return [
    `${heart} <b>${state.name}</b> the ${state.creatureType}`,
    `Mood: <b>${state.mood}</b>`,
    `Hunger: ${bar(state.hunger)}`,
    `Hygiene: ${bar(state.hygiene)}`,
    `Happiness: ${bar(state.happiness)}`,
    `Energy: ${bar(state.energy)}`,
  ].join('\n');
}

function bar(value: number): string {
  const filled = Math.round(value / 20);
  return '█'.repeat(filled) + '░'.repeat(5 - filled) + ` ${value}`;
}

export function actionButtons(): { text: string; callback_data: string }[][] {
  const actions: { action: PetAction; emoji: string; label: string }[] = [
    { action: 'feed', emoji: '🍖', label: 'Feed' },
    { action: 'wash', emoji: '🛁', label: 'Wash' },
    { action: 'walk', emoji: '🚶', label: 'Walk' },
  ];
  return [actions.map((item) => ({ text: `${item.emoji} ${item.label}`, callback_data: `pet:${item.action}` }))];
}
