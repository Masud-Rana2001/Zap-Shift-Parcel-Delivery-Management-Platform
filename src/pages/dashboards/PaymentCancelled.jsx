import React from 'react'
import { useNavigate } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from './../../hooks/useAxiosSecure'
import Loading from '../shared/Loading'

function PaymentCancelled() {
  const navigate = useNavigate()
  const axiosSecure = useAxiosSecure()
  const params = new URLSearchParams(window.location.search)
  const sessionId = params.get('session_id')

  const { data: cancelData = {}, isLoading } = useQuery({
    queryKey: ['payment-cancel', sessionId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payment-cancel?session_id=${sessionId}`)
      return res.data
    },
    enabled: !!sessionId
  })

  if (isLoading) return <Loading />

  const parcelId = cancelData?.parcelId || cancelData?.percelId || null
  const retryPath = parcelId ? `/dashboard/pay/${parcelId}` : '/dashboard'

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-red-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <svg className="w-16 h-16 mx-auto text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728" />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-red-600 mb-2">Payment Cancelled</h1>
        <p className="text-gray-600 mb-6">The payment was not completed. You can retry or return to your dashboard.</p>

        <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
          <p className="text-sm text-gray-700 mb-2"><strong>Parcel Name:</strong> {cancelData?.parcelName || 'N/A'}</p>
          <p className="text-sm text-gray-700 mb-2"><strong>Amount:</strong> ${cancelData?.cost ?? 'N/A'}</p>
          <p className="text-sm text-gray-700"><strong>Status:</strong> {cancelData?.status || 'cancelled'}</p>
        </div>

        <button
          onClick={() => navigate(retryPath)}
          className="btn btn-primary w-full mb-3 text-gray-900"
        >
          Retry Payment
        </button>

        <button
          onClick={() => navigate('/dashboard/my-percels')}
          className="btn btn-outline w-full mb-3"
        >
          Go to Dashboard
        </button>

        <button
          onClick={() => navigate('/')}
          className="w-full text-sm text-gray-600"
        >
          Back to Home
        </button>
      </div>
    </div>
  )
}

export default PaymentCancelled