<template>
    <div class="contact py-3 px-2">
        <div class="flex justify-between">
            <p class="text-xl">Contacts</p>
            <div class="flex gap-2">
              <font-awesome-icon icon="fa-solid fa-video" class="icon text-green-400 cursor-pointer" />
              <font-awesome-icon icon="fa-solid fa-search" class="icon text-blue-400 cursor-pointer" />
              <font-awesome-icon icon="fa-solid fa-ellipsis-vertical" class="icon text-violet-400 cursor-pointer" />
            </div>
        </div>
        <div class="contactBox flex items-center gap-2 mb-3 cursor-pointer" v-for="contact in contacts" :key="contact.id">
          <img :src="contact.photo" alt="img">
          <span>{{ contact.userName }}</span>
        </div>
      </div>
</template>

<script>
import { ref } from 'vue';
import { onSnapshot, db, collection } from '../firebase/config'
export default {
    setup(){
        let contacts = ref([]);
        let colRef = collection(db,'authCollection');

        onSnapshot(colRef, (snap) => {
            let results = ref([]);
            snap.docs.forEach((doc) => {
                let document = {id:doc.id, ...doc.data()};
                results.value.push(document);
            })
            contacts.value = results.value;
        })


        return { contacts };
    }
}
</script>

<style scoped>
    .contact .icon{
    max-width: 150px;
    margin-bottom: 2px;
    padding:7px;
    border-radius: 10px;
    background-color: inherit;
  }
  .contact .icon:hover{
    background-color: gray;
  }
  .contact img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }
  .contact .contactBox{
    background-color: inherit;
    padding: 5px 10px;
    border-radius: 10px;
    transition: all 0.8s ease;
  }
  .contact .contactBox:hover{
    background-color: gray;
  }
</style>