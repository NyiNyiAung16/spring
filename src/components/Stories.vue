<template>
    <div class="flex gap-2 mt-1">
            
            <div class="postBox">
                <img :src="photoUrl" alt="img1">
                <input type="file" accept="imgae/jpg" id="storiesImage" class="hidden" @change="postStoriesImg">
                <label for="storiesImage"><font-awesome-icon icon="fa-solid fa-plus" class="plus text-white text-lg cursor-pointer  bg-green-300 border rounded-2xl p-1 transition hover:bg-green-500 ease-in" /></label>
                <p class="text-white text-sm font-bold">Make stories</p>
            </div>

            <swiper
                :modules="modules"
                :slides-per-view="3"
                :space-between="20"
                :loop="true"
                navigation
            >
                
                <swiper-slide v-for="storiesData in storiesDatas" :key="storiesData.id" class="postBox">
                    <img :src="storiesData.storiesImg" alt="img1" >
                    <p class="text-white text-sm  font-bold">{{ storiesData.name }}</p>
                </swiper-slide>

            </swiper>
            
        </div>


</template>

<script>
import { ref } from 'vue';
import { auth,  uploadBytes, storage, ref as storageReference, getDownloadURL, db, addDoc, onSnapshot, collection, query, orderBy, serverTimestamp } from '../firebase/config'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

export default {
    components:{
        Swiper, SwiperSlide
    },
    setup(){
        let photoUrl=ref('');
        let profileName=ref('');
        let user= auth.currentUser;
        photoUrl.value=user.photoURL;
        profileName.value=user.displayName;

        //get image
        let colRef = collection(db,'storiesCollection');

        let postStoriesImg = async (e) => {

            let storiesImgPath = e.target.files[0].name;
            let storiesImgData = e.target.files[0];
            let storageRef = storageReference(storage,`storiesImages/${storiesImgPath}`);
            
            //upload and download image
            let res = await uploadBytes(storageRef,storiesImgData);
            let getUrl = await getDownloadURL(storageRef);

            //post stories collection 
            await addDoc(colRef,
            {
                name:profileName.value,
                storiesImg:getUrl,
                storiesTime:serverTimestamp()
            })
        }
        

        //get stories data
        let storiesDatas = ref([]);
        let q=query(colRef,orderBy('storiesTime','desc'))

        onSnapshot(q, (snap) => {
            storiesDatas.value = snap.docs.map((doc) => {
                return { id:doc.id, ...doc.data() }
            })
        })
        
        return { photoUrl, profileName, postStoriesImg, storiesDatas, modules:[Navigation] }
    }
}
</script>

<style scoped>
     @font-face {
        font-family: 'arima';
        src: url(../assets/static/Arima-ExtraLight.ttf);
    }
    .postBox{
        width: 100px;
        height: 150px;
        background-color: gray;
        border-radius: 5px;
        text-align: center;
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 5px;
        overflow: hidden;
    }
    .postBox .plus{
        position: absolute;
        left: 30%;
        top: 70%;
    }
    .postBox img{
        width: 100%;
        height: 120px;
        object-fit: cover;
        border-radius: 5px 5px 0px 0px;
    }
    .postBox p{
        font-family: 'arima';
    }
    .swiper{
        max-width: 80%;
    }
    .swiper-slide {
        max-width: 200px;
    }
    
    .swiper-slide img {
        display: block;
        width: 100%;
        object-fit: cover;
        margin-right: 0px;
    }


    /* reponsive style */
    @media (max-width:420px) {
        .postBox p{
            font-size: 13px;
        }
    }
</style>