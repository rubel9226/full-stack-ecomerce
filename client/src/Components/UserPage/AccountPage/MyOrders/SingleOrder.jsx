// SingleOrder.jsx
import React from 'react';

// icons
import { RxCross2 } from "react-icons/rx";
import { FaBoxOpen } from "react-icons/fa";

const SingleOrder = ({ order }) => {

    return (

        <div className=' bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden  hover:shadow-md duration-300'>

            
            <div className='p-4 sm:p-5 bg-linear-to-r from-[#1F5DA0] to-[#2BB673]'>
                <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3'>
                    <div className='space-y-2'>
                        <div>
                            <p className='text-[11px] sm:text-xs text-white/70 font-medium'>
                                Invoice No
                            </p>
                            <h3 className='text-sm sm:text-base font-bold text-white break-all'>
                                {order.orderId}
                            </h3>
                        </div>
                        <div className='flex flex-wrap items-center gap-2'>
                            <span className='text-[11px] sm:text-xs text-white/70'>
                                Payment :
                            </span>
                            <span className=' bg-white/20 text-white px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold capitalize'>
                                {order?.payment?.status}
                            </span>
                        </div>
                    </div>

                    {/* status */}
                    <div className=' bg-white text-[#1F5DA0] px-4 py-2 rounded-full text-xs sm:text-sm font-bold w-fit'>
                        {order.orderStatus}
                    </div>
                </div>
            </div>


            <div className='p-4 sm:p-5'>

                <div className='space-y-4'>
                    {
                        order.products.map((product) => (
                            <div key={product.product} className=' flex gap-3 sm:gap-4 items-center border border-gray-100 rounded-2xl p-3 hover:border-[#1F5DA0]/30 duration-200'>

                                
                                <div className='w-20 sm:w-24 md:w-28 shrink-0'>
                                    <img className=' w-full aspect-square rounded-2xl object-cover bg-gray-100 '
                                        src={product.image}
                                        alt={product.name}
                                    />
                                </div>


                                <div className='flex-1 min-w-0'>
                                    <div className='flex flex-col h-full justify-between'>
                                        <div>

                                            <h3 className=' text-sm sm:text-base font-bold text-black/80 line-clamp-2 ' >
                                                {product.name}
                                            </h3>

                                            
                                            <p className=' text-[11px] sm:text-sm text-black/45 mt-1 line-clamp-2 ' >
                                                {product.description}
                                            </p>
                                        </div>


                                        <div className=' flex flex-wrap items-center justify-between gap-2 mt-3 ' >
                                            <div
                                                className=' flex items-center gap-1 text-xs sm:text-sm text-black/70 ' >

                                                <span>
                                                    {product.quantity}
                                                </span>

                                                <RxCross2 />

                                                <span className='font-bold text-black'>
                                                    ৳ {product.newPrice}
                                                </span>

                                            </div>

                                            <div
                                                className='
                                                    bg-red-50
                                                    text-red-500
                                                    px-3
                                                    py-1
                                                    rounded-full
                                                    text-[11px]
                                                    sm:text-xs
                                                    font-semibold
                                                '
                                            >
                                                ৳ {product.quantity * product.newPrice}
                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>
                        ))
                    }

                </div>

                {/* footer */}
                <div
                    className='
                        mt-6
                        pt-5
                        border-t
                        border-gray-200
                        flex
                        flex-col
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                        gap-4
                    '
                >

                    {/* item */}
                    <div className='flex items-center gap-3'>

                        <div
                            className='
                                w-12
                                h-12
                                rounded-2xl
                                bg-[#1F5DA0]/10
                                flex
                                justify-center
                                items-center
                            '
                        >

                            <FaBoxOpen className='text-[#1F5DA0] text-lg' />

                        </div>

                        <div>

                            <p className='text-[11px] sm:text-xs text-black/45'>
                                Total Items
                            </p>

                            <h3 className='text-lg font-bold text-black/80'>
                                {order.products.length}
                            </h3>

                        </div>

                    </div>

                    {/* total */}
                    <div className='sm:text-right'>

                        <p className='text-[11px] sm:text-xs text-black/45'>
                            Total Amount
                        </p>

                        <h2
                            className='
                                text-lg
                                sm:text-xl
                                md:text-2xl
                                font-extrabold
                                text-[#1F5DA0]
                            '
                        >
                            ৳ {order.pricing.total}
                        </h2>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default SingleOrder;