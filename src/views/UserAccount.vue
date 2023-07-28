<template>
    <div class="userAccount">
        <div v-if="LoginBox">
            <Login @switchSignIn="LoginBox=!LoginBox"></Login>
        </div>
        <div v-else>
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
    .userAccount{
        width: 100vw;
        height: 100vh;
        background: url(../assets/7.jpg);
        background-origin: border-box;
        background-size: cover;
    }
</style>