import {useState} from 'react'
import useAxiosSecure from './../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaUserShield } from "react-icons/fa6";
import { FiShieldOff } from "react-icons/fi";
import  Swal from 'sweetalert2';
import Loading from '../shared/Loading';
import useDebounce from '../../hooks/useDebounce';
function ManageUser() {
  const [searchText, setSearchText] = useState("");
  const debounceSearch = useDebounce(searchText,400)
   const axiosSecure = useAxiosSecure();
    const {refetch, data :users=[],isLoading} = useQuery({
      queryKey: ["users",debounceSearch],
      queryFn: async () => {
        const res = await axiosSecure.get(`/manage-users?searchText=${debounceSearch}`);
        return res.data
      }
    })


  
  
  
    const handleRole = (user,role) => {
      const roleInfo = { role: role };

     
       
                  Swal.fire({
                  title: `Are you confirm to make ${user.displayName} to ${role} ?`,
                  text: ``,
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes"
                }).then((result) => {
                  if (result.isConfirmed) {
                     axiosSecure.patch(`users/${user._id}/role`, roleInfo)
                      .then(result => {
                        if (result.data.acknowledged) {
                          refetch()
                          Swal.fire({ 
                         title: `${user.displayName} marked as an ${role}`,
                         showConfirmButton :false,
                         icon: "success",
                         timer : 2000
           })
                        }
                      })
                  }
                })

      
  };
  
  
  if(isLoading)return <Loading/>
  
  return (
    <div>
      
      <div className="overflow-x-auto">
        <h2 className="text-4xl text-center my-4">Manage Users</h2>

      <div className="flex justify-center mb-4">
        <label className="input">
        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input type="search" onChange={(e)=>setSearchText(e.target.value)} placeholder="Search user" />
      </label>
        </div>
        
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>SI</th>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Admin Action</th>
        <th>Other Action</th>
      </tr>
    </thead>
    <tbody>
          {
            users.map((user, index) => (
              <tr key={user._id}>
                <td>{index+1 }</td>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={user.photoURL}
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
                      <div className="font-bold">{ user.displayName}</div>
              
            </div>
          </div>
        </td>
       
        <td>
          
          {user.email}
        </td>
                <td>{user.role }</td>
                <th>
                  {
                    user.role === "admin" ?
                      <button onClick={() => handleRole(user, "user")} className="btn bg-red-400 btn-square text-gray-900"
                      >
                        <FiShieldOff />
                      </button>

                      : <button onClick={()=>handleRole(user,"admin")} className="btn bg-green-400 btn-square text-gray-900">
                        <FaUserShield />
                       </button>
                  }
          
        
        </th>
      </tr>
            ))
      }
      
    </tbody>

  </table>
</div></div>
  )
}

export default ManageUser