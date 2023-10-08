<template>
    <div class="gap"></div>
    <form class="bg-blue-300" @submit.prevent="CreateAccount">
        <div class="first flex items-center justify-evenly">
            <img :src="url" alt="profileImg">
            <h3 class="text-center text-2xl text-blue-500 font-bold ">Create User Account</h3>
        </div>
        <div>
            <label>DisplayName</label>
            <input type="text" required v-model="displayName">
            <label>Email</label>
            <input type="email" required v-model="email">
            <label>Password</label>
            <input type="password" required v-model="password">
            <input type="file" id="file" accept="image/*" ref="image" @change="fileImage">
            <div class="fileController flex items-center bg-blue-400">
                <font-awesome-icon icon="fa-solid fa-file-export" class="text-xl text-green-400 hover:text-green-700 duration-300" />
                <label for="file" class="file font-bold" ref="label">Choose a file</label>
            </div>
            <p class="text-center text-lg text-blue-500 font-bold py-2">{{ imageLoading }}</p>
            <p class="text-center text-red-500 font-bold mt-2">{{error}}</p>
            <button class="signIn font-bold" type="submit" style="width: 80px;">
                <span ref="span" class="mx-auto">SignIn</span>
            </button>
            <p class="text-center text-md md:text-xl mt-2 font-bold">If you have already an account?<span class="text-blue-700 cursor-pointer" @click="switchLogin"> Login</span> here</p>
        </div>
    </form>
</template>

<script>
import { ref } from 'vue'
import createUser from '../composables/createUser'
import { useRouter } from 'vue-router'
import { storage, uploadBytes , getDownloadURL, ref as storageReference, addDoc,db,collection, serverTimestamp, auth, doc, setDoc } from '../firebase/config'
export default {
    emits:['switchLogin'],
    setup(props,context){
        let displayName = ref('');
        let email = ref('');
        let password = ref('');
        const image = ref(null);
        const label = ref(null);
        const span = ref(null);

        let switchLogin = () => {
            context.emit('switchLogin');
        };

        //profile image
        let url=ref('https://i.pinimg.com/564x/3f/9f/5b/3f9f5b8c9f31ce16c79d48b9eeda4de0.jpg');
        let imageLoading = ref('');
        let fileImage = () => {
            const imgPath = image.value.files[0].name;
            label.value.classList.add('text-xs');
            label.value.innerText = imgPath;
        };

        //submit siginform
        let router = useRouter();
        let {error,SignIn} = createUser();
        let CreateAccount = async() => {
            //add spin
            span.value.innerText = '';
            span.value.classList.add('loading');
            //image
            const storageRef = storageReference(storage,`profileImages/${image.value.files[0].name}`);
            const file = image.value.files[0];
            let res=await uploadBytes(storageRef,file);
            if(res){
                imageLoading.value="Image is Loading! Please wait a moment";
            }
            let getUrl = await getDownloadURL(storageRef);
            url.value=getUrl;
            if(getUrl){
                imageLoading.value='';
            }
            //signin
            let response = await SignIn(email.value,password.value,displayName.value,url.value);
            if(response){
                await setDoc(doc(db,'authCollection',auth.currentUser.uid),{
                userName:displayName.value,
                photo:url.value,
                time:serverTimestamp()
            });
            }
            //remvoe spin
            span.value.innerText = 'SignIn';
            span.value.classList.remove('loading');
            email.value='',
            password.value='',
            displayName.value='',
            router.push('/')
        };

        if(error){
            setTimeout(() => {
                error.value = ''
            }, 2000);
        }
        return { displayName, email, password, switchLogin, CreateAccount, error, url, fileImage, imageLoading, image, label, span };
    }
}
</script>

<style scoped>
    .gap{
        width: 100%;
        height: 80px;
    }
    form{
        max-width: 480px;
        padding: 15px;
        border-radius: 5px;
        box-sizing: border-box;
        margin: auto;
    }
    form h3,p,button,.file{
        font-family: 'arima',sans-serif;
    }

    label{
        display: block;
        margin-bottom: 3px;
        margin-top: 15px;
        color: rgb(38, 89, 119);
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
        background-color: aqua;
        padding: 7px 10px;
        border: none;
        border-radius: 5px;
        margin:10px auto 0px;
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


    input[type="file"]{
        display: none;
    }

    .fileController {
        /* max-width: 200px; */
        padding:1px 10px;
        margin-top: 10px;
        border-radius: 5px;
        cursor: pointer;
    }
    .fileController label{
        color: aquamarine;
        font-size: 18px;
        margin-left: 10px;
        margin-bottom: 7px;
        cursor: pointer;
    }
    .fileController label:hover{
        color: aqua;
    }
    .first img{
        width: 100px;
        height: 100px;
        border-radius: 50%;
        object-fit: cover;
    }
</style>