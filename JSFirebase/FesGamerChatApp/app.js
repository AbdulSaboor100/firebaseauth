////////////KeyOfFireBase//////////////
var firebaseConfig = {
    apiKey: "AIzaSyBIwKQENZ-gDjgRqmJqLy_63NdKAF_NS0Y",
    authDomain: "vipp-a7ca3.firebaseapp.com",
    projectId: "vipp-a7ca3",
    storageBucket: "vipp-a7ca3.appspot.com",
    messagingSenderId: "763710859487",
    appId: "1:763710859487:web:240e79b2a780877e7b616a",
    measurementId: "G-YLMYRM7DEC"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
////////////KeyOfFireBase//////////////

///////////////////Getting Element From DOM//////////////////////
let email = document.getElementById('email');
let Username = document.getElementById('UserName');
let password = document.getElementById('password');
///////////////////Getting Element From DOM//////////////////////


////////////////Functions///////////////////
let searchUser = document.getElementById('searchUser');
let container = document.getElementById('container');
let userDom = document.getElementById('userDom');
let randomGeneratedUID = Math.floor(Math.random() * 1000000000)

let keyGeneratedUID = [];
let errorUserNotFounds = [];
let auth = firebase.auth()
let db = firebase.firestore()
let dataSaveObject;


function registerUser(){
    auth.createUserWithEmailAndPassword(email.value,password.value)
        .then(function(data){
            let multiUs = data.user
         dataSaveObject = {
                email : multiUs.email,
                username : Username.value,
                UID : multiUs.uid
            };
              
            saveDataToFireStore(dataSaveObject)
            // window.location.replace('components/home.html');
            /////////////
            email.value = '';
            Username.value = '';
            password.value = '';
alert('Go to login Page')


        })
        .catch(function(error){
            console.log(error.message)
        })
        
}

function loginUser(){
    auth.signInWithEmailAndPassword(email.value,password.value)
        .then(function(data){
                window.location.replace('home.html')
         
        })
        .catch(function(error){
            console.log(error.message)
        })

}

auth.onAuthStateChanged((user) => {
    let currentUser = auth.currentUser;
console.log(currentUser.email,currentUser.uid)
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      // ...
    } else {
      // User is signed out
      // ...
    }
  });

function logOut(){
    auth.signOut()
        .then(function(logOutDetails){
            window.location.replace('../index.html')
        })
        .catch(function(logOutError){
            console.log(logOutError.message)
        })
}

//////////////////////////////////


function saveDataToFireStore(dataElement){
    
    let currentUser = auth.currentUser;
    db.collection('users').doc(currentUser.uid).set(dataElement)
        .then(function(saveData){
            console.log(saveData,'SAVED')
        })
        .catch(function(error){
            console.log(error.message)
        })
}
var docUID ;

function searchBar(){
    db.collection('users').get() 
        .then(function(fetchData){
            fetchData.forEach(function(RetriveData){
                if(searchUser.value === RetriveData.data().username){
                        searchUser.value =""
                        separeteStructure(RetriveData.data());  
                        docUID = RetriveData.data().UID

                }
                    
         
            })
        })
}

let divChat = document.getElementById('divChat');
let divChatInp = document.getElementById('divChatInp');
let sendMessageBtn = document.getElementById('sendMessageBtn');

function separeteStructure(dataElement){
    let currentUser = auth.currentUser;
    if(currentUser.uid === dataElement.UID){
        container.removeChild(container.firstChild)
    }else{
    var createUl = document.createElement('ul');
    var createLi = document.createElement('li');
    var createBtnli = document.createElement('button');
    var createBtnTextNode = document.createTextNode(dataElement.username);
    createLi.id = docUID;
    createLi.setAttribute('onclick','displaying(this)')
    createBtnli.className = 'btn';
    ///////appendingChilds///////
    createBtnli.appendChild(createBtnTextNode)
    createLi.appendChild(createBtnli)
    createUl.appendChild(createLi);
    container.appendChild(createUl)
//     setTimeout(function(){
//    container.removeChild(container.firstChild)
//     },3000)
    }
   
    ///////appendingChilds///////
    divChatInp.className = 'chatInp';
}
divChatInp.style.display = 'none'
sendMessageBtn.style.display = 'none'
////////////////Functions///////////////////

function displaying(){
    let bool = true;
    divChat.className = 'divChat';
    divChatInp.style.display = 'block'
    sendMessageBtn.style.display = 'block'
   ///////////////
   chattingUserData()
    //////////////
}

function chattingUserData(){
    /////1/////
    let createP1 = document.createElement('p');
    createP1.className = 'chatpara1';
    ////2////
    let createP2 = document.createElement('p');
    
    createP2.className = 'chatpara2';
    //////////////AppendingChilds/////////////

    divChat.appendChild(createP1)
    divChat.appendChild(createP2)
    //////////////AppendingChilds/////////////
    fetchRealTimeMessage(createP1,createP2);
}

function saveMessageToFirestore(){  
    db.collection('keys').add({
        keys : randomGeneratedUID,
    })
        .then(function(sendMessage){
        console.log(sendMessage,'SAVED')
        keyGeneratedUID.push(randomGeneratedUID);
    })
        .catch(function(error){
        console.log(error)
    })
    ///////////////////////////
    let currentUser = auth.currentUser;

    db.collection('messages').add({
        keys : randomGeneratedUID,
        messages : divChatInp.value,
        sendingUID : docUID,
        recieveUID : currentUser.uid
    })
        .then(function(sendMessage){
            console.log(sendMessage,'SAVED')
        })
        .catch(function(error){
            console.log(error)
        })
        /////////////////////////////////////////////

}

function fetchRealTimeMessage(createP1,createP2){
    let currentUser = auth.currentUser;
    db.collection("messages").onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
                var data = change.doc.data();

                db.collection('keys').get()
                    .then(function(keysDataScrap){
                        keysDataScrap.forEach(function(keysData){
                            console.log(data.sendingUID === currentUser.uid && docUID === data.recieveUID)
                            if(data.sendingUID === currentUser.uid && docUID === data.recieveUID){
                                let textNodeP2 = document.createTextNode(data.messages)
                                createP2.appendChild(textNodeP2);
                            }else if(data.recieveUID === currentUser.uid && data.sendingUID === docUID){
                                let textNodeP2 = document.createTextNode(data.messages)
                                createP2.appendChild(textNodeP2);
                            }
                            
                        })
                    })
                        
             
            }
            
        });

    });

}