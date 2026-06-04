import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './HeroSlideImg.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import api from '../../../API/Axios/api';

export default function HeroSlideImg() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const handleGetImage = async () => {
        try {
            const res = await api.get('/images/get/slide');
            setImages(res?.data?.payload);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        handleGetImage();
    }, []);

 
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper rounded-xl w-3/3 overflow-visible"
      > 
        {
        images.length === 0
            ? [...Array(4)].map((_, index) => (
                <SwiperSlide key={index}>

                    <div className='w-full aspect-[1.776666666666667] lg:aspect-[1.8] xl:aspect-[1.776666666666667] rounded-xl overflow-hidden bg-gray-200 animate-pulse relative'>

                        {/* shimmer effect */}
                        <div className='absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-linear-to-r from-transparent via-white/40 to-transparent'></div>

                    </div>

                </SwiperSlide>
            ))

            : images.map((image, index) => (
                <SwiperSlide key={index}>
                    <img
                        className='w-full aspect-[1.776666666666667] lg:aspect-[1.8] xl:aspect-[1.776666666666667] object-cover'
                        src={image?.image}
                        alt="banner"
                    />
                </SwiperSlide>
            ))  
          }     
      </Swiper>
    </>
  );
}