import { describe, it, expect, beforeAll } from 'vitest'
import { request, getJson, assertWordPressIsRunning, THEME_API } from './wordpress'
import type { AppData, ArchiveItem } from '@/types/api'

// Vue Router routes must also be valid WordPress URLs when accessed directly.
describe('direct access to Vue Router routes', () => {
    let archive: ArchiveItem | undefined

    beforeAll(async () => {
        await assertWordPressIsRunning()
        const { archives } = await getJson<AppData>(`${THEME_API}/app`)
        archive = archives[0]
    })

    it.each(['/', '/search', '/search?s=wordpress', '/search?s=no-such-word-zzzz'])('%s returns 200', async path => {
        expect((await request(path)).status).toBe(200)
    })

    it('/archive/{year}/{month} of a month with posts returns 200 without redirect', async () => {
        expect(archive).toBeDefined()
        const res = await request(`/archive/${archive!.year}/${archive!.month}`)
        expect(res.status).toBe(200)
    })

    it('/archive/{year}/{month} of a month without posts returns 404', async () => {
        expect((await request('/archive/1999/1')).status).toBe(404)
    })

    it('an unknown path returns 404', async () => {
        expect((await request('/no-such-page-zzzz/')).status).toBe(404)
    })

    it('the search page title contains the search word', async () => {
        const html = await (await request('/search?s=wordpress')).text()
        expect(html).toMatch(/<title>wordpress \|/)
    })
})

describe('theme HTML', () => {
    let html: string

    beforeAll(async () => {
        await assertWordPressIsRunning()
        html = await (await request('/')).text()
    })

    it('loads the app built by Vite as a module', () => {
        expect(html).toMatch(/<script[^>]+src="[^"]+\/wp-content\/themes\/nanashinotechmemo\/assets\/main-[\w-]+\.js"[^>]*type="module"|<script[^>]+type="module"[^>]+src="[^"]+\/assets\/main-[\w-]+\.js"/)
    })

    it('outputs exactly one <title>', () => {
        expect(html.match(/<title>/g)).toHaveLength(1)
    })

    it('does not load Font Awesome from the external CDN', () => {
        expect(html).not.toContain('use.fontawesome.com')
    })

    it('has the containers the app mounts on', () => {
        expect(html).toContain('<div id="app"></div>')
        expect(html).toContain('<div id="opening-animation"></div>')
    })
})
