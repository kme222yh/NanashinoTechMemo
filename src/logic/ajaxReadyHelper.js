// page state managiment watching ajax state
// This file depend on @/config/endpoints.js and @/stores/ajaxReady.js
import Endpoints from '@/config/endpoints'
import { useAjaxReadyStore } from '@/stores/ajaxReady'
import { computed } from 'vue'

export default function useAjaxReadyHelper(){
    const ajaxReadyStore = useAjaxReadyStore();
    const doesReadyHome = computed(()=>{
        return ajaxReadyStore.isReady(Endpoints.articles) && ajaxReadyStore.isReady(Endpoints.pinnedMenu);
    });
    const refresh = ()=>{
        ajaxReadyStore.refreshReady();
    }

    return {
        doesReadyHome,
        refresh,
    }
}
