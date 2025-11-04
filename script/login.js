import { signInWithEmailAndPassword, signInWithPopup } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

import { auth, provider } from "./firebaseconfig.js";

const form = document.querySelector("#form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const googleBtn = document.querySelector("#googleSignIn")

form.addEventListener("submit", (event) => {
    event.preventDefault();

    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user);
            window.location = "index.html"
        })
        .catch((error) => {

            const errorMessage = error.message;
            console.log(errorMessage)
        });
});


googleBtn.addEventListener("click", () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log(user, token)

            window.location = "index.html"

        }).catch((error) => {
            // Handle Errors here.

            const errorMessage = error.message;
            console.log(errorMessage)
        });
});

