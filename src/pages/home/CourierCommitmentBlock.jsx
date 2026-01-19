import React from "react";
import MyBtn1 from "../shared/buttons/MyBtn1";

import locationMerchantImg from "../../assets/location-merchant.png";
import merchantBg from "../../assets/be-a-merchant-bg.png";

function CourierCommitmentBlock() {
  return (
    <div className="relative bg-[#067A87] overflow-hidden rounded-3xl my-10 p-10">

      {/* Background Image */}
      <img
        src={merchantBg}
        alt=""
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full opacity-20 pointer-events-none"
      />

      <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">

        {/* Left Section */}
        <div className="flex-1 space-y-5">
          <h2 className="font-bold text-4xl text-white leading-snug">
            Merchant and Customer Satisfaction is Our First Priority
          </h2>

          <p className="text-white/90">
            We offer the lowest delivery charge with the highest value along
            with 100% safety of your product. ZapShift courier delivers your
            parcels to every corner of Bangladesh right on time.
          </p>

          <div className="flex flex-wrap gap-3">
            <MyBtn1 className="bg-primary text-[#0B0B0B]">
              Become a Merchant
            </MyBtn1>

            <MyBtn1 className="btn-outline border-primary text-primary hover:text-black">
              Earn with ZapShift Courier
            </MyBtn1>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 flex justify-center">
          <img
            src={locationMerchantImg}
            alt="Merchant location"
            className="max-w-full drop-shadow-xl"
          />
        </div>
      </div>
    </div>
  );
}

export default CourierCommitmentBlock;
