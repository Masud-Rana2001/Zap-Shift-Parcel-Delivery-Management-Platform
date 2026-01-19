import React, { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query';
import { useParams,useSearchParams } from 'react-router';
import Loading from '../shared/Loading';
import useAxiosSecure from './../../hooks/useAxiosSecure';
function Payment() {
  const axiosSecure = useAxiosSecure();
  const { parcelId } = useParams()

    const formatDate = (iso) => {
    try {
      return new Date(iso).toLocaleString()
    } catch (e) {
      return iso
    }
  }
    const defaultParcel = {
   
    parcelType: '',
    parcelName: '',
    parcelWeight: '',
    senderName: '',
    senderEmail: '',
    senderRegion: '',
    senderDistrict: '',
    senderArea: '',
    senderInstruction: '',
    receiverName: '',
    receiverEmail: '',
    receiverRegion: '',
    receiverDistrict: '',
    receiverArea: '',
    receiverInstruction: '',
    cost: "",
    createdAt: '',
    paymentStatus: '',
    trackingId: ''
  }
  const { data :parcel = defaultParcel ,isLoading} = useQuery({
      queryKey: ['parcels', parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcel/${parcelId}`);
      console.log(res.data)
      return res.data
      }
  })
  if (isLoading) return <Loading />;
  const handlePayment = async() => {
    const paymentInfo = {
      cost: parcel.cost,
      percelId: parcel._id,
      senderEmail: parcel.senderEmail,
      parcelName: parcel.parcelName,
      receiverEmail: parcel.parcelName,
      trackingId : parcel.trackingId
     
    }
    const res  = await axiosSecure.post("/create-checkout-session",paymentInfo);
   
    window.location.href = res.data.url;
  };
  return ( 
    <>
   


      <div className="max-w-6xl mx-auto p-6 bg-gray-50 rounded-lg shadow-sm">
      <div className="flex items-start justify-between mb-6">
        <h2 className="text-2xl font-semibold text-emerald-800">Parcel Details</h2>
         <button onClick={handlePayment} className="btn text-black btn-primary ">Pay Now</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sender Info */}
        <div className="bg-white rounded-lg p-5 shadow-inner">
          <h3 className="font-medium text-gray-700 mb-3">Sender Info</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <div><span className="font-medium text-gray-800">Name:</span> {parcel.senderName || 'N/A'}</div>
            <div><span className="font-medium text-gray-800">Phone/Email:</span> {parcel.senderEmail || 'N/A'}</div>
            <div><span className="font-medium text-gray-800">Region/District:</span> {parcel.senderRegion || parcel.senderDistrict || 'N/A'}</div>
            <div><span className="font-medium text-gray-800">Area:</span> {parcel.senderArea || 'N/A'}</div>
            <div><span className="font-medium text-gray-800">Instruction:</span> {parcel.senderInstruction || 'N/A'}</div>
          </div>
        </div>

        {/* Receiver Info */}
        <div className="bg-white rounded-lg p-5 shadow-inner">
          <h3 className="font-medium text-gray-700 mb-3">Receiver Info</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <div><span className="font-medium text-gray-800">Name:</span> {parcel.receiverName || 'N/A'}</div>
            <div><span className="font-medium text-gray-800">Email/Phone:</span> {parcel.receiverEmail || 'N/A'}</div>
            <div><span className="font-medium text-gray-800">Region/District:</span> {parcel.receiverRegion || parcel.receiverDistrict || 'N/A'}</div>
            <div><span className="font-medium text-gray-800">Area:</span> {parcel.receiverArea || 'N/A'}</div>
            <div><span className="font-medium text-gray-800">Instruction:</span> {parcel.receiverInstruction || 'N/A'}</div>
          </div>
        </div>
      </div>

      {/* Parcel details box */}
      <div className="mt-6 bg-white rounded-lg p-6 shadow-inner">
        <h4 className="font-medium text-gray-700 mb-4">Parcel details</h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-700">
          <div>
            <div className="text-gray-500">Title</div>
            <div className="font-medium">{parcel.parcelName}</div>
          </div>

          <div>
            <div className="text-gray-500">Type</div>
            <div className="font-medium">{parcel.parcelType}</div>
          </div>

          <div>
            <div className="text-gray-500">Weight</div>
            <div className="font-medium">{parcel.parcelWeight} KG</div>
          </div>

          <div>
            <div className="text-gray-500">Charge</div>
            <div className="font-medium">Tk {parcel.cost}</div>
          </div>

          <div>
            <div className="text-gray-500">Status</div>
            <div className={`inline-block px-2 py-1 rounded text-xs font-semibold ${parcel.paymentStatus === 'paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-yellow-100 text-yellow-800'}`}>{parcel.paymentStatus}</div>
          </div>

          <div>
            <div className="text-gray-500">Tracking Number</div>
            <div className="font-medium">{parcel.trackingId}</div>
          </div>

          <div>
            <div className="text-gray-500">Created At</div>
            <div className="font-medium">{formatDate(parcel.createdAt)}</div>
          </div>

          <div>
            <div className="text-gray-500">Parcel ID</div>
            <div className="font-medium break-all">{parcel._id}</div>
          </div>

          <div>
            <div className="text-gray-500">Pickup OTP</div>
            <div className="font-medium">N/A</div>
          </div>
        </div>

      </div>

      {/* Actions */}
      <div className="mt-5 flex items-center gap-3">
        <button className="px-4 py-2 rounded bg-emerald-600 text-white text-sm hover:bg-emerald-700">Print</button>
        <button className="px-4 py-2 rounded border border-gray-200 text-sm">Download PDF</button>
        <div className="ml-auto text-sm text-gray-500">Tracking: <span className="font-medium text-gray-800">{parcel.trackingId}</span></div>
      </div>
    </div>
    </>
  )
}

export default Payment


