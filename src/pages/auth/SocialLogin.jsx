
import useAuthProvider from './../../hooks/useAuthProvider';
import { NavLink, useLocation, useNavigate } from 'react-router';
import useAxiosSecure from './../../hooks/useAxiosSecure';


function SocialLogin() {
  const { loginWithGoogle ,signInGoogle } = useAuthProvider();
  const axiosSecure = useAxiosSecure()
    const location = useLocation();
  const navigate = useNavigate();

  
  const handleLogin = async (e) => {
    e.stopPropagation();
    const user = await loginWithGoogle()
    if (user) {
      navigate(location?.state || "/")
    }
  };

  const handleGoogleLogin = async (e) => {
    e.stopPropagation();
    try {
      const result = await loginWithGoogle();
      console.log(result)
     

      const userInfo = {
        email: result.email,
        displayName: result.displayName,
        photoURL: result.photoURL
      };
      console.log("userInfo",userInfo)
      const res = await axiosSecure.post('/users', userInfo);
      console.log('user data has been stored', res.data);

      navigate(location?.state || "/")
    } catch (error) {
      console.error('Google login failed:', error);
      // show quick feedback while debugging
      alert('Login failed: ' + (error.message || 'See console for details'));
    }
  }

  return (
    <div>
      
      <div className="flex  items-center justify-center my-5">
        <span className=" w-16 border"></span>
        <span className="mx-3">OR</span>
        <span  className=" w-16 border"></span>
      </div>
      <div>
        {/* Google */}
        <button
          onClick={handleGoogleLogin}
          className="btn bg-white text-black w-full border-[#e5e5e5]">
          <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
          Login with Google
        </button>
      </div>
    </div>
  )
}

export default SocialLogin