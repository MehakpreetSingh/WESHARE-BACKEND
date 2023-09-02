import React, { useState, useEffect, useRef } from 'react'
import PostCard from './PostCard'
import FileBase from 'react-file-base64';
import plus from '../images/plus.png'
import back from '../images/back.png'
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators } from '../store/index';
import { bindActionCreators } from 'redux'
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';


const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const uploadref = useRef(null);
    // const ChangeProgress = (x) => {
    //     var elem = document.getElementById("myBar");
    //     elem.style.width = x + "%";
    // }
    const { fetchAllPosts, createPost, getuserData, deletePost } = bindActionCreators(actionCreators, dispatch)
    const data = useSelector(state => state.posts);
    const [loading, setLoading] = useState(true);
    const userData = useSelector(state => state.userData)
    useEffect(() => {
        if (localStorage.getItem('token')) {
            // ChangeProgress(50)
            fetchAllPosts();
            getuserData();
            setTimeout(() => {
                setLoading(false);
            }, 800)

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
        fetchAllPosts();
        setPostData(initialstate)
        console.log("submitted");
    }
    const handledelete = (id) => {
        deletePost(id) ;
        fetchAllPosts();
      }
    // const ChangeProgress = (width) => {
    //     var elem = document.getElementById("myBar");
    //     elem.style.width = width + "%"; 
    //   }
    return (
        <div>
            <div className="mt-14">

                <div className='flex '>
                    <div className="left w-full relative md:w-[73%] bg-[#F2F2F2]">

                        <div className='flex fixed z-30 shadow-md bg-[#F2F2F2] mt-2 md:mt-0 md:w-[100%] justify-between items-center w-full'>

                            <div>
                                <h1 className='text-start mx-12 my-2 font-semibold text-[#231e3b] tracking-wider'>Recent Posts</h1>
                            </div>
                            <div onClick={createpostsidebar} className='mx-12 md:hidden'>
                                <img className='h-6' src={plus} alt="" />
                            </div>
                        </div>
                        <div className='fixed mt-[40px] z-[9999999] w-[73%]'>
                            {/* <div id="myProgress" style={{ width: "100%", backgroundColor: "#F2F2F2" }}>
                                <div id="myBar" style={{ transition: "all", width: "0%", height: "2px", backgroundColor: "#231e3b" }}>
                                </div>
                            </div> */}
                        </div>
                        {loading && <div className='fixed mx-8  mt-16'><Spinner/></div>}
                        {!loading && <div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full px-2 mt-14 md:mt-12 md:px-10 m-2'>
                            {data.map((postinfo, index) => {

                                return (
                                    <div className='' key={index}>
                                        <PostCard handledelete={handledelete} userId={userData._id.toString()} index={index} postinfo={postinfo} />
                                    </div>

                                )
                            })}
                        </div>}
                    </div>
                    <div className="right z-40 transition-all w-full create-post-card translate-x-[1000px] md:translate-x-0 md:w-[27%] fixed  flex flex-col  items-center right-0 md:top-14 top-16 h-[100%]">
                        <div onClick={createpostsidebar} className="flex justify-end w-full md:hidden back-img">
                            <img src={back} alt="" />
                        </div>
                        <div className='shadow-lg flex flex-col justify-center items-center m-5 p-5 w-5/6 mx-auto'>
                            <h1 className='text-[#1f1941] mt-8 text-center font-semibold text-xl border-b-[1px] inline-block border-[#231e3b]'>Create New Post</h1>
                            <form onSubmit={handleSubmit} className='space-y-5 my-2 w-full' >
                                <input placeholder="Title" value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} type="text" className=' w-full placeholder:text-slate-700 placeholder:text-[15px] bg-transparent shadow-lg  py-1 px-2 focus:outline-none' />
                                <input placeholder="Message" value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} type="text" className='bg-transparent  placeholder:text-slate-700 placeholder:text-[15px] shadow-lg w-full py-1 px-2 focus:outline-none' />

                                <input placeholder="Tags (comma seperated)" value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} type="text" className='bg-transparent placeholder:text-slate-700 placeholder:text-[15px] shadow-lg w-full py-1 px-2 focus:outline-none' />

                                {/* <button onClick={()=>uploadref.current.click()} className='flex justify-center items-center space-x-2 bg-[#231e3b] px-4 py-1 rounded-2xl hover:scale-110 transition-all'>
                                        <img className='h-7' src={camera} alt="" />
                                        <h1 className='text-white text-md'>Upload Photo</h1>
                                    </button> */}

                                {/* <input ref={uploadref} type="file" onChange={(e)=>{console.log(e.target.value)}}/> */}
                                <div className=""><button className='' ><FileBase ref={uploadref} type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></button></div>
                                <button onClick={createpostsidebar} className='bg-[#231e3b] text-white px-6 text-lg rounded-md hover:shadow-lg hover:bg-[#ffffff] hover:text-[#231e3b]' tpye="Submit">Post</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home