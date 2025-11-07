import {
    getDoc, doc
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";
import { db } from "./firebaseconfig.js";

const docId = localStorage.getItem("productId");
console.log(docId)

async function getData() {
    try {
        const docRef = doc(db, "products", docId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            console.log("Product data:", data);

            document.querySelector(".product-img").src = data.productImg;
            document.querySelector("#productName").textContent =data.productName;
            document.querySelector("#productDescription").textContent ="Description : " +  data.Description;
            document.querySelector("#productPrice").textContent = `Price : $${data.price}`;
        } else {
            console.log("No such document!");
        }
    } catch (error) {
        console.error("Error getting document:", error);
    }
}
getData();

