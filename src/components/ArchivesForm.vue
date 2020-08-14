<template>
    <form class="archives-form outer inner" action="javascript:void(0)">
        <select v-model="param">
            <option value="">archives</option>
            <option v-for="(archive, index) in archives" :key="index" :value="archive.year+'/'+archive.month">{{archive.year}}-{{archive.month}} ({{archive.post_count}})</option>
        </select>
        <button @click="gotoArchives">go</button>
    </form>
</template>





<style lang="scss">
    .archives-form{
        display: flex;
        justify-content: center;

        select, button{
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
        select{
            width: 250px;
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
import { mapState } from 'vuex'

export default {
    data(){return{
        param: '',
    }},
    computed: mapState({
        archives: state=>state.archives,
    }),
    methods: {
        gotoArchives(){
            if(this.param == ''){
                if(this.$route.path != '/')
                    this.$router.push('/')
            }
            else
                if(this.$route.path != '/date/'+this.param+'/')
                    this.$router.push('/date/'+this.param+'/')
        },
    }
}
</script>
