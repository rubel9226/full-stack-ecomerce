import React, { use, useEffect, useState } from 'react';
import { Link } from 'react-router';

// all icons
import { FaStar } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { createNewProduct, getSingleCategory } from './../../../API/Allapi';
import api from '../../../API/Axios/api';
import LoadingCard from '../../Seared/LoadingCard/LoadingCard';
import UpdateProduct from './UpdateProduct';
import AddNewProduct from './addNewProduct';
import DeleteProduct from './DeleteProduct';
import Loading from '../../../Utils/UI/Loading/Loading';




const ProductsAdmin = () => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [deleteLoading, setDeleteLoading] = useState(false);
    
    
    const fetchProducts = async () => {
        try {
            const res = await api.get('products');
            setProducts(res?.data?.payload?.products);
        } catch (error) {
            setProducts(null);
        } finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

  
    const groupedProducts = products
        .reduce((acc, product) => {
            const category = product.category.slug;

            if (!acc[category]) {
                acc[category] = [];
            }

            acc[category].push(product);

            return acc;
        }, {});

    
    

    
    

    

    if(loading){
        return (
            <div className='mt-20'>
               <div className='flex justify-between'>
                    <div>
                        <h2 className="text-xl font-semibold capitalize">Loading...</h2>
                        <p className='text-[12px] font-medium text-black/50'>Loading...</p>
                    </div>
                    <div className=''>
                        <label className="btn">Add new Product</label>
                    </div>
                </div>
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-4 justify-center items-center gap-5 border-t border-black/20 pt-4'>

                    <LoadingCard />

                </div>
            </div>
            
        )
    }

    return (
        <div className=''>
            {/* Loading... */}
            <div className={`fixed flex items-center justify-center z-20 bg-black/65 w-full min-h-screen top-0 right-0 ${deleteLoading ? 'block0' : 'hidden'}`}>
                <Loading />
            </div>


            {Object.keys(groupedProducts).map((cat) => {
                const modalId = `my_modal_${cat}`;

                return (
                <div className='mt-20' key={cat}>
                    <div className=''>

                        <div className='flex justify-between'>
                            <div>
                                <h2 className="text-xl font-semibold capitalize">{cat.replace(/-/g, " ")}</h2>
                                <p className='text-[12px] font-medium text-black/50'>{groupedProducts[cat].length} Items Found.</p>
                            </div>
                            <div className=''>
                                <label htmlFor={modalId} className="btn">Add new Product</label>
                            </div>
                        </div>

                        {/* The button to open modal */}
        
                        <AddNewProduct modalId={modalId} cat={cat} refetch={fetchProducts} />

                    </div>
                    <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-4 justify-center items-center gap-5 border-t border-black/20 pt-4">
                    {/* <div className="flex gap-3 overflow-x-auto no-scrollbar p-1"> */}
                        {groupedProducts[cat].map((product, index) => {
                            const productModalId = `my_modal_${product.slug}`;

                            return(
                                <div key={index}>
                                {product.discount === 0 
                                    ? 
                                    <div className=" shadow-sm border border-transparent rounded-md hover:border hover:border-indigo-800 duration-200">
                                    
                                        <div className=' text-center'>
                                                <div className='w-full bg-indigo-500/3'>
                                                    <img className='inline-block sm:w-full aspect-square w-full rounded-t-md' src={product.image} alt={product.name} />
                                                </div>
    
                                                <div className='p-1'>
                                                    <div className='flex gap-2 mt-1 justify-center'>
                                                        <p className='font-bold '><span className='leading-0 font-serif'>৳</span> {product.newPrice}</p>
                                                    </div>
                                                    <h3>{product.name}</h3>
                                                    <p className='line-clamp-1'>৳ {product.description}</p>
                                                    <div className='w-full flex justify-between mt-1 px-2'>
                                                        <DeleteProduct product={product} deleteLoading={deleteLoading} setDeleteLoading={setDeleteLoading} refetch={fetchProducts} />

                                                        <label htmlFor={productModalId} className="flex gap-2 text-gray-600 hover:scale-110 duration-200 hover:cursor-pointer">
                                                            <svg className="w-5 stroke-green-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                                            </svg>
                                                            <button className="font-semibold text-[12px] text-green-700">Edit</button>
                                                        </label>

                                                        {/* <label htmlFor={productModalId} className='btn btn-sm'>update</label> */}
                                                    </div>
                                                </div>
    
                                        </div>
                                    </div>
                                    :
                                    <div key={index} className=" p-1 shadow-sm border border-transparent rounded-md hover:border hover:border-indigo-800 duration-200">
                                        
                                            <div className='text-center'>
                                                <div >
                                                    <img className='inline-block sm:w-full aspect-square w-80' src={product.image} alt={product.name} />
                                                </div>
        
                                                <div>
                                                    <div className='flex gap-2 mt-1 justify-center'>
                                                        <p className='font-bold '><span className='leading-0 font-serif'>৳</span> {product.newPrice}</p>
                                                        <p className='font-bold old-price'><span className='leading-0 font-serif'>৳</span> {product.price}</p>
                                                    </div>
                                                    <h3>{product.name}</h3>
                                                    <p className='line-clamp-1'>৳ {product.description}</p>
                                                    <div className='w-full flex justify-between mt-1'>
                                                        <DeleteProduct product={product} deleteLoading={deleteLoading} setDeleteLoading={setDeleteLoading} refetch={fetchProducts} />

                                                        <label htmlFor={productModalId} className="flex gap-2 text-gray-600 hover:scale-110 duration-200 items-center hover:cursor-pointer">
                                                            <svg className="w-5 stroke-green-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                                            </svg>
                                                            
                                                            <span className="font-semibold cursor-pointer text-[12px] text-green-700">Edit</span>
                                                        </label>
                                                        {/* <label htmlFor={productModalId} className='btn btn-sm'>update</label> */}
                                                    </div>
                                                </div>
                                            </div>
                                    </div>
                                }
{/* product update */}   <UpdateProduct productModalId={productModalId} product={product} deleteLoading={deleteLoading} setDeleteLoading={setDeleteLoading} refetch={fetchProducts} />

                                </div>)                        
                        })}
                        
                    </div>


            





                </div>
            )})}

        </div>
    );
};

export default ProductsAdmin;




