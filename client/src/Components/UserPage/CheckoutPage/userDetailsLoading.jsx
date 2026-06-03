import React from 'react';

const UserDetailsLoading = () => {

    return (
        <div className='card card-sm shadow-[0_0
_20px_rgba(0,0,0,0.15)] px-[3%] py-[2.5%] w-full animate-pulse'>
            {/* Title */}
            <div className='rounded mb-[3%] text-'>Shipping Address</div>

            <div className='divider my-0'></div>

            <div className='flex justify-between items-start w-full mt-[3%]'>

                <div className='w-[100%]'>

                    {/* Name */}
                    <div className='h-[22px] w-[55%] bg-gray-400 rounded mb-[2%]'></div>

                    {/* Phone */}
                    <div className='h-[22px] w-[35%] bg-gray-300 rounded mb-[2%]'></div>

                    {/* Address */}
                    <div className='h-[22px] w-[100%] bg-gray-400 rounded mb-[2%]'></div>

                    {/* Area / City */}
                    <div className='h-[22px] w-[45%] bg-gray-200 rounded mb-[2%]'></div>

                    {/* Email */}
                    <div className='h-[22px] w-[70%] bg-gray-500 rounded mb-[4%]'></div>

                    {/* Button */}
                    <div className='h-[35px] w-[30%] bg-gray-300 rounded-md'></div>

                </div>

            </div>
        </div>
    );
};

export default UserDetailsLoading;