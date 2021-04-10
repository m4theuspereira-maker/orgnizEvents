
const { getUsuarioAtual } = require('../repositories/userRepository')
const { db, firebase } = require('../app')

const createEvento = async (evento) => {
  const result = await db.collection('eventos').doc(evento.id).set(evento).then(() => {
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

const editarParticipantes = async (id, participantes) => {

  let participantesArray = []

  participantes.map(participante => {
    participantesArray.push(participante)
  })

  const result = await db.collection("cities").doc(id).set(participantesArray, { merge: true })
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });

  return result
}

const getEventosByUsuarioId = async () => {
  try {

    const usuarioAtual = await getUsuarioAtual()
    let result = []

    await firebase.firestore().collection('eventos').where("usuarioId", "==", `${usuarioAtual.uid}`).get().then(snapshot => {
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

    if (!usuarioAtual.uid) {
      return confirm(`usuário ${usuarioAtual.displayName} não encontrado, verifique seu login`)
    }

    return result

  } catch (error) {
    throw console.log(error)
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
    }).catch(() => {
      throw ('erro ao retornar listas de eventos')
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

