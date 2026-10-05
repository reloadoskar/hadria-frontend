export const getLoginErrorMessage = error => {
  const backendMessage = error && error.response && error.response.data && error.response.data.message

  if (backendMessage) return backendMessage

  if (error && error.response && error.response.status === 404) {
    return 'No se encontró el servicio de inicio de sesión. Revise la URL de la API.'
  }

  return 'No fue posible contactar al servidor. Verifique su conexión e intente nuevamente.'
}
