import React, { useContext, useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import api from '../../../../API/Axios/api';
import { AuthContext } from '../../../../Context/AuthProvider';
import { toast } from 'react-toastify';

const ChangePassword = ({setChangePassword}) => {
    const { user } = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState('')

    const [inputShow, setInputShow] = useState({
        oldPassword: false,
        newPassword: false,
        confirmPassword: false 
    });

    const [form, setForm] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [loading, setLoading] = useState(false);

    const togglePassword = (field) => {
        setInputShow((prev) => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleUpdatePassword = async () => {
        try {

            if(!form.oldPassword || !form.newPassword || !form.confirmPassword){
                setErrorMessage("All fields are required");
            }

            if(form.newPassword !== form.confirmPassword){
                setErrorMessage("Confirm password does not match");
            }

            setLoading(true);

            const payload = {
                oldPassword: form.oldPassword,
                newPassword: form.newPassword,
                confirmedPassword: form.confirmPassword
            };

            const res = await api.put(
                `/users/update-password/${user._id}`,
                payload
            );

            console.log(res?.data);

            toast.success("Password updated successfully");
            setChangePassword(false)
            setErrorMessage('');

            setForm({
                oldPassword: "",
                newPassword: "",
                confirmPassword: ""
            });

        } catch (error) {
            console.log(error?.response?.data?.message);
            alert(error?.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='px-7 py-5'>

            {/* Old Password */}
            <div>
                <label className='font-medium'>
                    Old Password <span className='text-red-600'>*</span>
                </label>

                <div className='relative mt-1'>
                    <input
                        type={inputShow.oldPassword ? "text" : "password"}
                        name="oldPassword"
                        value={form.oldPassword}
                        onChange={handleChange}
                        className='w-full border py-2 px-3 pr-10 rounded-sm outline-none'
                        placeholder='Enter Old Password'
                    />

                    <span
                        onClick={() => togglePassword("oldPassword")}
                        className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer'
                    >
                        {inputShow.oldPassword ? <FaEye /> : <FaEyeSlash />}
                    </span>
                </div>
            </div>

            {/* New Password */}
            <div className='mt-4'>
                <label className='font-medium'>
                    New Password <span className='text-red-600'>*</span>
                </label>

                <div className='relative mt-1'>
                    <input
                        type={inputShow.newPassword ? "text" : "password"}
                        name="newPassword"
                        value={form.newPassword}
                        onChange={handleChange}
                        className='w-full border py-2 px-3 pr-10 rounded-sm outline-none'
                        placeholder='Enter New Password'
                    />

                    <span
                        onClick={() => togglePassword("newPassword")}
                        className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer'
                    >
                        {inputShow.newPassword ? <FaEye /> : <FaEyeSlash />}
                    </span>
                </div>
            </div>

            {/* Confirm Password */}
            <div className='mt-4'>
                <label className='font-medium'>
                    Confirm Password <span className='text-red-600'>*</span>
                </label>

                <div className='relative mt-1'>
                    <input
                        type={inputShow.confirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        className='w-full border py-2 px-3 pr-10 rounded-sm outline-none'
                        placeholder='Confirm Password'
                    />

                    <span
                        onClick={() => togglePassword("confirmPassword")}
                        className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer'
                    >
                        {inputShow.confirmPassword ? <FaEye /> : <FaEyeSlash />}
                    </span>
                </div>
                <p className={`text-sm text-red-600 font-medium ${errorMessage !== '' ? 'block': 'hidden'}`}>password ar not metch</p>
            </div>

            {/* buttons */}
            <div className='flex gap-3 mt-3'>

                <button
                    onClick={handleUpdatePassword}
                    disabled={loading}
                    className='btn bg-[#026EE2] hover:bg-[#0257b3] text-white border-none flex-1'
                >
                    {loading ? "Updating..." : "Update Now"}
                </button>

                <button
                    onClick={() => setForm({
                        oldPassword: "",
                        newPassword: "",
                        confirmPassword: ""
                    })}
                    className='btn bg-gray-200 hover:bg-gray-300 text-black border-none flex-1'
                >
                    Cancel
                </button>

            </div>
        </div>
    );
};

export default ChangePassword;