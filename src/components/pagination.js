export const mergeById = (current = [], next = []) => {
  const merged = new Map(current.map(item => [item._id, item]))
  next.forEach(item => merged.set(item._id, item))
  return Array.from(merged.values())
}
