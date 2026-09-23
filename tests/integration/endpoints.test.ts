import { describe, it, expect, beforeAll } from 'vitest'
import { request, getJson, assertWordPressIsRunning, THEME_API } from './wordpress'
import type { AppData, ArticleDetail, ArticlesResponse } from '@/types/api'

beforeAll(assertWordPressIsRunning)

describe('GET /app', () => {
    it('returns all layout data the app needs', async () => {
        const app = await getJson<AppData>(`${THEME_API}/app`)
        expect(Object.keys(app).sort()).toEqual(['archives', 'categories', 'footerMenu', 'footerWidget', 'globalMenu', 'pinnedArticles'])
        expect(Array.isArray(app.globalMenu)).toBe(true)
        expect(typeof app.categories).toBe('object')
    })
})

describe('GET /articles', () => {
    it('returns a page of articles with tags and categories as arrays', async () => {
        const res = await getJson<ArticlesResponse>(`${THEME_API}/articles?per_page=100`)
        expect(res.per_page).toBe(100)
        expect(res.articles.length).toBeGreaterThan(0)
        for (const article of res.articles) {
            expect(article).toEqual(expect.objectContaining({ id: expect.any(Number), title: expect.any(String) }))
            // posts without tags used to crash with a TypeError on PHP 8
            expect(Array.isArray(article.tags)).toBe(true)
            expect(Array.isArray(article.categories)).toBe(true)
            expect(article.media === null || typeof article.media === 'string').toBe(true)
        }
    })

    it('paginates: next_page is set until the last page', async () => {
        const all = await getJson<ArticlesResponse>(`${THEME_API}/articles?per_page=100`)
        const total = all.articles.length
        const first = await getJson<ArticlesResponse>(`${THEME_API}/articles?per_page=1&page=1`)
        expect(first.articles).toHaveLength(1)
        expect(first.next_page).toBe(total > 1 ? 2 : null)

        const last = await getJson<ArticlesResponse>(`${THEME_API}/articles?per_page=1&page=${total}`)
        expect(last.articles).toHaveLength(1)
        expect(last.next_page).toBeNull()
    })

    it('returns an empty list for a search without results', async () => {
        const res = await getJson<ArticlesResponse>(`${THEME_API}/articles?s=no-such-word-zzzz`)
        expect(res.articles).toEqual([])
        expect(res.next_page).toBeNull()
    })
})

describe('GET /article/{id}', () => {
    it('returns every published article (with or without tags)', async () => {
        const { articles } = await getJson<ArticlesResponse>(`${THEME_API}/articles?per_page=100`)
        for (const { id } of articles) {
            const article = await getJson<ArticleDetail>(`${THEME_API}/article/${id}`)
            expect(article.id).toBe(id)
            expect(Array.isArray(article.tags)).toBe(true)
            expect(typeof article.content).toBe('string')
        }
    })

    it('returns 404 for an unknown id', async () => {
        const res = await request(`${THEME_API}/article/999999999`)
        expect(res.status).toBe(404)
        expect(((await res.json()) as { code: string }).code).toBe('are_you_ok?')
    })
})

describe('GET /article/{page slug}', () => {
    it('returns a static page, whose category is null', async () => {
        const [page] = await getJson<{ id: number, slug: string }[]>('/wp-json/wp/v2/pages?per_page=1&_fields=id,slug')
        expect(page).toBeDefined()
        const res = await getJson<ArticleDetail>(`${THEME_API}/article/${page!.slug}`)
        expect(res.id).toBe(page.id)
        expect(res.category).toBeNull()
        expect(res.tags).toEqual([])
    })
})

describe('plugin APIs used by the theme', () => {
    it('YARPP returns related posts for an article', async () => {
        const { articles } = await getJson<ArticlesResponse>(`${THEME_API}/articles?per_page=1`)
        const res = await request(`/wp-json/yarpp/v1/related/${articles[0]!.id}?_embed=true&limit=4`)
        expect(res.status).toBe(200)
        expect(Array.isArray(await res.json())).toBe(true)
    })

    it('WordPress Popular Posts accepts a view (v2 API)', async () => {
        const { articles } = await getJson<ArticlesResponse>(`${THEME_API}/articles?per_page=1`)
        const res = await request(`/wp-json/wordpress-popular-posts/v2/views/${articles[0]!.id}`, { method: 'POST' })
        expect(res.status).toBe(201)
    })
})
