export function getMonthPeriodError(period) {
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(period || '')) {
    return 'Selecciona un periodo válido.'
  }

  return null
}

export function getRequestErrorMessage(error, fallbackMessage) {
  const backendMessage = error && error.response && error.response.data && error.response.data.message
  if (typeof backendMessage === 'string') {
    const safeMessage = backendMessage.trim()
    if (safeMessage && safeMessage.length <= 240) return safeMessage
  }
  if (error && error.response) return fallbackMessage
  if (error && error.request) return 'No fue posible conectar con el servidor.'
  return fallbackMessage
}
