<template>
    <div class="formController ">
        <CreateProfile></CreateProfile>
    </div>
</template>

<script>
import CreateProfile from '../components/createProfile'
export default {
  components: { CreateProfile },

}
</script>

<style scoped>
    .formController{
        width: 100vw;
        height: 100vh;
        background: url(../assets/7.jpg);
        background-origin: border-box;
        background-size: cover;
    }
</style>