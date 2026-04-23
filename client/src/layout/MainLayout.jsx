import React from 'react';
import Header from '../Components/Seared/Header/Header';
import { Outlet } from 'react-router';
import FooterNav from '../Components/Seared/FooterNav/FooterNav';


const MainLayout = () => {
    return (
        <div className='pb-20 md:pb-0'>
            <Header />
            <Outlet />
            <FooterNav />
        </div>
    );
};

export default MainLayout;