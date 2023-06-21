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
}

const handler = Handler.getInstance();

export default handler;
