import firebase from 'firebase/app'
import "firebase/auth"
import "firebase/database"
import "firebase/storage"

var firebaseConfig = {
    apiKey: "AIzaSyDxZtgcOIr7H-ZOmuHUja1nemcJkaSjpSc",
    authDomain: "react-live-poll-4d98f.firebaseapp.com",
    databaseURL: "https://react-live-poll-4d98f.firebaseio.com",
    projectId: "react-live-poll-4d98f",
    storageBucket: "react-live-poll-4d98f.appspot.com",
    messagingSenderId: "299010166362",
    appId: "1:299010166362:web:ac7e326b71b9fd91009263"

};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export {
    firebaseApp
};