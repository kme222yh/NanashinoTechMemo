import { describe, it, expect, vi, afterEach } from 'vitest'
import { defineComponent, h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import useHeaderVisibility, {
    tabletMaxWidth,
    nextScrollDirection,
    isHeaderVisible,
    shouldTeleportGlobalNav,
    SHOW_AFTER_Y,
} from '@/composables/useHeaderVisibility'

describe('tabletMaxWidth', () => {
    it('comes from $tablet-max in _valuables.scss', () => {
        expect(tabletMaxWidth).toBe(830)
    })
})

describe('nextScrollDirection', () => {
    const state = { anchorY: 1000, visible: true }

    it('ignores scrolling down up to 10px', () => {
        expect(nextScrollDirection(state, 1010)).toEqual(state)
    })
    it('hides when scrolled down more than 10px and moves the anchor', () => {
        expect(nextScrollDirection(state, 1011)).toEqual({ anchorY: 1011, visible: false })
    })
    it('ignores scrolling up up to 20px', () => {
        const hidden = { anchorY: 1000, visible: false }
        expect(nextScrollDirection(hidden, 980)).toEqual(hidden)
    })
    it('shows when scrolled up more than 20px and moves the anchor', () => {
        expect(nextScrollDirection({ anchorY: 1000, visible: false }, 979)).toEqual({ anchorY: 979, visible: true })
    })
    it('measures from the anchor, so slow scrolling still adds up', () => {
        let s = { anchorY: 1000, visible: true }
        for (const y of [1004, 1008]) s = nextScrollDirection(s, y)
        expect(s.visible).toBe(true)
        s = nextScrollDirection(s, 1012)
        expect(s).toEqual({ anchorY: 1012, visible: false })
    })
})

describe('isHeaderVisible', () => {
    const desktop = tabletMaxWidth + 1

    it('desktop: shown only after scrolling past 600px', () => {
        expect(isHeaderVisible({ width: desktop, y: SHOW_AFTER_Y, menuOpened: false, visibleByScrolling: true })).toBe(false)
        expect(isHeaderVisible({ width: desktop, y: SHOW_AFTER_Y + 1, menuOpened: false, visibleByScrolling: false })).toBe(true)
    })

    it('tablet/mobile: needs to be past 600px AND scrolling up', () => {
        const base = { width: 375, y: 1000, menuOpened: false }
        expect(isHeaderVisible({ ...base, visibleByScrolling: true })).toBe(true)
        expect(isHeaderVisible({ ...base, visibleByScrolling: false })).toBe(false)
        expect(isHeaderVisible({ ...base, y: 100, visibleByScrolling: true })).toBe(false)
    })

    it('tablet/mobile: opened menu keeps it shown near the top', () => {
        expect(isHeaderVisible({ width: 375, y: 0, menuOpened: true, visibleByScrolling: true })).toBe(true)
    })

    it('exactly the tablet max width is treated as tablet', () => {
        expect(isHeaderVisible({ width: tabletMaxWidth, y: 1000, menuOpened: false, visibleByScrolling: false })).toBe(false)
    })
})

describe('shouldTeleportGlobalNav', () => {
    it('teleports the nav into the menu button below the tablet max width', () => {
        expect(shouldTeleportGlobalNav(tabletMaxWidth - 1)).toBe(true)
        expect(shouldTeleportGlobalNav(tabletMaxWidth)).toBe(false)
        expect(shouldTeleportGlobalNav(1280)).toBe(false)
    })
})

describe('useHeaderVisibility (with window events)', () => {
    afterEach(() => vi.unstubAllGlobals())

    const setWindow = (width: number, y: number) => {
        Object.defineProperty(window, 'innerWidth', { value: width, configurable: true })
        Object.defineProperty(window, 'scrollY', { value: y, configurable: true })
    }
    const mountWith = (isMenuOpened = () => false) => {
        let result!: ReturnType<typeof useHeaderVisibility>
        const wrapper = mount(defineComponent({
            setup() {
                result = useHeaderVisibility(isMenuOpened)
                return () => h('div')
            },
        }))
        return { wrapper, result }
    }

    // requestAnimationFrame runs its callback later, like the real browser
    let frames: FrameRequestCallback[] = []
    const flushFrames = async () => {
        const callbacks = frames
        frames = []
        callbacks.forEach(cb => cb(0))
        await nextTick()
    }

    it('updates on scroll and resize, and stops listening after unmount', async () => {
        vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => frames.push(cb))
        vi.stubGlobal('cancelAnimationFrame', () => {})
        setWindow(1280, 0)
        const { wrapper, result } = mountWith()
        expect(result.visible.value).toBe(false)

        setWindow(1280, 1000)
        window.dispatchEvent(new Event('scroll'))
        window.dispatchEvent(new Event('scroll'))
        expect(frames).toHaveLength(1) // throttled to one update per frame
        await flushFrames()
        expect(result.visible.value).toBe(true)

        setWindow(375, 1000)
        window.dispatchEvent(new Event('resize'))
        await flushFrames()
        expect(result.teleportGlobalNav.value).toBe(true)

        wrapper.unmount()
        setWindow(1280, 0)
        window.dispatchEvent(new Event('resize'))
        expect(frames).toHaveLength(0)
        await flushFrames()
        expect(result.teleportGlobalNav.value).toBe(true)
    })
})
