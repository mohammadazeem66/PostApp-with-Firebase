 //Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
 import { getFirestore,collection,updateDoc,getDocs,addDoc,deleteDoc,doc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js"
 import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";

 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 const firebaseConfig = {
    apiKey: "AIzaSyAdM_NpMPfxugkYEaWQZakxx2tzXlp4yf8",
    authDomain: "practice-ff692.firebaseapp.com",
    projectId: "practice-ff692",
    storageBucket: "practice-ff692.appspot.com",
    messagingSenderId: "622327775239",
    appId: "1:622327775239:web:52e9c716618df1d052aaa2",
    measurementId: "G-JPLCFYCDK8"
 };

 // Initialize Firebase
const app = initializeApp(firebaseConfig);
 const db = getFirestore(app); 
 const storage = getStorage(app);


 
 
 let btn = document.getElementById("btn");
 
 let post = document.getElementById('post');
 
 
 //  post.style.display="block"
 
 
 
 btn.addEventListener('click',async()=>{
     
     let input = document.getElementById("inpt").value;
     let discription = document.getElementById("discript").value;
     let file = document.getElementById("file").files;
     
     try {
         
         const docRef = await addDoc(collection(db, 'postapp'), {
             
             txt: input,
             discription: discription,
             
             
            });
            
            
            console.log("Document written with ID: ", docRef.id);
            
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        
        
        
        
        
        const storageRef = ref(storage, "MyPic");
        
        // 'file' comes from the Blob or File API
        uploadBytes(storageRef, file[0]).then((snapshot) => {
            console.log('Uploaded a blob or file!');
        });
        
        
        
        
        
        
        
        window.location.reload()
        
    })
    
    
    const querySnapshot = await getDocs(collection(db, "postapp"));
    querySnapshot.forEach((doc) => {
        
        getDownloadURL(ref(storage, "MyPic"))
        .then((url) => {
            // `url` is the download URL for 'images/stars.jpg'
            
            // Or inserted into an <img> element
            const img = document.getElementById('mypic');
            img.setAttribute('src', url);
        })
        
        .catch((error) => {
            // Handle any errors
        });
    
    post.innerHTML += `<h1>${(doc.data().txt)}</h1><h1>${(doc.data().discription)}</h1><button class="editbtn" onclick="edit('${doc.id}')">Edit</button><button class="delbtn" onclick="del('${doc.id}')">Delete</button>`
    
    console.log(doc.data(),"data");
    console.log(doc.id , "id");
    console.log(doc , "doc");
    
    
   });



    const edit = async(id) => {
        
    console.log(id);
    const editList = doc(db, "postapp", id);

    var editTitle = prompt('Enter Your Edit Title');
    var editDescript = prompt('Enter Your Edit Deicription');
    
    // Set the "capital" field of the city 'DC'
    await updateDoc(editList, {
        
        txt: editTitle,
        discription: editDescript,
        
    }).then(() => {
        
        window.location.reload();
    });
}

const del = async(id) =>{
     await deleteDoc(doc(db, "postapp", id))
     
     .then(() => {
      window.location.reload();
  });

}
window.del=del;
window.edit=edit;
