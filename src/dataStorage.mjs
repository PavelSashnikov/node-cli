import { homedir } from 'os';
import { USER_KEY } from './constants.mjs';
import path from 'path';

export class DataStorage {
  constructor(initArgs) {
    this.setUserName(initArgs);
    this.currentPath = homedir();
    this.pathSeparator = path.sep;
  }

  get user() {
    return this._user;
  }
  set user(name) {
    this._user = typeof name === 'string' && name ? name : 'Anonimous';
  }

  get currentPath() {
    return this._currentPath;
  }
  set currentPath(path) {
    this._currentPath = path;
  }

  get lineArguments() {
    return this._lineArguments;
  }
  set lineArguments(data) {
    if (Array.isArray(data)) {
      this._lineArguments = data;
      return;
    }
    this.lineArguments = [];
  }

  static getInstance(initArgs) {
    if (!this.instance) {
      this.instance = new DataStorage(initArgs);
    }
    return this.instance;
  }

  pathSeparator = '';

  _currentPath = '';
  _user = '';
  _lineArguments = [];

  setUserName(args) {
    const userArg = args.find((arg) => arg.startsWith(USER_KEY));
    this.user = userArg?.split('=')[1];
  }

  showLocation() {
    console.log(`You are currently in ${this.currentPath}`);
  }
}
