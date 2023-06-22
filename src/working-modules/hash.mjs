import { createHash } from 'crypto';
import { createReadStream } from 'fs';
import { DataStorage } from '../storage/dataStorage.mjs';
import { checkArgs } from '../helpers/helper.mjs';

class Hash {
  constructor() {
    this.data = DataStorage.getInstance(process.argv);
    this.isArgs = checkArgs.bind(this);
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
      this.data.showLocation();
    });

    read.pipe(hashSum);
  }
}

const hashModule = new Hash();

export default hashModule;
