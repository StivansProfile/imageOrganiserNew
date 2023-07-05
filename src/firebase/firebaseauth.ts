import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, setPersistence } from "firebase/auth";
import { browserLocalPersistence} from "firebase/auth/cordova";

let userName: string;

function googleAuth() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  // Set the persistence to local to allow the user to stay signed in after page refresh
  setPersistence(auth, browserLocalPersistence)
    .then(() => {
      // Sign in with Google using popup
      return signInWithPopup(auth, provider);
    })
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (credential !== null) {
        // const token = credential.accessToken;
      }
      // The signed-in user info.
      const user = result.user;
      if (typeof user.displayName === "string") {
        const userName = user.displayName;
        localStorage.setItem("displayName", userName);
      }
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // The email of the user's account used.
      // const email = error.customData.email;
      // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      console.log(error);
    });
}

export {userName};

function signOutFunc(){
    const auth = getAuth();
    signOut(auth).then(() => {
    // Sign-out successful.
    console.log("Signed out");
    }).catch((error) => {
    // An error happened.
    console.log(error)
    });
}

export {googleAuth};
export {signOutFunc};