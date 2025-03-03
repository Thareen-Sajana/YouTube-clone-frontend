import React from "react";
import './home.css'
import SideNavbar from "../../component/sideNavBar/sideNavbar";
import HomePage from "../../component/homePage/homePage";

const Home = ({sideNavbar}) => {
    return (
        <div className='home'>
            <SideNavbar sideNavbar={sideNavbar}></SideNavbar>
            <HomePage sideNavbar={sideNavbar}/>
        </div>
    )
}

export default Home