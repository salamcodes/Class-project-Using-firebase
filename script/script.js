import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

import {
    collection,
    getDocs,
    query, where, orderBy
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";
import { auth, db } from "./firebaseconfig.js";

const loginbtn = document.querySelector(".Login");
const logOut = document.querySelector(".Logout");
const upload = document.querySelector(".Upload");
let profile = document.querySelector(".profile");
let container = document.querySelector(".products");
let allProducts = [];
onAuthStateChanged(auth, (user) => {
    if (user) {

        const uid = user.uid;
        console.log(uid);
        loginbtn.style.display = "none"
        logOut.style.display = "inline-block"

        getData(uid)


    } else {
upload.style.display = "none"
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

upload.addEventListener("click", () => {
    window.location = "upload.html"
})

async function getProductData() {

    const q = query(
        collection(db, "products"),
        orderBy("time", "desc")

    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        allProducts.push(doc.data())
    });
    renderProducts(allProducts);
}
getProductData();

function renderProducts(arr) {
    container.innerHTML = "";
    arr.forEach((item) => {
        container.innerHTML += `<div class="card">
            <img src="${item.productImg}" alt="Headphones">
            <div class="card-content">
                <h3>${item.productName}</h3>
                <p>${item.Description}</p>
                <span class="price">$${item.price}</span>
                <button class="learn-btn">Learn More</button>
            </div>
        </div>`
    })
};