import React from 'react';
import BestDeals from '../../Components/BeastDeals/BestDeals';
import Footer from '../../Components/Seared/Footer/Footer';

const productPromise = fetch(`${import.meta.env.VITE_API_URL}/products?`).then(product => product.json())

const BestDealsPage = () => {
    console.log(productPromise);   
    return (
        <div className=" min-h-screen">

        <div className="w-11/12 md:container  mx-auto mt-10 xl:!max-w-[1350px]">
            <BestDeals productPromise={productPromise} />
        </div>
            <Footer />
        </div>
    );
};

export default BestDealsPage;
