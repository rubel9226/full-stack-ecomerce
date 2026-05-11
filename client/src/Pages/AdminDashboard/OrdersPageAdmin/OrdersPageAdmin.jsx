import React, { useEffect, useState } from 'react';
import api from '../../../API/Axios/api';

const OrdersPageAdmin = () => {

    const [allOrders, setAllOrders] = useState([]);
    const [loadingId, setLoadingId] = useState("");

    useEffect(() => {

        const getAllOrders = async () => {

            try {

                const res = await api.get('/orders');

                setAllOrders(res?.data?.payload);

            } catch (error) {
                console.log(error);
            }
        };

        getAllOrders();

    }, []);

    // status update
    const handleStatusChange = async (id, status) => {

        try {

            setLoadingId(id);

            await api.put(`/orders/update-status/${id}`, {
                orderStatus: status
            });

            setAllOrders((prev) =>
                prev.map((item) =>
                    item._id === id
                        ? { ...item, orderStatus: status }
                        : item
                )
            );

        } catch (error) {
            console.log(error);
        } finally {
            setLoadingId("");
        }
    };

    // status color
    const getStatusColor = (status) => {

        switch(status){

            case 'pending':
                return 'bg-yellow-100 text-yellow-700 border-yellow-200';

            case 'confirmed':
                return 'bg-blue-100 text-blue-700 border-blue-200';

            case 'processing':
                return 'bg-purple-100 text-purple-700 border-purple-200';

            case 'shipped':
                return 'bg-indigo-100 text-indigo-700 border-indigo-200';

            case 'delivered':
                return 'bg-green-100 text-green-700 border-green-200';

            case 'cancelled':
                return 'bg-red-100 text-red-700 border-red-200';

            default:
                return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    return (

        <div className='p-3 md:p-5 bg-[#f6f9fc] min-h-screen'>

            {/* top section */}
            <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-7'>

                <div>

                    <h2 className='text-2xl md:text-3xl font-bold text-black/80'>
                        Orders Management
                    </h2>

                    <p className='text-sm text-black/50 mt-1'>
                        Manage and track all customer orders
                    </p>

                </div>

                {/* stats */}
                <div className='flex flex-wrap gap-3'>

                    <div className='bg-white px-5 py-4 rounded-2xl shadow-sm border min-w-[140px]'>

                        <p className='text-sm text-black/50'>
                            Total Orders
                        </p>

                        <h3 className='text-2xl font-bold mt-1'>
                            {allOrders?.length}
                        </h3>

                    </div>

                    <div className='bg-white px-5 py-4 rounded-2xl shadow-sm border min-w-[140px]'>

                        <p className='text-sm text-black/50'>
                            Delivered
                        </p>

                        <h3 className='text-2xl font-bold text-green-600 mt-1'>

                            {
                                allOrders?.filter(
                                    item => item?.orderStatus === 'delivered'
                                ).length
                            }

                        </h3>

                    </div>

                    <div className='bg-white px-5 py-4 rounded-2xl shadow-sm border min-w-[140px]'>

                        <p className='text-sm text-black/50'>
                            Pending
                        </p>

                        <h3 className='text-2xl font-bold text-yellow-600 mt-1'>

                            {
                                allOrders?.filter(
                                    item => item?.orderStatus === 'pending'
                                ).length
                            }

                        </h3>

                    </div>

                </div>

            </div>

            {/* mobile cards */}
            <div className='grid grid-cols-1 gap-5 lg:hidden'>

                {
                    allOrders?.map((order) => (

                        <div
                            key={order?._id}
                            className='bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden'
                        >

                            {/* header */}
                            <div className='p-4 border-b bg-gradient-to-r from-[#026EE2] to-[#0a84ff] text-white'>

                                <div className='flex items-start justify-between gap-3'>

                                    <div>

                                        <p className='text-lg font-bold'>
                                            {order?.orderId}
                                        </p>

                                        <p className='text-xs text-white/80 mt-1'>
                                            {
                                                new Date(order?.createdAt)
                                                .toLocaleDateString()
                                            }
                                        </p>

                                    </div>

                                    <span
                                        className={`
                                            text-xs
                                            px-3
                                            py-1
                                            rounded-full
                                            border
                                            capitalize
                                            backdrop-blur-md
                                            ${getStatusColor(order?.orderStatus)}
                                        `}
                                    >
                                        {order?.orderStatus}
                                    </span>

                                </div>

                            </div>

                            {/* body */}
                            <div className='p-4'>

                                {/* customer */}
                                <div className='mb-5'>

                                    <p className='text-xs text-black/50 uppercase tracking-wide'>
                                        Customer
                                    </p>

                                    <h3 className='font-semibold text-lg capitalize mt-1'>
                                        {order?.shippingAddress?.name}
                                    </h3>

                                    <p className='text-sm text-black/60 mt-1'>
                                        {order?.shippingAddress?.phone}
                                    </p>

                                </div>

                                {/* products */}
                                <div className='space-y-4'>

                                    {
                                        order?.products?.map((item) => (

                                            <div
                                                key={item?._id}
                                                className='flex gap-3 items-center'
                                            >

                                                <img
                                                    src={item?.image}
                                                    alt=""
                                                    className='w-16 h-16 rounded-2xl object-cover border'
                                                />

                                                <div className='flex-1'>

                                                    <p className='font-medium line-clamp-1'>
                                                        {item?.name}
                                                    </p>

                                                    <div className='flex items-center justify-between mt-2'>

                                                        <p className='text-sm text-black/50'>
                                                            Qty: {item?.quantity}
                                                        </p>

                                                        <p className='font-semibold'>

                                                            <span className='font-[Hind_Siliguri]'>
                                                                ৳
                                                            </span>

                                                            {item?.newPrice}

                                                        </p>

                                                    </div>

                                                </div>

                                            </div>
                                        ))
                                    }

                                </div>

                                {/* bottom */}
                                <div className='mt-6 pt-5 border-t'>

                                    <div className='flex items-center justify-between mb-4'>

                                        <div>

                                            <p className='text-xs text-black/50'>
                                                Payment
                                            </p>

                                            <span
                                                className={`
                                                    inline-block
                                                    mt-1
                                                    text-xs
                                                    px-3
                                                    py-1
                                                    rounded-full
                                                    capitalize
                                                    ${
                                                        order?.payment?.status === 'paid'
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-red-100 text-red-700'
                                                    }
                                                `}
                                            >
                                                {order?.payment?.status}
                                            </span>

                                        </div>

                                        <div className='text-right'>

                                            <p className='text-xs text-black/50'>
                                                Total
                                            </p>

                                            <h3 className='text-2xl font-bold'>

                                                <span className='font-[Hind_Siliguri]'>
                                                    ৳
                                                </span>

                                                {order?.pricing?.total}

                                            </h3>

                                        </div>

                                    </div>

                                    {/* update */}
                                    <select
                                        value={order?.orderStatus}
                                        onChange={(e) =>
                                            handleStatusChange(
                                                order?._id,
                                                e.target.value
                                            )
                                        }
                                        className='select select-bordered w-full rounded-xl'
                                    >

                                        <option value="pending">
                                            Pending
                                        </option>

                                        <option value="confirmed">
                                            Confirmed
                                        </option>

                                        <option value="processing">
                                            Processing
                                        </option>

                                        <option value="shipped">
                                            Shipped
                                        </option>

                                        <option value="delivered">
                                            Delivered
                                        </option>

                                        <option value="cancelled">
                                            Cancelled
                                        </option>

                                    </select>

                                    {
                                        loadingId === order?._id && (

                                            <p className='text-xs text-blue-600 mt-2'>
                                                Updating...
                                            </p>
                                        )
                                    }

                                </div>

                            </div>

                        </div>
                    ))
                }

            </div>

            {/* desktop table */}
            <div className='hidden lg:block bg-white rounded-3xl shadow-sm border overflow-hidden'>

                <div className='overflow-x-auto'>

                    <table className='table'>

                        <thead className='bg-[#f8fafc]'>

                            <tr className='text-black/70'>

                                <th>#</th>
                                <th>Order</th>
                                <th>Customer</th>
                                <th>Products</th>
                                <th>Total</th>
                                <th>Payment</th>
                                <th>Status</th>
                                <th>Update</th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                allOrders?.map((order, index) => (

                                    <tr
                                        key={order?._id}
                                        className='hover'
                                    >

                                        <td className='font-medium'>
                                            {index + 1}
                                        </td>

                                        {/* order */}
                                        <td>

                                            <h3 className='font-bold text-[#026EE2]'>
                                                {order?.orderId}
                                            </h3>

                                            <p className='text-xs text-black/50 mt-1'>
                                                {
                                                    new Date(order?.createdAt)
                                                    .toLocaleDateString()
                                                }
                                            </p>

                                        </td>

                                        {/* customer */}
                                        <td>

                                            <h3 className='font-semibold capitalize'>
                                                {order?.shippingAddress?.name}
                                            </h3>

                                            <p className='text-sm text-black/50 mt-1'>
                                                {order?.shippingAddress?.phone}
                                            </p>

                                        </td>

                                        {/* products */}
                                        <td className='min-w-[320px]'>

                                            <div className='space-y-4'>

                                                {
                                                    order?.products?.map((item) => (

                                                        <div
                                                            key={item?._id}
                                                            className='flex items-center gap-3'
                                                        >

                                                            <img
                                                                src={item?.image}
                                                                alt=""
                                                                className='w-14 h-14 rounded-2xl object-cover border'
                                                            />

                                                            <div className='flex-1'>

                                                                <p className='font-medium line-clamp-1'>
                                                                    {item?.name}
                                                                </p>

                                                                <div className='flex items-center justify-between mt-2'>

                                                                    <p className='text-sm text-black/50'>
                                                                        Qty: {item?.quantity}
                                                                    </p>

                                                                    <p className='font-semibold'>

                                                                        <span className='font-[Hind_Siliguri]'>
                                                                            ৳
                                                                        </span>

                                                                        {item?.newPrice}

                                                                    </p>

                                                                </div>

                                                            </div>

                                                        </div>
                                                    ))
                                                }

                                            </div>

                                        </td>

                                        {/* total */}
                                        <td>

                                            <h3 className='text-2xl font-bold whitespace-nowrap'>

                                                <span className='font-[Hind_Siliguri]'>
                                                    ৳
                                                </span>

                                                {order?.pricing?.total}

                                            </h3>

                                        </td>

                                        {/* payment */}
                                        <td>

                                            <span
                                                className={`
                                                    text-xs
                                                    px-3
                                                    py-1
                                                    rounded-full
                                                    capitalize
                                                    whitespace-nowrap
                                                    ${
                                                        order?.payment?.status === 'paid'
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-red-100 text-red-700'
                                                    }
                                                `}
                                            >
                                                {order?.payment?.status}
                                            </span>

                                        </td>

                                        {/* status */}
                                        <td>

                                            <span
                                                className={`
                                                    text-xs
                                                    px-3
                                                    py-1
                                                    rounded-full
                                                    border
                                                    capitalize
                                                    whitespace-nowrap
                                                    ${getStatusColor(order?.orderStatus)}
                                                `}
                                            >
                                                {order?.orderStatus}
                                            </span>

                                        </td>

                                        {/* update */}
                                        <td>

                                            <select
                                                value={order?.orderStatus}
                                                onChange={(e) =>
                                                    handleStatusChange(
                                                        order?._id,
                                                        e.target.value
                                                    )
                                                }
                                                className='select select-bordered rounded-xl w-[170px]'
                                            >

                                                <option value="pending">
                                                    Pending
                                                </option>

                                                <option value="confirmed">
                                                    Confirmed
                                                </option>

                                                <option value="processing">
                                                    Processing
                                                </option>

                                                <option value="shipped">
                                                    Shipped
                                                </option>

                                                <option value="delivered">
                                                    Delivered
                                                </option>

                                                <option value="cancelled">
                                                    Cancelled
                                                </option>

                                            </select>

                                            {
                                                loadingId === order?._id && (

                                                    <p className='text-xs text-blue-600 mt-2'>
                                                        Updating...
                                                    </p>
                                                )
                                            }

                                        </td>

                                    </tr>
                                ))
                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
};

export default OrdersPageAdmin;