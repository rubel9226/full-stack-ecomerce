import React, { useEffect, useState } from 'react';
import api from '../../../../../../API/Axios/api';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { MdOutlineImage } from 'react-icons/md';
import { FaImages } from 'react-icons/fa';
import { BsArrowRight } from 'react-icons/bs';
import { Link } from 'react-router';



export default function UnlimitedBottom() {
  const [categories, setCategories] = useState([]);
  const [loadingId, setLoadingId] = useState(null);


  const handleGetCategories = async () => {
      try {
          const res = await api.get('/categories/popular/get-popular?section=unlimitedBottom');
          setCategories(res?.data?.payload);
      } catch (error) {
          console.log(error);
      }
  };

  useEffect(() => {
    handleGetCategories();
  }, []);


    // delete image
    const handleDeleteImage = async (id) => { 
        try {
            setLoadingId(id);
            await api.put(`/categories/popular/delete-popular/${id}?section=unlimitedBottom`);
            toast.success('Image deleted successfully');
            const filtered = categories.filter(item => item.slug !== id);
            setCategories(filtered);
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
    <div className='sm:mt-4 md:mt-5'>
        <div className='font-semibold text-xl md:text-2xl xl:text-3xl 2xl:text-[32px] capitalize mb-2 flex justify-between'>
            <h2 className=''>
                Unlimited Bottom
            </h2>

            <Link to={'products'} className='flex items-center gap-1 text-blue-800/90 cursor-pointer'>
                Add More
                <BsArrowRight className='text-base sm:text-lg md:text-xl' />
            </Link>
        </div>

        {/* image grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>

            {
                categories?.map((image, index) => {
                    return (
                        <div key={index} className=' group bg-white rounded-xl overflow-hidden border border-black/5 shadow-sm hover:shadow-xl hover:-translate-y-1 duration-300 ' >

                            {/* image */}
                            <div className='relative overflow-hidden'>
                                <img
                                    src={image.image}
                                    alt="slide"
                                    className=' w-full aspect-[1.4] object-cover group-hover:scale-105 duration-500 ' />

                                <div className=' absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-transparent ' />
                            </div>

                            
                            <div className='p-4'>

                                <div className='flex items-center justify-between gap-3'>
                                    <div className='min-w-0'> 
                                        <p className='text-xs text-black/40 mt-1'>
                                            <span className='lg:hidden'>Recommended</span> Size: 1066 × 600
                                        </p>
                                    </div>

                                    
                                    <button onClick={() => handleDeleteImage(image.slug)} className=' flex items-center gap-1.5 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white px-4 py-2 rounded-xl text-sm font-semibold duration-200 ' >
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
            categories?.length === 0 && (
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