function resolveRequestUrl(config, currentOrigin) {
  const origin = currentOrigin || 'http://localhost'
  const requestPath = config.url

  if (/^[a-z][a-z\d+.-]*:/i.test(requestPath) || requestPath.startsWith('//')) {
    return new URL(requestPath, origin)
  }

  if (!config.baseURL) return new URL(requestPath, origin)

  const baseUrl = new URL(config.baseURL, origin)
  baseUrl.pathname = baseUrl.pathname.endsWith('/') ? baseUrl.pathname : `${baseUrl.pathname}/`
  baseUrl.search = ''
  baseUrl.hash = ''
  return new URL(requestPath.replace(/^\/+/, ''), baseUrl)
}

function isProtectedApiRequest(config, apiBaseUrl, currentOrigin) {
  if (!config || typeof config.url !== 'string' || !config.url || !apiBaseUrl) return false

  try {
    const origin = currentOrigin || 'http://localhost'
    const apiUrl = new URL(apiBaseUrl, origin)
    const requestUrl = resolveRequestUrl(config, origin)
    const apiPath = apiUrl.pathname.endsWith('/') ? apiUrl.pathname : `${apiUrl.pathname}/`

    return requestUrl.origin === apiUrl.origin &&
      (requestUrl.pathname === apiUrl.pathname || requestUrl.pathname.startsWith(apiPath))
  } catch {
    return false
  }
}

export function withSessionAuthorization(config, token, apiBaseUrl, currentOrigin) {
  if (!token || !isProtectedApiRequest(config, apiBaseUrl, currentOrigin)) return config

  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${token}`
    }
  }
}
