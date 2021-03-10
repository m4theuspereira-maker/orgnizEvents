

const createEvento = (evento) => {
    firebase.firestore().collection('evento').add(evento).then(() => {
      console.log('evento salvo?')
    }).catch(() => {
      console.log('evento não salvo')
    })
  }


  const getEventos = () => {
    db.collection('evento').get().then(snapshot => {
      snapshot.docs.forEach(evento => {
        console.log(evento.data())
      })
    })
  }


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



