import { isAbsolute, join, normalize } from 'path';
import { INVALID_MESSAGE } from '../storage/constants.mjs';

export function normalizePath(currPath, endpoint) {
  const normalizedPath = normalize(endpoint);

  if (isAbsolute(normalizedPath)) {
    return normalizedPath;
  } else {
    return join(currPath, normalizedPath);
  }
}

// bind it to class to get dataStorage instance
export function checkArgs(n) {
  if (this.data.lineArguments.length !== n) {
    console.log(INVALID_MESSAGE);
    this.data.showLocation();
    return false;
  }
  return true;
}
