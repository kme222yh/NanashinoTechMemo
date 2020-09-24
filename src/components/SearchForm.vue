<template>
    <form class="search-form outer inner" action="javascript:void(0)">
        <input type="text" v-model="s" placeholder="search ...">
        <button @click="doSearch"><font-awesome-icon icon="search"/></button>
    </form>
</template>





<style lang="scss">
    .search-form{
        display: flex;
        justify-content: center;

        input, button{
            display: block;
            background: transparent;
            font-family: 'M PLUS Rounded 1c', sans-serif;
            color: $text-color-dark;
            background-color: $bg-color;

            line-height: 2;
            font-size: 15px;
            @include tablet{
                font-size: 18px;
            }
            @include desktop{
                font-size: 20px;
            }
            border-radius: 5px;
            height: 40px;
            padding: 0 10px;
            margin: 0 10px;
            transition: .5s;
            border: 1px solid;
            color: $transparent-gray;
            &:hover{
                color: $dark-gray;
            }
            &:focus{
                outline: none;
            }
        }
        input{
            width: 250px;
            box-sizing: border-box;
            &:focus{
                box-shadow: 0 0 0px 3px $transparent-gray;
                border: 1px solid $transparent-gray;
                color: $dark-gray;
            }
        }
        button{
            min-width: 40px;
            border-radius: 50px;
        }
    }
</style>




<script>
export default {
    data(){return{
        s: '',
        s_origin: '',
    }},
    created(){
        this.initSearchParam()
    },
    watch: {
        $route(){this.initSearchParam()},
    },
    methods: {
        doSearch(){
            if(this.s == this.s_origin)
                return
            else if(this.s == '')
                this.$router.push({name: 'Home'})
            else
                this.$router.push({name: 'Search', query: {s: this.s}})
        },

        initSearchParam(){
            if(this.$route.query.s != undefined){
                this.s = this.$route.query.s
                this.s_origin = this.$route.query.s
            }
            else{
                this.s = ''
                this.s_origin = ''
            }
        }
    },
}
</script>
