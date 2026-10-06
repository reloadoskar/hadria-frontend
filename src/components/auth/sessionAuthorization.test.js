import { withSessionAuthorization } from './sessionAuthorization'

test('adds the bearer token without discarding existing headers', () => {
  expect(withSessionAuthorization({ headers: { Accept: 'application/json' } }, 'token-value')).toEqual({
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer token-value'
    }
  })
})

test('leaves the request unchanged when there is no session token', () => {
  const config = { headers: { Accept: 'application/json' } }
  expect(withSessionAuthorization(config, null)).toBe(config)
})
