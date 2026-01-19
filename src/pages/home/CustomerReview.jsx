import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';

import customerTop from '../../assets/customer-top.png';
import reviewQuote from '../../assets/reviewQuote.png';
import agent from '../../assets/agent-pending.png';

const allReviews = [
  { "id": 1, "quote": "A posture corrector works by providing support and gentle alignment...", "name": "Awlad Hossin", "title": "Senior Product Designer" },
  { "id": 2, "quote": "A posture corrector works by providing support and gentle alignment...", "name": "Rasel Ahamed", "title": "CTO" },
  { "id": 3, "quote": "A posture corrector works by providing support and gentle alignment...", "name": "Nazir Uddin", "title": "CEO" },
  { "id": 4, "quote": "A posture corrector works by providing support and gentle alignment...", "name": "Fatema Akter", "title": "Lead Software Engineer" },
  { "id": 5, "quote": "A posture corrector works by providing support and gentle alignment...", "name": "Imran Khan", "title": "Marketing Director" },
  { "id": 6, "quote": "A posture corrector works by providing support and gentle alignment...", "name": "Anika Zaman", "title": "Customer Service Manager" }
];

function CustomerReview() {
  return (
    <div className="my-16">

      {/* Header Section */}
      <div className="text-center space-y-5 mb-10">
        <img src={customerTop} alt="" className="mx-auto" />
        <h2 className="text-4xl text-[#067A87] font-semibold">
          What our customers are saying
        </h2>
        <p className="w-9/12 text-gray-600 mx-auto">
          Enhance posture, mobility, and well-being effortlessly with Posture Pro.
        </p>
      </div>

      {/* Swiper Section */}
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        loop={true}
        
        pagination={{ clickable: true }}

        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}

        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 200,
          modifier: 2.5,
          slideShadows: false,
        }}

        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="max-w-[1000px] mx-auto"
      >

        {allReviews.map(review => (
          <SwiperSlide
            key={review.id}
            className="bg-white shadow-xl rounded-xl p-8 max-w-sm opacity-60 scale-90 transition-all duration-300 swiper-slide-custom"
          >
            <img src={reviewQuote} alt="" className="w-12 mb-4" />

            <p className="text-gray-700 mb-6 leading-relaxed">
              {review.quote}
            </p>

            <div className="border-b border-dashed mb-4"></div>

            <div className="flex items-center gap-4">
              <img src={agent} className="w-12 h-12 rounded-full" alt="" />
              <div>
                <h4 className="font-semibold">{review.name}</h4>
                <p className="text-sm text-gray-500">{review.title}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}

      </Swiper>

      {/* Extra CSS for center zoom effect */}
      <style>
        {`
          .swiper-slide-active {
            transform: scale(1.1) !important;
            opacity: 1 !important;
          }
          .swiper-slide {
            opacity: 0.5;
          }
        `}
      </style>

    </div>
  );
}

export default CustomerReview;
