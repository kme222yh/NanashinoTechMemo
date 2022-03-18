<template>
    <main class="notfoundView">
        <div class="notfoundView-body">
            <p>お探しのコンテンツは見つかりませんでした</p>
            <p>。・゜・(ノД`)・゜・。</p>
        </div>
    </main>
</template>


<style lang="scss">
.notfoundView{
    &-body{
        height: 70vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: $text-transparent-gray;
    }
}
</style>


<script setup>
import { onMounted } from 'vue'
import { useAjaxReadyStore } from '@/stores/ajaxReady'
const ajaxReadyStore = useAjaxReadyStore();
onMounted(ajaxReadyStore.readyOther);
</script>
