const devHost = 'http://localhost:3000/api';

export const MARKERS = `${devHost}/marker`;
export const MARKER = (id: string) => `${devHost}/marker/${id}/`;
