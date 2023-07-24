<template>
    <div class="smallNav bg-gray-600 py-2  px-4 flex justify-between">
        <router-link to="/">
            <font-awesome-icon icon="fa-solid fa-home" class="text-2xl text-green-300 icon " title="home" />
        </router-link>
        <router-link to="/watch">
            <font-awesome-icon icon="fa-solid fa-tv" class="text-2xl text-blue-300 icon" title="watch" />
        </router-link>
        <router-link to="#">
            <font-awesome-icon icon="fa-solid fa-bell" class="text-2xl text-orange-300 icon" title="bell" />
        </router-link>
        <router-link to="/profile">
            <font-awesome-icon icon="fa-solid fa-user-circle" class="text-2xl text-violet-300 icon" title="profile" />
        </router-link>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
    .smallNav{
        position: sticky;
        top: 0;
        z-index: 1000;
    }
    .icon{
        background-color: inherit;
        padding: 10px;
        border-radius: 5px;
        transition: all .8s ;
    }
    .icon:hover{
        background-color: gray;
    }
</style>