<template>
  <div class="submitNav">
    <input type="text" placeholder="Enter to submit" v-model="chatMessage">
    <font-awesome-icon icon="fa-solid fa-circle-arrow-right" class="icon " @click="SubmitChatMsg" />
  </div>
</template>

<script>
import { ref } from 'vue';
import { auth, db, addDoc, collection, serverTimestamp } from '../firebase/config'
export default {
    setup() {
        const chatMessage = ref('');
        let user = auth.currentUser;
        let colRef =collection(db,'chatCollection');

        //submit chat message
        let SubmitChatMsg =async () => {
            if(chatMessage.value){
                await addDoc(colRef, {
                name:user.displayName,
                photo:user.photoURL,
                message:chatMessage.value,
                time:serverTimestamp()
            });
            }
            chatMessage.value='';
        }

        
        return { chatMessage, SubmitChatMsg }
    }
}
</script>

<style scoped>
    .submitNav{
        display: flex;
        align-items: center;
        width: 100%;    
        border-radius: 0px 0px 5px 5px;
        box-sizing: border-box;
        background-color: gray;
    }
    .submitNav input{
        width: 95%;
        padding: 10px 10px;
        border: none;
        background-color: inherit;
        color: white;
        cursor: pointer;
    }
    .submitNav input{
        outline: none;
    }
    .submitNav .icon{
        font-size: 28px;
        color: rgb(24, 109, 122);
        cursor: pointer;
        transition: all 0.5s linear;
    }
    .submitNav .icon:hover{
        color: aqua;
    }
    ::placeholder{
        color: rgb(55, 230, 227);
        font-weight: bold;
        font-family: 'arima';
    }
</style>