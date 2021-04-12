
const { getUsuarioAtual } = require('../repositories/userRepository')
const { db, firebase } = require('../app')

const createEvento = async (evento) => {
  const result = await db.collection('eventos').doc(evento._id).set(evento).then(() => {
    return ('Evento cadastrado')
  }).catch((error) => {
    throw error
  })
  return result
}

const getEventos = async () => {
  let result = []
  await db.collection('eventos').get().then(snapshot => {
    return snapshot.docs.forEach(evento => {
      result.push(evento.data())
    })
  }).catch(error => {
    throw error
  })
  return result
}

const editarParticipantes = async (id, participantes) => {

  let participantesArray = []

  participantes.map(participante => {
    participantesArray.push(participante)
  })

  const result = await db.collection("eventos").doc(id).set({participantes: participantesArray}, {merge: true})
    .then(() => {
      return ("Cadastro de participantes realizado com sucesso");
    })
    .catch((error) => {
      throw(error);
    });

  return result
}

const getEventosByUsuarioId = async () => {
  try {

    const usuarioAtual = await getUsuarioAtual()
    let result = []

    await firebase.firestore().collection('eventos').where("usuarioId", "==", `${usuarioAtual.uid}`)
    .get().then(snapshot => {
      return snapshot.docs.forEach((evento) => {

        result.push({
          _id: evento.data()._id,
          titulo: evento.data().titulo,
          tipo: evento.data().tipo,
          dataInicial: evento.data().dataInicial,
          dataFinal: evento.data().dataFinal,
          horaInicial: evento.data().horaInicial,
          horaFinal: evento.data().horaFinal
        })
      })
    })
    return result

  } catch (error) {
    throw error
  }

}

const atualizarEvento = async (id, descricao) => {
  return await db.collection('eventos').doc(id).update({ descricao: descricao }).then(() => {
    console.log('Atualizado com sucesso')
  }).catch(() => {
    console.log('erro ao atualizar')
  })
}


const deletar = async (id) => {
  const result = await db.collection('eventos').doc(id).delete().then(() => {
    return ('deletado com sucesso')
  }).catch((error) => {
    throw error
  })

  return result
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
  let result = []
  await db.collection('eventos').where("_id", "==", `${id}`).get()
    .then((evento) => {
      return evento.forEach(snapshot => {
        result.push(snapshot.data())
      });
    }).catch((error) => {
      throw error
    })

  return result

}


module.exports = {
  editarParticipantes,
  getEventosByUsuarioId,
  createEvento,
  getEventos,
  atualizarEvento,
  deletar,
  findSubDocument,
  findById
}

