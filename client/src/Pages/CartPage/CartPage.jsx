import React, { useContext } from 'react';

import { useNavigate } from 'react-router';

import { AddToCartContext } from '../../Context/AddToCartContext';

import Footer from './../../Components/Seared/Footer/Footer';

import CartCard from './../../Components/CartPage/CartCard';

// Asset
import emptyImg from './../../assets/empty-cart.gif';

const CartPage = () => {

    const {
        addToCart,
        totalPriceAndDiscount
    } = useContext(AddToCartContext);

    const navigate = useNavigate();

    const totalBill =
        totalPriceAndDiscount.totalPrice -
        totalPriceAndDiscount.totalDiscount;

    const products = [...addToCart];

    const handleCheckout = () => {

        navigate('/dashboard/checkout?cartType=cart');

    };

    // Empty Cart
    if (products.length === 0) {

        return (

            <div>

                <div className='text-center py-16 px-4'>

                    <img
                        className='w-28 h-28 sm:w-36 sm:h-36 inline-block'
                        src={emptyImg}
                        alt=""
                    />

                    <div className='mt-3'>

                        <h5 className='text-2xl sm:text-3xl font-bold uppercase'>

                            Empty
                            <span className='text-[#1F5DA0]'> Cart !</span>

                        </h5>

                        <p className='mt-2 mb-4 text-sm sm:text-base text-black/60'>

                            Please Add Product to View

                        </p>

                        <button
                            className='
                                btn
                                text-sm
                                sm:text-base
                                border-none
                                bg-[#2366ad]
                                text-white
                                px-6
                                rounded-xl
                            '
                        >

                            Go to Shop

                        </button>

                    </div>

                </div>

                <Footer />

            </div>
        );
    }

    return (

        <div className='bg-[#F5F5F5] min-h-screen py-5 md:pt-10 mt-1'>

            <div className='grid grid-cols-1 lg:grid-cols-12 gap-5 w-11/12 md:container mx-auto xl:!max-w-[1350px]'>

                {/* Cart Products */}
                <div className='lg:col-span-8 space-y-4'>

                    {
                        products.map((product, index) => (

                            <CartCard
                                key={index}
                                product={product}
                            />

                        ))
                    }

                </div>

                {/* Bill Section */}
                <div className='lg:col-span-4'>

                    <div
                        className='
                            bg-white
                            rounded-2xl
                            border
                            border-black/10
                            shadow-sm
                            p-5
                            sticky
                            top-5
                        '
                    >

                        <h2 className='text-xl sm:text-2xl font-bold text-black/85'>

                            Your Bill

                        </h2>

                        <div className='mt-5 space-y-4 text-sm sm:text-base'>

                            {/* Sub Total */}
                            <div className='flex justify-between items-center'>

                                <p className='text-black/60'>

                                    Sub-Total

                                </p>

                                <span className='font-bold text-black'>

                                    ৳ {totalPriceAndDiscount.totalPrice}

                                </span>

                            </div>

                            {/* Discount */}
                            <div className='flex justify-between items-center border-b border-black/10 pb-4'>

                                <p className='text-black/60'>

                                    Discount

                                </p>

                                <span className='font-bold text-red-600'>

                                    - ৳ {totalPriceAndDiscount.totalDiscount}

                                </span>

                            </div>

                            {/* Total */}
                            <div className='flex justify-between items-center'>

                                <p className='font-bold text-lg text-black'>

                                    Total

                                </p>

                                <span className='font-bold text-2xl text-black'>

                                    ৳ {totalBill}

                                </span>

                            </div>

                        </div>

                        {/* Checkout Button */}
                        <button
                            onClick={handleCheckout}
                            className='
                                w-full
                                mt-6
                                py-3
                                rounded-xl
                                bg-[#2BB673]
                                hover:bg-[#209C60]
                                duration-150
                                text-white
                                font-bold
                                text-base
                            '
                        >

                            Go To Checkout

                        </button>

                    </div>

                </div>

            </div>

            {/* Footer */}
            <div className='mt-10'>

                <Footer />

            </div>

        </div>
    );
};

export default CartPage;