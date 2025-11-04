import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";
import { auth } from "./firebaseconfig.js";
import {
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";
import { db } from "./firebaseconfig.js";

let uploadImage;
var myWidget = cloudinary.createUploadWidget(
  {
    cloudName: "dd1xxvrvk",
    uploadPreset: "abdulsalam",
  },
  (error, result) => {
    if (!error && result && result.event === "success") {
      console.log("Done! Here is the image info: ", result.info);
      uploadImage = result.info.secure_url

    }
  }
);

document.getElementById("upload_widget").addEventListener(
  "click",
  function () {
    myWidget.open();
  },
  false
);

const form = document.querySelector("#form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const fullname = document.querySelector("#name");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  console.log(email.value);
  console.log(password.value);
  console.log(fullname.value);

  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(async (userCredential) => {
      const user = userCredential.user;
      console.log(user.uid);

      try {
        const docRef = await addDoc(collection(db, "users"), {
          fullname: fullname.value,
          email: email.value,
          profile: uploadImage,
          uid: user.uid,
        });
        console.log("Document written with ID: ", docRef.id);
        window.location = "login.html"
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
    });
});


// import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js"
// import { auth, db } from "./firebasecofig.js";
// import { collection, addDoc } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

// let email = document.querySelector("#email");
// let password = document.querySelector("#password");
// let form = document.querySelector("#form");
// let fullName = document.querySelector("#name");

// let profileImg;
// var myWidget = cloudinary.createUploadWidget({
//     cloudName: 'dd1xxvrvk',
//     uploadPreset: 'abdulsalam'
// }, (error, result) => {
//     if (!error && result && result.event === "success") {
//         console.log('Done! Here is the image info: ', result.info);
//         profileImg = result.info.secure_url;
//     }
// }
// )
// document.getElementById("upload_widget").addEventListener("click", function () {
//     myWidget.open();
// }, false);

// form.addEventListener("submit", (event) => {
//     event.preventDefault();
//     console.log(email.value)
//     console.log(password.value)

//     createUserWithEmailAndPassword(auth, email.value, password.value)
//         .then(async (userCredential) => {

//             const user = userCredential.user;
//             console.log(user)
//             try {
//                 const docRef = await addDoc(collection(db, "users"), {
//                     name: fullName.value,
//                     email: email.value,
//                     uid: user.uid,
//                     profile: profileImg
//                 });
//                 console.log("Document written with ID: ", docRef.id);
//             } catch (e) {
//                 console.error("Error adding document: ", e);
//             }

//         })
//         .catch((error) => {
//             const errorMessage = error.message;
//             console.log(errorMessage)
//             // ..
//         });
// })