import { DataStorage } from '../storage/dataStorage.mjs';
import {
  createReadStream,
  createWriteStream,
  rename,
  stat,
  writeFile,
} from 'fs';
import { isAbsolute, join, normalize } from 'path';
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
      this.data.showLocation();
      return;
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
          this.data.showLocation();
        });
      }
    });
  }

  add() {
    if (this.data.lineArguments.length !== 1) {
      console.log(INVALID_MESSAGE);
      this.data.showLocation();
      return;
    }

    const file = this.data.lineArguments[0];
    const path = join(this.data.currentPath, file);

    writeFile(path, '', { flag: 'wx' }, (err) => {
      if (err) {
        console.log(INVALID_MESSAGE);
      }
      this.data.showLocation();
    });
  }

  rn() {
    if (this.data.lineArguments.length !== 2) {
      console.log(INVALID_MESSAGE);
      this.data.showLocation();
      return;
    }

    const oldFileName = this.data.lineArguments[0];
    const newFileName = this.data.lineArguments[1];
    rename(
      join(this.data.currentPath, oldFileName),
      join(this.data.currentPath, newFileName),
      (err) => {
        if (err) {
          console.log(INVALID_MESSAGE);
        }
        this.data.showLocation();
      }
    );
  }

  cp() {
    if (this.data.lineArguments.length !== 2) {
      console.log(INVALID_MESSAGE);
      this.data.showLocation();
      return;
    }

    const filename = this.data.lineArguments[0];
    const normalizedPath = normalize(this.data.lineArguments[1]);
    let newFilePath = '';

    if (isAbsolute(normalizedPath)) {
      newFilePath = normalizedPath;
    } else {
      newFilePath = join(this.data.currentPath, normalizedPath);
    }

    const read = createReadStream(join(this.data.currentPath, filename));
    const write = createWriteStream(join(newFilePath, filename));
    const stream = read.pipe(write);
    stream.on('close', () => {
      this.data.showLocation();
    });
    stream.on('error', () => {
      console.log(INVALID_MESSAGE);
    });
  }
}

const fileActions = FileActions.getInstance();

export default fileActions;
