import { describe, expect, test } from 'vitest'
import { getMonthPeriodError, getRequestErrorMessage } from './requestFeedback'

describe('getMonthPeriodError', () => {
  test('acepta un periodo mensual válido', () => {
    expect(getMonthPeriodError('2026-10')).toBeNull()
  })

  test('rechaza un periodo vacío o inválido', () => {
    expect(getMonthPeriodError('')).toBe('Selecciona un periodo válido.')
    expect(getMonthPeriodError('2026-13')).toBe('Selecciona un periodo válido.')
    expect(getMonthPeriodError('octubre')).toBe('Selecciona un periodo válido.')
  })
})

describe('getRequestErrorMessage', () => {
  test('prioriza el mensaje seguro enviado por el backend', () => {
    expect(getRequestErrorMessage({
      response: { data: { message: 'Selecciona un periodo para consultar las compras.' } }
    }, 'No fue posible cargar la información.')).toBe('Selecciona un periodo para consultar las compras.')
  })

  test('usa el mensaje de respaldo cuando el backend no envía texto seguro', () => {
    expect(getRequestErrorMessage({
      response: { data: { message: { internal: 'detalle' } } },
      request: {}
    }, 'No fue posible cargar la información.')).toBe('No fue posible cargar la información.')

    expect(getRequestErrorMessage({
      response: { data: { message: 'x'.repeat(241) } }
    }, 'No fue posible cargar la información.')).toBe('No fue posible cargar la información.')
  })

  test('distingue un problema de conexión', () => {
    expect(getRequestErrorMessage({ request: {} }, 'No fue posible cargar la información.'))
      .toBe('No fue posible conectar con el servidor.')
  })

  test('usa el mensaje de respaldo para errores inesperados', () => {
    expect(getRequestErrorMessage(new Error('interno'), 'No fue posible cargar las compras.'))
      .toBe('No fue posible cargar las compras.')
  })
})
