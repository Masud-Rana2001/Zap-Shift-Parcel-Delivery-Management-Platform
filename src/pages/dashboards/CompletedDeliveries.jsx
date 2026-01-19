import React from 'react'
import useAuthProvider from './../../hooks/useAuthProvider';
import useAxiosSecure from './../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

function CompletedDeliveries() {
   const {user} = useAuthProvider()
    const axiosSecure = useAxiosSecure()
    const { data :parcels=[] ,refetch : percelRefetch} = useQuery({
      queryKey: ["percels", UserActivation.email, "driver_assigned"],
      queryFn: async () => {
        const res = await axiosSecure.get(`/parcels/complete/${user.email}`);
        return res.data
      }
    })
  
  const catulatePayout = (parcel) => {
    const cost = Number(parcel.cost)
    if (parcel.senderDistrict === parcel.receiverDistrict) {
      return cost*0.5
    } else {
      return cost*0.6
    }
  };

  const handleCashout = () => {
    
  };
  return (
    <div>
      <h2 className="text-4xl font-semibold mb-10">My Completed Deliveries  ({parcels.length})</h2>
      <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>SI</th>
              <th>Sender Name</th>
              <th>Receiver Name</th>
              <th>Parcel Name</th>
              <th>Cost</th>
              <th>Payout</th>
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
                        <td> {parcel.cost}</td>
                        <td> {catulatePayout(parcel)}</td>
                        <td><button
                             onClick={()=>handleCashout()}
                              className="btn bg-green-400 hover:bg-primary">Cash Out</button></td>
                        </tr>
                    ))
                  }
      
          </tbody>
        </table>
    </div>
  )
}

export default CompletedDeliveries