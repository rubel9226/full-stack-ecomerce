import React from 'react';
import { Outlet } from 'react-router';
import FooterNavAdmin from '../Components/AdminPage/Sheared/FooterNavVendor/FooterNavAdmin';
import Header from '../Components/AdminPage/Seared/Header/Header';


const DashboardLayout = () => {
    return (
        <div className='bg-[#f6f9fc]'>
            <Header />
            <div className=' mx-auto !max-w-[1350px] mt-1'>
                <Outlet />
            </div>
            <FooterNavAdmin />
        </div>
    );
};

export default DashboardLayout;