import React from 'react';
import HeroSlideImg from '../../Components/HomePage/HeroSlideImg/HeroSlideImg';
import ColumnThreeImg from '../../Components/HomePage/ColumnThreeImg/ColumnThreeImg';
import Popular from '../../Components/HomePage/Popular/Popular';
import Offer24 from '../../Components/HomePage/Offer24/Offer24';
import MidAllBanner from '../../Components/HomePage/MidAllBanner/MidAllBanner';
import NewCollection from '../../Components/HomePage/NewCollection/NewCollection';
import Gadget from '../../Components/HomePage/GadgetPage/Gadget';
import HomeFooter from '../../Components/HomePage/HomeFooter/HomeFooter';

const HomePage = () => {
    return (
        <div className=''>

            <div className='w-11/12 md:container  mx-auto mt-3 flex flex-col md:flex-row gap-3'>
                <HeroSlideImg />
                <ColumnThreeImg />
            </div>
                
            <div className='w-11/12 md:container  mx-auto mt-3'>
                <Popular />
            </div>

            <div>
                <Offer24 />
            </div>
            
            <div>
                <MidAllBanner />
            </div>

            <div>
                <NewCollection />
            </div>
            
            <div>
                <Gadget />
            </div>

            <div>
                <HomeFooter />
            </div>
            
        </div>
    );
};

export default HomePage;