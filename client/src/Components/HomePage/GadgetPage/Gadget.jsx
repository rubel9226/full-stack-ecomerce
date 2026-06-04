import React, { useState } from 'react';
import GadgetHero from './GadgetHero/GadgetHero';
import BagsLuggage from './BagsLug/BagsLug';
import Watch from './Watch/Watch';
import ShaveTrim from './ShaveTrim/ShaveTrim';
import Headphone from './Headphone/Headphone';
import GadgetBanner from './GadgetBanner/GadgetBanner';

const Gadget = () => {
    const [activeButton, setActiveButton] = useState('bags&luggage');

    return (
        <div className=''>
            <div className='px-5 md:px-0 mx-auto'>
                <GadgetHero />
            </div>

            <div className='px-5 py-6 mt-2 md:mt-4 lg:mt-6 bg-[#F1F5F9]'>
                <h2 className='font-semibold text-xl md:text-2xl xl:text-3xl 2xl:text-[32px] capitalize '>Trending Now</h2>
                <div className='flex gap-2 sm:gap-3 overflow-x-auto no-scrollbar scroll-smooth mt-2 pb-1'>

                    <button
                        onClick={() => setActiveButton('bags&luggage')}
                        className={`shrink-0 border px-3 sm:px-4 py-1.5 text-[11px] sm:text-[12px] md:text-[13px] font-medium rounded-full whitespace-nowrap duration-200 cursor-pointer
                        ${
                            activeButton === 'bags&luggage'
                                ? 'bg-[#1F5DA0] text-white border-[#1F5DA0]'
                                : 'bg-white text-gray-500 border-black/15 hover:border-[#1F5DA0]/40 hover:text-[#1F5DA0]'
                        }`}
                    >
                        Bags & Luggage
                    </button>

                    <button
                        onClick={() => setActiveButton('watch')}
                        className={`shrink-0 border px-3 sm:px-4 py-1.5 text-[11px] sm:text-[12px] md:text-[13px] font-medium rounded-full whitespace-nowrap duration-200 cursor-pointer
                        ${
                            activeButton === 'watch'
                                ? 'bg-[#1F5DA0] text-white border-[#1F5DA0]'
                                : 'bg-white text-gray-500 border-black/15 hover:border-[#1F5DA0]/40 hover:text-[#1F5DA0]'
                        }`}
                    >
                        Watch
                    </button>

                    <button
                        onClick={() => setActiveButton('shave&trim')}
                        className={`shrink-0 border px-3 sm:px-4 py-1.5 text-[11px] sm:text-[12px] md:text-[13px] font-medium rounded-full whitespace-nowrap duration-200 cursor-pointer
                        ${
                            activeButton === 'shave&trim'
                                ? 'bg-[#1F5DA0] text-white border-[#1F5DA0]'
                                : 'bg-white text-gray-500 border-black/15 hover:border-[#1F5DA0]/40 hover:text-[#1F5DA0]'
                        }`}
                    >
                        Saving & Trimming
                    </button>

                    <button
                        onClick={() => setActiveButton('headphone')}
                        className={`shrink-0 border px-3 sm:px-4 py-1.5 text-[11px] sm:text-[12px] md:text-[13px] font-medium rounded-full whitespace-nowrap duration-200 cursor-pointer
                        ${
                            activeButton === 'headphone'
                                ? 'bg-[#1F5DA0] text-white border-[#1F5DA0]'
                                : 'bg-white text-gray-500 border-black/15 hover:border-[#1F5DA0]/40 hover:text-[#1F5DA0]'
                        }`}
                    >
                        Headphones
                    </button>
                </div>
                
                <div>
                    {
                        activeButton === 'bags&luggage' ? <BagsLuggage /> 
                        : activeButton === 'watch' ? <Watch /> 
                        : activeButton === 'shave&trim' ? <ShaveTrim />
                        : activeButton === 'headphone' ? <Headphone /> : '' 
                    }
                </div>

                <div>
                    <GadgetBanner />
                </div>
            </div>
        </div>
    );
};

export default Gadget;