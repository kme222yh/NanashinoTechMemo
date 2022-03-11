/*
This file configures endpoints which fetch site-data from.
*/
let Endpoints = {
    base: '/wp-json/vendor/v1/base',
    article: '/article',
    articleList: '/article-list',
}




let base = document.getElementsByName('home_url')[0].content;
for (let key of Object.keys(Endpoints)) {
    Endpoints[key] = base + Endpoints[key];
}
export default Endpoints
