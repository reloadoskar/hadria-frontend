export function withSessionAuthorization(config, token) {
  if (!token) return config

  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${token}`
    }
  }
}
