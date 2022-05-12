export const makeApiUrl = (path: string): string => {
  if (path.startsWith('/')) {
    return `http://fordevs.herokuapp.com/api${path}`;
  }
  return `http://fordevs.herokuapp.com/api/${path}`;
};
