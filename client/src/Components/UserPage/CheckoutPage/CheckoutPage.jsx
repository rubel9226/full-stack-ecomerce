import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from "react-router";
import { AddToCartContext } from '../../../Context/AddToCartContext';
import CartCard from '../../CartPage/CartCard';
import { AddToBuyContext } from '../../../Context/AddBuyProduct';
import BuyCard from '../../CartPage/BuyCard';
import Footer from '../../Seared/Footer/Footer';

// icons
import { IoStar } from "react-icons/io5";
import { BsArrowRight } from "react-icons/bs";
import ShippingAddressForm from './ShippingAddressForm';
import CheckoutDetails from './CheckoutDetails';
import { AuthContext } from '../../../Context/AuthProvider';
import api from '../../../API/Axios/api';
import UserDetails from './UserDetails';


const CheckoutPage = () => {
    const { addToCart, totalPriceAndDiscount } = useContext(AddToCartContext);
    const { 
        addToBuyData, 
        totalBillWithDiscount, 
        setTotalBillWithDiscount, 
        totalBill, setTotalBill, 
        discount, setDiscount,
        handleSessionStorageId,
        productId
    } = useContext(AddToBuyContext);
    const [ searchParams ] = useSearchParams();
    const [userAddress, setUserAddress] = useState({});


    const [submitStatus, setSubmitStatus] = useState(false);
    const [checkoutSubmit, setCheckoutSubmit] = useState(false);
    const [submitBtnClicked, setSubmitBtnClicked] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();


    const cartType = searchParams.get("cartType");

    const {user} = useContext(AuthContext);

    const fetchAddress =async () => {
        try {
            const promise = await api.get(`/shipping/default`);
            setUserAddress(promise?.data?.payload || {});
        } catch (error) {
            // console.log(error?.response);
        }

    }
    useEffect(() => {
        if (!user?._id) return;

        fetchAddress();
    }, [user?._id]);
    
    
    
useEffect(() => {
    if (cartType === 'cart') {
        const cartBill = totalPriceAndDiscount.totalPrice - totalPriceAndDiscount.totalDiscount;

        setTotalBillWithDiscount(totalPriceAndDiscount.totalPrice);
        setDiscount(totalPriceAndDiscount.totalDiscount);
        setTotalBill(cartBill);

        // const slugs = addToCart.map(product => product.slug);
        handleSessionStorageId(addToCart);
        // console.log(addToCart);
    }

    if (cartType === 'buy') {
        const { price, newPrice, cartQuantity } = addToBuyData || {};

        const bill = (price || 0) * (cartQuantity || 0);

        setDiscount(addToBuyData?.discount);
        setTotalBillWithDiscount(bill);
        setTotalBill(bill - addToBuyData?.discount);
        handleSessionStorageId([addToBuyData])
        // console.log([addToBuyData]);
    }
}, [cartType, addToBuyData, totalPriceAndDiscount, addToCart]);


    useEffect(() => {
    if (submitStatus == true) {
        // setSubmitBtnClicked(true);
        if (cartType === 'cart' && addToCart.length != 0) {
            setCheckoutSubmit(true);

        } else if ( cartType === 'buy' && typeof addToBuyData === 'object' ) {
            setCheckoutSubmit(true);

        } else {
            setCheckoutSubmit(false);
        }
    }else if(Object.keys(userAddress).length !== 0){
        setSubmitBtnClicked(true);
        // console.log('ara kara kotha theke alo ara')
        // console.log(submitBtnClicked, 'submit btn chicked');
        if (cartType === 'cart' && addToCart.length != 0) {
            setCheckoutSubmit(true);

        } else if ( cartType === 'buy' && typeof addToBuyData === 'object' ) {
            setCheckoutSubmit(true);

        } else {
            setCheckoutSubmit(false);
        }
    }else{
        setCheckoutSubmit(false);
    }
}, [submitStatus, cartType, addToCart, addToBuyData, userAddress, submitBtnClicked]);




const handleCheckoutButton =async () => {

    // First Click
    if (!submitBtnClicked) {

        document
            .getElementById('shippingForm')?.requestSubmit();
    }

    // Second Click
    else {
        setLoading(true);
        try {
            const res = await api.post("/orders", {products: productId});
            const order = res?.data?.payload;
            navigate('/dashboard/payment', {
                state: {
                    orderId: order.orderId
                }
            });
        } catch (error) {
            console.log(error?.response?.data?.message);
        } finally{
            setLoading(false);
        }

    }
};
    
    return (
        <div>
            <div className='px-5 mt-3'>
                {
                    !userAddress || Object.keys(userAddress).length === 0
                        ? <ShippingAddressForm user={user} fetchAddress={fetchAddress} setSubmitStatus={setSubmitStatus} setSubmitBtnClicked={setSubmitBtnClicked} submitBtnClicked={submitBtnClicked} /> 
                        : <UserDetails userAddress={userAddress} user={user} fetchAddress={fetchAddress} />
                }

                

                <div className='mt-4'>
                    <p className='text-sm font-medium '>Additional Notes (Optional)</p>
                    <textarea
                        placeholder="Enter your notes"
                        className="w-full h-20 px-4 text-[12px] py-2 mt-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                </div>

                <div className='mt-4'>
                    {/* <p className='text-sm font-medium '>Products Items{console.log} </p> */}
                    <div>
                        {cartType === 'buy' 
                            ? <div>
                                {Object.entries(addToBuyData).length !== 0 
                                    ? <BuyCard product={addToBuyData} />
                                    :<div className='flex p-10 gap-3 items-center border border-black/10 rounded-md'>
                                        <p className='text-sm font-semibold text-black/50'>No More Products !</p>
                                        <span className='text-[#2BB673] font-semibold'>Shop Now <BsArrowRight className='inline-block text-2xl' /> </span>
                                    
                                    </div>
                                }
                            </div>
                        : cartType === 'cart' &&
                            <div>
                                {Object.entries(addToCart).length !== 0 
                                    ? <div className='flex flex-col gap-4'>{addToCart.map((product, index) => <CartCard key={index} product={product} />)}</div> 
                                    : <div className='flex p-10 gap-3 items-center border border-black/10 rounded-md'>
                                        <p className='text-sm font-semibold text-black/50'>No More Products !</p>
                                        <span className='text-[#2BB673] font-semibold'>Shop Now <BsArrowRight className='inline-block text-2xl' /> </span>
                                    
                                    </div>}
                            </div>
                        }
                    </div>
                </div>

                <div>
                    <CheckoutDetails />
                </div>

                {/* bill */}
                <div>
                    
                    <div className='w-11/12 md:container mx-auto mb-5 shadow-md border-2 border-black/5 rounded-md py-2 text-sm'>
                        <p className='font-bold text-black/70 p-2'>Your Bill</p>

                        <div className='font-medium text-black/50'>

                            <div className='border-t border-black/15 py-2 px-2 flex justify-between'>
                                <p>Sub-Total</p>
                                <span className='font-semibold text-black/90'><span className='font-serif'>৳ </span>{totalBillWithDiscount}</span>
                            </div>

                            <div className='border-b border-black/15 p-2 flex justify-between'>
                                <p>Discount</p>
                                <span className='text-red-600 font-semibold'><span className='font-serif'>- ৳ </span>{discount}</span>
                            </div>

                            <div className=' p-2 flex justify-between'>
                                <p>Total</p>
                                <span className='font-bold text-[15px] text-black'><span className='font-serif'>৳ </span> {totalBill}</span>
                            </div>

                            
                        </div>
                    </div>

                </div>
            </div>


            <div className='fixed bg-white left-0 bottom-0 shadow-[0_-4px_5px_rgba(0,0,0,0.1)] shadow-black/20 z-10 w-full'>

                <div className='flex py-3 w-11/12 mx-auto justify-between items-center'>
                    <div className='flex items-center gap-1 font-semibold'>
                        <p className='text-black/50'>Total:</p>
                        <span className='font-bold text-[15px] text-black'><span className='font-serif'>৳ </span>{totalBill}</span>
                    </div>

                    <div>
                        <button 
                            // form="shippingForm" 
                            onClick={handleCheckoutButton}
                            className='btn hover:bg-[#209C60] bg-[#2BB673] text-white disabled:bg-black/8 disabled:text-black/30' 
                            disabled={!checkoutSubmit}
                        >{submitBtnClicked ? loading ? 'Loading...' : 'Continue to Payment' : 'Continue to Shipping'}</button>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};


export default CheckoutPage;