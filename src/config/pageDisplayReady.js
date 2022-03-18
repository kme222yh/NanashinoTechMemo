import ep from '@/config/endpoints'
import { useAjaxReadyStore } from '@/stores/ajaxReady'
import { computed } from 'vue'

export default function useDisplayReady(){
    const ars = useAjaxReadyStore();

    const doesReadyHomeView = computed(()=>{return ars.isReady(ep.app) && ars.isReady(ep.articles);});
    const doesReadyArticleView = computed(()=>{return ars.isReady(ep.app) && ars.isReady(ep.article);});
    const doesReadyOtherView = computed(()=>{return ars.isReady(ep.app) && ars.isReady('otherView');});
    const doesAppReady = computed(()=>{return doesReadyHomeView.value || doesReadyArticleView.value || doesReadyOtherView.value})
    const refresh = ars.refresh;

    return {
        doesReadyHomeView,
        doesReadyArticleView,
        doesReadyOtherView,
        doesAppReady,
        refresh
    }
}
