import React from 'react';

// icons
import { RxCross2 } from "react-icons/rx";



const SingleOrder = ({order}) => {
    // console.log(order)
    return (
        <div className='bg-white mt-3 rounded-sm p-4'>

            <div className='flex items-center'>
                <div className='flex-4 text-[12px] font-medium'>
                    <div className='flex gap-1'>
                        <p>Invoice No: </p>
                        <span className='text-blue-800'>{order.orderId}</span>
                    </div>

                    <div className='flex gap-1'>
                        <p>Order Date: </p>
                        <span>17rd April 2026, 7:30</span>
                    </div>
                    
                    <div className='flex gap-1 text-sm font-normal mt-1'>
                        <p>Payment Status: </p>
                        <span className='font-medium'>{order?.payment?.status}</span>
                    </div>
                </div>

                <div className='flex-2 text-end text-[12px] text-blue-800 font-medium'>
                    <p className='border cursor-pointer inline px-2 py-1 rounded-sm border-blue-800'>See Details</p>
                </div>
            </div>

            {/* <div className='divider h-0 m-0 mt-4 mb-3' /> */}

            <div>
                {
                    order.products.map(product => {
                        // console.log(order.pricing, 'pricing');
                        console.log(product, 'product')
                        return (
                            <div key={product.product} className='flex gap-1 mt-4 pt-3 border-t border-black/20'>
                                <div className='flex-1 '>
                                    <img className='w-full aspect-square' src={product.image} alt={product.name} />
                                </div>

                                <div className='flex-3 space-y-1'>
                                    <p className='font-semibold'>{product.name}</p>
                                    
                                    <div className='text-sm text-black/50 line-clamp-2'>
                                        <p>{product.description}</p>
                                    </div>

                                    <div className='flex items-center gap-1 text-black/80'>
                                        {product.quantity}
                                        <RxCross2 />

                                        <span className='font-semibold text-black'>
                                            ৳ {product.newPrice}
                                        </span>
                                    </div>
                                    <div className=' bg-[#2BB673] inline px-4 py-1 rounded-md font-medium text-white '>{order.orderStatus}</div>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
            <div className='border-t mt-4 border-black/20 py-5 text-[18px] font-medium flex justify-between items-center'>
                <div className='flex gap-1'>
                    <p className='text-black/40'>Item: </p>

                    <div>
                        {
                            order.products.length
                        }
                    </div>
                </div>

                <div className='flex gap-1'>
                    <p>Total: </p>
                    <span className='flex gap-1 items-center text-[#1F5DA0] font-semibold'> <span className='font-serif text-[16px] font-semibold'>৳</span>{order.pricing.total}</span>
                </div>
            </div>
        </div>
    );
};

export default SingleOrder;