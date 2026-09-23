import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import router from '@/router'
import ArticleLink from '@/components/main/home/ArticleLink.vue'

const mountLink = (props: Partial<InstanceType<typeof ArticleLink>['$props']>) => mount(ArticleLink, {
    props: { id: 259, date: '2022-11-24', title: 'Hello', media: 'http://example.test/a.png', ...props },
    global: { plugins: [router] },
})

describe('ArticleLink', () => {
    it('links the title and the image to the article', () => {
        const wrapper = mountLink({ categories: [{ id: 4, slug: 'program', name: 'Program' }] })
        const title = wrapper.find('.articleLink-title a')
        expect(title.text()).toBe('Hello')
        expect(title.attributes('href')).toBe('/259')
        expect(wrapper.find('.articleLink-media a').attributes('style')).toBe('background-image: url("http://example.test/a.png");')
        expect(wrapper.find('time').text()).toBe('2022-11-24')
    })

    it('links the first category', () => {
        const wrapper = mountLink({ categories: [{ id: 4, slug: 'program', name: 'Program' }, { id: 5, slug: 'other', name: 'Other' }] })
        const category = wrapper.find('.articleLink-category a')
        expect(category.text()).toBe('Program')
        expect(category.attributes('href')).toBe('/category/program')
    })

    it('renders without a category instead of crashing', () => {
        const wrapper = mountLink({ categories: [] })
        expect(wrapper.find('.articleLink-category').exists()).toBe(false)
        expect(wrapper.find('.articleLink-title').text()).toBe('Hello')
    })

    it('uses the given heading level', () => {
        const wrapper = mountLink({ categories: [], htag_level: 5 })
        expect(wrapper.find('h5.articleLink-title').exists()).toBe(true)
    })
})
