"use client"
import axios from 'axios';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';
import { API_URL } from '@/config/api';

const LoginPage = () => {
    const [errorField, setErrorField] = useState({
        emailErr: false,
        passErr: false,
        nameErr: false
    })
    const [showpassword, setShowPassword] = useState(false);
    const [signup, setSignUp] = useState(false);
    const email = useRef('');
    const pass = useRef('');
    const name = useRef('');
    const phoneNo = useRef('');
    const router = useRouter();

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

    const handleSubmit = async () => {

        const loading = toast.loading("Signing in...")
        if (!email.current || !pass.current) {
            setErrorField((prev) => ({
                ...prev,
                emailErr: email.current ? false : true,
                passErr: pass.current ? false : true,
            }));
            toast.dismiss(loading);
            return;
        }
        try {
            const res = await signIn('credentials', {
                username: email.current,
                password: pass.current,
                redirect: false,
            })
            toast.dismiss(loading);
            if (!res?.error) {
                toast.success("Sign in successfully", {
                    autoClose: 2000
                });
                router.push("/");
            } else {
                if (res.status === 401) {
                    toast.error("Invalid credentials, try again!");
                } else if (res.status === 404) {
                    toast.error("User not found");
                } else if (res.status === 500) {
                    toast.error("'Missing Credentials!");
                } else {
                    toast.error("something went wrong!")
                }
            }
        } catch (error:any) {
            console.log(error);
            toast.dismiss(loading);
            toast.error(error.response.data.error || "Somthing went wrong!", {
                autoClose: 2000
            })
            
        }
            
        //     if (!res?.error) {
        //         toast.success("Sign in successfully", {
        //             autoClose: 2000
        //         });
        //         router.push("/");
        //     } else {
        //         if (res.status === 401) {
        //             toast.error("Invalid credentials, try again!");
        //         } else if (res.status === 404) {
        //             toast.error("User not found");
        //         } else if (res.status === 500) {
        //             toast.error("'Missing Credentials!");
        //         } else {
        //             toast.error("something went wrong!")
        //         }
        // }
    }

    const handleSignUp = async () => {
        const loading = toast.loading("Signing in...")
        if (!email.current || !pass.current || !name.current) {
            setErrorField((prev) => ({
                ...prev,
                emailErr: email.current ? false : true,
                passErr: pass.current ? false : true,
                nameErr: name.current ? false : true
            }));
            toast.dismiss(loading);
            return;
        }
        const data = {
            name: name.current,
            email: email.current,
            password: pass.current,
            ...(phoneNo.current && { phoneNo: phoneNo.current })
        }
        try {
            
            const adduser = await axios.post(`${API_URL}user/signup`, data);
            console.log(adduser);

            if (adduser && adduser.data.success) {
                toast.dismiss(loading);
                toast.success("Account created successfully", {
                    autoClose: 2000
                });
                setSignUp(false)
            }
        } catch (error: any) {
            console.log(error);

            toast.dismiss(loading);
            if (error?.response?.status === 401) return toast.error("USer already exist", {
                autoClose: 2000
            });
            toast.error(error.response.data.error || "Somthing went wrong!", {
                autoClose: 2000
            })
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className={`w-full max-w-lg bg-neutral-900  rounded-2xl shadow-2xl p-8 md:p-10 text-white ${signup && "relative pt-24"}`}>
                <h2 className="text-2xl font-semibold text-center mb-2">
                    {signup ? "Join now to track your expenses" : "Log in to manage expenses"}
                </h2>
                <p className="text-center text-gray-400 mb-2">
                    {signup ? "Sign up to continue" : "Login to your account"}
                </p>
                <div className='space-y-6'>
                    {signup && (
                        <>
                            <div>
                                <label className="block text-sm mb-1">Full Name</label>
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    onChange={(e) => (name.current = e.target.value)}
                                    className="input"
                                />
                                {errorField.nameErr && <span className='text-red-600 text-md'>Name is required</span>}
                            </div>
                            <div>
                                <label className="block text-sm mb-1">Phone Number</label>
                                <input
                                    type="tel"
                                    placeholder="9876543210"
                                    onChange={(e) => (phoneNo.current = e.target.value)}
                                    className="input"
                                />
                            </div>
                        </>
                    )}

                    <div>
                        <label className="block text-sm mb-1">Email Address</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            onChange={handleChangeEmail}
                            className="input"
                        />
                        {errorField.emailErr && <span className='text-red-600 text-md'>Email is required</span>}
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Password</label>
                        <div className="relative">
                            <input
                                type={showpassword ? "text" : "password"}
                                placeholder="••••••••"
                                onChange={handleChangePass}
                                className="input pr-10"
                            />
                        </div>
                        {errorField.passErr && <span className='text-red-600 mt-2 texr-md'>Password is required</span>}
                        {pass.current && <p
                            className="text-sm text-blue-400 mt-2 cursor-pointer"
                            onClick={() => setShowPassword((prev) => !prev)}
                        >
                            {showpassword ? "Hide passowrd" : "Show Password"}
                        </p>}
                    </div>

                    <button
                        onClick={signup ? handleSignUp : handleSubmit}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 font-semibold hover:brightness-110 transition duration-300"
                    >
                        {signup ? "Sign Up" : "Login"}
                    </button>
                </div>

                <div className="flex items-center gap-4 my-4">
                    <hr className="flex-1 border-neutral-700" />
                    <span className="text-neutral-500 text-sm">OR</span>
                    <hr className="flex-1 border-neutral-700" />
                </div>

                <button
                    onClick={() => { signIn('google', { callbackUrl: '/' }) }}
                    className="w-full flex items-center justify-center gap-3 bg-white text-black py-3 rounded-xl hover:bg-gray-200 transition"
                >
                    <FcGoogle size={22} />
                    Continue with Google
                </button>

                <p className="text-sm text-center text-gray-400 mt-4">
                    {signup ? "Already have an account?" : "Don't have an account?"}{" "}
                    <span
                        className="text-blue-400 font-semibold cursor-pointer"
                        onClick={() => setSignUp((prev) => !prev)}
                    >
                        {signup ? "Login" : "Sign up"}
                    </span>
                </p>
            </div>
        </div>
    )
}

export default LoginPage