// Responses of the theme's REST API (public/endpoints/*.php) and plugin APIs used by the theme.

export interface Term {
    id: number
    name: string
    slug: string
}

// GET /nanashinotechmemo/v1/articles
export interface ArticleSummary {
    id: number
    title: string
    date: string
    media: string | null
    categories: Term[]
    tags: Term[]
}

export interface ArticlesResponse {
    per_page: number
    next_page: number | null
    articles: ArticleSummary[]
}

// GET /nanashinotechmemo/v1/article/{id or page slug}
export interface ArticleDetail {
    id: number
    title: string
    content: string
    date: string
    date_modified: string
    media: string | null
    category: string | null
    category_slug?: string | null
    tags: string[]
}

export interface PinnedArticle {
    id: number
    title: string
    date: string
    date_modified: string
    media: string | null
    category: string | null
    category_slug: string | null
}

export interface MenuItem {
    title: string
    url: string
    path: string
    // result of preg_match(): 1 or 0
    same_origin: number
    children?: MenuItem[]
}

// $wpdb->get_results() returns numbers as strings
export interface ArchiveItem {
    year: string
    month: string
    post_count: string
}

// GET /nanashinotechmemo/v1/app
export interface AppData {
    globalMenu: MenuItem[]
    footerMenu: MenuItem[]
    footerWidget: string
    archives: ArchiveItem[]
    categories: Record<string, string>
    pinnedArticles: (PinnedArticle | null)[]
}

// GET /yarpp/v1/related/{id}?_embed=true (WordPress REST post)
export interface RelatedPost {
    id: number
    date: string
    title: { rendered: string }
    _embedded?: {
        'wp:featuredmedia'?: { source_url?: string }[]
        'wp:term'?: (Term & { taxonomy: string })[][]
    }
}
