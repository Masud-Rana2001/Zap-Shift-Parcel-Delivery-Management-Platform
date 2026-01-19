import React from 'react'
import { NavLink } from 'react-router';

function NavItem({ to, icon, label }) {
  return (
     <li className="mt-4 z-10">
      <NavLink 
        to={to} 
        className="group flex items-center gap-3 relative p-2 rounded hover:bg-base-300 transition"
      >
        {/* ICON */}
        <span className="text-2xl">{icon}</span>

        {/* TEXT - Large screen only */}
        <span className="hidden lg:inline">{label}</span>

        {/* TOOLTIP - Small screen ONLY */}
        <span
          className="
            lg:hidden
            absolute left-full top-1/2 -translate-y-1/2 ml-2
            px-2 py-1 rounded bg-gray-800 text-white text-xs
            whitespace-nowrap
            opacity-0 invisible
            group-hover:opacity-100 group-hover:visible
            transition
          "
        >
          {label}
        </span>
      </NavLink>
    </li>
  )
}

export default NavItem

