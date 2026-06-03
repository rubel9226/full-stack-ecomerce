import React, { useEffect, useState } from 'react';

import { BsArrowRight } from "react-icons/bs";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';

// import './Offer.css';

// import required modules
import { FreeMode } from 'swiper/modules';
import api from '../../../API/Axios/api';
import { Link } from 'react-router';

export default function Offer24() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // countdown state
  const [timeLeft, setTimeLeft] = useState({
    hours: 24,
    minutes: 0,
    seconds: 0,
  });

    // Countdown Timer
    useEffect(() => { 
      const updateCountdown = () => { 
        const now = new Date(); 
        
        const tomorrowMidnight = new Date(); 
        tomorrowMidnight.setHours(24, 0, 0, 0); 
        
        const difference = tomorrowMidnight - now;
        
        const hours = Math.floor(
          (difference / (1000 * 60 * 60)) % 24
        );
        
        const minutes = Math.floor(
          (difference / (1000 * 60)) % 60
        );
        
        const seconds = Math.floor(
          (difference / 1000) % 60
        );

        setTimeLeft({
          hours,
          minutes,
          seconds,
        });

      };
      
      updateCountdown();
      
      const interval = setInterval(updateCountdown, 1000);

      return () => clearInterval(interval);

    }, []);

  const handleGetPopularSection = async () => {
    setLoading(true);

    try {
      const res = await api.get(
        '/products/home-sections/all-product?section=dailyOffer'
      );

      setProducts(res?.data?.payload);
    } catch (error) {
      console.log(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetPopularSection();
  }, []);

  return (
    <section className="select-none bg-[url('./images/offer-bg.webp')] bg-cover bg-center w-full mt-5 md:rounded-2xl">

      <div className="px-4 py-5 sm:px-5 md:px-7 lg:px-10 xl:px-14 lg:py-8">

        <div className='text-white font-bold flex justify-between items-end xl:items-center mt-4 xl:mt-0 xl:mb-2.5'> 
          <div className='flex flex-col-reverse items-start mb-3 sm:mb-4 gap-4 xl:flex-row xl:items-center xl:gap-15'>
            <h3 className="text-xl font-bold md:text-2xl lg:text-3xl ">
              Daily Deals
            </h3>

            <div className="text-white font-bold uppercase flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">

              <h3 className='text-[10px] sm:text-[12px] md:text-sm lg:text-base font-extrabold whitespace-nowrap'>
                ends in
              </h3>

              <div className="text-white flex items-center gap-1 sm:gap-2">

                <span className="bg-white text-[#5261AD] min-w-[30px] sm:min-w-[35px] md:min-w-[42px] text-center px-1 py-1 sm:px-2 sm:py-1.5 rounded-md text-[10px] sm:text-sm md:text-base">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>

                <span className="text-xs sm:text-sm md:text-base">:</span>

                <span className="bg-white text-[#5261AD] min-w-[30px] sm:min-w-[35px] md:min-w-[42px] text-center px-1 py-1 sm:px-2 sm:py-1.5 rounded-md text-[10px] sm:text-sm md:text-base">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>

                <span className="text-xs sm:text-sm md:text-base">:</span>

                <span className="bg-white text-[#5261AD] min-w-[30px] sm:min-w-[35px] md:min-w-[42px] text-center px-1 py-1 sm:px-2 sm:py-1.5 rounded-md text-[10px] sm:text-sm md:text-base">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>

              </div>

            </div>

          </div>
          

          <div className='mb-4 xl:mb-0'>
            <Link to={'best-deals'} className='text-sm font-semibold md:text-base xl:text-xl flex items-center gap-0.5 md:gap-1 cursor-pointer'> 
              See More 
              <BsArrowRight className='text-lg md:text-xl xl:text-3xl' /> 
            </Link>
          </div>
        </div>

        {
          loading ? <Swiper freeMode={true} centeredSlides={false} modules={[FreeMode]} className="mySwiper" breakpoints={{ 320: { slidesPerView: 2.15, spaceBetween: 8, }, 480: { slidesPerView: 2.3, spaceBetween: 8, }, 640: { slidesPerView: 3.2, spaceBetween: 8, }, 768: { slidesPerView: 4.2, spaceBetween: 12, }, 1024: { slidesPerView: 5, spaceBetween: 12, }, 1280: { slidesPerView: 6, spaceBetween: 16, }}} >
            {
              Array(8).fill().map((_, index) => (
                <SwiperSlide key={index} className="rounded-md overflow-hidden bg-white h-auto animate-pulse" > 

                  <div className="relative"> 
                    <div className="absolute top-2 sm:top-3 left-0 w-16 h-5 bg-gray-300 rounded-r-md z-10"></div> 
                    <div className="w-full aspect-square bg-gray-300"></div> 
                  </div> 

                  <div className="px-2 py-2 sm:px-3 sm:py-3 text-center"> 
                    <div className="flex justify-center items-center gap-2 mt-2">
                      <div className="h-4 w-16 bg-gray-300 rounded"></div>
                      <div className="h-3 w-12 bg-gray-200 rounded"></div>
                    </div>

                    <div className="inline-block w-3 h-3 rounded-sm bg-gray-300 mt-2"></div>

                    <div className="mt-2 space-y-2 flex flex-col items-center">
                      <div className="h-3 w-full bg-gray-200 rounded"></div>
                      <div className="h-3 w-4/5 bg-gray-200 rounded"></div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-gray-200 flex justify-center">
                      <div className="h-3 w-24 bg-gray-300 rounded"></div>
                    </div>

                  </div> 
                </SwiperSlide>
              ))
            }
            </Swiper> 
            :
            <Swiper
              freeMode={true}
              centeredSlides={false}
              modules={[FreeMode]}
              className="mySwiper"
              breakpoints={{
                320: {
                  slidesPerView: 2.15,
                  spaceBetween: 8,
                }, 
                480: {
                  slidesPerView: 2.3,
                  spaceBetween: 8,
                }, 
                640: {
                  slidesPerView: 3.2,
                  spaceBetween: 8,
                }, 
                768: {
                  slidesPerView: 4.2,
                  spaceBetween: 12,
                }, 
                1024: {
                  slidesPerView: 5,
                  spaceBetween: 12,
                }, 
                1280: {
                  slidesPerView: 6,
                  spaceBetween: 16,
                },
              }}
            >

              {products.map((product, index) => (
                <SwiperSlide
                  key={index}
                  className='rounded-md overflow-hidden bg-white h-auto'
                >
                  <Link to={`product/${product.slug}`} className=''>
                    {/* Image */}
                    <div className="relative">

                      {
                        product?.discount ?
                        <p className="absolute bg-red-600 text-white text-[10px] sm:text-[12px] px-2 top-2 sm:top-3 rounded-r-md z-10">
                          Save
                          <span className='text-xs sm:text-sm font-bold ml-1'>
                            ৳
                          </span>
                          <span className='font-bold'>
                            {product.discount}
                          </span>
                        </p>
                        : ''
                      }


                      <img
                        className="rounded-t-md w-full aspect-square object-cover"
                        src={product.image}
                        alt=""
                      />

                    </div>

                    {/* Content */}
                    <div className="px-2 py-2 sm:px-3 sm:py-3 text-center">

                            {/* Price */}
                            <div className='whitespace-nowrap flex gap-1 sm:gap-2 mt-1 justify-center items-center'>

                              <p className='font-bold text-sm sm:text-base whitespace-nowrap'>
                                <span className='font-serif'>
                                  ৳
                                </span>
                                {product.newPrice}
                              </p>
                              {
                                product?.discount ? 
                                <p className='font-bold old-price text-xs sm:text-sm text-black/50 line-through'>
                                  <span className='font-serif'>
                                    ৳
                                  </span>
                                  {product.price}
                                </p> 
                                : ''
                              }


                            </div>

                            { 
                              product?.variants?.color &&
                              <div style={{ backgroundColor: product?.variants?.color }} className={`inline-block w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-sm mt-1`} />
                            }
                            {/* Description */}
                            <p className='line-clamp-2 text-[10px] sm:text-[12px] leading-4 font-semibold text-black/60 mt-1'>

                              Description: {product.description}

                            </p>

                            {/* Available */}
                            <p className='font-bold text-black/50 text-[11px] sm:text-sm mt-2 pt-2 border-[#1F5DA0] border-t'>

                              Available:

                              <span className='text-blue-700 font-semibold ml-1'>
                                {product.quantity}
                              </span>

                            </p>

                    </div>
                  </Link> 
                </SwiperSlide>
              ))} 
            </Swiper>
          } 
      </div> 
    </section>
  );
}