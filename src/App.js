import React , { useEffect, useContext} from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from './Pages/Signup';
import Login from './Pages/Login'
import Create from './Pages/Create'
import View from './Pages/ViewPost'
import Post from './store/PostContext'

/**
 * ?  =====Import Components=====
 */
import Home from "./Pages/Home";
import { AuthContext, FirebaseContext } from "./store/Context";
import { getAuth } from "firebase/auth";

function App() {

  const { setUser } = useContext(AuthContext)
  const { firebase } = useContext(FirebaseContext)

  useEffect(()=>{
    const auth = getAuth(firebase)
    const unsubscribe = auth.onAuthStateChanged((user)=>{
      setUser(user)
    })

    return unsubscribe
  },[firebase , setUser])

  return (
    <div>
      <Post>
       <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<Create />} />
          <Route path="/view" element={<View/>} />
        </Routes>
       </Router>
      </Post>
    </div>
  );
}

export default App;
