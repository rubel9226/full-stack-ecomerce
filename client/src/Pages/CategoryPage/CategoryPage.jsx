import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ProductCard from '../../Components/Category/ProductCard/ProductCard';
import Footer from '../../Components/Seared/Footer/Footer';


// All Icons 
import { IoIosArrowBack } from "react-icons/io";
import Pagination from './CategoryPagination/Pagination';


const CategoryPage = () => {
    const [productsData, setProductsData] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [page, setPage] = useState(1);


    const params = useParams();

    const url = `${import.meta.env.VITE_API_URL}/products?category=${params.slug}&limit=20&page=${page}`;
    useEffect(() => {
        fetch(url)
        .then(res => res.json())
        .then(data => setProductsData(data))
        .catch(err => console.log(err));
    }, [url]);


    useEffect(() => {
    // browser scroll restore বন্ধ করো
    if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
    }

    // force scroll top
    window.scrollTo(0, 0);
    }, []);

    // data load then go top
    useEffect(() => {
        window.scrollTo({
            top: 0,
            // behavior: "smooth",
        });
    }, [page]);

    const products = productsData?.payload?.products || [];
    console.log(productsData?.payload?.pagination)
    const pagination = productsData?.payload?.pagination;
    return (
        <div className=''>
            
            <div className='w-11/12 md:container  mx-auto mt-20'>

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
                        <h2 className='text-sm'>Clothing And Fashion</h2>
                        <p className='text-[12px] text-black/50'>{pagination?.totalNumberOfProducts} Items Found</p>
                    </div>

                    <div className='grid grid-cols-2 gap-y-4 gap-x-3 mt-5'>
                        {
                            products.map((product, index) => <ProductCard key={index} product={product} /> )
                        }
                    </div>
                </div>

                <div className=''>
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

export default CategoryPage;
