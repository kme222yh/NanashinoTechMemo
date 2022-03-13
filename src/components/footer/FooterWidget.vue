<template>
    <div class="footerWidget">
        <ul class="footerWidget-body" v-html="widget"></ul>
    </div>
</template>


<style lang="scss">
.footerWidget{
    padding: 40px 0 55px;
    background-color: $bg-white;
    color: $bg-transparent-gray;
    &-body{
        @include outerBody;
        display: flex;
        justify-content: space-between;
    }

    .widget_block{
        max-width: $footer-widget-max-width;
        width: 31%;
        h2{
            text-align: center;
            margin-bottom: 20px;
            &::after{
                display: block;
                margin: 0 auto;
                margin-top: 10px;
                height: 9px;
                max-width : $footer-widget-max-width;
                width: 100%;
                border-radius: 10px;
                background-color: $bg-transparent-gray;
                content: '';
            }
        }
    }

    @include tablet{
        padding: 30px 0 40px;
        &-body{
            display: block;
        }

        .widget_block{
            max-width: 100%;
            width: 100%;
            margin-bottom: 50px;
            &:last-child{
                margin-bottom: 0;
            }
            .wp-block-group__inner-container{
                text-align: center;
            }
        }
    }
}
</style>


<script setup>
import { ref, onMounted } from 'vue'
import Endpoints from '@/config/endpoints'

const widget = ref([]);
onMounted(()=>{
    axios.get(Endpoints.footerWidget).then((res)=>{
        widget.value = res.data;
        console.log(widget);
    })
});
</script>
