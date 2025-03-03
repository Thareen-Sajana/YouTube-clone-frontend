import React, {useEffect, useState} from "react";
import './homePage.css'

import { Link } from 'react-router-dom'
import axios from "axios";

const HomePage = ({sideNavbar}) => {

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/api/allvideo')
            .then(res => {
                console.log(res.data.videos);
                setData(res.data.videos)
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const options = [
        "All", "Twenty20 Cricket", "Music", "Live", "Mixes", "Gaming",
        "Debates", "Coke Studio Pakistan", "Democracy", "Pakistani",
        "Technology", "Podcasts", "Education", "Sports", "Comedy",
        "Movies", "News", "Travel", "Health", "Science"
    ];


    return (
        <div className={sideNavbar ? 'homePage' : 'fullHomePage'}>

            <div className="homePage_options">
                {options.map((item, index) => {
                    return (
                        <div key={index} className="homePage_option">
                            {item}
                        </div>
                    );
                })}
            </div>

            <div className={sideNavbar ? "home_mainPage" : "home_mainPageWithoutLink"}>

                {
                    data?.map((item, index) => {
                        return (
                            <Link to={`/watch/${item._id}`} className="youtube_Video">
                                <div className="youtube_thumbnailBox">
                                    <img
                                        src={item.thumbnail} alt=""
                                        alt="Thumbneil" className="youtube_thumbnailPic"/>
                                    <div className="youtube_timingThumbnail">
                                        28:05
                                    </div>
                                </div>

                                <div className="youtubeTitleBox">
                                    <div className="youtubeTitleBoxProfile">
                                        <img
                                            src={item?.user?.profilePic}
                                            alt="" className="youtube_thumbnail_Profile"/>
                                    </div>

                                    <div className="youtubeTitleBox_Title">
                                        <div className="youtube_videoTitle">{item?.title}</div>
                                        <div className="youtube_channelName">{item?.user?.channelName}</div>
                                        <div className="youtubeVideo_views">{item?.like} likes</div>
                                    </div>
                                </div>

                            </Link>
                        )
                    })
                }






            </div>

        </div>
    )
}

export default HomePage