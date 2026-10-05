export function getMovementDateError(fecha) {
  return /^\d{4}-\d{2}-\d{2}$/.test(fecha || '')
    ? null
    : 'Selecciona una fecha válida.'
}

export function getMovementRequestError(error) {
  const backendMessage = error && error.response && error.response.data && error.response.data.message
  if (backendMessage) return backendMessage
  if (error && error.request) return 'No fue posible conectar con el servidor.'
  return 'No fue posible consultar los movimientos.'
}
