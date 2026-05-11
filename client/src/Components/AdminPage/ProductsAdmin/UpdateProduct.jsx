import React, { useState } from 'react';
import api from './../../../API/Axios/api';

const UpdateProduct = ({product, productModalId, refetch}) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [enabledFields, setEnabledFields] = useState({
        name: false,
        price: false,
        discount: false,
        quantity: false,
        image: false,
        details: false,
        description: false,
    });
    const resetEnabledFields = () => {
        setEnabledFields({
            name: false,
            price: false,
            discount: false,
            quantity: false,
            image: false,
            details: false,
            description: false,
        });
    };



    const [formData, setFormData] = useState({
            name: '',
            price: '',
            discount: '',
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



    const handleCheckbox = (e) => {
        const { name, checked } = e.target;
        setEnabledFields(prev => ({
            ...prev,
            [name]: checked
        }));
    };

    const handleUpdateProduct = async (e) => {
        e.preventDefault()
        console.log(formData);


        const data = new FormData();
        if(enabledFields.name && formData.name.length !== 0){
            data.append('name', formData.name);
        }
        if(enabledFields.price && formData.price.length !== 0){
            data.append('price', formData.price);
        }
        if(enabledFields.discount && formData.name.discount !== 0){
            data.append('discount', formData.discount);
        }
        if(enabledFields.quantity && formData.quantity.length !== 0){
            data.append('quantity', formData.quantity);
        }
        if(enabledFields.image && formData.image.length !== 0){
            data.append('image', formData.image);
        }
        if(enabledFields.details && formData.details.length !== 0){
            data.append('details', formData.details);
        }
        if(enabledFields.description && formData.description.length !== 0){
            data.append('description', formData.description);
        }
        
        try {
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
            setErrorMessage('')
            // ✅ reset state
            resetEnabledFields();
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
            setErrorMessage(error?.response?.data?.message);
        }
        
    }
    return (
        <div>
            {/* product update modal */}
            <input type="checkbox" id={productModalId} className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box">
                    <h3 className="text-lg">Update <span className='font-semibold'>{product.name}</span></h3>
                    
                    <form onSubmit={(e) => handleUpdateProduct(e)} className="space-y-4">

                    <fieldset className='fieldset'>
                        <div className='flex items-center justify-between'>
                            <label className='fieldset-legend'>Product Name</label>
                            <input 
                                type="checkbox" 
                                name="name"
                                checked={enabledFields.name}
                                onChange={handleCheckbox}
                            />
                        </div>

                        <input
                            className="input input-neutral"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            name='name'
                            disabled={!enabledFields.name}
                            placeholder='Enter Product name'
                        />
                    </fieldset>

                    <fieldset className='fieldset'>
                        <div className='flex items-center justify-between'>
                            <label className='fieldset-legend'>Product Price</label>
                            <input 
                                type="checkbox" 
                                name="price"
                                checked={enabledFields.price}
                                onChange={handleCheckbox}
                            />
                        </div>

                        <input
                            className="input input-neutral"
                            type="number"
                            value={formData.price}
                            onChange={handleChange}
                            name='price'
                            disabled={!enabledFields.price}
                        />
                    </fieldset>
                    
                    <fieldset className='fieldset'>
                        <div className='flex items-center justify-between'>
                            <label className='fieldset-legend'>Discount</label>
                            <input 
                                type="checkbox" 
                                name="discount"
                                checked={enabledFields.discount}
                                onChange={handleCheckbox}
                            />
                        </div>

                        <input
                            className="input input-neutral"
                            type="number"
                            value={formData.discount}
                            onChange={handleChange}
                            name='discount'
                            disabled={!enabledFields.discount}
                        />
                    </fieldset>

                    <fieldset className='fieldset'>
                        <div className='flex items-center justify-between'>
                            <label htmlFor="details" className='fieldset-legend'>Product quantity</label>
                            <input 
                                type="checkbox" 
                                name="quantity"
                                checked={enabledFields.quantity}
                                onChange={handleCheckbox}
                            />
                        </div>
                        <input
                            className="input input-neutral"
                            type="number" 
                            value={formData.quantity}
                            onChange={handleChange}
                            name='quantity' 
                            placeholder='Enter Product quantity' 
                            disabled={!enabledFields.quantity}
                        />
                    </fieldset>

                    
                    <fieldset className="fieldset py-0 my-0 mb-1">
                        <div className='flex items-center justify-between'>
                            
                            <legend htmlFor="details" className='fieldset-legend'>Product image</legend>
                            <input 
                                type="checkbox" 
                                name="image"
                                checked={enabledFields.image}
                                onChange={handleCheckbox}
                            />
                        </div>
                        <input 
                            type="file" 
                            onChange={handleChange}
                            name="image" 
                            className="file-input" 
                            disabled={!enabledFields.image} />
                        <label className="label">Max size 2MB</label>
                    </fieldset>
                        

                    <fieldset className='fieldset'>
                        <div className='flex items-center justify-between'>
                            <label htmlFor="details" className='fieldset-legend'>Product details</label>
                            <input 
                                type="checkbox" 
                                name="details"
                                checked={enabledFields.details}
                                onChange={handleCheckbox}
                            />
                        </div>
                        <input
                            className="input input-neutral"
                            type="text" 
                            value={formData.details}
                            onChange={handleChange}
                            name='details' 
                            placeholder='Enter product details' 
                            disabled={!enabledFields.details}
                        />
                    </fieldset>
                    <fieldset className='fieldset'>
                        <div className='flex items-center justify-between'>
                            <label htmlFor="description" className='fieldset-legend'>Product description </label>
                            <input 
                                type="checkbox" 
                                name="description"
                                checked={enabledFields.description}
                                onChange={handleCheckbox}
                            />
                        </div>
                        <input
                            className="input input-neutral"
                            type="text" 
                            value={formData.description}
                            onChange={handleChange}
                            name='description' 
                            placeholder='Enter product description' 
                            disabled={!enabledFields.description}
                        />
                    </fieldset>
                    <div>
                        <label className={`label text-red-600 ${errorMessage !== '' ? 'block' : 'hidden'} `}>{errorMessage}</label>
                    </div>

                    <div className='text-center'>
                        <button className="btn btn-neutral mt-4 ">Submit</button>
                    </div>
                    </form>  
                </div>
                <label className="modal-backdrop" onClick={resetEnabledFields} htmlFor={productModalId}>Close</label>
            </div>
            {/* product modal work is end */}
        </div>
    );
};

export default UpdateProduct;