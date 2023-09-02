import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SIgnUp';
import PhonePostCard from './components/PhonePostcard';
import {BrowserRouter as Router , Routes, Route} from 'react-router-dom' ;
import Profile from './components/Profile';



function App() {
  // const handleClick = () => {
  //   console.log(data)
  // }
  // const handleNewNote = () => {
  //   createPost("title","Hello baby","mehak","","");
  //   console.log(data)
  // }
  // const updateClick = () => {
  //   updatePost("w","www" , "wwww" ,"" , " ","62adf77272298411088aa6d0") ;
  //   console.log(data) ;
  // }
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/" element={<><Navbar/><Home/></>}/>
          <Route path="/Profile" element={<><Navbar/><Profile/></>}/>
          <Route path="/Profile/:id" element={<PhonePostCard/>}/>
        </Routes>
      </Router>

      {/* <Navbar/>
      <Home/> */}
      {/* <Login/> */}
      {/* <div>Hello</div>
      <button onClick={handleClick}>Click the Button</button>
      <div></div>
      <button onClick={handleNewNote}>Add the Note</button>
      <button onClick={updateClick}>Add the Note</button> */}
    </div>
  );
}

export default App;
