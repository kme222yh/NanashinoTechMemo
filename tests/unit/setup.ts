// public/index.php outputs these meta tags and some modules read them at import time.
const metas = {
    home_url: 'http://example.test',
    'site-title': 'Test Site',
}
for (const [name, content] of Object.entries(metas)) {
    const meta = document.createElement('meta')
    meta.name = name
    meta.content = content
    document.head.appendChild(meta)
}
