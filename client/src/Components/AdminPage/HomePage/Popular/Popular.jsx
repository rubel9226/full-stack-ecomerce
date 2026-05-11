import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './Popular.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';




export default function Popular() {

const datas = [
    {
        name: "Mens Casual Shirt",
        img: 'https://saralifestyle.com/_next/image?url=https%3A%2F%2Fprod.saralifestyle.com%2FImages%2FProducts%2FCategoryImage%2Faddab294edc34db79e91882dae03b420.png&w=384&q=75',
    },
    {
        name: "Footwear",
        img: 'https://saralifestyle.com/_next/image?url=https%3A%2F%2Fprod.saralifestyle.com%2FImages%2FProducts%2FCategoryImage%2Fba3fde8ada16409e88681661fc1ec574.jpeg&w=384&q=75',
    },
    {
        name: "Men's Pro",
        img: 'https://saralifestyle.com/_next/image?url=https%3A%2F%2Fprod.saralifestyle.com%2FImages%2FProducts%2FCategoryImage%2F1cce1a276c674fdaba5e41c4a3e8d1ec.jpeg&w=384&q=75',
    },
    {
        name: "Men's Polo",
        img: 'https://saralifestyle.com/_next/image?url=https%3A%2F%2Fprod.saralifestyle.com%2FImages%2FProducts%2FCategoryImage%2F2f4561fd57424e119dd68756073b6312.jpeg&w=384&q=75',
    },
    {
        name: "Kids Winter Collection",
        img: 'https://saralifestyle.com/_next/image?url=https%3A%2F%2Fprod.saralifestyle.com%2FImages%2FProducts%2FCategoryImage%2F59d8af0e45ac45c0a7433f7bb9ee5e92.jpeg&w=384&q=75',
    },
    {
        name: "Women's Top Wear",
        img: 'https://saralifestyle.com/_next/image?url=https%3A%2F%2Fprod.saralifestyle.com%2FImages%2FProducts%2FCategoryImage%2F8ba59269d5d14aaab62fecda9315ab89.jpeg&w=384&q=75',
    },
    {
        name: "Smart Watches",
        img: 'https://saralifestyle.com/_next/image?url=https%3A%2F%2Fprod.saralifestyle.com%2FImages%2FProducts%2FCategoryImage%2F1955ff0707954ac09d5b2ab1bf42013d.jpeg&w=384&q=75',
    },
    {
        name: "In-Ear/Earbuds",
        img: 'https://saralifestyle.com/_next/image?url=https%3A%2F%2Fprod.saralifestyle.com%2FImages%2FProducts%2FCategoryImage%2Ffa3d44d7fd364c0bb37385441d9f7e54.jpeg&w=384&q=75',
    },
    {
        name: "Mens Chino Pant",
        img: 'https://saralifestyle.com/_next/image?url=https%3A%2F%2Fprod.saralifestyle.com%2FImages%2FProducts%2FCategoryImage%2F02e7a2a4b5824987a926185a0a8d4ee9.jpeg&w=384&q=75',
    },
    {
        name: "Hair Dryers",
        img: 'https://saralifestyle.com/_next/image?url=https%3A%2F%2Fprod.saralifestyle.com%2FImages%2FProducts%2FCategoryImage%2F1bfd601f3f1f44cb86f99cae7c832f68.jpeg&w=384&q=75',
    },
    {
        name: "Men's Panjabi",
        img: 'https://saralifestyle.com/_next/image?url=https%3A%2F%2Fprod.saralifestyle.com%2FImages%2FProducts%2FCategoryImage%2F2c6d459d3a0249f5834645986afbe9e4.jpeg&w=384&q=75',
    },
];


  return (
    <>
    <div>
        <h1 className='text-xl font-bold md:text-2xl lg:text-3xl mt-4 mb-2 md:mt-6 md:mb-4 xl:mt-8 xl:mb-6'>Popular Category</h1>
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
                datas.map((data, index) => {
                    return (
                        <SwiperSlide key={index} className='text-center z-0'>
                            <img className='rounded-full h-22 w-22 sm:h-28 sm:w-28 md:h-32 md:w-32 lg:w-34 lg:h-34 inline-block' src={data.img} alt="" />
                            <p className='font-semibold'>{data.name}</p>
                        </SwiperSlide>
                    )
                })
            }


        
            {/* <SwiperSlide>
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
            </SwiperSlide> */}

        </Swiper>
    </div>
    </>
  );
}

                        // <div className="shrink-0">
                        //     <img className="mx-auto rounded-full" src={data.img} alt="" />
                        //     <p>{data.name}</p>
                        // </div>


