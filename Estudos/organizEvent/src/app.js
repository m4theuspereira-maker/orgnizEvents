require('dotenv').config()
const firebase = require('firebase/app')
require('firebase/firestore')
require('firebase/auth')

const admin = require('firebase-admin')

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASSUREMENT_ID
};
// Initialize Firebase

const firebaseInit = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()

module.exports = {  
  firebaseInit,
<<<<<<< HEAD
  firebase,
  db, 
=======
  db,
  firebase 
>>>>>>> 3b9658b0812fdbd076c0c48156e5232db7ea38c2
}
