import './App.css';
import React, { useState } from "react";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Home from './pages/home';
import Login from './pages/login';
import CreatePost from "./pages/create_post"
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config';

function App() {

  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/";
    })
  }

  return (
    <Router>
      <div>
        {isAuth && (
          <>
            <Link to="/createpost">Create Post</Link>
            <button onClick={signUserOut}>Log Out</button>
          </>
        )}
      </div>
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth}/>}/>
        <Route path="/createpost" element={<CreatePost isAuth={isAuth}/>}/>
        <Route path="/login" element={<Login setIsAuth={setIsAuth}/>}/>
      </Routes>
    </Router>
  );
  
}
export default App;
