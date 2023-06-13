import '../styles/Upload.css'
import { useState } from 'react'
import storage from '../firebase/firebaseconfig'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

function Upload() {

  const [file, setFile] = useState<Blob>();

  // file upload progress
  const [percent, setPercent] = useState(0);

  // file upload event handler
  function handleChange(event: { target: HTMLInputElement; }){
    if(event.target.files != null){
      setFile(event.target.files[0]);
    }
  }

  function handleUpload(){
    if(!file){
      alert("Please upload an image first!")
    }
    else{
        // storage instance ref
        const storageRef = ref(storage, `/files/${file.name}`)
  
        //progress...
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const percent = Math.round(
              snapshot.bytesTransferred / snapshot.totalBytes * 100
            )
            setPercent(percent);
          },
          (err) => console.log(err),
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              console.log(url);
            }) 
          }
        )
      }
  }

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

  return (
    <>
      <div className='uploadWrapper'>
        <input type="file" onChange={handleChange} accept="/image/*" id="fileInput"/>
        <hr className='uploadHrs'></hr>
        {/* <button onClick={googleAuth}>Sign In</button> */}
        {/* <button onClick={signOutFunc}>Sign out</button> */}
        <input type='text' placeholder='Give your file a category...' id="fileCategoryInput"></input>
        <hr className='uploadHrs'></hr>
        <button onClick={handleUpload} id="uploadButton">Upload to the cloud</button>
        <hr className='uploadHrs'></hr>
        <p id="uploadPercentage">{percent} "% done"</p>
      </div>
    </>
  )
}

export default Upload