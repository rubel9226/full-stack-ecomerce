import React, { useEffect, useState } from 'react';
import api from './../../../../API/Axios/api';
import SingleOrder from './SingleOrder';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const getMyOrders =async () => {
            try {
                const res =await api.get('/orders/my-orders')
                setOrders(res?.data?.payload);
                console.log(res?.data?.payload);
            } catch (error) {
                console.log(error)
            }
        };

        getMyOrders();
    }, []);

    console.log(orders);

    return (
        <div>
            <p className='text-sm font-semibold'>My Order List</p>
            <div>
                {
                    orders.map(order => <SingleOrder key={order._id} order={order} />)
                }
            </div>
        </div>
    );
};

export default MyOrders;