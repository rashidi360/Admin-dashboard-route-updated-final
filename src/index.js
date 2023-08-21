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
// Notification Template
import Notification from "views/admin/notification-template";
import Form from "views/admin/notification-template/components/Form";
import ViewTemplate from "views/admin/notification-template/components/ViewTemplate";
import UpdateForm from "views/admin/notification-template/components/UpdateForm";
// Payment Option
import PaymentOption from "views/admin/paymentOption";
import VeiwPaymentOption from "views/admin/paymentOption/components/VeiwPaymentOption";
import FormPaymentOption from "views/admin/paymentOption/components/FormPaymentOption";
import UpdateFormPaymentOption from "views/admin/paymentOption/components/UpdateFormPaymentOption";
// Coupons
import Coupons from "views/admin/coupons";
import ViewCoupon from "views/admin/coupons/components/ViewCoupon";
import FormCoupon from "views/admin/coupons/components/FormCoupon";
import UpdateFormCoupon from "views/admin/coupons/components/UpdateFormCoupon";
// Location
import Location from "views/admin/location";
// Counsellor
import Counsellor from "views/admin/counsellor";
// Counsellor Rates
import Rates from "views/admin/counsellor/rates";
import ViewRates from "views/admin/counsellor/rates/components/ViewRates";
import FormRates from "views/admin/counsellor/rates/components/FormRates";
import UpdateFormRates from "views/admin/counsellor/rates/components/UpdateFormRates";
// Counsellor Profile
import CProfile from "views/admin/counsellor/profile";



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
      // {
      //   path: "profile",
      //   element: <Profile />,
      // },
      {
        path: "services",
        element: <Services />,
      },
      {
        path: "payment-option",
        element: <PaymentOption />,
      },
      {
        path: "payment-option/form",
        element: <FormPaymentOption />,
      },
      {
        path: "payment-option/view-template/:id",
        element: <VeiwPaymentOption />,
      },
      {
        path: "payment-option/update-form",
        element: <UpdateFormPaymentOption />,
      },
      {
        path: "payment-option/update-form/:id",
        element: <UpdateFormPaymentOption />,
      },
      {
        path: "location",
        element: <Location />,
      },
      // {
      //   path: "location/form",
      //   element: <FormLocation />,
      // },
      // {
      //   path: "location/view-template/:id",
      //   element: <VeiwLocation />,
      // },
      // {
      //   path: "location/update-form",
      //   element: <UpdateFormLocation />,
      // },
      // {
      //   path: "location/update-form/:id",
      //   element: <UpdateFormLocation />,
      // },
      {
        path: "coupon",
        element: <Coupons />,
      },
      {
        path: "coupon/form",
        element: <FormCoupon />,
      },
      {
        path: "coupon/form/:id",
        element: <FormCoupon />,
      },
      {
        path: "coupon/view-template/:id",
        element: <ViewCoupon />,
      },
      {
        path: "coupon/update-form",
        element: <UpdateFormCoupon />,
      },
      {
        path: "coupon/update-form/:id",
        element: <UpdateFormCoupon />,
      },
      {
        path: "counsellor",
        element: <Counsellor />,
      },
      {
        path: "counsellor/rates",
        element: <Rates />,
      },
      {
        path: "counsellor/rates/form",
        element: <FormRates />,
      },
      {
        path: "counsellor/rates/view-template/:id",
        element: <ViewRates />,
      },
      {
        path: "counsellor/rates/update-form",
        element: <UpdateFormRates />,
      },
      {
        path: "counsellor/rates/update-form/:id",
        element: <UpdateFormRates />,
      },
      {
        path: "counsellor/rates/update-form/:id",
        element: <UpdateFormRates />,
      },
      {
        path: "counsellor/profiles",
        element: <CProfile />,
      },
      // {
      //   path: "counsellor/rates/form",
      //   element: <FormRates />,
      // },
      // {
      //   path: "counsellor/rates/view-template/:id",
      //   element: <ViewRates />,
      // },
      // {
      //   path: "counsellor/rates/update-form",
      //   element: <UpdateFormRates />,
      // },
      // {
      //   path: "counsellor/rates/update-form/:id",
      //   element: <UpdateFormRates />,
      // },
      // {
      //   path: "coupon/update-form/:id",
      //   element: <UpdateFormCoupon />,
      // },
      {
        path: "counsellor/data-form",
        // element: <CProfile />,
      },
      // {
      //   path: "counsellor/rates/form",
      //   element: <FormRates />,
      // },
      // {
      //   path: "counsellor/rates/view-template/:id",
      //   element: <ViewRates />,
      // },
      // {
      //   path: "counsellor/rates/update-form",
      //   element: <UpdateFormRates />,
      // },
      // {
      //   path: "counsellor/rates/update-form/:id",
      //   element: <UpdateFormRates />,
      // },
      // {
      //   path: "coupon/update-form/:id",
      //   element: <UpdateFormCoupon />,
      // },
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
