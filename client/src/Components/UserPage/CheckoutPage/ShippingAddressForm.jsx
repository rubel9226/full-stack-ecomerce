import { useEffect, useState } from "react";
import { IoStar } from "react-icons/io5";
import api from "../../../API/Axios/api";
import { toast } from "react-toastify";

export default function ShippingAddressForm({ user, fetchAddress, setSubmitStatus, setSubmitBtnClicked, submitBtnClicked }) {
  const [bdData, setBdData] = useState({});
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    postCode: "",
    address: "",
    location: "Home",
  });

  useEffect(() => {
    const fetchFunction = async () => {
      try {
        const res = await fetch("/districtUpazilla.json");
        const data = await res.json();
        setBdData(data);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchFunction();
  }, []);

  const districts = Object.keys(bdData);
  const upazilas = district ? bdData[district] : [];

  // 🔥 handle change (common)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🔥 submit
  const handleSubmit =async (e) => {
    e.preventDefault();

    const finalData = {
      ...formData,
      district,
      area: upazila,
    };

    console.log(finalData);
    try {
      await api.post('/shipping', finalData);
      await fetchAddress();
      toast.success('Add shipping details successfully.');
      setSubmitBtnClicked(true);
      console.log('function setSubmitBtnClicked');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if(formData.name !== '' && formData.phone !== '' && district !== '' && upazila !== '' && formData.address !== ''){
      setSubmitStatus(true);
    }else{
      setSubmitStatus(false)
  }
  }, [formData, district, upazila])


  return (
    <form id="shippingForm" onSubmit={handleSubmit}>
      <fieldset className="fieldset w-full font-medium text-black bg-base-200 border-base-300 rounded-box border p-4">

        <div>
          <legend className="text-sm">Shipping Address</legend>

          <div className="divider h-0" />

          <div className="space-y-2">

            {/* Name */}
            <div className="text-[15px]">
              <label className="flex items-start gap-1">
                Recipient Name <IoStar className="text-[10px] text-red-700" />
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                type="text"
                placeholder="Full Name"
                className="input w-full capitalize"
              />
            </div>

            {/* Phone */}
            <div className="text-[15px]">
              <label className="flex items-start gap-1">
                Contact Number <IoStar className="text-[10px] text-red-700" />
              </label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                type="tel"
                placeholder="Mobile Number"
                className="input w-full"
              />
            </div>

            {/* Country */}
            <div className="text-[15px]">
              <label className="flex items-start gap-1">
                Country <IoStar className="text-[10px] text-red-700" />
              </label>
              <select
                name="country"
                value={'Bangladesh'}
                className="w-full border border-black/15 text-black/40 p-2 rounded bg-white"
                disabled={true}
              >
                <option>Bangladesh</option>
              </select>
            </div>

            {/* District */}
            <div className="text-[15px]">
              <label className="flex items-start gap-1">
                District/City <IoStar className="text-[10px] text-red-700" />
              </label>
              <select
                value={district}
                onChange={(e) => {
                  setDistrict(e.target.value);
                  setUpazila("");
                }}
                className="w-full border p-2 rounded border-black/15 text-black/40 bg-white"
              >
                <option value="">Select District</option>
                {districts.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>

              {!district && (
                <p className="text-red-500 text-sm mt-1">
                  District/City selection is required
                </p>
              )}
            </div>

            {/* Upazila */}
            <div className="text-[15px]">
              <label className="flex items-start gap-1">
                Area/Thana/Upazilla{" "}
                <IoStar className="text-[10px] text-red-700" />
              </label>

              <select
                value={upazila}
                onChange={(e) => setUpazila(e.target.value)}
                className="w-full border p-2 rounded border-black/15 text-black/40 bg-white"
              >
                <option value="">
                  {!district ? "No options found" : "Select Upazila"}
                </option>
                {upazilas.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </div>

            {/* Post Code */}
            <div className="text-[15px]">
              <label className="flex items-start gap-1">
                Post Code <IoStar className="text-[10px] text-red-700" />
              </label>
              <input
                name="postCode"
                value={formData.postCode}
                onChange={handleChange}
                type="tel"
                className="input w-full"
                placeholder="Post Code"
              />
            </div>

            {/* Address */}
            <div className="text-[15px]">
              <label className="flex items-start gap-1">
                Address <IoStar className="text-[10px] text-red-700" />
              </label>
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                type="text"
                placeholder="House / Building / Street"
                className="input w-full"
              />
            </div>

            {/* location */}
            <div className="text-[15px]">
              <label className="flex items-start gap-1 mb-2">
                Select Effective location{" "}
                <IoStar className="text-[10px] text-red-700" />
              </label>

              <div className="flex gap-4">
                <label>
                  <input
                    type="radio"
                    name="location"
                    value="Home"
                    checked={formData.location === "Home"}
                    onChange={handleChange}
                  />
                  Home
                </label>

                <label>
                  <input
                    type="radio"
                    name="location"
                    value="Office"
                    checked={formData.location === "Office"}
                    onChange={handleChange}
                  />
                  Office
                </label>
              </div>
            </div>

          </div>
        </div>
      </fieldset>

    </form>
  );
}