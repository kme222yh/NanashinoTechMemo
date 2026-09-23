NanashinoTechMemo
-------

This is the original WordPress theme.
It is currently in use [reuhul.org](https://reuhul.org).

* Node.js 22 (see `.nvmrc`)
* Vue.js 3 / Vue Router / Pinia
* Vite 8
* WordPress 6.5+ / PHP 8.1+

Setup
-------------------

```
npm install
npm run build
```

`dist/` is the theme. Upload it as `wp-content/themes/nanashinotechmemo`.

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

### Other commands

```
npm run lint
```
