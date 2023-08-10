import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateEmail,
  updatePassword,
  sendPasswordResetEmail
 } from "firebase/auth"

import { 
    getFirestore,
    collection,
    addDoc,
    serverTimestamp,
    getDocs,
    onSnapshot,
    orderBy,
    query,
    deleteDoc,
    doc, updateDoc,
    setDoc
 } from 'firebase/firestore'

import { 
  getStorage,
  ref ,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject
 } from 'firebase/storage'

//first config file

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyADxX5cxTzf3EKu0pQoZrUJFktsOUIUDZE",
//   authDomain: "facebook-vue-73785.firebaseapp.com",
//   projectId: "facebook-vue-73785",
//   storageBucket: "facebook-vue-73785.appspot.com",
//   messagingSenderId: "22662083601",
//   appId: "1:22662083601:web:eab177733c63483f212db0"
// };


//second config file

const firebaseConfig = {
  apiKey: "AIzaSyAbX1HJYdDaxAWDeDN3QHs4E8kwQYQZhVw",
  authDomain: "spring-1fb3b.firebaseapp.com",
  projectId: "spring-1fb3b",
  storageBucket: "spring-1fb3b.appspot.com",
  messagingSenderId: "621068856738",
  appId: "1:621068856738:web:9d3b4f6ef50056088456fb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

//firestore
const db = getFirestore(app);
const colRef = collection(db,'postMessage');
const q = query(colRef,orderBy('time','desc'));

//storage

const storage = getStorage(app);



export { auth, createUserWithEmailAndPassword, updateProfile, updateEmail, signInWithEmailAndPassword, onAuthStateChanged, signOut, colRef, addDoc, collection, serverTimestamp, getDocs, onSnapshot, q, doc, deleteDoc, db, updateDoc, storage, ref, getDownloadURL, uploadBytes, orderBy, query, uploadBytesResumable, deleteObject, sendPasswordResetEmail, updatePassword, setDoc };