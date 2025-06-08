import React, { useState } from 'react';
import banner_img from '../assets/theWay.jpeg';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serverUrl } from '../App';
import { toast } from 'react-toastify';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${serverUrl}/api/admin/create`, { name, email, password });
             console.log('Response:', response.data);
            if (response.data.success) {
                toast.success('Admin registered');
                navigate('/login'); 
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('Error:', error.response?.data || error.message);
            toast.error(error.message);
        }
    };

    return (
        <div className='w-full min-h-screen flex flex-col lg:flex-row items-start bg-white'>
            {/* Left Section */}
            <div className="relative w-full h-56 sm:h-64 md:h-80 lg:w-1/2 lg:h-full flex flex-col">
                <img src={banner_img} className="w-full h-full object-cover" alt="Banner" />
            </div>

            {/* Right Section */}
            <div className="w-full lg:w-1/2 h-full bg-[#f5f5f5] flex flex-col px-4 py-8 sm:px-8 sm:py-12 lg:p-24 justify-between overflow-y-auto">
                <h1 className="text-lg sm:text-xl lg:text-2xl text-[#060606] font-semibold text-center lg:text-left">
                    ADMIN PAGE
                </h1>

                <div className='w-full flex flex-col flex-grow'>
                    <div className="w-full flex flex-col mb-4 sm:mb-6 lg:mb-10">
                        <h3 className='text-xl sm:text-2xl lg:text-3xl font-semibold mb-2 sm:mb-4 text-center lg:text-left'>
                            Register
                        </h3>
                        <p className='text-sm sm:text-base mb-2 text-center lg:text-left'>
                            Welcome! Please create your account
                        </p>
                    </div>

                    <form onSubmit={onSubmitHandler}>
                        <div className="w-full flex flex-col">
                            <input
                                type="text"
                                placeholder='Enter your full name here'
                                className='w-full py-2 sm:py-3 lg:py-4 my-2 text-black border-b border-black outline-none focus:outline-none'
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                            />

                            <input
                                type="email"
                                placeholder='Enter your email here'
                                className='w-full py-2 sm:py-3 lg:py-4 my-2 text-black border-b border-black outline-none focus:outline-none'
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />

                            <input
                                type="password"
                                placeholder='Enter your password here'
                                className='w-full py-2 sm:py-3 lg:py-4 my-2 text-black border-b border-black outline-none focus:outline-none'
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                        </div>

                        <div className="w-full flex flex-col mt-4">
                            <button className='w-full bg-[#060606] text-white rounded-md p-3 sm:p-4 my-4 text-center flex items-center justify-center'>
                                Register
                            </button>
                        </div>
                    </form>
                </div>

                <div className="w-full items-center justify-center flex mt-4">
                    <Link to='/login'>
                        <p className='text-sm font-normal bg-transparent text-black text-center'>
                            Login to your <span className='font-semibold cursor-pointer'>admin</span> account here
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;