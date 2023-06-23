import { createHash } from 'crypto';
import { createReadStream } from 'fs';
import { DataStorage } from '../storage/dataStorage.mjs';
import { checkArgs, streamCb, normalizePath } from '../helpers/helper.mjs';
import { pipeline } from 'stream';

class Hash {
  constructor() {
    this.data = DataStorage.getInstance(process.argv);
    this.isArgs = checkArgs.bind(this);
    this.streamCb = streamCb.bind(this);
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new Os();
    }
    return this.instance;
  }

  hashFile() {
    if (!this.isArgs(1)) {
      return;
    }

    const filePath = normalizePath(
      this.data.currentPath,
      this.data.lineArguments[0]
    );

    const read = createReadStream(filePath);
    const hashSum = createHash('sha256');
    hashSum.setEncoding('hex');

    read.on('end', () => {
      hashSum.end();
      console.log(hashSum.read());
    });

    pipeline(read, hashSum, this.streamCb);
  }
}

const hashModule = new Hash();

export default hashModule;
