// Reads the <meta> tags output by public/index.php.
export function getMeta(name: 'home_url' | 'site-title'): string {
    return document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)?.content ?? ''
}
