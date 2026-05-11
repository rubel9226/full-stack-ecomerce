// // routes/vendor.routes.jsx
// import DashboardLayout from "./../layout/DashboardLayout";
// import ProtectedRoute from "./../guards/ProtectedRoute";
// import VendorDashboard from "./../Pages/VendorDashboard/VendorDashboard";
// import HomePage from "../Pages/HomePage/HomePage";

// const vendorRoutes = [
//   {
//     path: "/vendor",
//     element: (
//       <ProtectedRoute allowedRoles={["vendor"]}>
//         <DashboardLayout />
//       </ProtectedRoute>
//     ),
//     children: [
//         {
//             index: true, 
//             element: <HomePage /> 
//         },
//         {
            
//         }
//     ],
//   },
// ];

// export default vendorRoutes;