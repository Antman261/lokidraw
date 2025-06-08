export const setSource = (data: string, source: string): string =>
  data.replace('"source": "http://localhost:1420"', `"source": "${source}"`);
