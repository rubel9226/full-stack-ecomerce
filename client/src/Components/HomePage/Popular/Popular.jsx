import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './Popular.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import api from '../../../API/Axios/api';
import { Link } from 'react-router';




export default function Popular() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true); 

    const handleGetPopularSection =async () => {
      setLoading(true);
        try {
            const res = await api.get('/categories/popular/get-popular');            
            setCategories(res?.data?.payload);
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
    <>
    <div>
        <h1 className='text-xl font-bold md:text-2xl lg:text-3xl mt-4 mb-2 md:mt-6 md:mb-4 xl:mt-8 xl:mb-6'>Popular Category</h1>
        {
            loading ? <Swiper loop={true} navigation={true} pagination={{ clickable: true }} autoplay={{ delay: 5000, disableOnInteraction: false, }} spaceBetween={5} breakpoints={{ 320: { slidesPerView: 3, slidesPerGroup: 1, }, 640: { slidesPerView: 4, slidesPerGroup: 2, }, 768: { slidesPerView: 5, slidesPerGroup: 3, }, 1024: { slidesPerView: 7, slidesPerGroup: 3, }, 1280: { slidesPerView: 9, slidesPerGroup: 3}}} modules={[ Autoplay]} className="mySwiper w-full">
                {
                    Array(12).fill().map((_, index) => (
                        <SwiperSlide key={index} className='text-center z-0 animate-pulse' >
                            <div className='rounded-full h-22 w-22 sm:h-28 sm:w-28 md:h-32 md:w-32 lg:w-34 lg:h-34 inline-block bg-gray-200' />
                            <div className='flex justify-center mt-2'>
                                <div className='h-4 w-20 bg-gray-200 rounded-md' />
                            </div> 
                        </SwiperSlide>
                    ))
                }

            </Swiper> 
            :
            <Swiper
                loop={true}
                navigation={true}
                pagination={{ clickable: true }}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                spaceBetween={5}
                breakpoints={{
                    320: {
                        slidesPerView: 3,
                        slidesPerGroup: 1,
                    },
                    640: {
                        slidesPerView: 4,
                        slidesPerGroup: 2,
                    },
                    768: {
                        slidesPerView: 5,
                        slidesPerGroup: 3,
                    },
                    1024: {
                        slidesPerView: 7,
                        slidesPerGroup: 3,
                    },
                    1280: {
                        slidesPerView: 9,
                        slidesPerGroup: 3,
                    },
                }}
                modules={[ Autoplay]}
                className="mySwiper w-full" 
            >

                {
                    categories.map((category, index) => {
                        return (
                            <SwiperSlide key={index} className='text-center z-0'>
                                <Link to={`catalog/${category?.slug}`} className='group'>
                                    <div className='group-hover:shadow-xl sm:group-hover:shadow-2xl shadow-indigo-600/20 rounded-full h-22 w-22 sm:h-28 sm:w-28 md:h-32 md:w-32 lg:w-34 lg:h-34 inline-block bg-blue-50'>
                                        <img className='w-full aspect-square rounded-full' src={category?.image} alt="" />
                                    </div>
                                    <p className='capitalize font-semibold group-hover:text-indigo-600'>{category?.name}</p>
                                </Link>

                            </SwiperSlide>
                        )
                    })
                } 
            </Swiper>
        }
    </div>
    </>
  );
}

                        // <div className="shrink-0">
                        //     <img className="mx-auto rounded-full" src={data.img} alt="" />
                        //     <p>{data.name}</p>
                        // </div>


