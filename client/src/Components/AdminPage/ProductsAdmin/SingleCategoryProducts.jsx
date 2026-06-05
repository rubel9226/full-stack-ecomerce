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
import AddHomeCategory from './AddHomeCategory';
import { Link } from 'react-router';

const SingleCategoryProducts = ({category, setCategories}) => {
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState({});
    const [loading, setLoading] = useState(true);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [loadingCategory, setLoadingCategory] = useState(false);
    const [page, setPage] = useState(1);
    
    const [sortBy, setSortBy] = useState('latest');


    const modalId = `my_modal_${category.slug}`;

    const fetchProducts = async () => {
        setLoading(true); 
        try {
            const res = await api.get(`/products?category=${category.slug}&limit=8&page=${page}&sort=${sortBy}`);
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
    }, [page, category._id, sortBy]);

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
    };


    const handleSort = (value) => {
        setSortBy(value);
        document.activeElement.blur();
    };


    return (
        <div>
            <div className='mt-5 sm:mt-8 md:mt-10'>
                <div className=''> 
                    <div className='flex  sm:mb-2 md:mb-4  justify-between items-center'>
                        <div className='flex flex-col sm:flex-row gap-2 sm:gap-0 sm:justify-between flex-1 sm:items-center'>
                            <div>
                                <h2 className="font-semibold text-lg md:text-xl xl:text-2xl 2xl:text-[28px] capitalize">{loading ? 'Loading...' : category.name.replace(/-/g, " ")}</h2>
                                <p className='font-semibold text-xs md:text-base xl:text-lg 2xl:text-xl capitalize text-black/40'>{loading ? 'Loading...' :`${products.length} Items Found.`}</p>
                            </div>

                            <div className='flex justify-end items-center mb-4 sm:mb-0 w-50'>
                                <div className="dropdown dropdown-end w-50 sm:w-auto">
                                    <div tabIndex={0} role="button" className="flex items-center justify-between gap-3 w-45 sm:min-w-55 bg-white border border-gray-100 hover:border-black rounded md:rounded-xl sm:px-4 sm:py-3 px-3 py-2.5 text-xs shadow-sm cursor-pointer duration-200 sm:text-sm font-medium text-black/80 hover:bg-gray-100" >

                                        <span className=' '>
                                            { sortBy === 'oldest' ? 'Oldest: Most Old' : sortBy === 'high' ? 'Price: High to Low' : sortBy === 'low' ? 'Price: Low to High' : sortBy === 'az' ? 'Product: A-Z' : sortBy === 'za' ? 'Product: Z-A' : 'Default'}
                                        </span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                    <ul tabIndex={0} className=" dropdown-content z-[20] mt-2 w-full sm:w-64 bg-white border border-gray-200 rounded-lg md:rounded-2xl shadow-xl overflow-hidden " >
                                        <li>
                                            <button onClick={() => handleSort('default')} className={` w-full text-left px-4 py-3 text-sm ${sortBy === 'default' ? 'bg-black/95 text-white hover:bg-black' : 'text-black/80 hover:bg-gray-100 duration-150'} `} >
                                                Sort By: Default
                                            </button>
                                        </li>
                                        <li>
                                            <button onClick={() => handleSort('oldest')} className={` w-full text-left px-4 py-3 text-sm ${sortBy === 'oldest' ? 'bg-black/95 text-white hover:bg-black' : 'text-black/80 hover:bg-gray-100 duration-150'} `} >
                                                Oldest: Most Old
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() => handleSort('high')}
                                                className={` w-full text-left px-4 py-3 text-sm ${sortBy === 'high' ? 'bg-black/95 text-white hover:bg-black' : 'text-black/80 hover:bg-gray-100 duration-150'} `} >
                                                Price: High to Low
                                            </button>
                                        </li>
                                        <li>
                                            <button onClick={() => handleSort('low')} className={` w-full text-left px-4 py-3 text-sm ${sortBy === 'low' ? 'bg-black/95 text-white hover:bg-black' : 'text-black/80 hover:bg-gray-100 duration-150'} `} >
                                                Price: Low to High
                                            </button>
                                        </li>
                                        <li>
                                            <button onClick={() => handleSort('az')} className={` w-full text-left px-4 py-3 text-sm ${sortBy === 'az' ? 'bg-black/95 text-white hover:bg-black' : 'text-black/80 hover:bg-gray-100 duration-150'} `}>
                                                Product: A-Z
                                            </button>
                                        </li>
                                        <li>
                                            <button onClick={() => handleSort('za')} className={` w-full text-left px-4 py-3 text-sm ${sortBy === 'za' ? 'bg-black/95 text-white hover:bg-black' : 'text-black/80 hover:bg-gray-100 duration-150'}`}>
                                                Product: Z-A
                                            </button>
                                        </li>
                                    </ul>
                                </div> 
                            </div>

                            <div>

                            </div>
                        </div>
                        

                        <div className='flex justify-center items-center flex-col gap-2 sm:flex-row'>
                            {
                                loading ? '' :
                                products.length === 0 ?
                                <button onClick={handleDeleteCategory} className="btn btn-error btn-sm sm:btn-md lg:btn-lg ">{loadingCategory ? 'Deleting...' : 'Delete'}</button>
                                :
                                <AddHomeCategory category={category} setCategories={setCategories} />
                            }
                            {
                                // loading ? '' :
                                // <AddNew category={category} refetch={fetchProducts} modalId={modalId} />
                                loading ? '' :
                                <Link to={`/admin/products/add?category=${category.slug}`} className="btn bg-purple-500 hover:bg-purple-600 text-white btn-sm sm:btn-md lg:btn-lg">Create product</Link>
                            }

                        </div>

                    </div> 
                </div>
                {
                    loading ? <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-4 justify-center items-center gap-5 border-t border-black/20 pt-4'>
                        {
                            Array(8).fill().map((_, index) => <LoadingProduct key={index} />)
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
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5 border-t border-black/10 pt-4">

                        {
                            products.map((product, index) => {

                                const productModalId = `my_modal_${product.slug}`;

                                return (
                                    <div key={index}>

                                        <div className=" bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-indigo-400 hover:shadow-md duration-200 ">

                                            
                                            <div className='relative overflow-hidden bg-gray-50'>
                                                {
                                                    product?.discount > 0 && (
                                                        <span className='absolute top-2 left-2 z-10 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full'>
                                                            -{product.discount}%
                                                        </span>
                                                    )
                                                }
                                                <img
                                                    className='w-full aspect-square object-cover hover:scale-[1.02] duration-300'
                                                    src={product.image}
                                                    alt={product.name}
                                                />
                                            </div>


                                            <div className='p-2.5 sm:p-3'>


                                                <div className='flex items-center justify-center gap-2 mb-1 flex-wrap'>
                                                    <p className='text-sm sm:text-base font-bold text-indigo-700'>
                                                        <span className='font-serif'>৳</span>
                                                        {' '}
                                                        {product?.newPrice}
                                                    </p>
                                                    {
                                                        product?.discount > 0 && (
                                                            <p className='text-xs text-gray-400 line-through'>
                                                                ৳ {product?.price}
                                                            </p>
                                                        )
                                                    }
                                                </div>


                                                <h3 className='font-medium text-sm sm:text-base line-clamp-1 text-center capitalize'>
                                                    {product?.name}
                                                </h3>

                                                {/* description */}
                                                <p className='text-xs text-black/50 mt-1 line-clamp-1 text-center'>
                                                    {product?.description}
                                                </p>

                                                {/* actions */}
                                                <div className='flex items-center justify-between mt-2 py-1 border-t border-gray-200'>

                                                    <DeleteProduct
                                                        product={product}
                                                        deleteLoading={deleteLoading}
                                                        setDeleteLoading={setDeleteLoading}
                                                        refetch={fetchProducts}
                                                    />

                                                    <Link to={`/admin/products/update?product=${product.slug}`} 
                                                        className='flex items-center gap-1 text-green-700 hover:scale-105 duration-200 cursor-pointer'
                                                    >
                                                        <svg className="w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" >
                                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                                        </svg>

                                                        <span className='text-xs font-semibold'>
                                                            Edit
                                                        </span>
                                                    </Link>
                                                </div>

                                                {/* home section */}
                                                <div className='mt-1 py-2 border-t border-gray-100 flex justify-center'>
                                                    <AddHomeSection product={product} />
                                                </div>
                                            </div>
                                        </div>

                                        <UpdateProduct
                                            productModalId={productModalId}
                                            product={product}
                                            deleteLoading={deleteLoading}
                                            setDeleteLoading={setDeleteLoading}
                                            refetch={fetchProducts}
                                        />
                                    </div>
                                );
                            })
                        }

                    </div>
                } 
            </div> 

            <div className={loading || pagination.totalNumberOfProducts <= 8 ? 'hidden' : 'block'}>
                <Pagination
                    pagination={pagination}
                    onPageChange={(newPage) => setPage(newPage)} />
            </div>
        </div>
    );
};

export default SingleCategoryProducts;