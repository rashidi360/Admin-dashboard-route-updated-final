import { ChakraProvider } from "@chakra-ui/react";
import "assets/css/App.css";
import React from "react";
import ReactDOM from "react-dom";

import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import theme from "theme/theme";
// Layoutes
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import RtlLayout from "layouts/rtl";
import RootLayout from "layouts/RootLayout";
//Pages
// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/dataTables";
import RTL from "views/admin/rtl";
import Services from "views/admin/services";

// Auth Imports
import SignInCentered from "views/auth/signIn";
import NotFound from "views/NotFound";
import Test from "views/admin/dataTables/components/Test";
import Notification from "views/admin/notification-template";
import Form from "views/admin/notification-template/components/Form";
import ViewTemplate from "views/admin/notification-template/components/ViewTemplate";
import UpdateForm from "views/admin/notification-template/components/UpdateForm";
//--------------------New Version Type1----------------------

const router = createBrowserRouter([
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      {
        path: "sign-in",
        element: <SignInCentered />,
      },
    ],
  },
  {
    path: "admin",
    element: <AdminLayout />,
    children: [
      {
        path: "default",
        element: <MainDashboard />,
      },
      {
        path: "nft-marketplace",
        element: <NFTMarketplace />,
      },
      {
        path: "data-tables",
        element: <DataTables />,
        children: [
          {
            path: "data-tables/test",
            element: <Test />,
          },
        ],
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "services",
        element: <Services />,
      },
      {
        path: "notification-template",
        element: <Notification />,
      },
      {
        path: "notification-template/form",
        element: <Form />,
      },
      {
        path: "notification-template/view-template/:id",
        element: <ViewTemplate />,
      },
      {
        path: "notification-template/update-form",
        element: <UpdateForm />,
      },
    ],
  },
  {
    path: "rtl",
    element: <RtlLayout />,
    children: [
      {
        path: "rtl-default",
        element: <RTL />,
      },
    ],
  },
  {
    path: "/",
    element: <Navigate to="admin/default" />,
  },
]);

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </ChakraProvider>,
  document.getElementById("root")
);

//Didn't support for react 17 , supports for 18
// ReactDOM.createRoot(document.getElementById("root")).render(
//   <RouterProvider router={router} />
// );

//--------------------New Version Type2----------------------
//--------------------No Need Route.js-----------------------

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<Navigate to="admin" />}>
//       <Route path={`auth`} element={<AuthLayout />} >
//         <Route path="sign-in" element={<SignInCentered />} />
//       </Route>
//       <Route path={`admin`} element={<AdminLayout />}>
//         <Route path="default" element={<MainDashboard />} />
//         <Route path="nft-marketplace" element={<NFTMarketplace />} />
//         <Route path="data-tables" element={<DataTables />} />
//         <Route path="profile" element={<Profile />} />
//       </Route>
//       <Route path={`rtl`} element={<RtlLayout />} >
//         <Route path="rtl-default" element={<RTL />} />
//       </Route>
//       <Route path="*" element={<NotFound />} />
//       {/* <Route index path="/" element={<Navigate to="admin" />} /> */}
//     </Route>
//   )
// );

// function routes(){
//   return(
//     <RouterProvider router={router} />
//   )
// }
// export default routes;

//----------------Old Version-------------------

// ReactDOM.render(
//   <ChakraProvider theme={theme}>
//     <React.StrictMode>
//       <BrowserRouter>
//         <Routes>
//           <Route path={`auth`} element={<AuthLayout />} />
//           <Route path={`admin`} element={<AdminLayout />} />
//           <Route path={`rtl`} element={<RtlLayout />} />
//           <Route path="/" element={<Navigate to="admin" />} />
//         </Routes>
//       </BrowserRouter>
//     </React.StrictMode>
//   </ChakraProvider>,
//   document.getElementById("root")
// );
