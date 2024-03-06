import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDRgiKzophEU2p19Tvcex5LtTQkAJ70rvY",
  authDomain: "infra-5e79d.firebaseapp.com",
  projectId: "infra-5e79d",
  storageBucket: "infra-5e79d.appspot.com",
  messagingSenderId: "850095653480",
  appId: "1:850095653480:web:18a6be91544d58855e31dd"
};

export const firebaseApp = initializeApp(firebaseConfig);
export const storage = getStorage(firebaseApp);
