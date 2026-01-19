import { useMemo  ,useDebugValue } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData,useNavigate } from "react-router";
import Swal from 'sweetalert2';
import useAuthProvider from './../../hooks/useAuthProvider';
import useAxiosSecure from "../../hooks/useAxiosSecure";


import agentPendingImg from '../../assets/agent-pending.png'

function Rider() {
  const { user } = useAuthProvider();
  const axiosSecure = useAxiosSecure();
  const warehouses = useLoaderData();
  const navigate = useNavigate()
  
  
  // Unique region list
  const allRegions = useMemo(() => {
    const regions = warehouses.map((w) => w.region);
    return [...new Set(regions)];
  }, [warehouses]);
  
  const {
    register,
    watch,
    handleSubmit,
    reset,
   
    formState: { errors },
  } = useForm();
  
  // Watch Rider Fields
  const riderRegion = watch("riderRegion");
  const riderDistrict = watch("riderDistrict");
  
  
  


  // Get districts by region
  const districtsByRegions = (region) => {
    if (!region) return [];
    return warehouses.filter((c) => c.region === region).map((d) => d.district);
  };

  // Get covered area by district
  const coverArea = (district) => {
    if (!district) return [];
    const item = warehouses.find((c) => c.district === district);
    if (!item) return [];
    return [`${item.city} sadar`, ...item.covered_area];
  };

  const handleFormSubmit = (data) => {
   
    // console.log("data",data)
    axiosSecure.post(`/riders`, data)
      .then((res) => { 
        if (res.data.insertedId) {
          Swal.fire({
               title: "Your application has been submitted.We will reach out to you in 24 hours",
               text: "Thank you",
               icon: "success",
               timer :2000
             });
        }
        if (res.data.applied) {
          Swal.fire({
               title: "Your application has already been submitted.We will reach out to you in 24 hours",
               text: "Please wait",
               icon: "warning",
               timer :2000
             });
        }
      }).catch((error) => {
          console.log(error)
        })
    
     ;
  };

  return (
    <div className="p-6 mt-10 max-w-6xl mx-auto bg-white rounded-xl shadow-sm">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <h2 className="text-4xl font-semibold">Be a Rider</h2>
        <p className="w-1/2 opacity-80">Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>

        <h2 className="text-3xl font-semibold mt-10 border-t border-gray-400 py-10">Tell us about yourself</h2>
        <div className="flex justify-between gap-6">
        <div className="flex-1 space-y-5">
          
        <div className="flex gap-5 w-full">
          <div className="flex-1">
            <label className="label font-semibold">Your Name</label>
            <input
                  type="text"
                  defaultValue={user?.displayName}
              className="input input-bordered w-full"
              placeholder="Your Name"
              {...register("riderName")}
            />
          </div>

          <div className="flex-1">
            <label className="label font-semibold">Your age</label>
            <input
              type="number"
              className="input input-bordered w-full"
              placeholder="Your age"
              {...register("riderAge")}
            />
          </div>
        </div>
        <div className="flex gap-5 w-full">
           <div className="flex-1" >
                <label className="label font-semibold">Your Email</label>
                <input
                  type="email"
                  defaultValue={user?.email}
                  className="input input-bordered w-full"
                  placeholder="Your Email"
                  {...register("riderEmail")}
                />
              </div>

            <div className="flex-1">
              <label className="label font-semibold">Your Region</label>
              <select {...register("riderRegion")} className="select select-bordered w-full">
                <option value="">Select your region</option>
                {allRegions.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
        </div>
        <div className="flex gap-5 w-full">
            <div className="flex-1" >
                <label className="label font-semibold">Your district</label>
                <select {...register("riderDistrict")} className="select select-bordered w-full">
                  <option value="">Select district</option>
                  {districtsByRegions(riderRegion).map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

               <div className="flex-1">
                <label className="label font-semibold">Your NID</label>
                <input
                  type="number"
                
                  className="input input-bordered w-full"
                  placeholder="Your NID"
                  {...register("riderNID")}
                />
              </div>
        </div>

        <div className=" w-full">

                <label className="label font-semibold">Which wire-house you want to work?</label>
                <select {...register("riderWareHouse")} className="select select-bordered w-full">
                  <option value="">Select Warehouse</option>
                  {coverArea(riderDistrict).map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>   
        </div>

        <button className="btn bg-[#C8F16C] hover:bg-[#b2db5f] text-gray-900   w-full">
          Apply as a Rider
        </button>
          </div>


          {/* Image  */}
          <div className="flex-1 flex justify-center items-center ">
            <img className=" object-cover w-full md:p-20" src={ agentPendingImg} alt="" />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Rider;
