<template>
   
    <div class="formController">
        <div v-if="!showUpdate" class="mx-2">
            <CreateProfile></CreateProfile>
        </div>
        <div v-if="showUpdate" class="mx-2">
            <ChangePs></ChangePs>
        </div>
        <div class="icon items-center mt-4 mx-2">
            <p class="text-lg text-blue-500 font-bold">If you want to change password, click the icon.</p>
            <font-awesome-icon icon="fa-solid fa-lock" size="2xl" @click="showUpdate=!showUpdate" class="mb-2 cursor-pointer" />
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
        display: flex;
        justify-content: center;
        gap: 10px;
        color: rgb(36, 169, 169);
        transition: all 1s linear;
    }
    .icon:hover{
        color: rgb(0, 255, 183);
    }
</style>