import React, { useEffect, useState } from 'react';
import api from '../service/api';

const AdminPanel = () => {
    const [stats, setStats] = useState({});
    const [orders, setOrders] = useState([]);
    const token = localStorage.getItem("token")
    useEffect(() => {
        const fetchStats = async () => {
            const res = await api.get('http://localhost:5000/api/admin/dashboard');
            setStats(res.data);

        };
        const fetchOrders = async () => {
            const res = await api.get('http://localhost:5000/api/admin/orders');
            setOrders(res.data);
        };
        fetchStats();
        fetchOrders();
    }, []);

    const updateStatus = async (id, newStatus) => {
        await api.put(`http://localhost:5000/api/admin/order/${id}/status`, { status: newStatus });
        setOrders(orders.map(o => o._id === id ? { ...o, status: newStatus } : o));
    };

    return (
        <div>
            <h2>Dashboard</h2>
            <p>Total Sales: ${stats.totalSales}</p>
            <p>Pending Orders: {stats.pendingOrders}</p>
            <p>Delivered Orders: {stats.deliveredOrders}</p>

            <h3>All Orders</h3>
            <table>
                <thead>
                    <tr>
                        <th>User</th><th>Total</th><th>Status</th><th>Change</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order._id}>
                            <td>{order.user?.name}</td>
                            <td>${order.totalPrice}</td>
                            <td>{order.status}</td>
                            <td>
                                {order.status !== 'Confirmed' && (
                                    <button onClick={() => updateStatus(order._id, 'Confirmed')}>Confirm</button>
                                )}
                                {order.status !== 'Delivered' && (
                                    <button onClick={() => updateStatus(order._id, 'Delivered')}>Deliver</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPanel;
