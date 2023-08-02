<template>
  <div class="video border border-none rounded-lg">
        <div class="videoBox bg-gray-800 mt-4" v-for="vdDoc in formattedTime" :key="vdDoc.id">
            <div class="flex gap-2 items-center justify-between mb-3 px-2 py-2">
                <div class="first flex gap-2 items-center">
                    <img :src="vdDoc.image" alt="img">
                    <div>
                        <span class="text-white text-md sm:text-xl">{{ vdDoc.name }}</span>
                        <p class="text-gray-300 text-md sm:text-xl">{{vdDoc.time}}</p>
                    </div>
                </div>
                <div class="second">
                    <font-awesome-icon icon="fa-solid fa-ellipsis-vertical" size="xl" class="icon text-blue-400 pr-3"  />
                    <ul class="optionIcon" >
                        <li class="hover:text-red-500 cursor-pointer" @click="deleteVd(vdDoc.id,vdDoc.Ref)" ><font-awesome-icon icon="fa-solid fa-trash" /></li>
                    </ul>
                </div>
            </div>
            <video :src="vdDoc.video" controls></video>
        </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { onSnapshot,collection, db,query, orderBy, deleteDoc, doc,deleteObject, ref as storageReference, storage } from '../firebase/config'
import { formatDistanceToNow } from 'date-fns'
export default {
    setup(){
        let vdDocs = ref([]);

        let colRef = collection(db,'videoCollection');
        let q = query(colRef,orderBy('time','desc'));

        let formattedTime = computed(() => {
            return vdDocs.value.map((vdDoc) => {
                let formatTime = formatDistanceToNow(vdDoc.time.toDate());
                return { ...vdDoc,time:formatTime }; 
            })
        })

        onSnapshot(q, (snap) => {
            let results=ref([]);
            snap.docs.forEach((doc) => {
                let videoDoc = { id:doc.id,...doc.data() };
                doc.data().time && results.value.push(videoDoc);
            })
            vdDocs.value = results.value;
        })

        //delete video
        let deleteVd =async (id, ref) => {
            let document = doc(db,'videoCollection',id);
            await deleteDoc(document);

            //  delete video object
            let storageRef = storageReference(storage,ref );
            await deleteObject(storageRef);
            console.log('delete');
            
        }

    
        return { vdDocs, formattedTime, deleteVd };
    }
}
</script>

<style scoped>
    .video {
        max-width: 600px;
        margin: auto;
    }
    .videoBox{
        border-radius: 5px;
    }
    .videoBox img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
    }
    .videoBox video{
        width: 100%;
        background-color: black;
        padding: 30px 0px;
    }
    .first span{
        font-family: 'arima';
    }
    .second{
        position: relative;
    }
    .icon{
        padding: 7px;
        background-color: transparent;
        border-radius: 10px;
        transition: all 0.7s linear;
    }
    .icon:hover{
        background-color: rgb(127, 255, 251);
        color: rgb(11, 77, 112);
    }
    .second:hover .optionIcon{
        display: block;
    }
    .optionIcon{
        padding: 10px;
        display: none;
        background-color: rgb(127, 255, 251);
        border-radius: 10px;
        position: absolute;
        right: 3px;
    }

    /* responsive style */
    @media (max-width: 600px) {
        .video{
            padding: 0px 20px;
        }
    }
</style>