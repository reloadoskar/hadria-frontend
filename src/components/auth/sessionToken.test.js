import { createSessionFromToken, decodeSessionToken } from './sessionToken'

function tokenFor(payload) {
  const encode = value => Buffer.from(JSON.stringify(value)).toString('base64url')
  return `${encode({ alg: 'HS256', typ: 'JWT' })}.${encode(payload)}.signature`
}

test('decodes a non-expired session token without embedding the signing secret', () => {
  const token = tokenFor({ nombre: 'QA', exp: 2000 })
  expect(decodeSessionToken(token, 1000)).toEqual({ nombre: 'QA', exp: 2000 })
})

test('rejects an expired session token', () => {
  expect(decodeSessionToken(tokenFor({ exp: 999 }), 1000)).toBeNull()
})

test.each([
  ['missing', {}],
  ['zero', { exp: 0 }],
  ['non-numeric', { exp: '2000' }],
  ['non-finite', { exp: null }]
])('rejects a token with %s expiration', (_case, payload) => {
  expect(decodeSessionToken(tokenFor(payload), 1000)).toBeNull()
})

test('rejects malformed session tokens', () => {
  expect(decodeSessionToken('not-a-token', 1000)).toBeNull()
})

test('creates a session only from a valid token', () => {
  const token = tokenFor({
    nombre: 'QA',
    apellido: 'User',
    email: 'qa@example.com',
    level: 2,
    database: 'QA',
    ubicacion: 'TEST',
    paidPeriodEnds: '2030-01-01',
    exp: 2000
  })

  expect(createSessionFromToken(token, 1000)).toEqual({
    token,
    expiresAt: 2000000,
    user: {
      nombre: 'QA',
      apellido: 'User',
      email: 'qa@example.com',
      level: 2,
      database: 'QA',
      ubicacion: 'TEST',
      licenceEnds: '2030-01-01'
    }
  })
  expect(createSessionFromToken(tokenFor({ exp: 999 }), 1000)).toBeNull()
})
