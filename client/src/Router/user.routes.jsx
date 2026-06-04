// routes/user.routes.jsx
import TempRoute from "./../Guards/TempRoute";
import UserDashboard from "./../Pages/UserDashboard/UserDashboard";
import PublicLayout from "../layout/PublicLayout";
import HomePage from './../Pages/HomePage/HomePage';
// import BestDeals from './../Components/BeastDeals/BestDeals';
import CategoryPage from './../Pages/CategoryPage/CategoryPage';
import ProductDetails from './../Components/Seared/ProductDetails/ProductDetails';
import CartPage from './../Pages/CartPage/CartPage';
import ErrorPage from './../Pages/ErrorPage/ErrorPage';
import UserLayout from "../layout/UserLayout";
// import BestDeals from "../Components/UserPage/Best-deals/BestDeals";
import BestDealsPage from './../Pages/BestDealsPage/BestDeals';
import PurchaseLayout from "../layout/PurchaseLayout";
import CheckoutPage from "../Components/UserPage/CheckoutPage/CheckoutPage";
import PaymentPage from "../Components/UserPage/PaymentPage/PaymentPage";
import AccountLayout from "../layout/AccountLayout";
import AccountPage from "../Components/UserPage/AccountPage/Account/AccountPage";
import MyOrders from "../Components/UserPage/AccountPage/MyOrders/MyOrders";
import PaymentSuccess from "../Components/UserPage/PaymentPage/PaymentSuccess";
import SearchPage from "../Pages/SearchPage/SearchPage";
import BestDealsMorePage from "../Pages/BestDealsPageShowMore/BestDealsMorePage";


// import CheckoutPage from "../Components/UserPage/CheckoutPage";

const userRoutes = [
  {
    path: "/dashboard",
    element: (
      <TempRoute allowedRoles={["user"]}>
        <UserLayout />
      </TempRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      { index: true, Component: HomePage },
      { 
        path: "best-deals", 
        children: [
          {index: true, Component: BestDealsPage},
          {path: ':category', Component: BestDealsMorePage}
        ]
        
      },
      { path: "catalog/:slug", Component: CategoryPage },
      { path: "search", Component: SearchPage },
      { path: "product/:slug", Component: ProductDetails },
      { path: "cart", Component: CartPage },
    ],
  },
  {
    path: "/",
    element: (
      <TempRoute allowedRoles={["user"]}>
        <PurchaseLayout />
      </TempRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      { path: '/dashboard/checkout', Component: CheckoutPage },
      { path: '/dashboard/payment', Component: PaymentPage },
      { path: '/dashboard/payment-success', Component: PaymentSuccess },
    ],
  },
  {
    path: "/dashboard/account/",
    element: (
      <TempRoute allowedRoles={["user"]}>
        <AccountLayout />
      </TempRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <AccountPage /> },
      { path: 'my-orders', element: <MyOrders /> },
    ],
  },
];

export default userRoutes;