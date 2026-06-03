import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../../Context/AuthProvider';

// icons
import { IoPersonSharp } from "react-icons/io5";
import { MdLocalPhone, MdEmail } from "react-icons/md";

import UpdateProfile from './UpdateProfile';
import ChangePassword from './ChangePassword';

const AccountPage = () => {

    const [editProfile, setEditProfile] = useState(false);
    const [changePassword, setChangePassword] = useState(false);

    const { user } = useContext(AuthContext);

    return (

        <div className='mt-4 sm:mt-5'>

            
            <h3 className='font-semibold text-lg sm:text-xl md:text-2xl xl:text-3xl 2xl:text-[32px] capitalize'>
                My Account Information
            </h3>

            <div className='grid grid-cols-1 lg:grid-cols-12 lg:gap-8'>
                <div className='bg-white rounded-xl mt-3 lg:mt-0 shadow-sm border border-black/5 overflow-hidden lg:col-span-8'>
                    {
                        editProfile ?
                            <UpdateProfile setEditProfile={setEditProfile} />
                            :
                            <div>

                                {/* Top */}
                                <div className='flex flex-col justify-center items-center gap-2 py-5 sm:py-6 px-4 text-center'>

                                    <p className='text-lg sm:text-xl font-semibold text-[#1F5DA0]'>
                                        My Profile Information
                                    </p>

                                    <div
                                        onClick={() => setEditProfile(true)}
                                        className='
                                            flex
                                            text-black/50
                                            font-medium
                                            items-center
                                            gap-1
                                            cursor-pointer
                                            hover:text-black
                                            transition-all
                                            text-sm
                                            sm:text-base
                                        '
                                    >

                                        <svg
                                            viewBox='0 0 24 24'
                                            className='h-5 w-5 fill-current'
                                            xmlns='http://www.w3.org/2000/svg'
                                        >
                                            <g clipPath='url(#clip0_6701_28750)'>

                                                <path d='M2.91667 20H15.4167C16.1914 19.9978 16.9336 19.6883 17.4805 19.1395C18.0273 18.5906 18.334 17.8472 18.3333 17.0725V10.7917C18.3333 10.5706 18.2455 10.3587 18.0893 10.2024C17.933 10.0461 17.721 9.95832 17.5 9.95832C17.279 9.95832 17.067 10.0461 16.9107 10.2024C16.7545 10.3587 16.6667 10.5706 16.6667 10.7917V17.0725C16.6678 17.4053 16.5368 17.725 16.3024 17.9614C16.0681 18.1978 15.7495 18.3316 15.4167 18.3333H2.91667C2.58381 18.3316 2.26525 18.1978 2.0309 17.9614C1.79655 17.725 1.66556 17.4053 1.66667 17.0725V4.59416C1.66556 4.2613 1.79655 3.9416 2.0309 3.70522C2.26525 3.46884 2.58381 3.33509 2.91667 3.33332H9.16667C9.38768 3.33332 9.59964 3.24553 9.75592 3.08925C9.9122 2.93297 10 2.721 10 2.49999C10 2.27898 9.9122 2.06701 9.75592 1.91073C9.59964 1.75445 9.38768 1.66666 9.16667 1.66666H2.91667C2.14192 1.66886 1.3997 1.97835 0.852882 2.52719C0.306068 3.07604 -0.000664243 3.81941 1.08009e-06 4.59416V17.0725C-0.000664243 17.8472 0.306068 18.5906 0.852882 19.1395C1.3997 19.6883 2.14192 19.9978 2.91667 20Z'></path>

                                                <path d='M7.87972 8.78666L7.22222 11.7983C7.19246 11.9349 7.19755 12.0768 7.23701 12.211C7.27648 12.3451 7.34906 12.4671 7.44806 12.5658C7.54842 12.6621 7.67051 12.7327 7.80397 12.7717C7.93743 12.8107 8.07833 12.817 8.21472 12.79L11.2197 12.1308C11.3758 12.0966 11.5187 12.0182 11.6314 11.905L19.2264 4.31C19.4586 4.07785 19.6428 3.80223 19.7684 3.49889C19.8941 3.19555 19.9588 2.87042 19.9588 2.54208C19.9588 2.21374 19.8941 1.88862 19.7684 1.58528C19.6428 1.28193 19.4586 1.00632 19.2264 0.774165C18.7504 0.319278 18.1173 0.0654297 17.4589 0.0654297C16.8005 0.0654297 16.1674 0.319278 15.6914 0.774165L8.10806 8.37666C7.99424 8.48864 7.91499 8.63095 7.87972 8.78666ZM16.8697 1.95333C17.0283 1.80145 17.2393 1.71666 17.4589 1.71666C17.6784 1.71666 17.8895 1.80145 18.0481 1.95333C18.2022 2.11052 18.2886 2.32191 18.2886 2.54208C18.2886 2.76225 18.2022 2.97364 18.0481 3.13083L17.4589 3.72L16.2806 2.54166L16.8697 1.95333ZM9.45306 9.38167L15.0981 3.7225L16.2647 4.895L10.6172 10.5558L9.12139 10.8842L9.45306 9.38167Z'></path>

                                            </g>
                                        </svg>

                                        <p>Edit Profile</p>

                                    </div>

                                </div>

                                <div className='divider m-0'></div>

                                {/* Profile */}
                                <div>

                                    {/* Image */}
                                    <div className='flex flex-col justify-center items-center mt-5 sm:mt-7 px-4'>

                                        <div
                                            className='
                                                border-[5px]
                                                sm:border-[6px]
                                                border-gray-400
                                                rounded-full
                                                w-[110px]
                                                h-[110px]
                                                sm:w-[150px]
                                                sm:h-[150px]
                                                bg-blue-300
                                                overflow-hidden
                                            '
                                        >

                                            <img
                                                className='rounded-full w-full h-full object-cover'
                                                src={
                                                    user?.image === ''
                                                        ? 'https://res.cloudinary.com/dext9i4ab/image/upload/v1776982579/user-circles-set_78370-4704_kxxfvq.png'
                                                        : user?.image
                                                }
                                                alt="user image"
                                            />

                                        </div>

                                    </div>

                                    {/* Details */}
                                    <div className='px-4 sm:px-10 mt-6 sm:mt-10 pb-8 sm:pb-10'>

                                        <div
                                            className='
                                                grid
                                                grid-cols-1
                                                md:grid-cols-2
                                                gap-5
                                                sm:gap-6
                                            '
                                        >

                                            {/* Full Name */}
                                            <div
                                                className='
                                                    border
                                                    border-black/5
                                                    rounded-xl
                                                    p-4
                                                    bg-gray-50
                                                '
                                            >

                                                <label className='flex items-center gap-2 text-black/60 font-medium text-sm sm:text-base'>

                                                    <IoPersonSharp className='text-[#1F5DA0]' />

                                                    Full Name

                                                </label>

                                                <p className='font-semibold capitalize mt-2 text-sm sm:text-base break-words'>

                                                    {user?.name}

                                                </p>

                                            </div>

                                            {/* Phone */}
                                            <div
                                                className='
                                                    border
                                                    border-black/5
                                                    rounded-xl
                                                    p-4
                                                    bg-gray-50
                                                '
                                            >

                                                <label className='flex items-center gap-2 text-black/60 font-medium text-sm sm:text-base'>

                                                    <MdLocalPhone className='text-[#1F5DA0]' />

                                                    Contact Number

                                                </label>

                                                <p className='font-semibold mt-2 text-sm sm:text-base break-all'>

                                                    {user?.phone}

                                                </p>

                                            </div>

                                            {/* Email */}
                                            <div
                                                className='
                                                    border
                                                    border-black/5
                                                    rounded-xl
                                                    p-4
                                                    bg-gray-50
                                                    md:col-span-2
                                                '
                                            >

                                                <label className='flex items-center gap-2 text-black/60 font-medium text-sm sm:text-base'>

                                                    <MdEmail className='text-[#1F5DA0]' />

                                                    Email

                                                </label>

                                                <p className='font-semibold mt-2 text-sm sm:text-base break-all'>

                                                    {user?.email}

                                                </p>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>
                    }
                </div>
                
                <div className=' lg:col-span-4'>
                    <div className='bg-white rounded-xl mt-4 lg:mt-0 shadow-sm border border-black/5 overflow-hidden'>
                        <div>
                            <div className='flex flex-col justify-center items-center gap-2 py-5 sm:py-6 px-4 text-center'>
                                <p className='text-lg sm:text-xl font-semibold text-[#1F5DA0]'>
                                    Password Information
                                </p>
                            </div>
                            <div className='divider m-0 h-0' />
                            {
                                changePassword
                                    ? <ChangePassword setChangePassword={setChangePassword} />
                                    :
                                    <div className='flex justify-center flex-col items-center py-8 sm:py-10 px-4'>
                                        <div className='text-center'>
                                            <p className='font-medium text-black/50 text-sm sm:text-base'>
                                                Password
                                            </p>
                                            <p className='text-lg tracking-widest mt-1'>
                                                **********
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => setChangePassword(true)}
                                            className=' btn bg-[#026EE2] hover:bg-[#0257b4] text-white border-none mt-5 w-full sm:w-auto px-6'>                                    
                                        Change Password
                                        </button>
                                    </div>
                            }
                        </div>

                    </div>
                </div>
            </div>
            

        </div>
    );
};

export default AccountPage;