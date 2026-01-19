import React from 'react' 
import logo from "../../assets/logo.png"
import { NavLink } from 'react-router';

function Logo() {
  return (
    <>
      <NavLink to="/">

    <div className="flex items-end ">
      <img className="sm:w-10 h-10" src={logo} alt="" />
      <h3 className="-ms-2.5 text-xl sm:text-3xl  font-bold">ZapShift</h3>
    </div>
      </NavLink>
    </>
  )
}

export default Logo