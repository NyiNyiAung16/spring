<template>
  <div class="watchPage">
        <div class="navbarMain"> 
          <SubmitVideo></SubmitVideo>
        </div>
        <div class="videoMain">
            <SmallNav></SmallNav>
            <ShowVideo></ShowVideo>
        </div>
  </div>
</template>

<script>
import SubmitVideo from '../components/SubmitVideo'
import ShowVideo from '../components/ShowVideo'
import SmallNav from '../components/SmallNav'
export default {
  components: {
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
    grid-template-columns: 200px 1fr;
  }
  @media (max-width:590px) {
    .videoMain{
      width: 100%;
      display: grid;
      grid-template-columns: 50px 1fr;
    }
  }
</style>