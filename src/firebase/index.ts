import firebase from 'firebase/app'
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";
import {firebaseConfig} from "./config";

// configを使ってfirebaseのサービスを利用できるようになる
firebase.initializeApp(firebaseConfig);

// 下記のように書くことによって、他ファイルでfirebaseのサービスを利用することができる。
export const auth = firebase.auth();
export const db = firebase.firestore();
export const functions = firebase.functions();
export const storage = firebase.storage();
export const fb = firebase;
export const FirebaseFieldValue = firebase.firestore.FieldValue

// サーバーからタイムスタンプを利用することができる。
export const FirebaseTimestamp = firebase.firestore.Timestamp;