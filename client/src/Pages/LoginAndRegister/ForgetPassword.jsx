import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router";

// icons
import { MdArrowBackIos } from "react-icons/md";
import api from './../../API/Axios/api';
import { toast } from "react-toastify";


export default function ForgetPassword() {
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [isDone, setIsDone] = useState(false);


    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        email: ''
    });
    
    const [confirmFormData, setConfirmFormData] = useState({
        email: formData.email,
        otp: '',
        password: '',
        confirm: ''
    });
    

    

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const handleConfirmChange = (e) => {
        setConfirmFormData({ ...confirmFormData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            if(isDone){
                confirmFormData.email = formData.email;

                console.log(formData.email, 'email confirm ');
                console.log(confirmFormData);

                if(confirmFormData.password !== confirmFormData.confirm){
                    setErrorMessage('Password does not match.')
                    
                    return;
                } else if(confirmFormData.password.length < 6 || confirmFormData.confirm.length < 6){
                    setErrorMessage('Password minimum length 6.')
                }else{
                    setErrorMessage('');
                }
                
                const res = await api.post('/users/forget-password-verify', confirmFormData);
    
                console.log(res?.data?.payload);
            
                navigate('/login');
            }else{
                console.log(formData)
                
                const res = await api.post('/users/forget-password-sendEmail', formData);
    
                console.log(res?.data?.payload);
                toast.success('OTP send successfully.')
                setIsDone(true);
            }

        } catch (error) {
        console.log(error?.response?.data?.message);
        } finally{
            setLoading(false);
        }
    };

    return (
        <div className=" select-none min-h-screen flex items-center justify-center bg-white">
            <div>

                <div className="py-7 px-5 ">

                    <Link to={-1} className="flex items-center gap-1 hover:link">
                        <MdArrowBackIos />
                        <p className="">Back</p>
                    </Link>

                    <div className="text-center pt-2">
                        <Link to={'/'} className="text-3xl font-bold text-[#1F5DA0]">Thrivon Fashion</Link>
                    </div>
                </div>

                <div className="w-full max-w-md border border-gray-200 p-8 rounded-xl shadow-sm">

                    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                    Forgot Password
                    </h2>

                    <form onSubmit={handleSubmit}>

                        {
                            isDone 
                            ? <div className="space-y-4">
                                <div>
                                    <label className="text-[15px] text-black font-medium">OTP <span className="text-red-600 font-bold">*</span></label>
                                    <input 
                                        type="number" 
                                        name="otp" 
                                        placeholder="Enter your email" 
                                        value={confirmFormData.otp} 
                                        onChange={handleConfirmChange} 
                                        className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300" 
                                        required 
                                    />
                                </div>
                                
                                {/* Password */}
                                <div className="relative">
                                    <label className="text-[15px] text-black font-medium">Password <span className="text-red-600 font-bold">*</span></label>
                                    <input 
                                        type={showPassword ? 'text' : 'password'} 
                                        name="password" 
                                        placeholder="Enter your password" 
                                        value={confirmFormData.password} 
                                        onChange={handleConfirmChange} 
                                        className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300" 
                                        required 
                                    />
                                    <span onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-10 cursor-pointer text-gray-500">
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                                
                                {/* confirm Password */}
                                <div className="relative">
                                    <label className="text-[15px] text-black font-medium">Confirm Password <span className="text-red-600 font-bold">*</span></label>
                                    <input 
                                        type={showConfirmPassword ? 'text' : 'password'} 
                                        name="confirm" 
                                        placeholder="Enter confirm password" 
                                        value={confirmFormData.confirm} 
                                        onChange={handleConfirmChange} 
                                        className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300" 
                                        required 
                                    />
                                    <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-10 cursor-pointer text-gray-500">
                                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                                
                                <button type="submit" className="w-full font-semibold bg-[#1F5DA0] text-white py-2 rounded-lg hover:bg-[#104278] transition">
                                    {loading ? 'Loading...' : 'Continue'}
                                </button>
                            </div>
                            :
                            <div className="space-y-4">

                                <div>
                                    <label className="text-[15px] text-black font-medium">Email <span className="text-red-600 font-bold">*</span></label>
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
                                
                                <button type="submit" className="w-full font-semibold bg-[#1F5DA0] text-white py-2 rounded-lg hover:bg-[#104278] transition">
                                    {loading ? 'Loading...' : 'Continue'}
                                </button>
                            </div>
                        }
                        <label className={`label mt-2 text-red-600 font-medium ${errorMessage !== '' ? 'block' : 'hidden'}`}>
                            {
                                errorMessage !== '' && errorMessage
                            }
                        </label>

                    </form>

                </div>


            </div>
        </div>
    );
}