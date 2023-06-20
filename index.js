import { DataStorage } from './src/dataStorage.js';
import { Handler } from './src/handler.js';
import * as readline from 'node:readline/promises';
import { sayBye, sayHi } from './src/messages.js';
import { COM_EXIT } from './src/constants.mjs';

const handler = new Handler();
const data = new DataStorage(process.argv);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (command) => {
  switch (command) {
    case COM_EXIT:
      rl.close();
      break;

    default:
      handler[command];
  }
});

rl.on('close', (command) => {
  sayBye(data.user);
});

sayHi(data.user);
