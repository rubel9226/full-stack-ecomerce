import React, { useEffect, useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { LuCircleCheck } from "react-icons/lu";
import api from '../../../API/Axios/api';
import { toast } from 'react-toastify';

const MoreAddress = ({ allShipping, user, fetchAddress}) => {
    const [loading, setLoading] = useState(false);
    
    const [selectedId, setSelectedId] = useState(null);

    


    useEffect(() => {
        const defaultItem = allShipping.find(item => item.isDefault);
        if (defaultItem) {
            setSelectedId(defaultItem._id);
        }
    }, [allShipping]);

    const handleSelect = (id) => {
        setSelectedId(id);
        console.log(selectedId);
    };

    console.log(selectedId, 'selected id');

    const handleCloseModal = () => {
        document.getElementById("more_address").close()
    }

    const handleUpdateStatus =async () => {
        setLoading(true);
        try {
            await api.put(`/shipping/status/${selectedId}`);
            await fetchAddress();
            handleCloseModal();
        } catch (error) {
            console.log(error?.response?.data?.message);
        }finally{
            setLoading(false);
        }
    }

    const handleDeleteShipping =async (e, id) => {
        e.stopPropagation();
        
        if(confirm('Are you sure, delete shipping.')){
            try {
                const data = await api.delete(`/shipping/${id}`);
                await fetchAddress();
                toast.error(data?.data?.message);
            } catch (error) {
                toast.error(error?.response?.data?.message)
                console.log(error?.response?.data?.message);
                await fetchAddress();
                handleCloseModal();
            }
        }
        
    }
    

    return (
        <div className="select-none">
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <label onClick={() => document.getElementById("more_address").showModal()} className="flex gap-2 text-gray-600 hover:scale-101 duration-100 items-center hover:cursor-pointer" >
                <p className='flex gap-2 items-center text-sm text-indigo-800 font-medium '>More Address <BsArrowRight className='text-lg' /></p>
            </label>
        
            <dialog id="more_address" className="modal">
                <div className="modal-box p-0">
                    
                    {/* if there is a button in form, it will close the modal */}
                    <button type="button" onClick={handleCloseModal} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 bg-[#1F5DA0] rounded-md text-sm text-white" > ✕ </button>
                    
                    <div className='relative'>
                        <p onClick={handleCloseModal} className="text-lg text-black font-medium px-3 py-2.5">
                            Shipping Address
                        </p>

                        <div className="divider m-0"></div>
                        <div className='px-5 space-y-5 pb-18'>

                            {
                                allShipping.map((userAddress, index) => {
                                    return (
                                        <div key={index} onClick={() => handleSelect(userAddress._id)} className={`relative flex text-sm border ${selectedId === userAddress._id ? 'border-green-500' : 'border-black/50'}  rounded-md  text-black/70 px-5 py-3`}>
                                            {
                                                selectedId === userAddress._id && <div className="absolute -top-2 -left-2 w-7 h-7 bg-green-500 text-white flex items-center justify-center rounded-full text-xl">
                                                    ✓ 
                                                </div>
                                            }
                                            
                                            <div>
                                                <div >
                                                    <p className=' line-clamp-2 mb-0.5'>Name: <span className='capitalize'>{userAddress.name}</span></p>
                                                    <p className=' line-clamp-2 mb-0.5'>Phone: {userAddress.phone}</p>
                                                    <p className=' line-clamp-2 mb-0.5'>Email: {userAddress.email}</p>
                                                </div>
                                                <div>
                                                    <p className=' line-clamp-2 mb-0.5 capitalize'>{userAddress.address}</p>
                                                    <p className=' line-clamp-2 mb-0.5'>{userAddress.area}, {userAddress.postCode}, {userAddress.district}, {userAddress.country}</p>
                                                    <button className='px-2 bg-gray-200 border border-black/30 rounded-sm'>{userAddress.location}</button>
                                                </div>

                                            </div>
                                            
                                          
                                            <div>
                                                {
                                                    userAddress.isDefault ? '' 
                                                        :<p onClick={(e) => handleDeleteShipping(e, userAddress._id)} className='text-red-500 btn btn-sm'>delete</p>
                                                }
                                            </div>
                                        </div>
                                    )
                                })
                            } 

                        </div>
                    </div>

                    <div className='py-3 px-8 shadow-[0_-10px_20px_rgba(0,0,0,0.10)] absolute left-0 bottom-0 w-full bg-white'>
                        <button onClick={handleUpdateStatus} className='btn w-full bg-[#1F5DA0] text-[16px] font-bold text-white'>
                            {loading ?  <span> <span className="loading loading-spinner loading-xs"></span> Loading... </span> : "Confirm Address" }
                        </button>
                    </div>
                </div>
            </dialog>
            </div>
    );
};

export default MoreAddress;