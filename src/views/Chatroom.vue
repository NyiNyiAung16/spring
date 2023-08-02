<template>
    <div class="chatController">
        <ChatTopNav></ChatTopNav>
        <div class="chatroom flex flex-col justify-between">
            <ChatNav></ChatNav>
            <ChatBody></ChatBody>
            <ChatSubmitNav></ChatSubmitNav>
        </div>
    </div>
</template>

<script>
import ChatTopNav from '../components/ChatTopNav'
import ChatSubmitNav from '../components/ChatSubmitNav'
import ChatBody from '../components/ChatBody'
import ChatNav from '../components/ChatNav'
export default {
  components: {
    ChatTopNav,
    ChatSubmitNav,
    ChatBody,
    ChatNav },

}
</script>

<style scoped>
     @font-face {
        font-family: 'arima';
        src: url(../assets/static/Arima-ExtraLight.ttf);
    }
    .chatroom{
        max-width: 600px;
        height: 60vh;
        margin: 3% auto 0px;
        background-color: #4b5563;
        border-radius: 3px;
    }

</style>