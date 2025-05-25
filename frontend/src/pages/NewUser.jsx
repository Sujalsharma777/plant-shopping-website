import { React, useState } from 'react'
import axios from "axios"

import { toast } from "react-toastify"
import API from "../service/api"
import { useNavigate } from 'react-router-dom'
const NewUser = () => {
    const navigate = useNavigate();
    const [SignupInfo, setSignup] = useState({ name: "", email: "", password: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const copysignupinfo = { ...SignupInfo }
        copysignupinfo[name] = value;
        setSignup(copysignupinfo)


    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = SignupInfo;
        if (!name || !email || !password) {
            return toast.success("name email password in empty")

        }


        try {
            const url = "api/auth/register";
            const response = await API.post(url, SignupInfo, {
                headers: { "Content-Type": "application/json" }
            });

            const { success, message, error } = response.data;

            if (success) {
                toast.success("User registered successfully")
                setTimeout(() => {

                    navigate(-1)
                }, 100);
            } else if (!success) {
                toast.error(message)

            } else if (error) {
                toast.error(message)
            }
        } catch (error) {

            toast.error("User Already Exist")

        }
    }
    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">



                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Signup
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="Name" className="block text-sm/6 font-medium text-gray-900">
                                User Name *
                            </label>
                            <div className="mt-2">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"

                                    autoComplete="Name"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
                                    onChange={handleChange}
                                    value={SignupInfo.name}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"

                                    autoComplete="email"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
                                    onChange={handleChange}
                                    value={SignupInfo.email}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                    Password
                                </label>

                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"

                                    autoComplete="current-password"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
                                    onChange={handleChange}
                                    value={SignupInfo.password}
                                />
                            </div>

                        </div>

                        <div>
                            <button
                                className="flex w-full justify-center rounded-md bg-green-800 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-green-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                            >
                                Signup
                            </button>
                        </div>
                    </form>

                </div>

            </div></>
    )
}

export default NewUser