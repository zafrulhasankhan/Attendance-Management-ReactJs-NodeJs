// import firebase from "./firebase-config";
import firebase from '../config/firebase';

export var facebookProvider = new firebase.auth.FacebookAuthProvider();
facebookProvider.addScope("email");
export var githubProvider = new firebase.auth.GithubAuthProvider();
githubProvider.addScope("email");

export var googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.addScope("email");
