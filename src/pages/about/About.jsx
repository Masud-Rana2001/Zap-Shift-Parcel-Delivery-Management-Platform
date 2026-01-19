import React from 'react'

function About() {
  return (
    <div className="space-y-5">
      <h2 className="text-4xl font-bold mt-5">About us</h2>
      <p className="w-9/12 "> Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time </p>

      {/* name of each tab group should be unique */}
<div className="tabs tabs-lift p-5 border border-gray-400 rounded-3xl bg-white">
  <input type="radio" name="my_tabs_3" className="tab text-xl font-semibold " aria-label="Story" />
  <div className="tab-content bg-base-100 border-base-300 p-6">Whether it's a personal gift or a time-sensitive business delivery, we ensure it reaches its destination — on time, every time. We started with a simple promise — to make parcel delivery fast, reliable, and stress-free. Over the years, our commitment to real-time tracking, efficient logistics, and customer-first service has made us a trusted partner for thousands. Whether it's a personal gift or a time-sensitive business delivery, we ensure it reaches its destination — on time, every time.</div>

  <input type="radio" name="my_tabs_3" className="tab text-xl font-semibold" aria-label="Mission " defaultChecked />
  <div className="tab-content bg-base-100 border-base-300 p-6"> We started with a simple promise — to make parcel delivery fast, reliable, and stress-free. Over the years, our commitment to real-time tracking, efficient logistics, and customer-first service has made us a trusted partner for thousands. Whether it's a personal gift or a time-sensitive business delivery, we ensure it reaches its destination — on time, every time.We started with a simple promise — to make parcel delivery fast, reliable, and stress-free. Over the years, our commitment to real-time tracking, efficient logistics, and customer-first service has made us a trusted partner for thousands.</div>

  <input type="radio" name="my_tabs_3" className="tab text-xl font-semibold" aria-label=" Success " />
  <div className="tab-content bg-base-100 border-base-300 p-6"> we ensure it reaches its destination — on time, every time, we ensure it reaches its destination — on time, every time We started with a simple promise — to make parcel delivery fast, reliable, and stress-free. Over the years, our commitment to real-time tracking, efficient logistics, and customer-first service has made us a trusted partner for thousands. Whether it's a personal gift or a time-sensitive business delivery, we ensure it reaches its destination — on time, every time.</div>
</div>
    </div>
  )
}

export default About