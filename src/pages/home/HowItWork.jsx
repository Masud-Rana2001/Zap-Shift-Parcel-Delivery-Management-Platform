import React from 'react'
import bookingIcon from "../../assets/bookingIcon.png";

const services = [
  {
    id: 1,
    title: "Booking Pick & Drop",
    description: "From personal packages to business shipments — we deliver on time, every time."
  },
  {
    id: 2,
    title: "Cash On Delivery",
    description: "From personal packages to business shipments — we deliver on time, every time."
  },
  {
    id: 3,
    title: "Delivery Hub",
    description: "From personal packages to business shipments — we deliver on time, every time."
  },
  {
    id: 4,
    title: "Booking SME & Corporate",
    description: "From personal packages to business shipments — we deliver on time, every time."
  }
];

function HowItWork() {
  return (
    <div className="px-4 md:px-0">
      <h2 className="text-3xl md:text-4xl text-teal-800 font-semibold my-8 text-center">
        How it Works
      </h2>

      {/* Responsive Grid */}
      <div className="
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        lg:grid-cols-4 
        gap-5 
      ">
        {services.map(service => (
          <div 
            key={service.id} 
            className="bg-white rounded-2xl shadow p-6 text-center hover:shadow-lg transition"
          >
            <img 
              src={bookingIcon} 
              alt="" 
              className="w-14 mx-auto mb-4"
            />

            <h3 className="text-teal-800 mt-3 text-xl font-semibold">
              {service.title}
            </h3>

            <p className="text-gray-600 mt-2">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HowItWork
