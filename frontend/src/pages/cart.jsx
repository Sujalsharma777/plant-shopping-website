import React from "react";
import { UseCartContext } from "../context/CartContext";
import Cartitem from "../component/Cartitem";
import { NavLink } from "react-router";
import FormatePrice from "../Helper/FormatePrice";
const Cart = () => {
    const { Cart, RemoveCart, total_price, shipping_fee } = UseCartContext();

    if (Cart.length === 0) {
        return (
            <div className="grid place-items-center text-2xl m-5 font-bold">
                <h1>No Cart Item Add</h1>
            </div>
        );
    }
    return (
        <>
            <div className="w-full min-h-80 max-h-full">
                <div className=" flex justify-center items-center sm:m-2 m-1">
                    <div className=" grid sm:grid-cols-5  grid-cols-3  sm:gap-36 gap-10   *:m-3">
                        <p>Product</p>
                        <p className="sm:block hidden">Price</p>
                        <p>QTY</p>
                        <p className="sm:block hidden">Subtotal</p>
                        <p>Remove</p>
                    </div>
                </div>

                <hr />
                <div className=" grid gap-2 sm:m-2 m-1">
                    {Cart.map((curElem) => {
                        return <Cartitem key={curElem.id} {...curElem} />;
                    })}
                </div>
                <hr />
                <div className="flex justify-between m-5 ">
                    <div className="p-2 my-3 bg-green-700 text-white rounded-sm flex justify-center hover:bg-green-800">
                        <NavLink>
                            <button>Continue Shopping</button>
                        </NavLink>
                    </div>
                    <div className="p-2 my-3 bg-rose-500 text-white rounded-sm flex justify-center hover:bg-rose-800">
                        <button onClick={RemoveCart}>Clear Cart</button>
                    </div>
                </div>
                <div className="grid grid-rows-4 place-content-end gap-2 text-left m-10">
                    <div className="grid grid-cols-2 gap-5">
                        <span>Subtotal :</span> <span className="font-medium"><FormatePrice Price={total_price} /></span>
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                        <span>Shipping Fees :</span> <span className="font-medium"><FormatePrice Price={shipping_fee} /></span>
                    </div>
                    <div className="text-sm text-gray-700 font-medium ">

                        *GST Included
                    </div>
                    <hr />
                    <div className="grid grid-cols-2 gap-5">
                        <span>Total Price :</span> <span className="font-medium"><FormatePrice Price={shipping_fee + total_price} /></span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;
