// routes/auth.routes.jsx
import AuthLayout from "./../layout/AuthLayout";
import Login from "./../Pages/LoginAndRegister/LoginPage";
import Register from "./../Pages/LoginAndRegister/Register";
import PublicRoute from "./../guards/PublicRoute";

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
    ],
  },
];

export default authRoutes;