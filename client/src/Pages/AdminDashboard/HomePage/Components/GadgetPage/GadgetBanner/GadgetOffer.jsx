import React, { useEffect, useRef, useState } from 'react'; 
import api from '../../../../../../API/Axios/api';
import { toast } from 'react-toastify';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FiUploadCloud } from 'react-icons/fi';
import { FaImages } from 'react-icons/fa';

const GadgetOffer = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false); 

    const inputRef = useRef(null);
    const [loadingId, setLoadingId] = useState(null);

    const handleGetImage = async () => {

        try {

            const res = await api.get('/images/get/bottomBanner');

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
            toast.success('Image deleted successfully.');
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
    try {
        setLoading(true);
        const formData = new FormData(); 
        formData.append('image', file);

        await api.post(
            '/images/bottomBanner',
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
        toast.error(error?.response?.data?.message || 'Upload failed');
    } finally {
        setLoading(false);
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    }
};
    return (
    <div className='mt-3 md:mt-7'>
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
        
        <div className='grid grid-cols-2 xl:grid-cols-4 gap-2 sm:gap-4 lg:gap-5 mt-2 sm:mt-4 md:mt-5'>

            {images?.map((image, index) => {
                return (
                    <div className='group bg-white rounded-xl overflow-hidden border border-black/5 shadow-sm hover:shadow-xl hover:-translate-y-1 duration-300 '>
                        <div className='group relative w-full aspect-squire text-center'>
                            <img 
                                className='rounded-t-xl w-full aspect-square
                                        object-cover
                                        group-hover:scale-105
                                        duration-300' 
                                src={image?.image} alt="" />
                        </div> 
                        
                        
                        <div className='p-4 md:py-6 lg:py-4 text-base text-center md:text-start'>
                            <div className='flex flex-col md:flex-row items-center justify-between gap-3'>
                                <div className='min-w-0'> 
                                    <p className='text-xs md:text-sm text-black/50 mt-1 flex gap-1'>
                                        <span className='hidden md:block lg:hidden'>Recommended </span>Size: 600 × 600 / 1:1
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
        </div>
    </div>
  );
};

export default GadgetOffer;