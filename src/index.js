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

import { Auth0Provider } from "@auth0/auth0-react";

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
      // {
      //   path: "nft-marketplace",
      //   element: <NFTMarketplace />,
      // },
      // {
      //   path: "data-tables",
      //   element: <DataTables />,
      //   children: [
      //     {
      //       path: "data-tables/test",
      //       element: <Test />,
      //     },
      //   ],
      // },
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
      {
        path: "notification-template/update-form/:id",
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
      <Auth0Provider
        domain="umbartha.eu.auth0.com"
        clientId="qqq9vpddsvNg0kMOJjryRF2wwOHP2WXs"
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <RouterProvider router={router} />
      </Auth0Provider>
    </React.StrictMode>
  </ChakraProvider>,
  document.getElementById("root")
);
