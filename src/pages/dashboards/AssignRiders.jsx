import {useRef,useState} from 'react'
import useAxiosSecure from './../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { NavLink } from 'react-router';
import  Swal  from 'sweetalert2';


function AssignRiders() {
  const [selectedPercel,setSelectedPercel] = useState(null)
  const assignModalRef = useRef();
     const axiosSecure = useAxiosSecure();
      const { data :percels=[],isLoading,refetch : parcelRefetch} = useQuery({
        queryKey: ["percels","pending_pickup"],
        queryFn: async () => {
          const res = await axiosSecure.get(`/parcels?deliveryStatus=pending_pickup`);
          parcelRefetch()
          return res.data
        }
      })
      
  
      const {refetch:RiderRefetch, data :riders=[]} = useQuery({
        queryKey: ["riders", selectedPercel?.senderDistrict, "available"],
        enabled : !!selectedPercel,
        queryFn: async () => {
          const res = await axiosSecure.get(`/riders?status=approved&riderDistrict=${selectedPercel?.senderDistrict}&workStatus=available`);
          RiderRefetch()
          return res.data
        }
      })
  

  
  const handleOpenAssignModal = (percel) => {
    assignModalRef.current.showModal()
    setSelectedPercel(percel)
  };


  const handleAssignRiders =async (rider) => {
    const riderAssignAInfo = {
      riderId: rider._id,
      riderEmail: rider.riderEmail,
      riderName: rider.riderName,
      parcelId: selectedPercel._id,
      trackingId : selectedPercel.trackingId
    }
    const res = await axiosSecure.patch(`/percel/${selectedPercel._id}`,riderAssignAInfo)
    if (res.data.modifiedCount) {
      assignModalRef.current.close();
      parcelRefetch()
      Swal.fire({
              title: "Rider has been assigned!",
              text: "",
              icon: "success",
              timer : 2000
           });
    }

  };
  return (
    <div>
    
      <h2 className="text-4xl text-center my-4">Assign Riders ({percels.length})</h2>
        <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th>SI</th>
        <th>Sender Name</th>
       
        <th>Parcel Name</th>
   
        <th>Payment <br />status</th>
    
        <th>Delivery Status</th>
        <th>Pickup District</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
            {/* row 1 */}
            {
              percels.map((parcel, index) => (
                  <tr key={parcel._id}>
                  <th>{index + 1}</th>
                  <td>{ parcel.senderName}</td>
                  
                  <td>{ parcel.parcelName}</td>
                  
                  <td>{
                    parcel.paymentStatus === "paid" ?
                      <span className="text-green-400 btn btn-sm btn-outline">Paid</span>
                      :
                      <span>
                      <NavLink to={`/dashboard/payment/${parcel._id}`} className="btn btn-sm bg-primary">pay</NavLink>
                    </span>
                  }
                  </td>
                  
                  <td> {parcel.deliveryStatus}</td>
                  <td>{parcel.senderDistrict}</td>
                  <td className="flex gap-1">
                    
                    <button onClick={()=>handleOpenAssignModal(parcel)} className="btn  bg-primary">Find Rider</button>
                   
                  </td>
                    
                    
                  </tr>
                
              ))
            }

    </tbody>
      </table>
      

            {/* Open the modal using document.getElementById('ID').showModal() method */}
          
          <dialog ref={assignModalRef} className="modal">
            <div className="modal-box">
          <h3 className="font-bold text-lg ">There are {riders.length } riders available</h3>
              <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th>SI</th>
        <th>Rider Name</th>
        <th>Rider Email</th>
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
                  <td className="flex gap-1">
                    
                    <button onClick={()=>handleAssignRiders(rider)} className="btn  bg-primary">Assign</button>
                   
                  </td>
                    
                    
                  </tr>
                
              ))
            }

    </tbody>
      </table>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>



    </div>
  )
}

export default AssignRiders