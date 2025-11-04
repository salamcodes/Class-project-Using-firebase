import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

import {
    collection,
    getDocs,
    query, where
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";
import { auth, db } from "./firebaseconfig.js";

const loginbtn = document.querySelector(".Login");
const logOut = document.querySelector(".Logout");
const upload = document.querySelector(".Upload");
let profile = document.querySelector(".profile")

onAuthStateChanged(auth, (user) => {
    if (user) {

        const uid = user.uid;
        console.log(uid);
        loginbtn.style.display = "none"
        logOut.style.display = "inline-block"

        getData(uid)


    } else {

    }
});
loginbtn.addEventListener("click", () => {
    console.log("clicked")
    window.location = "login.html"
})

async function getData(uid) {

    const q = query(
        collection(db, "users"),
        where("uid", "==", uid),

    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        profile.src = doc.data().profile;
    });
}

logOut.addEventListener("click", () => {
    signOut(auth).then(() => {
        window.location = "login.html"
    }).catch((error) => {
        alert(error)
    });
});

upload.addEventListener("click" , ()=>{
    window.location = "upload.html"
})

