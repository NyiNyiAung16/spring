<template>
  <div class="Navbar flex shadow-xl justify-between items-center px-3 py-2 bg-gray-800">
        <div class="flex gap-4 items-center">
            <h3 class="text-xl sm:text-2xl text-gray-300 tracking-wide">SPR<span class="text-blue-500 font-bold">ING</span></h3>
            <font-awesome-icon icon="fa-solid fa-search" size="lg" class="inline md:hidden text-gray-300 icon " @click="smallSearch=!smallSearch" v-if="!smallSearch"  />
        </div>
        <div class="search" >
             <!-- search bar small show -->
            <div class="smallBar flex items-center bg-gray-500 p-1 ml-1 border border-none rounded-lg block md:hidden " v-if="smallSearch">
                <font-awesome-icon icon="fa-solid fa-search" size="lg" class="text-gray-300 searchIcon" @click="searchUser(searchFilter)"/>
                <input type="text" class="bg-inherit ml-2 " placeholder="search in spring" v-model="searchFilter" >
                <font-awesome-icon icon="fa-solid fa-xmark" class="p-1 hover:text-red-600 border border-none rounded-xl" @click="smallSearch=!smallSearch" />
            </div>
            <!-- larger search bar -->
            <div class="searchBar bg-gray-500 p-2 border border-none rounded-lg ">
                <font-awesome-icon icon="fa-solid fa-search" size="lg" class="text-gray-300"/>
                <input type="search" class="bg-inherit  " placeholder="search in spring" v-model="searchFilter" @keypress.enter="searchUser(searchFilter)">
            </div>
            <div v-if="searchShow" class="searchName bg-gray-700">
                <div class="loopSearch m-1 p-2 border border-none flex items-center justify-between " v-for="name in filterNames" :key="name.id" >
                    <div class="flex items-center gap-1">
                        <img :src="name.photo" alt="searchImage">
                        <span class="text-blue-400 text-lg">{{name.userName}}</span>
                    </div>
                    <div>
                        <font-awesome-icon icon="fa-solid fa-xmark" size="lg" class="text-white hover:text-red-700 cursor-pointer" @click="searchShow=false" />
                    </div>
                </div>
            </div>
            <div class="searchNone bg-gray-700 flex items-center justify-between " v-if="NothingSearch">
                <span class=" text-white text-lg ">nothing to search</span>
                <font-awesome-icon icon="fa-solid fa-xmark" size="lg" class="text-white hover:text-red-700 cursor-pointer" @click="NothingSearch=false" />
            </div>
        </div>

        <!-- right icon section -->
        <div class=" text-gray-300 cursor-pointer flex items-center relative" :class="{icons:searchShow}" v-if="!smallSearch" >
            <router-link to="/chatroom" class="chatroom" >
                <font-awesome-icon :icon="['far', 'comment-dots']"  size="xl" class="mr-4 icon text-white" />
            </router-link>
            <router-link to="/updateProfile" class="password">
                <font-awesome-icon icon="fa-solid fa-lock" size="xl" class="mr-4 icon text-white" />
            </router-link>
            <div class="profileContainer inline" @click="profileController=!profileController">
                <img :src="NavbarUrl" alt="NavbarImage" class="navbarImg">
                
                <ul class="profileHover" v-if="profileController">
                    <li class="text-sm hover:text-green-200 hover:underline"><router-link to="/updateProfile">Update Profile</router-link></li>
                    <li class="block md:hidden cursor-pointer hover:text-blue-400" @click="contactShow=!contactShow">Contact</li>
                    <button class="border border-none p-1 rounded-md hover:text-blue-300 hover:bg-gray-600" @click="Logout">Logout</button>
                </ul>
            </div>
            <div v-if="contactShow" class="contact  block md:hidden">
                <Contact @hide="contactShow=!contactShow"></Contact>
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
        let NothingSearch = ref(false);
        let smallSearch=ref(false)
        let profileController=ref(false);
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

        let searchName = ref('');
        let searchImgUrl = ref('');
        let filterNames = ref([]);
        let searchUser = (key) => {
            searchShow.value = true
            let filterName = filterUsers.value.filter((user) => {
                return user.userName===key;
            })
            if(filterName.length > 0){
                NothingSearch.value = false;
                filterNames.value = filterName
            }else{
                searchShow.value = false;
                NothingSearch.value = true;
            } 
        }

        return { searchFilter,NothingSearch, Logout, NavbarUrl, userName, filterUsers, contactShow, searchShow, searchUser, searchName, searchImgUrl, filterNames, smallSearch, profileController }
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
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    input{
        width: 90%;
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
    .profileHover{
        min-width: 120px;
        position: absolute;
        right: 0;
        top: 60px;
        border-radius: 10px;
        padding: 5px 15px;
        background-color: rgb(35, 50, 73);
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

    /* search style */
    .search{
        position: relative;
    }
    .searchName{
        width: 100%;
        position: absolute;
        top: 45px;
        text-align: center;
        margin-top: 5px;
        border-radius: 10px;
        animation: fade-in 0.8s ease-in;
    }
    .searchName img{
        width: 40px;
        height: 40px;
        clip-path: circle();
        object-fit: cover;
    }

    @keyframes fade-in {
        from{transform: translateX(-30px);opacity: 0;}
        to{transform: translateX(0px);opacity: 1;}
    }

    .searchNone{
        width: 100%;
        position: absolute;
        padding:10px;
        border-radius: 10px;
        margin-top: 5px;
    }
    .loopSearch{
        transition: all 0.8s linear;
    }
    .loopSearch:hover{
        background-color: rgb(25, 29, 41);
        color: white;
        border-radius: 5px;
    }
    .searchIcon{
        background-color: transparent;
        padding: 8px;
        color: white;
        border-radius: 5px;
        cursor: pointer;
        transition: all 1s linear;
    }
    .searchIcon:hover{
        background-color: #4e5156;
    }
    .smallBar{
        box-sizing: border-box;
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