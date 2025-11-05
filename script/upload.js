import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

import {
    collection,
    getDocs,
    query, where, addDoc
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";
import { auth, db } from "./firebaseconfig.js";

const home = document.querySelector(".home");
const logOut = document.querySelector(".Logout");
let profile = document.querySelector(".profile")
const form = document.querySelector("#form");
const productName = document.querySelector("#product-name");
const description = document.querySelector("#description");
const productImg = document.querySelector(".upload-img");
const uploadBtn = document.querySelector("#upload-btn")
const price = document.querySelector("#price");
const productContainer = document.querySelector(".product-grid")
const allProducts = [];
let productImage;
onAuthStateChanged(auth, (user) => {
    if (user) {

        const uid = user.uid;
        console.log(uid);

        getData(uid)
        getProductData(uid)
    } else {

    }
});

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

home.addEventListener("click", () => {
    window.location = "index.html"
});

var myWidget = cloudinary.createUploadWidget(
    {
        cloudName: "dd1xxvrvk",
        uploadPreset: "abdulsalam",
    },
    (error, result) => {
        if (!error && result && result.event === "success") {
            console.log("Done! Here is the image info: ", result.info);
            productImage = result.info.secure_url;

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

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const user = auth.currentUser;
    console.log(productName.value)
    console.log(description.value)
    console.log(price.value)
    const products = {
        productName: productName.value,
        Description: description.value,
        price: price.value,
        productImg: productImage,
        uid: user.uid
    }

    try {
        const docRef = await addDoc(collection(db, "products"), products);
        console.log("Document written with ID: ", docRef.id);
        allProducts.push({ ...products, docId: docRef.id })
        renderProducts(allProducts);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
    productName.value = "";
    description.value = "";
    price.value = "";
});

async function getProductData(uid) {
    const q = query(collection(db, "products"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);

    const userProducts = [];

    querySnapshot.forEach((doc) => {
        userProducts.push({ ...doc.data(), docID: doc.id });
    });

    allProducts.length = 0;
    allProducts.push(...userProducts);

    renderProducts(allProducts);
}

function renderProducts(productsArr) {
    productContainer.innerHTML = "";

    productsArr.forEach((product) => {
        productContainer.innerHTML += `
      <div class="card">
        <img src="${product.productImg}" alt="Product">
        <div class="card-content">
          <h4>Name: ${product.productName}</h4>
          <p>Description: ${product.Description}</p>
          <div class="price">Price: $${product.price}</div>
        </div>
      </div>
    `;
    });
}