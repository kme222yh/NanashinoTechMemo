<template>
    <form class="archives-form outer" action="javascript:void(0)">
        <select v-model="param" @change="gotoArchives">
            <option value="">archives</option>
            <option v-for="(archive, index) in archives" :key="index" :value="archive.year+'/'+archive.month">{{archive.year}}-{{archive.month}} ({{archive.post_count}})</option>
        </select>
    </form>
</template>





<style lang="scss">
.archives-form{
    box-sizing: border-box;
    max-width: 320px;
    width: 100%;
    padding: 0 10px;

    select{
        background-color: transparent;
        width: 100%;
        height: 40px;
        padding: 0 10px;
        box-sizing: border-box;
        border: 1px solid;
        border-radius: 5px;

        font-family: 'M PLUS Rounded 1c', sans-serif;
        color: $transparent-gray;
        font-size: 20px;
        line-height: 1.5;

        transition: .5s;

        &:focus{
            outline: none;
            box-shadow: 0 0 0px 3px $transparent-gray;
            border: 1px solid $transparent-gray;
            color: $dark-gray;
        }

    }

    position: relative;
    &::after{
        display: block;
        transition: .5s;

        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);

        width: 40px;
        height: 40px;

        content: "\f0d7";
        font-size: 20px;
        font-weight: 900;
        font-family: "Font Awesome 5 Free";
        color: $transparent-gray;
        text-align: center;
        line-height: 40px;

        pointer-events: none;
    }


    @include desktop{
        &:hover{
            select, &::after{
                color: $dark-gray;
            }
        }
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
            console.log('hogehoge')
            if(this.param == ''){
                if(this.$route.path != '/')
                    this.$router.push('/')
            }
            else
                if(this.$route.path != '/date/'+this.param)
                    this.$router.push('/date/'+this.param)
        },
    }
}
</script>
