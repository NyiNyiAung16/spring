<template>
    <div class="gap"></div>
    <form enctype="multipart/form-data" class="bg-gray-800 " @submit.prevent="profileSubmit">
        <div class="first flex items-center gap-7">
            <img :src="url" alt="profileImg">
            <h3 class="text-4xl font-bold text-cyan-400">Update Profile</h3>
        </div>
        <div>
            <label>Name</label>
            <input type="text" required v-model="name">
            <label >Email</label>
            <input type="email" required v-model="email">
            <label>Upload Image</label>
            <input type="file" id="file" accept="image/*" @change="fileImage">
            <div class="fileController flex items-center">
                <font-awesome-icon icon="fa-solid fa-file-export" class="text-xl text-green-400 hover:text-green-700" />
                <label for="file">Choose a file</label>
            </div>
            <p class="text-center text-lg text-blue-500 font-bold py-2">{{ ImageLoad }}</p>
            <button class="font-bold hover:text-black">Update Profile</button>
        </div>
    </form>
</template>

<script>
import { ref } from 'vue'
import user from '../composables/getUser'
import { useRouter } from 'vue-router'
import { storage, uploadBytes , getDownloadURL, ref as storageReference, updateEmail, updateProfile } from '../firebase/config'
export default {
    setup(){
        const email=ref('');
        const name=ref('');
        let router = useRouter();
        let ImageLoad = ref('');

        let url=ref('https://i.pinimg.com/564x/3f/9f/5b/3f9f5b8c9f31ce16c79d48b9eeda4de0.jpg');
        
        let fileImage =async (e) => {
            let res = await uploadBytes(storageReference(storage,`updateProfile/${e.target.files[0].name}`),e.target.files[0]);
            if(res){
                ImageLoad.value = 'Image is Loading! Please wait a moment.'
            }

            let getUrl = await getDownloadURL(storageReference(storage,`updateProfile/${e.target.files[0].name}`));
            url.value=getUrl;
            if(getUrl){
                ImageLoad.value=''
            }
        }

        let profileSubmit =async () => {
            await updateEmail(user.value, email.value);

            await updateProfile(user.value,{
                displayName:name.value,
                photoURL:url.value
            });

            name.value='',
            email.value='',
            router.push('/')
        }
        
        
        return { name, email, url, fileImage, profileSubmit, ImageLoad }
    }
}
</script>

<style scoped>
    h3,button{
        font-family: 'arima';
    }
    .gap{
        width: 100%;
        height: 100px;
    }
    form{
        max-width: 480px;
        padding: 15px;
        border-radius: 5px;
        box-sizing: border-box;
        margin: auto;
    }
    label{
        display: block;
        margin-bottom: 5px;
        margin-top: 13px;
        color: rgb(230, 230, 230);
        letter-spacing: 1px;
    }
    input{
        width: 100%;
        padding: 7px;
        border: none;
        border-radius: 10px;
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
        background-color: rgb(38, 196, 224);
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
        max-width: 200px;
        text-align: center;
        background-color: gray;
        padding:3px 10px;
        border-radius: 5px;
        cursor: pointer;
    }
    .fileController label{
        color: aquamarine;
        font-size: 18px;
        margin-left: 10px;
        cursor: pointer;
    }
    .fileController label:hover{
        color: aqua;
    }
    .first img{
        width: 100px;
        height: 100px;
        border: 1px solid rgb(21, 202, 78);
        border-radius: 50%;
        object-fit: cover;
    }
    .second{
        width: 300px;
    }

</style>