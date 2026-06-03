import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router';
import ProductCard from '../../Components/Category/ProductCard/ProductCard';


// All Icons 
import { IoIosArrowBack } from "react-icons/io";
import Footer from '../../Components/Seared/Footer/Footer';
import api from '../../API/Axios/api';
import Pagination from '../CategoryPage/CategoryPagination/Pagination';
import LoadingProduct from '../../Components/Loading/LoadingProduct';


const SearchPage = () => {
    const [pagination, setPagination] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false); 
    const [searchParams] = useSearchParams();
    const keywords = searchParams.get("keywords");  
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            setLoading(true)
            const res = await api.get(`/products?search=${keywords}&limit=20&page=${page}`);
            console.log(res, 'res')
            const data = res?.data?.payload; 
            setProducts(data.products);
            setPagination(data.pagination);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };


    // API CALL
    useEffect(() => {
        if (!keywords) {
            setProducts([]);
        return;
        }
        fetchProducts();
    }, [keywords, page]);


    return (
        <div className=''>
            
            <div className='w-11/12 md:container  mx-auto mt-5'>

                <div className=' flex gap-4 justify-between select-none'>
                    <div className="dropdown dropdown-start w-full">
                        <div tabIndex={0} role="button" className="text-center py-1.75 rounded-sm w-full m-1 border border-black font-normal">Sort By: Default</div>
                        <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                            <li><a>Sort By: Default</a></li>
                            <li><a>Price: High to Low</a></li>
                            <li><a>Price Low to High</a></li>
                        </ul>
                    </div>

                    <div className="dropdown dropdown-end w-full">
                        <div tabIndex={0} role="button" className="text-center py-1.75 rounded-sm w-full m-1 border border-black font-normal">Filter By</div>
                        <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                            <li><a>Default</a></li>
                            <li><a>Low to High</a></li>
                            <li><a>High to Low</a></li>
                        </ul>
                    </div>
                </div>

                <div className=''>
                    <div className='font-semibold border-y py-3 mt-2 border-black/20'>
                        <h2 className='text-sm'>{keywords}</h2>
                        <p className='text-[12px] text-black/50'>{pagination?.totalNumberOfProducts} Items Found</p>
                    </div>

                    {
                         
                        products.length === 0 ?<div className='min-h-[40vh] flex flex-col justify-center items-center text-[16px]'>
                            <h3 className='text-xl font-semibold text-black/60 mb-2'>Sorry! Search No Result</h3>
                            <p>Please check if you have misspelt something or try searching with other words.</p>
                        </div> 
                        :
                        <div className='grid grid-cols-2 gap-y-4 gap-x-3 mt-5'>
                            {
                                loading ? Array(8).fill(0).map((_, index) => (
                                    <LoadingProduct key={index} />
                                ))
                                :products.map((product, index) => <ProductCard key={index} product={product} /> )
                            }
                        </div>
                    }

                </div>

                <div className={products.length === 0 ? 'hidden' : 'block'}>
                    <Pagination
                        pagination={pagination}
                        onPageChange={(newPage) => setPage(newPage)} />
                </div>
            </div>

            <div className='mt-5'>
                <Footer />
            </div>
        </div>
    );
};

export default SearchPage;
