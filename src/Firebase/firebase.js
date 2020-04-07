import firebase from 'firebase/app';
import 'firebase/storage';


  var firebaseConfig = {
    apiKey: "AIzaSyBkcdcWDc3Jl63R3pJMae27Qd3FfaDkm2g",
    authDomain: "tuulye-frontend.firebaseapp.com",
    databaseURL: "https://tuulye-frontend.firebaseio.com",
    projectId: "tuulye-frontend",
    storageBucket: "tuulye-frontend.appspot.com",
    messagingSenderId: "1039355365796",
    appId: "1:1039355365796:web:3aac90fd3165a1079d1931",
    measurementId: "G-9YGGQ5DEGZ"
  };
  
  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();



  export { firebase, storage as default };