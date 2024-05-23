import * as firebase from '@firebase/app';

import 'firebase/auth'
import 'firebase/firestore'
import  'firebase/storage'


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB0qAbKE3EbaYXEG8Xv367qwh4aEAXDsWE",
    authDomain: "fir-90e72.firebaseapp.com",
    projectId: "fir-90e72",
    storageBucket: "fir-90e72.appspot.com",
    messagingSenderId: "449910402605",
    appId: "1:449910402605:web:e53af99b13b155a1ecd2a4",
    measurementId: "G-Z5ZSE192GY"
  };

export default firebase.initializeApp(firebaseConfig)  