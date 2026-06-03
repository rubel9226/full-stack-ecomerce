import React, { useState } from 'react';
import api from './../../../API/Axios/api';
import { RxCross2 } from "react-icons/rx";

const UpdateProduct = ({product, productModalId, refetch}) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: product.name || '',
        price: product.price || 0,
        discount: product.discount || '0',
        quantity: product.quantity  || 0,
        details: product.details || '',
        description: product.description || '',
        image: null,
    });
    
    
    const handleChange = (e) => {
        if (e.target.name === 'image'){
            setFormData({
                ...formData,
                image: e.target.files[0],
            });
        }else{
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        }
    };
        

    const handleUpdateProduct = async (e) => {
        e.preventDefault()
        console.log(formData);


        const data = new FormData();
        if(product.name !== formData.name){
            data.append('name', formData.name);
        }
        data.append('price', formData.price);
        data.append('discount', formData.discount);
        data.append('quantity', formData.quantity);
        data.append('details', formData.details);
        data.append('description', formData.description);
        data.append('image', formData.image);

        
        try {
            setLoading(true);
            const updateProduct = await api.put(`/products/${product.slug}`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });

            console.log(updateProduct)

            if(refetch){
                refetch();
            }

            document.getElementById(productModalId).checked = false;
            setErrorMessage('');
            
        } catch (error) {
            console.log(error);
            setErrorMessage(error?.response?.data?.message);
        }finally{ 
            setLoading(false);
        }
        
    }
    return (
        <div>
            {/* product update modal */}
            <input type="checkbox" id={productModalId} className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box">
                    <div onClick={() => {
                        document.getElementById(productModalId).checked = false;
                    }} className='absolute right-3 top-3 bg-black/15 p-1 rounded-full'>
                        
                        <RxCross2 className='text-xl ' />
                    </div>
                    <div className='flex justify-between items-center'>
                        <h3 className="text-lg flex items-center gap-2">
                            Update 
                            <p className='font-semibold w-50 truncate'>{product.name}</p>
                        </h3>
                    </div>
                    
                    <form onSubmit={handleUpdateProduct} className="space-y-4">

                    <fieldset className='fieldset py-0'>
                        <div className='flex items-center justify-between'>
                            <label className='fieldset-legend'>Product Name</label> 
                        </div>

                        <input
                            className="input input-neutral w-full sm:input-lg"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            name='name'
                            placeholder='Enter Product name'
                        />
                    </fieldset>

                    <fieldset className='fieldset py-0'>
                        <div className='flex items-center justify-between'>
                            <label className='fieldset-legend'>Product Price</label> 
                        </div>

                        <input
                            className="input input-neutral w-full sm:input-lg"
                            type="number"
                            value={formData.price}
                            onChange={handleChange}
                            name='price' 
                        />
                    </fieldset>
                    
                    <fieldset className='fieldset py-0'>
                        <div className='flex items-center justify-between'>
                            <label className='fieldset-legend'>Discount</label> 
                        </div>

                        <input
                            className="input input-neutral w-full sm:input-lg"
                            type="number"
                            value={formData.discount}
                            onChange={handleChange}
                            name='discount' 
                        />
                    </fieldset>

                    <fieldset className='fieldset py-0'>
                        <div className='flex items-center justify-between'>
                            <label htmlFor="details" className='fieldset-legend'>Product quantity</label> 
                        </div>
                        <input
                            className="input input-neutral w-full sm:input-lg"
                            type="number" 
                            value={formData.quantity}
                            onChange={handleChange}
                            name='quantity' 
                            placeholder='Enter Product quantity'
                        />
                    </fieldset>

                    
                    <fieldset className="fieldset py-0 my-0 mb-1">
                        <div className='flex items-center justify-between gap-3'>
                            <legend htmlFor="details" className='font-semibold'>Product image</legend>
                            <label className="label text-red-800">Max size 2MB</label>
                        </div>
                        <input 
                            type="file" 
                            onChange={handleChange}
                            name="image" 
                            className="file-input w-full sm:input-lg" />
                    </fieldset>
                        

                    <fieldset className='fieldset py-0'>
                        <div className='flex items-center justify-between'>
                            <label htmlFor="details" className='fieldset-legend'>Product details</label> 
                        </div>
                        <input
                            className="input input-neutral w-full sm:input-lg"
                            type="text" 
                            value={formData.details}
                            onChange={handleChange}
                            name='details' 
                            placeholder='Enter product details' 
                        />
                    </fieldset>
                    <fieldset className='fieldset py-0'>
                        <div className='flex items-center justify-between'>
                            <label htmlFor="description" className='fieldset-legend'>Product description </label> 
                        </div>
                        <textarea
                            rows={2}
                            className="textarea textarea-neutral  w-full sm:input-lg"
                            value={formData.description}
                            onChange={handleChange}
                            name="description"
                            placeholder="Enter product description"
                        />
                    </fieldset>
                    <div>
                        <label className={`label text-red-600 ${errorMessage !== '' ? 'block' : 'hidden'} `}>{errorMessage}</label>
                    </div>

                    <div className='text-center'>
                        <button className="btn btn-neutral mt-4 ">
                            {loading ? 'Updated...' : 'Update'}
                        </button>
                    </div>
                    </form>  
                </div>
                <label className="modal-backdrop" htmlFor={productModalId}>Close</label>
            </div>

        </div>
    );
};

export default UpdateProduct;