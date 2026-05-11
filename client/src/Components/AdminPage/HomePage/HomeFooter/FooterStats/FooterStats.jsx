import React from 'react';

const FooterStats = () => {
    return (
        <div className='text-white bg-linear-to-b from-[#215DA1] via-[#4762AA] via-50% to-[#5261AE] py-6'>

            <div className='space-y-6 flex flex-col justify-enter items-center'>
                <div className='text-center'>
                    <img className='w-[10vw]   inline-block' src="https://saralifestyle.com/_next/static/media/Corporate.a6a1926d.svg" alt="" />
                    <h3 className='text-white uppercase font-semibold'>become our corporate partner</h3>
                </div>

                <div className="grid grid-cols-2 justify-center text-center gap-5">
                    <div className="">
                        <img className='min-w-[12.823vw] max-w-[12.823vw] inline-block' src="https://saralifestyle.com/_next/static/media/BestQuality.5f6974ae.svg" alt="" />
                        <div className="text-sm font-semibold ">Best Corporate Deals</div>
                    </div>
                    
                    <div className="">
                        <img className='min-w-[12.823vw] max-w-[12.823vw] inline-block' src="https://saralifestyle.com/_next/static/media/BestQuality.5f6974ae.svg" alt="" />
                        <div className="text-sm font-semibold ">Supporting Team</div>
                    </div>

                    <div className="">
                        <img className='min-w-[12.823vw] max-w-[12.823vw] inline-block' src="https://saralifestyle.com/_next/static/media/BestQuality.5f6974ae.svg" alt="" />
                        <div className="text-sm font-semibold ">Best Quality</div>
                    </div>

                    <div className="">
                        <img className='min-w-[12.823vw] max-w-[12.823vw] inline-block' src="https://saralifestyle.com/_next/static/media/BestQuality.5f6974ae.svg" alt="" />
                        <div className="text-sm font-semibold ">Flexible Payment</div>
                    </div>
                </div>

                <div className='text-center'>
                    <button className="btn hover:bg-white hover:text-[#5061AD] duration-75 border-2 border-white text-[16px] font-bold btn-outline">FIND OUT MORE</button>
                </div>
            </div>
        </div>
    );
};

export default FooterStats;