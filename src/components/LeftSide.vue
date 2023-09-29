<template>
    <div class="leftSide bg-gray-800 text-gray-400 p-2 flex flex-col items-center md:items-start m-0">
        <div class="left flex flex-col items-center md:items-start">
            <router-link to="/" >
                <div class="home">
                    <font-awesome-icon icon="fa-solid fa-home"   class="text-blue-500 text-2xl" /> <span class="hidden md:inline">Home</span>
                </div>
            </router-link>

            <router-link to="/watch" >
                <div class="home">
                    <font-awesome-icon icon="fa-solid fa-tv"  class="text-orange-500 text-2xl" /> <span class="hidden md:inline">Watch</span>
                </div>
            </router-link>

            <router-link to="/chatroom">
                <div class="home">
                    <font-awesome-icon icon="fa-solid fa-users-rectangle"  class="text-red-500 text-2xl" /> <span class="hidden md:inline">Chatroom</span>
                </div>
            </router-link>

            <router-link to="/updateProfile" >
                <div class="home">
                    <font-awesome-icon icon="fa-solid fa-user-circle" class="text-green-500 text-2xl" /> <span class="hidden md:inline">Update Profile</span>
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
        padding: 7px;
        border-radius: 5px;
        color: white;
    }
    .home:hover{
        background-color: rgb(59, 61, 85);
    }
    @media (max-width:600px) {
        .leftSide{
            height: 65px;
        }
        .left{
            width: 100%;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            position: sticky;
            top: 0;
        }  
        .leftSide a:not(:last-child){
            margin-bottom: 0px;
        }
        .leftSide a.router-link-active{
            border-bottom: 3px solid rgb(22, 123, 205);
            border-left: none;
        }
    }
</style>