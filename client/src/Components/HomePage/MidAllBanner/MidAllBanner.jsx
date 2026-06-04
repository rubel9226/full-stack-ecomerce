import React, { useEffect, useState } from 'react';
import api from '../../../API/Axios/api';

const MidAllBanner = () => {
    const [images, setImages] = useState([]);
    
    
    const handleGetImage = async () => {
        try {
            const res = await api.get('/images/get/videoBottom');
            setImages(res?.data?.payload);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        handleGetImage();
    }, []);
    return (
        <div className='outer-stroke font-bold text-xl sm:text-2xl md:text-4xl'>

            <section className="colection-video  mt-3 flex flex-col md:flex-row gap-4">
    
                <div className='flex-3 group relative '>
                    <video 
                        className="rounded-xl w-full h-full object-cover"
                        src="./videos/colection-video.mp4"
                        autoPlay
                        muted
                        loop
                    />
                    <div className='lg:p-5 lg:hidden group-hover:flex duration-500 cursor-pointer absolute top-0 right-0 z-100 w-full h-full rounded-md md:rounded-xl flex justify-center items-center'>
                        <div className='lg:hidden lg:border-2 border-[#1F5DA0] group-hover:flex duration-500 cursor-pointer bg-[#1F5DA0]/35 z-100 w-full h-full rounded-md md:rounded-xl flex justify-center items-center'>
                            <span className='text-white text-center'>
                                    <h1 class="outer-stroke text-[#1F5DA0] uppercase">
                                        bag
                                    </h1>
                                    <p className='outer-stroke text-[#1F5DA0] uppercase outer-stroke font-bold text-md sm:text-xl md:text-3xl'>emporium</p>
                            </span>
                        </div> 
                    </div> 
                </div>

                <div className='flex-2 group relative  md:aspect-[1.162]  text-center'>
                    <img 
                        className='w-full h-full rounded-md md:rounded-xl' 
                        src="https://saralifestyle.com/_next/image?url=https%3A%2F%2Fprod.saralifestyle.com%2FImages%2FContent%2Ff5ee353ee2b646b8a8efa2361f37565a.jpeg&w=1080&q=75" alt="" />

                    <div className='lg:p-5 lg:hidden group-hover:flex duration-500 cursor-pointer absolute top-0 right-0 z-100 w-full h-full rounded-md md:rounded-xl flex justify-center items-center'>
                        <div className='lg:hidden lg:border-2 border-[#1F5DA0] group-hover:flex duration-500 cursor-pointer bg-[#1F5DA0]/35 z-100 w-full h-full rounded-md md:rounded-xl flex justify-center items-center'>
                            <span className='text-white'>
                                    <h1 class="outer-stroke text-[#1F5DA0] uppercase">
                                        bag
                                    </h1>
                                    <p className='outer-stroke text-[#1F5DA0] uppercase outer-stroke font-bold text-md sm:text-xl md:text-3xl'>emporium</p>
                            </span>
                        </div> 
                    </div> 
                </div>

            </section>

            <section className=' cursor-pointer  mt-3 grid grid-cols-2 gap-2.5 md:gap-3.5 lg:grid-cols-4 lg:gap-4'>
                {
                    images.map((image, index) => {
                        return (
                            <div key={index} className='group relative w-full aspect-[0.666]  text-center'>
                                <img 
                                    className='w-full h-full rounded-md md:rounded-xl' 
                                    src={image?.image} 
                                    alt="" 
                                />

                                <div className='lg:p-5 lg:hidden group-hover:flex duration-500 cursor-pointer absolute top-0 right-0 z-100 w-full h-full rounded-md md:rounded-xl flex justify-center items-center'>
                                    <div className='lg:hidden lg:border-2 border-[#1F5DA0] group-hover:flex duration-500 cursor-pointer bg-[#1F5DA0]/35 z-100 w-full h-full rounded-md md:rounded-xl flex justify-center items-center'>
                                        <span className='text-white'>
                                                <h1 class="outer-stroke text-[#1F5DA0] uppercase">
                                                    {image?.name}
                                                </h1>
                                        </span>
                                    </div> 
                                </div> 
                            </div> 

                        )
                    })
                }
            </section>
        </div>
    );
};

export default MidAllBanner;