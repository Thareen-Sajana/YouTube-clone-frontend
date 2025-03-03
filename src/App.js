import './App.css';
import Navbar from "./component/navBar/navbar";
import Home from "./pages/home/home";

import {useEffect, useState} from "react";
import {Route,Routes } from "react-router-dom";
import Video from "./video/video";
import Profile from "./pages/profile/profile";
import VideoUpload from "./pages/videoUpload/videoUpload";
import Signup from "./pages/signup/signup";
import axios from "axios";

function App() {

    const [sideNavbar, setSideNavbar] = useState(true);




    const setSideNavbarFunc = (value) => {
        setSideNavbar(value);
    }
  return (
    <div className="App">
        <Navbar setSideNavbarFunc={setSideNavbarFunc} sideNavbar={sideNavbar}></Navbar>
        <Routes>
            <Route path="/" element={<Home sideNavbar={sideNavbar}></Home>} />
            <Route path="/watch/:id" element={ <Video></Video> } />
            <Route path="/user/:id" element={ <Profile sideNavbar={sideNavbar}></Profile> } />
            <Route path="/:id/upload" element={ <VideoUpload></VideoUpload> } />
            <Route path="/signup" element={<Signup></Signup> } />
        </Routes>

    </div>
  );
}

export default App;
