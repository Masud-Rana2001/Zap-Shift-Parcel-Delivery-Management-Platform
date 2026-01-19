import {useState,useEffect} from 'react'
import { AuthContext } from '../context/AuthContext'
import auth from '../firebase/firebase.config';
import { toast } from 'react-toastify';
import axios from "axios"



import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  updateProfile
} from "firebase/auth";


function AuthProvider({ children }) {
  const [user,setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  // const axiosSecure = useAxiosSecure();
  

  
  const googleProvider = new GoogleAuthProvider();
  
  //observe user state
  useEffect(() => {
    setLoading(true)
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
    
      setUser(currentUser)
      setLoading(false)
    })
    return ()=> unSubscribe()
  },[])

  //register with email and password 
  const registerUserWithEmail = async (email, password,name,photo) => {

    try {
    setLoading(true)
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
      const user = userCredential.user;

    const formData = new FormData()
    formData.append("image", photo)
    
    //apload to imagebb

    const image_Api_url = `https://api.imgbb.com/1/upload?expiration=600&key=${import.meta.env.VITE_YOUR_CLIENT_API_KEY}`


    const uploaderRes = await axios.post(image_Api_url, formData);
  
  
    if (user) {
       await profileUpdate(name, uploaderRes.data.data.display_url,email)
    }
      if(user) toast.success("Registation successful")
      setUser(user);
      return user
  } catch (error) {
    console.log("Firebase Error:", error);
    throw error;
  } finally {
    setLoading(false)
  }
  };
  
  //update profile
    const profileUpdate = async (name,photo,email) => {
    try {
    const result = await  updateProfile(auth.currentUser,  {
      displayName: name, photoURL: photo
    })
      const userInfo = {
        email,
        displayName: name,
        photoURL : photo
      }
      const userResult = await axiosSecure.post("/users", userInfo);
      console.log(userResult , "User created in the database")
      return result
    } catch (error) {
      console.log("Firebase Error:", error);
    throw error;
    }
  };





      const registerUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

        const updateUserProfile = (profile) =>{
        return updateProfile(auth.currentUser, profile)
    }
    








const signInWithEmail = async (email, password) => {
  try {
    setLoading(true)
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    if(user) toast.success("Signin successful")
    
    setUser(user);
    return user
  } catch (error) {
    console.log("Firebase Error:", error);
    throw error;
  }finally {
    setLoading(false)
  }
  };
  

  const loginWithGoogle =async () => {
    try {
      setLoading(true)
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      if(user) toast.success("Login successful")
      setUser(user);
      return user
    } catch (error) {
      console.log("Firebase Error:", error);
    throw error;
    }finally {
    setLoading(false)
  }
  };

  const logout = async () => {
    try {
      setLoading(true)
       await signOut(auth);
       toast.success("Logout successful")
    } catch (error) {
      console.log("Firebase Error:", error);
    throw error;
    }finally {
    setLoading(false)
  }
  };



  const signInGoogle = async () => {
      try {
        
        setLoading(true);
        const user = await signInWithPopup(auth, googleProvider);
        setUser(user.user)
        return user
      } catch (error) {
      console.log("Firebase Error:", error);
    throw error;
    }finally {
    setLoading(false)
  }
  };




  const value = {
    user,
    logout,
    loading,
    registerUserWithEmail,
    signInWithEmail,
    loginWithGoogle,
    profileUpdate,
    registerUser,
    updateUserProfile,
    createUserWithEmailAndPassword,
    updateProfile,
    signInGoogle

    
  }


  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider