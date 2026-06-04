import React, { useState } from 'react';
import api from './../../../API/Axios/api';
import { RxCross2 } from "react-icons/rx";
import { FaStar } from 'react-icons/fa';

const AddNew = ({category, refetch}) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const modalId = `my_modal_${category.slug}`;


     
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        quantity: '',
        details: '',
        description: '',
        color: '',
        sizes: '',
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


    const handleAddProduct = async ( e ) => {
        e.preventDefault();
        setLoading(true);
        console.log(loading); 
        
        const data = new FormData();
        data.append('name', formData.name);
        data.append('price', formData.price);
        data.append('quantity', formData.quantity);
        data.append('details', formData.details);
        data.append('description', formData.description);
        data.append('image', formData.image);
        data.append('category', category._id);
        data.append('color', formData.color);
        data.append('sizes', formData.sizes);         
        try {
            await api.post('/products', data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
            
            if(refetch){
                refetch();
            }
            setErrorMessage('');
            document.getElementById(modalId).close();
            setFormData({
                name: '',
                price: '',
                discount: '',
                quantity: '',
                details: '',
                description: '',
                image: null,
            });
        } catch (error) {
            console.log(error);
            setErrorMessage(error?.response?.data?.message);
            console.log('errorMessage', errorMessage)
            console.log(error?.response?.data?.message)
        } finally{
            setLoading(false)
        } 
    } 
    return (
        <div>
            <button className="btn bg-purple-500 hover:bg-purple-600 text-white btn-sm sm:btn-md lg:btn-lg" onClick={()=>document.getElementById(modalId).showModal()}>Create product</button>

            <dialog id={modalId} className="modal">
                <div className="modal-box">
                    <form method="dialog">
                         <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 w-10 h-10  p-0 border-none bg-black/20"><RxCross2 className='text-xl' /></button>
                    </form>
                    <div className='flex justify-between items-center'>
                        <h2 className='text-sm'>Add New Product on {category?.slug}</h2>
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
    <label
        htmlFor="color"
        className='fieldset-legend justify-start gap-1 items-center'
    >
        Product Color
        <FaStar className='text-red-500' />
    </label>

    <div className='flex items-center gap-3 border border-black/15 rounded-xl px-3 py-2 bg-base-100 shadow-sm'>

        {/* Color Picker */}
        <input
            className='w-14 h-14 p-1 rounded-xl cursor-pointer border border-black/10 bg-white'
            type="color"
            value={formData.color}
            onChange={handleChange}
            name='color'
            required
        />

        {/* Hex Value */}
        <div className='flex-1'>

            <p className='text-xs text-black/50 font-medium mb-1'>
                Selected Color
            </p>

            <div className='flex items-center justify-between bg-base-200 rounded-lg px-3 py-2'>

                <span className='font-semibold tracking-wide uppercase text-sm'>
                    {formData.color || '#000000'}
                </span>

                <div
                    className='w-6 h-6 rounded-md border border-black/10'
                    style={{ backgroundColor: formData.color }}
                ></div>

            </div>

        </div>

    </div>
</fieldset>

<fieldset className='fieldset'>
    <label
        htmlFor="sizes"
        className='fieldset-legend justify-start gap-1 items-center'
    >
        Product Sizes
        <FaStar className='text-red-500' />
    </label>

    <div className='border border-black/15 rounded-xl p-3 bg-base-100 shadow-sm'>

        {/* Input */}
        <input
            className="input input-neutral w-full"
            type="text"
            value={formData.sizes}
            onChange={handleChange}
            name='sizes'
            placeholder='Example: M, L, XL, 2XL'
        />

        {/* Help Text */}
        <p className='text-xs text-black/50 mt-2'>
            Add multiple sizes separated by commas.
        </p>

        {/* Preview */}
        <div className='flex flex-wrap gap-2 mt-3'>

            {
                formData.sizes &&
                formData.sizes
                    .split(',')
                    .map((size, index) => (
                        <span
                            key={index}
                            className='px-3 py-1 rounded-lg bg-indigo-100 text-indigo-700 text-sm font-semibold border border-indigo-200'
                        >
                            {size.trim()}
                        </span>
                    ))
            }

        </div>

    </div>
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

export default AddNew;