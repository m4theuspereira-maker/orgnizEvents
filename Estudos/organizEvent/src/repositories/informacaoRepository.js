const { db } = require('../app')


const createInformacoes = async (informacoes) => {
  return await db.firestore().collection('informacoes').add(informacoes).then(() => {
    console.log('informacoes salvo?')
  }).catch(() => {
    console.log('evento não salvo')
  })
}


const getInformacoes = async () => {
  return await db.collection('informacoes').get().then(snapshot => {
    snapshot.docs.forEach(evento => {
      console.log(evento.data())
    })
  })
}


const atualizarInformacoes = async (id, informacoes) => {
  return await db.collection('informacoes').doc(id).update(informacoes).then(() => {
    console.log('Atualizado com sucesso')
  }).catch(() => {
    console.log('erro ao atualizar')
  })
}

//atualizarEvento('7Yip40CmtxgVHvs3BKKr', 'qualquer coisa')

const deletar = async (id) => {
  return await db.collection('informacoes').doc(id).delete().then(() => {
    console.log('deletado')
  }).catch(() => {
    console.log('deu erro')
  })
}



const findSubDocument = async (documentId, nomeCollection) => {
  return await db.collection('informacoes').doc(documentId).collection(nomeCollection).get().then((snapshot) => {
    snapshot.forEach(doc => {
      console.log(doc.data())
    })
  }).catch(() => {
    console.log('error')
  })
}

//findSubDocument()


const findById = async (id) => {
  return await db.collection('informacoes').doc(id).get().then((document) => {
    console.log(document.data())
  }).catch(() => {
    console.log('deu erro')
  })
}

module.exports = {
  createInformacoes,
  getInformacoes,
  atualizarInformacoes,
  deletar,
  findSubDocument,
  findById
}