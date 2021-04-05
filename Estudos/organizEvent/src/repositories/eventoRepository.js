const {db} = require('../app')

const createEvento = async (evento) => {
   return await  db.firestore().collection('eventos').add(evento).then(() => {
      console.log('evento salvo?')
    }).catch(() => {
      console.log('evento não salvo')
    })
  }

<<<<<<< HEAD
  const getEventos = async () => {
    return await db.collection('eventos').get().then(snapshot => {

      snapshot.docs.forEach(evento => {
          console.log(evento.data())
          let teste = {joao: "Pererira", pedrito: "jaoa"}
          return teste;
=======

  const getEventos = async () => {
    let result = []
    await db.collection('eventos').get().then(snapshot => {
      return snapshot.docs.forEach(evento => {        
          result.push(evento.data())
>>>>>>> 9e8ceb38ee5a10c0c49a7d1d4f218fa6d534048d
      })
    })
    return result
  }


  const atualizarEvento = async (id, descricao) => {
    return await db.collection('eventos').doc(id).update({ descricao: descricao }).then(() => {
      console.log('Atualizado com sucesso')
    }).catch(() => {
      console.log('erro ao atualizar')
    })
  }
  
  //atualizarEvento('7Yip40CmtxgVHvs3BKKr', 'qualquer coisa')
  
  const deletar = async (id) => {
    return await db.collection('evento').doc(id).delete().then(() => {
      console.log('deletado')
    }).catch(() => {
      console.log('deu erro')
    })
  }

  

  const findSubDocument = async (documentId, nomeCollection) => {
   return await db.collection('eventos').doc(documentId).collection(nomeCollection).get().then((snapshot) => {
      snapshot.forEach(doc => {
        console.log(doc.data())
      })
    }).catch(() => {
      console.log('error')
    })
  }
  
  const findById = async (id) => {
   return await db.collection('eventos').doc(id).get()
    .then((document) => {
      console.log(document.data())
      return document.data()
    }).catch(() => {
      console.log('deu erro')
    })
   
  }



module.exports ={
  createEvento, 
  getEventos, 
  atualizarEvento, 
  deletar, 
  findSubDocument, 
  findById
}

