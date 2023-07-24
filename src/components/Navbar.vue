<template>
  <div class="Navbar flex shadow-xl justify-between items-center px-3 py-2 bg-gray-800">
        <div class="flex gap-4 items-center">
            <h3 class="text-2xl text-white font-bold ">Facebook</h3>
            <font-awesome-icon icon="fa-solid fa-search" size="lg" class="inline md:hidden text-gray-300 icon"/>
        </div>
        <div class="searchBar bg-gray-500 p-2 border border-none rounded-lg hidden md:inline">
            <font-awesome-icon icon="fa-solid fa-search" size="lg" class="text-gray-300"/>
            <input type="text" class="bg-inherit ml-2 " placeholder="search in facebook" v-model="searchFilter">
        </div>
        <div class="text-gray-300 cursor-pointer ">
            <font-awesome-icon icon="fa-brands fa-facebook-messenger" size="xl" class="mr-4 icon text-white" />
            <font-awesome-icon icon="fa-solid fa-bell" size="xl" class="mr-4 icon text-white" />
            <font-awesome-icon icon="fa-solid fa-user-circle" size="xl" class="icon text-white" />
        </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
    setup(){
        const searchFilter=ref('');


        return { searchFilter }
    }
}
</script>

<style scoped>
    .Navbar{
        border-bottom: 1px solid gray;
        position: sticky;
        top: 0;
        z-index: 1000;
    }
    .searchBar{
        width: 350px;
    }
    input{
        color: white;
    }
    .icon{
        padding: 10px;
        border-radius: 50%;
        background-color: rgb(81, 78, 78);
        transition: all 0.6s;
    }
    .icon:hover{
        background-color: gray;
    }

    input:focus{
        outline: none;
    }
    ::placeholder{
        font-size: 1.1rem;
    }
</style>