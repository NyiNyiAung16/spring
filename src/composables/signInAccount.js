import { ref } from "vue";
import { auth, signInWithEmailAndPassword } from "@/firebase/config";

let error = ref(null);

let LoginAccount = async (email, password) => {
    try{
        let res=await signInWithEmailAndPassword(auth,email,password);
        return res;
    }catch(e){
        if(e.message ==='Firebase: Error (auth/user-not-found).'){
            error.value = 'There is no existing user record corresponding to the provided identifier.'
        }
        else if(e.message === 'Firebase:Error(auth/invalid-password)') {
            error.value = 'The provided value for the password user property is invalid. It must be a string with at least six characters.'
        }else if(e.message ==='Firebase: Error (auth/wrong-password).' ){
            error.value = 'Your password is wrong! Please enter a correct password.'
        }
        else if(e.message === 'Firebase: Password should be at least 6 characters (auth/weak-password).'){
            error.value = 'Password should be at lease 6 characters!'
        }
        else{
            error.value = e.message;
        }
        
    }
}



let signInAccount = () => {
    return  { error, LoginAccount }
}


export default signInAccount;