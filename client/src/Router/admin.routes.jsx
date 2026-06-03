// routes/admin.routes.jsx
import DashboardLayout from "./../layout/DashboardLayout";
import ProtectedRoute from "./../guards/ProtectedRoute";

import HomePage from './../Pages/AdminDashboard/HomePage/HomePage';
import ProductsPageAdmin from "../Pages/AdminDashboard/ProductsPageAdmin/ProductsPageAdmin";
import UsersPageAdmin from "../Pages/AdminDashboard/UsersPageAdmin/UsersPageAdmin";
import OrdersPageAdmin from "../Pages/AdminDashboard/OrdersPageAdmin/OrdersPageAdmin";
import AccountPageAdmin from "../Components/AdminPage/Account/AccountAdmin";
// import ProductsDetailsAdmin from "./../Components/AdminPage/ProductsAdmin/ProductDetailsAdmin";

const adminRoutes = [
  {
    path: "/admin",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <HomePage /> },
      { path: 'products', element: <ProductsPageAdmin /> },
      { path: 'users', element: <UsersPageAdmin /> },
      { path: 'orders', element: <OrdersPageAdmin /> },
      { path: 'account', element: <AccountPageAdmin /> },
    ],
  },
];

export default adminRoutes;