<template>
    <form enctype="multipart/form-data" class="bg-gray-400">
        <label >Name</label>
        <input type="text" required v-model="name">
        <label>Description</label>
        <input type="text" required v-model="description">
        <label>Upload Image</label>
        <input type="file" accept="image/*">
        <button>Create Profile</button>
    </form>
</template>

<script>
import { ref } from 'vue'
export default {
    setup(){
        const name=ref('');
        const description=ref('');



        return { name, description }
    }
}
</script>

<style scoped>
    form{
        max-width: 450px;
        padding: 15px;
        border-radius: 5px;
        box-sizing: border-box;
        margin: auto;
    }
    label{
        display: block;
        margin-bottom: 5px;
        margin-top: 10px;
        color: rgb(230, 230, 230);
    }
    input{
        width: 100%;
        padding: 7px;
        border: none;
        border-radius: 10px;
    }
    button{
        display: block;
        background-color: aqua;
        padding: 7px 10px;
        border: none;
        border-radius: 5px;
        margin:5px auto;
    }
    input:focus{
        outline: none;
    }
</style>