import React from 'react'

import featureImg1 from '../../assets/live-tracking.png'
import featureImg2 from '../../assets/safe-delivery.png'
import featureImg3 from '../../assets/tiny-deliveryman.png'

const featureCards = [
  {
    id: 1,
    title: "Live Parcel Tracking",
    description:
      "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
    img : featureImg1
  },
  {
    id: 2,
    title: "100% Safe Delivery",
    description:
      "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
    img : featureImg2
  },
  {
    id: 3,
    title: "24/7 Call Center Support",
    description:
      "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
    img : featureImg3
  }
];

function Features() {
  return (
    <div className="space-y-7 mt-10">
      {featureCards.map(feature => (
        <div 
          key={feature.id} 
          className="
            bg-white 
            p-6 md:p-10 
            rounded-2xl 
            flex 
            flex-col 
            md:flex-row 
            gap-6 
            shadow 
            hover:shadow-lg 
            transition
          "
        >
          {/* Feature Image */}
          <div className="flex justify-center items-center">
            <img 
              src={feature.img} 
              alt={feature.title} 
              className="w-28 md:w-32 lg:w-36"
            />
          </div>

          {/* Divider + Text */}
          <div className="md:border-l-2 border-dashed border-gray-400 md:pl-6 pt-3 md:pt-0">
            <h3 className="text-2xl font-semibold text-teal-800 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {feature.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Features
