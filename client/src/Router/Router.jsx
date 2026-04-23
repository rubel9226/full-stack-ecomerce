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
import Login from '../Pages/LoginAndRegister/LoginPage';
import Register from '../Pages/LoginAndRegister/Register';
import ProtectedRoute from './ProtectedRoute';
import AdminDashboard from '../Pages/AdminDashboard/AdminDashboard';
import VendorDashboard from '../Pages/VendorDashboard/VendorDashboard';
import UserDashboard from '../Pages/UserDashboard/UserDashboard';
import Unauthorized from '../Pages/Unauthorized/Unauthorized';
import PublicRoute from './PublicRoute';

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
                Component: CategoryPage,
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
                path: 'admin',
                element: (
                    <ProtectedRoute allowedRoles={['admin']}>
                        <AdminDashboard />
                    </ProtectedRoute>
                )
            },
            {
                path: 'vendor',
                element: (
                    <ProtectedRoute allowedRoles={['vendor']}>
                        <VendorDashboard />
                    </ProtectedRoute>
                )
            },
            {
                path: 'dashboard',
                element: (
                    <ProtectedRoute allowedRoles={['user']} >
                        <UserDashboard />
                    </ProtectedRoute>
                )
            },
            
        ],
        errorElement: <ErrorPage />
    },
    {
        path: '/login',
        element: (
            <PublicRoute>
                <Login />
            </PublicRoute>
        )
    },
    {
        path: '/register',
        element: (
            <PublicRoute>
                <Register />
            </PublicRoute>
        )
    },
    {
        path: 'unauthorized',
        element: (

            <Unauthorized />
        )
    }
])

export default router;