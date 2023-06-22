import { INVALID_MESSAGE } from '../storage/constants.mjs';
import { DataStorage } from '../storage/dataStorage.mjs';
import { readdir, stat } from 'fs';
import { checkArgs } from '../helpers/helper.mjs';

class Navigation {
  constructor() {
    this.data = DataStorage.getInstance(process.argv);
    this.isArgs = checkArgs.bind(this);
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new Navigation();
    }
    return this.instance;
  }

  up() {
    if (!this.isArgs(0)) {
      return;
    }

    const newPath = this.data.currentPath.split(this.data.pathSeparator);
    if (newPath.length < 2) {
      this.data.showLocation();
      return;
    }
    newPath.pop();
    this.data.currentPath = newPath.join(this.data.pathSeparator);
  }

  cd() {
    if (!this.isArgs(1)) {
      return;
    }

    const newPath = normalizePath(
      this.data.currentPath,
      this.data.lineArguments[0]
    );

    stat(newPath, (err, status) => {
      if (err || status.isFile()) {
        console.log(INVALID_MESSAGE);
      } else {
        this.data.currentPath = newPath;
      }
    });
  }

  ls() {
    if (!this.isArgs(0)) {
      return;
    }

    readdir(this.data.currentPath, { withFileTypes: true }, (err, files) => {
      if (err) {
        throw new Error();
      }
      const fileArr = [];
      const dirArr = [];

      files.forEach((file) => {
        if (file.isFile()) {
          fileArr.push({
            name: file.name,
            type: 'file',
          });
        } else {
          dirArr.push({
            name: file.name,
            type: 'directory',
          });
        }
      });
      const sortedFiles = fileArr.sort((a, b) => {
        a.name.localeCompare(b.name);
      });
      const sortedDirs = dirArr.sort((a, b) => {
        a.name.localeCompare(b.name);
      });

      console.table(sortedDirs.concat(sortedFiles));
      this.data.showLocation();
    });
  }
}
const navigation = Navigation.getInstance();

export default navigation;
