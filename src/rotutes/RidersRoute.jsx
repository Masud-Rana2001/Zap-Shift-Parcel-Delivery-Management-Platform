import React from 'react'
import {Navigate,useLocation} from 'react-router'
import useAuthProvider from './../hooks/useAuthProvider';
import Loading from '../pages/shared/Loading';
import useRole from '../hooks/useRole';
import Forbidden from '../pages/shared/Forbidden';

function RidersRoute({ children }) {
  const {  loading } = useAuthProvider();
  const {role,roleLoading} = useRole()
  
  

  if (loading && roleLoading) return <Loading/>
  if(role !== "rider") return <Forbidden/>

  return children
}

export default RidersRoute 