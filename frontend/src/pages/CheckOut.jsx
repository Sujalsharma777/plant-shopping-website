import React, { useState } from 'react';
import axios from 'axios';
import { UseCartContext } from "../context/CartContext";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify"
const CheckoutPage = () => {
    const { Cart, total_price, shipping_fee, RemoveCart } = UseCartContext();
    const { id, name, image, price } = Cart
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

        const orderData = {
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

        const elements = document.getElementsByTagName("input")

        try {
            await axios.post('http://localhost:5000/api/auth/userorder', orderData, {
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

            <div className='sm:visible invisible'>
                <div>
                    <div>Your orders</div>
                    <hr />
                    <div>
                        <div className='text-2xl ' key={id} >
                            <div className='image'>{image}</div>
                            <div className='name-qty'>{name}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        /*  <div className="checkout-container grid    w-full h-screen py-10">
            
           
         </div> */
    );
};

export default CheckoutPage;
