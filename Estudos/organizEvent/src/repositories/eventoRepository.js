const {db} = require('../app')

const createEvento = async (evento) => {
  const result =  await  db.collection('eventos').add(evento).then(() => {
      console.log('evento salvo?')
    }).catch(() => {
      console.log('evento não salvo')
    })

    return result
  }


  const getEventos = async () => {
    let result = []
    await db.collection('eventos').get().then(snapshot => {
      return snapshot.docs.forEach(evento => {        
          result.push(evento.data())
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

