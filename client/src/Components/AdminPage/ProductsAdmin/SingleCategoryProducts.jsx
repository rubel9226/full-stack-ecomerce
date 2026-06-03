import React, { useEffect, useState } from 'react';
import api from '../../../API/Axios/api';
import AddNewProduct from './addNewProduct';
import UpdateProduct from './UpdateProduct';
import DeleteProduct from './DeleteProduct';
import Pagination from '../../../Pages/CategoryPage/CategoryPagination/Pagination';
import AddNew from './AddNew';
import LoadingProduct from '../../Loading/LoadingProduct';
import AddHomeSection from './AddHomeSection';
import { toast } from 'react-toastify';

const SingleCategoryProducts = ({category, setCategories}) => {
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState({});
    const [loading, setLoading] = useState(true);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [loadingCategory, setLoadingCategory] = useState(false);
    const [loadingPopular, setLoadingPopular] = useState(false);
    const [page, setPage] = useState(1);

    const modalId = `my_modal_${category.slug}`;


    const fetchProducts = async () => {
        setLoading(true); 
        try {
            const res = await api.get(`/products?category=${category.slug}&limit=8&page=${page}`);
            setProducts(res?.data?.payload?.products);
            setPagination(res?.data?.payload?.pagination);
        } catch (error) {
            setProducts([]);
        } finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [page, category._id]);

    const handleDeleteCategory =async () => {
        setLoadingCategory(true); 
        try {
            const res = await api.delete(`/categories/${category.slug}`);
            console.log(res?.data?.payload);
            const newCategory = res?.data?.payload;

            setCategories(prev => 
                prev.filter(category => category._id !== newCategory._id)
            );
            
        } catch (error) {
            console.log(error?.response?.data?.message);
            throw new error;
        } finally {
            setLoadingCategory(false);
        }
    }


    const handleAddPopular = async () => {
        setLoadingPopular(true); 
        try {
            const res = await api.put(`/categories/popular/add-popular/${category.slug}`);
            console.log(res?.data?.payload);
            const newCategory = res?.data?.payload;

            setCategories(prev => 
                prev.map(category => category._id === newCategory._id ? {...category, isPopular: true} : category)
            );

            toast.success(<span className='capitalize'>{category.slug.replace(/-/g, " "), 'category added to popular section'}</span>)            
        } catch (error) {
            // console.log(error?.response?.data?.message); 
            console.log(error); 
        } finally {
            setLoadingPopular(false);
        }
    } 


    const handleDeletePopular = async () => {
        setLoadingPopular(true); 
        try {
            const res = await api.put(`/categories/popular/delete-popular/${category.slug}`);
            console.log(res?.data?.payload);
            const newCategory = res?.data?.payload;

            setCategories(prev => 
                prev.map(category => category._id === newCategory._id ? {...category, isPopular: false} : category)
            );

            toast.success(<span className='capitalize'>{category.slug.replace(/-/g, " "), 'category added to popular section'}</span>)            
        } catch (error) {
            // console.log(error?.response?.data?.message); 
            console.log(error); 
        } finally {
            setLoadingPopular(false);
        }
    } 


    return (
        <div>
            <div className='mt-5'>
                <div className=''> 
                    <div className='flex justify-between items-center'>
                        <div>
                            <h2 className="font-semibold text-xl md:text-2xl xl:text-3xl 2xl:text-[32px] capitalize">{loading ? 'Loading...' : category.slug.replace(/-/g, " ")}</h2>
                            <p className='font-semibold text-sm md:text-lg xl:text-xl 2xl:text-2xl capitalize text-black/75'>{loading ? 'Loading...' :`${products.length} Items Found.`}</p>
                        </div>

                        <div className='flex justify-center items-center flex-col gap-2 sm:flex-row'>
                            {
                                loading ? '' :
                                products.length === 0 ?
                                <button onClick={handleDeleteCategory} className="btn btn-error btn-sm sm:btn-md lg:btn-lg ">{loadingCategory ? 'Deleting...' : 'Delete'}</button>
                                :
                                category?.isPopular ? <button 
                                    onClick={handleDeletePopular}
                                    className="btn cursor-pointer py-2 rounded btn-error hover:bg-pink-600 font-semibold transition"
                                    title="Add popular"
                                >
                                        {loadingPopular ? 'Deleting...' : 'Delete Popular'}
                                </button> 
                                : 
                                <button 
                                    onClick={handleAddPopular}
                                    className="btn cursor-pointer py-2 rounded bg-[#02c5a5] hover:bg-[#04a086] text-white font-semibold transition"
                                    title="Add popular"
                                >
                                        {loadingPopular ? 'Adding...' : 'Add Popular'}
                                </button>
                            }
                            {
                                loading ? '' :
                                <AddNew category={category} refetch={fetchProducts} modalId={modalId} />
                            }

                        </div>

                    </div> 
                    {/* <AddNewProduct modalId={'modal-1'} cat={category} refetch={fetchProducts} />  */}
                </div>
                {
                    loading ? <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-4 justify-center items-center gap-5 border-t border-black/20 pt-4'>
                        {
                            Array(8).fill().map(index => <LoadingProduct key={index} />)
                        }
                        
                    </div> 
                    :
                    products.length === 0 ? <div className='min-h-[20vh] flex flex-col justify-center items-center text-[16px] text-center px-4'>
                        <h3 className='text-xl font-semibold text-black/60 mb-2'>
                            No Products Found
                        </h3> 
                        <p className='text-gray-500'>
                            There are currently no products available {category.slug}.
                        </p>
                    </div>
                    :
                    <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-4 justify-center items-center gap-5 border-t border-black/20 pt-4">
                    
                        { products.map((product, index) => {
                            const productModalId = `my_modal_${product.slug}`;
                
                            return(
                                <div key={index}>
                                {   
                                    
                                    product.discount === 0 
                                    ? 
                                    <div className="relative shadow-sm border border-transparent rounded-md hover:border hover:border-indigo-800 duration-200 bg-white">
                                        <div className='absolute top-1 left-0 w-full text-end'>
                                        </div>
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
                
                                                    <label htmlFor={productModalId} className="flex items-center gap-2 text-gray-600 hover:scale-110 duration-200 hover:cursor-pointer">
                                                        <svg className="w-5 stroke-green-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                                        </svg>
                                                        <span className=" font-semibold text-[12px] text-green-700">Edit</span>
                                                    </label>                
                                                </div>
                                                <div className='flex justify-center border-t pt-2 border-black '>
                                                    <AddHomeSection product={product} />                                                 
                                                </div>
                                            </div> 
                                        </div>
                                    </div>
                                    :
                                    <div key={index} className="bg-white p-1 shadow-sm border border-transparent rounded-md hover:border hover:border-indigo-800 duration-200">
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
                                                </div> 
                                                <div className='flex justify-center border-t pt-2 border-black '>
                                                    <AddHomeSection product={product} />                                                 
                                                </div> 
                                            </div>
                                        </div>
                                    </div>
                                }
                                    <UpdateProduct productModalId={productModalId} product={product} deleteLoading={deleteLoading} setDeleteLoading={setDeleteLoading} refetch={fetchProducts} />
                
                                </div>)                        
                        })}
                        
                    </div>
                }


            </div>
            <div className={products.length <= 8 ? 'hidden' : 'block'}>
                <Pagination
                    pagination={pagination}
                    onPageChange={(newPage) => setPage(newPage)} />
            </div>
        </div>
    );
};

export default SingleCategoryProducts;