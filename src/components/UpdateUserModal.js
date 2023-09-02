import React, { useEffect , useState } from 'react'
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators } from '../store/index';
import { bindActionCreators } from 'redux'
import user from '../images/user.png'

const UpdateUserModal = (props) => {
    const dispatch = useDispatch();
    const { getuserData , updateUserData} = bindActionCreators(actionCreators, dispatch)
    const userData = useSelector(state => state.userData);
    const [NewUserData, setNewUserData] = useState({name:"" , email:"" , password:"" , profileImage:""})
    const [imgUrl , setImgUrl] = useState("") ;
    useEffect(() => {

        getuserData();

        // eslint-disable-next-line
    }, [])
    const handleSubmit = (e) => {
        updateUserData(NewUserData.name , NewUserData.email,NewUserData.password,NewUserData.profileImage );
        e.preventDefault() ;
        props.OpenUserModal() ;
        window.location.reload() ;
        
    }
    return (

        <div className='relative shadow-lg bg-white rounded-lg md:w-1/2 w-5/6 flex flex-col justify-center items-center m-5 p-5 mx-auto'>
            <i onClick={props.OpenUserModal} className="absolute top-4 right-6 cursor-pointer fa-solid fa-rectangle-xmark"></i>
            <img className='w-28 h-28 object-contain rounded-full' src={imgUrl==="" ? userData.profileImage || user : imgUrl} alt="" />
            <div className="flex mx-auto mt-4 relative -right-12 justify-center items-center px-5"><FileBase onDone={({ base64 }) =>{setNewUserData({ ...NewUserData, profileImage: base64 }); ; setImgUrl(base64) ;}} type="file" multiple={false} /></div>
            <form onSubmit={handleSubmit} className='space-y-5 my-2 w-full' >
                <input placeholder="Name" type="text" className=' w-full placeholder:text-slate-700 placeholder:text-[15px] bg-transparent shadow-lg  py-1 px-2 focus:outline-none' onChange={(e) => setNewUserData({ ...NewUserData, name: e.target.value })} />
                <input placeholder="Email" type="text" className='bg-transparent  placeholder:text-slate-700 placeholder:text-[15px] shadow-lg w-full py-1 px-2 focus:outline-none' onChange={(e) => setNewUserData({ ...NewUserData, email: e.target.value })}  />
                <input placeholder="Password" type="text" className='bg-transparent  placeholder:text-slate-700 placeholder:text-[15px] shadow-lg w-full py-1 px-2 focus:outline-none' onChange={(e) => setNewUserData({ ...NewUserData, password: e.target.value })} />
                {/* <input placeholder="Reenter the Password" type="text" className='bg-transparent placeholder:text-slate-700 placeholder:text-[15px] shadow-lg w-full py-1 px-2 focus:outline-none' /> */}
                <button className='bg-[#231e3b] text-white px-6 text-lg rounded-md hover:shadow-lg hover:bg-[#ffffff] hover:text-[#231e3b]' tpye="Submit">Update Profile</button>
            </form>

        </div>

    )
}

export default UpdateUserModal