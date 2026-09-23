import { describe, it, expect, vi } from 'vitest'
import { ref, nextTick } from 'vue'
import SimpleWatcher from '@/helper/simpleWatcher'

describe('simpleWatcher', () => {
    it('calls the callback only for the first change of the target', async () => {
        const target = ref(0)
        const callback = vi.fn()
        new SimpleWatcher(target, callback).run()

        target.value = 1
        await nextTick()
        await nextTick()
        expect(callback).toHaveBeenCalledTimes(1)

        target.value = 2
        await nextTick()
        await nextTick()
        expect(callback).toHaveBeenCalledTimes(1)
    })

    it('does not call the callback when the target does not change', async () => {
        const callback = vi.fn()
        new SimpleWatcher(ref(0), callback).run()
        await nextTick()
        expect(callback).not.toHaveBeenCalled()
    })
})
