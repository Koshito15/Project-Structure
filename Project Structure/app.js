import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Replace this with your Firebase config
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChqVG6nmpPuJh0x21hh4NDA-a_03LiywI",
  authDomain: "cloud-todo-4a501.firebaseapp.com",
  projectId: "cloud-todo-4a501",
  storageBucket: "cloud-todo-4a501.firebasestorage.app",
  messagingSenderId: "857819621703",
  appId: "1:857819621703:web:7a1fa95d1d37e2087e8462",
  measurementId: "G-HG1F2CXE9P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const tasksCol = collection(db, "tasks");

window.addTask = async function () {
  const taskInput = document.getElementById("taskInput");
  if (taskInput.value.trim()) {
    await addDoc(tasksCol, {
      text: taskInput.value.trim()
    });
    taskInput.value = "";
  }
};

const taskList = document.getElementById("taskList");

onSnapshot(tasksCol, (snapshot) => {
  taskList.innerHTML = "";
  snapshot.forEach((docSnap) => {
    const li = document.createElement("li");
    li.textContent = docSnap.data().text;
    li.onclick = async () => {
      await deleteDoc(doc(db, "tasks", docSnap.id));
    };
    taskList.appendChild(li);
  });
});
