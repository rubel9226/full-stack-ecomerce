import React from 'react';
import FooterNavUser from '../Components/UserPage/FooterNav/FooterNav';
import Header from '../Components/Seared/Header/Header';
import { Outlet } from 'react-router';

const UserLayout = () => {
    return (
        <div className='pb-20 md:pb-0'>
            <Header />
            <Outlet />
            <FooterNavUser />
        </div>
    );
};

export default UserLayout;