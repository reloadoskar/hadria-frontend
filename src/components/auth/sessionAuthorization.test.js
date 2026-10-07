import { withSessionAuthorization } from './sessionAuthorization'

const apiBaseUrl = 'https://api.example.com/api/'
const currentOrigin = 'https://app.example.com'

test('adds the bearer token to requests for the protected API without discarding headers', () => {
  expect(withSessionAuthorization({
    url: 'https://api.example.com/api/productos',
    headers: { Accept: 'application/json' }
  }, 'token-value', apiBaseUrl, currentOrigin)).toEqual({
    url: 'https://api.example.com/api/productos',
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer token-value'
    }
  })
})

test('does not send the session token to the local ticket printer', () => {
  const config = {
    url: 'http://localhost:8080/ticket-hadria/venta.php',
    headers: { 'Content-Type': 'application/json' }
  }

  expect(withSessionAuthorization(config, 'token-value', apiBaseUrl, currentOrigin)).toBe(config)
})

test('does not send the session token to the local scale service', () => {
  const config = { url: 'http://localhost:8002/pesadas', headers: {} }

  expect(withSessionAuthorization(config, 'token-value', apiBaseUrl, currentOrigin)).toBe(config)
})

test('does not authorize a path outside the API even when it shares the same origin', () => {
  const localApi = 'http://localhost:8080/api/'
  const config = { url: 'http://localhost:8080/ticket-hadria/venta.php', headers: {} }

  expect(withSessionAuthorization(config, 'token-value', localApi, 'http://localhost:3000')).toBe(config)
})

test('does not authorize a sibling path that only shares the API prefix', () => {
  const config = { url: 'https://api.example.com/api-maliciosa/productos', headers: {} }

  expect(withSessionAuthorization(config, 'token-value', 'https://api.example.com/api', currentOrigin)).toBe(config)
})

test.each(['productos', '/productos'])(
  'combines an Axios baseURL path with relative request URL %s',
  requestPath => {
    const config = {
      baseURL: 'https://api.example.com/api/',
      url: requestPath,
      headers: { Accept: 'application/json' }
    }

    expect(withSessionAuthorization(
      config,
      'token-value',
      'https://api.example.com/api',
      currentOrigin
    )).toEqual({
      ...config,
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer token-value'
      }
    })
  }
)

test('leaves the request unchanged when there is no session token', () => {
  const config = { url: 'https://api.example.com/api/productos', headers: { Accept: 'application/json' } }
  expect(withSessionAuthorization(config, null, apiBaseUrl, currentOrigin)).toBe(config)
})
