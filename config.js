
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore'

export const firebaseConfig = {
  apiKey: "AIzaSyBl34wujaal5epnG1ZpWhpRBLln6nvwH4M",
  authDomain: "ocm-app-aadc2.firebaseapp.com",
  projectId: "ocm-app-aadc2",
  storageBucket: "ocm-app-aadc2.appspot.com",
  messagingSenderId: "333314816560",
  appId: "1:333314816560:web:7c42afafad6b43f5998bf5"
}


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
