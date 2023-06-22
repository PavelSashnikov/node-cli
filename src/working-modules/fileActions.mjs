import { DataStorage } from '../storage/dataStorage.mjs';
import {
  createReadStream,
  createWriteStream,
  rename,
  stat,
  unlink,
  writeFile,
} from 'fs';
import { join } from 'path';
import { ERROR_MESSAGE, INVALID_MESSAGE } from '../storage/constants.mjs';
import { checkArgs, normalizePath } from '../helpers/helper.mjs';

class FileActions {
  constructor() {
    this.data = DataStorage.getInstance(process.argv);
    this.isArgs = checkArgs.bind(this);
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new FileActions();
    }
    return this.instance;
  }

  cat() {
    if (!this.isArgs(1)) {
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
    if (!this.isArgs(1)) {
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
    if (!this.isArgs(2)) {
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
    if (!this.isArgs(2)) {
      return;
    }

    const filename = this.data.lineArguments[0];
    let newFilePath = normalizePath(
      this.data.currentPath,
      this.data.lineArguments[1]
    );

    const read = createReadStream(join(this.data.currentPath, filename));
    const write = createWriteStream(join(newFilePath, filename));
    const stream = read.pipe(write);
    read.on('error', () => {
      console.log(ERROR_MESSAGE);
      this.data.showLocation();
    });
    stream.on('close', () => {
      this.data.showLocation();
    });
    stream.on('error', () => {
      console.log(ERROR_MESSAGE);
    });
  }

  mv() {
    if (!this.isArgs(2)) {
      return;
    }

    const filename = this.data.lineArguments[0];
    let newFilePath = normalizePath(
      this.data.currentPath,
      this.data.lineArguments[1]
    );

    const read = createReadStream(join(this.data.currentPath, filename));
    const write = createWriteStream(join(newFilePath, filename));
    const stream = read.pipe(write);
    read.on('error', () => {
      console.log(INVALID_MESSAGE, 'read');
    });
    stream.on('error', () => {
      console.log(INVALID_MESSAGE, 'err');
    });
    stream.on('finish', () => {
      unlink(join(this.data.currentPath, filename), (err) => {
        if (err) {
          console.log(ERROR_MESSAGE);
        }
        this.data.showLocation();
      });
    });
  }

  rm() {
    if (!this.isArgs(1)) {
      return;
    }

    let filePath = normalizePath(
      this.data.currentPath,
      this.data.lineArguments[0]
    );

    unlink(filePath, (err) => {
      if (err) {
        console.log(INVALID_MESSAGE);
      }
      this.data.showLocation();
    });
  }
}

const fileActions = FileActions.getInstance();

export default fileActions;
