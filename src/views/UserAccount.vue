<template>
    <div class="userAccount">
        <div v-if="LoginBox" class="mx-3">
            <Login @switchSignIn="LoginBox = !LoginBox"></Login>
        </div>
        <div v-else class="mx-3">
            <SignIn @switchLogin="LoginBox=!LoginBox"></SignIn>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import Login from '../components/Login'
import SignIn from '../components/SignIn'
export default {
  components: {
    Login, SignIn },
    setup(){
        let LoginBox = ref(true);
        return { LoginBox }
    }
}
</script>

<style>
    @font-face {
        font-family: 'arima';
        src: url(../assets/static/Arima-ExtraLight.ttf);
    }
    .userAccount{
        width: 100vw;
        height: 100vh;
        /* background: url(../assets/7.jpg); */
        background: linear-gradient(
            45deg,
            rgb(126, 192, 218) 53%,
            rgb(38, 88, 94) 0%
        );
        background-size: cover;
    }
</style>