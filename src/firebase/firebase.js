import firebase from 'firebase/app';
import 'firebase/auth';
// import 'firebase/storage';
// import 'firebase/database';
// import 'firebase/firestore';
// import 'firebase/messaging';
// import 'firebase/functions';

 let auth = null;
 const config = {
  apiKey: "AIzaSyAmPD6vG0-Moyw2c61U9IcaV54OLzAF4oo",
  authDomain: "homefinance-4beab.firebaseapp.com",
  databaseURL: "https://homefinance-4beab.firebaseio.com" 
};
const firebaseRef = firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(function(user) {
    auth = user;
});

export default firebaseRef;


 