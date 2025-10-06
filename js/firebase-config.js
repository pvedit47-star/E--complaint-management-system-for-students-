// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTt79rWS_eUfESokW1vBbmvXPr10TZTQ4",
  authDomain: "ecomplaints-nandini.firebaseapp.com",
  projectId: "ecomplaints-nandini",
  storageBucket: "ecomplaints-nandini.firebasestorage.app",
  messagingSenderId: "526557162871",
  appId: "1:526557162871:web:da4635853740c7b0624572"
};

// Initialize Firebase and create global instances of its services
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();