import React, { useEffect, useState } from "react";
import { IoStar } from "react-icons/io5";
import api from "../../../API/Axios/api";
import { BsArrowRight } from "react-icons/bs";
import { toast } from "react-toastify";

const AddMoreShipping = ({ user, fetchAddress, fetchAllAddress }) => {
  const [loading, setLoading] = useState(false);
  const [bdData, setBdData] = useState({});
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");



  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: '',
    postCode: '',
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
  const upazilas = district ? bdData[district] || [] : [];

  
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const finalData = {
      ...formData,
      district,
      area: upazila,
    };

    console.log(finalData);


    try {
      const data = await api.post(`/shipping`, finalData);
      await fetchAddress();
      await fetchAllAddress();
      document.getElementById("add_More_Shipping_Modal").close();

      toast.success(data?.data?.message);

      formData.name = ''
      formData.phone = ''
      setDistrict('')
      setUpazila('')
      formData.postCode = ''
      formData.address = ''
      formData.location = 'Home'
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };




    const isChange = () => {
        if (formData.name !== '' && formData.phone !== '' && district !== '' && upazila !== '' && formData.address !== '') {
             return true; 
        }
        return false;
    };

  return (
    <div className="select-none">
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <label onClick={() => document.getElementById("add_More_Shipping_Modal").showModal()} className="flex gap-2 text-gray-600 hover:scale-101 duration-200 items-center hover:cursor-pointer" >
        <p className='flex gap-2 items-center text-sm text-[#209C60] font-medium '>Add Address <BsArrowRight className='text-lg' /></p>
      </label>

      <dialog id="add_More_Shipping_Modal" className="modal">
        <div className="modal-box p-0">
          <form method="dialog" className="bg-blue-700">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 bg-[#1F5DA0] rounded-md text-sm text-white">
              ✕
            </button>
          </form>
          <div>
            <p className="text-lg text-black font-medium px-3 py-2.5">
              Shipping Address
            </p>
            <div className="divider m-0"></div>

            <div>
              <form id="shippingForm" onSubmit={handleSubmit}>
                <fieldset className="fieldset w-full font-medium text-black bg-base-200 border-base-300 rounded-box border p-4">
                  <div>
                    <div className="space-y-2">
                      {/* Name */}
                      <div className="text-[15px]">
                        <label className="flex items-start gap-1">
                          Recipient Name{" "}
                          <IoStar className="text-[10px] text-red-700" />
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
                          Contact Number{" "}
                          <IoStar className="text-[10px] text-red-700" />
                        </label>
                        <input
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          type="text"
                          placeholder="Mobile Number"
                          className="input w-full"
                        />
                      </div>

                      {/* Phone */}
                      <div className="text-[15px]">
                        <label className="flex items-start gap-1">
                          Email{" "}
                          <IoStar className="text-[10px] text-red-700" />
                        </label>
                        <input
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          type="email"
                          placeholder="Email Address"
                          className="input w-full"
                        />
                      </div>

                      {/* Country */}
                      <div className="text-[15px]">
                        <label className="flex items-start gap-1">
                          {" "}
                          Country{" "}
                        </label>
                        <select
                          name="country"
                          className="w-full border border-black/15 text-black/40 p-2 rounded bg-white"
                          disabled={true}
                        >
                          <option>Bangladesh</option>
                        </select>
                      </div>

                      {/* District */}
                      <div className="text-[15px]">
                        <label className="flex items-start gap-1">
                          District/City{" "}
                          <IoStar className="text-[10px] text-red-700" />
                        </label>
                        <select
                          value={district}
                          onChange={(e) => {
                            setDistrict(e.target.value);
                            console.log("value", e.target.value);
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
                          Post Code{" "}
                        </label>
                        <input
                          name="postCode"
                          value={formData.postCode}
                          onChange={handleChange}
                          type="text"
                          className="input w-full"
                          placeholder="Post Code"
                        />
                      </div>

                      {/* Address */}
                      <div className="text-[15px]">
                        <label className="flex items-start gap-1">
                          Address{" "}
                          <IoStar className="text-[10px] text-red-700" />
                        </label>
                        <input
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          type="text"
                          placeholder="House / Building / Street"
                          className="input w-full capitalize"
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

                        <div className="flex gap-5 w-full mt-5">
                            <div onClick={() => document.getElementById("add_More_Shipping_Modal").close()} className="btn flex-1 hover:bg-[#D71110] bg-[#FB2C36] text-white">
                              Cancel
                            </div>
                          
                          <button className=" btn flex-1 text-[15px] font-bold bg-[#2BB673] text-white hover:bg-[#209C60] disabled:bg-black/10 disabled:text-black/30 transition-colors duration-150 " disabled={!isChange()} >
                            {loading ? (
                                <span>
                                    <span className="loading loading-spinner loading-xs"></span>
                                    Loading...
                                </span> ) : ( "submit" )
                            }
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AddMoreShipping;
