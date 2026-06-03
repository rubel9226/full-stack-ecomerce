import React, { use, useContext } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../../Context/AuthProvider';
import { BsArrowRight } from 'react-icons/bs';

const BestDeals = ({ productPromise }) => {

    const data = use(productPromise);
    const products = data.payload.products;

    const groupedProducts = products
        .filter((product) => product.discount > 0)
        .reduce((acc, product) => {

            const category = product?.category?.slug || 'vivo';

            if (!acc[category]) {
                acc[category] = [];
            }

            acc[category].push(product);

            return acc;

        }, {});

    const { user } = useContext(AuthContext);

    return (
        <div>

            {
                Object.keys(groupedProducts).map((cat) => (

                    <div className='mt-10' key={cat}>

                        {/* Heading */}
                        <div className='mb-4 flex justify-between items-end'>

                            <div>

                                <h2 className="text-xl lg:text-2xl font-bold capitalize">
                                    {cat.replace(/-/g, " ")}
                                </h2>

                                <p className='text-xs sm:text-xs md:text-sm font-medium text-black/50'>
                                    {groupedProducts[cat].length} Items Found.
                                </p>

                            </div>

                            <div className='text-blue-800/90'>
                                <Link to={cat} className='text-sm font-semibold md:text-base xl:text-xl flex items-center gap-0.5 md:gap-1 cursor-pointer'> 
                                    See More 
                                    <BsArrowRight className='text-lg md:text-xl xl:text-3xl' /> 
                                </Link>
                            </div> 

                        </div>

                        {/* Products */}
                        <div className="flex gap-3 lg:gap-4 overflow-x-auto no-scrollbar p-1">

                            {
                                groupedProducts[cat].map((product, index) => {

                                    return (

                                        <Link
                                            to={
                                                user
                                                    ? `/dashboard/product/${product?.slug}`
                                                    : `/product/${product?.slug}`
                                            }

                                            key={index}

                                            className="
                                                group
                                                relative
                                                flex
                                                shrink-0
                                                p-2 lg:p-3
                                                shadow-sm
                                                border
                                                border-black/10
                                                rounded-xl
                                                hover:border-indigo-700
                                                hover:shadow-md
                                                duration-300
                                                bg-white
                                                gap-2 lg:gap-3
                                                overflow-hidden
                                            "
                                        >

                                            {/* Discount Badge */}
                                            <div className='absolute top-2 left-2 z-10 bg-red-500 text-white text-[9px] sm:text-xs md:text-sm px-1.5 py-0.5 rounded-md font-bold'>

                                                -৳{product.discount}

                                            </div>

                                            {/* Product Image */}
                                            <div className='overflow-hidden rounded-lg shrink-0 flex justify-center items-center'>

                                                <img
                                                    className='
                                                        aspect-square
                                                        h-24 lg:h-32
                                                        w-24 lg:w-32
                                                        object-cover
                                                        rounded-lg
                                                        group-hover:scale-105
                                                        duration-300
                                                    '
                                                    src={product?.image}
                                                    alt={product?.name}
                                                />

                                            </div>

                                            {/* Product Content */}
                                            <div className='flex flex-col justify-between py-1'>

                                                <div>

                                                    {/* Name */}
                                                    <h3 className='text-xs md:text-lg font-bold line-clamp-2 mt-1'>

                                                        {product.name}

                                                    </h3>

                                                    {/* Description */}
                                                    <p className='w-28 lg:w-44 text-xs sm:text-sm md:text-base line-clamp-2 text-black/60 mt-1'>

                                                        {product.description}

                                                    </p>

                                                </div>

                                                <div>

                                                    {/* Price */}
                                                    <div className='flex items-center gap-2 mt-2'>

                                                        <p className='font-bold text-sm lg:text-xl text-indigo-700'>

                                                            <span className='font-serif'>৳</span>
                                                            {product.newPrice}

                                                        </p>

                                                        <p className='old-price text-xs sm:text-sm md:text-base text-black/40 font-semibold'>

                                                            <span className='font-serif'>৳</span>
                                                            {product.price}

                                                        </p>

                                                    </div>

                                                    {/* Save Amount */}
                                                    <p className='text-[11px] sm:text-xs md:text-sm text-red-500 font-semibold mt-1'>

                                                        Save ৳ {product.price - product.newPrice}

                                                    </p>

                                                    {/* Sold */}
                                                    <div className='flex items-center gap-2 mt-1 flex-wrap'>

                                                        <p className='text-[11px] sm:text-xs md:text-sm text-black/50 font-medium'>

                                                            {product.sold || 0}+ sold

                                                        </p>

                                                    </div>

                                                    {/* Stock Status */}
                                                    <div className='mt-1'>

                                                        {
                                                            product.quantity > 0 ? (

                                                                <p className='text-green-600 text-[11px] sm:text-xs md:text-sm font-semibold'>

                                                                    In Stock

                                                                </p>

                                                            ) : (

                                                                <p className='text-red-500 text-[11px] sm:text-xs md:text-sm font-semibold'>

                                                                    Out Of Stock

                                                                </p>

                                                            )
                                                        }

                                                    </div>

                                                </div>

                                            </div>

                                        </Link>

                                    );
                                })
                            }

                        </div>

                    </div>
                ))
            }

        </div>
    );
};

export default BestDeals;