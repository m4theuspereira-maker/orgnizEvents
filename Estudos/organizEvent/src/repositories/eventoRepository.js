const {db} = require('../app')

const createEvento = async (evento) => {
   return await  db.firestore().collection('eventos').add(evento).then(() => {
      console.log('evento salvo?')
    }).catch(() => {
      console.log('evento não salvo')
    })
  }

  const getEventos = async () => {
    return await db.collection('eventos').get().then(snapshot => {

      snapshot.docs.forEach(evento => {
          console.log(evento.data())
          let teste = {joao: "Pererira", pedrito: "jaoa"}
          return teste;
      })
    })
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

