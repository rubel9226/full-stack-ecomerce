import React, { useEffect, useRef, useState } from 'react';

import { BsArrowRight } from "react-icons/bs";


// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';

import '../../NewCollection/NewCollection.css';

// import required modules
import { FreeMode } from 'swiper/modules';
import api from '../../../../API/Axios/api';
import { Link } from 'react-router';

export default function BagsLuggage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); 

  const handleGetPopularSection =async () => {
    setLoading(true);
      try {
          const res = await api.get('/products/home-sections/all-product?section=bagsLuggage');            
          setProducts(res?.data?.payload);
          console.log(res)
      } catch (error) {
          // 
          console.log(error?.response?.data?.message);
      } finally{
        setLoading(false);
      }
  }

    useEffect(() => {
        handleGetPopularSection();
    }, []);  


  return (
    <section className="bg-[#F4F4FB] w-full my-3 md:rounded-2xl py-4">

      <div className=''>
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
                    <div className="h-[21px] w-full bg-gray-200 rounded"></div>
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

            {products.map((product, index) => {

              return (

                <SwiperSlide
                  key={index}
                  className='rounded-md overflow-hidden bg-white relative pb-2 sm:pb-3'
                >
                  <Link to={`product/${product.slug}`}>
                    {/* Image */}
                    <div className='flex items-center'>

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
                        alt={product.name}
                      />

                    </div>

                    {/* Content */}
                    <div className="px-2 sm:px-3 text-center mt-2">

                      {/* Price */}
                        <div className='whitespace-nowrap flex gap-1 sm:gap-2 mt-1 justify-center items-center'>

                          <p className='font-bold text-sm sm:text-base whitespace-nowrap'>
                            <span className='font-serif'>
                              ৳
                            </span>
                            {product.newPrice}
                          </p>

                          {
                            product?.discount ? <p className='font-bold old-price text-xs sm:text-sm text-black/50 line-through'>
                              <span className='font-serif'>
                                ৳
                              </span>
                              {product.price}
                            </p> : ''
                          } 
                        </div>

                      { 
                        product?.variants?.color &&
                        <div style={{ backgroundColor: product?.variants?.color }} className={`inline-block w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-sm mt-1`} />
                      }

                      {/* Description */}
                      <p className='line-clamp-2 min-h-8 text-[10px] sm:text-[12px] leading-4 font-semibold text-black/60 mt-1'>

                        Description: {product.description}

                      </p>

                    </div>
                  </Link>
                </SwiperSlide>

              )
            })}

          </Swiper>
        }

        {/* Button */}
        <div className='text-center flex justify-center pt-6 sm:pt-8 lg:hidden'>

          <div className='text-blue-800/90'>
            <Link to={'catalog/bags-and-luggage'} className='text-sm font-semibold md:text-base xl:text-xl flex items-center gap-0.5 md:gap-1 cursor-pointer'> 
              See More 
              <BsArrowRight className='text-lg md:text-xl xl:text-3xl' /> 
            </Link>
          </div> 

        </div>

      </div>

    </section>
  );
}
