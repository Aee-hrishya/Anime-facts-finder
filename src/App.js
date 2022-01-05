import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Pages/Home";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import PageNotFound from "./Pages/PageNotFound";
import NavBar from "./Layout/NavBar";
import Footer from "./Layout/Footer";
import UserContext from "./Context/UserContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import './App.css';

//Firebase
import { initializeApp } from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./Config/Config";

//Init firebase
const app = initializeApp(firebaseConfig);

function App() {

  const [user, setUser] = useState(null);//Initial state of the application


  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ToastContainer />
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </Router>
    </UserContext.Provider>
  );
}

export default App;
