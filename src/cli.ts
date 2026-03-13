import { applyAction, statusMessage, summarize, tickPet } from './engine.js';
import { ensureState, resetState, saveState } from './state.js';
import { PetAction } from './types.js';
import { actionButtons, renderTelegramMessage } from './render.js';

const [, , command, arg] = process.argv;
const state = ensureState();

if (command === 'status') {
  console.log(summarize(state));
  console.log('\nTelegram view:\n');
  console.log(renderTelegramMessage(state));
  console.log('\nButtons:');
  console.log(JSON.stringify(actionButtons(), null, 2));
  process.exit(0);
}

if (command === 'tick') {
  const result = tickPet(state);
  saveState(result.after);
  console.log(result.message ?? 'No threshold crossed.');
  console.log(summarize(result.after));
  process.exit(0);
}

if (command === 'action') {
  const action = arg as PetAction;
  if (!['feed', 'wash', 'walk'].includes(action)) {
    console.error('Usage: tsx src/cli.ts action <feed|wash|walk>');
    process.exit(1);
  }
  const result = applyAction(state, action);
  saveState(result.after);
  console.log(result.message);
  console.log(summarize(result.after));
  process.exit(0);
}

if (command === 'reset') {
  const fresh = resetState();
  console.log(`Reset ${fresh.name}.`);
  console.log(statusMessage(fresh));
  process.exit(0);
}

console.log('Commands: status | tick | action <feed|wash|walk> | reset');
process.exit(1);
