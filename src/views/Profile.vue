<template>
   
    <div class="formController">
        <div v-if="showUpdate" class="mx-2">
            <UpdateProfile></UpdateProfile>
        </div>
        <div v-if="!showUpdate" class="mx-2">
            <ChangePs></ChangePs>
        </div>
        <div>
            <div v-if="!showUpdate" class="justify-center items-center mt-4 flex flex-col">
                <div class="flex items-center">
                    <p class="text-md sm:text-lg text-blue-500 font-bold">If you want to update profile, click the icon  >></p>
                    <font-awesome-icon icon="fa-solid fa-lock" @click="showUpdate=!showUpdate" class="icon ml-1 cursor-pointer text-2xl sm:text-3xl" />
                </div>
                <p class="mt-3 text-center text-blue-600 sm:text-blue-500 font-bold text-md sm:text-lg">Before your's password change, you need to <span class="underline text-red-400 cursor-pointer" @click="swithToHome">logout</span> first!</p>
            </div>
            <div v-if="showUpdate" class="justify-center items-center mt-4 flex flex-col">
                <div class="flex items-center">
                    <p class="text-md sm:text-lg text-blue-500 font-bold">If you want to change password, click the icon  >></p>
                    <font-awesome-icon icon="fa-solid fa-lock" @click="showUpdate=!showUpdate" class="icon ml-1 cursor-pointer text-2xl sm:text-3xl" />
                </div>
                <p class="mt-3 text-center text-blue-600 sm:text-blue-500 font-bold text-md sm:text-lg">Before your's profile update, you need to <span class="underline text-red-400 cursor-pointer" @click="swithToHome">logout</span> first!</p>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import ChangePs from '../components/ChangePs'
import UpdateProfile from '../components/UpdateProfile'
import { useRouter } from 'vue-router';
export default {
  components: {
    ChangePs, UpdateProfile },
    setup() {
        let showUpdate = ref(false);

        const router = useRouter();
        const swithToHome = () => {
            router.push('/')
        }

        return { showUpdate, swithToHome }
    }
}
</script>

<style scoped>
    @font-face {
        font-family: 'arima';
        src: url(../assets/static/Arima-ExtraLight.ttf);
    }
    .formController{
        width: 100vw;
        height: 100vh;
        /* background: url(../assets/7.jpg); */
        background: linear-gradient(180deg,lightskyblue,lightgreen);
        background-origin: border-box;
        background-size: cover;
    }
    p{
        font-family: 'arima';
    }
    .icon{
        color: rgb(36, 169, 169);
        transition: all 1s linear;
    }
    .icon:hover{
        animation: up-and-down 1s ease forwards;
    }
    @keyframes up-and-down {
        from{transform: translate(0px);}
        to{transform: translate(10px);}
    }
    .icon p{
        display: inline;
    }
</style>