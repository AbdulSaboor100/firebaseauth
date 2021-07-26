let email = document.getElementById('email');
let password = document.getElementById('password');
let names = document.getElementById('names');



function register() {
    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
        .then(function (userCre) {
            var user = userCre.user

            var savingData = {
                email: user.email,
                names: names.value,
                UID: user.uid
            }
            // console.log(savingData)

            firebase.firestore().collection('users').doc(user.uid).set(savingData)
                .then(function (get) {
                    if (get) {
                        window.location.replace('components/home.html')
                    }
                    console.log(get)
                }).catch(function (error) {
                    console.error(error);
                })



        })
        .catch(function (error) {
            console.error(error.message)
        })
}

function login() {
    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
        .then(function (userCre) {
            var user = userCre.user
            window.location.replace('components/home.html')
            // var savingData = {
            //     email: user.email,
            //     names: names.value,
            //     UID: user.uid
            // }

            // firebase.firestore().collection('users').add(savingData)
            //     .then(function (get) {
            //         if (get) {
            //             window.location.replace('components/home.html')
            //         }
            //         console.log(get)
            //     }).catch(function (error) {
            //         console.error(error);
            //     })   
            db.collection('users').doc(user.uid)
        })
        .catch(function (error) {
            console.error(error)
        })
}

firebase.auth().onAuthStateChanged((user) => {
    const users = firebase.auth().currentUser;
    console.log(users)
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User

        // ...
        fetchData();
    } else {
        // User is signed out
        // ...
    }
});



function logOut() {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        window.location.replace('../index.html')
    }).catch((error) => {
        // An error happened.
        console.error(error);
    });
}


function forgetPassword() {
    firebase.auth().sendPasswordResetEmail(email.value)
        .then(() => {
            // Password reset email sent!
            console.log('Sent SuccessFully')
            // ..
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.error(errorMessage);
            // ..
        });
}
var db = firebase.firestore()

function fetchData() {
    // var currentUser = firebase.auth().currentUser.uid;
    // console.log(currentUser)
    // var docRef = db.collection("users").doc(currentUser);

    // docRef.get().then((doc) => {
    //     if (doc.exists) {
    //         console.log("Document data:", doc.data());
    //     } else {
    //         // doc.data() will be undefined in this case
    //         console.log("No such document!");
    //     }
    // }).catch((error) => {
    //     console.log("Error getting document:", error);
    // });

    db.collection('users').get()
        .then(function(usersnapshot){
            usersnapshot.forEach(function(users){
                console.log(users.data())
            })
        })


}