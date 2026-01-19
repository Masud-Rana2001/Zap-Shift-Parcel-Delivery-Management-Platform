import React from 'react'
import useAxiosSecure from './../../../hooks/useAxiosSecure';
import useAuthProvider from './../../../hooks/useAuthProvider';
import { useQuery } from '@tanstack/react-query';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
function RiderDashboardHome() {
   const {user} = useAuthProvider()
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [],isLoading } = useQuery({
    queryKey:["rider-daily-deliveries", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/rider/delivery-per-day?email=${user?.email}`);
      return res.data;
    },
  });

 return (
    <div className="p-6 space-y-6">
      {/* Title */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-wide text-gray-800">
          📦 Daily Delivery Performance Overview
        </h1>
      </div>

      {/* Chart Section */}
      <div className="bg-white shadow-lg rounded-xl p-5 border h-80">
        {isLoading ? (
          <p className="text-center py-20 text-gray-500">Loading chart...</p>
        ) : parcels.length === 0 ? (
          <p className="text-center py-20 text-gray-500">
            No delivery records found.
          </p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={parcels}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="_id" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} allowDecimals={false}   interval={0}  />
              <Tooltip />
              <Bar
                dataKey="deliveredCount"
                fill="#6366F1"
                radius={[10, 10, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );

}

export default RiderDashboardHome