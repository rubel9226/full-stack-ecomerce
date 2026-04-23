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
        <div>
            <div className='w-11/12 md:container  mx-auto'>
                <GadgetHero />
            </div>

            <div className='px-5 py-6 bg-[#F1F5F9]'>
                <h2 className='text-xl font-semibold text-center'>Trending Now</h2>
                <div className='flex gap-3 scroll-smooth overflow-x-auto no-scrollbar mt-2'>
                    <button onClick={() => setActiveButton('bags&luggage')} className={`shrink-0 border px-2.5 py-1 text-[12px] font-medium text-gray-400 rounded-full ${activeButton === 'bags&luggage' && 'bg-[#1F5DA0] text-white border-black/70'}`}>Bags & Luggage</button>
                    <button onClick={() => setActiveButton('watch')} className={`shrink-0 border px-2.5 py-1 text-[12px] font-semibold text-gray-400 rounded-full ${activeButton === 'watch' && 'bg-[#1F5DA0] text-white border-black/70'}`}>Watch</button>
                    <button onClick={() => setActiveButton('shave&trim')} className={`shrink-0 border px-2.5 py-1 text-[12px] font-semibold text-gray-400 rounded-full ${activeButton === 'shave&trim' && 'bg-[#1F5DA0] text-white border-black/70'}`}>Saving & Trimming</button>
                    <button onClick={() => setActiveButton('headphone')} className={`shrink-0 border px-2.5 py-1 text-[12px] font-semibold text-gray-400 rounded-full ${activeButton === 'headphone' && 'bg-[#1F5DA0] text-white border-black/70'}`}>Headphones</button>
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