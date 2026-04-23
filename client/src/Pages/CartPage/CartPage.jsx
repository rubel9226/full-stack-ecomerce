import React, { useContext } from 'react';
import { AddToCartContext } from '../../Context/AddToCartContext';
import CartCard from '../../Components/CartPage/CartCard/CartCard';
import Footer from './../../Components/Seared/Footer/Footer';

// Asset
import emptyImg from './../../assets/empty-cart.gif';

const CartPage = () => {
    const { addToCart, setAddToCart, handleLocalStorageData, totalPriceAndDiscount } = useContext(AddToCartContext);

    const totalBill = totalPriceAndDiscount.totalPrice - totalPriceAndDiscount.totalDiscount;

    console.log(totalBill)
    const products = [...addToCart];
    // console.log(products);

    // console.log(products.length)
    if(products.length == 0){
        return (
            <div>
                <div className='text-center py-15'>
                    <img className='w-25 h-25 inline-block' src={emptyImg} alt="" />
                    <div className=''>
                        <h5 className='text-2xl font-bold uppercase '>Empty <span className='text-[#1F5DA0] '>Cart !</span></h5>
                        <p className='mt-2.5 mb-2'>Please Add Product to View</p>
                        <button className='btn text-[16px] border-none bg-[#2366ad] text-white px-6'>Go to Shop</button>
                    </div>
                </div>
                <div>
                    <Footer />
                </div>
            </div>
            
        )
    }


    return (
        <div>
            <div className='w-11/12 md:container mx-auto mb-5'>
                {
                    
                    products.map(product => <CartCard product={product} />)
                }
            </div>
            <div className='w-11/12 md:container mx-auto mb-5 shadow-md border-2 border-black/5 rounded-md py-2 text-sm'>
                <p className='font-bold text-black/70 p-2'>Your Bill</p>
                <div className='font-medium text-black/50'>

                    <div className='border-t border-black/15 py-2 px-2 flex justify-between'>
                        <p>Sub-Total</p>
                        <span className='font-semibold text-black/90'>৳ {totalPriceAndDiscount.totalPrice}</span>
                    </div>

                    <div className='border-b border-black/15 p-2 flex justify-between'>
                        <p>Discount</p>
                        <span className='text-red-600 font-semibold'>- ৳ {totalPriceAndDiscount.totalDiscount}</span>
                    </div>

                    <div className=' p-2 flex justify-between'>
                        <p>Total</p>
                        <span className='font-bold text-[15px] text-black font-serif '>৳ {totalBill}</span>
                    </div>

                    <div className='m-2 text-center'>
                        <button className=' py-2.75 w-full rounded-md duration-75 cursor-pointer active:translate-y-px hover:bg-[#209C60] bg-[#2BB673] font-bold text-[16px] text-white'>Go To Checkout</button>
                    </div>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
};

export default CartPage;