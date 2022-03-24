/*
This file configures javascripts which wordpress depend on.
*/


let Javascripts = {
    twitter: ["https://platform.twitter.com/widgets.js"],
    hcb: ["/wp-content/plugins/highlighting-code-block/assets/js/prism.js?ver=1.2.1","/wp-content/plugins/highlighting-code-block/build/js/hcb_script.js?ver=1.2.1"],
    // wpp: ["/wp-content/plugins/wordpress-popular-posts/assets/js/wpp.min.js?ver=5.5.1"],
}



const homeUrl = document.getElementsByName('home_url')[0].content;
const reg = /^(http|https):\/\/.+/g;
for(const key of Object.keys(Javascripts)){
    for(const idx in Javascripts[key]){
        if(!reg.test(Javascripts[key][idx])){
            Javascripts[key][idx] = homeUrl + Javascripts[key][idx];
        }
    }
}


const $body = document.body;
const scriptClass = 'ailnsevh39yrt279m343r2734f9enr3y49ynvt29n4';
const unLoadScript = (key)=>{
    const $scripts = document.querySelectorAll('script#'+scriptClass);
    for(const src of Javascripts[key]){
        for(const $script of $scripts){
            if($script.src == src){
                $body.removeChild($script);
            }
        }
    }
}
const loadScripts = (key)=>{
    unLoadScript(key);
    for(const src of Javascripts[key]){
        const $script =document.createElement('script')
        $script.src = src;
        $script.type = "text/javascript";
        $script.id = scriptClass;
        $body.appendChild($script);
    }
}



export {
    loadScripts,
    unLoadScript
}
