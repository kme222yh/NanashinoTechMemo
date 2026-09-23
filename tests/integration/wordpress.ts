// Base URL of the local WordPress (docker compose). Override with WP_BASE_URL.
export const BASE_URL = (process.env.WP_BASE_URL ?? 'http://localhost:8000').replace(/\/$/, '')

export const THEME_API = '/wp-json/nanashinotechmemo/v1'

export function request(path: string, init: RequestInit = {}) {
    return fetch(BASE_URL + path, { redirect: 'manual', ...init })
}

export async function getJson<T = unknown>(path: string): Promise<T> {
    const res = await request(path)
    if (res.status !== 200) throw new Error(`GET ${path} returned ${res.status}`)
    return res.json() as Promise<T>
}

export async function assertWordPressIsRunning() {
    try {
        await fetch(BASE_URL + '/wp-json/')
    } catch {
        throw new Error(`WordPress is not reachable at ${BASE_URL}. Run \`docker compose up -d\` first.`)
    }
}
