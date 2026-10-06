import jwtDecode from 'jwt-decode'

export function decodeSessionToken(token, nowSeconds = Date.now() / 1000) {
  try {
    const decoded = jwtDecode(token)
    if (!decoded || !Number.isFinite(decoded.exp) || decoded.exp <= nowSeconds) return null
    return decoded
  } catch (error) {
    return null
  }
}

export function createSessionFromToken(token, nowSeconds = Date.now() / 1000) {
  const decoded = decodeSessionToken(token, nowSeconds)
  if (!decoded) return null

  return {
    token,
    expiresAt: decoded.exp * 1000,
    user: {
      nombre: decoded.nombre,
      apellido: decoded.apellido,
      email: decoded.email,
      level: decoded.level,
      database: decoded.database,
      ubicacion: decoded.ubicacion,
      licenceEnds: decoded.paidPeriodEnds
    }
  }
}
