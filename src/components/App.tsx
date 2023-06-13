import '../styles/App.css'
import Upload from './Upload'

function Navbar(){
  return(
    <div className='navbar'>
        <div className='navbarProfileSection'>
          <h2>Logged in as Profile Name</h2>
        </div>
        <div className='navbarLinksSection'>
          <button className='navbarButtons'>Sign In</button>
          <button className='navbarButtons'>Sign Out</button>
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
