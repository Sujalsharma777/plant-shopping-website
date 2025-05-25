// AdminLogin.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await axios.post(
                "https://plant-shopping-website-backend.onrender.com/admin/loginadmin",
                { email, password },
                { withCredentials: true }
            );

            if (res.data.redirect === "/adminpanel") {
                navigate("/AdminDashboard");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 my-12 lg:px-8 *:font-poppins">
            <h2 className="text-2xl font-bold text-center my-5">Admin Login</h2>
            <div className="my-5 text-red-600 font-medium text-md text-center">
                {error && <p>{error}</p>}
            </div>
            <form onSubmit={handleSubmit} className=" flex justify-center items-center flex-col **:p-2">
                <input
                    type="email"
                    placeholder="Admin Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="min-w-60 max-w-82 mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-green-600"
                /><br />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="min-w-60 max-w-82 mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900  outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-green-600"
                /><br />
                <button type="submit" className="min-w-42 max-w-42 flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">Login</button>
            </form>
        </div>
    );
};

export default AdminLogin;
