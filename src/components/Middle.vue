<template>
    <div class="middleController bg-gray-800 p-3">
        
        <Stories></Stories>

        <div class="mt-3 bg-gray-600 px-3 py-2 border rounded-md border-none box-border">
            <div class="first flex">
                <img :src="photoUrl" alt="" width="50px">
                <input type="text" :placeholder="`What are you thinking?...${profileName}`" v-model="post" @keypress.enter="postData">
            </div>
            <div class="createController flex justify-between px-2 mt-2">
                <div class="create flex items-center cursor-pointer">
                    <font-awesome-icon icon="fa-solid fa-video" class="text-green-400 text-md md:text-xl" />
                    <span class="ml-1 text-gray-300 text-sm md:text-lg">Live</span>
                </div>
                <div class="create flex items-center cursor-pointer">
                    <font-awesome-icon icon="fa-solid fa-image" class="text-orange-400 text-md md:text-xl" />
                    <span class="ml-1 text-gray-300 text-sm md:text-lg">Picture</span>
                </div>
                <div class="create flex items-center cursor-pointer">
                    <font-awesome-icon icon="fa-solid fa-face-smile" class="text-red-400 text-md md:text-xl" />
                    <span class="ml-1 text-gray-300 text-sm md:text-lg">emotion</span>
                </div>
            </div>
        </div>

        <div class="second text-white bg-gray-600 p-2 border rounded-md border-none mt-3" v-for="GetData in GetDatas" :key="GetData.id">
            <div class="flex items-center justify-between mb-3">
                <div class="flex items-center">
                    <img :src="GetData.imagePath" alt="">
                    <span class="ml-1">{{GetData.userName}}</span>
                </div>
                <div class="editController">
                    <font-awesome-icon icon="fa-solid fa-ellipsis-vertical" class=" p-2 border border-none rounded-lg  hover:bg-gray-500  text-violet-400 cursor-pointer" />
                    <ul class="edit">
                        <li class="p-1 cursor-pointer hover:text-green-400"><font-awesome-icon icon="fa-solid fa-trash" @click="Delete(GetData.id)" /></li>
                        <li class="p-1 cursor-pointer hover:text-red-500"><font-awesome-icon icon="fa-solid fa-pen" @click="EditDoc(GetData.id)"/></li>
                    </ul>
                </div>
            </div>
            <p class="mb-2" id="message">{{ GetData.message }}</p>
            <div class="reactBox flex justify-between p-2">
                <div class="react">
                    <font-awesome-icon icon="fa-solid fa-thumbs-up" />
                    <span class="ml-1">Like</span>
                </div>
                <div class="react">
                    <font-awesome-icon icon="fa-solid fa-comment" />
                    <span class="ml-1">Comment</span>
                </div>
                <div class="react">
                    <font-awesome-icon icon="fa-solid fa-share" />
                    <span class="ml-1">Share</span>
                </div>
            </div>
        </div>
    </div>

    
</template>

<script>
import Stories from './Stories'
import { ref } from 'vue'
import { colRef, serverTimestamp, addDoc, onSnapshot, q, doc, deleteDoc, db, updateDoc, auth } from '../firebase/config'
export default {
  components: { Stories },
    setup(){
        const post=ref('');
        const GetDatas=ref([]);

         //add profile image
        let photoUrl=ref('');
        let profileName=ref('');
        let user= auth.currentUser;
        photoUrl.value=user.photoURL;
        profileName.value=user.displayName;



        let postData =async () => {
            await addDoc(colRef,{
                userName:profileName.value,
                imagePath:photoUrl.value,
                message:post.value,
                time:serverTimestamp()
            });
            post.value='';
        }

        onSnapshot(q, (res) => {
            GetDatas.value = res.docs.map((doc) => {
                return { id:doc.id,...doc.data() }
            })
        })

        const Delete =async (id) => {
            const docRef = doc(db,'postMessage', id);
            await deleteDoc(docRef)
        }
        
        const EditDoc =async (id) => {
            let editPost = prompt('Edit Post');
            let docRef = doc(db,'postMessage',id);
            await updateDoc(docRef,{
                message:editPost
            })
        }

        
       

        
        return { post, postData, GetDatas, Delete, EditDoc, photoUrl, profileName }
    }
}
</script>

<style scoped>
   
    .first{
        padding-bottom: 5px;
        border-bottom: 2px solid gray;
    }
    .first img{
        width: 40px;
        height: 40px;
        object-fit: cover;
        border-radius: 50%;
    }
    .first input{
        width: 100%;
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
    .creatController{
        box-sizing: border-box;
    }
    .create{
        background-color: inherit;
        padding: 5px;
        border-radius: 10px;
        box-sizing: border-box;
        transition: all 0.8s ease;
    }
    .create:hover{
        background-color: gray;
    }
    .second img{
        width: 40px;
        height: 40px;
        object-fit: cover;
        border-radius: 50%;
    }
    .second .reactBox{
        border-top: 2px solid gray;
    }
    .second .reactBox .react{
        background-color: inherit;
        padding: 5px 15px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.5s ease;
    }
    .second .reactBox .react:hover{
        background-color: gray;
    }
    .editController{
        position: relative;
    }
    .editController:hover .edit{
        display: block;
        background-color: #3a3b3c;
    }
    .edit{
        position: absolute;
        right: 1px;
        border-radius: 5px;
        display: none;
        padding: 5px 10px;
    }





    /* responsive style */
    @media (max-width:630px) {
        .middleController{
            max-width: 450px;
            margin-right: 20px;
        }
    }
    @media (max-width:600px) {
        .middleController{
            max-width: 100%;
            margin-right: 0;
        }
    }

    @media (max-width:450px) {
        .first input::placeholder{
            font-size: 13px;
        }
    }
</style>