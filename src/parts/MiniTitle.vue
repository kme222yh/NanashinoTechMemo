<template>
    <component class="minititle" :is="tag"><slot/></component>
</template>



<style lang="scss">
    .minititle{
        @include MiniTitle;
    }
</style>



<script>
    export default {
        props: {
            htag_level: {
                type: Number,
                default: 2,
            }
        },
        computed: {
            tag(){
                return `h${this.htag_level}`
            }
        }
    }
</script>
