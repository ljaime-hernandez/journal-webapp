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

  const firebaseConfigTesting = {
    apiKey: "AIzaSyD3uJOuxU5oh3CNEH4Wt84tVqYh1j8KIY4",
    authDomain: "journal-webapp-tests.firebaseapp.com",
    projectId: "journal-webapp-tests",
    storageBucket: "journal-webapp-tests.appspot.com",
    messagingSenderId: "1026223581721",
    appId: "1:1026223581721:web:dbee46d260c34781451888"
  };

  if(process.env.NODE_ENV === 'test'){
    firebase.initializeApp(firebaseConfigTesting);
  } else {
    firebase.initializeApp(firebaseConfig);
  }

  const db = firebase.firestore();
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  export {
      db,
      googleAuthProvider,
      firebase
  }