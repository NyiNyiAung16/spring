<template>
    <div class="middleController bg-gray-800 p-3 m-0">
        <Stories></Stories>
        <Post></Post>
        <div class="m-0 second text-white bg-gray-600 border rounded-md border-none mt-3" v-for="GetData in GetDatas" :key="GetData.id">
            <div class="flex p-2 items-center justify-between mb-3">
                <div class="profile flex items-center">
                    <img :src="GetData.imagePath" alt="">
                    <span class="ml-1">{{GetData.userName}}</span>
                </div>
                <div class="editController">
                    <div v-if="GetData.userName===user.displayName">
                        <font-awesome-icon icon="fa-solid fa-ellipsis-vertical" class="p-2 border border-none rounded-lg  hover:bg-gray-500  text-violet-400 cursor-pointer" />
                    </div>
                    <ul class="edit">
                        <li class="p-1 cursor-pointer hover:text-green-400">
                            <font-awesome-icon icon="fa-solid fa-trash" @click="Delete(GetData.id,GetData.userName)" />
                        </li>
                        <li class="p-1 cursor-pointer hover:text-red-500">
                            <font-awesome-icon icon="fa-solid fa-pen" @click="EditDoc(GetData.id,GetData.message)"/>
                        </li>
                    </ul>
                </div>
            </div>
            <p class="mb-2 px-2" id="message">{{ GetData.message }}</p>
            <div v-if="GetData.postImage" class="postImage mb-3">
                <img :src="GetData.postImage" alt="">
            </div>  
            <div class="reactBox flex justify-between p-2">
                <div class="react" @click="react($event,`like${GetData.id}`,'text-blue-400')">
                    <font-awesome-icon icon="fa-solid fa-thumbs-up" :id="`like${GetData.id}`" /> 
                    <span class="ml-1">Like</span>
                </div>
                <div class="react" @click="react($event,`comment${GetData.id}`,'text-yellow-400')">
                    <font-awesome-icon icon="fa-solid fa-comment" :id="`comment${GetData.id}`" />
                    <span class="ml-1">Comment</span>
                </div>
                <div class="react" @click="react($event,`share${GetData.id}`,'text-red-400')">
                    <font-awesome-icon icon="fa-solid fa-share" :id="`share${GetData.id}`" />
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
        });
        
        const Delete =async (id,name) => {
            if(user.displayName===name){
                const docRef = doc(db,'postMessage', id);
                await deleteDoc(docRef)
            }
        }
        
        const EditDoc =async (id,msg) => {
            const message = document.getElementById('message');
            const newInput = document.createElement('input');
            newInput.className = 'w-full text-gray-900 p-2 border-0 rounded outline-0';
            newInput.value = msg;
            //cursor to end
            newInput.selectionStart = newInput.value.length;
            newInput.selectionEnd = newInput.value.length;
            newInput.setAttribute('autofocus','');
            message.replaceWith(newInput);
            //update post data
            newInput.addEventListener('keypress',async(e)=>{
                if(e.key === 'Enter'){ 
                    let docRef = doc(db,'postMessage',id);
                    message.innerText = newInput.value;
                    newInput.replaceWith(message); 
                    await updateDoc(docRef,{
                        message:newInput.value
                    });
                }
                
            });
        };

        //reaction
        const react = (e,id,color)=>{
           const like = document.getElementById(id);
           like.classList.add('icon');
           like.classList.add(color);
           e.target.classList.add(color);
        }


        
        return { GetDatas, Delete, EditDoc, photoUrl, profileName, user, react }
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
    .edit{
        position: absolute;
        right: 1px;
        border-radius: 5px;
        display: none;
        padding: 5px 10px;   
    }
    .editController:hover .edit{
        display: block;
        background-color: #3a3b3c;
    }

    .icon{
        animation: bounce 1s 3;
    }
    @keyframes bounce {
        0%, 100% {
            transform: scale(1.2);
            animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
        }
        50% {
            transform: scale(0);
            animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
        }
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