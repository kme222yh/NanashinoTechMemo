/*
This file configures endpoints which fetch site-data from.
*/

let Endpoints = {
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
    wppIncrement: '/wordpress-popular-posts/v1/popular-posts',
}


let OuterEndpoints = {
    mailerSend: 'https://mailer.reuhul.org',
    mailerIssueToken: 'https://mailer.reuhul.org/ppapi/ppapi/issue_token',
}
if(import.meta.env.DEV){
    OuterEndpoints.mailerSend = 'http://127.0.0.1:8001';
    OuterEndpoints.mailerIssueToken = 'http://127.0.0.1:8001/ppapi/ppapi/issue_token';
}



const homeUrl = document.getElementsByName('home_url')[0].content;
const wpApiPrefix = '/wp-json';
// const reg = /^(http|https):\/\/.+/g;
for (const key of Object.keys(Endpoints)) {
    // if(!reg.test(Endpoints[key])){
        Endpoints[key] = homeUrl + wpApiPrefix + Endpoints[key];
    // }
}
Object.assign(Endpoints, OuterEndpoints)
// console.log(Endpoints)
export default Endpoints
