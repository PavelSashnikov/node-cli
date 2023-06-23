import { isAbsolute, join, normalize } from 'path';
import { INVALID_MESSAGE, ERROR_MESSAGE } from '../storage/constants.mjs';

export function normalizePath(currPath, endpoint) {
  const normalizedPath = normalize(endpoint);

  if (isAbsolute(normalizedPath)) {
    return normalizedPath;
  } else {
    return join(currPath, normalizedPath);
  }
}

// bind it to class to get dataStorage instance
export function checkArgs(n, cond = true) {
  if (this.data.lineArguments.length !== n || !cond) {
    console.log(INVALID_MESSAGE);
    return false;
  }
  return true;
}

// bind it to class to get dataStorage instance
export function streamCb(err) {
  if (err) {
    console.log(ERROR_MESSAGE);
    return;
  }
  this.data.showLocation();
}
