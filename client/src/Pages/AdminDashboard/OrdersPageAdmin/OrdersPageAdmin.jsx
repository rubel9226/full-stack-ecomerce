import React, { useEffect, useState } from 'react';
import api from '../../../API/Axios/api';
import Pagination from '../../CategoryPage/CategoryPagination/Pagination';
import { toast } from 'react-toastify';
import LoadingOrder from '../../../Components/Loading/LoadingOrder';
import Footer from '../../../Components/AdminPage/Seared/Footer/Footer';

const OrdersPageAdmin = () => {
    const [loading, setLoading] = useState(false);
    const [allOrders, setAllOrders] = useState([]);
    const [loadingId, setLoadingId] = useState("");
    const [status, setStatus] = useState("all");
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState({});
    const [orderStatusLength, setOrderStatusLength] = useState({});

    console.log(orderStatusLength);

    useEffect(() => {

        const getAllOrders = async () => { 
            try { 
                setLoading(true);
                const res = await api.get(
                    `/orders?status=${status}&page=${page}`
                ); 
                setAllOrders(res?.data?.payload?.orders); 
                setPagination(
                    res?.data?.payload?.pagination
                ); 
                setOrderStatusLength(
                    res?.data?.payload?.status
                ); 
            } catch (error) {
                console.log(error?.response?.data?.message);
            } finally {
                setLoading(false);
            }
        };

        getAllOrders();

    }, [status, page]);

    // delete order 
    const handleDelete =async (id) => {
        if(confirm('Are you sure, delete this order.')){
            try {
                await api.put(`/orders/delete/${id}`);

                setAllOrders((prev) => prev.filter((item) => item._id !== id ))
            } catch (error) {
                console.log(error?.response?.data?.message);
            }
        }
    }

    // status update
    const handleStatusChange = async (order, status) => { 
        try { 
            setLoadingId(order._id); 
            await api.put(`/orders/update-status/${order._id}`, {status});

            toast.success('Order status update successfully.')

            setAllOrders((prev) =>
                prev.map((item) =>
                    item._id === order._id
                        ? { ...item, orderStatus: status }
                        : item
                )
            );
            

            const previousStatus = order.orderStatus;
            // status length update
            setOrderStatusLength((prev) => ({
                ...prev,
                [previousStatus]:
                    prev[previousStatus] > 0
                        ? prev[previousStatus] - 1
                        : 0,

                [status]: (prev[status] || 0) + 1,
            }));

        } catch (error) {
            console.log(error?.response?.data?.message);
        } finally {
            setLoadingId("");
        }
    };


    const statusOptions = {
        pending: ["confirmed", "cancelled"],

        confirmed: ["processing", "cancelled"],

        processing: ["shipped"],

        shipped: ["delivered"],

        delivered: [],

        cancelled: [],
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
        <div>
            <div className='p-3 md:p-5 min-h-[60vh]'>
                

                <div className='flex text-sm gap-1 mb-3 flex-wrap'>
                    <button
                        onClick={() => {setStatus('all')}}
                        className={`text-xs px-3 py-1 rounded-full border capitalize transition-all
                        ${
                            status === 'all'
                                ? "bg-[#026EE2] text-white border-[#026EE2]"
                                : "bg-white"
                        }`}>
                        All 
                    </button>
                    <button
                        onClick={() => {setStatus('pending')}}
                        className={`text-xs px-3 py-1 rounded-full border capitalize transition-all
                        ${
                            status === 'pending'
                                ? "bg-[#026EE2] text-white border-[#026EE2]"
                                : "bg-white"
                        }`}>
                        pending {orderStatusLength.pending}
                    </button>
                    <button
                        onClick={() => {setStatus('confirmed')}}
                        className={`text-xs px-3 py-1 rounded-full border capitalize transition-all
                        ${
                            status === 'confirmed'
                                ? "bg-[#026EE2] text-white border-[#026EE2]"
                                : "bg-white"
                        }`}>
                        confirmed {orderStatusLength.confirmed}
                    </button>
                    <button
                        onClick={() => {setStatus('processing')}}
                        className={`text-xs px-3 py-1 rounded-full border capitalize transition-all
                        ${
                            status === 'processing'
                                ? "bg-[#026EE2] text-white border-[#026EE2]"
                                : "bg-white"
                        }`}>
                        processing {orderStatusLength.processing}
                    </button>
                    <button
                        onClick={() => {setStatus('shipped')}}
                        className={`text-xs px-3 py-1 rounded-full border capitalize transition-all
                        ${
                            status === 'shipped'
                                ? "bg-[#026EE2] text-white border-[#026EE2]"
                                : "bg-white"
                        }`}>
                        shipped {orderStatusLength.shipped}
                    </button>
                    <button
                        onClick={() => {setStatus('delivered')}}
                        className={`text-xs px-3 py-1 rounded-full border capitalize transition-all
                        ${
                            status === 'delivered'
                                ? "bg-[#026EE2] text-white border-[#026EE2]"
                                : "bg-white"
                        }`}>
                        delivered {orderStatusLength.delivered}
                    </button>
                    <button
                        onClick={() => {setStatus('cancelled')}}
                        className={`text-xs px-3 py-1 rounded-full border capitalize transition-all
                        ${
                            status === 'cancelled'
                                ? "bg-[#026EE2] text-white border-[#026EE2]"
                                : "bg-white"
                        }`}>
                        cancelled
                    </button>

                </div>

                {
                    loading? <LoadingOrder /> 
                    :
                    allOrders.length === 0 ? <div className='min-h-[40vh] flex flex-col justify-center items-center text-[16px] text-center px-4'>
                        <h3 className='text-xl font-semibold text-black/60 mb-2'>
                            No Orders Found
                        </h3>

                        <p className='text-gray-500'>
                            There are currently no orders available.
                        </p>
                    </div>
                    :
                    <div className='columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-5 space-y-5 sm:space-y-8 lg:gap-8'>
                        {  
                            allOrders?.map((order) => {
                                console.log(order);
                                return(      
                                    <div key={order?._id} className='bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden' >
                                        {/* header */}
                                        <div className='p-4 border-b bg-linear-to-r from-[#1F5DA0] to-[#2BB673] text-white'>
                                            <div className='flex items-start justify-between gap-3'>
                                                <div>
                                                    <p className='text-lg font-bold'> {order?.orderId} </p>
                                                    <p className='text-xs text-white/80 mt-1'> { new Date(order?.createdAt) .toLocaleDateString() } </p>
                                                </div>
                                                <span className={` text-xs px-3 py-1 rounded-full border capitalize backdrop-blur-md ${getStatusColor(order?.orderStatus)} `} >
                                                    {order?.orderStatus}
                                                </span>
                                            </div>
                                        </div>

                                        {/* body */}
                                        <div className='p-4'> 
                                            {/* customer */}
                                            <div className='mb-5'> 
                                                <p className='text-xs text-black/50 uppercase tracking-wide'> Customer</p> 
                                                <h3 className='font-semibold text-lg capitalize mt-1'> {order?.shippingAddress?.name} </h3> 
                                                <p className='text-sm text-black/60 mt-1'> {order?.shippingAddress?.phone} </p> 
                                            </div> 
                                            {/* products */}
                                            <div className='space-y-4'> 
                                                {order?.products?.map((item) => ( 
                                                    <div key={item?._id} className='flex gap-3 items-center' > 
                                                        <img src={item?.image} alt="" className='w-16 h-16 rounded-2xl object-cover border' /> 
                                                        <div className='flex-1'> 
                                                            <p className='font-medium line-clamp-1'> {item?.name} </p> 
                                                            <div className='flex items-center justify-between mt-2'> 
                                                                <p className='text-sm text-black/50'> Qty: {item?.quantity} </p> 
                                                                <p className='font-semibold'><span className='font-[Hind_Siliguri]'> ৳ </span>{item?.newPrice}</p> 
                                                            </div> 
                                                        </div> 
                                                    </div>
                                                ))}
                                            </div> 

                                            {/* bottom */}
                                            <div className='mt-6 pt-5 border-t'> 
                                                <div className='flex items-center justify-between mb-4'> 
                                                    <div> 
                                                        <p className='text-xs text-black/50'> Payment </p> 
                                                        <span className={` inline-block mt-1 text-xs px-3 py-1 rounded-full capitalize
                                                            ${order?.payment?.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700' }`}
                                                        >
                                                            {order?.payment?.status}
                                                        </span> 
                                                    </div> 
                                                    <div className='text-right'> 
                                                        <p className='text-xs text-black/50'> Total </p> 
                                                        <h3 className='text-2xl font-bold'> 
                                                            <span className='font-[Hind_Siliguri]'> ৳ </span>
                                                            {order?.pricing?.total}
                                                        </h3>
                                                    </div>
                                                </div>

                                                {/* update */}
                                                {order?.orderStatus === 'initiated' 
                                                    ? <button onClick={() => handleDelete(order?._id)} className='btn w-full bg-red-600 font-bold text-white'>Delete</button> 
                                                    :<select
                                                        value={order?.orderStatus}
                                                        onChange={(e) =>handleStatusChange(order, e.target.value)}
                                                        className='select select-bordered w-full rounded-xl' 
                                                    >
                                                        <option className='bg-black/5' value={order?.orderStatus}>
                                                            {order?.orderStatus}
                                                        </option>

                                                        
                                                        {
                                                            statusOptions[order?.orderStatus]?.map(
                                                                (status) => (
                                                                    <option 
                                                                        className=''
                                                                        key={status}
                                                                        value={status}
                                                                    >
                                                                        {status}
                                                                    </option>
                                                                )
                                                            )
                                                        }
                                                        {/* <option value="pending"> Pending </option>
                                                        <option value="confirmed"> Confirmed </option>
                                                        <option value="processing"> Processing </option>
                                                        <option value="shipped"> Shipped </option>
                                                        <option value="delivered"> Delivered </option>
                                                        <option value="cancelled"> Cancelled </option> */}
                                                    </select>
                                                }
                                                

                                                {loadingId === order?._id && (
                                                <p className='text-xs text-blue-600 mt-2'>
                                                    Updating...
                                                </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                            )})
                        }
                    </div>
                }

                <div className=''>
                    {
                        !loading && allOrders.length > 0 && (
                            <Pagination
                                pagination={pagination}
                                onPageChange={(newPage) => setPage(newPage)}
                            />
                        )
                    }
                </div>
            </div>

            <Footer />
        </div>

    );
};

export default OrdersPageAdmin;