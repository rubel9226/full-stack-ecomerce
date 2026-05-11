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

export default function ShaveTrim() {
  const datas = [
    {
      price: 100,
      img: "https://saralifestyle.com/_next/image?url=https%3A%2F%2Fprod.saralifestyle.com%2FImages%2FProducts%2Fthumbnail%2Fthumbnail_two%2F9bd257daf95c4d489711bbf2869d6c69.png&w=750&q=75",
      description:
        "this product is vary dengarus. and I also love this product and we go this product area.",
      Available: 10,
      save: 100,
    },
    {
      price: 150,
      img: "https://saralifestyle.com/_next/image?url=https%3A%2F%2Fprod.saralifestyle.com%2FImages%2FProducts%2Fthumbnail%2Fthumbnail_two%2Faf48c283936b413f861ab4f61db5912b.png&w=750&q=75",
      description:
        "Lorem ipsum 2this product is vary dengarus. and I also love this product and we go this product area.",
      Available: 15,
      save: 50,
    },
    {
      price: 200,
      img: "https://saralifestyle.com/_next/image?url=https%3A%2F%2Fprod.saralifestyle.com%2FImages%2FProducts%2Fthumbnail%2Fthumbnail_two%2Fe051744d929e4fbebf7e3a1e57930a59.png&w=750&q=75",
      description:
        "Lorem ipsum 3this product is vary dengarus. and I also love this product and we go this product area.",
      Available: 5,
      save: 70,
    },
    {
      price: 120,
      img: "https://saralifestyle.com/_next/image?url=https%3A%2F%2Fprod.saralifestyle.com%2FImages%2FProducts%2Fthumbnail%2Fthumbnail_two%2F511de05300304769baaed94eaf2cdf4f.png&w=750&q=75",
      description:
        "Lorem ipsum 4this product is vary dengarus. and I also love this product and we go this product area.",
      Available: 12,
      save: 60,
    },
    {
      price: 900,
      img: "https://saralifestyle.com/_next/image?url=https%3A%2F%2Fprod.saralifestyle.com%2FImages%2FProducts%2Fthumbnail%2Fthumbnail_two%2F511de05300304769baaed94eaf2cdf4f.png&w=750&q=75",
      description:
        "Lorem ipsum 5this product is vary dengarus. and I also love this product and we go this product area.",
      Available: 8,
      save: 30,
    },
    {
      price: 300,
      img: "https://saralifestyle.com/_next/image?url=https%3A%2F%2Fprod.saralifestyle.com%2FImages%2FProducts%2Fthumbnail%2Fthumbnail_two%2F359347df751f4f5bb691cd25ed8959cf.jpeg&w=750&q=75",
      description:
        "Lorem ipsum 6this product is vary dengarus. and I also love this product and we go this product area.",
      Available: 20,
      save: 150,
    },
    {
      price: 250,
      img: "https://saralifestyle.com/_next/image?url=https%3A%2F%2Fprod.saralifestyle.com%2FImages%2FProducts%2Fthumbnail%2Fthumbnail_two%2F14816e2059de42ce8cff9039b14bf345.png&w=750&q=75",
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
