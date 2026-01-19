import axios from 'axios';
import { useForm } from "react-hook-form";
import useAuthProvider from '../../hooks/useAuthProvider';
import { useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";
import { NavLink ,useLocation,useNavigate} from 'react-router';
import SocialLogin from "./SocialLogin";
import useAxiosSecure from "../../hooks/useAxiosSecure";
// import useAxiosSecure from '../hooks/useAxiosSecure';
import auth from './../../firebase/firebase.config';

function Register() {
    const location = useLocation();
  const navigate = useNavigate()
  const axiosSecure = useAxiosSecure();

  const {registerUserWithEmail,registerUser,updateUserProfile,createUserWithEmailAndPassword,updateProfile}  = useAuthProvider()
  const {
    register,
    handleSubmit,
   
    formState: { errors },
  } = useForm();


const handleFormSubmit = async (data) => {
  try {
    const {name,email,password,photo} = data 
    const user = await registerUserWithEmail(email, password, name, photo[0]);
    if (user) {
     navigate(location?.state || "/")
   }
  } catch (err) {
    console.log("Register Error:", err);
  }
  };
  
const handleFormSubmit2 =  (data) => {
  const profileImg = data.photo[0];
  registerUser(data.email, data.password)
            .then(() => {

                // 1. store the image in form data
                const formData = new FormData();
                formData.append('image', profileImg);

                // 2. send the photo to store and get the ul
                const image_API_URL =  `https://api.imgbb.com/1/upload?expiration=600&key=${import.meta.env.VITE_YOUR_CLIENT_API_KEY}`


                axios.post(image_API_URL, formData)
                    .then(res => {
                        const photoURL = res.data.data.url;

                        // create user in the database
                        const userInfo = {
                            email: data.email,
                            displayName: data.name,
                            photoURL: photoURL
                        }
                        axiosSecure.post('/users', userInfo)
                        .then(res =>{
                            if(res.data.insertedId){
                                console.log('user created in the database');
                            }
                        })


                        // update user profile to firebase
                        const userProfile = {
                            displayName: data.name,
                            photoURL: photoURL
                        }

                        updateUserProfile(userProfile)
                            .then(() => {
                                console.log('user profile updated done.')
                                navigate(location.state || '/');
                            })
                            .catch(error => console.log("Error in post user data in Database",error))
                    })



            })
            .catch(error => {
                console.log("error in create image_API_URL",error)
            })
  };
  






  return (
    <div className="flex justify-center">

    <div className='py-20 w-full '>
      <h2 className='text-4xl font-semibold'>Welcome to ZapShift</h2>
      <p className='my-4 '>Register please</p>


      <div className="">
         <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <form onSubmit={handleSubmit(handleFormSubmit2)}>
            <fieldset className="fieldset">
              
              <label className="label">Full name</label>
              <input
                type="text"
                className="input"
                placeholder="Full Name"
                {...register("name", {
                  required: "Name is required",
                })}
              />
                {errors.email && (
                    <p className="text-red-600 text-sm">
                      {errors.email.message}
                    </p>
                  )}


                <label className="label">Photo</label>
                 
              <input
                type="file"
                className="file-input"
                placeholder="Import your photo"
                {...register("photo", {
                  required: "photo is required",
                })}
              />
                {errors.photo && (
                    <p className="text-red-600 text-sm">
                      {errors.photo.message}
                    </p>
                  )}


              <label className="label">Email</label>
              <input
                type="email"
                className="input"
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
                className="input"
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
              
          <button className="btn btn-primary text-gray-900 mt-4">Register</button>
                </fieldset>
                </form>
              <p>Don’t have any account?
                <NavLink
                  to="/login"
                  state={location.state}
                  className="text-primary/101 underline">Login</NavLink>
              </p>
                              <SocialLogin/>
              
      </div>
      </div>
      </div>
    </div>
  </div>
  )
}

export default Register
