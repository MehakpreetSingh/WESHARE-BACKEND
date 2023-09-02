import React, { useState, useEffect } from 'react'
import UpdatePostModal from './UpdatePostModal';

const PostCard = (props) => {
  const port = process.env.PORT || 5000;
  const { title, message, creator, tags, selectedFile } = props.postinfo;
  const imgurl = selectedFile;
  const [userInfo, setUserInfo] = useState({})
  const [liked, setliked] = useState(null)
  const [postModal, setPostModal] = useState(false) ;
  useEffect(() => {
    setliked(false);
    const getuserDatabyId = async () => {
      const url = `http://localhost:${port}/auth/getuserbyId/${props.postinfo.user.toString()}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "json/application"
        }
      })
      const data = await response.json();
      setUserInfo(data);
    }
    getuserDatabyId();
    // eslint-disable-next-line
  }, [])
  const Changelogo = (n) => {
    var like = document.getElementsByClassName("like")[n];
    var unlike = document.getElementsByClassName("unlike")[n];
    if (like.classList.contains("hidden")) {
      like.classList.remove("hidden")
      unlike.classList.add("hidden");
    } else {
      like.classList.add("hidden")
      unlike.classList.remove("hidden");
    }
  }
  
  const OpenPostModal = (n) => {
    console.log("Edit")
    const x = document.getElementsByClassName('post-modal')[n];
    if (postModal) {
        x.classList.remove('flex')
        x.classList.add("hidden");
        setPostModal(!postModal) ;
    } else {
        x.classList.remove("hidden");
        x.classList.add("flex");
        setPostModal(!postModal) ;
    }
}
  return (
    <div className='post-card flex flex-col bg-white shadow-md rounded-xl h-[525px]'>
      <div id='' className=' post-modal bg-black bg-opacity-30 z-[99999999999] hidden fixed top-0 right-0 left-0 bottom-0'>
        <UpdatePostModal index={props.index}  postInfo={props.postinfo} OpenPostModal={OpenPostModal} />
      </div>
      <div className='border-b flex px-3 py-2 shadow-md items-center'>
        <img className='h-8 w-8 object-contain rounded-full' src={userInfo.profileImage} alt="" />
        <h1 className='text-[#231e3b] mx-1 text-left px-4 text-md mt-2 font-sans font-medium'>{creator}</h1>
      </div>
      <div className="image drop-shadow-lg">
        <img className='object-contain my-2 h-80 rounded-t-md w-[95%] mx-auto' alt='' src={`${imgurl}`} lt="" />
      </div>
      <div className='border-t'>
        <div className='title-info flex flex-row items-center justify-between mx-4 relative '>
          <img id="like" onClick={() => Changelogo(props.index)} className="like cursor-pointer h-7 mt-1" src="https://img.icons8.com/windows/32/undefined/like--v1.png" alt="" />
          <div id="unlike" onClick={() => Changelogo(props.index)} className='unlike cursor-pointer hidden h-7 mt-1'><i className="fa-xl fa-solid fa-heart"></i></div>
          {/* <h1 className='text-[#231e3b] italic text-md font-sans font-medium'>{creator}</h1> */}
          <div className='space-x-3'>
            {(props.postinfo.user.toString() === props.userId) && <i onClick={()=>OpenPostModal(props.index)} className=" cursor-pointer w-3 h-3 fa-solid fa-pen-to-square"></i>}
            {(props.postinfo.user.toString() === props.userId) && <i onClick={()=>props.handledelete(props.postinfo._id)} className="cursor-pointer w-3 h-3 fa-solid fa-trash-can"></i>}


          </div>
        </div>
        <div className='flex mx-4 flex-col items-start mb-3'>
          <p className='text-md font-normal text-[#323a46]'>{title}</p>
          <p className='flex flex-wrap space-x-1 text-sm text-[#7c377b]'>
            {tags.map((tagel, index) => {
              return (
                <span key={index} className=''>
                  {`#${tagel}`}
                </span>
              )
            })}
          </p>
          <p className='text-sm text-start'>{message}</p>
        </div>
      </div>
    </div>
  )
}

export default PostCard