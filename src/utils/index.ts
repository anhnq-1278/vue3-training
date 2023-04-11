export const generateID = (): string => window.URL.createObjectURL(new Blob([])).slice(-36)
