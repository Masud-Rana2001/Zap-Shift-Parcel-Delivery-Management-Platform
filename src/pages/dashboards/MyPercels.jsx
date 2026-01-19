import {NavLink} from 'react-router'
import { FiEdit } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoMdInformationCircleOutline } from "react-icons/io";
import Swal from 'sweetalert2';

import useAuthProvider from './../../hooks/useAuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import Loading from '../shared/Loading';

function MyPercels() {
  const { user } = useAuthProvider();
  const axiosSecure = useAxiosSecure();
 

   // Queries
  const { data : parcels =[], error, isLoading ,refetch} = useQuery({
    queryKey: ['myParcels',user?.email],
    queryFn: async () => {
      const data = await axiosSecure.get(`/parcels?email=${user?.email}`);
     
      return data.data;
    }
  })
  


  const handlePercelDelete =  (id) => {
    
    Swal.fire({
      title: "Are you confirm to delete the parcel ?",
      text: ``,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/parcel/${id}`)
          .then(result => {
            if (result.data.deletedCount) {
              refetch()
              Swal.fire({
                title: "DELETED!",
                text: "Your parcel request has been deleted",
                icon: "success"
              })
            }
          })
      }
    })
  }

  if(isLoading) return <Loading/>
    
  return (
    <div>MyPercels 
      <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th>SI</th>
        <th>Sender Name</th>
        <th>Receiver Name</th>
        <th>Parcel Name</th>
        <th>Cost</th>
        <th>TrackingId</th>
        <th>Payment <br />status</th>
    
        <th>Delivery Status</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
            {/* row 1 */}
            {
              parcels.map((parcel, index) => (
                  <tr key={parcel._id}>
                  <th>{index + 1}</th>
                  <td>{ parcel.senderName}</td>
                  <td>{ parcel.receiverName}</td>
                  <td>{ parcel.parcelName}</td>
                  <td>{parcel.cost}</td>
                  <td>
                    <NavLink to={`/track-parcel/${parcel.trackingId}`}>

                    {parcel.trackingId}
                    </NavLink>
                  </td>
                  <td>{
                    parcel.paymentStatus === "paid" ?
                      <span className="text-green-400">Paid</span>
                      :
                      <span>
                      <NavLink to={`/dashboard/payment/${parcel._id}`} className="btn btn-sm bg-primary">pay</NavLink>
                    </span>
                  }
                  </td>
                  
                  <td> { parcel.deliveryStatus}</td>
                  <td className="flex gap-1">
                    <NavLink to={`/dashboard/payment/${parcel._id}`} className="btn btn-square"><IoMdInformationCircleOutline  /> </NavLink>
                    <button className="btn btn-square hover:bg-primary"><FiEdit /></button>
                    <button
                      onClick={()=>handlePercelDelete(parcel._id)}
                      className="btn btn-square hover:bg-primary"><FaRegTrashAlt /></button>
                  </td>
                    
                    
                  </tr>
                
              ))
            }

    </tbody>
  </table>
</div>
    </div>
  )
}

export default MyPercels