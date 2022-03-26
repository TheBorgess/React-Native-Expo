// Import the functions you need from the SDKs you need
//import * as firebase from "firebase";
//import firebase from 'firebase/app';

///import * as firebase from 'firebase/app';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries




import firebase from "firebase";

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDkDXy63BTIadJrfluMM_EPVUTfQEIwMcs",
    authDomain: "fir-auth-37f8b.firebaseapp.com",
    projectId: "fir-auth-37f8b",
    storageBucket: "fir-auth-37f8b.appspot.com",
    messagingSenderId: "113817630837",
    appId: "1:113817630837:web:90dd6c2e7118eba31ea03c"
  };
  
  firebase.initializeApp(firebaseConfig);

  export default firebase; 

  // Initialize Firebase
  /////const app = initializeApp(firebaseConfig);

/* Initialize Firebase
let app;
if (firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig)
} else {
    app = firebase.app();
}

const auth = firebase.auth();

export { auth };
*/