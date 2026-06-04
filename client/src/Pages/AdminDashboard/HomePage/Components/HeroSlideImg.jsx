import React, { useEffect, useRef, useState } from 'react';
import api from '../../../../API/Axios/api';

// icons
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineImage } from "react-icons/md";
import { FaImages } from "react-icons/fa6";
import { FiUploadCloud } from "react-icons/fi";
import { toast } from 'react-toastify';

export default function HeroSlideImg() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);

    const [loadingId, setLoadingId] = useState(null);

    const inputRef = useRef(null);

    // get images
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

    // upload image
    const handleUploadImage = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('image', file);
            await api.post(
                '/images/slide',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            toast.success('Image uploaded successfully');
            handleGetImage();
        } catch (error) {
            console.log(error);
            toast.error(
                error?.response?.data?.message || 'Upload failed'
            );

        } finally {

            setLoading(false);
        }
    };

    // delete image
    const handleDeleteImage = async (id) => {
        try {
            setLoadingId(id);
            await api.delete(`/images/delete/${id}`);
            toast.success('Image deleted successfully');
            const filtered = images.filter(item => item._id !== id);
            setImages(filtered);
        } catch (error) {
            console.log(error);
            toast.error(
                error?.response?.data?.message || 'Delete failed'
            );
        } finally {
          setLoadingId(null);
        }
    };

    return (

        <div className='mt-5'>

            {/* top header */}
            <div className='flex items-center justify-between gap-3 mb-5'>
                <div className=''>
                      <div className='flex items-center gap-2'>
                          <div className='bg-violet-100 text-violet-700 p-1 md:p-1.5 lg:p-2 rounded-xl'>
                              <FaImages className='text-sm md:text-base lg:text-lg' />
                          </div>
                          <div>
                              <h2 className='text-sm md:text-base lg:text-2xl font-bold text-black/80'>
                                  Slide Bottom Images
                              </h2>
                              <p className='text-[10px] md:text-sm lg:text-base text-black/50 mt-0.5'> Manage homepage banner images </p>
                          </div>
                      </div>
                  </div>

                {/* upload button */}
                <div> 
                    <input type="file" accept='image/*' ref={inputRef} onChange={handleUploadImage} className='hidden' />
                    <button onClick={() => inputRef.current.click()} disabled={loading} className=' flex items-center gap-1 md:gap-2 bg-violet-700 hover:bg-violet-800 disabled:opacity-60 text-white px-3 md:px-5 py-1.5 md:py-2.5 rounded-xl shadow-md hover:shadow-xl duration-300 cursor-pointer font-semibold text-xs md:text-base'> <FiUploadCloud className='text-[20px]' />
                        <span>
                            { loading ? 'Uploading...' : 'Upload Image' }
                        </span>
                    </button>
                </div>
            </div>

            {/* image grid */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>

                {
                    images?.map((image, index) => {

                        return (

                            <div
                                key={index}
                                className='
                                    group
                                    bg-white
                                    rounded-3xl
                                    overflow-hidden
                                    border
                                    border-black/5
                                    shadow-sm
                                    hover:shadow-xl
                                    hover:-translate-y-1
                                    duration-300
                                '
                            >

                                {/* image */}
                                <div className='relative overflow-hidden'>

                                    <img
                                        src={image.image}
                                        alt="slide"
                                        className='
                                            w-full
                                            aspect-[1.776666666666667]
                                            object-cover
                                            group-hover:scale-105
                                            duration-500
                                        '
                                    />

                                    {/* overlay */}
                                    <div className='
                                        absolute
                                        inset-0
                                        bg-gradient-to-t
                                        from-black/50
                                        via-black/10
                                        to-transparent
                                    ' />

                                    {/* top badge */}
                                    <div className='absolute top-3 left-3'>

                                        <div className='bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1'>

                                            <MdOutlineImage className='text-violet-700' />

                                            <p className='text-xs font-semibold text-black/70'>
                                                Slide Banner
                                            </p>

                                        </div>

                                    </div>

                                    {/* image number */}
                                    <div className='absolute bottom-3 left-3'>

                                        <div className='bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-semibold'>

                                            Image #{index + 1}

                                        </div>

                                    </div>

                                </div>

                                {/* bottom */}
                                <div className='p-4'>

                                    <div className='flex items-center justify-between gap-3'>
                                        <div className='min-w-0'>
                                            <p className='font-semibold text-black/80 truncate'>
                                                Homepage Hero Slide
                                            </p>
                                            <p className='text-xs text-black/40 mt-1'>
                                                Recommended Size: 1066 × 600
                                            </p>
                                        </div>

                                        {/* delete button */}
                                        <button onClick={() => handleDeleteImage(image._id)} className=' flex items-center gap-1.5 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white px-4 py-2 rounded-xl text-sm font-semibold duration-200 ' >
                                              <RiDeleteBin6Line className='text-lg' />
                                              {
                                                  loadingId === image._id
                                                      ? 'Deleting...'
                                                      : 'Delete'
                                              }
                                          </button>

                                    </div>

                                </div>

                            </div>
                        );
                    })
                }

            </div>

            {/* empty state */}
            {
                images?.length === 0 && (

                    <div className='bg-white border border-dashed border-black/10 rounded-3xl py-16 mt-5 text-center'>

                        <div className='w-20 h-20 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center mx-auto'>

                            <FaImages className='text-4xl' />

                        </div>

                        <h3 className='text-xl font-bold mt-5 text-black/80'>
                            No Slide Images Found
                        </h3>

                        <p className='text-sm text-black/50 mt-2'>
                            Upload homepage banners to display them here.
                        </p>

                    </div>
                )
            }

        </div>
    );
}