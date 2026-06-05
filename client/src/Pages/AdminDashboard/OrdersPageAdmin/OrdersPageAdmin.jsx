import React, { useEffect, useState } from 'react';
import api from '../../../API/Axios/api';
import Pagination from '../../CategoryPage/CategoryPagination/Pagination';
import { toast } from 'react-toastify';
import LoadingOrder from '../../../Components/Loading/LoadingOrder';
import Footer from '../../../Components/AdminPage/Seared/Footer/Footer';
import OrderModal from './OrderModal';

const OrdersPageAdmin = () => {

    const [loading, setLoading] = useState(false);
    const [allOrders, setAllOrders] = useState([]);
    const [loadingId, setLoadingId] = useState("");
    const [status, setStatus] = useState("all");
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [pagination, setPagination] = useState({});
    const [orderStatusLength, setOrderStatusLength] = useState({});

    // modal
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        const getAllOrders = async () => {
            try {
                setLoading(true);
                const res = await api.get(
                    `/orders?status=${status}&page=${page}&search=${search}`
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
    }, [status, page, search]);



    // delete order
    const handleDelete = async (id) => {
        if (confirm('Are you sure, delete this order.')) {
            try {
                await api.put(`/orders/delete/${id}`);
                setAllOrders((prev) =>
                    prev.filter((item) => item._id !== id)
                );
                toast.success('Order deleted successfully.');
            } catch (error) {
                console.log(error?.response?.data?.message);
            }
        }
    };



    // status update
    const handleStatusChange = async (order, status) => {
        try {
            setLoadingId(order._id);
            await api.put(
                `/orders/update-status/${order._id}`,
                { status }
            );

            toast.success('Order status updated successfully.');
            setAllOrders((prev) =>
                prev.map((item) =>
                    item._id === order._id
                        ? { ...item, orderStatus: status }
                        : item
                )
            );

            const previousStatus = order.orderStatus;
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
        switch (status) {
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

                {/* top */}
                <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-5'>

                    {/* search */}
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                        placeholder='Search by order id, customer, phone...'
                        className='input input-bordered rounded-2xl w-full lg:w-96'
                    />

                    {/* status buttons */}
                    <div className='flex text-sm gap-2 flex-wrap'>
                        {
                            [
                                'all',
                                'pending',
                                'confirmed',
                                'processing',
                                'shipped',
                                'delivered',
                                'cancelled'
                            ].map((item) => (

                                <button
                                    key={item}
                                    onClick={() => {
                                        setStatus(item);
                                        setPage(1);
                                    }}
                                    className={`
                                        border
                                        px-5
                                        py-1.5
                                        text-[12px]
                                        font-medium
                                        rounded-full
                                        whitespace-nowrap
                                        duration-200
                                        cursor-pointer
                                        hover:-translate-y-px
                                        active:translate-y-px

                                        ${status === item
                                            ? "bg-[#026EE2] text-white border-[#026EE2]"
                                            : "bg-white hover:bg-[#026ee2]/10"}
                                    `}
                                >
                                    {item}

                                    {
                                        item !== 'all' &&
                                        ` ${orderStatusLength[item] || 0}`
                                    }
                                </button>
                            ))
                        }

                    </div>
                </div>



                {
                    loading

                        ? <LoadingOrder />

                        : allOrders.length === 0

                            ? (
                                <div className='min-h-[40vh] flex flex-col justify-center items-center text-center'>

                                    <h3 className='text-2xl font-bold text-black/60'>
                                        No Orders Found
                                    </h3>

                                    <p className='text-black/40 mt-2'>
                                        There are currently no orders available.
                                    </p>
                                </div>
                            )

                            : (
                                <div className='columns-1 sm:columns-2 xl:columns-3 2xl:columns-4 gap-5 space-y-5'>

                                    {
                                        allOrders?.map((order) => (

                                            <div
                                                key={order?._id}
                                                className='bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden break-inside-avoid'
                                            >

                                                {/* header */}
                                                <div className='p-4 bg-linear-to-r from-[#1F5DA0] to-[#2BB673] text-white'>
                                                    <div className='flex items-start justify-between gap-3'>
                                                        <div>
                                                            <p className='text-lg font-bold'>
                                                                {order?.orderId}
                                                            </p>
                                                            <p className='text-xs text-white/80 mt-1'>
                                                                {
                                                                    new Date(
                                                                        order?.createdAt
                                                                    ).toLocaleString()
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
                                                    <div>

                                                        <p className='text-xs text-black/50 uppercase tracking-wide'>
                                                            Customer
                                                        </p>

                                                        <h3 className='font-semibold text-lg capitalize mt-1'>
                                                            {order?.shippingAddress?.name}
                                                        </h3>

                                                        <p className='text-sm text-black/60 mt-1'>
                                                            0{order?.shippingAddress?.phone}
                                                        </p>
                                                    </div>



                                                    {/* products */}
                                                    <div className='mt-5 space-y-4'>

                                                        {
                                                            order?.products?.slice(0, 2).map((item) => (

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
                                                                                ৳ {item?.newPrice}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>



                                                    {/* payment */}
                                                    <div className='mt-6 flex items-center justify-between'>

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

                                                                    ${order?.payment?.status === 'paid'
                                                                        ? 'bg-green-100 text-green-700'
                                                                        : 'bg-red-100 text-red-700'}
                                                                `}
                                                            >
                                                                {
                                                                    order?.payment?.status === 'paid'
                                                                        ? '🟢 Paid'
                                                                        : '🔴 Unpaid'
                                                                }
                                                            </span>
                                                        </div>

                                                        <div className='text-right'>

                                                            <p className='text-xs text-black/50'>
                                                                Total
                                                            </p>

                                                            <h3 className='text-3xl font-bold'>
                                                                ৳ {order?.pricing?.total}
                                                            </h3>
                                                        </div>
                                                    </div>



                                                    {/* actions */}
                                                    <div className='mt-6 space-y-3'>

                                                        {/* details button */}
                                                        <button
                                                            onClick={() => setSelectedOrder(order)}
                                                            className='btn w-full rounded-2xl bg-black text-white hover:bg-black/90 border-none'
                                                        >
                                                            View Details
                                                        </button>

                                                        {
                                                            order?.orderStatus === 'initiated'

                                                                ? (
                                                                    <button
                                                                        onClick={() => handleDelete(order?._id)}
                                                                        className='btn w-full bg-red-600 hover:bg-red-700 text-white rounded-2xl border-none'
                                                                    >
                                                                        Delete Order
                                                                    </button>
                                                                )

                                                                : (
                                                                    <select
                                                                        disabled={loadingId === order?._id}
                                                                        value={order?.orderStatus}
                                                                        onChange={(e) =>
                                                                            handleStatusChange(
                                                                                order,
                                                                                e.target.value
                                                                            )
                                                                        }
                                                                        className={`
                                                                            select
                                                                            select-bordered
                                                                            w-full
                                                                            rounded-2xl
                                                                            capitalize
                                                                            ${getStatusColor(order?.orderStatus)}
                                                                        `}
                                                                    >

                                                                        <option value={order?.orderStatus}>
                                                                            {order?.orderStatus}
                                                                        </option>

                                                                        {
                                                                            statusOptions[
                                                                                order?.orderStatus
                                                                            ]?.map((status) => (

                                                                                <option
                                                                                    key={status}
                                                                                    value={status}
                                                                                >
                                                                                    {status}
                                                                                </option>
                                                                            ))
                                                                        }
                                                                    </select>
                                                                )
                                                        }

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
                            )
                }



                {/* pagination */}
                {
                    !loading && allOrders.length > 0 && (

                        <Pagination
                            pagination={pagination}
                            onPageChange={(newPage) => setPage(newPage)}
                        />
                    )
                }
            </div>

            {/* MODAL */}
            {
                selectedOrder && (
                    <OrderModal setSelectedOrder={setSelectedOrder} selectedOrder={selectedOrder} getStatusColor={getStatusColor}  />
                )
            } 
            
            <Footer />
        </div>
    );
};

export default OrdersPageAdmin;