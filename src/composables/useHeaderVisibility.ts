import { ref, computed, onMounted, onUnmounted } from 'vue'
import valuables from '@/assets/sass/exports.module.scss'

// Header appears after scrolling this far.
export const SHOW_AFTER_Y = 600
// On tablet/mobile the header hides when scrolling down more than this ...
export const HIDE_SCROLL_DELTA = 10
// ... and shows again when scrolling up more than this.
export const SHOW_SCROLL_DELTA = 20

export const tabletMaxWidth = Number(String(valuables.breakpointsTablet).replace(/[^0-9]/g, ''))

/**
 * Tracks the scroll direction relative to the position where it last changed.
 * Small movements under the thresholds are ignored.
 */
export interface ScrollDirection {
    anchorY: number
    visible: boolean
}

export function nextScrollDirection({ anchorY, visible }: ScrollDirection, y: number): ScrollDirection {
    const scrolled = y - anchorY
    if (scrolled > HIDE_SCROLL_DELTA) return { anchorY: y, visible: false }
    if (scrolled < -SHOW_SCROLL_DELTA) return { anchorY: y, visible: true }
    return { anchorY, visible }
}

export function isHeaderVisible({ width, y, menuOpened, visibleByScrolling }: {
    width: number
    y: number
    menuOpened: boolean
    visibleByScrolling: boolean
}): boolean {
    const scrolledEnough = y > SHOW_AFTER_Y
    if (width > tabletMaxWidth) {
        return scrolledEnough
    }
    return (menuOpened || scrolledEnough) && visibleByScrolling
}

export function shouldTeleportGlobalNav(width: number): boolean {
    return width < tabletMaxWidth
}

export default function useHeaderVisibility(isMenuOpened: () => boolean) {
    const width = ref(window.innerWidth)
    const y = ref(window.scrollY)
    const direction = ref<ScrollDirection>({ anchorY: window.scrollY, visible: false })

    let frame: number | null = null
    const update = () => {
        frame = null
        width.value = window.innerWidth
        y.value = window.scrollY
        direction.value = nextScrollDirection(direction.value, window.scrollY)
    }
    // at most once per animation frame
    const onChange = () => {
        if (frame === null) frame = requestAnimationFrame(update)
    }

    onMounted(() => {
        window.addEventListener('scroll', onChange, { passive: true })
        window.addEventListener('resize', onChange, { passive: true })
    })
    onUnmounted(() => {
        window.removeEventListener('scroll', onChange)
        window.removeEventListener('resize', onChange)
        if (frame !== null) cancelAnimationFrame(frame)
    })

    const visible = computed(() => isHeaderVisible({
        width: width.value,
        y: y.value,
        menuOpened: isMenuOpened(),
        visibleByScrolling: direction.value.visible,
    }))
    const teleportGlobalNav = computed(() => shouldTeleportGlobalNav(width.value))

    return { visible, teleportGlobalNav }
}
