// MyOrders.jsx
import React, { useEffect, useState } from 'react';
import api from './../../../../API/Axios/api';
import SingleOrder from './SingleOrder';
import LoadingOrder from '../../../Loading/LoadingOrder';

const MyOrders = () => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const getMyOrders = async () => {

            try {

                setLoading(true);

                const res = await api.get('/orders/my-orders');

                setOrders(res?.data?.payload);

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);

            }

        };

        getMyOrders();

    }, []);

    return (

        <div className='pb-5'>

            {/* heading */}
            <div className='mb-4'>

                <h2 className='text-lg sm:text-xl font-bold text-black/80'>
                    My Orders
                </h2>

                <p className='text-xs sm:text-sm text-black/50 mt-1'>
                    Total Orders :
                    <span className='font-semibold text-[#1F5DA0] ml-1'>
                        {orders?.length || 0}
                    </span>
                </p>

            </div>

            {/* orders */}
            <div className='space-y-4'>

                {
                    loading
                        ? <LoadingOrder />
                        // : <div className='grid colum grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
                        : <div className='columns-1 sm:columns-2 lg:columns-3 xl:columns-4 space-y-4'>
                           {orders?.map(order => {
                                return(
                                     <SingleOrder key={order._id} order={order} />
                                    )
                                }
                            )}
                        </div>
                }

            </div>

            {/* empty */}
            {
                !loading && orders?.length === 0 &&
                <div className='bg-white rounded-2xl border border-black/10 py-14 px-5 text-center'>

                    <img
                        className='w-28 sm:w-32 mx-auto'
                        src='https://cdn-icons-png.flaticon.com/512/2038/2038854.png'
                        alt=''
                    />

                    <h3 className='mt-4 text-lg sm:text-xl font-bold text-black/70'>
                        No Orders Found
                    </h3>

                    <p className='text-sm text-black/45 mt-1'>
                        Your ordered products will appear here.
                    </p>

                </div>
            }

        </div>
    );
};

export default MyOrders;