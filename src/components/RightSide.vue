<template>
  <div class="rightController">
    <div class="rightSide bg-gray-800 px-5 py-2 text-white">
        <h3 class="text-xl text-gray-400"> Your's Profile</h3>
      <div class="profile mt-2">
          <div class=" profileName flex items-center">
            <img :src="photoUrl" alt="img" class="mr-1">
            <span>{{ profileName }}</span>
          </div>
        <div class="ml-4">
            <p class="icon"><font-awesome-icon icon="fa-solid fa-bell" class="mr-1 text-xl text-green-400" />alert</p>
            <p class="icon"><font-awesome-icon icon="fa-solid fa-user-circle" class="mr-1 text-xl text-orange-400" />user</p>
            <p class="icon"><font-awesome-icon icon="fa-solid fa-bullhorn" class="mr-1 text-xl text-blue-400" />horn</p>
        </div>
      </div>

      <Contact></Contact>
      
    </div>
  </div>
</template>

<script>
import Contact from './Contact'
import { auth } from '../firebase/config'
export default {
  components: { Contact },
    setup(){

      let user = auth.currentUser;
      let profileName = user.displayName;
      let photoUrl = user.photoURL;


      return { profileName, photoUrl }

    }
}
</script>

<style scoped>
  .rightController{
    position: relative;
  }
  .rightSide{
    width: 25vw;
    height: 100vh;
    position: fixed;
    right: 0;
  }
  .profile{
    border-bottom: 2px solid gray;
  }
  .profileName{
    max-width: 200px;
    margin-bottom: 2px;
    padding:7px 10px;
    border-radius: 10px;
    background-color: inherit;
    transition: all 0.6s ease-in;
  }
  .profileName:hover{
     background-color: gray;
  }
  .profile img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }
  .profile .icon{
    max-width: 150px;
    margin-bottom: 2px;
    padding:7px 10px;
    border-radius: 10px;
    background-color: inherit;
    transition: all 0.6s ease-in;
  }
  .profile .icon:hover{
    background-color: gray;
  }
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