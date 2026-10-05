import { getMovementDateError, getMovementRequestError } from './movementRequest'

test('rejects a missing movement date before calling the API', () => {
  expect(getMovementDateError('')).toBe('Selecciona una fecha válida.')
  expect(getMovementDateError('2026-10')).toBe('Selecciona una fecha válida.')
  expect(getMovementDateError('2026-10-05')).toBeNull()
})

test('preserves the safe backend message for movement errors', () => {
  const error = { response: { data: { message: 'Debe indicar una fecha válida con formato YYYY-MM-DD.' } } }
  expect(getMovementRequestError(error)).toBe('Debe indicar una fecha válida con formato YYYY-MM-DD.')
})

test('describes a movement network failure', () => {
  expect(getMovementRequestError({ request: {} })).toBe('No fue posible conectar con el servidor.')
})
