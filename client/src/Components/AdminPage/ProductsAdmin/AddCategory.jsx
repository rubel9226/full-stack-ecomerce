import React, { useState } from 'react'; 

import { RxCross2 } from "react-icons/rx";
import { FaStar } from "react-icons/fa";
import api from '../../../API/Axios/api';

const AddCategory = ({refetch}) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);






    const handleAddProduct = async (e, cat) => {
        e.preventDefault();
        setLoading(true);
        
        const name = e.target.name.value;
        const data = {name};

        
        try {
            await api.post('/category', data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
            
            if(refetch){
                refetch();
            }
            setErrorMessage('');
        } catch (error) { 
            setErrorMessage(error?.response?.data?.message); 
        } finally{
            setLoading(false)
        }
        
        
    }
    return (
        <div>
            <button className="btn btn-primary lg:btn-lg" onClick={()=>document.getElementById('my_modal_3').showModal()}>Create category</button>
        
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                         <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 w-10 h-10  p-0 border-none bg-black/20"><RxCross2 className='text-xl' /></button>
                    </form>
                    <div className='flex justify-between items-center'>
                        <h2 className='text-sm'>Add New Category</h2>
                    </div>
                    <form onSubmit={(e) => handleAddProduct(e)} className=" space-y-4">
                        <fieldset className='fieldset'>
                            <label htmlFor="details" className='fieldset-legend justify-start gap-1 items-center'>Product Name <FaStar className='text-red-500' /></label>
                            <input
                                className="input input-neutral w-full sm:input-lg"
                                type="text" 
                                value={formData.name}
                                onChange={handleChange}
                                name='name' 
                                placeholder='Enter Product name' 
                                required
                            />
                            
                        </fieldset>
                    
                        <fieldset className='fieldset'>
                            <label htmlFor="details" className='fieldset-legend justify-start gap-1 items-center'>Product price <FaStar className='text-red-500' /></label>
                            <input
                                className="input input-neutral w-full sm:input-lg" 
                                type="number"
                                value={formData.price}
                                onChange={handleChange}
                                name='price' 
                                placeholder='Enter product price' 
                                required 
                            />
                        </fieldset>
                    
                        <fieldset className='fieldset'>
                            <label htmlFor="details" className='fieldset-legend justify-start gap-1 items-center'>Product quantity <FaStar className='text-red-500' /></label>
                            <input
                                className="input input-neutral w-full sm:input-lg"
                                type="number" 
                                value={formData.quantity}
                                onChange={handleChange}
                                name='quantity' 
                                placeholder='Enter Product quantity' 
                                required 
                            />
                        </fieldset>
                    
                        
                        <fieldset className="fieldset py-0 my-0 mb-1">
                            <legend htmlFor="details" className='fieldset-legend justify-start gap-1 items-center'>Product image <FaStar className='text-red-500' /> </legend>
                            <input 
                                type="file" 
                                onChange={handleChange}
                                name="image" 
                                className="file-input w-full sm:input-lg" required />
                            <label className="label">Max size 2MB</label>
                        </fieldset>
                            
                    
                        <fieldset className='fieldset'>
                            <label htmlFor="details" className='fieldset-legend justify-start gap-1 items-center'>Product details <FaStar className='text-red-500' /> </label>
                            <input
                                className="input input-neutral w-full sm:input-lg"
                                type="text" 
                                value={formData.details}
                                onChange={handleChange}
                                name='details' 
                                placeholder='Enter product details' 
                                required 
                            />
                        </fieldset>
                        <fieldset className='fieldset'>
                            <label htmlFor="description" className='fieldset-legend justify-start gap-1 items-center '>Product description <FaStar className='text-red-500' /> </label>
                            <input
                                className="input input-neutral w-full sm:input-lg"
                                type="text" 
                                value={formData.description}
                                onChange={handleChange}
                                name='description' 
                                placeholder='Enter product description' 
                                required 
                            />
                        </fieldset>
                        <div>
                            <label className={`label text-red-600 ${errorMessage !== '' ? 'block' : 'hidden'} `}>{errorMessage}</label>
                        </div>
                    
                        <div className='text-center'>
                            <button className="btn btn-neutral mt-4 ">
                                {
                                    loading ? 
                                        <><span className="loading loading-spinner"></span> loading</> : 
                                        <>Create Product</>
                                }
                                
                            </button>
                        </div>
                    </form>   
                </div>
            </dialog>
        </div>
    );
};

export default AddCategory;