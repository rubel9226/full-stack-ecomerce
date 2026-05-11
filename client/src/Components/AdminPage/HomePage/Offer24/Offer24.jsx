import React, { useRef, useState } from 'react';

import { BsArrowRight } from "react-icons/bs";


// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';

// import './Offer.css';

// import required modules
import { FreeMode } from 'swiper/modules';

export default function Offer24() {
  const datas = [
    { price: 100, img: 'https://saralifestyle.com/_next/image?url=https%3A%2F%2Fprod.saralifestyle.com%2FImages%2FProducts%2Fthumbnail%2Fthumbnail_two%2F35eb0664ecaf47f29ec5c70dc49621d5.png&w=384&q=75', description: 'this product is vary dengarus. and I also love this product and we go this product area.', Available: 10, save: 100 },
    { price: 150, img: 'https://saralifestyle.com/_next/image?url=https%3A%2F%2Fprod.saralifestyle.com%2FImages%2FProducts%2Fthumbnail%2Fthumbnail_two%2F12f3249d9cbb4035adfb2c5deaa61975.png&w=384&q=75', description: 'Lorem ipsum 2this product is vary dengarus. and I also love this product and we go this product area.', Available: 15, save: 50 },
    { price: 200, img: 'https://saralifestyle.com/_next/image?url=https%3A%2F%2Fprod.saralifestyle.com%2FImages%2FProducts%2Fthumbnail%2Fthumbnail_two%2F12f3249d9cbb4035adfb2c5deaa61975.png&w=384&q=75', description: 'Lorem ipsum 3this product is vary dengarus. and I also love this product and we go this product area.', Available: 5, save: 70 },
    { price: 120, img: 'https://saralifestyle.com/_next/image?url=https%3A%2F%2Fprod.saralifestyle.com%2FImages%2FProducts%2Fthumbnail%2Fthumbnail_two%2F12f3249d9cbb4035adfb2c5deaa61975.png&w=384&q=75', description: 'Lorem ipsum 4this product is vary dengarus. and I also love this product and we go this product area.', Available: 12, save: 60 },
    { price: 900, img: 'https://saralifestyle.com/_next/image?url=https%3A%2F%2Fprod.saralifestyle.com%2FImages%2FProducts%2Fthumbnail%2Fthumbnail_two%2F12f3249d9cbb4035adfb2c5deaa61975.png&w=384&q=75', description: 'Lorem ipsum 5this product is vary dengarus. and I also love this product and we go this product area.', Available: 8, save: 30 },
    { price: 300, img: 'https://saralifestyle.com/_next/image?url=https%3A%2F%2Fprod.saralifestyle.com%2FImages%2FProducts%2Fthumbnail%2Fthumbnail_two%2F12f3249d9cbb4035adfb2c5deaa61975.png&w=384&q=75', description: 'Lorem ipsum 6this product is vary dengarus. and I also love this product and we go this product area.', Available: 20, save: 150 },
    { price: 250, img: 'https://saralifestyle.com/_next/image?url=https%3A%2F%2Fprod.saralifestyle.com%2FImages%2FProducts%2Fthumbnail%2Fthumbnail_two%2F12f3249d9cbb4035adfb2c5deaa61975.png&w=384&q=75', description: 'Lorem ipsum 7this product is vary dengarus. and I also love this product and we go this product area.', Available: 7, save: 80 },
    { price: 180, img: 'https://saralifestyle.com/_next/image?url=https%3A%2F%2Fprod.saralifestyle.com%2FImages%2FProducts%2Fthumbnail%2Fthumbnail_two%2F12f3249d9cbb4035adfb2c5deaa61975.png&w=384&q=75', description: 'Lorem ipsum 8this product is vary dengarus. and I also love this product and we go this product area.', Available: 14, save: 60 },
    { price: 750, img: 'https://saralifestyle.com/_next/image?url=https%3A%2F%2Fprod.saralifestyle.com%2FImages%2FProducts%2Fthumbnail%2Fthumbnail_two%2F12f3249d9cbb4035adfb2c5deaa61975.png&w=384&q=75', description: 'Lorem ipsum 9this product is vary dengarus. and I also love this product and we go this product area.', Available: 5, save: 25 },
    { price: 600, img: 'https://saralifestyle.com/_next/image?url=https%3A%2F%2Fprod.saralifestyle.com%2FImages%2FProducts%2Fthumbnail%2Fthumbnail_two%2F12f3249d9cbb4035adfb2c5deaa61975.png&w=384&q=75', description: 'Lorem ipsum 1this product is vary dengarus. and I also love this product and we go this product area.0', Available: 10, save: 20 },
  ];


  return (
    <>
      <section className="bg-[url('./images/offer-bg.webp')] py-6 bg-cover bg-center w-full transform mt-5 md:rounded-2xl">
        <div className="px-5">

            <div className="text-white font-bold uppercase flex gap-3">
                <h3 className='text-[12px] font-extrabold'>ends in </h3>
                    <div className="text-white space-x-2">  
                      <span className="bg-white text-[#5261AD] p-2 rounded-md">{'12'}</span>
                      : <span className="bg-white text-[#5261AD] p-2 rounded-md">{'24'}</span>
                      : <span className="bg-white text-[#5261AD] p-2 rounded-md">{'55'}</span>
                  </div>
                
            </div>
            
            <div className='text-white font-bold flex justify-between items-center'>
              <h3 className="text-xl mb-2 mt-5">Daily Deals</h3>
              <p className='text-sm flex items-center gap-1'>See More <BsArrowRight className='text-xl' /> </p>
            </div>
            <div>
              <Swiper
                spaceBetween={8}
                freeMode={true}
                centeredSlides={false}
                pagination={{
                  clickable: true,
                }}
                breakpoints={{
                  320: {
                      slidesPerView: 2.1695,
                  },
                  640: {
                      slidesPerView: 3.5,
                  },
                  768: {
                      slidesPerView: 4.5,
                  },
                  1024: {
                      slidesPerView: 5,
                  },
                  1280: {
                      slidesPerView: 6,
                  },
                }}
                modules={[FreeMode]}
                className="mySwiper"
              >
                <div>
                  {datas.map((d) => {
                    return (
                      <SwiperSlide className='rounded-md min-h-70 bg-white'>
                       
                            <div className="relative">
                                <p className="absolute bg-red-600 text-white text-[12px] px-2 top-2 rounded-r-md">Save <span className='text-[16px] font-bold leading-0'>৳</span> <span className='font-bold'>400</span></p>
                                <img className="rounded-t-md w-full aspect-square" src={d.img} alt=""></img>
                            </div>
                            <div className=" px-2 text-center">
                              <div className='flex gap-2 mt-1 justify-center'>
                                <p className='font-bold '><span className='leading-0 font-serif'>৳</span> {d.price}</p>
                                <p className='font-bold old-price'><span className='leading-0 font-serif'>৳</span> 1890</p>
                              </div>
                               <div className="inline-block w-3 h-3 rounded-sm bg-[#5261AD]"></div>
                                <p className='line-clamp-2 text-[12px] leading-4 font-semibold text-black/60'>Description: {d.description}</p>
                                <div className="w-full h-1.5 rounded-full bg-[#1F5DA0] mt-1"></div>
                                <p className='font-bold text-black/50 text-sm mt-0.5'>Available: <span className='text-blue-700 font-semibold'>{d.Available}</span></p>
                            </div>
                      </SwiperSlide>
                        

                    )
                })}
                </div>
                
                {/* <SwiperSlide className='min-h-40 bg-indigo-200'>Slide 2</SwiperSlide> */}
                {/* <SwiperSlide className='min-h-40 bg-indigo-200'>Slide 3</SwiperSlide> */}
                {/* <SwiperSlide className='min-h-40 bg-indigo-200'>Slide 4</SwiperSlide> */}
                {/* <SwiperSlide className='min-h-40 bg-indigo-200'>Slide 5</SwiperSlide> */}
                {/* <SwiperSlide className='min-h-40 bg-indigo-200'>Slide 6</SwiperSlide> */}
                {/* <SwiperSlide className='min-h-40 bg-indigo-200'>Slide 7</SwiperSlide> */}
                {/* <SwiperSlide className='min-h-40 bg-indigo-200'>Slide 8</SwiperSlide> */}
                {/* <SwiperSlide className='min-h-40 bg-indigo-200'>Slide 9</SwiperSlide> */}
              </Swiper>
            </div>
            
        </div>
    </section>


    

    </>
  );
}
