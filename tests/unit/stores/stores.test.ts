import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAjaxReadyStore } from '@/stores/ajaxReady'
import { useOpenManagimentStore } from '@/stores/openManagiment'
import { useTeleportReadyStore } from '@/stores/teleportReady'

beforeEach(() => setActivePinia(createPinia()))

describe('ajaxReady store', () => {
    it('is not ready until ready() is called', () => {
        const store = useAjaxReadyStore()
        expect(store.isReady('articles')).toBeFalsy()
        store.ready('articles')
        expect(store.isReady('articles')).toBe(true)
    })

    it('refresh() forgets page data but keeps base (layout) data', () => {
        const store = useAjaxReadyStore()
        store.ready('app', true)
        store.ready('articles')

        store.refresh()

        expect(store.isReady('app')).toBe(true)
        expect(store.isReady('articles')).toBeFalsy()
    })
})

describe('openManagiment store', () => {
    // the scroll blocking listener is registered on document, so always release it
    afterEach(() => useOpenManagimentStore().close())

    const wheel = () => {
        const event = new WheelEvent('wheel', { cancelable: true })
        document.dispatchEvent(event)
        return event
    }

    it('toggle() opens and closes the named item', () => {
        const store = useOpenManagimentStore()
        expect(store.isOpened()).toBeNull()

        store.toggle('globalMenu')
        expect(store.isOpened('globalMenu')).toBe(true)
        expect(store.isOpened('other')).toBe(false)
        expect(store.isOpened()).toBe('globalMenu')

        store.toggle('globalMenu')
        expect(store.isOpened('globalMenu')).toBe(false)
    })

    it('toggle() of another item switches the opened item', () => {
        const store = useOpenManagimentStore()
        store.toggle('a')
        store.toggle('b')
        expect(store.isOpened()).toBe('b')
    })

    it('blocks page scrolling only while something is opened', () => {
        const store = useOpenManagimentStore()
        expect(wheel().defaultPrevented).toBe(false)

        store.open('globalMenu')
        expect(wheel().defaultPrevented).toBe(true)

        store.close()
        expect(wheel().defaultPrevented).toBe(false)
    })
})

describe('teleportReady store', () => {
    it('reports only the targets marked as ready', () => {
        const store = useTeleportReadyStore()
        store.readyToGo('globalMenuButton')
        expect(store.isReady('globalMenuButton')).toBe(true)
        expect(store.isReady('other')).toBeFalsy()
    })
})
