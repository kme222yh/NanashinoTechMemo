let wpJavascriptDependency = [
    "https://platform.twitter.com/widgets.js",
    "/wp-content/plugins/highlighting-code-block/assets/js/prism.js?ver=1.2.1",
    "/wp-content/plugins/highlighting-code-block/build/js/hcb_script.js?ver=1.2.1",
    // "/wp-content/plugins/wordpress-popular-posts/assets/js/wpp.min.js?ver=5.5.1",
];


const homeUrl = document.getElementsByName('home_url')[0].content;
for(const idx in wpJavascriptDependency){
    const reg = /^(http|https):\/\/.+/g;
    if(!reg.test(wpJavascriptDependency[idx])){
        wpJavascriptDependency[idx] = homeUrl + wpJavascriptDependency[idx];
    }
}


const $body = document.body;
const scriptClass = 'ailnsevh39yrt279m343r2734f9enr3y49ynvt29n4';
const loadScripts = ()=>{
    for(const src of wpJavascriptDependency){
        const $script =document.createElement('script')
        $script.src = src;
        $script.type = "text/javascript";
        $script.id = scriptClass;
        $body.appendChild($script);
    }
    document.dispatchEvent((new Event('DOMContentLoaded')));
}
const unLoadScript = ()=>{
    const $scripts = document.querySelectorAll('script#'+scriptClass);
    for(const $script of $scripts){
        $body.removeChild($script);
    }
}


export {
    wpJavascriptDependency,
    loadScripts,
    unLoadScript
}
