 // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyBestuOMbqo2cKIFzj5Ode9E8Xy5EhfiAU",
    authDomain: "vipp-817e7.firebaseapp.com",
    projectId: "vipp-817e7",
    storageBucket: "vipp-817e7.appspot.com",
    messagingSenderId: "638028005308",
    appId: "1:638028005308:web:a062563bfb17c4e2f535b9",
    measurementId: "G-QHB4VXCEQH"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();


let email = document.getElementById('email')
let password = document.getElementById('password')
let confrimPassword = document.getElementById('confrimPassword')
let username = document.getElementById('username')

let db = firebase.firestore();
let auth = firebase.auth();

async function register(){

        let dataAuth = await auth.createUserWithEmailAndPassword(email.value,password.value)
        if(dataAuth){
            let currentUser = auth.currentUser;
            var  data = {
                email : currentUser.email,
                username : username.value,
                UID : currentUser.uid
            }
            saveDataToFirestore(data)
        }


}



  auth.onAuthStateChanged((user) => {
    let pageLocArr = window.location.href.split('/');
    let pageName = pageLocArr[pageLocArr.length - 1];
    let authenticatedPages = ['home.html','products.html'];

    if (user && authenticatedPages.indexOf(pageName) === -1) {
        window.location = 'home.html';
    }
    else if (!user && pageName === 'home.html') {
        window.location = './index.html';
    }
});


async function saveDataToFirestore(dataElement){
  let currentUser = auth.currentUser;
    let userSaveData =  await db.collection('users').doc(currentUser.uid).set(dataElement);
    

}


async function login(){
  await auth.signInWithEmailAndPassword(email.value,password.value)

}


async function logOut(){
  await auth.signOut()
}


async function addProduct(){
  window.location.replace('products.html')
}


let productName = document.getElementById('productName')
let productDes = document.getElementById('productDes')
let img = document.getElementById('img')
function add(){
  let projectData = {
    productname : productName.value,
    productdescription : productDes.value
  }
  db.collection('products').doc(currentUser.uid).set(projectData)
}


function dataLoadCard(){
  db.collection('products').get()
    .then((productsData)=>{
      productsData.forEach((Products)=>{
        console.log(Products.doc.data())
      })
    })
}