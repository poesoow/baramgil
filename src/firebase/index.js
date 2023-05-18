import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyB1GQRaM0TeegI9EHlP7aYcfusztCN6sUc",
  authDomain: "baramgil-a1d50.firebaseapp.com",
  projectId: "baramgil-a1d50",
  storageBucket: "baramgil-a1d50.appspot.com",
  messagingSenderId: "904025021061",
  appId: "1:904025021061:web:9b8b1c148a742a472be7ec"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage }