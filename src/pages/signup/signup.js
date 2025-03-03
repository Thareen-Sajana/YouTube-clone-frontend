import React, {useState} from "react";
import './signup.css'
import YouTubeIcon from "@mui/icons-material/YouTube";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const Signup = () => {

    const [uploadedImageUrl, setUploadedImageUrl] = useState("https://yt3.googleusercontent.com/Bg5wS82KGryRmcsn1YbPThtbXoTmj2XJ9_7LmuE2RF6wbKJBkovfRypbSz6UD3gEu_nHiwGZtQ=s160-c-k-c0x00ffffff-no-rj")
    const [progressBar, setProgressBar] = useState(false)

    const navigate = useNavigate();

    const [singUpFiled, setSignUpField] = useState({
        "channelName": "",
        "userName": "",
        "password": "",
        "about": "",
        "profilePic": uploadedImageUrl
    })

    console.log(singUpFiled)
    const handleInputFiled = (event, name) => {
        setSignUpField({
            ...singUpFiled,[name]: event.target.value
        })
    }

    const  uploadImage = async (e)=> {

        const files = e.target.files
        const data = new FormData()
        data.append("file", files[0])

        data.append("upload_preset", 'youtube-clone');
        try {
            setProgressBar(true)
            const response = await axios.post("https://api.cloudinary.com/v1_1/dkyamwvho/image/upload",data);
            setProgressBar(false)
            const imageUrl = response.data.url
            setUploadedImageUrl(imageUrl);

            setSignUpField({
                ...singUpFiled,"profilePic": imageUrl
            })
            console.log(response)
        } catch (err) {
            console.log(err);
            setProgressBar(false)
        }

        console.log(files)
    }

    const handleSignup = async () => {
        setProgressBar(true)
        axios.post('http://localhost:4000/auth/signUp', singUpFiled)
            .then((res) => {
                console.log(res);
                toast.success(res.data.message);
                setProgressBar(false)
                navigate('/')
            })
            .catch((err) => {
                console.log(err);
                setProgressBar(false)
                toast.error(err)
            });
    }


    console.log(singUpFiled)

    return (
        <div className='signUp'>
            <div className="signup_card">
                <div className="signUp_title">
                    <YouTubeIcon sx={{fontSize: "54px"}} className='login_youtubeImage'/>
                    SignUp
                </div>

                <div className="signUp_Inputs">
                    <input type="text" className="signUp_Inputs_inp" value={singUpFiled.channelName} onChange={(e)=> {handleInputFiled(e,"channelName")}} placeholder="Channel Name"/>
                    <input type="text" className="signUp_Inputs_inp" value={singUpFiled.userName} onChange={(e)=> {handleInputFiled(e,"userName")}} placeholder="User Name"/>
                    <input type="password" className="signUp_Inputs_inp" value={singUpFiled.password} onChange={(e)=> {handleInputFiled(e,"password")}} placeholder="Password"/>
                    <input type="text" className="signUp_Inputs_inp" value={singUpFiled.about} onChange={(e)=> {handleInputFiled(e,"about")}} placeholder="About Your Channel"/>

                    <div className="image_upload_signup">
                        <input type="file" onChange={(e)=>uploadImage(e)}/>
                        <div className="image_upload_signup_div">
                            <img className="image_default_signUp"
                                 src={uploadedImageUrl}
                            />
                        </div>
                    </div>

                    <div className="signUpBtns">
                        <div className="signUpBtn" onClick={()=>handleSignup()} >SignUp</div>
                        <Link to={'/'} className="signUpBtn">Home Page</Link>
                    </div>

                    {progressBar && <Box sx={{width: '100%'}}>
                        <LinearProgress/>
                    </Box>}


                </div>

            </div>

            <ToastContainer></ToastContainer>

        </div>
    )
}

export default Signup;