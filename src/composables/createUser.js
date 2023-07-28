import { auth, createUserWithEmailAndPassword, updateProfile } from "@/firebase/config";
import { ref } from "vue";

let error = ref(null);

let SignIn =async (email, password, displayName,photoURL) => {
    try{
        let res=await createUserWithEmailAndPassword(auth, email, password);
        let user = res.user;
        await updateProfile( user , {displayName,photoURL} );
        return res;
    }catch(err){
        if(err.message==='Firebase: Error (auth/email-already-exists)'){
            error.value = 'The provided email is already in use by an existing user. Each user must have a unique email.'
        }
        else if(err.message === 'Firebase: Error (auth/invalid-password)') {
            error.value = 'The provided value for the password user property is invalid. It must be a string with at least six characters.'
        }
        else{
            error.value = err.message;
        }
    }
}


let  createUser = () => {
    return { error, SignIn }
}

export default createUser;