import { useEffect, useState } from "react";
import axios from 'axios'

function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState("");
    console.log(orders)
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get("https://plant-shopping-website-backend.onrender.com/admin/orders", { withCredentials: true });
                setOrders(res.data);
            } catch (err) {
                console.error(err);
                setError("Failed to load orders. Make sure you're logged in as admin.");
            }
        };

        fetchOrders();
    }, []);





    return (
        <>
            <div>
                <h2>Admin Orders</h2>

                {error && <p style={{ color: 'red' }}>{error}</p>}

                {orders.length === 0 ? (
                    <p>No orders found.</p>
                ) : (
                    orders.map((order, index) => (
                        <div key={index} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
                            <h3>Order #{index + 1}</h3>
                            <p><strong>Name:</strong> {order.contactInfo.name}</p>
                            <p><strong>Email:</strong> {order.contactInfo.email}</p>
                            <p><strong>Phone:</strong> {order.contactInfo.phone}</p>

                            <p><strong>Address:</strong> {order.addressInfo.address}, {order.addressInfo.city}, {order.addressInfo.postalCode}, {order.addressInfo.country}</p>

                            <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                            <p><strong>Status:</strong> {order.orderStatus}</p>
                            <p><strong>Total Price:</strong> ₹{order.totalPrice}</p>
                            <p><strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                            <p><strong>Product:</strong> {order.orderItems.name}</p>
                        </div>
                    ))
                )}
            </div></>

    )
}
export default AdminOrders