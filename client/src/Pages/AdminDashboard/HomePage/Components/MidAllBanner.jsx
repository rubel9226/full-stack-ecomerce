import React, { useEffect, useRef, useState } from 'react';
import api from '../../../../API/Axios/api';
import { toast } from 'react-toastify';
import { FaImages } from 'react-icons/fa';
import { FiUploadCloud } from 'react-icons/fi';
import { MdOutlineImageNotSupported } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';

const MidAllBanner = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');

    const inputRef = useRef(null);
    const [loadingId, setLoadingId] = useState(null);

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

    // delete image
    const handleDeleteImage = async (id) => {
        if (!confirm('Are you sure delete this image?')) return;
        try {
            setLoadingId(id);
            await api.delete(`/images/delete/${id}`);
            setImages((prev) =>
                prev.filter((item) => item._id !== id)
            );
            toast.success('Image deleted successfully');
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingId(null);
        }
    };


    // upload image
const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!name.trim()) {
        toast.error('Please enter a name');
        return;
    }
    try {
        setLoading(true);
        const formData = new FormData();
        formData.append('name', name);
        formData.append('image', file);

        await api.post(
            '/images/videoBottom',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
        toast.success('Image uploaded successfully');
        setName('');
        handleGetImage();
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || 'Upload failed');
    } finally {
        setLoading(false);
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    }
};


    return (
        <div className=''>

            <section className="colection-video  mt-3 flex flex-col md:flex-row gap-4">
    
                <div className='flex-3 group relative  outer-stroke font-bold text-xl sm:text-2xl md:text-4xl'>
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

                <div className=' outer-stroke font-bold text-xl sm:text-2xl md:text-4xl flex-2 group relative  md:aspect-[1.162]  text-center'>
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

            <div className='mt-10  outer-stroke font-bold text-xl sm:text-2xl md:text-4xl'>
                {/* top header */}
                <div className='flex flex-col md:flex-row items-center justify-between gap-3 mb-5'>
                    <div className='mb-2 md:mb-0 text-center md:text-start'>
                        <div className='flex items-center gap-2'>
                            <div className='bg-violet-100 text-violet-700 p-1 md:p-1.5 lg:p-2 rounded-xl'>
                                <FaImages className='text-sm md:text-base lg:text-lg hidden md:block' />
                            </div>
                            <div>
                                <h2 className='text-base lg:text-2xl font-bold text-black/80'>
                                    Slide Bottom Images
                                </h2>
                                <p className='text-sm lg:text-base text-black/40 mt-0.5'> Manage homepage banner images </p>
                            </div>
                        </div>
                    </div>
            
                    {/* upload button */}
                    <div className="flex items-center gap-3 text-sm lg:text-lg font-semibold w-full md:w-auto">
                        <input
                            type="text"
                            placeholder="Enter title"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="flex-3 border border-gray-300 rounded-lg md:rounded-xl px-3 py-2 outline-none"
                        />
                        <input
                            type="file"
                            accept="image/*"
                            ref={inputRef}
                            onChange={handleUploadImage}
                            className="hidden"
                        />
                        <button
                            onClick={() => inputRef.current.click()}
                            disabled={loading}
                            className="flex-1 flex items-center gap-2 bg-violet-700 text-white px-5 py-2 rounded-lg md:rounded-xl"
                        >
                            <FiUploadCloud />
                            {loading ? "Uploading..." : "Upload"}
                        </button>
                    </div>
                </div>

                 {/* no image */}
                {
                    images?.length === 0 &&
                    <div className='bg-white border border-dashed border-black/15 rounded-3xl py-16 flex flex-col justify-center items-center'>
                        <div className='bg-gray-100 p-5 rounded-full'>
                            <MdOutlineImageNotSupported className='text-5xl text-black/30' />
                        </div>
                        <h3 className='mt-4 text-lg font-semibold text-black/70'>
                            No Images Found
                        </h3>
                        <p className='text-sm text-black/40 mt-1'>
                            Upload homepage images to display here.
                        </p>
                    </div>
                }

                <section className=' cursor-pointer  mt-3 grid grid-cols-2 gap-2.5 md:gap-3.5 lg:grid-cols-4 lg:gap-4'>
                    {images?.map((image, index) => {
                        return (
                            <div className=' group bg-white rounded md:rounded-3xl overflow-hidden border border-black/5 shadow-sm hover:shadow-xl hover:-translate-y-1 duration-300 '>
                                <div className='group relative w-full aspect-[0.666]  text-center'>
                                    <img 
                                        className='w-full h-full rounded-md md:rounded-xl 
                                                object-cover
                                                group-hover:scale-105
                                                duration-300' 
                                        src={image?.image} alt="" />

                                    <div className='lg:p-5 lg:hidden group-hover:flex cursor-pointer absolute top-0 right-0 z-100 w-full h-full rounded-md md:rounded-xl flex justify-center items-center object-cover group-hover:scale-105 duration-300'>
                                        <div className='lg:hidden lg:border-2 border-[#1F5DA0] group-hover:flex duration-500 cursor-pointer bg-[#1F5DA0]/35 z-100 w-full h-full rounded-md md:rounded-xl flex justify-center items-center'>
                                            <span className='text-white'>
                                                    <h1 class="outer-stroke text-[#1F5DA0] uppercase">
                                                        {image?.name}
                                                    </h1>
                                            </span>
                                        </div> 
                                    </div> 
                                </div> 
                                
                                
                                <div className='p-4 text-base md:text-xl text-center md:text-start'>
                                    <div className='flex flex-col md:flex-row items-center justify-between gap-3'>
                                        <div className='min-w-0'> 
                                            <p className='text-xs md:text-sm lg:text-xs text-black/40 mt-1 flex gap-1'>
                                                <span className='hidden md:block lg:hidden'>Recommended </span>Size: 600 × 900
                                            </p>
                                        </div>
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
                        )})
                    } 
                </section>
            </div> 
        </div>
    );
};

export default MidAllBanner;