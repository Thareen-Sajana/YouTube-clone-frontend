import React, {useEffect, useState} from "react";
import './video.css'
import {Link} from 'react-router-dom'

import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';

import { useParams } from "react-router-dom";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";

const Video = () => {

    const [message, setMessage] = useState("");
    const [data, setData] = useState(null)
    const [videoUrl, setVideoUrl] = useState("");
    const {id} = useParams();
    const [comment, setComment] = useState([]);
    console.log(id)

    const fetchVedioById = async () => {
        await axios.get(`http://localhost:4000/api/getVideoById/${id}`)
            .then((response) => {
                console.log(response.data.videos);
                setData(response.data.videos)
                setVideoUrl(response?.data?.videos?.videoLink)

            })
            .catch(err => {
                console.log(err);
            });
    };


    const getCommentByVideoId = async () => {
        await axios.get(`http://localhost:4000/commentApi/comment/${id}`)
            .then((response) => {
                console.log(response);
                setComment(response.data.comments);
            })
            .catch(err => {
                console.log(err);
            });
    };

    useEffect(() => {
        fetchVedioById();
        getCommentByVideoId()
    }, []);


    const handleComment = async () => {
        const body = {
            message: message,
            video: id
        };

        await axios.post('http://localhost:4000/commentApi/comment', body, { withCredentials: true })
            .then((resp) => {
                console.log(resp);
                const newComment = resp.data.comment;
                setComment([newComment, ...comment]);
                setMessage("");
            })
            .catch((err) => {
                toast.error("Please Login First to comment");
            });
    }


    return (
        <div className="video">
            <div className="videoPostSection">
                <div className="video_youtube">
                    {
                        data &&
                            <video width="400" controls autoPlay className="video_youtube_video">
                                <source
                                    src={videoUrl}
                                    type="video/mp4"/>
                                <source
                                    src={videoUrl}
                                    type="video/webm"/>
                                Your browser does not support the video tag.
                            </video>
                    }
                </div>

                <div className="video_youtubeAbout">
                    <div className="video_uTubeTitle">{data?.title}</div>

                    <div className="youtube_video_ProfileBlock">
                        <div className="youtube_video_ProfileBlock_left">
                            <Link to={`/user/${data?.user?._id}`} className="youtube_video_ProfileBlock_left_img">
                            <img
                                    className="youtube_video_ProfileBlock_left_image"
                                    src={data?.user?.profilePic}
                                />
                            </Link>

                            <div className="youtubeVideo_subsView">
                                <div className="youtubePostProfileName">{data?.user?.channelName}</div>
                                <div className="youtubePostProfileSubs">{data?.user?.createdAt.slice(0,10)}</div>
                            </div>

                            <div className="subscribeBtnYoutube">Subscribe</div>

                        </div>

                        <div className="youtube_video_likeBlock">
                            <div className="youtube_video_likeBlock_Like">
                                <ThumbUpOutlinedIcon/>
                                <div className="youtube_video_likeBlock_NoOfLikes">{data?.like}</div>
                            </div>
                            <div className="youtubeVideoDivider"></div>
                            <div className="youtube_video_likeBlock_Like">
                                <ThumbDownAltOutlinedIcon/>
                            </div>
                        </div>


                    </div>


                    <div className="youtube_video_About">
                        <div>{data?.createdAt.slice(0,10)}</div>
                        <div>{data?.description}</div>
                    </div>


                </div>

                <div className="youtubeCommentSection">
                    <div className="youtubeCommentSectionTitle">{comment?.length} Comments</div>
                    <div className="youtubeSelfComment">
                        <img className='video_youtubeSelfCommentProfile'
                             src='https://i.ytimg.com/vi/cSLAO7zxS2M/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLDz69xIPg6tS6Yc_A5FGpCdEGxHXg'
                        />
                        <div className="addAComment">
                            <input type="text" value={message} onChange={(e)=> {setMessage(e.target.value)}} className="addAcommentInput" placeholder="Add a comment"/>
                            <div className='cancelSubmitComment'>
                                <div className='cancelComment'>Cancel</div>
                                <div className='cancelComment' onClick={handleComment}>Comment</div>
                            </div>
                        </div>

                    </div>

                    <div className="youtubeOthersComments">

                        {
                            comment.map((item, index) => {
                                return (
                                    <div className="youtubeSelfComment">
                                        <img className='video_youtubeSelfCommentProfile'
                                             src={item?.user?.profilePic}
                                        />
                                        <div className="others_commentSection">
                                            <div className="others_commentSectionHeader">
                                                <div className="channelName_comment">{item?.user?.channelName}</div>
                                                <div className="commentTimingOthers">{item?.createdAt.slice(0,10)}</div>
                                            </div>

                                            <div className="otherCommentSectionComment">
                                                {item?.message}
                                            </div>

                                        </div>
                                    </div>
                                )
                            })
                        }


                    </div>


                </div>


            </div>

            <div className="videoSuggestions">
                <div className="videoSuggestionsBlock">
                    <div className="video_suggestion_thumbnail">
                        <img
                            src="https://i.ytimg.com/vi/v_kTNIYsFnQ/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAC2BW4tiHtljTz-cvtQadalb1mJg"
                            className="video_suggestion_thumbnail_img"/>
                    </div>
                    <div className="video_suggestions_About">
                        <div className="video_suggestions_About_title">Full argument: Trump-Zelensky White House meeting
                            descends into shouting
                        </div>
                        <div className="video_suggestions_About_Profile">BBC News</div>
                        <div className="video_suggestions_About_Profile">8.8M views · 1 day ago</div>
                    </div>
                </div>


                <div className="videoSuggestionsBlock">
                    <div className="video_suggestion_thumbnail">
                        <img
                            src="https://i.ytimg.com/vi/v_kTNIYsFnQ/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAC2BW4tiHtljTz-cvtQadalb1mJg"
                            className="video_suggestion_thumbnail_img"/>
                    </div>
                    <div className="video_suggestions_About">
                        <div className="video_suggestions_About_title">Full argument: Trump-Zelensky White House meeting
                            descends into shouting
                        </div>
                        <div className="video_suggestions_About_Profile">BBC News</div>
                        <div className="video_suggestions_About_Profile">8.8M views · 1 day ago</div>
                    </div>
                </div>


                <div className="videoSuggestionsBlock">
                    <div className="video_suggestion_thumbnail">
                        <img
                            src="https://i.ytimg.com/vi/v_kTNIYsFnQ/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAC2BW4tiHtljTz-cvtQadalb1mJg"
                            className="video_suggestion_thumbnail_img"/>
                    </div>
                    <div className="video_suggestions_About">
                        <div className="video_suggestions_About_title">Full argument: Trump-Zelensky White House meeting
                            descends into shouting
                        </div>
                        <div className="video_suggestions_About_Profile">BBC News</div>
                        <div className="video_suggestions_About_Profile">8.8M views · 1 day ago</div>
                    </div>
                </div>


                <div className="videoSuggestionsBlock">
                    <div className="video_suggestion_thumbnail">
                        <img
                            src="https://i.ytimg.com/vi/v_kTNIYsFnQ/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAC2BW4tiHtljTz-cvtQadalb1mJg"
                            className="video_suggestion_thumbnail_img"/>
                    </div>
                    <div className="video_suggestions_About">
                        <div className="video_suggestions_About_title">Full argument: Trump-Zelensky White House meeting
                            descends into shouting
                        </div>
                        <div className="video_suggestions_About_Profile">BBC News</div>
                        <div className="video_suggestions_About_Profile">8.8M views · 1 day ago</div>
                    </div>
                </div>


                <div className="videoSuggestionsBlock">
                    <div className="video_suggestion_thumbnail">
                        <img
                            src="https://i.ytimg.com/vi/v_kTNIYsFnQ/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAC2BW4tiHtljTz-cvtQadalb1mJg"
                            className="video_suggestion_thumbnail_img"/>
                    </div>
                    <div className="video_suggestions_About">
                        <div className="video_suggestions_About_title">Full argument: Trump-Zelensky White House meeting
                            descends into shouting
                        </div>
                        <div className="video_suggestions_About_Profile">BBC News</div>
                        <div className="video_suggestions_About_Profile">8.8M views · 1 day ago</div>
                    </div>
                </div>


                <div className="videoSuggestionsBlock">
                    <div className="video_suggestion_thumbnail">
                        <img
                            src="https://i.ytimg.com/vi/v_kTNIYsFnQ/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAC2BW4tiHtljTz-cvtQadalb1mJg"
                            className="video_suggestion_thumbnail_img"/>
                    </div>
                    <div className="video_suggestions_About">
                        <div className="video_suggestions_About_title">Full argument: Trump-Zelensky White House meeting
                            descends into shouting
                        </div>
                        <div className="video_suggestions_About_Profile">BBC News</div>
                        <div className="video_suggestions_About_Profile">8.8M views · 1 day ago</div>
                    </div>
                </div>


                <div className="videoSuggestionsBlock">
                    <div className="video_suggestion_thumbnail">
                        <img
                            src="https://i.ytimg.com/vi/v_kTNIYsFnQ/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAC2BW4tiHtljTz-cvtQadalb1mJg"
                            className="video_suggestion_thumbnail_img"/>
                    </div>
                    <div className="video_suggestions_About">
                        <div className="video_suggestions_About_title">Full argument: Trump-Zelensky White House meeting
                            descends into shouting
                        </div>
                        <div className="video_suggestions_About_Profile">BBC News</div>
                        <div className="video_suggestions_About_Profile">8.8M views · 1 day ago</div>
                    </div>
                </div>


                <div className="videoSuggestionsBlock">
                    <div className="video_suggestion_thumbnail">
                        <img
                            src="https://i.ytimg.com/vi/v_kTNIYsFnQ/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAC2BW4tiHtljTz-cvtQadalb1mJg"
                            className="video_suggestion_thumbnail_img"/>
                    </div>
                    <div className="video_suggestions_About">
                        <div className="video_suggestions_About_title">Full argument: Trump-Zelensky White House meeting
                            descends into shouting
                        </div>
                        <div className="video_suggestions_About_Profile">BBC News</div>
                        <div className="video_suggestions_About_Profile">8.8M views · 1 day ago</div>
                    </div>
                </div>


                <div className="videoSuggestionsBlock">
                    <div className="video_suggestion_thumbnail">
                        <img
                            src="https://i.ytimg.com/vi/v_kTNIYsFnQ/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAC2BW4tiHtljTz-cvtQadalb1mJg"
                            className="video_suggestion_thumbnail_img"/>
                    </div>
                    <div className="video_suggestions_About">
                        <div className="video_suggestions_About_title">Full argument: Trump-Zelensky White House meeting
                            descends into shouting
                        </div>
                        <div className="video_suggestions_About_Profile">BBC News</div>
                        <div className="video_suggestions_About_Profile">8.8M views · 1 day ago</div>
                    </div>
                </div>
            </div>

            <ToastContainer></ToastContainer>

        </div>
    )
}

export default Video