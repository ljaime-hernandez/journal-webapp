import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAIS5Oppt48DeEOfM5xQzQyEALP7UBZKFc",
    authDomain: "reacttraining-38958.firebaseapp.com",
    projectId: "reacttraining-38958",
    storageBucket: "reacttraining-38958.appspot.com",
    messagingSenderId: "394887863108",
    appId: "1:394887863108:web:1d8176fbd18be6526f1511"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  export {
      db,
      googleAuthProvider,
      firebase
  }