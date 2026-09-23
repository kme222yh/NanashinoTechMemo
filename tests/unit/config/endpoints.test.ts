import { describe, it, expect } from 'vitest'
import Endpoints from '@/config/endpoints'

describe('endpoints', () => {
    it('builds WordPress REST URLs from the home_url meta tag', () => {
        expect(Endpoints.app).toBe('http://example.test/wp-json/nanashinotechmemo/v1/app')
        expect(Endpoints.articles).toBe('http://example.test/wp-json/nanashinotechmemo/v1/articles')
        expect(Endpoints.related).toBe('http://example.test/wp-json/yarpp/v1/related')
    })

    it('counts views with the WordPress Popular Posts v2 API', () => {
        expect(Endpoints.wppIncrement).toBe('http://example.test/wp-json/wordpress-popular-posts/v2/views')
    })
})
