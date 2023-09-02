import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from './Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators } from '../store/index';
import { bindActionCreators } from 'redux'

const PhonePostcard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { getuserData , deletePost } = bindActionCreators(actionCreators, dispatch)
    const userData = useSelector(state => state.userData)
    const port = process.env.PORT || 5000;
    const [loading, setLoading] = useState(true);
    const [postInfo, setPostInfo] = useState({ title: "", message: "", creator: "", tags: [], selectedFile: "" });
    const params = useParams();
    useEffect(() => {
        const getPost = async () => {
            const url = `http://localhost:${port}/posts/${params.id}`
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await response.json();
            setPostInfo(data);
        }
        getuserData();
        getPost();
        console.log(userData)
        setTimeout(() => {
            setLoading(false);
        }, 150)
        // eslint-disable-next-line
    }, [])
    const navigatetoProfile = () => {
        navigate("/Profile")
    }
    const Changelogo = () => {
        var like = document.getElementsByClassName("like")[0];
        var unlike = document.getElementsByClassName("unlike")[0];
        if (like.classList.contains("hidden")) {
            like.classList.remove("hidden")
            unlike.classList.add("hidden");
        } else {
            like.classList.add("hidden")
            unlike.classList.remove("hidden");
        }
    }
    const handledelete = () => {
        deletePost(postInfo._id)
        navigate("/Profile")
    }
    return (
        <div>

            <div>
                <div onClick={navigatetoProfile} className='transition-all cursor-pointer duration-700 fixed h-10 w-full flex justify-start pl-4 space-x-2 items-center bg-white top-0 left-0 right-0 border-b-2 z-[10001]'>
                    <i className=" cursor-pointer fa-solid fa-caret-left"></i>
                    <h1 className=' cursor-pointer text-black font-medium'>Profile</h1>
                </div>
                {loading && <div className='absolute top-20 left-1/2 right-1/2'><Spinner /></div>}
                {!loading &&
                    <div className='transition-all bg-black bg-opacity-10 fixed top-0 left-0 right-0 flex p-2 justify-center items-center bottom-0  z-[9999]'>
                        <div className='post-card flex flex-col w-5/6 md:w-1/2 bg-white rounded-xl h-[500px]'>
                            <div className='border-b flex px-7 my-1 items-center'>
                                <img className='h-8 w-8 object-contain rounded-full' src={userData.profileImage} alt="" />
                                <h1 className='text-[#231e3b] mx-1 text-left px-4 text-lg mt-2 font-sans font-medium'>{postInfo.creator}</h1>
                            </div>
                            <div className="image">
                                <img className='transition ease-in duration-500 object-contain my-2 h-80 rounded-t-md w-[95%] mx-auto' alt='' src={`${postInfo.selectedFile}`} lt="" />
                            </div>
                            <div className=''>
                                <div className='title-info border-t px-6 flex flex-row items-center justify-between relative '>
                                    <img id="like" onClick={() => Changelogo()} className="like cursor-pointer w-4" src="https://img.icons8.com/windows/32/undefined/like--v1.png" alt="" />
                                    <div id="unlike" onClick={() => Changelogo()} className='unlike cursor-pointer hidden'><i className="fa-solid fa-heart"></i></div>
                                    <div className='space-x-3'>
                                        <i onClick={handledelete} className="w-3 h-3 cursor-pointer fa-solid fa-pen-to-square"></i>
                                        <i className="w-3 h-3 cursor-pointer fa-solid fa-trash-can"></i>

                                    </div>
                                </div>
                                <div className='flex mx-4 flex-col items-start mb-3'>
                                    <p className='text-md font-normal text-[#323a46]'>{postInfo.title}</p>
                                    <p className='flex flex-wrap space-x-1 text-sm text-[#7c377b]'>
                                        {postInfo.tags.map((tagel, index) => {
                                            return (
                                                <span key={index} className=''>
                                                    {`#${tagel}`}
                                                </span>
                                            )
                                        })}
                                    </p>
                                    <p className='text-sm text-start'>{postInfo.message}</p>
                                </div>
                            </div>
                        </div>
                    </div>}
            </div>
        </div>
    )
}

export default PhonePostcard