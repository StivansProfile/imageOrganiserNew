import '../styles/Home.css'
import Upload from './Upload'
import { googleAuth, signOutFunc} from '../firebase/firebaseauth'
import {useState, useEffect} from "react";
import {Link} from "react-router-dom";

function Navbar(){

  const [userDisplayName, setUserDisplayName] = useState("");
  const [isLoggedOut, setIsLoggedOut] = useState(true);

  useEffect(() => {
    if(userDisplayName === ""){
      console.log("empty")
    }
    else{
      console.log("not empty")
    }


  }, [userDisplayName])

  return(
        <div className='navbar'>
            <div className='navbarProfileSection'>
            <div>
                {
                isLoggedOut ? (
                    <h2>Not signed in</h2>
                ): 
                (
                    <h2>Logged in as {userDisplayName}</h2>
                )
                }
            </div>
            </div>
            <div className='navbarLinksSection'>
            <button className='navbarButtons' onClick={() => {
                const name = localStorage.getItem("displayName");
                googleAuth();
                setTimeout(() => {
                if(name)
                setUserDisplayName(name)
                setIsLoggedOut(false);
                }, 5000)
            }}>Sign In</button>
            <button className='navbarButtons' onClick={() => {
                signOutFunc();
                setIsLoggedOut(true);
            }}>Sign Out</button>

            <Link to="/collections">
                <button className='navbarButtons'>Collections</button>
            </Link>
            </div>
        </div>
  )
}

export default function Home(){
    return(
    <div className='appWrapper'>
        <Navbar />
        <h1>Upload an image or a file</h1>
        <Upload />
      </div>
    );
}

export {Navbar};