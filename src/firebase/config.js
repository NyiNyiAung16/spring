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


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADxX5cxTzf3EKu0pQoZrUJFktsOUIUDZE",
  authDomain: "facebook-vue-73785.firebaseapp.com",
  projectId: "facebook-vue-73785",
  storageBucket: "facebook-vue-73785.appspot.com",
  messagingSenderId: "22662083601",
  appId: "1:22662083601:web:eab177733c63483f212db0"
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