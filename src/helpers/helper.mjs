import { isAbsolute, join, normalize } from 'path';

export function normalizePath(currPath, endpoint) {
  const normalizedPath = normalize(endpoint);

  if (isAbsolute(normalizedPath)) {
    return normalizedPath;
  } else {
    return join(currPath, normalizedPath);
  }
}
