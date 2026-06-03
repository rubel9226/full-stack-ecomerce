import React from 'react';
import Header from './../Components/Seared/Header/Header';
import { Outlet } from 'react-router';
import FooterNavAdmin from '../Components/AdminPage/Sheared/FooterNavVendor/FooterNavAdmin';


const DashboardLayout = () => {
    return (
        <div className='bg-[#f6f9fc]'>
            <Header />
            <div className='px-2 md:cntainer mx-auto !max-w-[1350px] mt-1'>
                <Outlet />
            </div>
            <FooterNavAdmin />
        </div>
    );
};

export default DashboardLayout;