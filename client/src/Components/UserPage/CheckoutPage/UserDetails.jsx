// UserDetails.jsx

import React, { useEffect, useState } from 'react';

import UpdateShipping from './UpdateShipping';

import AddMoreShipping from './AddMoreShipping';
import MoreAddress from './MoreAddress';

import api from '../../../API/Axios/api';

const UserDetails = ({ userAddress, user, fetchAddress }) => {

    const [allShipping, setAllShipping] = useState([]);

    const {
        name,
        phone,
        email,
        location,
        address,
        area,
        country,
        district,
        postCode
    } = userAddress;

    const fetchAllAddress = async () => {

        try {

            const data = await api.get(`/shipping`);

            setAllShipping(data?.data?.payload);

        } catch (error) {

            console.log(error)

        }
    }

    useEffect(() => {

        if (user._id) {

            fetchAllAddress();

        }

    }, [user._id, userAddress]);

    return (
        <div className='bg-white rounded-2xl shadow-sm border border-black/5 overflow-hidden'>

            {/* Header */}
            <div className='px-5 py-4 border-b border-black/5'>
                <div className='flex items-center justify-between'>
                    <h2 className='text-xl font-bold'>
                        Shipping Address
                    </h2>
                    <UpdateShipping
                        userAddress={userAddress}
                        user={user}
                        fetchAddress={fetchAddress}
                    />
                </div>
            </div>

            {/* Content */}
            <div className='p-5'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5 text-sm text-black/80'>

                    {/* Left */}
                    <div className='space-y-1'>
                        <p>
                            Name :
                            <span className='font-medium capitalize ml-1'>
                                {name}
                            </span>
                        </p>
                        <p>
                            Phone :
                            <span className='font-medium ml-1'>
                                0{phone}
                            </span>
                        </p>
                        {
                            email &&
                            <p>
                                Email :
                                <span className='font-medium ml-1'>
                                    {email}
                                </span>
                            </p>
                        }
                    </div>

                    {/* Right */}
                    <div className='space-y-1'>
                        <p className='capitalize'>
                            {address}
                        </p>
                        <p>
                            {area}, {postCode}, {district}, {country}
                        </p>
                        <button className='px-3 py-1 text-xs rounded-md bg-gray-100 border border-black/10 capitalize'>
                            {location}
                        </button>
                    </div>
                </div>
            </div>

            
            
            <div className='border-t border-black/5 px-5 py-4 space-y-2'>
                <AddMoreShipping
                    userAddress={userAddress}
                    user={user}
                    fetchAddress={fetchAddress}
                    fetchAllAddress={fetchAllAddress}
                />
                {
                    allShipping.length > 1 &&
                    <MoreAddress
                        allShipping={allShipping}
                        user={user}
                        fetchAddress={fetchAddress}
                    />
                }
            </div>
        </div>
    );
};

export default UserDetails;