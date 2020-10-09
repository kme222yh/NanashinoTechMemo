<template>
    <form class="search-form outer" action="javascript:void(0)">
        <input type="text" v-model="s" placeholder="search ...">
        <button @click="doSearch"><i class="fas fa-search"></i></button>
    </form>
</template>





<style lang="scss">
    .search-form{
        box-sizing: border-box;
        max-width: 320px;
        width: 100%;
        padding: 0 10px;

        display: flex;
        justify-content: space-between;

        input, button{
            background-color: transparent;
            height: 40px;
            padding: 0;
            box-sizing: border-box;
            border: 1px solid;

            font-family: 'M PLUS Rounded 1c', sans-serif;
            color: $transparent-gray;
            font-size: 20px;
            line-height: 1.5;

            transition: .5s;

            &:focus{
                outline: none;
            }

            @include desktop{
                &:hover{
                    color: $dark-gray;
                }
            }
        }

        input{
            max-width: 240px;
            width: calc(100% - 50px);
            padding: 0 10px;
            border-radius: 5px;

            &:focus{
                box-shadow: 0 0 0px 3px $transparent-gray;
                border: 1px solid $transparent-gray;
                color: $dark-gray;
            }
        }

        button{
            width: 40px;
            border-radius: 20px;
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
