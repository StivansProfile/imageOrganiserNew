import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";

const firebaseConfig = {

  apiKey: "AIzaSyCMD2cKMwLudCG_hn1Tm56xGYIoF_7C8rA",

  authDomain: "images-b06f7.firebaseapp.com",

  projectId: "images-b06f7",

  storageBucket: "images-b06f7.appspot.com",

  messagingSenderId: "542102804599",

  appId: "1:542102804599:web:ec41df3cb61cf12b6e4e72",

  measurementId: "G-XLBNMRMB1W"

};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;