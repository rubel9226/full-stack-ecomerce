// routes/auth.routes.jsx
import AuthLayout from "./../layout/AuthLayout";
import Login from "./../Pages/LoginAndRegister/LoginPage";
import Register from "./../Pages/LoginAndRegister/Register";
import TempRoute from "./../guards/TempRoute";
import VerifyCode from "../Pages/LoginAndRegister/VerifyCode";
import ForgetPassword from "../Pages/LoginAndRegister/ForgetPassword";
import PublicRoute from "../guards/PublicRoute";

const authRoutes = [
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
      {
        path: "register",
        element: (
          <PublicRoute>
            <Register />
          </PublicRoute>
        ),
      },
      {
        path: "verify-code",
        element: ( <TempRoute> 
            <VerifyCode /> 
          </TempRoute>
        ),
      },
      {
        path: "forgot-password",
        element: ( <PublicRoute> 
            <ForgetPassword /> 
          </PublicRoute>
        ),
      },
    ],
  },
];

export default authRoutes;