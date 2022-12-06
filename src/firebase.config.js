import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCMdA_Ymf8oT0wSJcJ-_Xv_EykWqYCx03g",
    authDomain: "restaurant-app-5182e.firebaseapp.com",
    databaseURL: "https://restaurant-app-5182e-default-rtdb.firebaseio.com",
    projectId: "restaurant-app-5182e",
    storageBucket: "restaurant-app-5182e.appspot.com",
    messagingSenderId: "394290209293",
    appId: "1:394290209293:web:4ec354ad32b41b66466b44"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };