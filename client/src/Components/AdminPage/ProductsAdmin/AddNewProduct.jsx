import React, { useState } from 'react';
import { createNewProduct, getSingleCategory } from '../../../API/Allapi';

import { RxCross2 } from "react-icons/rx";
import { FaStar } from "react-icons/fa";
import api from '../../../API/Axios/api';

const AddNewProduct = ({modalId, cat, refetch }) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        quantity: '',
        details: '',
        description: '',
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
    console.log(loading);






    const handleAddProduct = async (e, cat) => {
        e.preventDefault();
        setLoading(true);
        console.log(loading);

        // const category = await getSingleCategory(cat);

        
        
        const data = new FormData();
        data.append('name', formData.name);
        data.append('price', formData.price);
        data.append('quantity', formData.quantity);
        data.append('details', formData.details);
        data.append('description', formData.description);
        data.append('image', formData.image);
        data.append('category', cat._id);

        
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
            document.getElementById('modal-1').checked = false;
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
            {/* Put this part before </body> tag */}
            <input type="checkbox" id={'modal-1'} className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box">
                    <div className='flex justify-between items-center'>
                        <h2 className='text-sm'>Add New Product on {cat.slug}</h2>
                        <div className="modal-action">
                            <label htmlFor={'modal-1'} className="btn rounded-full m-0 w-10 h-10  p-0 border-none bg-black/20"><RxCross2 className='text-xl' /></label>
                        </div>
                    </div>
                    <form onSubmit={(e) => handleAddProduct(e, cat)} className="space-y-4">
                        <fieldset className='fieldset'>
                            <label htmlFor="details" className='fieldset-legend justify-start gap-1 items-center'>Product Name <FaStar className='text-red-500' /></label>
                            <input
                                className="input input-neutral"
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
                                className="input input-neutral" 
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
                                className="input input-neutral"
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
                                className="file-input" required />
                            <label className="label">Max size 2MB</label>
                        </fieldset>
                            

                        <fieldset className='fieldset'>
                            <label htmlFor="details" className='fieldset-legend justify-start gap-1 items-center'>Product details <FaStar className='text-red-500' /> </label>
                            <input
                                className="input input-neutral"
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
                                className="input input-neutral"
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
                                        <>Submit</>
                                }
                                
                            </button>
                        </div>
                    </form>     
                </div>
            </div>
        </div>
    );
};

export default AddNewProduct;