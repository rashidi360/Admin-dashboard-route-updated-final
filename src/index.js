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
import FormNotificationTemplate from "views/admin/notification-template/components/FormNotificationTemplate";
import ViewNotificationTemplate from "views/admin/notification-template/components/ViewNotificationTemplate";
import UpdateFormNotificationTemplate from "views/admin/notification-template/components/UpdateFormNotificationTemplate";
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
// Counsellor Data Form
import DataForm from "views/admin/counsellor/dataForm";
import ViewDataForm from "views/admin/counsellor/dataForm/components/ViewDataForm";
import FormDataForm from "views/admin/counsellor/dataForm/components/FormDataForm";
import UpdateFormDataForm from "views/admin/counsellor/dataForm/components/UpdateFormDataForm";


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
      //----------PaymentOption------------
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
      //----------Location------------
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
      //----------Coupons------------
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
      //----------Counsellor------------
      {
        path: "counsellor",
        element: <Counsellor />,
      },
      //----------CounsellorRates------------
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
      //----------CProfile------------
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
      //------------DataForm--------------
      {
        path: "counsellor/data-form",
        element: <DataForm />,
      },
      {
        path: "counsellor/data-form/form",
        element: <FormDataForm />,
      },
      {
        path: "counsellor/data-form/view-template/:id",
        element: <ViewDataForm />,
      },
      {
        path: "counsellor/data-form/update-form",
        element: <UpdateFormDataForm />,
      },
      {
        path: "counsellor/data-form/update-form/:id",
        element: <UpdateFormDataForm />,
      },
      //----------Notification------------
      {
        path: "notification-template",
        element: <Notification />,
      },
      {
        path: "notification-template/form",
        element: <FormNotificationTemplate />,
      },
      {
        path: "notification-template/view-template/:id",
        element: <ViewNotificationTemplate />,
      },
      {
        path: "notification-template/update-form",
        element: <UpdateFormNotificationTemplate />,
      },
      {
        path: "notification-template/update-form/:id",
        element: <UpdateFormNotificationTemplate />,
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
