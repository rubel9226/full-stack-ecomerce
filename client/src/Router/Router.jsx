// import React from 'react';
// import { createBrowserRouter } from 'react-router';



// import HomePage from './../Pages/HomePage/HomePage';
// import BestDeals from './../Pages/BestDealsPage/BestDeals';
// import CartPage from './../Pages/CartPage/CartPage';
// import AccountPage from './../Pages/AccountPage/AccountPage';
// import ErrorPage from '../Pages/ErrorPage/ErrorPage';
// import CategoryPage from '../Pages/CategoryPage/CategoryPage';
// import ProductDetails from '../Components/Seared/ProductDetails/ProductDetails';
// import Login from '../Pages/LoginAndRegister/LoginPage';
// import Register from '../Pages/LoginAndRegister/Register';
// import AdminDashboard from '../Pages/AdminDashboard/AdminDashboard';
// import VendorDashboard from '../Pages/VendorDashboard/VendorDashboard';
// import UserDashboard from '../Pages/UserDashboard/UserDashboard';
// import Unauthorized from '../Pages/Unauthorized/Unauthorized';


// // import ProtectedRoute from './ProtectedRoute';
// import ProtectedRoute from './../Guards/ProtectedRoute';

// // import PublicRoute from './PublicRoute';
// import PublicRoute from './../Guards/PublicRoute';

// import PublicLayout from '../layout/PublicLayout';

// const router = createBrowserRouter([
//     {
//         path: '/',
//         Component: PublicLayout, 
//         children:[
//             {
//                 index: true,
//                 Component: HomePage,
//             },
//             { 
//                 path: 'catalog/:slug',
//                 Component: CategoryPage,
//             },
//             {
//                 path: 'product/:slug',
//                 Component: ProductDetails,
//             },
//             {
//                 path: 'best-deals',
//                 Component: BestDeals,
//             },
//             {
//                 path: 'cart',
//                 Component: CartPage
//             },
//             {
//                 path: 'admin',
//                 element: (
//                     <ProtectedRoute allowedRoles={['admin']}>
//                         <AdminDashboard />
//                     </ProtectedRoute>
//                 )
//             },
//             {
//                 path: 'vendor',
//                 element: (
//                     <ProtectedRoute allowedRoles={['vendor']}>
//                         <VendorDashboard />
//                     </ProtectedRoute>
//                 )
//             },
//             {
//                 path: 'dashboard',
//                 element: (
//                     <ProtectedRoute allowedRoles={['user']} >
//                         <UserDashboard />
//                     </ProtectedRoute>
//                 )
//             },
            
//         ],
//         errorElement: <ErrorPage />
//     },
//     {
//         path: '/login',
//         element: (
//             <PublicRoute>
//                 <Login />
//             </PublicRoute>
//         )
//     },
//     {
//         path: '/register',
//         element: (
//             <PublicRoute>
//                 <Register />
//             </PublicRoute>
//         )
//     },
//     {
//         path: 'unauthorized',
//         element: (

//             <Unauthorized />
//         )
//     }
// ])

// export default router;



// routes/index.jsx
import { createBrowserRouter } from "react-router";

import publicRoutes from "./public.routes";
import authRoutes from "./auth.routes";
import adminRoutes from "./admin.routes";
// import vendorRoutes from "./vendor.routes";
import userRoutes from "./user.routes";

const router = createBrowserRouter([
  ...publicRoutes,
  ...authRoutes,
  ...adminRoutes,
  ...userRoutes,
]);

export default router;




