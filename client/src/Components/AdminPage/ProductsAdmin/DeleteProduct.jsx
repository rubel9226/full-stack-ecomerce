import React, { useState } from 'react';
import api from '../../../API/Axios/api';
import { toast } from 'react-toastify';

const DeleteProduct = ({product,  deleteLoading, setDeleteLoading, refetch}) => {

    const { name, slug } = product; 
    const handleDelete = async () => {
        
        if(confirm(`You are sure delete ${name}?`)){
            setDeleteLoading(true);
            try {
                await api.delete(`/products/${slug}`);

                if(refetch){
                    refetch();
                }
                toast.success(`successfully delete ${name}`)
            } catch (error) {
                toast.error(error?.response?.data?.message);
            } finally{
                setDeleteLoading(false);
            }
        }
    }

    return (
        <div className="flex justify-around items-center hover:cursor-pointer">

            <div className="flex gap-2 text-gray-600 hover:scale-110 duration-200 hover:cursor-pointer">
                <svg className="w-5 stroke-red-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                <span onClick={handleDelete} className="font-semibold text-[12px] text-red-700">Delete</span>
            </div>
        </div>
    );
};

export default DeleteProduct;