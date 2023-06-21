import fileActions from './working-modules/fileActions.mjs';
import navigation from './working-modules/navigation.mjs';

class Handler {
  constructor() {}

  get up() {
    this._up();
  }
  get cd() {
    this._cd();
  }
  get ls() {
    this._ls();
  }
  get cat() {
    this._cat();
  }
  get add() {
    this._add();
  }
  get rn() {
    this._rn();
  }
  get cp() {
    this._cp();
  }
  get mv() {
    this._mv();
  }
  get rm() {
    this._rm();
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new Handler();
    }
    return this.instance;
  }

  _up = () => {
    navigation.up();
  };

  _cd = () => {
    navigation.cd();
  };

  _ls = () => {
    navigation.ls();
  };

  _cat() {
    fileActions.cat();
  }

  _add() {
    fileActions.add();
  }

  _rn() {
    fileActions.rn();
  }

  _cp() {
    fileActions.cp();
  }

  _mv() {
    fileActions.mv();
  }

  _rm() {
    fileActions.rm();
  }
}

const handler = Handler.getInstance();

export default handler;
