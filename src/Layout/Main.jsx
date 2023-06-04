import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../Shared/Footer/Footer';
import Navbar from '../Shared/Navbar/Navbar';


const Main = () => {
    const location = useLocation()
    const hideNavFotter = location.pathname.includes('login') || location.pathname.includes('signup')
    
    return (
        <div>
            {hideNavFotter || <Navbar/>}
            <Outlet/>
            {hideNavFotter || <Footer/>}
        </div>
    );
};

export default Main;