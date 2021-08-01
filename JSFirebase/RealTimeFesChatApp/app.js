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
   if(sendMessage.value === ''){
    alert('Please Enter Message')
   }else{
       saveDataToFireStore()
   }
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
var globalOne,globalTwo;

function fetchData(){
  

        db.collection("Messages").onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
            var createLi;
            if (change.type === "added") {
                createLi = document.createElement('li');
                var delBtn = document.createElement('button');
                var createTextNode = document.createTextNode(change.doc.data().Message)
                var btnTextNode = document.createTextNode('delete');
               
                
                createLi.setAttribute('id',change.doc.id);
                delBtn.setAttribute('onClick','deleteListItem(this)')   
                
                createLi.appendChild(createTextNode);
                delBtn.appendChild(btnTextNode);
                createLi.appendChild(delBtn)
                dataInserted.appendChild(createLi);

                sendMessage.value = '';
                /////////Edited BUTTON/////////
               
                var editBtn = document.createElement('button');
                var editBtnTestNode = document.createTextNode('Edit Message');
                editBtn.appendChild(editBtnTestNode);
                createLi.appendChild(editBtn)
                // editBtn.setAttribute('onClick','editBtnlisten(this)')
               editBtn.onclick = function(){
                    updateBtn.onclick = function(){
                         db.collection('Messages').doc(change.doc.id).update({
                            Message : sendMessage.value
                        })
                        editBtn.style.display = 'inline';
                       
                }
                editBtn.style.display = 'none';
                }
                
                ///////////////////////////////////////////////////////////////
                var updateBtn = document.createElement('button');
                var updateTextNode = document.createTextNode('update'); 
                 updateBtn.appendChild(updateTextNode);
                createLi.appendChild(updateBtn)
                //////////////////////////////////////////////

                
//////////////////////////////

            }

            if (change.type === "modified") {
                let DataRecieve = document.getElementById(change.doc.id)
            //    let DataRecieve = change.doc.data().Message;
                   let textNodeReplace = document.createTextNode(change.doc.data().Message)
                    DataRecieve.replaceChild(textNodeReplace,DataRecieve.firstChild);
                 
                
            }

            if (change.type === "removed") {
                let removeListDom = document.getElementById(change.doc.id)
                removeListDom.remove()
        
            }
        });
    });
    
}


function deleteListItem(delElement){
    globalDocId = delElement;
    let docId = delElement.parentNode.id;
    db.collection('Messages').doc(docId).delete()
}


let sendBtn = document.getElementById('sendBtn');
let spanBtn = document.getElementById('spanBtn');

// function editBtnlisten(editElement){
    

//     let docId = editElement.parentNode.id;
    
    
// }


    function editBtnlisten(editElement){
        var updateBtn = document.createElement('button');
        var updateTextNode = document.createTextNode('update');
        updateBtn.appendChild(updateTextNode);
        spanBtn.appendChild(updateBtn)
    
        let docId = editElement.parentNode.id;
          
        updateBtn.onclick = function(){
            return db.collection('Messages').doc(docId).update({
                Message : sendMessage.value
            })
        
    }

        
    }

    



