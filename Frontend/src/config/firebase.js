import firebase from "firebase/app"
import "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyD303SPwyki8acQR_Uhmv5LLqjRylI5604",
    authDomain: "attendance-management-sy-520c2.firebaseapp.com",
    projectId: "attendance-management-sy-520c2",
    storageBucket: "attendance-management-sy-520c2.appspot.com",
    messagingSenderId: "364641671554",
    appId: "1:364641671554:web:e4d5ade8fb444958da979b",
    measurementId: "G-V87RCTXNRN"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth()
export default firebase
