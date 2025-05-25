import { React, useEffect, useState } from 'react'
import axios from "axios"
import { toast } from "react-toastify"
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';
import API from "../service/api"
const NewUser = () => {
    const navigate = useNavigate();
    const [loginInfo, setlogin] = useState({ email: "", password: "" });
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { user, token, logout } = useAuth();
    const [namedata, setnamedata] = useState()

    const handleChange = (e) => {
        const { name, value } = e.target;
        const copylogininfo = { ...loginInfo }
        copylogininfo[name] = value;
        setlogin(copylogininfo)


    };

    console.log()

    useEffect(() => {
        // ✅ Check localStorage on page load
        const user = localStorage.getItem("userName");
        const token = localStorage.getItem("token");
        if (user && token) {
            setIsLoggedIn(true);
        }
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
        if (!email || !password) {
            return toast.error("name email password in empty")

        }


        try {
            const url = "api/auth/login";
            const response = await API.post(url, loginInfo, {
                headers: { "Content-Type": "application/json" }
            });
            setnamedata(response.data.user.name)

            const { success, message, error, token, name } = response.data;

            if (success) {


                toast.success(message)
                setTimeout(() => {
                    navigate("/")
                }, 100);

                localStorage.setItem("userName", name);
                localStorage.setItem("token", token);
                setIsLoggedIn(true);

            } else if (!success) {
                toast.error(error)

            }
        } catch (error) {
            toast.error("Email or password is not match")


        }
    }
    const logoutbtn = (e) => {
        logout()
        setTimeout(() => {
            navigate("/")
        }, 1000)
    }


    return (<div id='login' className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
                Login
            </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            {isLoggedIn ? (
                <div className="text-center text-green-600 text-lg font-medium">
                    <div>Hello "{namedata}"</div>
                    <button onClick={logoutbtn}>Logout</button>
                </div>
            ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-900 space-y-6">
                            Email address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-green-600"
                            onChange={handleChange}
                            value={loginInfo.email}
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-green-600"
                            onChange={handleChange}
                            value={loginInfo.password}
                        />
                        <div className='flex justify-end text-sm font-medium text-gray-600 underline'>
                            <NavLink to="/NewUser">If you are a new user</NavLink>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                        >
                            Login
                        </button>
                    </div>
                </form>
            )}
        </div>
    </div>
    );


}

export default NewUser