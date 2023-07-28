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
            <div class="profileContainer inline">
                <font-awesome-icon icon="fa-solid fa-user-circle" size="xl" class="icon text-white" />
                
                <ul class="profileHover">
                    <li class="hover:text-green-200 hover:underline">Profile</li>
                    <button class="border border-none p-1 rounded-md hover:text-orange-300 hover:bg-gray-400" @click="Logout">Logout</button>
                </ul>
            </div>
            
        </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import logout from '../composables/logout'
export default {
    setup(){
        const searchFilter=ref('');

        const Logout = () => {
             logout();
        }

        return { searchFilter, Logout }
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
    .profileContainer{
        position: relative;
        padding: 10px 0px;
    }
    .profileContainer:hover .profileHover{
        display: block;
    }
    .profileHover{
        max-width: 100px;
        position: absolute;
        right: 0;
        display: none;
        border-radius: 10px;
        padding: 5px 15px;
        background-color: gray;
        text-align: center;
    }







    ::placeholder{
        font-size: 1.1rem;
    }

</style>