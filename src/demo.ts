import { applyAction, statusMessage, tickPet } from './engine.js';
import { createInitialState } from './state.js';
import { renderTelegramMessage, actionButtons } from './render.js';

const pet = createInitialState();

console.log('Initial Telegram message:\n');
console.log(renderTelegramMessage(pet));
console.log('\nButtons:');
console.log(JSON.stringify(actionButtons(), null, 2));

const ticked = tickPet(pet, new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString());
console.log('\nAfter neglect tick:');
console.log(statusMessage(ticked.after));
console.log(renderTelegramMessage(ticked.after));

const fed = applyAction(ticked.after, 'feed');
console.log('\nAfter feed:');
console.log(fed.message);
console.log(renderTelegramMessage(fed.after));
