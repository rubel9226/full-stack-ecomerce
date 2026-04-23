import React, { useContext, useState } from 'react';
import { AddToCartContext } from '../../../Context/AddToCartContext';

// all icons
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { toast } from 'react-toastify';


import {addLocalStorageData} from './../../../Utils/LocalStorage';


const CartCard = ({product}) => {
    const [cartQuantity, setCartQuantity] = useState(product.cartQuantity);


    const handleQuantity = (p) => {
        if(p === '+'){

            if(cartQuantity >= product?.quantity) return; 
            const newQuantity = cartQuantity + 1 ;
            setCartQuantity(newQuantity);

            handleLocalStorageData(product, newQuantity);
            return;
        }else if(p === '-'){
            if(cartQuantity <= 1) return; 
            const newQuantity = cartQuantity - 1;
            setCartQuantity(newQuantity);

            handleLocalStorageData(product, newQuantity);
            return;
        }
    }


    const { addToCart, setAddToCart, handleLocalStorageData, } = useContext(AddToCartContext);

    const { newPrice, discount } = product;
    const totalAmount = cartQuantity * newPrice ;
    const totalSave = cartQuantity * discount;

    const handleDelete = () => {
        const updatedCart = addToCart.filter(item => item.slug != product.slug );
        setAddToCart(updatedCart);
        addLocalStorageData(updatedCart);
        toast.success('Item removed successfully')
    }


    return (
        <div className='shadow-md mt-4 border-2 border-black/5 rounded-md hover:border-2 hover:border-indigo-800/50 duration-200'>
            <div className='flex py-2 gap-2 items-center'>
                <div className='flex-2'>
                    <img src={product.image} alt="" />
                </div>
                <div className='flex-5 text-[12px] font-semibold bg-bue-500'>
                    <p className='leading-4 capitalize'>{product.details}</p>

                    <div className='flex gap-1 mt-1 font-medium text-black/40 text-sm'>
                        <p>Unit Price: </p>
                        <p className='font-bold text-black'><span className='leading-0 font-serif '>৳ </span>{product.newPrice} </p>
                        <div className={`${product.discount === 0 && 'hidden'}`}>
                            <p className={` font-bold discount-price text-sm`}><span className='leading-0 font-serif'>৳</span> {product.price}</p>
                        </div>
                    </div>

                    {/* <div className='flex gap-1 mt-1 font-medium text-black/40'>
                        <p className='capitalize'>Delivery Charge: </p>
                        {
                            product.shipping === 0 ? <span>Free</span> : <p className='font-bold text-black text-sm'><span className='leading-0 font-serif '>৳ </span>{product.shipping} </p>
                        }
                        
                    </div> */}
                    
                    <div className='flex items-center gap-1 mt-0.5 font-medium text-black/40'>
                        <p>Total Price: </p>
                        <p className='font-bold text-black text-sm'><span className='leading-0 font-serif '>৳ </span>{totalAmount} </p>
                        {/* Discount badge */}
                        {product.discount !== 0 && (
                            <span className=" bg-red-700 text-white text-xs px-2 py-0.5 rounded-full">
                                <span className='leading-0 font-serif '>save ৳</span>
                                <span>{totalSave}</span>
                                
                            </span>
                        )}
                    </div>

                    

                    <div>

                        <div className='flex items-center gap-4 mt-3'>
                            <div className='select-none px-4 py-1.5 rounded-full border-2 flex items-center gap-7 text-[#1F5DA0]'>
                                <FaMinus className={`cursor-pointer ${cartQuantity <= 1 ? 'text-black/30' : '' }`} onClick={() => handleQuantity('-')} />
                                <span className='font-bold text-[18px]'>{cartQuantity}</span>
                                <FaPlus className={`cursor-pointer ${cartQuantity >= product?.quantity ? 'text-black/50' : '' }`} onClick={() => handleQuantity('+')} />
                            </div>
                            <div>
                                <RiDeleteBinLine onClick={handleDelete} className='text-3xl text-red-600' />
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
        
    );
};

export default CartCard;