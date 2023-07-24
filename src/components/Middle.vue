<template>
    <div class="middleController bg-gray-800 p-3">
        <div class="flex gap-2">
            <div class="postBox">
                <img src="../assets/4.jpg" alt="img1">
                <p class="text-white font-bold">make stories</p>
            </div>
            <div class="postBox">
                <img src="../assets/2.jpg" alt="img1">
                <p class="text-white font-bold">Nyi Nyi</p>
            </div>
            <div class="postBox">
                <img src="../assets/6.jpg" alt="img1">
                <p class="text-white font-bold">Aung Aung</p>
            </div>
            <div class="postBox">
                <img src="../assets/5.jpeg" alt="">
                <p class="text-white font-bold">Mg Mg</p>
            </div>
            
        </div>

        <div class="mt-3 bg-gray-600 px-3 py-2 border rounded-md border-none box-border">
            <div class="first flex">
                <img src="../assets/4.jpg" alt="" width="50px">
                <input type="text" placeholder="What are you thinking?...Nyi Nyi" v-model="post">
            </div>
            <div class="createController flex justify-between px-3 mt-2">
                <div class="create flex items-center cursor-pointer">
                    <font-awesome-icon icon="fa-solid fa-video" class="text-green-400 text-xl" />
                    <span class="ml-1 text-gray-300">Live</span>
                </div>
                <div class="create flex items-center cursor-pointer">
                    <font-awesome-icon icon="fa-solid fa-image" class="text-orange-400 text-xl" />
                    <span class="ml-1 text-gray-300">Picture</span>
                </div>
                <div class="create flex items-center cursor-pointer">
                    <font-awesome-icon icon="fa-solid fa-face-smile" class="text-red-400 text-xl" />
                    <span class="ml-1 text-gray-300">emotion</span>
                </div>
            </div>
        </div>

        <div class="second text-white bg-gray-600 p-2 border rounded-md border-none mt-3 ">
            <div class="flex items-center mb-2">
                <img src="../assets/4.jpg" alt="">
                <span class="ml-1">Nyi Nyi</span>
            </div>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste placeat sit repellat ab. Ea est aliquid ratione modi a, velit reiciendis delectus sint, ex voluptatum exercitationem, officia cumque pariatur? Quidem illum doloribus similique alias at amet suscipit dolores, voluptatem, cupiditate repellat ea consequatur omnis cumque. Nihil non minus veritatis incidunt cupiditate ducimus corrupti esse enim iste ullam, eveniet molestias repudiandae vero sed repellendus, sunt quos id est consequuntur maxime alias explicabo laboriosam.</p>
            <div class="reactBox flex justify-between p-2">
                <div class="react">
                    <font-awesome-icon icon="fa-solid fa-thumbs-up" />
                    <span class="ml-1">Like</span>
                </div>
                <div class="react">
                    <font-awesome-icon icon="fa-solid fa-comment" />
                    <span class="ml-1">Comment</span>
                </div>
                <div class="react">
                    <font-awesome-icon icon="fa-solid fa-share" />
                    <span class="ml-1">Share</span>
                </div>
            </div>
        </div>
        <div class="second text-white bg-gray-600 p-2 border rounded-md border-none mt-3 ">
            <div class="flex items-center mb-2">
                <img src="../assets/6.jpg" alt="">
                <span class="ml-1">Nyi Nyi</span>
            </div>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste placeat sit repellat ab. Ea est aliquid ratione modi a, velit reiciendis delectus sint, ex voluptatum exercitationem, officia cumque pariatur? Quidem illum doloribus similique alias at amet suscipit dolores, voluptatem, cupiditate repellat ea consequatur omnis cumque.</p>
            <div class="reactBox flex justify-between p-2">
                <div class="react">
                    <font-awesome-icon icon="fa-solid fa-thumbs-up" />
                    <span class="ml-1">Like</span>
                </div>
                <div class="react">
                    <font-awesome-icon icon="fa-solid fa-comment" />
                    <span class="ml-1">Comment</span>
                </div>
                <div class="react">
                    <font-awesome-icon icon="fa-solid fa-share" />
                    <span class="ml-1">Share</span>
                </div>
            </div>
        </div>
    </div>

    
</template>

<script>
import { ref } from 'vue'
export default {
    setup(){
        const post=ref('');


        return { post }
    }
}
</script>

<style scoped>
    .postBox{
        width: 90px;
        height: 150px;
        background-color: gray;
        border-radius: 5px;
        text-align: center;
    }
    .postBox img{
        width: 100%;
        height: 100px;
        object-fit: cover;
        border-radius: 5px 5px 0px 0px;
    }
    .first{
        padding-bottom: 5px;
        border-bottom: 2px solid gray;
    }
    .first img{
        width: 40px;
        height: 40px;
        object-fit: cover;
        border-radius: 50%;
    }
    .first input{
        width: 100%;
        background-color: #3a3b3c;
        border: none;
        border-radius: 15px;
        padding: 0px 10px ;
        margin-left: 5px;
        color: #fff;
    }
    .first input::placeholder{
        color: rgb(206, 206, 206);
    }
    .first input:focus{
        outline: none;
    }
    .create{
        background-color: inherit;
        padding: 8px 15px;
        border-radius: 10px;
        box-sizing: border-box;
        transition: all 0.8s ease;
    }
    .create:hover{
        background-color: gray;
    }
    .second img{
        width: 40px;
        height: 40px;
        object-fit: cover;
        border-radius: 50%;
    }
    .second .reactBox{
        border-top: 2px solid gray;
    }
    .second .reactBox .react{
        background-color: inherit;
        padding: 5px 15px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.5s ease;
    }
    .second .reactBox .react:hover{
        background-color: gray;
    }

    /* responsive style */
    @media (max-width:630px) {
        .middleController{
            max-width: 450px;
            margin-right: 20px;
        }
    }
</style>