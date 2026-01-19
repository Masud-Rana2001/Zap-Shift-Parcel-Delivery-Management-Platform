import React, { useEffect,useState } from 'react'
import { useSearchParams,useNavigate } from 'react-router';


import useAxiosSecure from './../../hooks/useAxiosSecure'
import Loading from '../shared/Loading'

function PaymentSuccess() {
  const [paymentInfo,setPaymentInfo]= useState({})
  const navigate = useNavigate()
  const axiosSecure = useAxiosSecure()
 
 
  const [searchParams] = useSearchParams();
   const sessionId = searchParams.get("session_id")
    useEffect(() => {
      if (sessionId) {
        axiosSecure.patch(`/payment-success?session_id=${sessionId}`).then(res => {
          setPaymentInfo({
            trackingId:res.data.trackingId,
            transactionId : res.data.transactionId,
            parcelName: res.data.parcelName,
            amount :res.data.amount
          }) 
          
         })
      }
    },[sessionId,axiosSecure])

 
 
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <svg className="w-16 h-16 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold text-green-600 mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">Your payment has been processed successfully.</p>

        <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
          <p className="text-sm text-gray-700 mb-2"><strong>Parcel Name:</strong> {paymentInfo?.parcelName}</p>
          <p className="text-sm text-gray-700 mb-2"><strong>Amount Paid:</strong> ${paymentInfo?.amount}</p>
          <p className="text-sm text-gray-700"><strong>Transaction ID:</strong> {paymentInfo?.transactionId}</p>
          <p className="text-sm text-gray-700"><strong>Tracking ID:</strong> {paymentInfo?.trackingId}</p>
        </div>

        <button 
          onClick={() => navigate('/dashboard/my-percels')} 
          className="btn btn-primary w-full mb-3 text-gray-900"
        >
          Go to Dashboard
        </button>
        
        <button 
          onClick={() => navigate('/')} 
          className="btn btn-outline w-full"
        >
          Back to Home
        </button>
      </div> 
    </div>
  )
}

export default PaymentSuccess