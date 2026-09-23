import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Content from '@/components/main/article/Content.vue'

const html = `
    <p>text</p>
    <figure class="wp-block-image"><img src="http://example.test/photo.png"></figure>
`

describe('Content', () => {
    beforeEach(() => vi.useFakeTimers())
    afterEach(() => {
        vi.useRealTimers()
        document.body.innerHTML = ''
    })

    it('renders the article HTML and adds a new-tab link to each image', () => {
        const wrapper = mount(Content, { props: { content: html }, attachTo: document.body })
        vi.advanceTimersByTime(100)

        expect(wrapper.find('.content-body p').text()).toBe('text')
        const link = wrapper.find('.wp-block-image a')
        expect(link.attributes('href')).toBe('http://example.test/photo.png')
        expect(link.attributes('target')).toBe('_blank')
        expect(link.attributes('rel')).toBe('noopener')
        wrapper.unmount()
    })

    it('stops polling for the content after unmount', () => {
        const wrapper = mount(Content, { props: { content: '' }, attachTo: document.body })
        vi.advanceTimersByTime(300)
        expect(vi.getTimerCount()).toBe(1) // still waiting for the content

        wrapper.unmount()
        expect(vi.getTimerCount()).toBe(0)
        expect(() => vi.advanceTimersByTime(1000)).not.toThrow()
    })
})
