import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyApIaXSShswKoq2bJFgEGIfGPSm746dZs8',
  authDomain: 'chatportofolio.firebaseapp.com',
  databaseURL: 'https://chatportofolio.firebaseio.com',
  projectId: 'chatportofolio',
  storageBucket: 'chatportofolio.appspot.com',
  messagingSenderId: '790529134705',
  appId: '1:790529134705:web:78d0ad5db7930a3f588bd0',
  measurementId: 'G-6M3BZMQ80Z',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export default firebase;
