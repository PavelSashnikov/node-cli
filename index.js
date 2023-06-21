import { DataStorage } from './src/storage/dataStorage.mjs';
import handler from './src/handler.mjs';
import * as readline from 'node:readline/promises';
import { sayBye, sayHi } from './src/helpers/messages.mjs';
import {
  COM_EXIT,
  ERROR_MESSAGE,
  INVALID_MESSAGE,
} from './src/storage/constants.mjs';


const data = DataStorage.getInstance(process.argv);
sayHi(data.user, data.currentPath);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', function (command) {
  const commandArr = command.trim().split(' ');
  const [mainCommand, ...args] = commandArr;
  if (mainCommand === COM_EXIT) {
    rl.close();
    return;
  }

  if (mainCommand in handler) {
    try {
      data.lineArguments = args;
      handler[mainCommand];
    } catch (error) {
      // console.log(ERROR_MESSAGE);
      console.log(error)
    }
    return;
  }
  console.log(INVALID_MESSAGE);
});

rl.on('close', (command) => {
  sayBye(data.user);
});
