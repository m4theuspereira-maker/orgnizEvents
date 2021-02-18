var firebaseConfig = {
  apiKey: "AIzaSyB-V3XjuC69h36ycuUzTqI1nQIXJyigtU0",
  authDomain: "organizevent.firebaseapp.com",
  projectId: "organizevent",
  storageBucket: "organizevent.appspot.com",
  messagingSenderId: "923472070515",
  appId: "1:923472070515:web:06f98cb19eb79d5964a706",
  measurementId: "G-XFGFLRWRLZ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const login = (username, password) => {
  firebase.auth().createUserWithEmailAndPassword(username, password)
    .then((user) => {
      console.log(user)
      // Signed in
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage)
    });
}

login('matheusmonaco123@gmail.com', '@Jeanvaljean24601')

const createEvento = () => {
  firebase.firestore().collection('evento').add({
    chave: toString(Math.random()),
    data_final: '23-05-21',
    data_inicial: '20-05-21',
    descricao: 'casal trouxa paga bebida e comida pra geral',
    inscricao: Math.random(),
    status: 1,
    tipo: 100,
    titulo: 'festa de casamento',
    visibilidade: 0
  }).then(() => {
    console.log('evento salvo?')
  }).catch(() => {
    console.log('evento não salvo')
  })
}

//createEvento()

const getEventos = () =>{
  firebase.firestore().collection('evento').get().then(snapshot =>{
    snapshot.docs.forEach(evento=>{
      console.log(evento.data())
    })
  })
}

//getEventos()


const atualizarEvento  =(id, descricao) =>{
  firebase.firestore().collection('evento').doc(id).update({descricao: descricao }).then(()=>{
    console.log('Atualizado com sucesso')
  }).catch(()=>{
    console.log('erro ao atualizar')
  })
}

//atualizarEvento('7Yip40CmtxgVHvs3BKKr', 'qualquer coisa')

const deletar = (id) => {
  firebase.firestore().collection('evento').doc(id).delete().then(()=>{
    console.log('deletado')
  }).catch(() =>{
    console.log('deu erro')
  })
}

//deletar('7mg4n9ixrDVAsGdzm9B7')

/** 
const findById = (id) =>{
  firebase.firestore().collection('evento').where('chave', '==', id).get().then((snapshot)=>{
    snapshot.docs.forEach(evento =>{
      console.log(evento.data())
    })
  }).catch(()=>{
    console.log(`${id} não encontrado`)
  })
}
*/

//findById('mgkdjeirtdj')

const findSubDocument =() =>{
  firebase.firestore().collection('evento').doc('7Yip40CmtxgVHvs3BKKr').collection('usuarios').get().then((snapshot)=>{
    snapshot.forEach(doc =>{
      console.log(doc.data())
    })
  }).catch(()=>{
    console.log('error')
  })
}

//findSubDocument()


const findById = (id) =>{
  firebase.firestore().collection('evento').doc(id).get().then((document)=>{
    console.log(document.data())
  }).catch(() =>{
    console.log('deu erro')
  })
}

findById('FzR5YTqKsyxiOjMpYGFS')



