import React from 'react';
import Header from '../Components/Seared/Header/Header';
import { Outlet } from 'react-router';

const PurchaseLayout = () => {
    return (
        <div>
            <Header />
            <Outlet />

            
        </div>
    );
};


export default PurchaseLayout;