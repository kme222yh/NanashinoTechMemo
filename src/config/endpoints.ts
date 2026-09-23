/*
This file configures endpoints which fetch site-data from.
*/
import { getMeta } from '@/config/meta'

const WpEndpoints = {
    app: '/nanashinotechmemo/v1/app',
    articles: '/nanashinotechmemo/v1/articles',
    article: '/nanashinotechmemo/v1/article',
    categories: '/wp/v2/categories',
    related: '/yarpp/v1/related',
    popular: '/wordpress-popular-posts/v1/popular-posts',
    globalMenu: '/nanashinotechmemo/v1/menu/global',
    pinnedMenu: '/nanashinotechmemo/v1/menu/pinned',
    footerMenu: '/nanashinotechmemo/v1/menu/footer',
    archives: '/nanashinotechmemo/v1/archives',
    footerWidget: '/nanashinotechmemo/v1/widgets/footer',
    wppIncrement: '/wordpress-popular-posts/v2/views',
}


const homeUrl = getMeta('home_url');
const wpApiPrefix = '/wp-json';

const Endpoints = Object.fromEntries(
    Object.entries(WpEndpoints).map(([key, path]) => [key, homeUrl + wpApiPrefix + path])
) as Record<keyof typeof WpEndpoints, string>

export default Endpoints
