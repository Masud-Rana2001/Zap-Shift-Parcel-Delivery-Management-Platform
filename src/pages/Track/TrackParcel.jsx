import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import {
  CheckCircle,
  Circle,
  MapPin,
  Bike,
  Clock,
  PackageCheck,
} from "lucide-react";
import { motion } from "framer-motion";

export default function TrackParcel() {
  const { trackingId } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: logs = [] } = useQuery({
    queryKey: ["trackings", trackingId],
    queryFn: async () => {
      const data = await axiosSecure.get(
        `/track-parcels/${trackingId}/logs`
      );
      return data.data;
    },
  });

  
  const latestStatus = logs[logs.length - 1]?.status;

  const statusIcons = {
    parcel_created: PackageCheck,
    pending_pickup: Clock,
    driver_assigned: Bike,
    rider_arriving: MapPin,
    delivery_completed: CheckCircle,
  };

  return (
    <div className="max-w-2xl mx-auto my-10 p-6 bg-white rounded-2xl shadow-xl border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        📦 Tracking: {trackingId}
      </h2>

      {/* Progress Steps */}
      <div className="flex justify-between mb-10">
        {logs.map((log, index) => {
          const Icon = statusIcons[log.status];
          const active = index <= logs.findIndex((l) => l.status === latestStatus);

          return (
            <motion.div
              key={log._id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.15 }}
              className="flex flex-col items-center"
            >
              <Icon
                className={`w-8 h-8 ${
                  active ? "text-green-600" : "text-gray-300"
                }`}
              />

              <p
                className={`mt-2 text-xs font-semibold ${
                  active ? "text-green-700" : "text-gray-400"
                }`}
              >
                {formatStatus(log.status)}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Timeline */}
      <div className="relative border-l-2 border-gray-200 ml-4">
        {logs.map((log, index) => {
          const Icon = statusIcons[log.status];
          const active =
            index <= logs.findIndex((l) => l.status === latestStatus);
          const isLast = index === logs.length - 1;

          return (
            <div key={log._id} className="mb-10 ml-4 relative">
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute -left-6 top-1"
              >
                <Icon
                  className={`w-7 h-7 ${
                    active ? "text-green-600" : "text-gray-400"
                  }`}
                />
              </motion.span>

              <p
                className={`text-base font-bold ms-3 ${
                  active ? "text-green-700" : "text-gray-500"
                }`}
              >
                {formatStatus(log.status)}
              </p>

              <p className="text-sm ms-3 text-gray-400">
                {formatDate(log.createdAt)}
              </p>

              {!isLast && (
                <div className="absolute left-[-4px] top-8 h-full border-l-2 border-gray-200"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function formatStatus(status) {
  return status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatDate(date) {
  return new Date(date).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}
