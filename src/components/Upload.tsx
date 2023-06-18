import '../styles/Upload.css'
import { useState } from 'react'
import storage from '../firebase/firebaseconfig'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function Upload() {

  const [file, setFile] = useState<Blob>();

  // file upload progress
  const [percent, setPercent] = useState(0);

  const [imgCategory, setImgCategory] = useState("");

  // file upload event handler
  function handleChange(event: { target: HTMLInputElement; }){
    if(event.target.files != null){
      setFile(event.target.files[0]);
    }
  }

  function imgCategoryHandleChange(event: any){
    setImgCategory(event.target.value);

    console.log(imgCategory);
  }

  function handleUpload(){
    if(!file){
      alert("Please upload an image first!")
    }
    else{
        // storage instance ref
        const storageRef = ref(storage, `/${imgCategory}/${file.name}`)
  
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

  return (
    <>
      <div className='uploadWrapper'>
        <input type="file" onChange={handleChange} accept="/image/*" id="fileInput"/>
        <hr className='uploadHrs'></hr>
        <input type='text' placeholder='Give your file a category...' id="fileCategoryInput"
        value={imgCategory} onChange={imgCategoryHandleChange}></input>
        <hr className='uploadHrs'></hr>
        <button onClick={handleUpload} id="uploadButton">Upload to the cloud</button>
        <hr className='uploadHrs'></hr>
        <p id="uploadPercentage">{percent} "% done"</p>
      </div>
    </>
  )
}

export default Upload