import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import { FaShoppingCart } from 'react-icons/fa';
import useCart from '../../hooks/useCart';
import useAdmin from '../../hooks/useAdmin';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext)
    const [cart] = useCart()
    const [isAdmin] = useAdmin()
    
    const handleLogout = () => {
        logout()
            .then(() => { })
            .catch(error => {
                console.error(error)
                Swal.fire({
                    icon: 'error',
                    title: `${error.code}`,
                    text: `${error.message}`
                })
            })
    }
    const navItems = <>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/menu">Menu</Link></li>
        <li><Link to="/order/salad">Order</Link></li>
        {
           user && <li><Link to={isAdmin ? '/dashboard/adminhome' : '/dashboard/userhome'}>Dashboard</Link></li>
        }
        {user ? <li><Link onClick={handleLogout}>Logout</Link></li> : <li><Link to="/login">Login</Link></li>}

    </>
    return (
        <div className="navbar fixed z-10 bg-opacity-30 text-white bg-black max-w-screen-xl">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {navItems}
                    </ul>
                </div>
                <a className="btn btn-ghost normal-case text-xl">Bistro Boss</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navItems}
                </ul>
            </div>
           <div className="navbar-end">
                {user && <Link to='/dashboard/mycart'>
                    <div className='flex gap-2'>
                        <FaShoppingCart size='1.5em' />
                        {user && <div className="-ms-3 -mt-3 badge badge-secondary">+ {cart?.length || 0}</div>}
                    </div>
                </Link>}
            </div>
        </div>
    );
};

export default Navbar;