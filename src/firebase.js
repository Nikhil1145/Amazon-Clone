import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';



const firebaseConfig = {
  apiKey: "AIzaSyBQkRC9d5szsJJX8jFnsL_ICaN09IXOwNU",
  authDomain: "challenge-6a092.firebaseapp.com",
  projectId: "challenge-6a092",
  storageBucket: "challenge-6a092.appspot.com",
  messagingSenderId: "742786969874",
  appId: "1:742786969874:web:11985d21c6e7b7580fc3cb"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db , auth };

