import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import SimpleTrier from '@/helper/simpleTrier'

describe('simpleTrier', () => {
    beforeEach(() => vi.useFakeTimers())
    afterEach(() => vi.useRealTimers())

    it('calls the action once, on the first tick the condition becomes true', () => {
        let ready = false
        const action = vi.fn()
        new SimpleTrier().when(() => ready).do(action).run(100)

        vi.advanceTimersByTime(300)
        expect(action).not.toHaveBeenCalled()

        ready = true
        vi.advanceTimersByTime(100)
        expect(action).toHaveBeenCalledTimes(1)

        vi.advanceTimersByTime(1000)
        expect(action).toHaveBeenCalledTimes(1)
    })

    it('stops checking the condition after the action ran', () => {
        const condition = vi.fn(() => true)
        new SimpleTrier().when(condition).do(() => {}).run(100)

        vi.advanceTimersByTime(1000)
        expect(condition).toHaveBeenCalledTimes(1)
    })

    it('stop() cancels polling, so a condition that would throw is never evaluated again', () => {
        let unmounted = false
        const condition = vi.fn(() => {
            if (unmounted) throw new TypeError('element is gone')
            return false
        })
        const trier = new SimpleTrier().when(condition).do(() => {})
        trier.run(100)
        vi.advanceTimersByTime(200)
        expect(condition).toHaveBeenCalledTimes(2)

        unmounted = true
        trier.stop()
        expect(() => vi.advanceTimersByTime(1000)).not.toThrow()
        expect(condition).toHaveBeenCalledTimes(2)
    })

    it('calling run() twice does not start a second interval', () => {
        const action = vi.fn()
        const trier = new SimpleTrier().when(() => true).do(action)
        trier.run(100)
        trier.run(100)

        vi.advanceTimersByTime(500)
        expect(action).toHaveBeenCalledTimes(1)
    })
})
