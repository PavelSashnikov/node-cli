import { DataStorage } from '../storage/dataStorage.mjs';
import { createReadStream, stat } from 'fs';
import { join } from 'path';
import { ERROR_MESSAGE, INVALID_MESSAGE } from '../storage/constants.mjs';

class FileActions {
  constructor() {
    this.data = DataStorage.getInstance(process.argv);
  }
  data;

  static getInstance() {
    if (!this.instance) {
      this.instance = new FileActions();
    }
    return this.instance;
  }

  cat() {
    if (this.data.lineArguments.length !== 1) {
      console.log(INVALID_MESSAGE);
    }
    const file = this.data.lineArguments[0];
    const path = join(this.data.currentPath, file);
    stat(path, (err, status) => {
      if (err || !status.isFile()) {
        console.log(INVALID_MESSAGE);
      } else {
        const stream = createReadStream(path, 'utf-8');
        stream.on('data', (data) => {
          console.log(data);
        });
        stream.on('close', () => this.data.showLocation());
        stream.on('error', () => {
          console.log(ERROR_MESSAGE);
        });
      }
    });
  }
}

const fileActions = FileActions.getInstance();

export default fileActions;
