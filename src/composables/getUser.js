import { auth, onAuthStateChanged } from "@/firebase/config";
import { ref } from "vue";

let user = ref(auth.currentUser);
onAuthStateChanged(auth,(_user) => {
    user.value = _user;
})

export default user;