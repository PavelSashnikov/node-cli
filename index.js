import { DataStorage } from './src/dataStorage.js';
import { Handler } from './src/handler.js';
import * as readline from 'node:readline/promises';
import { sayBye, sayHi } from './src/messages.js';
import { COM_EXIT, INVALID_MESSAGE } from './src/constants.mjs';

const handler = new Handler();
const data = new DataStorage(process.argv);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', function (command) {
  const comm = command;
  if (command === COM_EXIT) {
    rl.close();
    return;
  }

  if (comm in handler) {
    handler[comm];
    return;
  }
  console.log(INVALID_MESSAGE);
});

rl.on('close', (command) => {
  sayBye(data.user);
});

sayHi(data.user);
