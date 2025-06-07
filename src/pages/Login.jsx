import React from 'react'
import banner_img from '../assets/theWay.jpeg'

const colors = {
    primary: "#060606",
    background: "#e0e0e0",
    disabled: "#d9d9d9"
}


const Login = () => {
  return (
    <div className='w-full h-screen flex items-start'>
        <div className="relative w-[1/2px] h-full flex flex-col">
        <div className="absolute top-[20%] left-[10%] flex flex-col"></div>
            <img src={banner_img} className=" w-full object-cover h-full" />
        </div>

        <div className="w-1/2 h-full bg-[#f5f5f5] flex flex-col p-24 justify-between">
            <h1 className="text-xl text-[#060606] font-semibold">ADMIN LOGIN PAGE</h1>
            
            <div className='w-full flex flex-col'>
                <div className="w-full flex flex-col mb-10">
                    <h3 className='text-2xl font-semibold mb-4'>Login</h3>
                    <p className='text-sm mb-2'>Welcome Back! Please enter your details</p>
                </div>

                <div className="w-full flex flex-col">
                   
                    <input type="email" 
                        placeholder='Enter your email here'
                        className='w-full py-4 my-4 text-black  border-b border-black outline-none focus:outline-none' 
                    />

                    <input type="text" 
                        placeholder='Enter your password here'
                        className='w-full py-4 my-4 text-black  border-b border-black outline-none focus:outline-none' 
                    />
                </div>

            </div>

             <div className="w-full items-center justify-center flex ">
                    <p className='text-sm font-normal bg-transparent text-black'>Create your <span className='font-semibold cursor-pointer '>admin </span>account here</p>
                </div>
        </div>
    </div>
  )
}

export default Login