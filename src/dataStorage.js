import { USER_KEY } from './constants.mjs';

export class DataStorage {
  constructor(initArgs) {
    this.setUserName(initArgs);
  }

  get user() {
    return this._user;
  }
  set user(name) {
    this._user = typeof name === 'string' && name ? name : 'Anonimous';
  }
  _user = '';

  setUserName(args) {
    const userArg = args.find((arg) => arg.startsWith(USER_KEY));
    this.user = userArg?.split('=')[1];
  }
}
