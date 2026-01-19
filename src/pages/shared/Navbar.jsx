import Logo from "./Logo";

import {NavLink} from 'react-router';
import useAuthProvider from './../../hooks/useAuthProvider';
import Loading from "./Loading";
const Navbar = () => {
  const { loading, user, logout } = useAuthProvider();


  const links = <>
    {/* <li><NavLink to="/services">Services</NavLink></li> */}
    {/* <li><NavLink to="/coverage">Coverage</NavLink></li> */}
    <li><NavLink to="/bearider">Be a Rider</NavLink></li>
    <li><NavLink to="/add-parcel">Add Parcel</NavLink></li>
    {/* <li><NavLink to="/pricing">Pricing </NavLink></li> */}
    <li><NavLink to="/aboutus">About Us </NavLink></li>
    {
      user && (
        <>
         <li><NavLink to="/dashboard">Dashboard</NavLink></li>
         <li><NavLink to="/dashboard/my-percels">My Percels</NavLink></li>
        </>
      )
    }
    
  </>
  
  if(loading) return <Loading/>
  return (
    <>
        <div className="navbar bg-white shadow-sm rounded-xl ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              {links}
            </ul>
          </div>
          <Logo/>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {links}
          </ul>
        </div>
        <div className="navbar-end">
          <><NavLink to="/rider" className="btn mx-4 bg-primary" > Be A Rider</NavLink></>
          {
            user ?
               <>
                <NavLink className="btn" onClick={logout}>Sign Out</NavLink>
                <img className="w-12 h-12 mx-2 rounded-full border" src={user?.photoURL || "/user.jpeg"} alt="" />
               </>
              :
              <>
                <NavLink className="btn" to="/login">Login</NavLink>
              </>
          }
          
        </div>
      </div>
    </>
  );
};

export default Navbar;