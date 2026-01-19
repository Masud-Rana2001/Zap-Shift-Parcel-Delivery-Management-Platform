import { Outlet } from "react-router";
import Logo from "../pages/shared/Logo";

import authImage from '../assets/authImage.png'
function AuthLayout() {
  return (
    <div className="bg-gray-100 ">
      <div className=" w-11/12 mx-auto">
        
        <div className="pt-5">
        <Logo/>
        </div>
          
        <div className=" flex justify-between items-center bg-[#8FA74830]">
           <div className="flex-1 bg-gray-100 ">
            <Outlet/>
           </div>
           <div className="flex-1   ">
             <img src={authImage} alt="" />
          </div>
        </div>

      </div>
    </div>
  )
}

export default AuthLayout