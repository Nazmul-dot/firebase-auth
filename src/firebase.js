import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyARE5Td4Pfn5YFcmqCHojGV31wU54adqC4",
    authDomain: "fir-auth-72b0c.firebaseapp.com",
    projectId: "fir-auth-72b0c",
    storageBucket: "fir-auth-72b0c.appspot.com",
    messagingSenderId: "197254910503",
    appId: "1:197254910503:web:a6dc728701ea3968d5b402"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export const auth = firebase.auth();
  export const provider = new firebase.auth.GoogleAuthProvider();
  export const FBprovider = new firebase.auth.FacebookAuthProvider();
// export default firebase;

