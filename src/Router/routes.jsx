import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../page/Home/Home/Home";
import Menu from "../page/Menu/Menu/Menu";
import Order from "../page/Order/Order/Order";
import Login from "../page/Login/Login";
import Signup from "../page/Signup/Signup";
import Secret from "../page/Secret/Secret";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import MyCart from "../page/Dashboard/MyCart/MyCart";
import AllUsers from "../page/AllUsers/AllUsers";
import AddItem from "../page/AddItem/AddItem";
import AdminRoute from "./AdminRoute";
import ManageItem from "../page/ManageItem/ManageItem";
import Payment from "../page/Dashboard/Payment/Payment";
import UserHome from "../page/Dashboard/UserHome/UserHome";
import AdminHome from "../page/Dashboard/AdminHome/AdminHome";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main/>,
        children: [
            {
                path: '/',
                element: <Home/>
            },
            {
                path: '/menu',
                element: <Menu/>
            },
            {
                path: '/order/:category',
                element: <Order/>
            },
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/signup',
                element: <Signup/>
            },
            {
                path: '/secret',
                element: <PrivateRoute><Secret/></PrivateRoute>
            }
        ]
    },
    {
        path: "dashboard",
        element: <PrivateRoute><Dashboard/></PrivateRoute>,
        children: [
            {
                path: 'userhome',
                element: <UserHome/>
            },
            {
                path: 'mycart',
                element: <MyCart/>
            },
            {
                path: 'payment',
                element: <Payment/>
            },
            {
                path: 'adminhome',
                element: <AdminRoute><AdminHome/></AdminRoute>
            },
            {
                path: 'allusers',
                element: <AdminRoute><AllUsers/></AdminRoute>
            },
            {
                path: 'addItem',
                element: <AdminRoute><AddItem/></AdminRoute>
            },
            {
                path: 'manageItem',
                element: <AdminRoute><ManageItem/></AdminRoute>
            }
        ]
    }
]);