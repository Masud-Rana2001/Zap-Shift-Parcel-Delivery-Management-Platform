import React from 'react'
import useAxiosSecure from './../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { NavLink } from 'react-router';
import { LuUserRoundCheck } from "react-icons/lu";
import { FaUserMinus } from "react-icons/fa6"
import  Swal  from 'sweetalert2';
function ApproveRiders() {
  const axiosSecure = useAxiosSecure();
  const {refetch, data :riders=[]} = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data
    }
  })

  const updateStatus = (rider, status) => {
      const updateInfo = { status: status,email :rider.riderEmail };
    axiosSecure.patch(`riders/${rider._id}`, updateInfo)
      .then((res) => {
        refetch()
        if (res.data.acknowledged === true) {
          Swal.fire({
               title: "Rider has been approved!",
               text: "Your percel has been added.",
               icon: "success",
               timer : 2000
            });
          
        }
      }).catch((error) => {
      console.log(error)
    })
  };


  const  handleApproved = (rider) => {
    updateStatus(rider,"approved")
  };
  const  handleRejection = (rider) => {
    updateStatus(rider,"reject")
  };



  return (
    <div>
      
      <h2>Riders Pending Approval : {riders.length}</h2>
      <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>SI</th>
              <th>Rider Name</th>
              <th>Rider Email</th>
              <th>Rider Age</th>
              <th>Area</th>
              <th>Appication status</th>
              <th>Work status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
                  {/* row 1 */}
                  {
                    riders.map((rider, index) => (
                        <tr key={rider._id}>
                        <th>{index + 1}</th>
                        <td>{ rider.riderName}</td>
                        <td>{ rider.riderEmail}</td>
                        <td>{ rider.riderAge}</td>
                        <td>{rider.riderWareHouse},{rider.riderDistrict}</td>
                        <td>
                          <div
                            className={`badge
                                 ${rider.status === "pending" && "badge-warning"}
                                 ${rider.status === "approved" && "badge-success"}
                                 ${rider.status === "reject" && "badge-error"}`
                            }
                            >
                              {rider.status}
                            </div>

                        </td>
                        <td>{rider.workStatus }</td>
                        <td>
                          <button onClick={()=>handleApproved(rider)} className="btn btn-sm bg-primary">
                            <LuUserRoundCheck />
                          </button>

                          <button onClick={()=>handleRejection(rider)} className="btn btn-sm bg-primary">
                            <FaUserMinus  />
                            </button>
                          
                
                        
                        </td>
                        </tr>   
                    ))
                  }
          </tbody>
        </table>
    </div>
  )
}

export default ApproveRiders