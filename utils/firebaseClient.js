import firebase from 'firebase/app';

// If you enabled Analytics in your project, add the Firebase SDK for Analytics

// Add the Firebase products that you want to use
import 'firebase/auth';
import 'firebase/firestore';

var firebaseConfig = {
	apiKey: 'AIzaSyD5kL5_ko8L_yzzU4Anniqg8nkPtExMtEA',
	authDomain: 'businesscardapp-d89e9.firebaseapp.com',
	databaseURL: 'https://businesscardapp-d89e9.firebaseio.com',
	projectId: 'businesscardapp-d89e9',
	storageBucket: 'businesscardapp-d89e9.appspot.com',
	messagingSenderId: '517798807025',
	appId: '1:517798807025:web:5a2771648a95d317267050',
	measurementId: 'G-YFMNV8C9RY',
};
if (!firebase.apps.length) {
	// Initialize Firebase
	firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const db = firebase.firestore();
