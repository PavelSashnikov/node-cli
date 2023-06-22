import compress from './working-modules/compress.mjs';
import fileActions from './working-modules/fileActions.mjs';
import hashModule from './working-modules/hash.mjs';
import navigation from './working-modules/navigation.mjs';
import osModule from './working-modules/os.mjs';

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
  get os() {
    this._os();
  }
  get hash() {
    this._hash();
  }
  get compress() {
    this._compress();
  }
  get decompress() {
    this._decompress();
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

  _os() {
    osModule.getOsData();
  }

  _hash() {
    hashModule.hashFile();
  }

  _compress() {
    compress.compress();
  }

  _decompress() {
    compress.decompress();
  }
}

const handler = Handler.getInstance();

export default handler;
