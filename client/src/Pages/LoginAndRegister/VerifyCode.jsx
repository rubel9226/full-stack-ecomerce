import React, { useState } from 'react';
import api from '../../API/Axios/api';
import { Link, useLocation, useNavigate } from 'react-router';
import { MdArrowBackIos } from 'react-icons/md';
import { toast } from 'react-toastify';

const VerifyCode = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        email: location.state?.email || "",
        otp: "",
      });
      // console.log(location.state?.email);


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
          setLoading(true);
            console.log(formData);
            const res =  await api.post('/users/verify-otp', formData);
            console.log(res?.data?.payload, 'api fetching');
            navigate('/login');
            toast.success('User is successfully created.')
        } catch (error) {
            console.log(error?.response?.data?.message);
        }finally{
          setLoading(false);
        }
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
                        <label className="text-[15px] text-black font-medium">
                          Otp Code
                        </label>
                        <input 
                            type="text" 
                            name="otp" 
                            placeholder="Enter your name" 
                            value={formData.otp} 
                            onChange={handleChange} 
                            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300" 
                            required 
                        />
                      </div>
        
                      
        
                      {/* Button */}
                      <button type="submit" className="w-full font-semibold bg-[#1F5DA0] text-white py-2 rounded-lg hover:bg-[#104278] transition">
                        {loading ? 'Loading...' : 'Create Account'}
                      </button>
        
                    </form>
        
                </div>
        
        
              </div>
            </div>
    );
};

export default VerifyCode;