NanashinoTechMemo
-------

This is the original WordPress theme.
It is currently in use [reuhul.org](https://reuhul.org).

* Node.js v16.14.0
* npm 8.3.1
* Vue.js 3.x
* WordPress 5.9

Setup
-------------------

```
npm install
npm run build
```

### When developing

```
cp .env.example .env   # optional
docker compose up -d
npm run watch
```

Open http://localhost:8000 and activate the theme.
WordPress / MySQL data is stored under `.docker/`. `dist/` is mounted as `wp-content/themes/nanashinotechmemo`.


### Command log

```
ln -s {ProjectDir}/dist {ProjectDir}/wordpress/wp-content/themes/NanashinoTechMemo
```
