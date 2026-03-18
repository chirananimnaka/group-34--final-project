// Check for Offline Mode early
if (typeof localStorage !== 'undefined' && localStorage.getItem('ss_system_mode') === 'offline') {
    console.warn("🚫 SportSphere: External APIs (Firebase) disabled in Offline Mode.");
    window.SS_FB = { 
        disabled: true, 
        auth: { currentUser: null }, 
        db: {}, 
        storage: {},
        methods: {
            // Mock empty methods to prevent crashes
            getDocs: async () => ({ docs: [] }),
            onSnapshot: () => (() => {}),
            addDoc: async () => ({ id: 'local-' + Date.now() }),
            deleteDoc: async () => {},
            ref: () => ({}),
            uploadBytes: async () => ({ ref: {} }),
            getDownloadURL: async () => "",
            deleteObject: async () => {},
            doc: () => ({}),
            collection: () => ({}),
            query: () => ({}),
            where: () => ({})
        }
    };
    // Stop execution here in offline mode
    throw new Error("MOCK_STOP_FOR_OFFLINE"); 
}

// We use the modular SDK from CDN for easy deployment on GitHub Pages
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, doc, setDoc, query, where, onSnapshot, deleteDoc, updateDoc, arrayUnion, arrayRemove, serverTimestamp, increment } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyAelmX_eFQmrkeurAYVLuXYHbMxLw5U8lE",
  authDomain: "sportspheredb.firebaseapp.com",
  projectId: "sportspheredb",
  storageBucket: "sportspheredb.firebasestorage.app",
  messagingSenderId: "721881814765",
  appId: "1:721881814765:web:71813705c281283cc31ee4",
  measurementId: "G-8P2GK2SECD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();

// Export as Global Object for non-module scripts
window.SS_FB = {
    auth, db, storage, googleProvider,
    methods: {
        signInWithPopup,
        signInWithEmailAndPassword,
        createUserWithEmailAndPassword,
        onAuthStateChanged,
        signOut,
        collection,
        addDoc,
        getDocs,
        doc,
        setDoc,
        query,
        where,
        onSnapshot,
        deleteDoc,
        updateDoc,
        arrayUnion,
        arrayRemove,
        serverTimestamp,
        increment,
        ref,
        uploadBytes,
        getDownloadURL,
        deleteObject
    }
};

console.log("🔥 SportSphere Firebase Connected: sportspheredb");
