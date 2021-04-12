require('dotenv').config({ path: ".env" })
const firebase = require('firebase/app')
require('firebase/firestore')
const auth = require('firebase/auth')

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

// const verificarUsuarioLogado = () => {
//   firebase.auth().onAuthStateChanged((usuario) => {
//     if (usuario) {
//       if (usuario.emailVerified) {
//         //if (confirm("Usuário logado, você deseja entrar?")) {
//          // window.location.href = "evento.html";
//         //}
//         console.log('usuário veirificado')
//       }
//     } else {
//       throw ("Não há usuários logados");
//     }
// });

// }

module.exports = {
  firebaseInit,
  db,
  firebase,
  auth
}

//https://github.com/m4theuspereira-maker/firebaseBasics/blob/master/resources/js/autenticacao.js