// routes/auth.routes.jsx
import AuthLayout from "./../layout/AuthLayout";
import Login from "./../Pages/LoginAndRegister/LoginPage";
import Register from "./../Pages/LoginAndRegister/Register";
import TempRoute from "./../guards/TempRoute";
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
          <TempRoute>
            <Login />
          </TempRoute>
        ),
      },
      {
        path: "register",
        element: (
          <TempRoute>
            <Register />
          </TempRoute>
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
        element: ( <TempRoute> 
            <ForgetPassword /> 
          </TempRoute>
        ),
      },
    ],
  },
];

export default authRoutes;