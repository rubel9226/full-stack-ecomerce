import React from 'react';

const LoadingOrder = () => {

    return (

        <div className='animate-pulse'>

            {/* mobile skeleton */}
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5'>

                {
                    [...Array(10)].map((_, index) => (
                        <div
                            key={index}
                            className='bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden'
                        >

                            {/* header */}
                            <div className='p-4 bg-gray-200'>
                                <div className='flex items-start justify-between'>
                                    <div className='space-y-2'>
                                        <div className='h-5 w-32 bg-gray-300 rounded-full'></div>
                                        <div className='h-3 w-20 bg-gray-300 rounded-full'></div>
                                    </div>

                                    <div className='h-7 w-24 bg-gray-300 rounded-full'></div>
                                </div>
                            </div>

                            {/* body */}
                            <div className='p-4'>

                                {/* customer */}
                                <div className='mb-5 space-y-3'>
                                    <div className='h-3 w-20 bg-gray-200 rounded-full'></div>
                                    <div className='h-5 w-40 bg-gray-300 rounded-full'></div>
                                    <div className='h-4 w-28 bg-gray-200 rounded-full'></div>
                                </div>

                                {/* products */}
                                <div className='space-y-4'>

                                    {
                                        [...Array(2)].map((_, i) => (
                                            <div
                                                key={i}
                                                className='flex gap-3 items-center'
                                            >

                                                <div className='w-16 h-16 rounded-2xl bg-gray-300'></div>

                                                <div className='flex-1 space-y-3'>
                                                    <div className='h-4 w-full bg-gray-300 rounded-full'></div>

                                                    <div className='flex items-center justify-between'>
                                                        <div className='h-3 w-16 bg-gray-200 rounded-full'></div>

                                                        <div className='h-4 w-20 bg-gray-300 rounded-full'></div>
                                                    </div>
                                                </div>

                                            </div>
                                        ))
                                    }

                                </div>

                                {/* bottom */}
                                <div className='mt-6 pt-5 border-t'>

                                    <div className='flex items-center justify-between mb-4'>

                                        <div className='space-y-2'>
                                            <div className='h-3 w-16 bg-gray-200 rounded-full'></div>
                                            <div className='h-7 w-20 bg-gray-300 rounded-full'></div>
                                        </div>

                                        <div className='space-y-2 flex flex-col items-end'>
                                            <div className='h-3 w-14 bg-gray-200 rounded-full'></div>
                                            <div className='h-7 w-28 bg-gray-300 rounded-full'></div>
                                        </div>

                                    </div>

                                    <div className='h-12 w-full bg-gray-300 rounded-xl'></div>

                                </div>

                            </div>

                        </div>
                    ))
                }

            </div>

        </div>
    );
};

export default LoadingOrder;