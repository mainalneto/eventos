import firebase from 'firebase';

  
  const firebaseConfig = {
    apiKey: "AIzaSyCFIK1dFRKJcD-kgds137JE3ENjT16lUa0",
    authDomain: "eventos-6a8e0.firebaseapp.com",
    databaseURL: "https://eventos-6a8e0.firebaseio.com",
    projectId: "eventos-6a8e0",
    storageBucket: "eventos-6a8e0.appspot.com",
    messagingSenderId: "939455794310",
    appId: "1:939455794310:web:5836213022f86820cb5507"
    
  };
  
  // Initialize Firebase

  export default firebase.initializeApp(firebaseConfig);

 