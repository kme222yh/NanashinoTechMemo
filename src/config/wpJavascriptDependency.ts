/*
This file configures javascripts which wordpress depend on.
They are (re)loaded after the Vue app renders the related HTML.
*/
import { getMeta } from '@/config/meta'


const JavascriptPaths = {
    twitter: ["https://platform.twitter.com/widgets.js"],
    hcb: ["/wp-content/plugins/highlighting-code-block/assets/js/prism.js","/wp-content/plugins/highlighting-code-block/build/js/hcb_script.js"],
}
export type JavascriptKey = keyof typeof JavascriptPaths


const homeUrl = getMeta('home_url');
const isAbsolute = (url: string) => /^https?:\/\/.+/.test(url);
const Javascripts = Object.fromEntries(
    Object.entries(JavascriptPaths).map(([key, urls]) => [key, urls.map(url => isAbsolute(url) ? url : homeUrl + url)])
) as Record<JavascriptKey, string[]>;


const scriptClass = 'ailnsevh39yrt279m343r2734f9enr3y49ynvt29n4';
const unLoadScript = (key: JavascriptKey)=>{
    const $scripts = document.querySelectorAll<HTMLScriptElement>('script#'+scriptClass);
    for(const src of Javascripts[key]){
        for(const $script of $scripts){
            if($script.src == src){
                $script.remove();
            }
        }
    }
}
const loadScripts = (key: JavascriptKey)=>{
    unLoadScript(key);
    for(const src of Javascripts[key]){
        const $script =document.createElement('script')
        $script.src = src;
        $script.type = "text/javascript";
        $script.id = scriptClass;
        document.body.appendChild($script);
    }
}



export {
    loadScripts,
    unLoadScript
}
