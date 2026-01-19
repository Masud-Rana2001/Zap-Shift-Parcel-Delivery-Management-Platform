import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAuthProvider from './../../hooks/useAuthProvider';
import useAxiosSecure from './../../hooks/useAxiosSecure';

function AssignedDeliveries() {
  const {user} = useAuthProvider()
  const axiosSecure = useAxiosSecure()
  const { data :parcels=[] ,refetch : percelRefetch} = useQuery({
    queryKey: ["percels", UserActivation.email, "driver_assigned"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/rider?riderEmail=${user?.email}&deliveryStatus=driver_assigned`);
      return res.data
    }
  })


  const getTitle = (status) => {
  switch (status) {
    case "rider_arriving":
      return "Thank you for accepting!";
    case "pending_pickup":
      return "Wait for the next delivery!";
    case "delivery_completed":
      return "Thank you for completing the delivery. Please check the Completed Deliveries section 🏆!";
    default:
      return "Status updated!";
  }
};

  const handleAcceptDelivery =async (parcel,status) => {
    const statusInfo = {
      deliveryStatus: status,
      riderId: parcel.riderId,
      trackingId:parcel.trackingId
     
    }
    const result = await axiosSecure.patch(`/parcel/${parcel._id}/updateDeliveryStatus`, statusInfo);

    if (result.data.acknowledged) {
             percelRefetch()
              Swal.fire({
              title: getTitle(status),
              icon: status === "rider_arriving" ? "success" : "info",
              timer: 1500,
});
          }

  };



  return (
    <div>
      
      <h2 className="text-4xl font-semibold mb-10">Assigned Deliveries  ({ parcels.length})</h2>
       <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>SI</th>
              <th>Sender Name</th>
              <th>Receiver Name</th>
              <th>Parcel Name</th>
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
                        <td> {parcel.deliveryStatus}</td>
                        
                        <td className="flex gap-1">
                        {
                          parcel.deliveryStatus === "driver_assigned" ?
                            <>
                          <button
                            onClick={()=>handleAcceptDelivery(parcel,"rider_arriving")}
                            className="btn bg-green-500 hover:bg-primary">Accept</button>
                            <button
                             onClick={()=>handleAcceptDelivery(parcel,"pending_pickup")}
                              className="btn bg-red-500 hover:bg-primary">Reject</button>
                            </>
                            :
                            <>
                            <button
                             onClick={()=>handleAcceptDelivery(parcel,"delivery_completed")}
                              className="btn bg-green-500 hover:bg-primary">Complete Delivery</button>
                            <button
                             onClick={()=>handleAcceptDelivery(parcel,"pending_pickup")}
                              className="btn bg-red-500 hover:bg-primary">Cencel Delivery</button>
                            
                            </>
                        }
                     
                        </td>
                          
                          
                        </tr>
                      
                    ))
                  }
      
          </tbody>
        </table>
    </div>
  )
}

export default AssignedDeliveries