import React from 'react'

import { useForm } from "react-hook-form";
import useAuthProvider from '../../hooks/useAuthProvider';
import { NavLink, useLocation ,useNavigate} from 'react-router';
import SocialLogin from './SocialLogin';


function Login() {
  const { signInWithEmail } = useAuthProvider()
  const location = useLocation();
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
   
    formState: { errors },
  } = useForm();


  const handleFormSubmit =async (data) => {
    try {
      const user = await signInWithEmail(data.email, data.password);
      if (user) {
        
        navigate(location?.state || '/')
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
     <div className="flex justify-center ">
    <div className='py-20 px-10 w-full'>
      <h2 className='text-4xl font-semibold text-center'>Welcome Back</h2>
      <p className='my-4 text-center'>Login with ZapShift</p>


      <div  className="w-full">
         <div className="card bg-base-100  shrink-0 shadow-2xl">
            <div className="card-body">
              <form onSubmit={handleSubmit(handleFormSubmit)}>
            <fieldset className="fieldset w-full">
              
              <label className="label">Email</label>
              <input
                type="email"
                className="input  w-full"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                })}
              />
                {errors.email && (
                    <p className="text-red-600 text-sm">
                      {errors.email.message}
                    </p>
                  )}
              
             <label className="label">Password</label>
              <input
                type="password"
                className="input  w-full"
                placeholder="Password"
               {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
                  },
                })}

              />
                 {errors.password && (
                    <p className="text-red-600 text-sm">
                      {errors.password.message}
                    </p>
                  )}
              
              
              <div><a className="link link-hover">Forgot password?</a></div>
              
                <button className="btn btn-primary text-gray-900 mt-4">Login</button>
        </fieldset>
                </form>

              <p>Don’t have any account?
                <NavLink
                  to="/register"
                  state={location.state}
                  className="text-primary/101 underline">Register</NavLink> </p>
                <SocialLogin/>

      </div>
      </div>
      </div>


    </div>
    </div>
  )
}

export default Login