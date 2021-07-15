let email = document.getElementById('inputEmail3');
let password = document.getElementById('inputPassword3');
let errors = document.getElementById('errors');
let accountInformation = document.getElementById('accountInformation');
let consext = document.getElementById('consext');

function accountRegister(){
    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
    console.log(user)
    // ...
  })
  .catch((error) => {
    var errorMessage = error.message;
        errors.innerHTML = errorMessage;
        errors.style.backgroundColor = 'red';
        errors.style.padding = '30px';
        errors.style.border = 'none';
        
        setTimeout(function(){
            errors.innerHTML = '';
            errors.style = ''
        },1500)
    // ..
  });
}


function accountLogin(){
    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    window.Location('./components/home.html')
        // ...
  })
  .catch((error) => {
    var errorMessage = error.message;
    errors.innerHTML = errorMessage;
    errors.style.backgroundColor = 'red';
    errors.style.padding = '30px';
    errors.style.border = 'none';
    
    setTimeout(function(){
        errors.innerHTML = '';
        errors.style = ''
    },1500)
  });
}



firebase.auth().onAuthStateChanged(function(user){
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    var uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});

var currentUsers = firebase.auth().currentUser()
console.log(currentUsers)