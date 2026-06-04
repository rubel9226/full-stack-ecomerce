import React, { useState } from 'react'; 
import Watch from './GadgetConponent/Watch';
import BagsLuggage from './GadgetConponent/BagsLug';
import ShaveTrim from './GadgetConponent/ShaveTrim';
import Headphone from './GadgetConponent/Headphone'; 
import GadgetHero from './GadgetConponent/GadgetHero';
import UnlimitedTop from './GadgetBanner/UnlimitedTop';
import UnlimitedBottom from './GadgetBanner/UnlimitedBotttom';

const Gadget = () => {
    const [activeButton, setActiveButton] = useState('bags&luggage');

    return (
        <div className=''>
            <div className=' mx-auto'>
                <GadgetHero />
            </div>

            <div className='  py-6 bg-[#F1F5F9]'>
                <h2 className='font-semibold text-xl md:text-2xl xl:text-3xl 2xl:text-[32px] capitalize text-center'>Trending Now</h2>
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
                    <UnlimitedTop />
                    <UnlimitedBottom />
                </div>
            </div>
        </div>
    );
};

export default Gadget;