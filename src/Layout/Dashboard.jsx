import { NavLink, Outlet } from "react-router-dom";
import { FaShoppingCart, FaWallet, FaCalendarAlt, FaHome } from 'react-icons/fa';
import useCart from "../hooks/useCart";
import { ImMenu } from "react-icons/im";
import { IoFastFood } from "react-icons/io5";
import { ImSpoonKnife, ImBook, ImUsers } from "react-icons/im";
import { GiHamburgerMenu } from "react-icons/gi";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
    const [cart] = useCart();
    // TODO: load admin user from server
    // const isAdmin = true
    const [isAdmin] = useAdmin()
    return (
        <div className="drawer drawer-mobile">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
                    <GiHamburgerMenu/>
                </label>
                <Outlet />
            </div>
            <div className="drawer-side bg-[#D1A054]">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 text-base-content">
                    {
                        isAdmin ? <>
                            <li><NavLink to="/dashboard/adminhome"><FaHome></FaHome> Admin Home</NavLink></li>
                            <li><NavLink to="/dashboard/addItem"> <ImSpoonKnife /> Add Items</NavLink></li>
                            <li><NavLink to="/dashboard/manageItem"><GiHamburgerMenu /> Manage Items</NavLink></li>
                            {/* <li><NavLink to="/"><ImBook /> Manage Bookings</NavLink></li> */}
                            <li><NavLink to="/dashboard/allusers"><ImUsers /> All users</NavLink></li>
                        </> : <>
                            <li><NavLink to="/dashboard/userhome"><FaHome></FaHome> User Home</NavLink></li>
                            <li><NavLink to="/dashboard/reservations"><FaCalendarAlt></FaCalendarAlt> Reservations</NavLink></li>
                            <li><NavLink to="/dashboard/payment-history"><FaWallet></FaWallet> Payment History</NavLink></li>
                            <li>
                                <NavLink to="/dashboard/mycart"><FaShoppingCart></FaShoppingCart> My Cart
                                    <span className="badge inl badge-secondary">+{cart?.length || 0}</span>
                                </NavLink>

                            </li>
                        </>
                    }
                    <div className="divider"></div>
                    <li><NavLink to="/"><FaHome></FaHome> Home</NavLink> </li>
                    <li><NavLink to="/menu"> <ImMenu /> Our Menu</NavLink></li>
                    <li><NavLink to="/order/salad"> <IoFastFood /> Order Food</NavLink></li>
                </ul>

            </div>
        </div>
    );
};

export default Dashboard;