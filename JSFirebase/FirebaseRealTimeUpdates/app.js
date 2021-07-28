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

let sendMessage = document.getElementById('sendmessage');
// let userName = document.getElementById('Username')
let db = firebase.firestore()

function send(){
    saveDataToFireStore()
}


function saveDataToFireStore(){
    db.collection('Messages').add({
        // Username : userName.value,
        Message : sendMessage.value,
        timeStamp : new Date
    }).then(function(send){
        console.log(send)
    }).catch(function(error){
        console.log(error.message)
    })
}


let dataInserted = document.getElementById('dataInserted');

function fetchData(){
  
        db.collection("Messages").onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
                let createLi = document.createElement('li');
                let createTextNode = document.createTextNode(change.doc.data().Message)
                createLi.appendChild(createTextNode);
                dataInserted.appendChild(createLi);
                sendMessage.value = ''
            }
            if (change.type === "modified") {
                let createLi = document.createElement('li');
                let createTextNode = document.createTextNode(change.doc.data().Message)
                createLi.appendChild(createTextNode);
                dataInserted.appendChild(createLi);
                sendMessage.value = ''

            }
            if (change.type === "removed") {
                let createLi = document.createElement('li');
                let createTextNode = document.createTextNode(change.doc.data().Message)
                createLi.appendChild(createTextNode);
                dataInserted.appendChild(createLi);   
                sendMessage.value = ''
        
            }
        });
    });
    
}