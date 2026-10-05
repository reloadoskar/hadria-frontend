import { getLoginErrorMessage } from './loginError'

test('muestra el mensaje seguro enviado por el backend', () => {
  const error = {
    response: {
      status: 401,
      data: {
        status: 'error',
        message: 'Usuario o contraseña incorrectos.'
      }
    }
  }

  expect(getLoginErrorMessage(error)).toBe('Usuario o contraseña incorrectos.')
})

test('distingue cuando el servidor no respondió', () => {
  const error = { request: {} }

  expect(getLoginErrorMessage(error)).toBe(
    'No fue posible contactar al servidor. Verifique su conexión e intente nuevamente.'
  )
})

test('informa cuando la ruta de login no existe', () => {
  const error = { response: { status: 404, data: {} } }

  expect(getLoginErrorMessage(error)).toBe(
    'No se encontró el servicio de inicio de sesión. Revise la URL de la API.'
  )
})
