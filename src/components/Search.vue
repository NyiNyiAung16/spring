<template>
    <div>
        <div class="search" >
             <!-- search bar small show -->
            <div class="smallBar items-center bg-gray-500 p-1 ml-1 border border-none rounded-lg block md:hidden " v-if="search">
                <font-awesome-icon icon="fa-solid fa-search" size="lg" class="text-gray-300 searchIcon" @click="searchUser(searchFilter)"/>
                <input type="text" class="bg-inherit ml-2 " placeholder="search in spring" v-model="searchFilter" >
                <font-awesome-icon icon="fa-solid fa-xmark" class="p-1 hover:text-red-600 border border-none rounded-xl" @click="hideNavIcon" />
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
    </div>        
</template>

<script>
import { ref } from 'vue'
import { onSnapshot, db, collection } from '../firebase/config'
export default {
    props:['search'],
    setup(props,context){
        let smallSearch = ref(false);
        let searchFilter=ref('');
        let searchShow = ref(false);
        let NothingSearch = ref(false);

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

        const hideNavIcon = () => {
            context.emit('hideNavIcon');
            searchShow.value = !searchShow.value
        }


        return{filterUsers, searchShow, searchUser, searchName, searchImgUrl, filterNames, smallSearch, NothingSearch, searchFilter, hideNavIcon }
    }
}

</script>

<style scoped>
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

    @media (max-width: 770px) {
        .searchBar{
            display: none;
        }
    }
</style>