import React from 'react';

import { Outlet } from 'react-router';
import Header from '../Components/Seared/Header/Header';
import FooterNav from '../Components/Seared/FooterNav/FooterNav';



const PublicLayout = () => {
    return (
        <div className='pb-20 md:pb-0'>
            <Header />
            <Outlet />
            <FooterNav />
        </div>
    );
};

export default PublicLayout;