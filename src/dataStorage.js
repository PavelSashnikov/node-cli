import { homedir } from 'os';
import { USER_KEY } from './constants.mjs';

export class DataStorage {
  constructor(initArgs) {
    this.setUserName(initArgs);
    this.currentPath = homedir();
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

  _currentPath = '';
  _user = '';

  setUserName(args) {
    const userArg = args.find((arg) => arg.startsWith(USER_KEY));
    this.user = userArg?.split('=')[1];
  }
}
