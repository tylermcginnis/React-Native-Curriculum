import firebase from 'firebase'

firebase.initializeApp({
    apiKey: "AIzaSyBRvPF4uPoe-GCsC_6Jk1C1H0i_9NCdmWo",
    authDomain: "polls-b3d2a.firebaseapp.com",
    databaseURL: "https://polls-b3d2a.firebaseio.com",
    storageBucket: "",
})

const ref = firebase.database().ref()
const firebaseAuth = firebase.auth()
const facebookProvider = firebase.auth.FacebookAuthProvider

export {
  ref,
  firebaseAuth,
  facebookProvider,
}