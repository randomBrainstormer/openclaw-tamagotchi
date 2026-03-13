import { createInitialState } from './state.js';
import { renderTelegramMessage } from './render.js';
import { statusMessage, tickPet } from './engine.js';

const pet = createInitialState();

console.log('Start:\n');
console.log(renderTelegramMessage(pet));

let current = pet;
for (let i = 1; i <= 3; i += 1) {
  const result = tickPet(current, new Date(Date.now() + i * 6 * 60 * 60 * 1000).toISOString());
  current = result.after;
  console.log(`\nAfter neglect step ${i}:`);
  console.log(statusMessage(current));
  console.log(renderTelegramMessage(current));
}
