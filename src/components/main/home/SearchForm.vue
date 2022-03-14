<template>
    <div class="searchForm">
        <form class="searchForm-body" @submit.prevent>
            <input class="searchForm-input" type="text" placeholder="search ...">
            <button class="searchForm-button" ><i class="icon fas fa-search"></i></button>
        </form>
    </div>
</template>


<style lang="scss">
.searchForm{
    &-body{
        @include outerBody;
        max-width: 360px;
        height: 240px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    &-input, &-button{
        height: 40px;
        border: 1px solid;
        color: $text-transparent-gray;
        font-size: 20px;
        line-height: 1.5;
        transition: .5s;
        &:hover{color: $text-dark;}
    }
    &-input{
        width: 100%;
        padding: 0 10px;
        border-radius: 5px;
        &:focus{
            box-shadow: 0 0 0px 3px $text-transparent-gray;
            border: 1px solid $text-transparent-gray;
            color: $text-dark;
        }
    }
    &-button{
        width: 40px;
        border-radius: 20px;
        margin-left: 20px;
        .icon{
            display: block;
            text-align: center;
        }
        flex-shrink: 0;
    }
}
</style>


<script setup>
</script>
