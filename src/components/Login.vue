<template>
    <div class="gap"></div>
    <form class="bg-blue-300" @submit.prevent="Login">
        <h3 class="text-center text-2xl text-blue-500 font-bold">Login Your Account</h3>
        <label>Email</label>
        <input type="email" required v-model="email">
        <label>Password</label>
        <input type="password" required v-model="password">
        <p class="mt-2 text-center text-red-500 font-semibold">{{error}}</p>
        <button class="font-bold">
            <span ref="span">Login</span>
        </button>
        <p class="text-center text-lg md:text-xl  mt-2 font-bold">If you haven't an account?<span class="text-blue-700 cursor-pointer" @click="switchSignIn"> SignIn</span> here</p>
    </form>
</template>

<script>
import { ref } from 'vue'
import signInAccount from '../composables/signInAccount'
import { useRouter } from 'vue-router'
export default {
    emits:['switchSignIn'],
    setup(props,context){
        let email = ref('');
        let password = ref('');
        const span = ref(null);

        let switchSignIn= () => {
            context.emit('switchSignIn');
        }
        
        let router = useRouter();
        let { error, LoginAccount } = signInAccount();
        let Login =async () => {
            //add spin
            span.value.innerText = '';
            span.value.classList.add('loading');
            const res = await LoginAccount(email.value, password.value);
            //add spin
            span.value.innerText = 'Login';
            span.value.classList.remove('loading');
            email.value = '',
            password.value = ''
            if(res){
                router.push('/');
            }
        }
        
        return { email, password, switchSignIn, Login, error, span };
    }
}
</script>

<style scoped>
    .gap{
        width: 100%;
        height: 100px;
    }
    form{
        max-width: 450px;
        padding: 15px;
        border-radius: 5px;
        box-sizing: border-box;
        margin: auto;
    }
    form h3{
        font-family: 'arima',sans-serif;
    }

    label{
        display: block;
        font-size: 17px;
        margin-bottom: 3px;
        margin-top: 15px;
        color: rgb(45, 107, 118);
        letter-spacing: 1px;
    }
    input{
        width: 100%;
        padding: 7px;
        border: none;
        border-radius: 5px;
    }
    button{
        display: block;
        background-color: rgb(0, 221, 255);
        padding: 7px 10px;
        border: none;
        border-radius: 5px;
        margin:15px auto 0px;
        transition: all 0.6s ease;
    }
    button:hover{
        background-color: rgb(38, 196, 224);
        color: #fff;
    }
    button:active{
        background-color: aquamarine;
    }
    input:focus{
        outline: none;
    }
    form p,button{
        font-family: 'arima';
    }
</style>