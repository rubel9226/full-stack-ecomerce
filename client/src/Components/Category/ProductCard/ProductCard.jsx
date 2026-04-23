import React from 'react';
import { Link } from 'react-router';

const ProductCard = ({product}) => {

    return (
        <div className='shadow-sm border border-transparent rounded-md hover:border-indigo-800 duration-200'>{
                product?.discount !== 0 ? (
                    <Link to={`/product/${product?.slug}`} className="">
                        <div >
                            <img className='aspect-square rounded-t-md' src={product.image} alt={product.name} />
                        </div>
                        
                        <div className='text-center space-y-1 p-1'>
                            <div className='flex gap-2 mt-1 justify-center'>
                                <p className='font-bold '><span className='leading-0 font-serif'>৳</span> {product.newPrice}</p>
                                <p className='font-bold old-price'><span className='leading-0 font-serif'>৳</span> {product.price}</p>
                            </div>
                            <div>
                                <h3 className='bg-black/5 inline-block px-2 font-semibold rounded-2xl text-[12px]'>{product.name}</h3>
                            </div>
                            <div className=''>
                                <p className='line-clamp-2 font-medium text-black/60 text-[12px] font-serif'>৳ {product.description}</p>
                            </div>
        
                        </div>
                    </Link>
                ) : (
                    <Link to={`/product/${product.slug}`} className='rounded-md shadow-sm'>
                        <div>
                            <img className='w-full rounded-t-md aspect-square' src={product.image} alt={product.name} />
                        </div>
                        <div className='text-center space-y-1'>
                            <div className='flex gap-2 mt-1 justify-center'>
                                <p className='font-bold '><span className='leading-0 font-serif'>৳</span> {product.newPrice}</p>
                            </div>
                            <div>
                                <h3 className='bg-black/5 inline-block px-2 font-semibold rounded-2xl text-[12px]'>{product.name}</h3>
                            </div>
                            <div className=''>
                                <p className='line-clamp-2 font-medium text-black/60 text-[12px]'>৳ {product.description}</p>
                            </div>
                        </div>
                    </Link>
                )
            }
        </div>
    );
};

export default ProductCard;