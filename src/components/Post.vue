<template>
    <div class="mt-3 bg-gray-600 px-3 py-2 border rounded-md border-none box-border">
        <div class="first flex justify-between ">
            <img :src="photoUrl" alt="">
            <input type="text" :placeholder="`What are you thinking?...${profileName}`" v-model="post" @keypress.enter="postData" class="w-full" @focus="switchPostModal">
            <div class="create flex items-center cursor-pointer">
                <label for="image" class="ml-1 text-gray-300 text-sm md:text-lg cursor-pointer">
                    <div v-if="!icon">
                        <font-awesome-icon icon="fa-solid fa-image"  class="icon text-orange-400 text-xl mr-1" />
                    </div>
                    <div v-if="icon">
                        <font-awesome-icon icon="fa-solid fa-image" bounce class="icon text-orange-400 text-xl  mr-1" />
                    </div>
                </label> 
                <input type="file" accept="image/*" id="image" class="hidden" @change="postImage">
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import { colRef, serverTimestamp, addDoc ,auth,storage, uploadBytes, getDownloadURL, ref as storageReference } from '../firebase/config'
export default {
    setup(){
        let post = ref('');
        let photoUrl=ref('');
        let profileName=ref('');
        let icon = ref(false);
        let user= auth.currentUser;
        photoUrl.value=user.photoURL;
        profileName.value=user.displayName;

        //post message and image
        let url = ref('');
        let postImage =async(e) => {
                icon.value = true;
                let res = await uploadBytes(storageReference(storage,`postImages/${e.target.files[0].name}`),e.target.files[0]);
                if(res){
                    icon.value = false;
                }
                let getUrl = await getDownloadURL(storageReference(storage,`postImages/${e.target.files[0].name}`))
                url.value = getUrl; 
        };

        let postData =async() => { 
            if(post.value || url.value){
                await addDoc(colRef,{
                userName:profileName.value,
                imagePath:photoUrl.value,
                message:post.value,
                postImage:url.value,
                time:serverTimestamp()
            });
            post.value='';
            url.value = '';
            }  
        };

        const switchPostModal = () => {
            console.log('switch')
        }

        return {post, postData, photoUrl, profileName, postImage, url, icon, switchPostModal, user }
    }
}
</script>

<style scoped>
    .first img{
        width: 40px;
        height: 40px;
        object-fit: cover;
        border-radius: 50%;
    }
    .first input{
        background-color: #3a3b3c;
        border: none;
        border-radius: 15px;
        padding: 0px 10px ;
        margin-left: 5px;
        color: #fff;
    }
    .first input::placeholder{
        color: rgb(206, 206, 206);
    }
    .first input:focus{
        outline: none;
    }
    .create{
        background-color: inherit;
        padding: 5px;
        border-radius: 10px;
        transition: all 0.8s ease;
    }
    .create .icon{
        transition: color 1s ease;
    }
    .create:hover .icon{
        color: lightskyblue;
    }

    @media (max-width:450px) {
        .first input::placeholder{
            font-size: 13px;
        }
        .first img{
            width: 35px;
            height: 30px;
        }
    }
</style>