import '../styles/App.css'
import Upload from './Upload'
import { googleAuth, signOutFunc } from '../firebase/firebaseauth'
import {useState} from "react";

function Navbar(){

  const [userDisplayName, setUserDisplayName] = useState("");

  return(
    <div className='navbar'>
        <div className='navbarProfileSection'>
          <h2>Logged in as {userDisplayName}</h2>
        </div>
        <div className='navbarLinksSection'>
          <button className='navbarButtons' onClick={() => {
            googleAuth();
          }}>Sign In</button>
          <button className='navbarButtons' onClick={signOutFunc}>Sign Out</button>
          <button className='navbarButtons'>Collections</button>
        </div>
    </div>
  )

}

function App() {
  return(
      <div className='appWrapper'>
        <Navbar />
        <h1>Upload an image or a file</h1>
        <Upload />
      </div>
  )
}

export default App
