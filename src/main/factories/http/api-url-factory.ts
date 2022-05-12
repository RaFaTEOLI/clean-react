export const makeApiUrl = (path: string): string => {
  const apiUrl = process.env.API_URL;
  if (path.startsWith('/')) {
    return `${apiUrl}${path}`;
  }
  return `${apiUrl}/${path}`;
};
