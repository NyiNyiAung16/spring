<template>
   
    <div class="formController">
        <div v-if="!showUpdate" class="mx-2">
            <CreateProfile></CreateProfile>
        </div>
        <div v-if="showUpdate" class="mx-2">
            <ChangePs></ChangePs>
        </div>
        <div class=" icon text-center mt-4 mx-2">
            <p class="text-md sm:text-lg text-blue-500 font-bold">If you want to change password, click the icon  >></p>
            <font-awesome-icon icon="fa-solid fa-lock" @click="showUpdate=!showUpdate" class=" ml-1 cursor-pointer text-2xl sm:text-3xl" />
        </div>
        <div class="text-center text-blue-600 sm:text-blue-400 font-bold text-md sm:text-lg mt-1">
            <p>Before your's profile update and change password , you need to <span class="underline text-red-400 ">logout</span> first!</p>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import ChangePs from '../components/ChangePs'
import CreateProfile from '../components/createProfile'
export default {
  components: {
    ChangePs, CreateProfile },
    setup() {
        let showUpdate = ref(false);

        return { showUpdate }
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
        background: url(../assets/7.jpg);
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
        color: rgb(0, 255, 183);
    }
    .icon p{
        display: inline;
    }
</style>