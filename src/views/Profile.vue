<template>
    <div class="formController ">
        <h3 class="text-center text-3xl text-blue-700">Create Profile</h3>
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
    h3{
        max-width: 300px;
        padding: 10px;
        margin: auto;
        margin-bottom: 20px;
    }
</style>