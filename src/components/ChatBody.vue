<template>
  <div class="chatbody" ref="chatBody">
      <div class="chatBox" v-for="CD in formattedChatDatas" :key="CD.id">
        <div class="boxNav flex gap-2 items-center">
          <img :src="CD.photo" alt="chatimg">
          <p class="text-white font-bold">{{CD.name}}</p>
          <p class="ml-4 text-gray-300">{{CD.time}}</p>
        </div>
        <transition name="fade" appear="">
          <div class="chatMessage">
            <p>{{ CD.message }}</p>
          </div>
        </transition>
      </div>
  </div>
</template>

<script>
import { computed, onUpdated, ref } from 'vue';
import { onSnapshot, collection, db, query, orderBy } from '../firebase/config'
import { formatDistanceToNow } from 'date-fns'
export default {
  setup() {
      const ChatDatas = ref([]);
      let colRef =collection(db,'chatCollection');
      let q = query(colRef,orderBy('time'));

      //fixing date 
      const formattedChatDatas = computed(()=>{
        return ChatDatas.value.map((chat)=>{
            let formatTime = formatDistanceToNow(chat.time.toDate());
            return {...chat,time:formatTime};
        })
      })
      //chat data fetching
      onSnapshot(q, (snap) => {
        let results=ref([]);
        snap.docs.forEach((doc) => {
          let document = {id:doc.id,...doc.data()};
          doc.data().time && results.value.push(document);
        })
        ChatDatas.value=results.value;
      })

      //auto scrolling feature
      let chatBody=ref(null);
      onUpdated (() =>  {
        chatBody.value.scrollTop = chatBody.value.scrollHeight
      })

      return { ChatDatas, formattedChatDatas, chatBody }
  }
}
</script>

<style scoped>
  .chatbody{
    min-height: 400px;
    padding: 10px 5px;
    background: inherit;
    overflow: hidden;
    overflow-y: scroll;
  }
  .chatBox{
    margin: 20px 0px;
  }
  .chatBox img{
    width: 30px;
    height: 30px;
    object-fit: cover;
    border-radius: 50%;
  }
  .chatBox .chatMessage{
    max-width: 460px;
    border-radius: 15px;
    padding: 5px 10px;
    margin: 8px ;
    background: gray;
    color: rgb(233, 236, 236);
  }
  ::-webkit-scrollbar{
    width: 10px;
  }
  ::-webkit-scrollbar-thumb{
    background: rgb(14, 176, 168); 
    border-radius: 100px;
  }
  ::-webkit-scrollbar-thumb:hover{
    background-color: rgb(22, 201, 90);
  }
  ::-webkit-scrollbar-track{
    background: rgb(57, 55, 55);
  }

  .boxNav p{
    font-family: 'arima';
  }
  .fade-enter-from{
    opacity: 0;
    transform: scale(0.5);
  }
  .fade-enter-to{
    opacity: 1;
    transform: scale(1);
  }
  .fade-enter-active{
    transition: all 1.7s ease-out;
  }
</style>