import React from 'react';
import Header from './../Components/Seared/Header/Header';
import { Outlet } from 'react-router';
import FooterNavAdmin from '../Components/AdminPage/Sheared/FooterNavVendor/FooterNavAdmin';


const DashboardLayout = () => {
    return (
        <div>
            <Header />
            <Outlet />
            <FooterNavAdmin />
        </div>
    );
};

export default DashboardLayout;