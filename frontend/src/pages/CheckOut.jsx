import React, { useState } from 'react';
import axios from 'axios';
import { UseCartContext } from "../context/CartContext";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify"
import Formateprice from "../Helper/FormatePrice"
const CheckoutPage = () => {
    const { Cart, total_price, shipping_fee, RemoveCart } = UseCartContext();
    const [orderData, setOrderData] = useState(null);

    const navigate = useNavigate();

    const [contactInfo, setContactInfo] = useState({
        name: '',
        phone: '',
        email: '',
    });

    const [addressInfo, setAddressInfo] = useState({
        address: '',
        city: '',
        postalCode: '',
        country: '',
    });

    const paymentMethod = 'COD'; // Cash on Delivery

    const handlePlaceOrder = async () => {
        const token = localStorage.getItem('token');

        const newOrderData = {
            contactInfo,
            addressInfo,
            paymentMethod,
            totalPrice: total_price + shipping_fee,
            orderItems: Cart.map(item => ({
                name: item.name,
                qty: item.amount,
                price: item.price,
                image: item.image,
                product: item._id, // assuming each cart item has `_id` of product
            })),
        };
        setOrderData(newOrderData);



        try {
            await axios.post('https://plant-shopping-website-backend.onrender.com/api/auth/userorder', newOrderData, {
                headers: { Authorization: `Bearer ${token}` },
            });

            RemoveCart(); // Clear cart
            navigate('/order'); // Redirect to orders page
        } catch (error) {

            console.error('Checkout failed:', error.response?.data || error.message);
            toast.error("something is wrong")


        }
        if (!token) {
            toast.error("Please login first")
            navigate('/login');
        }
    };


    return (
        <div className='grid sm:grid-cols-2 gap-5 m-10  '>
            <div>
                <div className='w-full text-left px-5 text-4xl font-serif font-medium flex justify-center '>
                    <h2 >Checkout</h2>
                </div>


                <div className='my-10 *:w-full'>
                    <h1 className='text-lg font-medium font-serif my-5'>Contact Information</h1>
                    <input type="text" placeholder="Name" onChange={e => setContactInfo({ ...contactInfo, name: e.target.value })} className='m-1 p-2 text-sm border-b-2  ' required />
                    <input type="text" placeholder="Phone" onChange={e => setContactInfo({ ...contactInfo, phone: e.target.value })} className='m-1 p-2 text-sm border-b-2  ' required />
                    <input type="email" placeholder="Email" onChange={e => setContactInfo({ ...contactInfo, email: e.target.value })} className='m-1 p-2 text-sm border-b-2  ' required />
                </div>
                <div className=' *:w-full'>
                    <h1 className='text-lg font-medium font-serif my-5'>Address</h1>
                    <input type="text" placeholder="Address" onChange={e => setAddressInfo({ ...addressInfo, address: e.target.value })} className='m-1 p-2 text-sm border-b-2  ' required />
                    <input type="text" placeholder="City" onChange={e => setAddressInfo({ ...addressInfo, city: e.target.value })} className='m-1 p-2 text-sm border-b-2  ' />
                    <input type="text" placeholder="Postal Code" onChange={e => setAddressInfo({ ...addressInfo, postalCode: e.target.value })} className='m-1 p-2 text-sm border-b-2  ' required />
                    <input type="text" placeholder="Country" onChange={e => setAddressInfo({ ...addressInfo, country: e.target.value })} className='m-1 p-2 text-sm border-b-2  ' required />
                </div>
                <div className='font-medium text-gray-600 my-5 underline'>
                    "Only Cash On Delivery Available Yet"
                </div>
                <div className='flex sm:justify-start my-10 justify-center'>
                    <button className="p-2  bg-green-700 text-white rounded-sm w-1/2 " onClick={handlePlaceOrder}>Place Order</button>
                </div>
            </div>

            <div className=' sm:col-span-1'>
                <div className="bg-white p-5 border rounded shadow-md">
                    <h2 className='text-xl font-semibold mb-3'>Your Orders</h2>
                    <hr className='mb-4' />

                    {Cart.length === 0 ? (
                        <p className="text-gray-500">Your cart is empty.</p>
                    ) : (
                        Cart.map((item, index) => (
                            <div key={index} className="flex items-center gap-4 mb-4">
                                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover border rounded" />
                                <div>
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-sm text-gray-600">Qty: {item.amount}</p>
                                    <p className="text-sm text-gray-600">Price: {<Formateprice Price={item.price} />}</p>
                                </div>
                            </div>
                        ))
                    )}

                    <hr className='my-4 ' />
                    <div className='text-right'>
                        <p className="text-lg font-semibold">Subtotal: {<Formateprice Price={total_price} />}</p>
                        <p className="text-md text-gray-600">Shipping: {<Formateprice Price={shipping_fee} />}</p>
                        <p className="text-xl font-bold mt-2">Total:{<Formateprice Price={total_price + shipping_fee} />}</p></div>
                </div>
            </div>

        </div >

    );
};




export default CheckoutPage;
