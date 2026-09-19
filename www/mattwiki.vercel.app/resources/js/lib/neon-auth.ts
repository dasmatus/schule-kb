const NEON_AUTH_URL = import.meta.env.VITE_NEON_AUTH_URL as string

export interface NeonUser {
    id: string
    email: string
    name?: string
}

async function neonRequest(path: string, body: Record<string, unknown>) {
    const res = await fetch(`${NEON_AUTH_URL}${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message ?? 'Authentication failed.')
    return data as { user: NeonUser; access_token: string }
}

export function signIn(email: string, password: string) {
    return neonRequest('/sign-in/email', { email, password, rememberMe: true })
}

export function signUp(email: string, password: string, name: string) {
    return neonRequest('/sign-up/email', { email, password, name })
}
