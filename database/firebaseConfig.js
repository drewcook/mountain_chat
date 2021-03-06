/*import firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/auth";

class Fire {
	constructor() {
		this.init();
		this.observeAuth();
		this.currentUser = null;
	}

	get db() {
		return firebase.firestore();
	}

	get ref() {
		return this.db.collection('messages');
	}

	get uid() {
		return (firebase.auth().currentUser || {}).uid;
	}

	get timestamp() {
		return firebase.firestore.FieldValue.serverTimestamp();
	}

	// Initialize Firebase Realtime Database
	init = () => {
		var config = {
			apiKey: "AIzaSyBHCu3VF2PsH0lJm9XzTTyKU5wnmRXbNZQ",
			authDomain: "slopechat.firebaseapp.com",
			databaseURL: "https://slopechat.firebaseio.com",
			projectId: "slopechat",
			storageBucket: "slopechat.appspot.com",
			messagingSenderId: "346314248816"
		};
		firebase.initializeApp(config);
		//firebase.firestore();
	}

	// Check if signed in or not
	observeAuth = () => firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

	// Listen for authentication state to change.
	onAuthStateChanged = user => {
		// Initialize Firebase Cloud Firestore
		let db = firebase.firestore();
		let users = db.collection('users');
		// signed in
		if (user) {
			console.log('User is signed in and authenticated.');
			this.currentUser = user;
			// write user into users/ collection if record doesn't exist
			users.get().then(snapshot => {
				snapshot.forEach(doc => {
					if (doc.uid !== user.uid) {
						users.doc(user.uid).set({
							"name": user.displayName,
							"createdAt": new Date(),
							"lastLogin": new Date(),
							"profilePic": user.photoURL,
							"currentMountain": null,
						});
					} else {
						users.doc(user.uid).update({"lastLogin": new Date()});
					}
				});
			}).catch(err => console.log('Error getting documents', err));
		}
		// not signed in
		else {
			console.log("User is signed out.");
		}

		// Do other things
	};

	on = callback =>
		this.ref
			.orderBy("createdAt", "desc")
			.limit(20)
			.onSnapshot(snapshot => callback(this.parse(snapshot)));

	off = () => this.ref.off();

	parse = snapshot => {
		let messages = [];
		snapshot.forEach(doc => {
			const {_id, createdAt, text, user} = doc.data();
			//console.log("VALUES", _id, timestamp, text, user);
			messages.push({
				_id,
				createdAt: createdAt.toDate(),
				text,
				user,
			});
		});
		return messages;
	}

	send = messages => {
		for (let i = 0; i < messages.length; i++) {
			const {_id, createdAt, text, user} = messages[i];
			const message = {
				_id,
				text,
				createdAt,
				user,
			};
			// TODO: add to certain doc, based on what mountain chat is being sent from
			this.ref.doc().set(message, {merge: true});
		}
	};

	// Facebook Authentication
	loginWithFacebook = async () => {
		const {type, token} = await Expo.Facebook.logInWithReadPermissionsAsync(
			"566780290461704",
			{
				permissions: [
					'public_profile',
					//'user_friends', <-- needs App Review from Facebook to use
				]
			}
		);

		if (type === 'success') {
			// Build Firebase credential with the Facebook access token.
			const credential = firebase.auth.FacebookAuthProvider.credential(token);

			// Sign in with credential from the Facebook user.
			firebase.auth().signInAndRetrieveDataWithCredential(credential).catch((error) => {
				// Handle Errors here.
			});
		}
	}

}

Fire.shared = new Fire();
export default Fire;*/