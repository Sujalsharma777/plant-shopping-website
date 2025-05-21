import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FormatePrice from "../Helper/FormatePrice"
import { toast } from 'react-toastify';
const OrdersPage = () => {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        const token = localStorage.getItem('token');
        try {
            const res = await axios.get('http://localhost:5000/api/auth/my-orders', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setOrders(res.data);
        } catch (error) {
            console.error('Error fetching orders:', error.message);
        }
    };


    const handleCancelOrder = async (orderId) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`http://localhost:5000/api/auth/cancel-order/${orderId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("Order Cancel Successfully")
            fetchOrders();
        } catch (error) {
            toast.error('Failed to cancel order');
        }

    };


    useEffect(() => {

        fetchOrders();
    }, []);

    return (
        <div className='grid grid-cols-subgrid gap-2 my-5 '>
            <h2 className='text-center text-2xl font-medium font-sans underline'>My Orders</h2>
            {orders.length === 0 ? (
                <p className='text-center font-bold text-lg text-red-600'>No orders found.</p>
            ) : (
                orders.map((order) => (
                    <div key={order._id} className='border p-2 flex justify-between'>
                        <ul className='text-sm'>
                            {order.orderItems.map((item, idx) => (
                                <li key={idx} className='flex justify-center items-center gap-2'>
                                    <img src={`http://localhost:5000/uploads/${item.image}`} alt={item.name} width="80" />
                                    <div className='grid-cols-2'>
                                        <div className='text-md font-medium'>{item.name} x {item.qty}</div>
                                        <p className='text-md '><strong>Order ID:</strong> {order._id}</p>
                                        <p className='text-sm '><strong>Payment:</strong> {order.paymentMethod}</p>
                                    </div>
                                </li>
                            ))}

                        </ul>


                        <div className='grid grid-rows-3'>

                            <p className='text-md '><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                            <p className='text-md '><strong>Total:</strong> <FormatePrice Price={order.totalPrice} /></p>
                            <p className='text-md '><strong>Status:</strong> {order.orderStatus}</p>
                        </div>

                        {order.orderStatus === 'Pending' && (
                            <button
                                onClick={() => handleCancelOrder(order._id)}
                                style={{
                                    backgroundColor: 'red',
                                    color: 'white',
                                    padding: '0.5rem',
                                    marginTop: '1rem',
                                    border: 'none',
                                    cursor: 'pointer',
                                }}
                            >
                                Cancel Order
                            </button>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default OrdersPage;
