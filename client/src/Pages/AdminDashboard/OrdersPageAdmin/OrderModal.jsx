import React from 'react';
import { IoIosPerson } from 'react-icons/io';

const OrderModal = ({selectedOrder, getStatusColor, setSelectedOrder}) => {

    console.log(selectedOrder);
    return (
        <div className='fixed inset-0 z-[500] bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 md:p-5 animate-fadeIn'>
            <div className='bg-[#f8fafc] w-full max-w-4xl rounded-xl sm:rounded-[30px] shadow-2xl max-h-[95vh] overflow-y-auto border border-white/40'>

                {/* header */}
                <div className='sticky top-0 z-20  backdrop-blur-md border-b border-black/15 bg-indigo-100/90 px-5 sm:px-7 py-3 rounded-t-xl sm:rounded-t-[30px]'>
                    <div className='flex items-start justify-between gap-4'>
                        <div>
                            <div className='flex items-center gap-3 flex-wrp'>
                                <h2 className='text-base md:text-lg lg:text-xl font-black text-black/90'>
                                    Order Details
                                </h2>
                                <span className={`
                                    text-[10px] md:text-sm px-3 md:px-4 py-1 md:py-1.5 rounded-full border capitalize font-semibold
                                    ${getStatusColor(selectedOrder?.orderStatus)}
                                `}>
                                    {selectedOrder?.orderStatus}
                                </span>
                            </div>
                            <div className='flex flex-col sm:flex-wrap sm:items-center gap-1 sm:gap-3 mt-1 sm:mt-3 text-[10px] text-black/55'>
                                <p>
                                    Order ID :
                                    <span className='font-semibold text-black ml-1'>
                                        {selectedOrder?.orderId}
                                    </span>
                                </p>
                                <span className='hidden sm:block'>•</span>

                                <p>
                                    {
                                        new Date(
                                            selectedOrder?.createdAt
                                        ).toLocaleString()
                                    }
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setSelectedOrder(null)}
                            className='btn sm:h-11 sm:min-h-11 h-7.5 rounded-full text-xs sm:text-sm bg-red-500 hover:bg-red-600 border-none text-white sm:px-5 px-3'
                        >
                            ✕ Close
                        </button>
                    </div>
                </div>


                {/* body */}
                <div className='p-2 sm:p-4 md:p-7 space-y-3 sm:space-y-6'>
                    {/* top cards */}
                    <div className='grid lg:grid-cols-2 gap-2.5 sm:gap-5'>
                        {/* customer */}
                        <div className='bg-white rounded-xl sm:rounded-2xl p-2.5 sm:p-5 border border-black/5 shadow-sm'>
                            <div className='flex items-center gap-3 mb-5'>
                                <div className='sm:w-12 sm:h-12 w-8 h-8 sm:rounded-2xl rounded-md bg-[#1F5DA0]/10 flex items-center justify-center text-xl sm:text-2xl' >
                                    <IoIosPerson />
                                </div> 
                                <div>
                                    <h3 className='text-base sm:text-xl font-bold'>
                                        Customer Info
                                    </h3>

                                    <p className='text-xs sm:text-sm text-black/45'>
                                        Customer personal information
                                    </p>
                                </div>
                            </div>

                            <div className='space-y-2 sm:space-y-4'>

                                <div className='bg-black/10 rounded-md sm:rounded-xl md:rounded-2xl p-3 sm:p-4'>
                                    <p className='text-xs text-black/60 uppercase'>
                                        Full Name:
                                    </p>

                                    <h4 className='font-semibold text-md sm:text-base md:text-lg mt-1 capitalize'>
                                        {selectedOrder?.shippingAddress?.name}
                                    </h4>
                                </div>

                                <div className='grid sm:grid-cols-2 gap-4'>

                                    <div className='bg-black/10 rounded-md sm:rounded-xl md:rounded-2xl p-3 sm:p-4'>
                                        <p className='text-xs text-black/60 uppercase'>
                                            Phone
                                        </p>

                                        <h4 className='font-medium text-md sm:text-base md:text-lg mt-1 capitalize'>
                                            {selectedOrder?.shippingAddress?.phone}
                                        </h4>
                                    </div>

                                    <div className='bg-black/10 rounded-md sm:rounded-xl md:rounded-2xl p-3 sm:p-4'>
                                        <p className='text-xs text-black/60 uppercase'>
                                            Payment
                                        </p>

                                        <h4 className='font-medium text-md sm:text-base md:text-lg mt-1 capitalize'>
                                            {selectedOrder?.payment?.method}
                                        </h4>
                                    </div>
                                </div>

                                <div className='bg-black/10 rounded-md sm:rounded-xl md:rounded-2xl p-3 sm:p-4'>
                                    <p className='text-xs text-black/60 uppercase'>
                                        Email Address
                                    </p>

                                    <h4 className='font-medium mt-1'>
                                        {selectedOrder?.shippingAddress?.email}
                                    </h4>
                                </div>
                            </div>
                        </div>



                        {/* address */}
                        <div className='bg-white rounded-3xl p-5 border border-black/5 shadow-sm'>

                            <div className='flex items-center gap-3 mb-5'>

                                <div className='sm:w-12 sm:h-12 w-8 h-8 sm:rounded-2xl rounded-md bg-green-500/10  flex items-center justify-center text-xl sm:text-2xl'>
                                    🚚
                                </div>

                                <div>
                                    <h3 className='text-base sm:text-xl font-bold'>
                                        Shipping Address
                                    </h3>

                                    <p className='text-xs sm:text-sm text-black/45'>
                                        Delivery information
                                    </p>
                                </div>
                            </div>

                            <div className='space-y-4'>

                                <div className='leading-8 text-[15px] bg-black/10 rounded-md sm:rounded-xl md:rounded-2xl p-3 sm:p-4'>

                                    <p className='capitalize'>
                                        {selectedOrder?.shippingAddress?.address}
                                    </p>

                                    <p>
                                        {selectedOrder?.shippingAddress?.district}
                                    </p>

                                    <p className='capitalize'>
                                        {selectedOrder?.shippingAddress?.country}
                                    </p>

                                    <p>
                                        Post Code :
                                        <span className='font-semibold ml-1'>
                                            {selectedOrder?.shippingAddress?.postCode}
                                        </span>
                                    </p>
                                </div>

                                <div className='flex items-center justify-between gap-3'>

                                    <div className='bg-purple-700/4 rounded-2xl p-4 flex-1'>
                                        <p className='text-xs text-black/80 uppercase'>
                                            Payment Status
                                        </p>

                                        <div className='mt-2'>
                                            {
                                                selectedOrder?.payment?.status === 'paid'
                                                    ? (
                                                        <span className='bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold'>
                                                            🟢 Paid
                                                        </span>
                                                    )
                                                    : (
                                                        <span className='bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold'>
                                                            🔴 Unpaid
                                                        </span>
                                                    )
                                            }
                                        </div>
                                    </div>

                                    <div className='bg-[#1F5DA0] text-white rounded-2xl p-2 md:p-2 min-w-[130px] text-center'>
                                        <p className='text-sm text-white/70'>
                                            Total
                                        </p>

                                        <h3 className='text-2xl sm:text-2xl md:text-3xl font-bold sm:font-black mt-1'>
                                            ৳{selectedOrder?.pricing?.total}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                    {/* products */}
<div className='bg-white rounded-3xl p-5 md:p-6 border border-black/5 shadow-sm'>

    <div className='flex items-center justify-between flex-wrap gap-3 mb-6'>

        <div>
            <h3 className='text-base sm:text-xl font-bold'>
                Ordered Products
            </h3>

            <p className='text-xs sm:text-sm text-black/45 mt-1'>
                Total {selectedOrder?.products?.length} items ordered
            </p>
        </div>

        <div className='bg-black text-white px-4 sm:py-2 py-1.5 rounded-2xl text-xs sm:text-sm font-semibold'>
            {selectedOrder?.products?.length} Products
        </div>
    </div>

    <div className='space-y-3 sm:space-y-4'>

        {
            selectedOrder?.products?.map((item) => (

                <div
                    key={item?._id}
                    className='border border-black/10 rounded-2xl p-3 sm:p-4 hover:shadow-md duration-300 bg-black/[0.02]'
                >

                    <div className='flex flex-col sm:flex-row gap-4'>

                        {/* Product Image */}
                        <div className='w-full sm:w-28 shrink-0'>
                            <img
                                src={item?.image}
                                alt=""
                                className='w-full aspect-[1.5] sm:h-28 rounded-xl sm:rounded-2xl object-cover border bg-gray-50'
                            />
                        </div>

                        {/* Product Info */}
                        <div className='flex-1 flex flex-col justify-between min-w-0'>

                            <div className='flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4'>

                                {/* Left */}
                                <div className='min-w-0'>

                                    <h3 className='text-base sm:text-lg capitalize font-bold text-black/90 line-clamp-2'>
                                        {item?.name}
                                    </h3>

                                    {
                                        item?.description && (
                                            <p className='text-sm text-black/45 mt-1 line-clamp-2'>
                                                {item?.description}
                                            </p>
                                        )
                                    }

                                    {/* Color & Size */}
                                    <div className='flex flex-wrap items-center gap-2 mt-3'>

                                        {
                                            item?.color && (
                                                <span
                                                    className='
                                                        px-3
                                                        py-1
                                                        rounded-full
                                                        bg-black/5
                                                        text-[11px]
                                                        sm:text-xs
                                                        font-medium
                                                        text-black/70
                                                        border
                                                    '
                                                >
                                                    Color : {item?.color}
                                                </span>
                                            )
                                        }

                                        {
                                            item?.size && (
                                                <span
                                                    className='
                                                        px-3
                                                        py-1
                                                        rounded-full
                                                        bg-black/5
                                                        text-[11px]
                                                        sm:text-xs
                                                        font-medium
                                                        text-black/70
                                                        border
                                                    '
                                                >
                                                    Size : {item?.size.toUpperCase()}
                                                </span>
                                            )
                                        }

                                    </div>
                                </div>

                                {/* Right */}
                                <div className='bg-white border border-black/5 rounded-xl px-3 py-2 min-w-[180px]'>

                                    <div className='flex items-center justify-between gap-3'>
                                        <p className='text-sm text-black/45'>
                                            Unit Price
                                        </p>

                                        <h3 className='text-base sm:text-lg font-bold text-black/90'>
                                            ৳{item?.newPrice}
                                        </h3>
                                    </div>

                                    <div className='flex items-center justify-between gap-3 mt-1'>
                                        <p className='text-sm text-black/45'>
                                            Quantity
                                        </p>

                                        <h3 className='text-base sm:text-lg font-bold text-black/90'>
                                            {item?.quantity}
                                        </h3>
                                    </div>

                                    <div className='flex items-center justify-between gap-3 mt-2 pt-2 border-t border-dashed'>

                                        <p className='text-sm font-medium text-black/60'>
                                            Total
                                        </p>

                                        <h3 className='text-lg sm:text-xl font-extrabold text-black'>
                                            ৳{item?.newPrice * item?.quantity}
                                        </h3>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            ))
        }

    </div>
</div>



                    {/* payment summary */}
                    <div className='bg-white rounded-3xl p-5 md:p-6 border border-black/5 shadow-sm'>

                        <div className='flex items-center gap-3 mb-6'>

                            <div className='w-12 h-12 rounded-2xl bg-yellow-500/10 flex items-center justify-center text-2xl'>
                                💳
                            </div>

                            <div>
                                <h3 className='text-base sm:text-xl font-bold'>
                                    Payment Summary
                                </h3>

                                <p className='text-xs sm:text-sm text-black/45'>
                                    Order payment calculation
                                </p>
                            </div>
                        </div>

                        <div className='space-y-2 sm:space-x-4'>
                            <div className='flex items-center justify-between bg-[#f8fafc] rounded-lg sm:rounded-xl px-5 py-4'>
                                <span className='text-sm sm:text-base text-black/65 font-medium whitespace-nowrap'>
                                    Subtotal
                                </span>

                                <span className='text-sm  sm:text-lg font-bold'>
                                    ৳ {selectedOrder?.pricing?.subtotal}
                                </span>
                            </div>

                            <div className='flex items-center justify-between bg-[#f8fafc] rounded-lg sm:rounded-xl px-5 py-4'>
                                <span className='text-sm sm:text-base text-black/65 font-medium whitespace-nowrap'>
                                    Shipping Fee
                                </span>

                                <span className='text-sm  sm:text-lg font-bold'>
                                    ৳ {selectedOrder?.pricing?.shippingFee}
                                </span>
                            </div>

                            <div className='flex items-center justify-between bg-[#f8fafc] rounded-lg sm:rounded-xl px-5 py-4'>
                                <span className='text-sm sm:text-base text-black/65 font-medium whitespace-nowrap'>
                                    Discount
                                </span>

                                <span className='text-sm sm:text-lg font-bold text-red-500'>
                                    - ৳ {selectedOrder?.pricing?.discount}
                                </span>
                            </div>
                            

                            <div className='flex items-center justify-between bg-[#f8fafc] rounded-lg sm:rounded-xl px-5 py-4'>
                                <span className='text-sm sm:text-base text-black/65 font-medium whitespace-nowrap'>
                                    Payment Method
                                </span>

                                <span className='text-sm sm:text-lg font-bold'>
                                    {selectedOrder?.payment?.method}
                                </span>
                            </div>

                            <div className='bg-linear-to-r from-[#1F5DA0] to-[#2BB673] rounded-3xl px-6 py-5 text-white flex flex-col gap-4'>

                                <div className='text-center'>
                                    <p className='text-white/70 text-base sm:text-base'>
                                        Grand Total
                                    </p>

                                    <h2 className='text-3xl sm:text-4xl font-black mt-1'>
                                        ৳ {selectedOrder?.pricing?.total}
                                    </h2>
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderModal;