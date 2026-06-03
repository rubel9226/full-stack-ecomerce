import React from 'react';
import HeroSlideImg from '../../Components/HomePage/HeroSlideImg/HeroSlideImg';
import ColumnThreeImg from '../../Components/HomePage/ColumnThreeImg/ColumnThreeImg';
import Popular from '../../Components/HomePage/Popular/Popular';
import Offer24 from '../../Components/HomePage/Offer24/Offer24';
import MidAllBanner from '../../Components/HomePage/MidAllBanner/MidAllBanner';
import NewCollection from '../../Components/HomePage/NewCollection/NewCollection';
import Gadget from '../../Components/HomePage/GadgetPage/Gadget';
import HomeFooter from '../../Components/HomePage/HomeFooter/HomeFooter';
import Footer from '../../Components/Seared/Footer/Footer';

const HomePage = () => {
    return (
        <div className=''>

            <div className='w-11/12 md:container  mx-auto mt-3 flex flex-col md:flex-row gap-3 xl:!max-w-[1350px]'>
                <HeroSlideImg />
                <ColumnThreeImg />
            </div>
                
            <div className='w-11/12 md:container  mx-auto mt-3 xl:!max-w-[1350px]'>
                <Popular />
            </div>

            <div className='md:container mx-auto mt-3 xl:!max-w-[1350px]'>
                <Offer24 />
            </div>
            
            <div className='w-11/12 md:container  mx-auto mt-3 xl:!max-w-[1350px]'>
                <MidAllBanner />
            </div>

            <div className='w-11/12 md:container  mx-auto mt-3 xl:!max-w-[1350px]'>
                <NewCollection />
            </div>
            
            <div className='w-11/12 md:container mx-auto xl:!max-w-[1350px]'>
                <Gadget />
            </div>

            <div className='md:container mx-auto xl:!max-w-[1350px]'>
                <HomeFooter />
            </div>

            <div>
                <Footer />
            </div>
            
        </div>
    );
};

export default HomePage;