import '../styles/App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Collections from './Collections';
import Home from './Home';

function App() {

  return(
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/collections" element={<Collections />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
