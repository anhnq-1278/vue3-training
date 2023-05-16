export const getBytesSize = (size: string) => {
  if (!size || typeof size !== 'string') return null

  const matcher = size.toUpperCase().match(/^(\d+)(B|KB|MB|GB)$/)

  if (!matcher) return null

  const sizes = ['B', 'KB', 'MB', 'GB']
  const n = sizes.indexOf(matcher[2])

  if (n < 0) return null

  return n === 0 ? Number(matcher[1]) : Number(matcher[1]) * 1024 ** n
}
