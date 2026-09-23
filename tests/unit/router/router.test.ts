import { describe, it, expect } from 'vitest'
import type { RouteLocationNormalized, RouteLocationNormalizedLoaded } from 'vue-router'
import router from '@/router'

describe('routes', () => {
    it.each([
        ['/', 'Home', {}],
        ['/search', 'Search', {}],
        ['/archive/2022/11', 'Archive', { year: '2022', month: '11' }],
        ['/category/program', 'Category', { category: 'program' }],
        ['/contact', 'Page', { post_id: 'contact' }],
        ['/259', 'Article', { post_id: '259' }],
        ['/about', 'Page', { post_id: 'about' }],
        ['/a/b/c', 'NotFound', {}],
    ])('%s is resolved to %s', (path, name, params) => {
        const route = router.resolve(path)
        expect(route.name).toBe(name)
        expect(route.params).toMatchObject(params)
    })
})

describe('scrollBehavior', () => {
    const scroll = (to: RouteLocationNormalized, from: RouteLocationNormalizedLoaded) =>
        router.options.scrollBehavior!(to, from, null)
    // scrollBehavior only reads name and fullPath
    const route = (name: string | undefined, fullPath: string) =>
        ({ name, fullPath }) as unknown as RouteLocationNormalizedLoaded

    it('first page load scrolls to top', () => {
        expect(scroll(route('Home', '/'), route(undefined, '/'))).toEqual({ top: 0 })
    })
    it('does not scroll when the URL does not change', () => {
        expect(scroll(route('Home', '/'), route('Home', '/'))).toBeUndefined()
    })
    it('NotFound scrolls to top', () => {
        expect(scroll(route('NotFound', '/x'), route('Home', '/'))).toEqual({ top: 0 })
    })
    it('articles and pages scroll to the top visual', () => {
        expect(scroll(route('Article', '/1'), route('Home', '/'))).toEqual({ el: '.topVisual', top: 0 })
        expect(scroll(route('Page', '/about'), route('Home', '/'))).toEqual({ el: '.topVisual', top: 0 })
    })
    it('article lists scroll to the list description', () => {
        expect(scroll(route('Category', '/category/a'), route('Home', '/'))).toEqual({ el: '.articlesDescription', top: 70 })
    })
})
