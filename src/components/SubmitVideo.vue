<template>
  <div class="postVd bg-gray-600">
        <div class="flex justify-between">
            <div class="flex gap-2 items-center">
                <img :src="photoUrl" alt="">
                <span class="text-white font-bold text-xl">{{ userName }}</span>
            </div>
            <input type="file" accept="video/mp4" id="video" @change="postVideo">
            <div class="submit">
                <font-awesome-icon icon="fa-solid fa-file-export" class="text-xl text-blue-500 mr-1" />
                <label for="video" class="text-blue-300 text-lg cursor-pointer hover:text-blue-600 transition linear">Post Video</label>
            </div>
        </div>
        <div class="loading" v-if="progressCheck">
            <div class="spin"></div>
        </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { auth, ref as storageReference, storage, getDownloadURL, uploadBytesResumable, collection, addDoc, db, serverTimestamp } from '../firebase/config'
export default {
    setup() {
        let user = auth.currentUser;
        let userName = user.displayName;
        let photoUrl = user.photoURL;
        let error = ref(null);
        let url = ref('');

        //loading condition
        let progressing = ref('');
        let progressCheck = ref(false);

        //postvideo
        let postVideo = async (e) => {
            let videoName = e.target.files[0].name;
            let videoObj = e.target.files[0];
            let storageRef = storageReference(storage, `postVideo/${videoName}`)

            const uploadTask = uploadBytesResumable(storageRef, videoObj);
            progressCheck.value= true;
            //uploadtask
            uploadTask.on('state_changed', 
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                progressing.value='Upload is ' + progress + '% done';
                switch (snapshot.state) {
                    case 'paused':
                        break;
                    case 'running':
                    if(progressing.value=='Upload is 100% done'){
                        progressCheck.value=false
                    }
                    break;
                }
            }, 
        (error) => {
            error = error.message;
        }, 
        //download
            async() => {
            let downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
            url.value = downloadUrl;
    
            //add video collection 
            let colRef = collection(db,'videoCollection');
            let vdObj ={
                name:user.displayName,
                image:user.photoURL,
                video: url.value,
                time:serverTimestamp(),
                Ref:storageRef.fullPath
            };
            await addDoc(colRef,vdObj);
            },
        );  
    }

        return { userName, photoUrl, postVideo, url, error, progressing, progressCheck }
    }
}
</script>

<style scoped>
    .postVd {
        padding: 7px 10px;
    }
    .postVd input{
        display: none;
    }
    .postVd img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
    }
    .postVd .submit {
        max-width: 150px;
        padding: 5px 10px;
        border-radius: 5px;
        text-align: center;
        background-color: rgb(64, 69, 69);
    }
    .loading .spin{
        width: 20px;
        height: 20px;
        border-radius: 50%;
        margin: auto;
        border: 2px solid transparent;
        border-top-color: aqua;
        cursor: wait;
        animation: spin 1s infinite;
    }
    @keyframes spin {
        to{ transform: rotate(360deg); }
    }
    span,label{
        font-family: 'arima';
    }
</style>