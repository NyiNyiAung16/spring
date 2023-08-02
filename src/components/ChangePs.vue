<template>
    <div>
        <div class="gap"></div>
        <form class="bg-gray-800" @submit.prevent="update">
            <h3 class="text-center text-blue-400 font-bold text-2xl">Update Password</h3>
            <label>Old Password</label>
            <input type="password" v-model="oldPassword">
            <label>New Password</label>
            <input type="password" required v-model="newPassword">
            <p class="text-lg text-gray-400 mt-2 hover:text-red-400 cursor-pointer" @click="ResetPassword">Reset Password</p>
            <p class="text-md text-green-400">{{reset}}</p>
            <button class="font-bold">Update</button>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { updatePassword, sendPasswordResetEmail, auth  } from '../firebase/config'
export default {
    setup(){
        const oldPassword = ref('');
        const newPassword = ref('');
        const reset = ref('');
        let router = useRouter();
        let user = auth.currentUser;
        
        let update =async () => {
            let res = await updatePassword(user, newPassword.value);
            oldPassword.value='',
            newPassword.value='',
            router.push('/')
        }

            

        //forget password
        let ResetPassword =async () => {
            await sendPasswordResetEmail(auth,user.email);
            reset.value = 'password reset is done';
            setTimeout(()=>{
                reset.value=''
            },2000)
           
        }

        return { oldPassword, newPassword, ResetPassword, update, reset }
    }
}
</script>

<style scoped>
    @font-face {
        font-family: 'arima';
        src: url(../assets/static/Arima-ExtraLight.ttf);
    }
    form{
        max-width: 450px;
        padding: 15px;
        border-radius: 5px;
        box-sizing: border-box;
        margin: auto;
    }
    form h3,button{
        font-family: 'arima';
    }
    label{
        display: block;
        margin-bottom: 5px;
        margin-top: 13px;
        color: rgb(230, 223, 223);
        letter-spacing: 1px;
    }
    input{
        width: 100%;
        padding: 7px;
        border: none;
        border-radius: 7px;
    }
    button{
        display: block;
        background-color: aqua;
        padding: 7px 10px;
        border: none;
        border-radius: 5px;
        margin:7px auto;
        transition: all 0.6s ease;
    }
    button:hover{
        background-color: rgb(24, 124, 141);
        color: white;
    }
    button:active{
        background-color: aquamarine;
    }
    input:focus{
        outline: none;
    }
    .gap{
        width: 100%;
        height: 100px;
    }
</style>