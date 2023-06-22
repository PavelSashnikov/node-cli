import { createReadStream, createWriteStream } from 'fs';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { checkArgs, normalizePath } from '../helpers/helper.mjs';
import { ERROR_MESSAGE } from '../storage/constants.mjs';
import { DataStorage } from '../storage/dataStorage.mjs';
import { pipeline } from 'stream';
import { basename } from 'path';

class Compress {
  constructor() {
    this.data = DataStorage.getInstance(process.argv);
    this.isArgs = checkArgs.bind(this);
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new Compress();
    }
    return this.instance;
  }

  compress() {
    const bortli = createBrotliCompress();
    this._bortli(bortli, true);
  }

  decompress() {
    const bortli = createBrotliDecompress();
    this._bortli(bortli, false);
  }

  _bortli(bortliStream, isCompress) {
    if (!this.isArgs(2)) {
      return;
    }

    const archExt = '.br';

    const sourceFilePath = normalizePath(
      this.data.currentPath,
      this.data.lineArguments[0]
    );
    const fileName = basename(sourceFilePath) + archExt;
    const destFilePath = normalizePath(
      this.data.currentPath,
      `${this.data.lineArguments[1]}/${
        isCompress ? fileName : fileName.replaceAll(archExt, '')
      }`
    );

    const read = createReadStream(sourceFilePath);
    const write = createWriteStream(destFilePath);

    pipeline(read, bortliStream, write, (err) => {
      if (err) {
        console.log(ERROR_MESSAGE);
        return;
      }
      this.data.showLocation();
    });
  }
}

const compress = Compress.getInstance();

export default compress;
