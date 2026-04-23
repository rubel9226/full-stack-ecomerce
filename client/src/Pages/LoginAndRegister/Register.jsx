import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";

// icons
import { MdArrowBackIos } from "react-icons/md";


export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: '',
    password: "",
    confirm: "",
    image: null
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // এখানে API call করবে
  };

  return (
    <div className=" select-none min-h-screen flex items-center justify-center bg-white">
      <div>

        <div className="py-7 px-5">

          <Link to={-1} className="flex items-center gap-1 hover:link">
            <MdArrowBackIos />
            <p className="">Back To Home</p>
          </Link>

          <div className="text-center pt-2">
            <Link to={'/'} className="text-3xl font-bold text-[#1F5DA0]">Thrivon Fashion</Link>
          </div>
        </div>

        <div className="w-full max-w-md border border-gray-200 p-8 rounded-xl shadow-sm">

            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
              Register
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Name */}
              <div>
                <label className="text-[15px] text-black font-medium">Name</label>
                <input 
                    type="text" 
                    name="name" 
                    placeholder="Enter your name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300" 
                    required 
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-[15px] text-black font-medium">Email</label>
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Enter your email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300" 
                    required 
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="text-[15px] text-black font-medium">Phone Number</label>
                <input 
                    type="text" 
                    name="phone" 
                    placeholder="Enter your number" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300" 
                    required 
                />
              </div>

              {/* image */}
              <div>
                <label className="text-[15px] text-black font-medium">Image</label>
                <input 
                    type="file" 
                    name="image" 
                    onChange={(e) =>
                        setFormData({ ...formData, image: e.target.files[0] })
                    }
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300" 
                    required 
                />
              </div>
              
              {/* Password */}
              <div className="relative">
                <label className="text-[15px] text-black font-medium">Password</label>
                <input 
                    type={showPassword ? 'text' : 'password'} 
                    name="password" 
                    placeholder="Enter your password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300" 
                    required 
                />
                <span onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-10 cursor-pointer text-gray-500">
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              
              {/* confirm Password */}
              <div className="relative">
                <label className="text-[15px] text-black font-medium">Confirm Password</label>
                <input 
                    type={showConfirmPassword ? 'text' : 'password'} 
                    name="confirm" 
                    placeholder="Enter confirm password" 
                    value={formData.confirm} 
                    onChange={handleChange} 
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300" 
                    required 
                />
                <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-10 cursor-pointer text-gray-500">
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              {/* Button */}
              <button type="submit" className="w-full font-semibold bg-[#1F5DA0] text-white py-2 rounded-lg hover:bg-[#104278] transition">
                Create Account
              </button>

            </form>

            <p className="text-center text-[15px] text-black font-medium mt-4">
              Already have an account?{" "}
              <Link to={'/login'} className="text-black font-medium cursor-pointer">
                Login
              </Link>
            </p>

        </div>


      </div>
    </div>
  );
}