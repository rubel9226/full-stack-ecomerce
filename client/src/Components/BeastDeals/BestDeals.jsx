import React, { use } from 'react';
import { Link } from 'react-router';

const BestDeals = ({productPromise}) => {
    const data = use(productPromise);
    const products = data.payload.products; 
    console.log(data);

    const groupedProducts = products

        .filter((product) => product.discount> 0)
        .reduce((acc, product) => {
            const category = product.category.slug;

            if (!acc[category]) {
                acc[category] = [];
            }

            acc[category].push(product);

            return acc;
        }, {});


    return (
        <div className=''>
            {Object.keys(groupedProducts).map((cat) => (
                <div className='mt-10' key={cat}>
                    <div>
                        <h2 className="text-xl font-semibold capitalize">{cat.replace(/-/g, " ")}</h2>
                        <p className='text-[12px] font-medium text-black/50'>{groupedProducts[cat].length} Items Found.</p>
                    </div>
                    <div className="flex gap-3  overflow-x-auto no-scrollbar p-1">
                        {groupedProducts[cat].map((product, index) => {
                            return(<Link to={`/product/${product?.slug}`} key={index} className=" flex shrink-0 p-1 shadow-sm h-35 border border-transparent rounded-md hover:border hover:border-indigo-800 duration-200">
                                    <div >
                                        <img className='aspect-square h-full' src={product.image} alt={product.name} />
                                    </div>
                                    
                                    <div>
                                        <div className='flex gap-2 mt-1 justify-center'>
                                            <p className='font-bold '><span className='leading-0 font-serif'>৳</span> {product.newPrice}</p>
                                            <p className='font-bold old-price'><span className='leading-0 font-serif'>৳</span> {product.price}</p>
                                        </div>
                                        <h3>{product.name}</h3>
                                        <p className='w-25 line-clamp-1'>৳ {product.description}</p>
                                    </div>
                                </Link>
                                
                            )
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BestDeals;




