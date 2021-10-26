import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
} from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";
import {
  getStorage,
  ref,
  uploadBytes,
} from "https://www.gstatic.com/firebasejs/9.1.3/firebase-storage.js";
import { v4 as uuid } from "https://cdn.skypack.dev/uuid";

const firebaseConfig = {
  apiKey: "AIzaSyCOjfDsxg8tB9ZmGDE-5MMjQtRWacgbpTI",
  authDomain: "devcv-ef9c9.firebaseapp.com",
  projectId: "devcv-ef9c9",
  storageBucket: "devcv-ef9c9.appspot.com",
  messagingSenderId: "84234427684",
  appId: "1:84234427684:web:1b7a984fd9fd720470a7b1",
};

initializeApp(firebaseConfig);

const db = getFirestore();

const fileInput = document.getElementById("file_input");

async function handleSubmit(event) {
  event.preventDefault();

  const submissionId = uuid();

  const storage = getStorage();
  const fileRef = ref(storage, `/cvs/${submissionId}.pdf`);

  const file = fileInput.files[0];
  await uploadBytes(fileRef, file);

  const params = new URLSearchParams(window.location.search);
  const stripeSessionId = params.get("session");

  const docRef = doc(db, "submissions", submissionId);
  const data = {
    stripeSessionId,
    email: "justinvosnz@gmail.com",
  };

  await setDoc(docRef, data);

  // done
}

const form = document.getElementById("form");
form.addEventListener("submit", handleSubmit);
