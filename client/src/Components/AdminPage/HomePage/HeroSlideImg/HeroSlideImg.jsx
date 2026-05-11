import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './HeroSlideImg.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function HeroSlideImg() {


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
        className="mySwiper rounded-xl w-3/3"
      >
        <SwiperSlide>
            <img src="https://saralifestyle.com/_next/image?url=https%3A%2F%2Fprod.saralifestyle.com%2FImages%2FContent%2Ff5ee353ee2b646b8a8efa2361f37565a.jpeg&w=1080&q=75" alt="" />
        </SwiperSlide>
        <SwiperSlide>
            <img src="https://saralifestyle.com/_next/image?url=https%3A%2F%2Fprod.saralifestyle.com%2FImages%2FContent%2Fa026b2c6754a4652a1964e3f6aa6a1cb.jpeg&w=1080&q=75" alt="" />
        </SwiperSlide>
        <SwiperSlide>
            <img src="https://saralifestyle.com/_next/image?url=https%3A%2F%2Fprod.saralifestyle.com%2FImages%2FContent%2F37244083bb7b4899ae315707d0c8415f.png&w=1080&q=75" alt="" />
        </SwiperSlide>
        <SwiperSlide>
            <img src="https://saralifestyle.com/_next/image?url=https%3A%2F%2Fprod.saralifestyle.com%2FImages%2FContent%2Ff5ee353ee2b646b8a8efa2361f37565a.jpeg&w=1080&q=75" alt="" />
        </SwiperSlide>
        <SwiperSlide>
            <img src="https://saralifestyle.com/_next/image?url=https%3A%2F%2Fprod.saralifestyle.com%2FImages%2FContent%2Fa026b2c6754a4652a1964e3f6aa6a1cb.jpeg&w=1080&q=75" alt="" />
        </SwiperSlide>
        <SwiperSlide>
            <img src="https://saralifestyle.com/_next/image?url=https%3A%2F%2Fprod.saralifestyle.com%2FImages%2FContent%2F37244083bb7b4899ae315707d0c8415f.png&w=1080&q=75" alt="" />
        </SwiperSlide>
        <SwiperSlide>
            <img src="https://saralifestyle.com/_next/image?url=https%3A%2F%2Fprod.saralifestyle.com%2FImages%2FContent%2Ff5ee353ee2b646b8a8efa2361f37565a.jpeg&w=1080&q=75" alt="" />
        </SwiperSlide>
        <SwiperSlide>
            <img src="https://saralifestyle.com/_next/image?url=https%3A%2F%2Fprod.saralifestyle.com%2FImages%2FContent%2Fa026b2c6754a4652a1964e3f6aa6a1cb.jpeg&w=1080&q=75" alt="" />
        </SwiperSlide>
        <SwiperSlide>
            <img src="https://saralifestyle.com/_next/image?url=https%3A%2F%2Fprod.saralifestyle.com%2FImages%2FContent%2F37244083bb7b4899ae315707d0c8415f.png&w=1080&q=75" alt="" />
        </SwiperSlide>
        
        
      </Swiper>
    </>
  );
}