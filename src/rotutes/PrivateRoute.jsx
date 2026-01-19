import React from 'react'
import {Navigate,useLocation} from 'react-router'
import useAuthProvider from './../hooks/useAuthProvider';
import Loading from '../pages/shared/Loading';

function PrivateRoute({ children }) {
  const { user, loading } = useAuthProvider();
  const location = useLocation();


  if (loading) return <Loading/>
  if(!user) return <Navigate state={location.pathname} to="/login"></Navigate>

  return children
}

export default PrivateRoute 