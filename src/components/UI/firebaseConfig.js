import {getAuth} from   "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDyvjx-2nkhV0Zp0cmKaOIGaW-PdI4lfA0",
    authDomain: "digital-store-19aaf.firebaseapp.com",
    databaseURL: "https://digital-store-19aaf-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "digital-store-19aaf",
    storageBucket: "digital-store-19aaf.appspot.com",
    messagingSenderId: "929674096648",
    appId: "1:929674096648:web:781fbf8ebc7def27bde1bd",
    measurementId: "G-KJQ57664HR"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);