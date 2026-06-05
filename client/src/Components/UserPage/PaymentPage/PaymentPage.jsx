import React, { useContext, useEffect, useState } from 'react';
import { AddToBuyContext } from '../../../Context/AddBuyProduct';
import api from '../../../API/Axios/api';
import { useLocation, useNavigate, useSearchParams } from 'react-router';
import { toast } from 'react-toastify';
import Footer from '../../Seared/Footer/Footer';

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [pricing, setPricing] = useState([]); 

  const [ searchParams ] = useSearchParams();
  const invoiceNo = searchParams.get("invoiceNo");
  const tranStatus = searchParams.get("tran_status");
  

  const [loading, setLoading] = useState(false);

  const { 
    addToBuyData, 
    totalBillWithDiscount, 
    totalBill, 
    setTotalBill, 
    discount, 
    setDiscount, 
    productId 
  } = useContext(AddToBuyContext);

  const location = useLocation();
  const navigate = useNavigate();

  const orderId = (location.state?.orderId) || invoiceNo ;

  useEffect(() => {
    const getData =async () => {
      if(!orderId) return ;
      try {
        const data = await api.get(`/orders/${orderId}`);
        setPricing(data?.data?.payload?.pricing);
      } catch (error) {
        console.log(error?.response?.data?.message);
      }
    }
    getData();
  }, [orderId]);


      const handleCOD = async () => {
          setLoading(true);
          try {
              const { data } = await api.put("/orders/payment-cash_on_delivery", { orderId });

              toast.success("Your order is confirmed");
              navigate("/dashboard/account/my-orders");
          } catch (error) {
              if(error?.response?.data?.message === 'Order already confirmed'){
                  toast.error('Order already confirmed.');
                  navigate('/dashboard/account/my-orders')
              }
          } finally {
            setLoading(false);
          }
      };

      const handleSSL = async () => {
        setLoading(true);
        try {
          const { data } = await api.post("/orders/payment-sslcommerz", { orderId });

          if (data.success) {
            window.location.href = data.payload;
          }
        } catch (error) {
          if(error?.response?.data?.message === 'Order already confirmed by Cash on Delivery'){
            toast.error('Order already confirmed by Cash on Delivery');
            navigate('/dashboard/account/my-orders');
          }else if(error?.response?.data?.message === 'Order already paid'){
            toast.error('Order already confirmed and paid.');
            navigate('/dashboard/account/my-orders');
          }
        } finally {
          setLoading(false);
        }
      };

      const handlePayment = async () => {
        if(paymentMethod === "sslcommerz"){
          return handleSSL();
        }

        if(paymentMethod === "cash_on_delivery"){
          return handleCOD();
        }

        if(paymentMethod === "bkash"){
          return handleBkash();
        }
      };





      

    return (
        <div className=' bg-[#f5f5f5] mt-1 md:pt-10'>
          <div className='w-11/12 md:container mx-auto xl:!max-w-[1350px] min-h-[61.5vh]'>
            <div className="space-y-5 p-4">
              {
                tranStatus === 'failed' && <div className='flex flex-col justify-center items-center'>
                  <svg width={51} height={51} viewBox='0 0 51 51' className='w-9 h-9 md:h-[50px] md:w-[50px]' fill="none" xmlns='http:/www.w3.org/2000/svg'>
                    <g clipPath='url(#clip)_4373_33222)'>
                      <path d="M49.7607 27.6279L47.8247 30.0762C47.2385 30.8171 46.9835 31.7675 47.1213 32.7031L47.5754 35.7877C47.8076 37.3629 46.9243 38.8904 45.4435 39.4754L42.548 40.6205C41.667 40.9688 40.9693 41.6665 40.6199 42.5486L39.4748 45.4442C38.8898 46.9249 37.3623 47.8071 35.7871 47.576L32.7025 47.1219C31.7681 46.9841 30.8177 47.2391 30.0756 47.8253L27.6273 49.7613C26.381 50.747 24.619 50.747 23.3727 49.7613L20.9244 47.8253C20.1835 47.2391 19.2331 46.9841 18.2975 47.1219L15.2129 47.576C13.6377 47.8082 12.1102 46.9249 11.5252 45.4442L10.3801 42.5486C10.0319 41.6676 9.33414 40.9699 8.45204 40.6205L5.55645 39.4754C4.07566 38.8904 3.19355 37.3629 3.42461 35.7877L3.87875 32.7031C4.01647 31.7687 3.76151 30.8183 3.17534 30.0762L1.23926 27.6279C0.25358 26.3816 0.25358 24.6196 1.23926 23.3733L3.17534 20.925C3.76151 20.1841 4.01647 19.2337 3.87875 18.2981L3.42461 15.2136C3.19241 13.6383 4.07566 12.1108 5.55645 11.5258L8.45204 10.3808C9.333 10.0325 10.0307 9.33475 10.3801 8.45265L11.5252 5.55707C12.1102 4.07627 13.6377 3.19416 15.2129 3.42522L18.2975 3.87936C19.2319 4.01708 20.1823 3.76212 20.9244 3.17595L23.3727 1.23987C24.619 0.25419 26.381 0.25419 27.6273 1.23987L30.0756 3.17595C30.8165 3.76212 31.7669 4.01708 32.7025 3.87936L35.7871 3.42522C37.3623 3.19302 38.8898 4.07627 39.4748 5.55707L40.6199 8.45265C40.9681 9.33361 41.6659 10.0313 42.548 10.3808L45.4435 11.5258C46.9243 12.1108 47.8064 13.6383 47.5754 15.2136L47.1213 18.2981C46.9835 19.2325 47.2385 20.1829 47.8247 20.925L49.7607 23.3733C50.7464 24.6196 50.7464 26.3816 49.7607 27.6279Z" fill="#E04B4B"></path>
                      <path d="M27.7018 25.5085L33.7069 19.5034C34.3147 18.8956 34.3147 17.9087 33.7069 17.3009C33.0991 16.6931 32.1123 16.6931 31.5045 17.3009L25.4993 23.3061L19.4942 17.3009C18.8864 16.6931 17.8996 16.6931 17.2918 17.3009C16.684 17.9087 16.684 18.8956 17.2918 19.5034L23.2969 25.5085L17.2918 31.5137C16.684 32.1215 16.684 33.1083 17.2918 33.7161C17.5957 34.02 17.9941 34.1725 18.3936 34.1725C18.7931 34.1725 19.1903 34.02 19.4953 33.7161L25.5005 27.7109L31.5056 33.7161C31.8095 34.02 32.2079 34.1725 32.6074 34.1725C33.0069 34.1725 33.4042 34.02 33.7092 33.7161C34.317 33.1083 34.317 32.1215 33.7092 31.5137L27.704 25.5085H27.7018Z" fill="white"></path>
                    </g>
                  </svg>
                  <div className='text-center mt-1'>
                    <h2 className='font-semibold'>Order Payment field</h2>
                    <p className='text-sm text-[#E04B4B] font-medium'>Transaction failed!</p>
                  </div>
                </div>
              }

              
              <div className='grid grid-cols-1 lg:grid-cols-12 gap-y-5 md:gap-y-8 lg:gap-x-8'>
                {/* Payment Method */}
                <div className=" bg-white col-span-1 rounded-2xl border border-black/10 shadow-sm overflow-hidden lg:col-span-8">

                  <div className="px-4 py-3 border-b border-black/10">
                    <h2 className="font-bold text-[17px] text-black/80"> Select Payment Method </h2>
                  </div>

                  <div className="p-4 space-y-4">

                    {/* cash on delivery */}
                    <label className="flex items-center gap-4 cursor-pointer">

                      <input
                        type="radio"
                        name="payment"
                        value="cash_on_delivery"
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="radio radio-sm  checked:text-[#2765a8] checked:bg-white"
                      />

                      <div className="flex-1 border border-black/10 rounded-xl p-3 flex items-center gap-3 hover:border-[#2BB673] transition-all">

                        <div className="w-[135px] h-[60px] rounded-lg border border-black/10 bg-white flex items-center justify-center overflow-hidden">
                          <img
                            src="/src/assets/cash-on-delivery.avif"
                            alt="ssl"
                            className="w-full object-contain"
                          />
                        </div>

                        <div>
                          <h3 className="font-medium text-black/80"> Cash On Delivery </h3>
                        </div>

                      </div>
                    </label>
                  
                  
                    {/* SSL */}
                    <label className="flex items-center gap-4 cursor-pointer">

                      <input
                        type="radio"
                        name="payment"
                        value="sslcommerz"
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="radio radio-sm  checked:text-[#2765a8] checked:bg-white"
                      />

                      <div className="flex-1 border border-black/10 rounded-xl p-3 flex items-center gap-3 hover:border-[#2BB673] transition-all">

                        <div className="w-[135px] h-[60px] rounded-lg border border-black/10 bg-white flex items-center justify-center overflow-hidden">
                          <img
                            src="/src/assets/sslcommerz.avif"
                            alt="ssl"
                            className="w-full object-contain"
                          />
                        </div>

                        <div>
                          <h3 className="font-medium text-black/80"> SSLCOMMERZ </h3>
                        </div>

                      </div>
                    </label>

                    {/* bKash */}
                    <label className="flex items-center gap-4 cursor-pointer">

                      <input
                        type="radio"
                        name="payment"
                        value="bkash"
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="radio radio-sm checked:text-[#2765a8] checked:bg-white"
                      />

                      <div className="flex-1 border border-black/10 rounded-xl p-3 flex items-center gap-3 hover:border-[#2BB673] transition-all">

                        <div className="w-[135px] h-[60px] rounded-lg border border-black/10 bg-white flex items-center justify-center overflow-hidden">
                          <img
                            src="/src/assets/bkash.avif"
                            alt="bkash"
                            className="w-full object-contain"
                          />
                        </div>

                        <div>
                          <h3 className="font-medium text-black/80"> bKash </h3>
                        </div>

                      </div>
                    </label>

                  </div>
                </div>

                {/* Bill Section */}
                <div className='lg:col-span-4 hidden lg:block'>
                    <div className=' bg-white rounded-2xl border border-black/10 shadow-sm p-5 sticky top-5'>
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
                                    ৳ {pricing?.subtotal}
                                </span>
                            </div>
                            
                            
                            {
                              pricing?.discount > 0 ? 
                              <div className='flex justify-between items-center '>
                                  <p className='text-black/60'>
                                      Discount
                                  </p>
                                  <span className='font-bold text-red-600'>
                                      - ৳ {pricing?.discount}
                                  </span>
                              </div> : ''
                            }
                            
                            
                            {/* Sub Total */}
                            <div className='flex justify-between items-center border-b border-black/10 pb-4'>
                                <p className='text-black/60'>
                                    Shipping Charge
                                </p>
                                <span className='font-bold text-black/70'>
                                    ৳ {pricing?.shippingFee}
                                </span>
                            </div> 


                            {/* Total */}
                            <div className='flex justify-between items-center'>
                                <p className='font-bold text-lg text-black'>
                                    Total
                                </p> 
                                <span className='font-bold text-2xl text-black'>
                                    ৳ {pricing?.total} 
                                </span> 
                            </div> 
                        </div> 

                        <button 
                          onClick={handlePayment} 
                          className=' cursor-pointer w-full mt-6 py-3 rounded-xl  hover:bg-[#209C60] bg-[#2BB673] disabled:bg-black/8 disabled:text-black/30 duration-150 text-white font-bold text-base' 
                          disabled={paymentMethod === ''}> 
                            Go To Checkout 
                        </button> 
                    </div> 
                </div>

                {/* Bill */}
                <div className="lg:hidden bg-white rounded-2xl border border-black/10 shadow-sm overflow-hidden md:col-span-4">

                  <div className="px-4 py-3 border-b border-black/10">
                    <h2 className="font-bold text-sm text-black/80"> Your Bill </h2>
                  </div>

                  <div className="p-4 space-y-4 text-[16px]">

                    <div className="flex items-center justify-between">
                      <p className="text-black/75 text-sm">Sub-Total</p>

                      <span className="font-medium"> <span className="font-serif">৳</span>{pricing?.subtotal} </span>
                    </div>


                    {
                      pricing?.discount > 0 ? 
                      <div className="flex items-center justify-between">
                        <p className="text-black/75 text-sm">Discount</p>

                        <span className="font-medium"> <span className="font-serif">৳</span>{pricing?.discount} </span>
                      </div> : ''
                    }



                    <div className="flex items-center justify-between">
                      <p className="text-black/75 text-sm">Shipping Charge</p>

                      <span className="font-medium"> <span className="font-serif">৳</span>{pricing?.shippingFee}</span>
                    </div>

                    <div className="border-t border-black/10 pt-4 flex items-center justify-between">

                      <p className="font-bold text-sm text-black"> Total </p>

                      <span className="font-bold text-sm text-black"> <span className="font-serif">৳</span>{pricing?.total} </span>

                    </div>

                  </div>
                </div>
                
              </div>


            </div>


            <div className='fixed bg-white left-0 bottom-0 shadow-[0_-4px_5px_rgba(0,0,0,0.1)] shadow-black/20 z-10 w-full lg:hidden'>

                <div className='flex py-3 sm:py-4 w-11/12 sm:container mx-auto xl:!max-w-[1350px] justify-between items-center text-base sm:text-lg'>
                    <div className='flex items-center gap-1 font-semibold'>
                        <p className='text-black/50'>Total:</p>
                        <span className='font-bold text-black'><span className='font-serif text-[15px]'>৳ </span>{pricing?.total}</span>
                    </div>

                    <div>
                        <button 
                            onClick={handlePayment}
                            className='btn sm:text-base sm:px-18 hover:bg-[#209C60] bg-[#2BB673] text-white disabled:bg-black/8 disabled:text-black/30' 
                            disabled={paymentMethod === ''}
                        >
                          {loading ? 'Loading...' : 'Place Order'}
                        </button>
                    </div>
                </div>
            </div>
          </div>

          <Footer />
        </div>
    );
};

export default PaymentPage;