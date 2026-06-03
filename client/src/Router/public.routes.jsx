// routes/public.routes.jsx
import HomePage from "./../Pages/HomePage/HomePage";
import BestDeals from "./../Pages/BestDealsPage/BestDeals";
import CategoryPage from "./../Pages/CategoryPage/CategoryPage";
import ProductDetails from "./../Components/Seared/ProductDetails/ProductDetails";
import CartPage from "./../Pages/CartPage/CartPage";
import ErrorPage from "./../Pages/ErrorPage/ErrorPage";
import PublicLayout from "./../layout/PublicLayout";
import PublicRoute from "../guards/PublicRoute";
import SearchPage from "../Pages/SearchPage/SearchPage";

const publicRoutes = [
  {
    path: "/",
    element: (
        <PublicRoute>
            <PublicLayout />
        </PublicRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      { index: true, Component: HomePage },
      { path: "best-deals", Component: BestDeals },
      { path: "/catalog/:slug", Component: CategoryPage },
      { path: "/search", Component: SearchPage },
      { path: "product/:slug", Component: ProductDetails },
      { path: "cart", Component: CartPage },
    ],
  },
];

export default publicRoutes;