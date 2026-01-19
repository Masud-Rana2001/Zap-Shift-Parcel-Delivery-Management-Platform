import React from "react";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

import PieChartWithPaddingAngle from './PieChartWithPaddingAngle';
// ICONS
import {
  CheckCircle,
  Circle,
  MapPin,
  Bike,
  Clock,
  PackageCheck,
} from "lucide-react";

function AdminDashBoardHome() {
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [] } = useQuery({
    queryKey: ["parcel-status-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/delivery-status/stats`);
      return res.data;
    },
  });

  const statusIcons = {
    parcel_created: PackageCheck,
    pending_pickup: Clock,
    driver_assigned: Bike,
    rider_arriving: MapPin,
    delivery_completed: CheckCircle,
  };

  return (
    <div>
      <h2 className="text-3xl font-semibold text-center py-10">
        Admin Dashboard
      </h2>

      <div className="bg-gray-100 p-5 lg:p-10 rounded-2xl flex flex-col justify-center lg:flex-row flex-wrap gap-4">
        {parcels.map((parcel) => {
          const Icon = statusIcons[parcel._id]; // Correct mapping

          return (
            <div
              key={parcel._id}
              className="stats shadow bg-white p-2 lg:p-6 rounded-xl text-center hover:shadow-lg transition"
            >
              <div className="stat place-items-center">
                {Icon && (
                  <Icon
                    className="w-10 h-10 text-green-500 mb-2"
                    strokeWidth={1.5}
                  />
                )}

                <div className="stat-title text-xl font-semibold text-gray-700">
                  {formatStatus(parcel._id)}
                </div>

                <div className="stat-value text-3xl font-bold text-green-600">
                  {parcel.count}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-full">
        <PieChartWithPaddingAngle parcels={ parcels} />
      </div>
    </div>
  );
}

export default AdminDashBoardHome;

function formatStatus(status) {
  return status
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
