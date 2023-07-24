<template>
  <div class="video border border-none rounded-lg">
        <div class="videoBox bg-gray-400 mt-4 p-2">
            <div class="flex gap-2 items-center mb-3">
                <img src="../assets/4.jpg" alt="img">
                <span>Nyi Nyi</span>
            </div>
            <video src="../assets/video/1.mp4" controls></video>
        </div>
        <div class="videoBox bg-gray-400 mt-4 p-2">
            <div class="flex gap-2 items-center mb-3">
                <img src="../assets/6.jpg" alt="img">
                <span>Nan Su</span>
            </div>
            <video src="../assets/video/2.mp4" controls></video>
        </div>
        
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
    .video {
        max-width: 450px;
        margin: auto;
    }
    .videoBox img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
    }
    .videoBox video{
        width: 100%;
    }
</style>