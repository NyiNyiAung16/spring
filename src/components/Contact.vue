<template>
    <div class="contact py-3 px-2">
        <div class="flex justify-between">
            <p class="text-xl">Contacts</p>
            <font-awesome-icon icon="fa-solid fa-xmark" class="icon text-red-400 cursor-pointer" @click="contactBox" />
        </div>
        <div class="contactBox flex items-center gap-2 mb-3 cursor-pointer" v-for="contact in contacts" :key="contact.id">
          <img :src="contact.photo" alt="img">
          <span>{{ contact.userName }}</span>
        </div>
      </div>
</template>

<script>
import { ref } from 'vue';
import { onSnapshot, db, collection, query, orderBy } from '../firebase/config'
export default {
    setup(props,context){
        let contacts = ref([]);
        let colRef = collection(db,'authCollection');
        let q = query(colRef,orderBy('time'));

        onSnapshot(q, (snap) => {
            let results = ref([]);
            snap.docs.forEach((doc) => {
                let document = {id:doc.id, ...doc.data()};
                results.value.push(document);
            })
            contacts.value = results.value;
        })
        let contactBox = () => {
          context.emit('hide')
        }

        return { contacts, contactBox };
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
    background-color: rgb(189, 28, 28);
    color: white;
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