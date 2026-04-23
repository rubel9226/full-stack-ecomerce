import React from 'react';
import FooterStats from './FooterStats/FooterStats';
import Footer from '../../Seared/Footer/Footer';

const HomeFooter = () => {
    return (
        <div>

            <div>
                <FooterStats />
            </div>

            <div className='border-b border-black/15 pb-10'>
                <p>SaRa Lifestyle Ltd – Your Trusted Destination for Online Shopping in Bangladesh. Discover a seamless online shopping experience with premium quality fashion, accessories, footwear, and lifestyle essentials.</p>
            </div>

            <div>
                <Footer />
            </div>
        </div>
    );
};

export default HomeFooter;