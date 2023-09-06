<template>
    <div class="middleController bg-gray-800 p-3">
        
        <Stories></Stories>
        <Post></Post>
        
        <div class="second text-white bg-gray-600 border rounded-md border-none mt-3" v-for="GetData in GetDatas" :key="GetData.id">
            <div class="flex p-2 items-center justify-between mb-3">
                <div class="profile flex items-center">
                    <img :src="GetData.imagePath" alt="">
                    <span class="ml-1">{{GetData.userName}}</span>
                </div>
                <div class="editController">
                    <div v-if="GetData.userName===user.displayName">
                        <font-awesome-icon icon="fa-solid fa-ellipsis-vertical" class=" p-2 border border-none rounded-lg  hover:bg-gray-500  text-violet-400 cursor-pointer" />
                    </div>
                    <ul class="edit">
                        <li class="p-1 cursor-pointer hover:text-green-400"><font-awesome-icon icon="fa-solid fa-trash" @click="Delete(GetData.id,GetData.userName)" /></li>
                        <li class="p-1 cursor-pointer hover:text-red-500"><font-awesome-icon icon="fa-solid fa-pen" @click="EditDoc(GetData.id,GetData.userName)"/></li>
                    </ul>
                </div>
            </div>
            <p class="mb-2 px-2" id="message">{{ GetData.message }}</p>
            <div v-if="GetData.postImage" class="postImage mb-3">
                <img :src="GetData.postImage" alt="">
            </div>  
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
import Stories from './Stories.vue'
import Post from './Post.vue'
import { ref } from 'vue'
import { onSnapshot, q, doc, deleteDoc, db, updateDoc, auth } from '../firebase/config'
export default {
  components: { Stories,Post },
    setup(){
        const GetDatas=ref([]);

         //add profile image
        let photoUrl=ref('');
        let profileName=ref('');
        let user= auth.currentUser;
        photoUrl.value=user.photoURL;
        profileName.value=user.displayName;
       

        onSnapshot(q, (res) => {
            GetDatas.value = res.docs.map((doc) => {
                return { id:doc.id,...doc.data() }
            })
        })
        
        
        const Delete =async (id,name) => {
            if(user.displayName===name){
                const docRef = doc(db,'postMessage', id);
                await deleteDoc(docRef)
            }
        }
        
        const EditDoc =async (id,name) => {
            let docRef = doc(db,'postMessage',id);
            if(user.displayName===name){
                let editPost = prompt('Edit Post');
                if(editPost){
                    await updateDoc(docRef,{
                    message:editPost
                    })
                }
            }
        }

        
        return { GetDatas, Delete, EditDoc, photoUrl, profileName, user }
    }
}
</script>

<style scoped>
    .second .profile img{
        width: 40px;
        height: 40px;
        object-fit: cover;
        border-radius: 50%;
    }
    .postImage img{
        width: 100%;
        max-height: 600px;
        object-fit: cover;
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
    .second .reactBox .react:active{
        background-color: rgb(46, 46, 46);
        color: #1bff58;
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
</style>