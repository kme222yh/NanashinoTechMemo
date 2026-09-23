/// <reference types="vite/client" />

import type { ArticleDetail } from '@/types/api'

declare global {
    interface Window {
        // set by public/wp_custom/js_valuable.php on preview pages
        wp_preview?: ArticleDetail
        // set by the Highlighting Code Block plugin
        hcbVars?: unknown
    }
}
