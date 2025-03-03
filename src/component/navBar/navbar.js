import React, {useEffect, useState} from "react";
import './navbar.css'

import MenuIcon from '@mui/icons-material/Menu';
import YouTubeIcon from '@mui/icons-material/YouTube';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import sideNavbar from "../sideNavBar/sideNavbar";

import { Link, useNavigate } from 'react-router-dom'
import Login from "../login/login";
import axios from "axios";


const Navbar = ({setSideNavbarFunc, sideNavbar}) =>
{
    const [userPic, setUserPic] = useState("https://th.bing.com/th/id/OIP.Wy2uoy-ttULYs4chLmgSAAAAAA?rs=1&pid=ImgDetMain");
    const [navbarModal, setNavbarModal] = useState(false);
    const [isLogedIn, setIsLogedIn] = useState(false);
    const [login, setLogin] = useState(false);
    const navigate = useNavigate();

    const handleClickModal = () => {
        setNavbarModal(!navbarModal);
    }

    const handelProfile = () => {
        let userId = localStorage.getItem("userId");
        navigate(`/user/${userId}`)
        setNavbarModal(false);
    }

    const sideNavbarFunc = () => {
        setSideNavbarFunc(!sideNavbar);
    }

    const setLoginModal = () => {
        setLogin(false);
    }

    const onclickOfPopUpOption = (button) => {
        setNavbarModal(false);
        if(button=="login") {
            setLogin(true)
        } else {
            localStorage.clear()
            getLogoutFun()
            setTimeout(() => {
                navigate('/');
                window.location.reload();
            }, 1000);
        }
    }

    const getLogoutFun = async () => {
        axios.post("http://localhost:4000/auth/logout", {}, { withCredentials: true })
            .then((res) => {
                console.log("Logout");
            })
            .catch((err) => {
                console.log(err);
            });
    }


    useEffect(() => {

        let userProfilePic = localStorage.getItem("userProfilePic");
        setIsLogedIn(localStorage.getItem("userId") !== null ? true : false);

        if (userProfilePic !== null) {

            setUserPic(userProfilePic);
        }
    }, []);


    return (
        <div className="navbar">

            <div className="navbar-left">
                <div className="navbarHamberger" onClick={sideNavbarFunc}>
                    <MenuIcon sx={{color: "white"}} />
                </div>
                <Link to={'/'} className="navbar_youtubeImg">
                    <YouTubeIcon sx={{fontSize: "34px"}} className="navbar_youtubeImage"/>
                    <div className="navbar_utubeTitle">YouTube</div>
                </Link>
            </div>

            <div className="navbar-middle">
                <div className="navbar_searchBox">
                    <input type="text" className="navbar_searchBoxInput" placeholder="Search"/>
                    <div className="navbar_searchIconBox"><SearchIcon sx={{fontSize: "28px", color: "white"}}/></div>
                </div>

                <div className="navbar_mike">
                    <KeyboardVoiceIcon sx={{color: "white"}}/>
                </div>
            </div>


            <div className="navbar-right">
                <Link to={'/74/upload'}>
                    <VideoCallIcon sx={{fontSize: "30px", cursor: "pointer", color: "white"}}/>
                </Link>

                <NotificationsIcon sx={{fontSize: "30px", cursor: "pointer", color: "white"}}/>
                <img onClick={handleClickModal} src={userPic} className='navbar-right-logo' alt='logo'/>

                { navbarModal &&
                    <div className="navbar-modal">
                        {isLogedIn && <div className="navbar-modal-option" onClick={handelProfile}>Profile</div>}

                        {isLogedIn && <div className="navbar-modal-option"
                              onClick={() => onclickOfPopUpOption("logout")}>Logout</div>}
                        {!isLogedIn && <div className="navbar-modal-option" onClick={() => onclickOfPopUpOption("login")}>Login</div>}
                    </div>
                }

            </div>

            {
                login && <Login setLoginModal={setLoginModal}></Login>
            }


        </div>
    )
}

export default Navbar;
