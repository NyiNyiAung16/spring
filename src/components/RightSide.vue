<template>
  <div class="rightController">
      <div class="rightSide bg-gray-800 px-5 py-2 text-white">
    <h3 class="text-xl text-gray-400">Pages and Profile</h3>
    <div class="profile mt-2">
      <div class="icon flex items-center">
          <img src="../assets/4.jpg" alt="img" class="mr-1">
          <span>Nyi Nyi</span>
      </div>
      <div class="ml-4">
          <p class="icon"><font-awesome-icon icon="fa-solid fa-bell" class="mr-1 text-xl text-green-400" />alert</p>
          <p class="icon"><font-awesome-icon icon="fa-solid fa-user-circle" class="mr-1 text-xl text-orange-400" />alert</p>
          <p class="icon"><font-awesome-icon icon="fa-solid fa-bullhorn" class="mr-1 text-xl text-blue-400" />alert</p>
      </div>
    </div>

    <div class="contact py-3 px-2">
        <div class="flex justify-between">
          <p class="text-xl">Contacts</p>
          <div class="flex gap-2">
            <font-awesome-icon icon="fa-solid fa-video" class="icon text-green-400 cursor-pointer" />
            <font-awesome-icon icon="fa-solid fa-search" class="icon text-blue-400 cursor-pointer" />
            <font-awesome-icon icon="fa-solid fa-ellipsis-vertical" class="icon text-violet-400 cursor-pointer" />
          </div>
        </div>
        <div class="contactBox flex items-center gap-2 mb-3 cursor-pointer">
          <img src="../assets/2.jpg" alt="img">
          <span>HanNi Nway Oo</span>
        </div>
        <div class="contactBox flex items-center gap-2  mb-3 cursor-pointer">
          <img src="../assets/5.jpeg" alt="img">
          <span>Nan Su Pearl Htet</span>
        </div>
        <div class="contactBox flex items-center gap-2 cursor-pointer">
          <img src="../assets/6.jpg" alt="img">
          <span>Nan Su</span>
        </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {

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