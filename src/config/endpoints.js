/*
This file configures endpoints which fetch site-data from.
*/

let Endpoints = {
    articles: '/nanashinotechmemo/v1/articles',
    related: '/yarpp/v1/related',
    popular: '/wordpress-popular-posts/v1/popular-posts',
    globalMenu: '/nanashinotechmemo/v1/menu/global',
    pinnedMenu: '/nanashinotechmemo/v1/menu/pinned',
    footerMenu: '/nanashinotechmemo/v1/menu/footer',
    archives: '/nanashinotechmemo/v1/archives',
    footerWidget: '/nanashinotechmemo/v1/widgets/footer',
}



const homeUrl = document.getElementsByName('home_url')[0].content;
const wpApiPrefix = '/wp-json';
for (const key of Object.keys(Endpoints)) {
    Endpoints[key] = homeUrl + wpApiPrefix + Endpoints[key];
}
export default Endpoints
