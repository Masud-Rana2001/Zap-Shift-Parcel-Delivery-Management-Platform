import { createBrowserRouter } from "react-router";
import AuthLayout from "../layout/AuthLayout";

import DashboardLayout from "../layout/DashboardLayout";
import RootLayout from "../layout/RootLayout";
import About from "../pages/about/About";
import AddParcel from "../pages/addParcel/AddParcel";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Coverage from "../pages/coverage/Coverage";
import ApproveRiders from "../pages/dashboards/ApproveRiders";
import AssignedDeliveries from "../pages/dashboards/AssignedDeliveries";
import AssignRiders from "../pages/dashboards/AssignRiders";
import ManageUser from "../pages/dashboards/ManageUser";
import MyPercels from "../pages/dashboards/MyPercels";
import Payment from "../pages/dashboards/Payment";
import PaymentCancelled from "../pages/dashboards/PaymentCancelled";
import PaymentsHistory from "../pages/dashboards/PaymentsHistory";
import PaymentSuccess from "../pages/dashboards/PaymentSuccess";
import HomePage from "../pages/home/HomePage";
import Rider from "../pages/rider/Rider";
import AdminRoute from "./AdminRoute";
import PrivateRoute from './PrivateRoute';
import RidersRoute from "./RidersRoute";
import CompletedDeliveries from "../pages/dashboards/CompletedDeliveries";
import TrackParcel from "../pages/Track/TrackParcel";
import DashboardHome from "../pages/dashboards/dashboardHome/DashboardHome";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      {
    path: "/coverage",
    Component: Coverage,
    loader: ()=> fetch('/warehouses.json').then(res =>res.json())
  },
      {
    path: "/aboutus",
    Component: About,
      },
      {
    path: "/track-parcel/:trackingId",
    Component: TrackParcel,
      },
      {
        path: "/rider",
        element : <PrivateRoute><Rider></Rider></PrivateRoute>,
        loader: ()=> fetch('/warehouses.json').then(res =>res.json())
  }, {
        path: "/add-parcel",
        element: <PrivateRoute><AddParcel></AddParcel></PrivateRoute>,
        loader: ()=> fetch('/warehouses.json').then(res =>res.json())
      }
    ]
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {

        path : "/login",
        Component : Login
      }, {
        path: "register",
        Component :Register
      }
    ]
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children: [
      {
        index: true,
        element : <DashboardHome/>
      },
      {
        path: 'my-percels',
        element : <MyPercels/>
      }, {
        path: "payment/:parcelId",
        element :<Payment/>
      }, {
        path: "payment-success",
        element : <PaymentSuccess/>
      },{
        path: "payment-cancelled",
        element : <PaymentCancelled/>
      }, {
        path: "payments-history",
        element : <PaymentsHistory/>
      },
      // Rider related routes
      {
        path: "assigned-deliveries",
        element : <RidersRoute><AssignedDeliveries/></RidersRoute>
      },
      {
        path: "completed-deliveries",
        element : <RidersRoute><CompletedDeliveries/></RidersRoute>
      },
      // Admin related routes
      {
        path: "approve-riders",
        element :<AdminRoute><ApproveRiders/></AdminRoute>
      }, {
        path: "manage-users",
        element :<AdminRoute><ManageUser/></AdminRoute> ,
      
      },{
        path: "assign-riders",
        element :<AdminRoute><AssignRiders/></AdminRoute> ,
        
      }
    ]
  }
]);