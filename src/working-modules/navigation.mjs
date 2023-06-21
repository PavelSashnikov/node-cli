import { INVALID_MESSAGE } from '../storage/constants.mjs';
import { DataStorage } from '../storage/dataStorage.mjs';
import * as path from 'path';
import { readdir, stat } from 'fs';

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
      this.data.showLocation();
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

    const normalizedPath = path.normalize(this.data.lineArguments[0]);
    let newPath = '';

    if (path.isAbsolute(normalizedPath)) {
      newPath = normalizedPath;
    } else {
      newPath = path.join(this.data.currentPath, normalizedPath);
    }

    stat(newPath, (err, status) => {
      if (err || status.isFile()) {
        console.log(INVALID_MESSAGE);
      } else {
        this.data.currentPath = newPath;
      }
    });
  }

  ls() {
    if (this.data.lineArguments.length) {
      console.log(INVALID_MESSAGE);
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
