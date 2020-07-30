<template>
    <form class="search-form" action="javascript:void(0)">
        <input type="text" v-model="search_word" placeholder="search ...">
        <button @click="doSearch"><i class="fas fa-search"></i></button>
    </form>
</template>





<style lang="scss">
    .search-form{
        // width: 40%;
        margin: 0 auto;
        display: flex;
        justify-content: center;

        input, button{
            display: block;
            background: transparent;
            border-radius: 5px;
            height: 40px;
            padding: 0 10px;
            margin: 0 10px;
            transition: .5s;
            border: 1px solid $text-color-dark;
            @include main-text;
            color: $text-color-dark;
            &:hover{
                color: $text-color-dark-hover;
            }
            &:focus{
                outline: none;
            }
        }
        input{
            width: 250px;
            &:focus{
                box-shadow: 0 0 0px 3px $text-color-dark;
                color: $text-color-dark-hover;
            }
        }
        button{
            min-width: 40px;
            border-radius: 50px;
        }
    }
</style>




<script>
import { mapActions } from 'vuex'

export default {
    data(){return{
        search_word: '',
    }},
    beforeDestroy(){
        this.assignSearchWord({value: ''})
    },
    methods: {
        doSearch(){
            this.assignSearchWord({value: this.search_word})
        },
        ...mapActions('wp', {
            assignSearchWord: 'options/search',
        }),
    },
}
</script>
