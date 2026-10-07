import axios from 'axios'
import { beforeEach, vi } from 'vitest'
import {
  ticketCancelaVenta,
  ticketCobranza,
  ticketCompra,
  ticketEgreso,
  ticketInventario,
  ticketMovimiento,
  ticketNuevoItem,
  ticketPago,
  ticketSalida,
  ticketTraspaso,
  ticketVenta,
  ticketVentasCorte
} from './api'

vi.mock('axios', () => ({
  default: {
    interceptors: {
      request: { use: vi.fn() }
    },
    post: vi.fn()
  }
}))

beforeEach(() => {
  axios.post.mockReset()
})

test('normalizes a printer HTTP 404 into a safe warning', async () => {
  axios.post.mockRejectedValue({
    status: 404,
    message: 'Request failed with status code 404',
    response: { status: 404 }
  })

  await expect(ticketVenta({ folio: 1 })).resolves.toEqual({
    status: 'warning',
    message: 'El servidor local de impresión no está disponible.'
  })
})

test('normalizes a successful printer response into a string variant', async () => {
  axios.post.mockResolvedValue({ status: 200, data: '' })

  await expect(ticketVenta({ folio: 1 })).resolves.toEqual({
    status: 'success',
    message: 'Solicitud de impresión enviada.'
  })
})

test('normalizes a scale connection failure without exposing an Axios error', async () => {
  axios.post.mockRejectedValue(new Error('Network Error'))

  await expect(ticketMovimiento({ peso: 10 })).resolves.toEqual({
    status: 'warning',
    message: 'No hay conectividad con el servicio local.'
  })
})

const localEndpoints = [
  [ticketCompra, 'http://localhost:8080/ticket-hadria/'],
  [ticketNuevoItem, 'http://localhost:8080/ticket-hadria/nuevoItem.php'],
  [ticketVenta, 'http://localhost:8080/ticket-hadria/venta.php'],
  [ticketSalida, 'http://localhost:8080/ticket-hadria/salida.php'],
  [ticketCobranza, 'http://localhost:8080/ticket-hadria/cobranza.php'],
  [ticketEgreso, 'http://localhost:8080/ticket-hadria/egreso.php'],
  [ticketPago, 'http://localhost:8080/ticket-hadria/pago.php'],
  [ticketInventario, 'http://localhost:8080/ticket-hadria/inventario.php'],
  [ticketVentasCorte, 'http://localhost:8080/ticket-hadria/ventaCorte.php'],
  [ticketCancelaVenta, 'http://localhost:8080/ticket-hadria/cancelaVenta.php'],
  [ticketTraspaso, 'http://localhost:8080/ticket-hadria/traspaso.php'],
  [ticketMovimiento, 'http://localhost:8002/pesadas']
]

test.each(localEndpoints)('preserves local endpoint %s', async (request, endpoint) => {
  const payload = { prueba: true }
  axios.post.mockResolvedValue({ status: 200, data: '' })

  await request(payload)

  expect(axios.post).toHaveBeenCalledWith(endpoint, payload)
})

test.each(['success', 'warning', 'error', 'info'])(
  'preserves a valid %s response from the local service',
  async status => {
    axios.post.mockResolvedValue({
      status: 200,
      data: { status, message: 'Respuesta local' }
    })

    await expect(ticketVenta({ folio: 1 })).resolves.toEqual({
      status,
      message: 'Respuesta local'
    })
  }
)

test.each([
  { status: 200, message: 'Estado numérico' },
  { status: 'desconocido', message: 'Variant inválida' },
  { status: 'warning', message: '' },
  { status: 'warning', message: 'x'.repeat(241) }
])('replaces malformed local feedback with a safe success result', async data => {
  axios.post.mockResolvedValue({ status: 200, data })

  await expect(ticketVenta({ folio: 1 })).resolves.toEqual({
    status: 'success',
    message: 'Solicitud de impresión enviada.'
  })
})

test('normalizes non-404 HTTP failures into a safe warning', async () => {
  axios.post.mockRejectedValue({ response: { status: 500 } })

  await expect(ticketVenta({ folio: 1 })).resolves.toEqual({
    status: 'warning',
    message: 'No hay conectividad con el servicio local.'
  })
})
