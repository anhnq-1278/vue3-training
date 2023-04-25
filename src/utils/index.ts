export const generateID = (): string => window.URL.createObjectURL(new Blob([])).slice(-36)

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const formatIsoDate = (isoDate?: string): string => {
  if (!isoDate) {
    return ''
  }
  return isoDate.substring(0, 10)
}
