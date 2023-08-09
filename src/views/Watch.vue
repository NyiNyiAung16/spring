<template>
  <div class="watchPage">
        <div class="navbarMain"> 
          <SubmitVideo></SubmitVideo>
        </div>
        <div class="videoMain">
            <SmallNav></SmallNav>
            <ShowVideo></ShowVideo>
            <div class="rightSide"> 
              <RightSide></RightSide>
            </div>
        </div>
  </div>
</template>

<script>
import RightSide from '../components/RightSide'
import SubmitVideo from '../components/SubmitVideo'
import ShowVideo from '../components/ShowVideo'
import SmallNav from '../components/SmallNav'
export default {
  components: {
    RightSide,
    SubmitVideo,
    ShowVideo,
    SmallNav },

}
</script>

<style scoped>
   @font-face {
        font-family: 'arima';
        src: url(../assets/static/Arima-ExtraLight.ttf);
    }
  .watchPage{
    width: 100%;
    position: relative;
  }
  .navbarMain{
    position: sticky;
    top: 0;
    z-index: 1000;
  }
  .videoMain{
    display: grid;
    grid-template-columns: 300px 1fr 1fr;
  }

  @media (max-width:1030px) {
    .videoMain{
      grid-template-columns: 100px 1fr 250px;
    }  
  }

  @media (max-width:640px) {
    .videoMain{
      grid-template-columns: 100px 1fr;
    }  
    .rightSide{
      display: none;
    }
  }

  @media (max-width:590px) {
    .videoMain{
      width: 100%;
      display: grid;
      grid-template-columns: 50px 1fr;
    }
  }
</style>