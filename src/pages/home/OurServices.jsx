import React from 'react'
import serviceIcon from '../../assets/service.png'

const servicesData = [
  {
    id: 1,
    title: "Express & Standard Delivery",
    description:
      "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off."
  },
  {
    id: 2,
    title: "Nationwide Delivery",
    description:
      "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours."
  },
  {
    id: 3,
    title: "Fulfillment Solution",
    description:
      "We also offer customized service with inventory management support, online order processing, packaging, and after sales support."
  },
  {
    id: 4,
    title: "Cash on Home Delivery",
    description:
      "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product."
  },
  {
    id: 5,
    title: "Corporate Service / Contract in Logistics",
    description:
      "Customized corporate services which includes warehouse and inventory management support."
  },
  {
    id: 6,
    title: "Parcel Return",
    description:
      "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants."
  }
];

function OurServices() {
  return (
    <div className="bg-[#03373d] p-6 md:p-10 my-10 text-center rounded-2xl">
      
      <h2 className="text-3xl md:text-4xl font-semibold text-white py-5">
        Our Services
      </h2>

      <p className="text-white w-11/12 md:w-8/12 mx-auto text-sm md:text-base">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. 
        From personal packages to business shipments — we deliver on time, every time.
      </p>

      {/* Responsive Grid */}
      <div className="
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        lg:grid-cols-3 
        gap-6 
        mt-10
      ">
        {servicesData.map(service => (
          <div
            key={service.id}
            className="
              p-6 
              bg-white 
              rounded-2xl 
              shadow 
              hover:shadow-xl 
              transition 
              space-y-3 
              text-left 
              hover:bg-teal-100
            "
          >
            <div className="flex justify-center items-center">
              <img src={serviceIcon} alt="serviceIcon" className="w-12 md:w-14" />
            </div>

            <h3 className="font-bold text-xl md:text-2xl text-center text-teal-900">
              {service.title}
            </h3>

            <p className="text-gray-600 text-sm md:text-base text-center">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OurServices
