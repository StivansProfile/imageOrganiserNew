import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

let userName: string;

function googleAuth(){
  
    const provider = new GoogleAuthProvider()
    const auth = getAuth();
    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if(credential != null){
        const token = credential.accessToken;
      }
      // The signed-in user info.
      const user = result.user;
      if(typeof user.displayName === "string"){
        userName = user.displayName
        localStorage.setItem("displayName", userName)
      }
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
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