import React from 'react'
import useAuthProvider from './../../hooks/useAuthProvider';
import useAxiosSecure from './../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

function PaymentsHistory() {
  const { user } = useAuthProvider();
  const axiosSecure = useAxiosSecure();

  const {data : payments =[] } = useQuery({
    queryKey: ["payments", user.email],
    queryFn:async () =>{
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data
    }
  })


  return (
    <div>
      <h2 className="text-5xl text-center font-semibold py-5">Payment History</h2>
       <table className="table table-zebra border border-gray-300 ">
    {/* head */}
    <thead>
      <tr>
        <th>Parcel Info</th>
        <th>Sender Info </th>
        <th>Tracking Number</th>
        <th>Payment Info    </th>
        <th>Action</th>
      </tr>
        </thead>

        <tbody>
          {
            payments.map(payment => (
              <tr key={payment._id}>
                <td>{payment.parcelName }</td>
                <td>{payment.customerEmail }</td>
                <td>{payment.trackingId }</td>
                <td>${payment.amount }</td>
                <td>
                  <button className="btn btn-sm btn-primary text-gray-600">View</button>
                </td>
              </tr>
            ))
          }
       </tbody>
        </table>
    </div>
  )
}

export default PaymentsHistory