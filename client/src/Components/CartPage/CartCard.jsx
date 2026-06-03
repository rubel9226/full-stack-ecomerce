import React, { useContext, useState } from 'react';

import { AddToCartContext } from '../../Context/AddToCartContext';

// icons
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

import { RiDeleteBinLine } from "react-icons/ri";

import { toast } from 'react-toastify';

import { addLocalStorageData } from '../../Utils/LocalStorage';

const CartCard = ({ product }) => {

    const [cartQuantity, setCartQuantity] = useState(
        product?.cartQuantity
    );

    const {
        addToCart,
        setAddToCart,
        handleLocalStorageData,
    } = useContext(AddToCartContext);

    // Quantity Handler
    const handleQuantity = (p) => {

        if (p === '+') {

            if (cartQuantity >= product?.quantity) return;

            const newQuantity = cartQuantity + 1;

            setCartQuantity(newQuantity);

            handleLocalStorageData(product, newQuantity);

            return;
        }

        else if (p === '-') {

            if (cartQuantity <= 1) return;

            const newQuantity = cartQuantity - 1;

            setCartQuantity(newQuantity);

            handleLocalStorageData(product, newQuantity);

            return;
        }
    };

    const { newPrice, discount } = product;

    const totalAmount = cartQuantity * newPrice;

    const totalSave = cartQuantity * discount;

    // Delete Product
    const handleDelete = () => {

        const updatedCart = addToCart.filter(
            item => item.slug !== product.slug
        );

        setAddToCart(updatedCart);

        addLocalStorageData('cartData', updatedCart);

        toast.success('Item removed successfully');
    };

    return (

        <div
            className='
                bg-white
                rounded-2xl
                border
                border-black/10
                shadow-sm
                p-3
                sm:p-4
                hover:border-indigo-400
                duration-200
            '
        >

            <div className='flex flex-col sm:flex-row gap-4 sm:items-center'>

                {/* Product Image */}
                <div className='shrink-0 flex justify-center sm:block'>

                    <img
                        src={product.image}
                        alt=""
                        className='
                            w-28
                            h-28
                            sm:w-32
                            sm:h-32
                            object-cover
                            rounded-xl
                            border
                        '
                    />

                </div>

                {/* Product Info */}
                <div className='flex-1 min-w-0'>

                    {/* Product Name */}
                    <h2
                        className='
                            text-sm
                            sm:text-lg
                            font-bold
                            leading-5
                            sm:leading-6
                            line-clamp-2
                            text-black/85
                        '
                    >

                        {product.details}

                    </h2>

                    {/* Color & Size */}
                    <div className='mt-2 space-y-1 text-xs sm:text-sm text-black/55'>

                        {
                            product?.variants?.color &&

                            <div className='flex items-center gap-2'>

                                <p>Color :</p>

                                <div
                                    className='w-4 h-4 rounded-full border'
                                    style={{
                                        backgroundColor:
                                            product?.variants?.color
                                    }}
                                ></div>

                            </div>
                        }

                        {
                            product?.selectedSize &&

                            <p>

                                Size :
                                <span className='ml-1 uppercase font-medium text-black'>

                                    {product.selectedSize}

                                </span>

                            </p>
                        }

                    </div>

                    {/* Price */}
                    <div className='flex flex-wrap items-center gap-2 mt-3'>

                        <p className='font-bold text-lg text-black'>

                            ৳ {product.newPrice}

                        </p>

                        {
                            product.discount > 0 && (

                                <p
                                    className='
                                        text-sm
                                        text-black/35
                                        line-through
                                        font-semibold
                                    '
                                >

                                    ৳ {product.price}

                                </p>
                            )
                        }

                        {
                            product.discount > 0 && (

                                <span
                                    className='
                                        bg-red-600
                                        text-white
                                        text-[11px]
                                        px-2
                                        py-1
                                        rounded-full
                                        font-medium
                                    '
                                >

                                    Save ৳ {totalSave}

                                </span>
                            )
                        }

                    </div>

                    {/* Total */}
                    <div className='mt-2 text-sm text-black/60'>

                        Total :
                        <span className='font-bold text-black ml-1'>

                            ৳ {totalAmount}

                        </span>

                    </div>

                </div>

                {/* Quantity + Delete */}
                <div className='flex flex-row sm:flex-col items-center justify-between gap-4'>

                    {/* Quantity */}
                    <div
                        className='
                            select-none
                            px-4
                            py-2
                            rounded-full
                            border-2
                            border-[#1F5DA0]
                            flex
                            items-center
                            gap-6
                            text-[#1F5DA0]
                        '
                    >

                        <FaMinus
                            className={`cursor-pointer text-sm ${cartQuantity <= 1 ? 'text-black/30' : ''}`}
                            onClick={() => handleQuantity('-')}
                        />

                        <span className='font-bold text-lg'>

                            {cartQuantity}

                        </span>

                        <FaPlus
                            className={`cursor-pointer text-sm ${cartQuantity >= product?.quantity ? 'text-black/50' : ''}`}
                            onClick={() => handleQuantity('+')}
                        />

                    </div>

                    {/* Delete Button */}
                    <button
                        onClick={handleDelete}
                        className='
                            text-red-600
                            hover:text-red-700
                            duration-150
                            flex
                            items-center
                            justify-center
                        '
                    >

                        <RiDeleteBinLine className='text-2xl' />

                    </button>

                </div>

            </div>

        </div>
    );
};

export default CartCard;