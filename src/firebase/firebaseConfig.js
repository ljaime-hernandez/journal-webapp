import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID
  };

  const firebaseConfigTesting = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID
  };

  // both firebase configs are used differently, the process 
  // is going to be run in two environments, in a development and
  // a test one, for test purposes i created an additional 
  // database with firebase, which will run same processes as
  // the development database but will save the information
  // in another test database totally unrelated to the
  // one used in the webapp, this condition will decide
  // which object will be called with the proper env variables
  // depending on the webapp execution purpose
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