import React, { useEffect, useRef, useState } from 'react';

import { BsArrowRight } from "react-icons/bs";


// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';

import './style.css';

// import required modules
import { FreeMode } from 'swiper/modules';
import { toast } from 'react-toastify';
import api from '../../../../API/Axios/api';
import { RiDeleteBin2Line } from 'react-icons/ri';

export default function NewCollection() { 

  const [products, setProducts] = useState([]);
    const [loadingId, setLoadingId] = useState(null);

    const handleGetPopularSection =async () => {
        try {
            const res = await api.get('/products/home-sections/all-product?section=newCollection');
            setProducts(res?.data?.payload);
        } catch (error) {
            // 
        }
    }

    useEffect(() => {
        handleGetPopularSection();
    }, []);


  return (
<section className="py-5 bg-[#F4F4FB] w-full my-5 md:rounded-2xl">

  <div className="px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10">

    {/* Header */}
    <div className='text-black/90 font-semibold flex justify-between items-center mb-3'>

      <h3 className="font-semibold text-lg sm:text-xl md:text-2xl xl:text-3xl 2xl:text-[32px] capitalize">

        New Collection

      </h3>

      <p className='text-xs sm:text-sm flex items-center gap-1 text-blue-800/90 cursor-pointer'>

        See More

        <BsArrowRight className='text-base sm:text-lg md:text-xl' />

      </p>

    </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5'>
            {
                products.map((product, index) => {

                    const handleAddHomeSection = async () => {
                        if(!confirm('are your sure?')) return ;
                        setLoadingId(product._id);

                        try { 
                            await api.put(`/products/home-sections/delete/${product?.slug}?section=newCollection`); 
                            toast.success(<span className="capitalize">{`${product.name} delete to new collection section successfully.`}</span>)
                            handleGetPopularSection();
                        } catch (error) {
                            toast.error(error?.response?.data?.message);
                        }finally{
                            setLoadingId(null)
                        }
                    }
                    return (
                        <div
                            key={index}
                            className='bg-white rounded-xl border border-gray-200 hover:border-indigo-400 hover:shadow-lg duration-300 overflow-hidden'
                        >

                            {/* Product Image */}
                            <div className='relative bg-gray-100'>

                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className='w-full aspect-square object-cover'
                                />

                                {/* Section Badge */}
                                <div className='absolute top-2 left-2'>
                                    <span className='bg-indigo-600 text-white text-[10px] sm:text-xs px-2 py-1 rounded-md font-medium shadow'>
                                        New Collection
                                    </span>
                                </div>

                            </div>

                            {/* Content */}
                            <div className='p-3'>

                                {/* Product Name */}
                                <h3 className='font-semibold text-sm sm:text-base line-clamp-1 text-black/85'>
                                    {product.name}
                                </h3>

                                {/* Price */}
                                <div className='flex items-center justify-center gap-2 mt-2'>

                                    <p className='font-bold text-indigo-700 text-sm sm:text-base'>
                                        ৳ {product.newPrice}
                                    </p>

                                    {
                                        product.discount > 0 &&
                                        <p className='text-xs sm:text-sm text-gray-400 line-through'>
                                            ৳ {product.price}
                                        </p>
                                    }

                                </div>

                                {/* Info */}
                                <div className='mt-3 space-y-1 text-xs sm:text-sm text-black/60'>

                                    <p>
                                        Stock :
                                        <span className='font-medium text-black/80 ml-1'>
                                            {product.quantity}
                                        </span>
                                    </p>

                                    <p>
                                        Sold :
                                        <span className='font-medium text-black/80 ml-1'>
                                            {product.sold}
                                        </span>
                                    </p>

                                </div>

                                {/* Action */}
                                <div className='mt-4 flex justify-end'>

                                    <div className="flex justify-center items-center">
                                        <button onClick={handleAddHomeSection} className="font-semibold text-[12px] btn btn-sm btn-error flex transform transition-all hover:scale-105 duration-200 hover:cursor-pointer">
                                            <RiDeleteBin2Line className="text-[18px]" /> 
                                            {loadingId === product._id ? 'loading...' : 'Delete Popular Section'}
                                        </button>
                                    </div>

                                </div>

                            </div>

                        </div>
                    )
                })
            }
      </div>

  </div>

</section>
  );
}
