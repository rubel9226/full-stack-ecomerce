// routes/admin.routes.jsx
import DashboardLayout from "./../layout/DashboardLayout";
import TempRoute from "../Guards/TempRoute";

import HomePage from './../Pages/AdminDashboard/HomePage/HomePage';
import ProductsPageAdmin from "../Pages/AdminDashboard/ProductsPageAdmin/ProductsPageAdmin";
import UsersPageAdmin from "../Pages/AdminDashboard/UsersPageAdmin/UsersPageAdmin";
import OrdersPageAdmin from "../Pages/AdminDashboard/OrdersPageAdmin/OrdersPageAdmin";
import AccountPageAdmin from "../Components/AdminPage/Account/AccountAdmin";
import SearchPage from "../Pages/AdminDashboard/SearchPage/SearchPage";
import AddProductPage from "../Pages/AdminDashboard/AddProductPage/AddProductPage";
import UpdateProductPage from "../Pages/AdminDashboard/UpdateProductPage/UpdateProductPage";
// import ProductsDetailsAdmin from "./../Components/AdminPage/ProductsAdmin/ProductDetailsAdmin";

const adminRoutes = [
  {
    path: "/admin",
    element: (
      <TempRoute allowedRoles={["admin"]}>
        <DashboardLayout />
      </TempRoute>
    ),
    children: [
      { index: true, element: <HomePage /> },
      { path: 'products', element: <ProductsPageAdmin /> },
      { path: 'products/add', element: <AddProductPage /> },
      { path: 'products/update', element: <UpdateProductPage /> },
      { path: "search", Component: SearchPage },
      { path: 'users', element: <UsersPageAdmin /> },
      { path: 'orders', element: <OrdersPageAdmin /> },
      { path: 'account', element: <AccountPageAdmin /> },
    ],
  },
];

export default adminRoutes;