import React, { useEffect, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './style.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import api from '../../../../API/Axios/api';
import { MdOutlineAdd } from 'react-icons/md';
import { toast } from 'react-toastify';
import { RiDeleteBin2Line } from 'react-icons/ri';




export default function Popular() {
    const [categories, setCategories] = useState([]);
    const [loadingId, setLoadingId] = useState(null);

    const handleGetPopularSection =async () => {
        try {
            const res = await api.get('/categories/popular/get-popular');
            setCategories(res?.data?.payload);
        } catch (error) {
            // 
        }
    }

    useEffect(() => {
        handleGetPopularSection();
    }, []);

    


  return (
    <div>
        <h1 className='text-xl font-bold md:text-2xl lg:text-3xl mt-4 mb-2 md:mt-6 md:mb-4 xl:mt-8 xl:mb-6'>
            Popular Category
        </h1>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5'>
            {
                categories.map((category, index) => {

                    const handleAddHomeSection = async () => {
                        if(!confirm('are your sure?')) return ;
                        setLoadingId(category._id);

                        try {
                            const res = await api.put(`/categories/popular/delete-popular/${category.slug}`);
                            console.log(res?.data?.payload);
                            const newCategory = res?.data?.payload;

                            setCategories(prev => 
                                prev.map(category => category._id === newCategory._id ? {...category, isPopular: false} : category)
                            );

                            toast.success(<span className="capitalize">{`${category.name} delete to popular section successfully.`}</span>)
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
                            className='text-center rounded-xl rounded-t-full border border-gray-200 hover:border-indigo-400 hover:shadow-lg duration-300 overflow-hidden'
                        >

                            {/* category Image */}
                            <div className='relative bg-blue-600/20 rounded-full'>

                                <img
                                    src={category?.image }
                                    alt={category?.name}
                                    className='w-full aspect-square object-cover rounded-full'
                                /> 

                            </div>

                            {/* Content */}
                            <div className='p-3'>

                                {/* category Name */}
                                <h3 className='font-semibold text-sm sm:text-base line-clamp-1 text-black/85 capitalize'>
                                    {category.name}
                                </h3> 

                                {/* Action */}
                                <div className='mt-4 flex justify-end'>

                                    <div className="flex justify-center items-center">
                                        <button onClick={handleAddHomeSection} className="font-semibold text-[12px] btn btn-sm btn-error flex transform transition-all hover:scale-105 duration-200 hover:cursor-pointer">
                                            <RiDeleteBin2Line className="text-[18px]" /> 
                                            {loadingId === category._id ? 'loading...' : 'Delete Popular Section'}
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
  );
} 