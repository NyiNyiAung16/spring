<template>
    <div class="chatroomMain">
        <div class="first flex justify-between items-center p-3 bg-gray-700">
            <div class="flex gap-3 items-center">
                <img :src="photoUrl" alt="chatimg">
                <span class="text-white">{{ userName }}</span>
            </div>
            <div>
                <span class="text-white text-lg sm:text-xl ">{{ userGmail }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import { auth } from '../firebase/config'
export default {
    setup(){
        let user = auth.currentUser;
        let userName = user.displayName;
        let photoUrl = user.photoURL;
        let userGmail = user.email;

        return { userName, photoUrl, userGmail }
    }
}
</script>

<style scoped>
    .first img{
        width: 40px;
        height: 40px;
        object-fit: cover;
        border-radius: 50%;
    }
    span{
        font-family: 'arima';
    }
    .first{
        border-radius: 5px 5px 0px 0px;
    }
</style>