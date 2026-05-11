import React, { useRef, useState } from "react";

import { BsArrowRight } from "react-icons/bs";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";

import "../../NewCollection/NewCollection.css";

// import required modules
import { FreeMode } from "swiper/modules";

export default function Headphone() {
  const datas = [
    {
      price: 100,
      img: "https://saralifestyle.com/_next/image?url=https%3A%2F%2Fprod.saralifestyle.com%2FImages%2FProducts%2Fthumbnail%2Fthumbnail_two%2F6b5a198bf8244b5883d1b631a71ef7b8.png&w=384&q=75",
      description:
        "this product is vary dengarus. and I also love this product and we go this product area.",
      Available: 10,
      save: 100,
    },
    {
      price: 150,
      img: "https://saralifestyle.com/_next/image?url=https%3A%2F%2Fprod.saralifestyle.com%2FImages%2FProducts%2Fthumbnail%2Fthumbnail_two%2F401f99fdde2a42a99bf9f8f897203219.png&w=384&q=75",
      description:
        "Lorem ipsum 2this product is vary dengarus. and I also love this product and we go this product area.",
      Available: 15,
      save: 50,
    },
    {
      price: 200,
      img: "https://saralifestyle.com/_next/image?url=https%3A%2F%2Fprod.saralifestyle.com%2FImages%2FProducts%2Fthumbnail%2Fthumbnail_two%2Ffa726d45b64f47258646ff8f8af9ed76.png&w=384&q=75",
      description:
        "Lorem ipsum 3this product is vary dengarus. and I also love this product and we go this product area.",
      Available: 5,
      save: 70,
    },
    {
      price: 120,
      img: "https://saralifestyle.com/_next/image?url=https%3A%2F%2Fprod.saralifestyle.com%2FImages%2FProducts%2Fthumbnail%2Fthumbnail_two%2F4677af3c9c044ec5b4b366043fe591e9.jpeg&w=384&q=75",
      description:
        "Lorem ipsum 4this product is vary dengarus. and I also love this product and we go this product area.",
      Available: 12,
      save: 60,
    },
    {
      price: 900,
      img: "https://saralifestyle.com/_next/image?url=https%3A%2F%2Fprod.saralifestyle.com%2FImages%2FProducts%2Fthumbnail%2Fthumbnail_two%2F7282cd9dc8d74d5a8da9d0b2e182fa1a.png&w=384&q=75",
      description:
        "Lorem ipsum 5this product is vary dengarus. and I also love this product and we go this product area.",
      Available: 8,
      save: 30,
    },
    {
      price: 300,
      img: "https://saralifestyle.com/_next/image?url=https%3A%2F%2Fprod.saralifestyle.com%2FImages%2FProducts%2Fthumbnail%2Fthumbnail_two%2F624994e704ae4471a1db24449a747dd3.png&w=384&q=75",
      description:
        "Lorem ipsum 6this product is vary dengarus. and I also love this product and we go this product area.",
      Available: 20,
      save: 150,
    },
    {
      price: 250,
      img: "https://saralifestyle.com/_next/image?url=https%3A%2F%2Fprod.saralifestyle.com%2FImages%2FProducts%2Fthumbnail%2Fthumbnail_two%2F895e254b74344b3681c6e2ca236e22bf.png&w=384&q=75",
      description:
        "Lorem ipsum 7this product is vary dengarus. and I also love this product and we go this product area.",
      Available: 7,
      save: 80,
    },
    {
      price: 180,
      img: "https://saralifestyle.com/_next/image?url=https%3A%2F%2Fprod.saralifestyle.com%2FImages%2FProducts%2Fthumbnail%2Fthumbnail_two%2Fbcb992d86e2149b3ade268d050d1843a.jpeg&w=384&q=75",
      description:
        "Lorem ipsum 8this product is vary dengarus. and I also love this product and we go this product area.",
      Available: 14,
      save: 60,
    },
    {
      price: 750,
      img: "https://saralifestyle.com/_next/image?url=https%3A%2F%2Fprod.saralifestyle.com%2FImages%2FProducts%2Fthumbnail%2Fthumbnail_two%2Ff2d75f96495c4422a51624083bc27f31.jpeg&w=384&q=75",
      description:
        "Lorem ipsum 9this product is vary dengarus. and I also love this product and we go this product area.",
      Available: 5,
      save: 25,
    },
    {
      price: 600,
      img: "https://saralifestyle.com/_next/image?url=https%3A%2F%2Fprod.saralifestyle.com%2FImages%2FProducts%2Fthumbnail%2Fthumbnail_two%2Ff2d75f96495c4422a51624083bc27f31.jpeg&w=384&q=75",
      description:
        "Lorem ipsum 1this product is vary dengarus. and I also love this product and we go this product area.0",
      Available: 10,
      save: 20,
    },
  ];

  return (
    <>
      <section className="bg-[#F4F4FB] bg-cover bg-center w-full transform my-3 md:rounded-2xl">
        <Swiper
          spaceBetween={8}
          freeMode={true}
          centeredSlides={false}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            320: { slidesPerView: 2.1695 },
            640: { slidesPerView: 3.5 },
            768: { slidesPerView: 4.5 },
            1024: { slidesPerView: 5 },
            1280: { slidesPerView: 6 },
          }}
          modules={[FreeMode]}
          className="mySwiper"
        >
          <div>
            {datas.map((d) => {
              return (
                <SwiperSlide className="rounded-md py-3 bg-white relative">
                  <div className="">
                    <p className="absolute bg-red-600 text-white text-[12px] px-2 top-2 rounded-r-md">
                      Save{" "}
                      <span className="text-[16px] font-bold leading-0">৳</span>{" "}
                      <span className="font-bold">400</span>
                    </p>
                    <img
                      className="rounded-t-md w-full aspect-square"
                      src={d.img}
                      alt=""
                    ></img>
                  </div>
                  <div className=" px-2 text-center">
                    <div className="flex gap-2 mt-1 justify-center">
                      <p className="font-bold ">
                        <span className="leading-0 font-serif">৳</span>{" "}
                        {d.price}
                      </p>
                      <p className="font-bold old-price">
                        <span className="leading-0 font-serif">৳</span> 1890
                      </p>
                    </div>
                    <div className="inline-block w-3 h-3 rounded-sm bg-[#5261AD]"></div>
                    <p className="overflow-hidden h-8 text-[12px] leading-4 font-semibold text-black/60">
                      Description: {d.description}
                    </p>
                  </div>
                </SwiperSlide>
              );
            })}
          </div>
        </Swiper>
        
        <div className="text-center flex justify-center pt-8">
          <p className="text-sm font-semibold flex items-center gap-1 text-blue-800/90">
            See More <BsArrowRight className="text-xl" />{" "}
          </p>
        </div>
      </section>
    </>
  );
}
