<template>
    <div class="gap"></div>
    <form enctype="multipart/form-data" class="bg-gray-800" @submit.prevent="profileSubmit">
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
            <input type="file" id="file" accept="image/*" ref="image" @change="fileImage">
            <div class="fileController flex items-center">
                <font-awesome-icon icon="fa-solid fa-file-export" class="text-xl text-blue-400 hover:text-green-700" />
                <label for="file" ref="label">Choose a file</label>
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
import { storage, uploadBytes , getDownloadURL, ref as storageReference, updateEmail, updateProfile,updateDoc, doc, db, auth} from '../firebase/config'
export default {
    setup(){
        const email=ref('');
        const name=ref('');
        let router = useRouter();
        let ImageLoad = ref('');
        const image = ref(null);
        const label = ref(null);

        let url=ref('https://i.pinimg.com/564x/3f/9f/5b/3f9f5b8c9f31ce16c79d48b9eeda4de0.jpg');
        
        let fileImage =async (e) => {
            const imgPath = image.value.files[0].name;
            label.value.classList.add('text-xs');
            label.value.innerText = imgPath;  
            console.log(user.value)
        };

        let profileSubmit =async () => {
            //store image
            const storageRef = storageReference(storage,`updateProfile/${image.value.files[0].name}`);
            const file = image.value.files[0];
            let res = await uploadBytes(storageRef,file);
            if(res){
                ImageLoad.value = 'Image is Loading! Please wait a moment.'
            }

            let getUrl = await getDownloadURL(storageRef);
            url.value=getUrl;
            if(getUrl){
                ImageLoad.value=''
            }
            //update
            await updateEmail(user.value, email.value);
            await updateProfile(user.value,{
                displayName:name.value,
                photoURL:url.value
            });

            let document = doc(db,'authCollection',auth.currentUser.uid);
            await updateDoc(document,{
                userName:name.value,
                photo:url.value
            });

            name.value='',
            email.value='',
            router.push('/')
        }
        return { name, email, url, fileImage, profileSubmit, ImageLoad, image, label }
    }
}
</script>

<style scoped>
    h3,button{
        font-family: 'arima';
    }
    .gap{
        width: 100%;
        height: 60px;
    }
    form{
        max-width: 500px;
        padding: 20px;
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
        color: rgb(12, 38, 70);
        font-size: 18px;
        margin-left: 10px;
        cursor: pointer;
        transition: all 0.5s linear;
    }
    .fileController label:hover{
        color: rgb(73, 168, 236);
    }
    .first img{
        width: 100px;
        height: 100px;
        border: 1px solid rgb(21, 111, 202);
        border-radius: 50%;
        object-fit: cover;
    }
    .second{
        width: 300px;
    }

</style>