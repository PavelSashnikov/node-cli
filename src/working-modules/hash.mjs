import { createHash } from 'crypto';
import { createReadStream } from 'fs';
import { isAbsolute, join, normalize } from 'path';
import { DataStorage } from '../storage/dataStorage.mjs';

class Hash {
  constructor() {
    this.data = DataStorage.getInstance(process.argv);
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new Os();
    }
    return this.instance;
  }

  hashFile() {
    if (this.data.lineArguments.length !== 1) {
      console.log(INVALID_MESSAGE);
      this.data.showLocation();
      return;
    }

    const normalizedPath = normalize(this.data.lineArguments[0]);
    let filePath = '';

    if (isAbsolute(normalizedPath)) {
      filePath = normalizedPath;
    } else {
      filePath = join(this.data.currentPath, normalizedPath);
    }

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
