import { auth, signOut } from "@/firebase/config"


let logout =async () => {
   await signOut(auth);
}


export default logout;