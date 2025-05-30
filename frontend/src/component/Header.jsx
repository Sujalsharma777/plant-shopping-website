import React, { useContext, useState } from "react";
import { NavLink } from "react-router";
import { FaUser } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { UseCartContext } from "../context/CartContext";
import { IoReorderThree } from "react-icons/io5";
function Header() {
    const { total_item } = UseCartContext();
    return (
        <>
            <header className="bg-white shadow ">
                <div className="sm:h-20 container py-5 sm:flex sm:justify-between    sm:items-center px-5 ">
                    <div
                        className="text-2xl font-bold  text-green-700  ">
                        Plant House Store
                    </div>



                    <div className="sm:flex grid place-items-center grid-rows-4 gap-10 ">
                        <NavLink className=" text-gray-600 hover:text-green-700" to="/">
                            Home
                        </NavLink>

                        <NavLink
                            className=" text-gray-600 hover:text-green-700"
                            to="/Product">
                            Product
                        </NavLink>

                        <NavLink className="text-gray-600 hover:text-green-700" to="/order">
                            Order
                        </NavLink>
                        <NavLink
                            className=" text-gray-600 hover:text-green-700"
                            to="/about">
                            About
                        </NavLink>
                    </div>
                    <div className="grid sm:grid-cols-2  justify-center sm:gap-5 my-10 gap-5   ">
                        <NavLink className="text-gray-600 hover:text-green-700 text-2xl" to="/login">
                            <FaUser />
                        </NavLink>
                        <NavLink
                            className="text-gray-600 hover:text-green-700 relative text-2xl"
                            to="/Cart">
                            <FaCartShopping />
                            <span className="w-full absolute text-[10px] rounded-4xl text-center ring-2 p-1 bg-rose-500  z-10 -top-2 -right-3 font-bold">{total_item}</span>
                        </NavLink>
                    </div>

                </div>
            </header>
        </>
    );
}

export default Header;
