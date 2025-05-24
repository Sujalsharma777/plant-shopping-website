import { useEffect, useState } from 'react';
import FormatePrice from '../Helper/FormatePrice';
import axios from 'axios';

function PendingOrders() {
    const [orders, setOrders] = useState([]);

    const fetchPendingOrders = async () => {
        try {
            const res = await axios.get("http://localhost:5000/admin/pending", {
                withCredentials: true,
            });
            setOrders(res.data);
        } catch (err) {
            console.error("Error fetching orders", err);
        }
    };
    useEffect(() => {
        fetchPendingOrders();
    }, []);

    const updateStatus = async (id, newStatus) => {
        await axios.put(`http://localhost:5000/admin/${id}/update`, { status: newStatus },
            { withCredentials: true });

        fetchPendingOrders();
    };

    return (
        <div className='m-10'>
            <h1 className='text-center my-10 text-2xl font-medium font-poppins'>Pending Orders</h1>
            {orders.map(order => (
                <div key={order._id} className="border p-4 mb-4 flex sm:flex-row-reverse flex-col-reverse  justify-between">
                    <div className="flex flex-col justify-center *:py-2"> <p><span className="font-medium ">Customer Name: </span><span>{order.contactInfo.name}</span></p>

                        <p><span className="font-medium ">Phone Number: </span><span>{order.contactInfo.phone}</span></p>
                        <p><span className="font-medium ">Address:</span> <span>{order.addressInfo.address} ,{order.addressInfo.city},{order.addressInfo.city},{order.addressInfo.postalCode}</span></p>
                        <p><span className="font-medium ">Order Date:</span> <span>{new Date(order.createdAt).toLocaleDateString()}</span></p>
                        <h2><span className="font-medium ">Status: </span><span>{order.orderStatus}</span></h2>
                        <p><span className="font-medium ">Total Price:</span> <span>{<FormatePrice Price={order.totalPrice} />}</span></p>
                        <div className='flex gap-10'>
                            <button className="min-w-42 max-w-42 flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600" onClick={() => updateStatus(order._id, 'Confirmed')}>Confirmed</button>
                            <button className="min-w-42 max-w-42 flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600" onClick={() => updateStatus(order._id, 'Delivered')}>Delivered</button>
                        </div>
                    </div>

                    <ul>
                        {order.orderItems.map((item, idx) => (
                            <li key={idx}>
                                <img src={item.image} alt={item.name} className="min-w-15 max-w-20" />
                                {item.name} - Qty: {item.qty} - {<FormatePrice Price={item.price} />}
                            </li>
                        ))}
                    </ul>

                </div>
            ))
            }

        </div >
    );
}

export default PendingOrders;
