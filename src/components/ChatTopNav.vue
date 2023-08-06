<template>
    <div class="smallNav bg-gray-800 py-2  px-1  sm:px-4 flex justify-between items-center gap-4">
        <router-link to="/" title="home">
            <font-awesome-icon icon="fa-solid fa-home" class="text-2xl lg:text-3xl text-green-300 icon " />
        </router-link>
        <router-link to="/watch" title="watch">
            <font-awesome-icon icon="fa-solid fa-tv" class="text-2xl lg:text-3xl text-blue-300 icon" />
        </router-link>
        <router-link to="/chatroom" title="chatroom">
            <font-awesome-icon icon="fa-solid fa-users-rectangle" class="text-2xl lg:text-3xl text-orange-300 icon" />
        </router-link>
        <router-link to="/updateProfile" title="updateProfile">
            <font-awesome-icon icon="fa-solid fa-user-circle" class="text-2xl lg:text-3xl text-violet-300 icon" />
        </router-link>
    </div>        
</template>

<script>
export default {

}
</script>

<style scoped>
    .icon{
        background-color: inherit;
        padding: 7px 10px;
        border-radius: 5px;
        transition: all .8s ;
    }
    .icon:hover{
        background-color: gray;
    }
</style>