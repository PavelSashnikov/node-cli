export class Handler {
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

  _up = () => {
    console.log(
      `Go upper from current directory
       (when you are in the root folder this operation shouldn't change working directory)`
    );
  };

  _cd = () => {
    console.log(
      `Go to dedicated folder from current directory (path_to_directory can be relative or absolute)`
    );
  };

  _ls = () => {
    console.log(
      `Print in console list of all files and folders in current directory`
    );
  };
}
