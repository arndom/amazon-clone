import firebase from "firebase";  

const firebaseConfig = {
    apiKey: "AIzaSyCS4fXxmeqdwihxQ63pt8YelQTrgyNKlSs",
    authDomain: "clone-b48b7.firebaseapp.com",
    databaseURL: "https://clone-b48b7.firebaseio.com",
    projectId: "clone-b48b7",
    storageBucket: "clone-b48b7.appspot.com",
    messagingSenderId: "97105861693",
    appId: "1:97105861693:web:632af586d33f6101a95e54",
    measurementId: "G-83ZN2342RS"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export {db, auth};