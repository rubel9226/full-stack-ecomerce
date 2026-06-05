import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router';
import api from '../../../API/Axios/api';
import { toast } from 'react-toastify';
import { FaStar } from 'react-icons/fa';
import { RxCross2 } from "react-icons/rx";

const UpdateProductPage = () => {
    const navigate = useNavigate();
    const { categorySlug } = useParams();
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState('');


    
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');

    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');
    const productSlug = searchParams.get('product'); 
    const [product, setProduct] = useState({}); 

    useEffect(() => {
        if(!productSlug){
            navigate('/admin/products');
            return;
        };

        const handleGetProduct =async () => {
            try {
                const res = await api.get(`/products/${productSlug}`)
                setProduct(res?.data?.payload);
            } catch (error) {
                navigate('/admin/products'); 
                console.log(error?.response?.data?.message);
            }
        };

        handleGetProduct();
    }, [productSlug, category]);


    console.log(product?.image)

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        discount: '',
        sold: '',
        quantity: '',
        details: '',
        description: '',
        colors: [],
        sizes: [],
        image: null,
    });

    useEffect(() => {
        if(product?._id){
            setFormData({
                name: product?.name || '',
                price: product?.price || '',
                discount: product?.discount || 0,
                sold: product?.sold || 0,
                quantity: product?.quantity || '',
                details: product?.details || '',
                description: product?.description || '',
                colors: product?.variants?.colors || [],
                sizes: product?.variants?.size || [],
                image: product?.image,
            });

            setSelectedSize(product?.variants?.size?.join(', '));
            setSelectedColor(product?.variants?.colors?.join(', '));

            setPreviewImage(product?.image);
        }
    }, [product]);

    

    console.log(product?.variants?.size?.join(','));




    // input change
    const handleChange = (e) => {
        if (e.target.name === 'image') {
            const file = e.target.files[0];
            setFormData({
                ...formData,
                image: file,
            });
            if (file) {
                setPreviewImage(URL.createObjectURL(file));
            }
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        }
    };  

    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        setLoading(true); 
        try {
            
            const data = new FormData();
            if(product.name !== formData.name){
                data.append('name', formData.name);
            }
            data.append('price', formData.price);
            data.append('discount', formData.discount);
            data.append('sold', formData.sold);
            data.append('quantity', formData.quantity);
            data.append('details', formData.details);
            data.append('description', formData.description);
            data.append('image', formData.image);
            data.append('colors', JSON.stringify(formData.colors));
            data.append('sizes', JSON.stringify(formData.sizes)); 
            
            data.append('category', product?.category?._id);
            await api.put(`/products/${product.slug}`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            }); 

            setErrorMessage('')
            toast.success('Product updated successfully');
            navigate(-1);
        } catch (error) {
            console.log(error);
            setErrorMessage(
                error?.response?.data?.message || 'Something went wrong'
            );
        } finally {
            setLoading(false);
        }
        
    }




    return (
        <div className='min-h-screen bg-[#f5f7fb] p-3 sm:p-5 md:p-8 mb-15 lg:mb-0'>

            <div className='max-w-7xl mx-auto'>

                {/* top */}
                <div className='flex items-center justify-between gap-4 mb-6'>

                    <div>
                        <h2 className='text-xl sm:text-2xl md:text-3xl font-bold text-black/80 capitalize'>
                            Update {productSlug}
                        </h2>

                        <p className='text-xs sm:text-sm text-black/50 mt-1 capitalize'>
                            Category :
                            {' '}
                            {product?.category?.name?.replace(/-/g, " ")}
                        </p>
                    </div>



                    <button
                        onClick={() => navigate(-1)}
                        className='btn rounded-md sm:rounded-2xl bg-white border border-black/10 hover:bg-black hover:text-white'
                    >
                        <RxCross2 className='text-lg' />
                        Back
                    </button>
                </div>



                {/* main */}
                <div className='bg-white border border-black/10 rounded-xl sm:rounded-[30px] overflow-hidden shadow-sm'>

                    {/* header */}
                    <div className='border-b border-black/10 px-4 sm:px-6 py-5'>

                        <h3 className='text-lg sm:text-xl font-bold'>
                            Product Information
                        </h3>

                        <p className='text-xs sm:text-sm text-black/50 mt-1'>
                            Change any required fields carefully.
                        </p>
                    </div>



                    {/* form */}
                    <form
                        onSubmit={handleUpdateProduct}
                        className='p-4 sm:p-6'
                    >

                        <div className='grid xl:grid-cols-2 gap-6'>

                            {/* left */}
                            <div className='space-y-5'>

                                {/* product name */}
                                <fieldset className='fieldset'>

                                    <label className='fieldset-legend sm:text-sm md:text-base gap-1'>
                                        Product Name
                                        <FaStar className='text-red-500 text-[10px]' />
                                    </label>

                                    <input
                                        className='input input-bordered w-full h-13 rounded-md sm:rounded-xl'
                                        type="text"
                                        name='name'
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder='Enter product name'
                                        required
                                    />
                                </fieldset>



                                {/* price + discount */}
                                <div className='grid sm:grid-cols-2 gap-4'>

                                    <fieldset className='fieldset'>

                                        <label className='fieldset-legend sm:text-sm md:text-base gap-1'>
                                            Product Price
                                            <FaStar className='text-red-500 text-[10px]' />
                                        </label>

                                        <input
                                            className='input input-bordered w-full h-13 rounded-md sm:rounded-xl'
                                            type="number"
                                            name='price'
                                            value={formData.price}
                                            onChange={handleChange}
                                            placeholder='Enter price'
                                            required
                                        />
                                    </fieldset>



                                    <fieldset className='fieldset'>

                                        <label className='fieldset-legend sm:text-sm md:text-base gap-1'>
                                            Product discount
                                        </label>

                                        <input
                                            className='input input-bordered w-full h-13 rounded-md sm:rounded-xl'
                                            type="number"
                                            name='discount'
                                            value={formData.discount}
                                            onChange={handleChange}
                                            placeholder='Enter discount'
                                        />
                                    </fieldset>
                                </div>



                                {/* quantity + sold */}
                                <div className='grid sm:grid-cols-2 gap-4'>

                                    <fieldset className='fieldset'>

                                        <label className='fieldset-legend sm:text-sm md:text-base gap-1'>
                                            Product quantity
                                            <FaStar className='text-red-500 text-[10px]' />
                                        </label>

                                        <input
                                            className='input input-bordered w-full h-13 rounded-md sm:rounded-xl'
                                            type="number"
                                            name='quantity'
                                            value={formData.quantity}
                                            onChange={handleChange}
                                            placeholder='Enter quantity'
                                            required
                                        />
                                    </fieldset>



                                    <fieldset className='fieldset'>

                                        <label className='fieldset-legend sm:text-sm md:text-base gap-1'>
                                            Product sold
                                        </label>

                                        <input
                                            className='input input-bordered w-full h-13 rounded-md sm:rounded-xl'
                                            type="number"
                                            name='sold'
                                            value={formData.sold}
                                            onChange={handleChange}
                                            placeholder='Enter sold' 
                                        />
                                    </fieldset>
                                </div>


                                <div className='grid sm:grid-cols-2 gap-4'>
                                    {/* details */}
                                    <fieldset className='fieldset'>

                                        <label className='fieldset-legend sm:text-sm md:text-base gap-1'>
                                            Product Details
                                            <FaStar className='text-red-500 text-[10px]' />
                                        </label>

                                        <textarea
                                            className='textarea textarea-bordered rounded-lg sm:rounded-2xl min-h-28 w-full'
                                            name='details'
                                            value={formData.details}
                                            onChange={handleChange}
                                            placeholder='Enter product details'
                                            required
                                        />
                                    </fieldset>



                                    {/* description */}
                                    <fieldset className='fieldset'>

                                        <label className='fieldset-legend sm:text-sm md:text-base gap-1'>
                                            Product Description
                                            <FaStar className='text-red-500 text-[10px]' />
                                        </label>

                                        <textarea
                                            className='textarea textarea-bordered rounded-lg sm:rounded-2xl min-h-28 w-full'
                                            name='description'
                                            value={formData.description}
                                            onChange={handleChange}
                                            placeholder='Enter product description'
                                            required
                                        />
                                    </fieldset>

                                </div>


                            </div>



                            {/* right */}
                            <div className='space-y-5 sm:space-y-2'>

                                {/* image upload */}
                                <div className='sm:flex sm:items-center border border-black/10 rounded-md sm:rounded-xl p-4 group hover:bg-black/5 duration-300'>

                                    <div className='flex-5'>
                                        <div className='flex items-center justify-between gap-3 mb-4'>
                                            <div>
                                                <h3 className='font-bold text-lg'>
                                                    Product Image
                                                </h3>

                                                <p className='text-xs text-black/50 mt-1'>
                                                    Max upload size 2MB
                                                </p>
                                            </div>
                                            <FaStar className='text-red-500 text-xs' />
                                        </div> 

                                        <input
                                            type="file"
                                            name='image' 
                                            onChange={handleChange}
                                            className='file-input file-input-bordered w-full rounded-2xl'
                                        /> 
                                    </div>

                                    <div className='flex-2'>
                                        {
                                            previewImage && (
                                                <div className='mt-5 p-10 sm:pl-10 group-hover:scale-105 duration-300'>
                                                    <img
                                                        src={previewImage}
                                                        alt=""
                                                        className='w-full aspect-square object-cover rounded-3xl border'
                                                    />
                                                </div>
                                            )
                                        }
                                    </div>

                                </div> 

                                {/* colors */}
                                <fieldset className='fieldset'>
                                    <label className='fieldset-legend sm:text-sm md:text-base gap-1'>
                                        Product colors
                                        <FaStar className='text-red-500 text-[10px]' />
                                    </label>

                                    <div className='border border-black/10 hover:border-white rounded-3xl p-4 group hover:bg-black/5 duration-300'>

                                        <input
                                            className='input input-bordered w-full rounded-2xl group-hover:border-white'
                                            type="text"
                                            name='colors'
                                            value={selectedColor}
                                            onChange={(e) => { 
                                                const value = e.target.value; 
                                                setSelectedColor(value);
                                                setFormData(prev => ({
                                                    ...prev,
                                                    colors: value
                                                        .split(',')
                                                        .map(size => size.trim())
                                                        .filter(Boolean)
                                                }));
                                            }}
                                            placeholder='Example: white, black, blue'
                                        />

                                        <p className='text-xs text-black/50 mt-2'>
                                            Separate color using commas.
                                        </p> 

                                        <div className='flex flex-wrap gap-2 mt-4'>
                                            {
                                                formData.colors &&
                                                formData.colors
                                                    .map((color, index) => (

                                                        <span
                                                            key={index}
                                                            className='px-3 py-1 rounded-xl bg-indigo-100 text-indigo-700 text-sm font-semibold border border-indigo-200'
                                                        >
                                                            {color.trim()}
                                                        </span>
                                                    ))
                                            }
                                        </div>
                                    </div>
                                </fieldset>


                                {/* sizes */}
                                <fieldset className='fieldset'>
                                    <label className='fieldset-legend sm:text-sm md:text-base gap-1'>
                                        Product Sizes
                                        <FaStar className='text-red-500 text-[10px]' />
                                    </label>

                                    <div className='border border-black/10 hover:border-white rounded-3xl p-4 group hover:bg-black/5 duration-300'>

                                        <input
                                            className='input input-bordered w-full rounded-2xl group-hover:border-white'
                                            type="text"
                                            name='sizes'
                                            value={selectedSize}
                                            onChange={(e) => { 
                                                const value = e.target.value; 
                                                setSelectedSize(value);
                                                setFormData(prev => ({
                                                    ...prev,
                                                    sizes: value
                                                        .split(',')
                                                        .map(size => size.trim())
                                                        .filter(Boolean)
                                                }));
                                            }}
                                            placeholder='Example: M, L, XL'
                                        />

                                        <p className='text-xs text-black/50 mt-2'>
                                            Separate sizes using commas.
                                        </p> 

                                        <div className='flex flex-wrap gap-2 mt-4'>
                                            {
                                                formData.sizes &&
                                                formData.sizes
                                                    .map((size, index) => (

                                                        <span
                                                            key={index}
                                                            className='px-3 py-1 rounded-xl bg-indigo-100 text-indigo-700 text-sm font-semibold border border-indigo-200'
                                                        >
                                                            {size.trim()}
                                                        </span>
                                                    ))
                                            }
                                        </div>
                                    </div>
                                </fieldset>



                            </div>
                        </div>



                        {/* error */}
                        {
                            errorMessage && (

                                <div className='mt-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-2xl text-sm'>
                                    {errorMessage}
                                </div>
                            )
                        }



                        {/* submit */}
                        <div className='sticky bottom-0 bg-white pt-6 mt-6 border-t border-black/10'>

                            <button className='btn w-full h-11 sm:h-14 rounded-md sm:rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white border-none text-base'>

                                {
                                    loading
                                        ? (
                                            <>
                                                <span className="loading loading-spinner"></span>
                                                Creating Product...
                                            </>
                                        )
                                        : 'Create Product'
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateProductPage;