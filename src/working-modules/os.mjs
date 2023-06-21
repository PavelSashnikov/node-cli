import * as os from 'os';
import { DataStorage } from '../storage/dataStorage.mjs';
import { INVALID_MESSAGE } from '../storage/constants.mjs';

class Os {
  constructor() {
    this.data = DataStorage.getInstance(process.argv);
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new Os();
    }
    return this.instance;
  }

  get EOL() {
    return JSON.stringify(os.EOL);
  }
  get cpus() {
    const info = os.cpus().reduce((acc, cpu) => {
      acc.push({ model: cpu.model, clockRate: `${cpu.speed / 1000}GHz` });
      return acc;
    }, []);
    info.unshift({ count: os.cpus().length });
    return info;
  }
  get homedir() {
    return os.homedir();
  }
  get username() {
    return os.userInfo().username;
  }
  get architecture() {
    return os.arch();
  }

  getOsData() {
    const params = this.data.lineArguments;
    if (params.length !== 1 || !params[0].startsWith('--')) {
      console.log(INVALID_MESSAGE);
      this.data.showLocation();
      return;
    }

    const param = params[0].replace('--', '');
    if (this[param]) {
      console.log(this[param]);
    } else {
      console.log(INVALID_MESSAGE);
    }
    this.data.showLocation();
  }
}

const osModule = new Os();

export default osModule;
