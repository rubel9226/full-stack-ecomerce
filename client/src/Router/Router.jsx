import React from 'react';
import { createBrowserRouter } from 'react-router';

import MainLayout from '../layout/MainLayout';
import HomePage from './../Pages/HomePage/HomePage';
import BestDeals from './../Pages/BestDealsPage/BestDeals';
import CartPage from './../Pages/CartPage/CartPage';
import AccountPage from './../Pages/AccountPage/AccountPage';
import ErrorPage from '../Pages/ErrorPage/ErrorPage';
import CategoryPage from '../Pages/CategoryPage/CategoryPage';
// import ProductDetails from '../Components/Category/ProductDetails/ProductDetails';
import ProductDetails from '../Components/Seared/ProductDetails/ProductDetails';

const router = createBrowserRouter([
    {
        path: '/',
        Component: MainLayout, 
        children:[
            {
                index: true,
                Component: HomePage,
            },
            { 
                path: 'catalog/:slug',
                children: [
                    {
                        index: true,
                        Component: CategoryPage,
                    },
                    // {
                    //     path: ':productSlug',
                    //     Component: ProductDetails
                    // }

                ]
            },
            {
                path: 'product/:slug',
                Component: ProductDetails,
            },
            {
                path: 'best-deals',
                Component: BestDeals,
            },
            {
                path: 'cart',
                Component: CartPage
            },
            {
                path: 'dashboard',
                Component: AccountPage
            }
        ],
        errorElement: <ErrorPage />
    }
])

export default router;