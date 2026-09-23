NanashinoTechMemo
-------

This is the original WordPress theme.
It is currently in use [reuhul.org](https://reuhul.org).

* Node.js 22 (see `.nvmrc`)
* Vue.js 3 / Vue Router / Pinia (TypeScript)
* Vite 8
* WordPress 6.5+ / PHP 8.1+

Setup
-------------------

```
npm install
npm run build   # type check + build
```

`dist/` is the theme (including the hidden `dist/.vite/manifest.json`, which the theme needs). Upload it as `wp-content/themes/nanashinotechmemo`.

### Local environment (Docker)

```
cp .env.example .env   # optional
docker compose up -d
npm run build
```

Open http://localhost:8000 and activate the theme.
WordPress / MySQL data is stored under `.docker/`. `dist/` is mounted as `wp-content/themes/nanashinotechmemo`.

WP-CLI: `docker compose run --rm cli wp plugin list`

### When developing

```
npm run dev     # Vite dev server with HMR (needs `npm run build` once for the PHP files)
```

While the dev server is running, `dist/hot` exists and the theme loads scripts from it.
When it stops, the theme falls back to the built files in `dist/`.

To rebuild on every change instead (e.g. when editing PHP under `public/`):

```
npm run watch
```

### Tests

```
npm test                   # unit tests (Vitest + jsdom): helpers, stores, composables, components, router
npm run test:watch
npm run test:integration   # requests to the local WordPress: needs `docker compose up -d` and `npm run build`
```

Integration tests use `http://localhost:8000` by default (override with `WP_BASE_URL`).
They read existing posts/archives from the API, so they do not depend on specific content.
Note: they send one view to WordPress Popular Posts, so the view count of one post increases.

### Other commands

```
npm run type-check
npm run lint
```

TypeScript is kept at 6.0.x because typescript-eslint does not support TypeScript 7 yet.
