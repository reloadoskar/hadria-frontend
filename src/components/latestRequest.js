export function createLatestRequest() {
  let current = 0

  return {
    next() {
      current += 1
      return current
    },
    isCurrent(requestId) {
      return requestId === current
    }
  }
}
