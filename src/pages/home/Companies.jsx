import React from 'react'
import brand1 from '../../assets/brands/amazon.png'
import brand2 from '../../assets/brands/amazon_vector.png'
import brand3 from '../../assets/brands/moonstar.png'
import brand4 from '../../assets/brands/randstad.png'
import brand5 from '../../assets/brands/star.png'
import brand6 from '../../assets/brands/start_people.png'
import brand7 from '../../assets/brands/casio.png'
import Marquee from "react-fast-marquee";

const bardsArr = [
  brand1,
  brand2,
  brand3,
  brand4,
  brand5,
  brand6,
  brand7
];

function Companies() {
  return (
    <div className="py-14 bg-white">
      <h4 className="text-2xl md:text-4xl text-[#067A87] font-semibold text-center mb-10 px-5">
        We've helped thousands of sales teams
      </h4>

      <Marquee 
        gradient={false}
        speed={50}
        pauseOnHover={true}
        className="py-3"
      >
        {bardsArr.map((brand, index) => (
          <div 
            key={index} 
            className="mx-6 md:mx-12 flex items-center justify-center"
          >
            <img 
              src={brand} 
              alt="brand-logo" 
              className="w-24 md:w-32 lg:w-40 opacity-70 hover:opacity-100 transition duration-300"
            />
          </div>
        ))}
      </Marquee>
    </div>
  )
}

export default Companies
