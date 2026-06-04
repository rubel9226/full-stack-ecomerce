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




