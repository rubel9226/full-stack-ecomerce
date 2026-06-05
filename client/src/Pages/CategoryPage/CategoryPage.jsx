import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router'; 
import Footer from '../../Components/Seared/Footer/Footer';


// All Icons 
import { IoIosArrowBack } from "react-icons/io";
import Pagination from './CategoryPagination/Pagination';
import api from '../../API/Axios/api';
import LoadingProduct from '../../Components/Loading/LoadingProduct';
import { FaBoxOpen, FaShoppingCart } from 'react-icons/fa';
import { AuthContext } from '../../Context/AuthProvider';
import { toast } from 'react-toastify';
import RandomCategory from '../../Components/RandomCategory/RandomCategory';


const CategoryPage = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [sortBy, setSortBy] = useState('default');
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({})

    const params = useParams();
    
        const { user } = useContext(AuthContext);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const res = await api.get(`/products?category=${params.slug}&limit=20&page=${page}&sort=${sortBy}`);
            const data = res?.data?.payload; 
            setProducts(data.products);
            setPagination(data.pagination);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    
    useEffect(() => {
        fetchProducts();
    }, [params, page, sortBy]);



    useEffect(() => {
        
    if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
    }

    
    window.scrollTo(0, 0);
    }, []);

    
    useEffect(() => {
        window.scrollTo({
            top: 0,
        });
    }, [page]);

    const handleSort = (value) => {
        setSortBy(value);

        // close dropdown
        document.activeElement.blur();
    };

    return (
        <div className=''>

            <div className='w-11/12 md:container  mx-auto xl:!max-w-[1400px]'>
                <RandomCategory />
            </div>
            
            <div className='w-11/12 md:container  mx-auto xl:!max-w-[1400px]'>

                <section className="pb-5 w-full md:rounded-2xl">
                    <div className="">
                        <div className='md:flex flex-row-reverse justify-between'>
                            
                            <div className='flex justify-end items-center mb-4 md:mb-4'>
                                <p className='hidden md:block mr-3'>Sort By:</p>
                                <div className="dropdown dropdown-end w-full sm:w-auto">
                                    <div tabIndex={0} role="button" className=" flex items-center justify-between gap-3 min-w-[220px] bg-white border border-gray-300 hover:border-black rounded md:rounded-xl px-4 py-3 shadow-sm cursor-pointer duration-200 text-sm font-medium text-black/80 hover:bg-gray-100 duration-150 " >
                                        <span className='md:hidden'>
                                            {
                                                sortBy === 'latest'
                                                ? 'Latest: Most Recent'

                                                : sortBy === 'high'
                                                ? 'Price: High to Low'

                                                : sortBy === 'low'
                                                ? 'Price: Low to High'

                                                : sortBy === 'az'
                                                ? 'Product: A-Z'

                                                : sortBy === 'za'
                                                ? 'Product: Z-A'

                                                : 'Sort By: Default'
                                            }
                                        </span>
                                        <span className='hidden md:block'>
                                            { sortBy === 'latest' ? 'Latest: Most Recent' : sortBy === 'high' ? 'Price: High to Low' : sortBy === 'low' ? 'Price: Low to High' : sortBy === 'az' ? 'Product: A-Z' : sortBy === 'za' ? 'Product: Z-A' : 'Default'}
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
                                            <button onClick={() => handleSort('latest')} className={` w-full text-left px-4 py-3 text-sm ${sortBy === 'latest' ? 'bg-black/95 text-white hover:bg-black' : 'text-black/80 hover:bg-gray-100 duration-150'} `} >
                                                Latest: Most Recent
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

                            <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6'>
                                        <div>

                                            <div className='flex items-center gap-2'>
                                                <h2 className="text-xl lg:text-3xl font-bold capitalize">
                                                    {params?.slug.replace(/-/g, " ")}
                                                </h2>
                                            </div>
                                            <p className='text-xs sm:text-sm font-medium text-black/50 mt-1'>
                                                {pagination?.totalNumberOfProducts || 0} Discount Products Found.
                                            </p>
                                        </div> 
                            </div>
                        </div>
                        {   
                            
                            loading ? 
                                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5'>
                                {
                                    [...Array(10)].map((_, index) => ( 
                                        <div
                                            key={index}
                                            className='
                                                animate-pulse
                                                bg-white
                                                rounded-xl
                                                border
                                                border-gray-200
                                                overflow-hidden
                                            '
                                        >  
                                            <div className='w-full aspect-square bg-gray-200'></div>
                                            <div className='p-3'> 
                                                <div className='h-4 bg-gray-200 rounded w-[80%]'></div> 
                                                <div className='flex items-center gap-2 mt-3'>
                                                    <div className='h-4 w-16 bg-gray-200 rounded'></div>
                                                    <div className='h-3 w-12 bg-gray-100 rounded'></div>
                                                </div> 
                                                <div className='h-3 w-20 bg-gray-100 rounded mt-3'></div> 
                                                <div className='space-y-2 mt-4'>
                                                    <div className='h-3 w-24 bg-gray-100 rounded'></div>
                                                    <div className='h-3 w-20 bg-gray-100 rounded'></div>
                                                </div>
                                            </div>
                                        </div>
                                    )) 
                                }
                                </div>
                            : 
                            products.length === 0 
                            ?<div className='min-h-[40vh] flex flex-col justify-center items-center text-[16px] text-center px-4'>
                                <h3 className='text-xl font-semibold text-black/60 mb-2'>
                                    No Products Available
                                </h3>

                                <p className='text-gray-500'>
                                    There are currently no products in this category.
                                </p>
                            </div>
                            : 
                            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5'>
                                {
                                    products.map((product, index) => {
                                        return (
                                            <Link to={ user ? `/dashboard/product/${product?.slug}` : `/product/${product?.slug}`}
                                                key={index}
                                                className='
                                                    group
                                                    bg-white
                                                    rounded-xl
                                                    border
                                                    border-gray-200
                                                    hover:border-indigo-400
                                                    hover:bg-indigo-500/5
                                                    hover:shadow-lg
                                                    duration-300
                                                    overflow-hidden
                                                '
                                            > 
                                                <div className='relative bg-gray-100 overflow-hidden'>
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        className='
                                                            w-full
                                                            aspect-square
                                                            object-cover
                                                            group-hover:scale-105
                                                            duration-300
                                                        '
                                                    /> 
                                                    <div className='absolute top-2 left-2'>
                                                        {
                                                            product?.discount 
                                                            ? 
                                                            <span className='bg-red-500 text-white text-[10px] sm:text-xs px-2 py-1 rounded-md font-semibold shadow'>
                                                                -৳{product.discount} 
                                                            </span>
                                                            : ''
                                                        }
                                                        
                                                    </div>
                                                    <div className='absolute top-2 right-2'>
                                                        {
                                                            product.quantity > 0 ? (
                                                                <span className='bg-green-500 text-white text-[10px] px-2 py-1 rounded-md font-medium'>
                                                                    In Stock
                                                                </span>
                                                            ) : (
                                                                <span className='bg-red-500 text-white text-[10px] px-2 py-1 rounded-md font-medium'>
                                                                    Out of stock
                                                                </span>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                                <div className='p-3'>
                                                    <h3 className='font-semibold text-sm sm:text-base line-clamp-1 text-black/85 capitalize'>
                                                        {product.name}
                                                    </h3> 
                                                    <div className='flex items-center gap-2 mt-2'>
                                                        <p className='font-bold text-indigo-700 text-sm sm:text-base'>
                                                            ৳ {product.newPrice}
                                                        </p>
                                                        {
                                                            product.discount > 0 &&
                                                            <p className='text-xs sm:text-sm text-gray-400 line-through'>
                                                                ৳ {product.price}
                                                            </p>
                                                        }
                                                    </div> 

                                                    <div className='mt-3 space-y-1 text-xs sm:text-sm text-black/60'>
                                                        <div className='flex items-center gap-1'>
                                                            <FaBoxOpen className='text-indigo-500' />
                                                            <p>
                                                                Stock :
                                                                <span className='font-medium text-black/80 hover:bg-gray-100 duration-150 ml-1'>
                                                                    {product.quantity}
                                                                </span>
                                                            </p>
                                                        </div>
                                                        <div className='flex items-center gap-1'>
                                                            <FaShoppingCart className='text-green-500' />
                                                            <p>
                                                                Sold :
                                                                <span className='font-medium text-black/80 hover:bg-gray-100 duration-150 ml-1'>
                                                                    {product.sold}
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </div> 
                                                </div>
                                            </Link>
                                        );
                                    })
                                }
                            </div>
                        }
                        {
                            pagination.totalNumberOfProducts <= 20 ? '' 
                            :
                            <div className='flex justify-center items-center gap-3 mt-8'>
                                <Pagination pagination={pagination} onPageChange={(newPage) => setPage(newPage)} />
                            </div>
                        }
                    </div>
                </section>
            </div>

            <div className='mt-5'>
                <Footer />
            </div>
        </div>
    );
};

export default CategoryPage;
