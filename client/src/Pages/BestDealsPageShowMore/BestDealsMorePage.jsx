import React, { useContext, useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import { RiDeleteBin2Line } from 'react-icons/ri';

import {
    FaFire,
    FaBoxOpen,
    FaShoppingCart,
    FaChevronLeft,
    FaChevronRight,
    FaStar
} from "react-icons/fa";

import api from '../../API/Axios/api';
import { Link, useParams } from 'react-router';
import Pagination from '../CategoryPage/CategoryPagination/Pagination';
import Footer from '../../Components/Seared/Footer/Footer';
import { AuthContext } from '../../Context/AuthProvider';

export default function BestDealsMorePage() {

    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState({});
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    const params = useParams();
    
    const { user } = useContext(AuthContext);

    const handleGetPopularSection = async () => {
        setLoading(true);
        try {

            const res = await api.get(
                `/products/discount/${params.category}?page=${page}&limit=20`
            );

            setProducts(res?.data?.payload?.products);
            setPagination(res?.data?.payload?.pagination);

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleGetPopularSection();
    }, [params.category, page]);

    return (
        <div className=''>
            <section className="w-11/12 md:container  mx-auto mt-3 xl:!max-w-[1350px] py-5  my-5 md:rounded-2xl">

                <div className="px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10">

                    {/* Top Header */}
                    <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6'>

                        <div>

                            <div className='flex items-center gap-2'>
                                <h2 className="text-xl lg:text-3xl font-bold capitalize">
                                    {params.category.replace(/-/g, " ")}
                                </h2>

                            </div>

                            <p className='text-xs sm:text-sm font-medium text-black/50 mt-1'>
                                {pagination?.totalProducts || 0} Discount Products Found.
                            </p>

                        </div> 

                    </div>

                    {/* Products Grid */}
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5'>

                        {
                            loading ? 
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
                            : 
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
                                            hover:shadow-lg
                                            duration-300
                                            overflow-hidden
                                            group
                                        '
                                    >

                                        {/* Image */}
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

                                            {/* Discount Badge */}
                                            <div className='absolute top-2 left-2'>

                                                <span className='bg-red-500 text-white text-[10px] sm:text-xs px-2 py-1 rounded-md font-semibold shadow'>

                                                    -৳{product.discount}

                                                </span>

                                            </div>

                                            {/* Stock */}
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

                                        {/* Content */}
                                        <div className='p-3'>

                                            {/* Product Name */}
                                            <h3 className='font-semibold text-sm sm:text-base line-clamp-1 text-black/85'>

                                                {product.name}

                                            </h3> 

                                            {/* Price */}
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

                                            {/* Save */}
                                            <p className='text-[11px] text-red-500 font-medium mt-1'>

                                                Save ৳ {product.price - product.newPrice}

                                            </p>

                                            {/* Product Info */}
                                            <div className='mt-3 space-y-1 text-xs sm:text-sm text-black/60'>

                                                <div className='flex items-center gap-1'>

                                                    <FaBoxOpen className='text-indigo-500' />

                                                    <p>

                                                        Stock :
                                                        <span className='font-medium text-black/80 ml-1'>
                                                            {product.quantity}
                                                        </span>

                                                    </p>

                                                </div>

                                                <div className='flex items-center gap-1'>

                                                    <FaShoppingCart className='text-green-500' />

                                                    <p>

                                                        Sold :
                                                        <span className='font-medium text-black/80 ml-1'>
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

                    {
                        pagination.totalProducts <= 20 ? '' 
                        :
                        <div className='flex justify-center items-center gap-3 mt-8'>

                            <Pagination pagination={pagination} onPageChange={(newPage) => setPage(newPage)} />

                        </div>
                    }

                </div>

            </section>

            <div>
                <Footer />
            </div>
        </div>
    );
}