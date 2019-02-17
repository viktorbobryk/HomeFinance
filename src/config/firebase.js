import * as firebase from "firebase";
 
 var config = {
  apiKey: "AIzaSyAmPD6vG0-Moyw2c61U9IcaV54OLzAF4oo",
  authDomain: "homefinance-4beab.firebaseapp.com",
  databaseURL: "https://homefinance-4beab.firebaseio.com" 
};
firebase.initializeApp(config);

export const firebaseRef =firebase;


 