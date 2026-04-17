const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000'

async function request(method, path, body = null) {
  const opts = {
    method,
    headers: { 'Content-Type': 'application/json' },
  }
  if (body) opts.body = JSON.stringify(body)

  const res = await fetch(`${API_BASE}${path}`, opts)

  if (!res.ok) {
    let msg = `HTTP ${res.status}`
    try {
      const err = await res.json()
      msg = err.detail || msg
    } catch (_) {}
    throw new Error(msg)
  }

  return res.json()
}

export const generateBlueprint = (idea, industry, target_audience) =>
  request('POST', '/generate', { idea, industry, target_audience })

export const saveBlueprint = (idea, blueprint) =>
  request('POST', '/save', { idea, blueprint })

export const getHistory = () =>
  request('GET', '/history')

export const deleteIdea = (id) =>
  request('DELETE', `/history/${id}`)
