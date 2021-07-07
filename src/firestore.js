import firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAJkhpumDXBPGzVVN1YrZMEZK8Kl_DCGBQ",
    authDomain: "react-ecommerce-1e532.firebaseapp.com",
    projectId: "react-ecommerce-1e532",
    storageBucket: "react-ecommerce-1e532.appspot.com",
    messagingSenderId: "696381836280",
    appId: "1:696381836280:web:e2e322905a943b128de40d"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();