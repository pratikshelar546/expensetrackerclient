"use client"
import React, { useRef, useState } from 'react'
import { MdPassword } from 'react-icons/md';

const LoginPage = () => {
    const [errorField, setErrorField] = useState({
        emailErr: false,
        passErr: false
    })
    const [showpassword, setShowPassword] = useState(false);
    const email = useRef('');
    const pass = useRef('');

    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        email.current = value;
        setErrorField((prev) => ({
            ...prev,
            emailErr: false
        }))
    }


    const handleChangePass = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        pass.current = value;
        setErrorField((prev) => ({
            ...prev,
            passErr: false
        }))
    }
    return (
        <div className='flex min-h-screen items-center justify-center overflow-hidden antialiased '>
            <div className='h-full flex justify-center items-center flex-col gap-4 px-10 py-10 border border-neutral-600 rounded-2xl bg-neutral-900'>
                <p className=' font-semibold'>Login in to access your expenses</p>
                <div className='flex flex-col gap-2 text-lg'>
                    <label>Email</label>
                    <input
                        placeholder='name@gmail.com'
                        type='email'
                        className='px-4 py-4 w-96 text-lg leading-4 focus:ring-none focus:outline-none focus:border focus:border-neutral-600 rounded-md     '
                        onChange={handleChangeEmail}
                    />
                </div>
                <div className='flex flex-col gap-2 text-lg'>
                    <label>Password</label>
                    <input
                        placeholder='********'
                        type={showpassword ? 'text' : 'password'}
                        className='px-4 py-4 w-96 text-lg leading-4 focus:ring-none focus:outline-none focus:border focus:border-neutral-600 rounded-md '
                        onChange={handleChangePass}
                    />
                    <p className='cursor-pointer' onClick={() => setShowPassword(prev => !prev)}>Show Password</p>
                </div>
                <button className="relative text-xl text-white px-10 py-3 rounded-xl bg-gradient-to-r from-blue-500 via-blue-600 to-blue-800 bg-[length:200%_200%] transition-all duration-1000 ease-in-out hover:bg-right">
                    Login
                </button>


            </div>
        </div>
    )
}

export default LoginPage