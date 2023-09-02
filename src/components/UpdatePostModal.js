import React, { useEffect , useState } from 'react'
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators } from '../store/index';
import { bindActionCreators } from 'redux'
import user from '../images/user.png'

const UpdatePostModal = (props) => {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.userData)
    const { title , message , creator , tags , selectedFile} = props.postInfo ;
    const [NewPostData, setNewPostData] = useState({title : "" , message : "" , creator : "" , tags : [] , selectedFile: ""})
    const [imgUrl , setImgUrl] = useState("") ;
    const [tagsto, settagsto] = useState("")
    const { updatePost} = bindActionCreators(actionCreators, dispatch)
    const displaytags = () => {
        var i = 0 ; 
        var ans = "" ;
        for(i=0;i<tags.length;i++){
            ans = ans+tags[i]+"," ;
        }
        settagsto(ans) ;
    }
    const handleSubmit = (e) => {
        // updateUserData(NewUserData.name , NewUserData.email,NewUserData.password,NewUserData.profileImage );
        console.log(NewPostData.tags)
        settagsto(NewPostData.tags)
        updatePost(NewPostData.title , NewPostData.message ,userData.name , NewPostData.tags , NewPostData.selectedFile , props.postInfo._id.toString() )
        e.preventDefault() ;
        props.OpenPostModal(props.index) ;
        // window.location.reload() ;
        
    }
    useEffect(()=> {
        displaytags();
        setNewPostData(props.postInfo) ;
    },[])
    
    return (

        <div className='relative shadow-lg bg-white rounded-lg md:w-1/2 w-5/6 flex flex-col justify-center items-center m-5 p-5 mx-auto'>
            <div onClick={()=>props.OpenPostModal(props.index)}><i  className="absolute top-4 right-6 cursor-pointer fa-solid fa-rectangle-xmark"></i></div>
            <img className='w-28 h-28 object-contain rounded-full' src={imgUrl==="" ? selectedFile : imgUrl} alt="" />
            <div className="flex mx-auto mt-4 relative -right-12 justify-center items-center px-5"><FileBase onDone={({ base64 }) =>{setNewPostData({ ...NewPostData, selectedFile: base64 }); ; setImgUrl(base64) ;}} type="file" multiple={false} /></div>
            <form onSubmit={handleSubmit} className='space-y-5 my-2 w-full' >
                <input placeholder="Title" type="text" value={NewPostData.title} className=' w-full placeholder:text-slate-700 placeholder:text-[15px] bg-transparent shadow-lg  py-1 px-2 focus:outline-none' onChange={(e) => setNewPostData({ ...NewPostData, title: e.target.value })} />
                <input placeholder="Message" type="text" value={NewPostData.message} className='bg-transparent  placeholder:text-slate-700 placeholder:text-[15px] shadow-lg w-full py-1 px-2 focus:outline-none' onChange={(e) => setNewPostData({ ...NewPostData, message: e.target.value })}  />
                <input placeholder="Tags" type="text"  className='bg-transparent  placeholder:text-slate-700 placeholder:text-[15px] shadow-lg w-full py-1 px-2 focus:outline-none' onChange={(e) => {setNewPostData({ ...NewPostData, tags: e.target.value.split(',') }); }} />
                {/* <input placeholder="Reenter the Password" type="text" className='bg-transparent placeholder:text-slate-700 placeholder:text-[15px] shadow-lg w-full py-1 px-2 focus:outline-none' /> */}
                <button className='bg-[#231e3b] text-white px-6 text-lg rounded-md hover:shadow-lg hover:bg-[#ffffff] hover:text-[#231e3b]' tpye="Submit">Update Post</button>
            </form>

        </div>

    )
}

export default UpdatePostModal