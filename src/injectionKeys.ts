import type { InjectionKey, Ref } from 'vue'
import type { AppData } from '@/types/api'

// Layout data fetched once in App.vue and provided to the components.
type AppDataKeys = { [K in keyof AppData]: InjectionKey<Ref<AppData[K]>> }

export const appDataKeys: AppDataKeys = {
    globalMenu: Symbol('globalMenu'),
    footerMenu: Symbol('footerMenu'),
    footerWidget: Symbol('footerWidget'),
    archives: Symbol('archives'),
    categories: Symbol('categories'),
    pinnedArticles: Symbol('pinnedArticles'),
}
