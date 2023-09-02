import React, { useState, useEffect } from 'react'
import PostCard from './PostCard'
import FileBase from 'react-file-base64';
import plus from '../images/plus.png'
import back from '../images/back.png'
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators } from '../store/index';
import { bindActionCreators } from 'redux'
import { useNavigate } from 'react-router-dom';
import user from '../images/user.png'

import UpdateUserModal from './UpdateUserModal';

const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [userModal, setUserModal] = useState(false)
    const { fetchUserPosts, createPost, getuserData , deletePost} = bindActionCreators(actionCreators, dispatch)
    const data = useSelector(state => state.posts);
    const userData = useSelector(state => state.userData);
    useEffect(() => {

        if (localStorage.getItem('token')) {
            console.log(localStorage.getItem('token'));
            fetchUserPosts();
            getuserData();
            console.log(data);
        }
        else {
            navigate("/login")
        }

        // eslint-disable-next-line
    }, [])
    const initialstate = { title: "", message: "", creator: "", tags: [], selectedFile: "" }
    const [postData, setPostData] = useState(initialstate)
    const [postcard, setPostcard] = useState(false)
    const createpostsidebar = () => {
        console.log("Clicked....")
        const x = document.getElementsByClassName('create-post-card')[0];
        if (!postcard) {
            x.classList.remove("translate-x-[1000px]");

            setPostcard(!postcard);
        } else {
            x.classList.add("translate-x-[1000px]");

            setPostcard(!postcard);
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(postData);
        createPost(postData.title, postData.message, userData.name, postData.tags, postData.selectedFile);
        setPostData(initialstate);
        fetchUserPosts();
        fetchUserPosts();

        console.log("submitted");
    }
    const OpenUserModal = () => {
        const x = document.getElementById('user_modal');
        if (userModal) {
            x.classList.remove('flex')
            x.classList.add("hidden");
            setUserModal(!userModal)
        } else {
            x.classList.remove("hidden");
            x.classList.add("flex");
            setUserModal(!userModal)
        }
    }
    const ShowPostData = (id) => {
        console.log(id) ;
        navigate(`/Profile/${id}`)
    }

    const handledelete = (id) => {
        deletePost(id) ;
        fetchUserPosts();
        fetchUserPosts();
      }
    return (
        <div>
            <div className="mt-14">
                <div id="user_modal" className=' bg-black hidden bg-opacity-30 fixed top-0 left-0 right-0 justify-center items-center bottom-0  z-[999999]'>
                    <UpdateUserModal OpenUserModal={OpenUserModal} />
                </div>

                <div className='flex overflow-hidden'>
                    <div className="left w-full  md:w-[73%] bg-[#F2F2F2]">

                        <div className='flex flex-col fixed md:fixed z-30 bg-[#F2F2F2] mt-2 md:mt-0 md:w-[100%] justify-between items-center w-full'>
                            <div className=' md:hidden shadow-lg flex flex-col justify-center items-center mt-1 p-5 w-5/6 mx-auto'>
                                <img className='w-28 h-28 object-contain rounded-full' src={user} alt="" />
                                <div className='flex justify-center items-center space-x-4'>
                                    <div>
                                        <h1 className='text-[#1f1941] mt-2  text-center font-semibold text-xl border-b-[1px] inline-block border-[#231e3b]'>{userData?.name}</h1>
                                        <h1 className='text-gray-700 text-sm'>{userData.email}</h1>
                                    </div>
                                    <div>
                                        <i onClick={OpenUserModal} className="fa-solid fa-pen-to-square"></i>
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-between items-center w-full border-b shadow-md'>
                                <div className=''>
                                    <h1 className='text-start mx-12 my-2 font-semibold text-[#231e3b] tracking-wider'>Your Posts</h1>
                                </div>
                                <div onClick={createpostsidebar} className='mx-12 md:hidden'>
                                    <img className='h-6' src={plus} alt="" />
                                </div>
                            </div>
                        </div>
                        <div className='hidden md:grid md:grid-cols-2 gap-6 px-2 md:px-10 md:mt-12 mt-[265px] m-2'>
                            {data.map((postinfo, index) => {
                                return (
                                    <div className='' key={index}><PostCard handledelete={handledelete} userId={userData._id.toString()} index={index} postinfo={postinfo} /></div>
                                )
                            })}
                        </div>
                        <div className='md:hidden  grid-cols-3 grid gap-4 px-2 md:px-10 md:mt-0 mt-[265px] m-2'>
                            {data.map((postinfo, index) => {
                                return (
                                    <div className='flex items-center object-contain justify-center border-2 bg-white' key={index}>
                                        <img onClick={() => ShowPostData(postinfo._id.toString())} className='h-36 object-contain' src={postinfo.selectedFile} alt="" />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="right z-40  transition-all w-full create-post-card translate-x-[1000px] md:translate-x-0 md:w-[27%] fixed  flex flex-col items-center right-0 md:top-14 top-16 h-[100%]">
                        <div onClick={createpostsidebar} className="flex justify-end w-full md:hidden back-img">
                            <img src={back} alt="" />
                        </div>
                        <div className='hidden shadow-lg md:flex flex-col justify-center items-center mt-1 p-5 w-5/6 mx-auto'>
                            <img className='w-28 object-cover h-28 rounded-full' src={(userData.profileImage === "") ? user : userData.profileImage} alt="" />
                            <div className='flex justify-center items-center space-x-4'>
                                <div>
                                    <h1 className='text-[#1f1941] mt-2  text-center font-semibold text-xl border-b-[1px] inline-block border-[#231e3b]'>{userData?.name}</h1>
                                    <h1 className='text-gray-700 text-sm'>{userData.email}</h1>
                                </div>
                                <div>
                                    <i onClick={OpenUserModal} className="cursor-pointer fa-solid fa-pen-to-square"></i>
                                </div>
                            </div>
                        </div>
                        <div className='shadow-lg flex flex-col justify-center items-center p-5 w-5/6 mx-auto'>
                            <h1 className='text-[#1f1941]  text-center font-semibold text-xl border-b-[1px] inline-block border-[#231e3b]'>Create New Post</h1>
                            <form onSubmit={handleSubmit} className='space-y-5 my-2 w-full' >
                                <input placeholder="Title" value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} type="text" className=' w-full placeholder:text-slate-700 placeholder:text-[15px] bg-transparent shadow-lg  py-1 px-2 focus:outline-none' />
                                <input placeholder="Message" value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} type="text" className='bg-transparent  placeholder:text-slate-700 placeholder:text-[15px] shadow-lg w-full py-1 px-2 focus:outline-none' />
                                <input placeholder="Tags (comma seperated)" value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} type="text" className='bg-transparent placeholder:text-slate-700 placeholder:text-[15px] shadow-lg w-full py-1 px-2 focus:outline-none' />
                                <div className="flex justify-center items-center px-5"><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
                                <button onClick={createpostsidebar} className='bg-[#231e3b] text-white px-6 text-lg rounded-md hover:shadow-lg hover:bg-[#ffffff] hover:text-[#231e3b]' tpye="Submit">Post</button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile