import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import Footer from '../../Seared/Footer/Footer';

// all icons
import { FaPlus, FaTimesCircle } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaShippingFast } from "react-icons/fa";
import { FaShieldAlt } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { FaStore } from "react-icons/fa";

import { AddToCartContext } from '../../../Context/AddToCartContext';
import { AddToBuyContext } from '../../../Context/AddBuyProduct';
import { AuthContext } from '../../../Context/AuthProvider';
import { toast } from 'react-toastify';

const ProductDetails = () => {
    const [product, setProduct] = useState();
    const { slug } = useParams();
    const [cartQuantity, setCartQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');


    const handleQuantity = (p) => {
        if (p === '+') {
            if (cartQuantity === product?.quantity) return;
            setCartQuantity(cartQuantity + 1);
        }
        if (p === '-') {
            if (cartQuantity === 1) return;
            setCartQuantity(cartQuantity - 1);
        }
    };


    // add to cart data
    const { user } = useContext(AuthContext);
    const { handleLocalStorageData } = useContext(AddToCartContext);
    const { handleSessionStorageData } = useContext(AddToBuyContext);
    const url = `${import.meta.env.VITE_API_URL}/products/${slug}`;

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setProduct(data?.payload);
                if (data?.payload?.variants?.size?.length > 0) {
                    setSelectedSize(data?.payload?.variants?.size[0]);
                }
                if (data?.payload?.variants?.colors?.length > 0) {
                    setSelectedColor(data?.payload?.variants?.colors[0]);
                }
            })
            .catch(err => console.log(err));
    }, [url]);

    
    const handleSetAddToCart = () => { 

        const cartProduct = {
            ...product,
            selectedSize,
            selectedColor : selectedColor
        };
        handleLocalStorageData(cartProduct, cartQuantity); 
    };


    const handleSetAddBuyProduct = () => { 

        const buyProduct = {
            ...product,
            selectedSize,
            selectedColor: selectedColor
        };
        handleSessionStorageData(buyProduct, cartQuantity); 
    }; 
    return (
        <div className='w-11/12 md:container mx-auto mt-5'>
            
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10'>
                {/* Left Side */}
                <div>
                    {/* Product Image */}
                    <div className='p-3 sm:p-5 border rounded-2xl bg-white shadow-sm overflow-hidden'>
                        <img
                            className='w-full aspect-square object-cover rounded-xl hover:scale-105 duration-300'
                            src={product?.image}
                            alt={product?.name}
                        />
                    </div>
                    {/* Features */}
                    <div className='grid grid-cols-2 gap-3 mt-5'>
                        <div className='border rounded-xl p-3 bg-white flex items-center gap-3 shadow-sm'>
                            <FaShippingFast className='text-2xl text-indigo-600' />
                            <div>
                                <h3 className='font-semibold text-sm'>
                                    Fast Delivery
                                </h3>
                                <p className='text-xs text-black/50'>
                                    Nationwide Shipping
                                </p>
                            </div>
                        </div>

                        
                        <div className='border rounded-xl p-3 bg-white flex items-center gap-3 shadow-sm'>
                            <FaShieldAlt className='text-2xl text-green-600' />
                            <div>
                                <h3 className='font-semibold text-sm'>
                                    Secure Payment
                                </h3>
                                <p className='text-xs text-black/50'>
                                    100% Safe Checkout
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side */}
                <div className='pb-5'>

                    {/* Product Name */}
                    <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-black/90 capitalize'>
                        {product?.name}
                    </h1>
                    
                    {/* Rating */}
                    <div className='flex items-center gap-2 mt-3'>
                        <div className='flex items-center gap-1 text-yellow-500 text-sm'>
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                        </div>
                        <span className='text-sm text-black/50'>
                            (4.8 Rating)
                        </span>
                    </div>

                    <div className='inline-block -mb-10 mt-5 md:-mb-3 md:mt-5'>
                        {
                            product?.quantity > 0
                            ? ''
                            :
                            <div className='flex items-center gap-2 text-xl bg-red-500 text-white md:px-6 md:py-2 px-3 py-1 md:rounded-full rounded'>
                                <FaTimesCircle className='' />
                                <p className='font-semibold'>
                                    Out Of Stock
                                </p>
                            </div>
                        }
                    </div>

                    {/* Price */}
                    <div className='mt-5 flex items-center gap-3 flex-wrap'>
                        <div className='flex items-center gap-2'>
                            <span className='h-12 w-2 bg-green-500 inline-block rounded-full'></span>
                            <p className='text-3xl lg:text-4xl font-bold text-indigo-700'>
                                <span className='font-serif'>৳ </span>
                                {product?.newPrice}
                            </p>
                        </div>

                        {
                            product?.discount > 0 &&
                            <p className='text-lg text-black/40 line-through font-semibold'>
                                ৳ {product?.price}
                            </p>
                        }
                        {
                            product?.discount > 0 &&
                            <span className='bg-red-500 text-white text-sm px-3 py-1 rounded-full font-semibold'>
                                Save ৳ {product?.discount}
                            </span>
                        }
                    </div>

                    {/* Info */}
                    <div className='space-y-3 mt-5 text-sm sm:text-base'>
                        <div className='flex items-center gap-2'>
                            <FaStore className='text-indigo-600' />
                            <p className='capitalize'>
                                Category :
                                <span className='font-semibold ml-1'>
                                    {product?.category?.name}
                                </span>
                            </p>
                        </div>


                        <div className='flex items-center gap-2'> 
                            <FaCheckCircle className='text-green-600' />
                            <p>
                                In Stock :
                                <span className='font-semibold ml-1'>
                                    {product?.quantity}
                                </span>
                            </p> 
                        </div>

                        <div className='flex items-center gap-2'>
                            <FaShippingFast className='text-orange-500' />
                            <p>
                                Sold :
                                <span className='font-semibold ml-1'>
                                    {product?.sold || 0}
                                </span>
                            </p>
                        </div>
                    </div>
                    
                    {
                        product?.variants?.size?.length > 0 &&
                        <div className='mt-6 lg:flex lg:gap-3 lg:items-center'>
                            <h3 className='font-semibold text-lg mb-3 lg:mb-0'>
                                Select Colors
                            </h3>
                            <div className='flex flex-wrap gap-3'>
                                {
                                   product?.variants?.colors?.map((color, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedColor(color)}
                                            className={`
                                                px-4 py-2 rounded-xl border font-semibold duration-200 capitalize
                                                ${selectedColor === color
                                                    ? 'bg-indigo-600 text-white border-indigo-600'
                                                    : 'bg-white border-black/10 hover:border-indigo-500'
                                                }
                                            `}
                                        >
                                            {color}
                                        </button>
                                    ))
                                }
                            </div>
                        </div>
                    }

                    {/* Sizes */}
                    {
                        product?.variants?.size?.length > 0 &&
                        <div className='mt-6 lg:flex lg:gap-3 lg:items-center'>
                            <h3 className='font-semibold text-lg mb-3 lg:mb-0'>
                                Select Size
                            </h3>
                            <div className='flex flex-wrap gap-3'>
                                {
                                    product?.variants?.size?.map((size, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedSize(size)}
                                            className={`
                                                px-4 py-2 rounded-xl border font-semibold duration-200 uppercase
                                                ${selectedSize === size
                                                    ? 'bg-indigo-600 text-white border-indigo-600'
                                                    : 'bg-white border-black/10 hover:border-indigo-500'
                                                }
                                            `}
                                        >
                                            {size}
                                        </button>
                                    ))
                                }
                            </div>
                        </div>
                    }

                    {/* Quantity */}
                    <div className='flex items-center gap-3 mt-7'>
                        <h3 className='text-lg font-medium'>
                            Quantity:
                        </h3>
                        <div className='select-none px-4 py-2 rounded-full border-2 flex items-center justify-between w-40 text-[#1F5DA0]'>
                            <FaMinus
                                className={`cursor-pointer ${cartQuantity === 1 ? 'text-black/30' : ''}`}
                                onClick={() => handleQuantity('-')}
                            />
                            <span className='font-bold text-[18px]'>
                                {cartQuantity}
                            </span>
                            <FaPlus
                                className={`cursor-pointer ${cartQuantity === product?.quantity ? 'text-black/50' : ''}`}
                                onClick={() => handleQuantity('+')}
                            />
                        </div>
                    </div>

                    {
                      product?.quantity ? 
                        <div className='flex flex-col sm:flex-row w-full gap-3 mt-7'>
                            <button
                                onClick={handleSetAddToCart}
                                className="btn bg-[#7F7F7F] hover:bg-[#6c6c6c] font-bold text-[16px] text-white flex-1 h-12 rounded-xl border-none py-2 md:py-0"
                            >
                                ADD TO CART
                            </button>
                            <Link
                                onClick={handleSetAddBuyProduct}
                                to={user ? '/dashboard/checkout?cartType=buy' : `/login`}
                                className='btn bg-[#1F5DA0] hover:bg-[#194f88] font-bold text-[16px] text-white flex-1 h-12 rounded-xl border-none py-2 md:py-0'
                                dis
                            >
                                BUY NOW
                            </Link>
                        </div>
                        : 
                        <div className='flex flex-col sm:flex-row w-full gap-3 mt-7'>
                            <button
                                disabled
                                className="
                                    btn
                                    bg-[#7F7F7F]/60
                                    font-bold
                                    text-[16px]
                                    text-white/70
                                    flex-1
                                    h-12
                                    rounded-xl
                                    border-none
                                    py-2
                                    md:py-0
                                    cursor-not-allowed
                                    hover:bg-[#7F7F7F]/60
                                "
                            >
                                ADD TO CART
                            </button>
                            <button
                                disabled
                                className='
                                    btn
                                    bg-[#1F5DA0]/60
                                    font-bold
                                    text-[16px]
                                    text-white/70
                                    flex-1
                                    h-12
                                    rounded-xl
                                    border-none
                                    py-2
                                    md:py-0
                                    cursor-not-allowed
                                    hover:bg-[#1F5DA0]/60
                                '
                            >
                                BUY NOW
                            </button>
                        </div>
                    }
                    


                    

                    {/* Details */}
                    <div className='mt-7 border rounded-2xl p-4 bg-white shadow-sm'>
                        <h3 className='text-xl font-bold mb-3'>
                            Product Details
                        </h3>
                        <p className='text-black/70 leading-7'>
                            {product?.details ? product?.details : 'No Data Found!'}
                        </p>
                    </div>

                    {/* Description */}
                    <div className='mt-5 border rounded-2xl p-4 bg-white shadow-sm'>
                        <h3 className='text-xl font-bold mb-3'>
                            Description
                        </h3>
                        <p className='text-black/70 leading-7'>
                            {product?.description ? product?.description : 'No Data Found!'}
                        </p>
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

export default ProductDetails;