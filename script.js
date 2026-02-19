import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import {
    getFirestore,
    collection,
    getDocs,
    query,
    orderBy
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBA7eh9M-RRbn6A_4rG8oDTNgKnYLPtcGc",
    authDomain: "block-bar-menu.firebaseapp.com",
    projectId: "block-bar-menu",
    storageBucket: "block-bar-menu.firebasestorage.app",
    messagingSenderId: "390090016116",
    appId: "1:390090016116:web:1cca6a1a0edd3dc5685821"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


/* UCITAVANJE MENIJA IZ BAZE */

async function ucitajMeni() {

    // 🔥 Firestore SORTIRA umesto nas
    const q = query(
        collection(db, "meni"),
        orderBy("redosled")
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {

        const data = doc.data();

        const kategorijaDiv =
            document.getElementById(data.kategorija);

        if (!kategorijaDiv) return;

        kategorijaDiv.innerHTML += `
            <div class="card">
                <span>${data.naziv}</span>
                <span class="price">${data.cena} RSD</span>
            </div>
        `;
    });
}

ucitajMeni();


/* OTVARANJE / ZATVARANJE KATEGORIJE */

const buttons = document.querySelectorAll(".category-btn");

buttons.forEach(button => {
    button.addEventListener("click", () => {

        const content = button.nextElementSibling;

        document.querySelectorAll(".category-content").forEach(section =>{
            if (section !== content){
                section.style.maxHeight = null;
            }
        });

        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
});
