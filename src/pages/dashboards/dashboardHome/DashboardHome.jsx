import React from 'react'
import useRole from './../../../hooks/useRole';
import Loading from '../../shared/Loading';
import AdminDashBoardHome from './AdminDashBoardHome';
import RiderDashboardHome from './RiderDashboardHome';
import UserDashBoardHome from './UserDashBoardHome';

function DashboardHome() {

  const { role, roleLoading } = useRole()
  if (roleLoading) return <Loading />
  if (role === "admin") return <AdminDashBoardHome />
  if (role === "rider") return <RiderDashboardHome />
  if(role === "user") return <UserDashBoardHome/>
}

export default DashboardHome