import { useMemo ,useDebugValue} from "react";
import { useForm } from "react-hook-form";
import { useLoaderData,useNavigate } from "react-router";
import Swal from 'sweetalert2';
import useAuthProvider from './../../hooks/useAuthProvider';
import useAxiosSecure from "../../hooks/useAxiosSecure";




function AddParcel() {
  const { user } = useAuthProvider();
  useDebugValue(user, user => user.displayName)
  const axiosSecure = useAxiosSecure();
  const warehouses = useLoaderData();
  const navigate =  useNavigate()

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
    control,
    formState: { errors },
  } = useForm();

  // Watch Sender Fields
  const senderRegion = watch("senderRegion");
  const senderDistrict = watch("senderDistrict");

  // Watch Receiver Fields
  const receiverRegion = watch("receiverRegion");
  const receiverDistrict = watch("receiverDistrict");

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
    const { parcelType, parcelWeight, receiverDistrict, senderDistrict } = data;
    const isSameDistrict = receiverDistrict === senderDistrict;
    let cost = 0;
   
    if (parcelType === "document") {
      cost = isSameDistrict ? 60 : 80;
    } else {
      
      if (parcelWeight <= 3 ) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        cost = isSameDistrict ? 40 * parcelWeight : (40 * parcelWeight) + 40;
      }
    }
    Swal.fire({
      title: "Agree with the cost?",
      text: `You have to pay ${cost} taka`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm and Continue Payment !"
    }).then((result) => {
      if (result.isConfirmed) {
       
         const newData ={...data,cost:cost}
        axiosSecure.post(`/percel?email=${user?.email}`, newData)
          .then(res => {
            if (res) {
              navigate("/dashboard/my-percels")
            Swal.fire({
              title: "Added!",
              text: "Your percel has been added.",
              icon: "success"
            });
          }
        }).then((error) => {
          console.log(error)
        })
        reset()
      }
    });
  };

  return (
    <div className="p-6 mt-10 max-w-6xl mx-auto bg-white rounded-xl shadow-sm">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <h2 className="text-4xl font-semibold">Add Parcel</h2>

        {/* Parcel Info */}
        <div className="mt-10">
          <label className="label font-semibold">
            <input
              type="radio"
              value="document"
              {...register("parcelType")}
              className="radio radio-success"
              defaultChecked
            />
            Document
          </label>

          <label className="label font-semibold mx-5">
            <input
              type="radio"
              value="non-document"
              {...register("parcelType")}
              className="radio radio-success"
            />
            Non Document
          </label>
        </div>

        <div className="flex gap-5 w-full">
          <div className="flex-1">
            <label className="label font-semibold">Parcel Name</label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Parcel Name"
              {...register("parcelName")}
            />
          </div>

          <div className="flex-1">
            <label className="label font-semibold">Parcel weight (kg)</label>
            <input
              type="number"
              className="input input-bordered w-full"
              placeholder="Parcel weight"
              {...register("parcelWeight")}
            />
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sender */}
          <div className="mt-10 flex-1">
            <h2 className="text-xl font-semibold mb-4">Sender Details</h2>

            <div className="grid md:grid-cols-2 gap-6 mb-4">
              <div>
                <label className="label font-semibold">Sender Name</label>
                <input
                  type="text"
                  defaultValue={user?.displayName}
                  className="input input-bordered w-full"
                  placeholder="Sender Name"
                  {...register("senderName")}
                />
              </div>

              <div>
                <label className="label font-semibold">Sender email</label>
                <input
                  type="eamil"
                  defaultValue={user?.email}
                  className="input input-bordered w-full"
                  placeholder="Sender email"
                  {...register("senderEmail")}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="label font-semibold">Sender Region</label>
              <select {...register("senderRegion")} className="select select-bordered w-full">
                <option value="">Select your region</option>
                {allRegions.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-4">
              <div>
                <label className="label font-semibold">Sender district</label>
                <select {...register("senderDistrict")} className="select select-bordered w-full">
                  <option value="">Select district</option>
                  {districtsByRegions(senderRegion).map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label font-semibold">Sender Pickup Warehouse</label>
                <select {...register("senderArea")} className="select select-bordered w-full">
                  <option value="">Select Warehouse</option>
                  {coverArea(senderDistrict).map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="label font-semibold">Delivery Instruction</label>
              <textarea
                {...register("senderInstruction")}
                className="textarea textarea-bordered w-full"
                rows="3"
                placeholder="Delivery Instruction"
              ></textarea>
            </div>
          </div>

          {/* Receiver */}
          <div className="mt-10 flex-1">
            <h2 className="text-xl font-semibold mb-4">Receiver Details</h2>

            <div className="grid md:grid-cols-2 gap-6 mb-4">
              <div>
                <label className="label font-semibold">Receiver Name</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Receiver Name"
                  {...register("receiverName")}
                />
              </div>

              <div>
                <label className="label font-semibold">Receiver email</label>
                <input
                  type="email"
                  className="input input-bordered w-full"
                  placeholder="Receiver Contact No"
                  {...register("receiverEmail")}
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="label font-semibold">Receiver Region</label>
              <select {...register("receiverRegion")} className="select select-bordered w-full">
                <option value="">Select your region</option>
                {allRegions.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-4">
              <div>
                <label className="label font-semibold">Receiver district</label>
                <select {...register("receiverDistrict")} className="select select-bordered w-full">
                  <option value="">Select district</option>
                  {districtsByRegions(receiverRegion).map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label font-semibold">Receiver Pickup Warehouse</label>
                <select {...register("receiverArea")} className="select select-bordered w-full">
                  <option value="">Select Warehouse</option>
                  {coverArea(receiverDistrict).map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="label font-semibold">Delivery Instruction</label>
              <textarea
                {...register("receiverInstruction")}
                className="textarea textarea-bordered w-full"
                rows="3"
                placeholder="Delivery Instruction"
              ></textarea>
            </div>
          </div>
        </div>

        <button className="btn bg-[#C8F16C] hover:bg-[#b2db5f] text-gray-900 mt-6 px-10">
          Proceed to Confirm Booking
        </button>
      </form>
    </div>
  );
}

export default AddParcel;
