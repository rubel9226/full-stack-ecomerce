import React, { use, useEffect, useState } from 'react';
import { Link } from 'react-router';

// all icons
import { FaStar } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import api from '../../../API/Axios/api';
import LoadingCard from '../../Seared/LoadingCard/LoadingCard';
import UpdateProduct from './UpdateProduct';
import AddNewProduct from './addNewProduct';
import DeleteProduct from './DeleteProduct';
import Loading from '../../../Utils/UI/Loading/Loading';
import SingleCategoryProducts from './SingleCategoryProducts';
import { toast } from 'react-toastify';




const ProductsAdmin = () => {
    const [loading, setLoading] = useState(true); 
    const [categories, setCategories] = useState([]); 
    const [loadingCategory, setLoadingCategory] = useState(false);

    const fetchCategories = async () => {
        try {
            const res = await api.get('/categories'); 
            setCategories(res?.data?.payload);
        } catch (error) {
            console.log('error category')
        } finally{
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleCreateCategory = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const image = e.target.image.files[0];

        const formData = new FormData();
        formData.append('name', name);
        formData.append('image', image);
        
        try {
            setLoadingCategory(true);
            const res = await api.post('/categories', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            e.target.name.value = '';
            e.target.image.value = '';
            toast.success(res?.data?.message);
            fetchCategories();
        } catch (error) {
            toast.error(error?.response?.data?.message); 
        }finally {
            setLoadingCategory(false);
        }
    } 

    return(
        <div className=''>
            <div className='py-4 px-2 border-y mb-2 sm:mb-4 md:mb-5 bg-indigo-500/15 flex flex-col md:flex-row md:gap-10 items-center justify-between'>
                <div className='md:flex-1 lg:flex-3'>
                    <h2 className=' font-semibold text-xl md:text-2xl xl:text-3xl 2xl:text-[32px] capitalize mb-2'>Category</h2>
                </div>
                <form className='text-center space-y-2 md:flex-1 lg:flex-2' onSubmit={handleCreateCategory}> 
                    <input
                        className="input input-neutral w-full sm:input-lg text-center"
                        type="text"
                        name='name' 
                        placeholder='Enter category name' 
                        required
                    />
                    <div className="space-y-2 text-start">
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            className="file-input input-neutral w-full sm:input-lg text-center"
                            required
                        />
                        <label onClick={fetchCategories} htmlFor="productImage" className="block text-xs text-gray-500 font-normal" >
                            width/heigh: 1:1 | png, jpg, avif
                        </label>
                    </div>
                    <button className="btn bg-orange-500 hover:bg-orange-600 text-white font-semibold lg:btn-lg" >{loadingCategory ? 'Creating...' : 'Create category'}</button>
                </form> 
            </div>

            <div>
                { categories.map((category, index) => {
                    return(
                        <div key={index}>
                            <SingleCategoryProducts category={category} setCategories={setCategories} />
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default ProductsAdmin;




