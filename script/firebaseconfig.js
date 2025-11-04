import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js"
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHWCyB7_LocmJkPwhugFm86696x1ZAAdI",
  authDomain: "class-project-24a78.firebaseapp.com",
  projectId: "class-project-24a78",
   storageBucket: "quetta-batch.firebasestorage.app",
  messagingSenderId: "508374369511",
  appId: "1:508374369511:web:a7da3d58b33e1cc0644e42"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);