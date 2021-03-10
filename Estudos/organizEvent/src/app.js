require('dotenv').config()
const firebase = require('firebase/app')
require('firebase/firestore')
require('firebase/auth')
const admin = require('firebase-admin')

const firebaseConfig = {
  apiKey: "AIzaSyB-V3XjuC69h36ycuUzTqI1nQIXJyigtU0",
  authDomain: "organizevent.firebaseapp.com",
  projectId: "organizevent",
  storageBucket: "organizevent.appspot.com",
  messagingSenderId: "923472070515",
  appId: "1:923472070515:web:06f98cb19eb79d5964a706",
  measurementId: "G-XFGFLRWRLZ"
};
// Initialize Firebase


const firebaseInit = firebase.initializeApp(firebaseConfig);

console.log(firebaseInit)
//firebase.analytics();


const db = firebase.firestore()


const login = (username, password) => {
  const user = firebase.auth().createUserWithEmailAndPassword(username, password)
    .then((user) => {
      console.log(user)
      // Signed in
      // ...
    })
    .catch(() => {
      if (!user) {
        login('matheusmonaco123@gmail.com', '@jeanvaljean')
        console.log(`logando com ${username}`)
        if (user) console.log('logado com user')
      } else {
        console.log(`${username} já logado`)
      }
    });
}

//login('matheusmonaco123@gmail.com', '@Jeanvaljean24601')

const createEvento = (evento) => {
  firebase.firestore().collection('evento').add(evento).then(() => {
    console.log('evento salvo?')
  }).catch(() => {
    console.log('evento não salvo')
  })
}

//createEvento()

const getEventos = () => {
  db.collection('evento').get().then(snapshot => {
    snapshot.docs.forEach(evento => {
      console.log(evento.data())
    })
  })
}

//getEventos()


const atualizarEvento = (id, descricao) => {
  db.collection('evento').doc(id).update({ descricao: descricao }).then(() => {
    console.log('Atualizado com sucesso')
  }).catch(() => {
    console.log('erro ao atualizar')
  })
}

//atualizarEvento('7Yip40CmtxgVHvs3BKKr', 'qualquer coisa')

const deletar = (id) => {
  db.collection('evento').doc(id).delete().then(() => {
    console.log('deletado')
  }).catch(() => {
    console.log('deu erro')
  })
}

//deletar('7mg4n9ixrDVAsGdzm9B7')

/** 
const findById = (id) =>{
  db.collection('evento').where('chave', '==', id).get().then((snapshot)=>{
    snapshot.docs.forEach(evento =>{
      console.log(evento.data())
    })
  }).catch(()=>{
    console.log(`${id} não encontrado`)
  })
}
*/

//findById('mgkdjeirtdj')

const findSubDocument = (documentId, nomeCollection) => {
  db.collection('evento').doc(documentId).collection(nomeCollection).get().then((snapshot) => {
    snapshot.forEach(doc => {
      console.log(doc.data())
    })
  }).catch(() => {
    console.log('error')
  })
}

//findSubDocument()


const findById = (id) => {
  db.collection('evento').doc(id).get().then((document) => {
    console.log(document.data())
  }).catch(() => {
    console.log('deu erro')
  })
}

const criarUsuario = (email, password) => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user) => {
      console.log(`usuario ${user} criado com sucesso`)
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage)
    });
}



const logout = () => {
  firebase.auth().signOut().then(() => {
    console.log('sessão encerrada')
  }).catch((error) => {
    console.error(error)
  });
}

const evniarEmailVerificacao = () => {

  let user = firebase.auth().currentUser;
  user.sendEmailVerification().then(function () {
    console.log('email enviado com sucesso')
  }).catch((error) => {
    console.error(error)
  });

}

const resetaSenha = (email) =>{
  firebase.auth().sendPasswordResetEmail(email)
    .then(function() {
      console.log('email enviado para ', email)
    })
    .catch((error) => {
      console.error(error)
    });
  }





//findById('FzR5YTqKsyxiOjMpYGFS')


module.exports = {
  getEventos,
  firebaseInit,
  login,
  criarUsuario,
  findById,
  atualizarEvento,
  createEvento,
  criarUsuario,
  findSubDocument,
  deletar,
  logout,
  evniarEmailVerificacao,
  resetaSenha
}
