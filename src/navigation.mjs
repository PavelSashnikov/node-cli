import { INVALID_MESSAGE } from './constants.mjs';
import { DataStorage } from './dataStorage.mjs';
import * as path from 'path';

class Navigation {
  constructor() {
    this.data = DataStorage.getInstance(process.argv);
  }

  data;

  static getInstance() {
    if (!this.instance) {
      this.instance = new Navigation();
    }
    return this.instance;
  }

  up() {
    const newPath = this.data.currentPath.split(this.data.pathSeparator);
    if (newPath.length < 2) {
      return;
    }
    newPath.pop();
    this.data.currentPath = newPath.join(this.data.pathSeparator);
  }

  cd() {
    if (this.data.lineArguments.length !== 1) {
      console.log(INVALID_MESSAGE);
      return;
    }

    const currentArgs = path.normalize(this.data.lineArguments[0]);
    if (path.isAbsolute(currentArgs)) {
      this.data.currentPath = currentArgs;
    } else {
      this.data.currentPath = path.join(this.data.currentPath, currentArgs);
    }
  }
}
const navigation = Navigation.getInstance();

export default navigation;
