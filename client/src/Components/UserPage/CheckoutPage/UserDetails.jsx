import React, { useEffect, useState } from 'react';
import UpdateShipping from './UpdateShipping';

import { BsArrowRight } from "react-icons/bs";
import AddMoreShipping from './AddMoreShipping';
import MoreAddress from './MoreAddress';
import api from '../../../API/Axios/api';

const UserDetails = ({userAddress, user, fetchAddress}) => { 
    const [allShipping, setAllShipping] = useState([]);

    const {name, phone, location, address, area, country, district, postCode} = userAddress;

    const fetchAllAddress = async () => {
        try {
            const data = await api.get(`/shipping`);
            setAllShipping(data?.data?.payload);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if(user._id){
            fetchAllAddress();
        }
    }, [user._id, userAddress]); 



    return (
        <div className='card card-sm shadow-[0_0_20px_rgba(0,0,0,0.15)] px-3 py-2.5'>
            <p className='text-sm font-semibold'>Shipping Address</p>
            <div className='divider my-0'></div>

            <div className='flex justify-between'>
                <div className='text-sm  text-black/70'>
                    <div >
                        <p className=' line-clamp-2 mb-0.5'>Name: <span className='capitalize'>{name}</span></p>
                        <p className=' line-clamp-2 mb-0.5'>Phone: 01307743888</p>
                    </div>
                    <div>
                        <p className=' line-clamp-2 mb-0.5 capitalize'>{address}</p>
                        <p className=' line-clamp-2 mb-0.5'>{area}, {postCode}, {district}, {country}</p>
                        <button className='px-2 bg-gray-200 border border-black/30 rounded-sm'>{location}</button>
                    </div>
                    
                </div>
                <div>
                    {/* <button className='btn btn-sm'>Edit</button> */}
                    <UpdateShipping userAddress={userAddress} user={user} fetchAddress={fetchAddress} />
                </div>

            </div>
            <div>
                <div className='divider m-0 mb-1'></div>
                <div className='space-y-1'>
                    <AddMoreShipping userAddress={userAddress} user={user} fetchAddress={fetchAddress} fetchAllAddress={fetchAllAddress} />

                    {
                        allShipping.length > 1 && <MoreAddress allShipping={allShipping} user={user} fetchAddress={fetchAddress} />
                    }                  
                </div>
            </div>
        </div>
    );
};

export default UserDetails;