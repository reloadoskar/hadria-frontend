import { createLatestRequest } from './latestRequest'

test('only the newest request remains current', () => {
  const requests = createLatestRequest()
  const first = requests.next()
  const second = requests.next()

  expect(requests.isCurrent(first)).toBe(false)
  expect(requests.isCurrent(second)).toBe(true)
})
