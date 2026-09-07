const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const browserHost = typeof window !== 'undefined' ? window.location.hostname : ''
const forwardedApiUrl = browserHost.endsWith('-5173.app.github.dev')
  ? `https://${browserHost.replace(/-5173\.app\.github\.dev$/, '-8000.app.github.dev')}/api`
  : ''

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : forwardedApiUrl || 'http://localhost:8000/api'

export function normalizeCollection(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.items)) return payload.items
  return []
}

export async function fetchCollection(resource) {
  const response = await fetch(`${apiBaseUrl}/${resource}/`)
  if (!response.ok) throw new Error(`Unable to load ${resource}`)
  return normalizeCollection(await response.json())
}