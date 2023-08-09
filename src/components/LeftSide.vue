<template>
    <div class="leftSide bg-gray-800 text-gray-400 p-2 flex flex-col items-center sm:items-start">
        <div class="left flex flex-col ">
            <router-link to="/" >
                <div class="home">
                    <font-awesome-icon icon="fa-solid fa-home"   class="text-blue-500 text-3xl sm:text-2xl ml-1" /> <span class="hidden sm:inline">Home</span>
                </div>
            </router-link>

            <router-link to="/watch" >
                <div class="home">
                    <font-awesome-icon icon="fa-solid fa-tv"  class="text-orange-500 text-3xl sm:text-2xl ml-1" /> <span class="hidden sm:inline">Watch</span>
                </div>
            </router-link>

            <router-link to="/chatroom">
                <div class="home">
                    <font-awesome-icon icon="fa-solid fa-users-rectangle"  class="text-red-500 text-3xl sm:text-2xl ml-1" /> <span class="hidden sm:inline">Chatroom</span>
                </div>
            </router-link>

            <router-link to="/updateProfile" >
                <div class="home">
                    <font-awesome-icon icon="fa-solid fa-user-circle" class="text-green-500 text-3xl sm:text-2xl ml-1" /> <span class="hidden sm:inline">Update Profile</span>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
    .leftSide{
        position: relative;
    }
    .left{
        position: fixed;
    }
    .leftSide a:not(:last-child){
        margin-bottom: 20px;
    }
    .leftSide a.router-link-active{
        border-left: 4px solid rgb(22, 123, 205);
    }
    .home{
        background-color: inherit;
        padding: 5px;
        margin-left: 5px;
        border-radius: 5px;
        color: white;
    }
    .home:hover{
        background-color: gray;
    }
    @media (max-width:600px) {
        .left{
            width: 100%;
            flex-direction: row;
            justify-content: space-between;
            position: sticky;
            top: 0;
        }  
        .leftSide a.router-link-active{
            border: none;
        }
        .leftSide a:not(:last-child){
            margin-bottom: 0px;
    }
  }
</style>