import React, { useContext, useState } from 'react';
import { AddToCartContext } from '../../Context/AddToCartContext';

// all icons
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { toast } from 'react-toastify';


import {addLocalStorageData} from '../../Utils/LocalStorage';
import { AddToBuyContext } from '../../Context/AddBuyProduct';


const BuyCard = ({product}) => {
    const [cartQuantity, setCartQuantity] = useState(product?.cartQuantity);
    const { handleSessionStorageData } = useContext(AddToBuyContext);


    const handleQuantity = (p) => {
        if(p === '+'){

            if(cartQuantity >= product?.quantity) return; 
            const newQuantity = cartQuantity + 1 ;
            setCartQuantity(newQuantity);
            toast.success('Cart updated successfully.')
            handleSessionStorageData(product, newQuantity);
            return;
        }else if(p === '-'){
            if(cartQuantity <= 1) return; 
            const newQuantity = cartQuantity - 1;
            setCartQuantity(newQuantity);

            handleSessionStorageData(product, newQuantity);
            toast.success('Cart updated successfully.')
            return;
        }
    }


    const { newPrice, discount } = product;
    const totalAmount = cartQuantity * newPrice ;
    const totalSave = cartQuantity * discount;

    const handleDelete = () => {
        handleSessionStorageData({})
        toast.success('Item removed successfully')
    }

    // console.log(product);


    return (
        <div
            className='
                bg-white
                rounded-lg
                border
                border-black/10
                shadow-sm
                p-3
                sm:p-4
                hover:border-indigo-400
                duration-200
            '
        >
        
            <div className='flex gap-2 items-center'>
        
                {/* Product Image */}
                <div className='shrink-0 flex-1 flex justify-center sm:block'>
        
                    <img
                        src={product.image}
                        alt=""
                        className='
                            aspect-square
                            object-cover
                            rounded
                            border
                            sm:w-24
                            md:w-28
                            lg:w-32
                        '
                    />
                </div>
        
                {/* Product Info */}
                <div className='flex-3 sm:flex-5 min-w-0 flex flex-col sm:flex-row sm:justify-between sm:items-center text-black/55'>
                
                    <div className='mt-2 text-xs sm:text-sm text-black/55'>
        
                        <h2
                            className='capitalize text-xs sm:text-sm font-bold leading-5  line-clamp-2 text-black/65' >
                            {product?.name}
                        </h2>
        
                        {
                            product?.selectedColor &&
                            <p>
                                color :
                                <span className='ml-1 font-semibold text-black/50 capitalize'>
                                    {product.selectedColor}
                                </span>
                            </p>
                        }
                        
                        {
                            product?.selectedSize &&
                            <p>
                                Size :
                                <span className='ml-1 uppercase font-semibold text-black/50'>
                                    {product.selectedSize}
                                </span>
                            </p>
                        }
                    </div>
                    {/* Price */}
                    <div className='flex flex-col '>
                        <p className=' text-xs sm:text-sm '>
                            Unit Price: <span className='font-bold text-black/70'> ৳ {product.newPrice}</span>
                        </p>
        
                        {
                            product.discount > 0 && (
                            <p className=' text-xs sm:text-sm '>
                                Discount: <span className='font-bold text-black/70'> ৳ {product?.discount}</span> 
                                <span
                                    className=' bg-red-600 text-white text-[11px] px-2 py-1 rounded-full font-medium ml-1 ' >
                                    Save ৳ {totalSave}
                                </span>
                            </p> 
                            )
                        }
                            {/* Total */}
                        <div className=' text-sm text-black/60'>
                            Total :
                            <span className='font-bold text-black ml-1'>
                                ৳ {totalAmount - totalSave}
                            </span>
                        </div>
                    </div>
                    
        
                    {/* Quantity + Delete */}
                    <div className='mt-2 sm:mt-0 flex flex-row sm:flex-col items-center justify-between gap-4'>
                        {/* Quantity */}
                        <div className=' select-none px-3 sm:px-4 sm:py-1.5 rounded-full border sm:border-2 border-[#1F5DA0] flex items-center gap-6 text-[#1F5DA0]' >
                            <FaMinus className={`cursor-pointer text-sm ${cartQuantity <= 1 ? 'text-black/30' : ''}`} onClick={() => handleQuantity('-')} />
                            <span className='font-bold text-lg'>
                                {cartQuantity}
                            </span>
                            <FaPlus className={`cursor-pointer text-sm ${cartQuantity >= product?.quantity ? 'text-black/50' : ''}`} onClick={() => handleQuantity('+')} />
                        </div>
        
                        {/* Delete Button */}
                        <button onClick={handleDelete} className=' text-red-600 hover:text-red-700 duration-150 flex items-center justify-center ' >
                            <RiDeleteBinLine className='text-2xl' />
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
    );
};

export default BuyCard;