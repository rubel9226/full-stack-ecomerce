// routes/auth.routes.jsx
import AuthLayout from "./../layout/AuthLayout";
import Login from "./../Pages/LoginAndRegister/LoginPage";
import Register from "./../Pages/LoginAndRegister/Register";
import PublicRoute from "./../guards/PublicRoute";
import VerifyCode from "../Pages/LoginAndRegister/VerifyCode";
import ForgetPassword from "../Pages/LoginAndRegister/ForgetPassword";

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
        element: ( <PublicRoute> 
            <VerifyCode /> 
          </PublicRoute>
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