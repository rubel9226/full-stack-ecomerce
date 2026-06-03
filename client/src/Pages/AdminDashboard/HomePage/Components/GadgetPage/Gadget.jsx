import React, { useState } from 'react'; 
import Watch from './GadgetConponent/Watch';
import BagsLuggage from './GadgetConponent/BagsLug';
import ShaveTrim from './GadgetConponent/ShaveTrim';
import Headphone from './GadgetConponent/Headphone';
import GadgetBanner from './GadgetBanner/GadgetBanner';
import GadgetHero from './GadgetConponent/GadgetHero';

const Gadget = () => {
    const [activeButton, setActiveButton] = useState('bags&luggage');

    return (
        <div className=''>
            <div className=' mx-auto'>
                <GadgetHero />
            </div>

            <div className='px-5 py-6 bg-[#F1F5F9]'>
                <h2 className='font-semibold text-xl md:text-2xl xl:text-3xl 2xl:text-[32px] capitalize text-center'>Trending Now</h2>
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