import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from "react-router";
import { AddToCartContext } from '../../../Context/AddToCartContext';
import { AddToBuyContext } from '../../../Context/AddBuyProduct';
import { AuthContext } from '../../../Context/AuthProvider';
import CartCard from '../../CartPage/CartCard';
import BuyCard from '../../CartPage/BuyCard';
import Footer from '../../Seared/Footer/Footer';
import { FaTicketAlt } from "react-icons/fa";
import ShippingAddressForm from './ShippingAddressForm';
import api from '../../../API/Axios/api';
import UserDetails from './UserDetails';
import UserDetailsLoading from './userDetailsLoading';

const CheckoutPage = () => {
    const { addToCart, totalPriceAndDiscount } = useContext(AddToCartContext);
    const {
        addToBuyData,
        totalBillWithDiscount,
        setTotalBillWithDiscount,
        totalBill,
        setTotalBill,
        discount,
        setDiscount,
        handleSessionStorageId,
        productId
    } = useContext(AddToBuyContext);
    const [searchParams] = useSearchParams();
    const [userAddress, setUserAddress] = useState({});
    const [userAddressLoading, setUserDetailsLoading] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(false);
    const [checkoutSubmit, setCheckoutSubmit] = useState(false);
    const [submitBtnClicked, setSubmitBtnClicked] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const cartType = searchParams.get("cartType");
    const { user } = useContext(AuthContext);

    
    const fetchAddress = async () => {
        try {
            setUserDetailsLoading(true);
            const promise = await api.get(`/shipping/default`);
            setUserAddress(promise?.data?.payload || {});
        } catch (error) {
            console.log(error?.response?.data?.message);
        } finally {
            setUserDetailsLoading(false);
        }
    }


    useEffect(() => {
        if (!user?._id) return;
        fetchAddress();
    }, [user?._id]);



    useEffect(() => {
        if (cartType === 'cart') {
            const cartBill =
                totalPriceAndDiscount.totalPrice -
                totalPriceAndDiscount.totalDiscount;
                
            setTotalBillWithDiscount(totalPriceAndDiscount.totalPrice);
            setDiscount(totalPriceAndDiscount.totalDiscount);
            setTotalBill(cartBill);
            handleSessionStorageId(addToCart);
        }


        if (cartType === 'buy') {
            const { price, cartQuantity } = addToBuyData || {};
            const bill =
                (price || 0) * (cartQuantity || 0);
            setDiscount(addToBuyData?.discount);
            setTotalBillWithDiscount(bill);
            setTotalBill(bill - addToBuyData?.discount);
            handleSessionStorageId([addToBuyData]);
        }
    }, [cartType, addToBuyData, totalPriceAndDiscount, addToCart]);



    useEffect(() => {
        if (submitStatus == true) {
            if (cartType === 'cart' && addToCart.length != 0) {
                setCheckoutSubmit(true);
            } else if (
                cartType === 'buy' &&
                typeof addToBuyData === 'object'
            ) {
                setCheckoutSubmit(true);
            } else {
                setCheckoutSubmit(false);
            }
        } else if (Object.keys(userAddress).length !== 0) {
            setSubmitBtnClicked(true);
            if (cartType === 'cart' && addToCart.length != 0) {
                setCheckoutSubmit(true);
            } else if (
                cartType === 'buy' &&
                typeof addToBuyData === 'object'
            ) {
                setCheckoutSubmit(true);
            } else {
                setCheckoutSubmit(false);
            }
        } else {
            setCheckoutSubmit(false);
        }
    }, [ submitStatus, cartType, addToCart, addToBuyData, userAddress, submitBtnClicked]);



    const handleCheckoutButton = async () => {
        if (!submitBtnClicked) {
            document
                .getElementById('shippingForm')
                ?.requestSubmit();
        }
        else {
            setLoading(true);
            try {
                const res = await api.post("/orders", {
                    products: productId
                });
                const order = res?.data?.payload;
                navigate('/dashboard/payment', {
                    state: {
                        orderId: order.orderId
                    }
                });
            } catch (error) {
                console.log(error?.response?.data?.message);
            } finally {
                setLoading(false);
            }
        }
    };


    return (
        <div className='bg-[#f5f5f5] min-h-screen pb-10 mt-1'>

            <div className='w-11/12 md:container mx-auto xl:!max-w-[1350px] mx-auto py-5'>
                <div className='grid grid-cols-1 xl:grid-cols-12 gap-5'>

                    {/* LEFT SIDE */}
                    <div className='xl:col-span-8 space-y-5'>
                        {
                            userAddressLoading ?
                            <UserDetailsLoading />
                            :
                            !userAddress ||
                            Object.keys(userAddress).length === 0 ?
                            <ShippingAddressForm
                                user={user}
                                fetchAddress={fetchAddress}
                                setSubmitStatus={setSubmitStatus}
                                setSubmitBtnClicked={setSubmitBtnClicked}
                                submitBtnClicked={submitBtnClicked}
                            />
                            :
                            <UserDetails
                                userAddress={userAddress}
                                user={user}
                                fetchAddress={fetchAddress}
                            />
                        }


                       
                        <div className='bg-white rounded-2xl shadow-sm border border-black/5 p-5'>
                            <p className='text-lg font-bold mb-3'>
                                Additional Notes (Optional)
                            </p>
                            <textarea
                                placeholder="Enter your notes"
                                className=' w-full h-32 border border-black/10 rounded-xl p-4 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#2BB673]'/>

                        </div>

                        
                        
                        <div>
                            <h2 className='text-2xl font-bold mb-4'>
                                Product Items
                            </h2>
                            <div className='space-y-4'>
                                {
                                    cartType === 'buy'
                                        ?
                                        Object.entries(addToBuyData).length !== 0
                                            ?
                                            <BuyCard product={addToBuyData} />
                                            :
                                            <div className='bg-white rounded-xl p-10 border border-black/10 text-center'>
                                                No More Products
                                            </div>
                                        :
                                        cartType === 'cart' &&
                                        (
                                            Object.entries(addToCart).length !== 0
                                                ?
                                                addToCart.map((product, index) => (
                                                    <CartCard
                                                        key={index}
                                                        product={product}
                                                    />
                                                ))
                                                :
                                                <div className='bg-white rounded-xl p-10 border border-black/10 text-center'>
                                                    No More Products
                                                </div>
                                        )
                                }
                            </div>
                        </div>
                    </div>

                    

                    <div className='xl:col-span-4'>
                        <div className='sticky top-5 space-y-5'>
                            

                            
                            <div className='bg-white rounded-2xl shadow-sm border border-black/5 overflow-hidden'>
                                <div className='px-5 py-4 border-b border-black/5'>
                                    <h2 className='text-xl font-bold'>
                                        Your Bill
                                    </h2>
                                </div>
                                <div className='p-5 space-y-4'>
                                    <div className='flex justify-between text-sm'>
                                        <p className='text-black/70'>
                                            Sub-Total
                                        </p>
                                        <span className='font-semibold'>
                                            ৳ {totalBillWithDiscount}
                                        </span>
                                    </div>
                                    <div className='flex justify-between text-sm'>
                                        <p className='text-black/70'>
                                            Discount
                                        </p>
                                        <span className='font-semibold text-red-500'>
                                            - ৳ {discount}
                                        </span>
                                    </div>
                                    <div className='flex justify-between text-sm'>
                                        <p className='text-black/70'>
                                            Shipping Charge
                                        </p>
                                        <span className='font-semibold'>
                                            ৳ 0
                                        </span>
                                    </div>
                                    <div className='border-t border-black/10 pt-4 flex justify-between items-center'>
                                        <p className='text-xl font-bold'>
                                            Total
                                        </p>
                                        <span className='text-2xl font-bold'>
                                            ৳ {totalBill}
                                        </span>
                                    </div>

                                    <button
                                        onClick={handleCheckoutButton}
                                        disabled={!checkoutSubmit}
                                        className=' w-full h-14 rounded-xl bg-[#2BB673] hover:bg-[#249c62] text-white font-bold text-lg duration-200 disabled:bg-black/10 disabled:text-black/30'>
                                        {
                                            submitBtnClicked
                                                ?
                                                loading
                                                    ? 'Loading...'
                                                    : 'Continue to Payment'
                                                :
                                                'Continue to Shipping'
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* footer */}
            <Footer />
        </div>
    );
};

export default CheckoutPage;