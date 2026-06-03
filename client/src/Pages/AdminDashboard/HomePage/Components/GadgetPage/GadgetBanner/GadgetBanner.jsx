import React from 'react'; 
import UnlimitedOffer from './UnlimitedOffer';

const GadgetBanner = () => {
    return (
        <div>
            <div className='grid grid-cols-2 gap-2.5 sm:gap-4 sm:grid-cols-4'>
                <img className='rounded-xl aspect-square' src="https://saralifestyle.com/_next/image?url=https%3A%2F%2Fprod.saralifestyle.com%2FImages%2FContent%2F0f0255d9dae748aa8a8bdcfe3e3a1e7c.png&w=640&q=75" alt="" />
                <img className='rounded-xl aspect-square' src="https://saralifestyle.com/_next/image?url=https%3A%2F%2Fprod.saralifestyle.com%2FImages%2FContent%2F884030baade841f994462c7478497143.png&w=640&q=75" alt="" />
                <img className='rounded-xl aspect-square ' src="https://saralifestyle.com/_next/image?url=https%3A%2F%2Fprod.saralifestyle.com%2FImages%2FContent%2F01b7b510e4384e1c8a9ef9ce20ea1c6f.png&w=640&q=75" alt="" />
                <img className='rounded-xl aspect-square' src="https://saralifestyle.com/_next/image?url=https%3A%2F%2Fprod.saralifestyle.com%2FImages%2FContent%2F3eb724aa49594bef89597f01c35aecc1.png&w=640&q=75" alt="" />
            </div>
            <div className='py-2'>
                <UnlimitedOffer />
            </div>

        </div>
    );
};

export default GadgetBanner;