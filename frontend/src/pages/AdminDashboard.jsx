import { useEffect, useState } from 'react';
import FormatePrice from '../Helper/FormatePrice'
import axios from 'axios';
import { NavLink } from "react-router";
import API from "../service/api"
function Dashboard() {
    const [stats, setStats] = useState({ totalSales: 0, pendingOrders: 0, deliveredOrders: 0 });
    console.log(stats)

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await API.get("admin/Dashboard", { withCredentials: true });
                setStats(res.data);
            } catch (err) {
                console.error(err);
                setError("Failed to load orders");
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className=' flex  justify-start items-center flex-col py-10 bg-amber-100 *:font-poppins'>
            <h2 className='text-4xl font-medium font-poppins'>Admin Dashboard</h2>
            <div className='flex sm:flex-row flex-col gap-5 py-10'>
                <NavLink to="/PendingOrder">Pending Orders</NavLink>
                <NavLink to="/ConfirmedOrder">Conform Order</NavLink>
                <NavLink to="/DelhverdOrder">Delivered Order</NavLink>
            </div>
            <div className='flex sm:flex-row flex-col gap-5 py-10 '>

                <div className='border w-50 h-50 flex justify-start items-center flex-col py-5 gap-10 bg-gradient-to-tl from-amber-400 to-amber-600 rounded-2xl'> <p className='text-2xl font-medium text-white'>Total Sales</p><p className='text-2xl font-bold text-red-500 '>{<FormatePrice Price={stats.totalSales} />}</p> </div>
                <div className='border w-50 h-50 flex justify-start items-center flex-col py-5 gap-10 bg-gradient-to-tl from-amber-400 to-amber-600 rounded-2xl'> <p className='text-2xl font-medium text-white'>Pending Orders</p><p className='text-2xl font-bold text-red-500 '>{stats.pendingOrders}</p> </div>
                <div className='border w-50 h-50 flex justify-start items-center flex-col py-5 gap-10 bg-gradient-to-tl from-amber-400 to-amber-600 rounded-2xl'> <p className='text-2xl font-medium text-white'>Delivered</p><p className='text-2xl font-bold text-red-500 '>{stats.deliveredOrders}</p> </div>

            </div>

        </div>
    );
}

export default Dashboard;
