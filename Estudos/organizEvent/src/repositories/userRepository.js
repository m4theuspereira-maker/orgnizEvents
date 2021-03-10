
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


const resetaSenha = (email) => {
    firebase.auth().sendPasswordResetEmail(email)
        .then(function () {
            console.log('email enviado para ', email)
        })
        .catch((error) => {
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


