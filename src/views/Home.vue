<template>
  <div class="homeController">
    <Navbar></Navbar>
    <div class="MainBody">

      <LeftSide></LeftSide>

      <Middle></Middle>

      <div class="rightSide">
        <RightSide></RightSide>
      </div>

    </div>
  </div>
</template>

<script>

import RightSide from '../components/RightSide'
import Middle from '../components/Middle'
import LeftSide from '../components/LeftSide'
import Navbar from '../components/Navbar'
import { watch } from 'vue'
import { useRouter } from 'vue-router'
import user  from '../composables/getUser'
export default {
  components: {
    RightSide,
    Middle,
    LeftSide, Navbar },
  name: 'Home',
  setup(){
    
    let router = useRouter();
    watch(user, () => {
      router.push('/createAccount');
    })
  }
}
</script>
<style scoped>
  .MainBody{
    height: 100vh;
    display: grid;
    grid-template-columns: 20% 50% 27%;
    gap: 20px;
  }
  .navbarLeft{
    display: none;
  }
  @media (max-width:840px) {
    .MainBody{
      grid-template-columns: 20% 80%;
    }
    .rightSide{
      display: none;
    }
  }
  @media (max-width:600px) {
    .MainBody{
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  }
</style>