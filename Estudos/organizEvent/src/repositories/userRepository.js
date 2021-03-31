
const { db, firebase } = require('../app')


const addEnderecoUsuario = async (bairro, cep, cidade, complemento, logradouro, numero) => {
    const dados = {
        bairro: bairro,
        cep: cep,
        complemento: cidade,
        complemento: complemento,
        logradouro: logradouro,
        numero: numero
    }
    return await db.collection('user').collection('endereco').add(dados).then((dados) => {
        console.log(`${dados} adicionados com sucesso`)
    }).catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message
        console.log(errorCode, errorMessage)
    })
}


const getUsuarios = async () => {
    return await db.collection('usuarios').get().then(snapshot => {
        snapshot.docs.forEach(usuario => {
          console.log(usuario.data())
        })
      })
}


const criarUsuario = async (email, password) => {
    return await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
            console.log(`usuario ${user} criado com sucesso`)
        })
        .catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
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

const enviarEmailVerificacao = () => {

    let user = firebase.auth().currentUser;

    user.sendEmailVerification().then(function () {
        console.log('email enviado com sucesso')
    }).catch((error) => {
        console.error(error)
    });

}


const resetaSenha = (email) => {
    firebase.auth().sendPasswordResetEmail(email)
        .then(function () {
            console.log('email enviado para ', email)
        })
        .catch((error) => {
            console.error(error)
        });
}

const login = (username, password) => {

    const user = firebase.auth().createUserWithEmailAndPassword(username, password).then((username) => {
        let currentUser = firebase.auth().currentUser
        console.log(currentUser)
        console.log('SUCESSO')
    }).catch(() => {
        if (!user) {
            login(username, password)
            console.log(`logando com ${username}`)
            if (user) console.log('logado com user')
        } else {
            console.log(`${username} já logado`)
            let currentUser = firebase.auth().currentUser
            console.log(currentUser.email)
        }
    })
}

module.exports = {
    addEnderecoUsuario,
    criarUsuario,
    resetaSenha,
    logout,
    enviarEmailVerificacao,
    login, 
    getUsuarios
}


