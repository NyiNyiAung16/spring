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
export default {
  components: {
    RightSide,
    Middle,
    LeftSide, Navbar },
  name: 'Home',
}
</script>
<style scoped>
  .MainBody{
    height: 100vh;
    display: grid;
    grid-template-columns: 20% 50% 27%;
    gap: 20px;
  }
  @media (max-width:840px) {
    .MainBody{
      grid-template-columns: 20% 80%;
    }
    .rightSide{
      display: none;
    }
  }
</style>