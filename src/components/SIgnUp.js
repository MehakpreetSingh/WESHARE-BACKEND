import React from 'react'
import logo from '../images/logo.png'
import action from '../images/action.png'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
const port = process.env.PORT || 5000;

const SignUp = () => {
    const navigate = useNavigate() ;
    const [signupcreds, setSignupCreds] = useState({ name: "", email: "", password: "", cpassword: "" })
    const onChange = (e) => {
        setSignupCreds({ ...signupcreds, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:${port}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: signupcreds.name, email: signupcreds.email, password: signupcreds.password })
        })
        const json = await response.json() ;
        if(json.success){
            localStorage.setItem('token', json.authtoken);
            navigate("/login");
          }
          else {
            alert("Invalid Credentials")
          }
    }
    return (
        <div className='h-screen'>
            <div className='flex w-full absolute top-0 justify-center items-center bg-[#231e3b]'>
                <div className="logo">
                    <a href="/">
                        <img className='md:h-14 h-20' src='https://i.postimg.cc/vBrDHnS9/Sagon-Studio-Logo-Template-3.png' alt="" />
                    </a>
                </div>
            </div>
            <div className="loginscreen flex h-[100%]">
                <div className="left w-1/2 hidden md:flex flex-col items-center justify-around">
                    <div className='flex justify-center mt-16'>
                        {<img className="w-5/6" src={logo} alt="" />}
                    </div>
                    <div className='cards-info flex justify-center space-x-12 '>
                        <div className="card flex flex-col justify-center items-center space-y-3 shadow-lg p-2 w-1/3 rounded-lg">
                            <img className='h-10 w-10' src="https://img.icons8.com/external-vitaliy-gorbachev-fill-vitaly-gorbachev/60/undefined/external-connect-social-media-vitaliy-gorbachev-fill-vitaly-gorbachev.png" alt="" />
                            <p>JOINING THE WORLD CLOSeR TO ONE ANOTHER</p>
                        </div>
                        <div className="card flex flex-col justify-center space-y-5 h-48 w-1/3 p-2 items-center bg-[#231e3b] rounded-lg shadow-lg">
                            <img className='h-10 w-12' src={action} alt="" />
                            <p className=' text-center text-white'>REVOLUTION
                                IN THE
                                SHARING MEMORIES</p>
                        </div>
                    </div>
                </div>
                <div className="right-div bg-[#231e3b] w-full md:w-1/2">
                    <div className='mt-28 transition-all flex flex-col items-center justify-center space-y-10 w-full'>
                        <div className='flex justify-center items-center space-x-6'>
                            <h1 className='text-white text-3xl heading'>SIGN UP</h1>
                        </div>
                        <form onSubmit={handleSubmit} id="form-type" className=' flex flex-col justify-center w-2/3 md:w-5/6 items-center my-4 space-y-5 p-5 shadow-2xl rounded-lg border-gray-100'>
                            <input placeholder="Name" name='name' onChange={onChange} type="text" className='w-[90%] text-input placeholder:text-slate-700 placeholder:text-[15px]  rounded-2xl  py-1 px-5 focus:outline-none' />
                            <input placeholder="Email" name='email' onChange={onChange} type="text" className=' w-[90%] text-input placeholder:text-slate-700 placeholder:text-[15px]	rounded-2xl py-1 px-5 focus:outline-none' />
                            <input placeholder="Password" name='password' onChange={onChange} type="text" className=' w-[90%] text-input placeholder:text-slate-700 placeholder:text-[15px] rounded-2xl py-1 px-5 focus:outline-none' />
                            <input placeholder="Check Password" name='cpassword' onChange={onChange} type="text" className=' w-[90%] text-input placeholder:text-slate-700 placeholder:text-[15px]  rounded-2xl py-1 px-5 focus:outline-none' />
                            <button className=' button-shadow flex items-center space-x-2 justify-center  transition-all hover:scale-110 px-10 text-lg rounded-md hover:shadow-lg bg-[#ffffff] text-[#231e3b]' tpye="Submit">Sign Up</button>
                            <p className='text-sm text-gray-300'>Already Have an Account<Link to="/login" className='mx-3 text-green-400 hover:underline'>Login</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp
