<template>
  <div class="Navbar flex shadow-xl justify-between items-center px-3 py-2 bg-gray-800">
        <div class="flex gap-4 items-center">
            <h3 class="text-xl sm:text-2xl text-white font-bold ">Facebook</h3>
            <font-awesome-icon icon="fa-solid fa-search" size="lg" class="inline md:hidden text-gray-300 icon " @click="searchShow=!searchShow" v-if="!searchShow" />
        </div>
        <!-- search bar small show -->

         <div class="smallBar bg-gray-500 p-2 border border-none rounded-lg block md:hidden " v-if="searchShow">
            <font-awesome-icon icon="fa-solid fa-search" size="lg" class="text-gray-300"/>
            <input type="text" class="bg-inherit ml-2 " placeholder="search in facebook" v-model="searchFilter">
        </div>
        
        <!-- search bar small show -->
        <div class="searchBar bg-gray-500 p-2 border border-none rounded-lg ">
            <font-awesome-icon icon="fa-solid fa-search" size="lg" class="text-gray-300"/>
            <input type="text" class="bg-inherit ml-2 " placeholder="search in facebook" v-model="searchFilter">
        </div>
        <div class=" text-gray-300 cursor-pointer flex items-center relative" :class="{icons:searchShow}">
            <router-link to="/chatroom" class="chatroom" >
                <font-awesome-icon :icon="['far', 'comment-dots']"  size="xl" class="mr-4 icon text-white" />
            </router-link>
            <router-link to="/updateProfile" class="password">
                <font-awesome-icon icon="fa-solid fa-lock" size="xl" class="mr-4 icon text-white" />
            </router-link>
            <div class="profileContainer inline">
                <img :src="NavbarUrl" alt="NavbarImage" class="navbarImg">
                
                <ul class="profileHover">
                    <li class="hover:text-green-200 hover:underline"><router-link to="/updateProfile">Profile</router-link></li>
                    <li class="block md:hidden cursor-pointer hover:text-blue-400" @click="contactShow=!contactShow">Contact</li>
                    <button class="border border-none p-1 rounded-md hover:text-orange-300 hover:bg-gray-400" @click="Logout">Logout</button>
                </ul>
            </div>
            <div v-if="contactShow" class="contact  block md:hidden">
                <Contact></Contact>
            </div>
        </div>
        
  </div>
</template>

<script>
import Contact from './Contact'
import { ref } from 'vue'
import logout from '../composables/logout'
import { auth, onSnapshot, db, collection } from '../firebase/config'
export default {
  components: { Contact },
    setup(){
        let searchFilter=ref('');
        let contactShow = ref(false);
        let searchShow = ref(false);
        const Logout = () => {
             logout();
        }

        //navbarImage
        let user = auth.currentUser;
        const userName = user.displayName;
        const NavbarUrl = user.photoURL;

        //filter user
        let filterUsers = ref([]);
        let colRef = collection(db,'authCollection');
        onSnapshot(colRef, (snap) => {
            let results = ref([]);
            snap.docs.forEach((doc) => {
                let document = { id:doc.id,...doc.data() };
                results.value.push(document);
            })
            filterUsers.value = results.value;
        })

        
      

        return { searchFilter, Logout, NavbarUrl, userName, filterUsers, contactShow, searchShow }
    }
}
</script>

<style scoped>
    @font-face {
        font-family: 'arima';
        src: url(../assets/static/Arima-ExtraLight.ttf);
    }
    .Navbar{
        border-bottom: 1px solid gray;
        position: sticky;
        top: 0;
        z-index: 1000;
    }
    .searchBar{
        width: 350px;
        display: block;
    }
    /* .smallBar{
        position: absolute;
        top: 60px;
    } */
    input{
        color: white;
    }
    .icon{
        padding: 10px;
        border-radius: 50%;
        background-color: rgb(81, 78, 78);
        transition: all 0.6s;
    }
    .icon:hover{
        background-color: gray;
    }

    input:focus{
        outline: none;
    }
    .profileContainer{
        position: relative;
        padding: 10px 0px;
    }
    .profileContainer:hover .profileHover{
        display: block;
    }
    .profileHover{
        max-width: 100px;
        position: absolute;
        right: 0;
        display: none;
        border-radius: 10px;
        padding: 5px 15px;
        background-color: gray;
        text-align: center;
    }
    .navbarImg{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
    }

    .chatroom:hover::before{
        content: 'chatroom';
        font-family: 'arima';
        color: aqua;
        background-color: rgb(104, 99, 99);
        padding: 2px 6px;
        border-radius: 10px;
        position: absolute;
        top: 50px;
    }
    .password:hover::before{
        content: 'change password';
        font-family: 'arima';
        color: aqua;
        background-color: rgb(104, 99, 99);
        text-align: center;
        padding: 2px 6px;
        border-radius: 10px;
        position: absolute;
        top: 50px;
    }
    ::placeholder{
        font-size: 1.1rem;
    }
    .contact{
        width: 350px;
        border-radius: 5px;
        position: absolute;
        top: 0px;
        right: 50px;
        background-color: rgb(28, 27, 27);
        animation: fadeShow .9s ease-in forwards;
    }
    @keyframes fadeShow {
        0%{ transform: translateY(0px); }
        100%{  transform: translateY(40px); }
    }


    /* responsive style */
    @media (max-width: 430px) {
        .icon{
            padding: 10px;
            font-size: 20px;
            margin-right: 7px;
        }
    }
    @media (max-width: 770px) {
        .searchBar{
            display: none;
        }
    }
    @media (max-width:480px) {
        .contact{
            right: 10px;
        }
    }
    @media (max-width:550px) {
        .icons{
            display: none;
        }
    }
    @media (max-width:400px) {
        .contact{
            max-width: 300px;
            right: 0px;
        }
    }
    @media (max-width:350px) {
        .contact{
            max-width: 280px;
        }
    }
</style>