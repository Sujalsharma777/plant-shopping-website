import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import FormatePrice from "../Helper/FormatePrice";
const DelverdAdmin = () => {
    const [orders, setOrders] = useState([]);
    console.log(orders)
    const fetchPendingOrders = async () => {
        try {
            const res = await axios.get("http://localhost:5000/admin/Deliver", {
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
    return (

        <div className='m-5'>
            {orders.map(order => (
                <div key={order._id} className="border p-4 mb-4 flex sm:flex-row-reverse flex-col-reverse  justify-between">
                    <div className="flex flex-col justify-center *:py-2"> <p><span className="font-medium ">Customer Name: </span><span>{order.contactInfo.name}</span></p>

                        <p><span className="font-medium ">Phone Number: </span><span>{order.contactInfo.phone}</span></p>
                        <p><span className="font-medium ">Address:</span> <span>{order.addressInfo.address} ,{order.addressInfo.city},{order.addressInfo.city},{order.addressInfo.postalCode}</span></p>
                        <p><span className="font-medium ">Order Date:</span> <span>{new Date(order.createdAt).toLocaleDateString()}</span></p>
                        <h2><span className="font-medium ">Status: </span><span>{order.orderStatus}</span></h2>
                        <p><span className="font-medium ">Total Price:</span> <span>{<FormatePrice Price={order.totalPrice} />}</span></p>
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
    )
}



export default DelverdAdmin;
