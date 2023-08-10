import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
  MdDesignServices,
  MdNotifications,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/dataTables";
import RTL from "views/admin/rtl";

// Auth Imports
import SignInCentered from "views/auth/signIn";

import AuthLayout from "layouts/auth";
import AdminLayout from "layouts/admin";
import RtlLayout from "layouts/rtl";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    // element: <MainDashboard />,
  },
  // {
  //   name: "NFT Marketplace",
  //   layout: "/admin",
  //   path: "/nft-marketplace",
  //   icon: (
  //     <Icon
  //       as={MdOutlineShoppingCart}
  //       width="20px"
  //       height="20px"
  //       color="inherit"
  //     />
  //   ),
  //   // element: <NFTMarketplace />,
  //   secondary: true,
  // },
  // {
  //   name: "Data Tables",
  //   layout: "/admin",
  //   icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
  //   path: "/data-tables",
  //   // element: <DataTables />,
  //   children: [
  //     {
  //       name: "Test",
  //       path: "/Test"
  //     }
  //   ]
  // },
  {
    name: "Profile",
    layout: "/admin",
    path: "/profile",
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    // element: <Profile />,
  },
  {
    name: "Services",
    layout: "/admin",
    path: "/services",
    icon: (
      <Icon as={MdDesignServices} width="20px" height="20px" color="inherit" />
    ),
    // element: <Profile />,
  },
  {
    name: "Notication Template",
    layout: "/admin",
    path: "/notification-template",
    icon: (
      <Icon as={MdNotifications} width="20px" height="20px" color="inherit" />
    ),
    // element: <Profile />,
    children: [
      {
        name: "Notification Template Form",
        layout: "/admin",
        path: "/form",
        // element: <Form />,
      },
    ]
  },
  
  {
    path: "notification-template/view-template/:id",
    // element: <ViewTemplate />,
  },
  {
    path: "notification-template/update-form",
    // element: <UpdateForm />,
  },
  {
    path: "notification-template/update-form/:id",
    // element: <UpdateForm />,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    // element: <SignInCentered />,
  },
  {
    name: "RTL Admin",
    layout: "/rtl",
    path: "/rtl-default",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    // element: <RTL />,
  },
];

export default routes;
// const routes = createBrowserRouter([
//   {
//     name: "Auth",
//     path: "/auth",
//     // icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
//     // component: AdminLayout,
//     element: <AuthLayout />,
//   },
//   {
//     name: "RTL",
//     path: "/rtl",
//     // icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
//     // component: AdminLayout,
//     element: <RtlLayout />,
//   },
//   {
//     name: "Admin",
//     path: "/admin",
//     // icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
//     // component: AdminLayout,
//     element: <AdminLayout />,
//     children: [
//         {
//           name: "Main Dashboard",
//           layout: "/admin",
//           path: "/default",
//           icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
//           element: <MainDashboard />,
//             },
//             {
//               name: "NFT Marketplace",
//               // layout: "/admin",
//               path: "/nft-marketplace",
//               icon: (
//                 <Icon
//                   as={MdOutlineShoppingCart}
//                   width='20px'
//                   height='20px'
//                   color='inherit'
//                 />
//               ),
//               element: <NFTMarketplace />,
//               secondary: true,
//             },
//             {
//               name: "Data Tables",
//               // layout: "/admin",
//               icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
//               path: "/data-tables",
//               element: <DataTables />,
//             },
//             {
//               name: "Profile",
//               // layout: "/admin",
//               path: "/profile",
//               icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
//               element: <Profile />,
//             },
//             {
//               name: "Sign In",
//               // layout: "/auth",
//               path: "/sign-in",
//               icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
//               element: <SignInCentered />,
//             },
//             {
//               name: "RTL Admin",
//               // layout: "/rtl",
//               path: "/rtl-default",
//               icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
//               element: <RTL />,
//             },
//     ]
//   },
// ]);

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <RouterProvider router={routes} />
//   </React.StrictMode>
// );
