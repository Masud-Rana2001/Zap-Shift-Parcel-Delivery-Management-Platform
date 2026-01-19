import { Outlet } from "react-router";

import Footer from "../pages/shared/Footer"
import Navbar from "../pages/shared/Navbar"

function RootLayout() {
  return (
    <div className="bg-gray-100 ">
      <div className=" w-11/12 mx-auto">
      
        <div className="pt-5">
        <Navbar />
        </div>
          
        <div className="min-h-screen">

      <Outlet/>
        </div>
        <div className="pb-5">
          
      <Footer/>
          </div>
      </div>
    </div>
  )
}

export default RootLayout