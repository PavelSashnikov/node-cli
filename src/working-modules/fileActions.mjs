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
import { checkArgs, normalizePath, streamCb } from '../helpers/helper.mjs';
import { pipeline } from 'stream';

class FileActions {
  constructor() {
    this.data = DataStorage.getInstance(process.argv);
    this.isArgs = checkArgs.bind(this);
    this.streamCb = streamCb.bind(this);
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
    const path = normalizePath(this.data.currentPath, file);
    stat(path, (err, status) => {
      if (err || !status.isFile()) {
        this.streamCb(true);
      } else {
        const stream = createReadStream(path, 'utf-8');
        stream.on('data', (data) => {
          console.log(data);
        });
        stream.on('close', () => this.streamCb(false));
        stream.on('error', () => {
          this.streamCb(true);
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

    writeFile(path, '', { flag: 'wx' }, this.streamCb);
  }

  rn() {
    if (!this.isArgs(2)) {
      return;
    }

    const oldFilePath = normalizePath(
      this.data.currentPath,
      this.data.lineArguments[0]
    );
    const pathArr = oldFilePath.split(this.data.pathSeparator);
    pathArr[pathArr.length - 1] = this.data.lineArguments[1];
    const newFilePath = pathArr.join(this.data.pathSeparator);

    rename(oldFilePath, newFilePath, this.streamCb);
  }

  cp() {
    if (!this.isArgs(2)) {
      return;
    }

    const filePath = normalizePath(
      this.data.currentPath,
      this.data.lineArguments[0]
    );
    const newFilePath = normalizePath(
      this.data.currentPath,
      this.data.lineArguments[1]
    );
    const fileName = filePath.split(this.data.pathSeparator).at(-1);

    const read = createReadStream(filePath);
    const write = createWriteStream(join(newFilePath, fileName));
    pipeline(read, write, this.streamCb);
  }

  mv() {
    if (!this.isArgs(2)) {
      return;
    }

    const filePath = normalizePath(
      this.data.currentPath,
      this.data.lineArguments[0]
    );
    const newFilePath = normalizePath(
      this.data.currentPath,
      this.data.lineArguments[1]
    );
    const fileName = filePath.split(this.data.pathSeparator).at(-1);

    const read = createReadStream(filePath);
    const write = createWriteStream(join(newFilePath, fileName));
    pipeline(read, write, (err) => {
      if (err) {
        this.streamCb(err);
        return;
      }
      unlink(filePath, this.streamCb);
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

    unlink(filePath, this.streamCb);
  }
}

const fileActions = FileActions.getInstance();

export default fileActions;
