import React from 'react'
import useAuthProvider from './useAuthProvider';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';


function useRole() {
  const { user } = useAuthProvider();
  const axiosSecure = useAxiosSecure()
   const { data :role  ,isLoading:roleLoading} = useQuery({
        queryKey: ['role', user.email],
      queryFn: async () => {
        const res = await axiosSecure.get(`/users/${user.email}/role`);
        return res.data?.role || "user"
        }
    })

  return {role,roleLoading}
}

export default useRole