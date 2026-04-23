import React from 'react';
import BestDeals from '../../Components/BeastDeals/BestDeals';
import Footer from '../../Components/Seared/Footer/Footer';

const productPromise = fetch(`${import.meta.env.VITE_API_URL}/products?`).then(product => product.json())
// http://localhost:3001/api/products?limit=20

const BestDealsPage = () => {

    return (
        <div className=" min-h-screen">

        <div className="w-11/12 md:container mb-10 mx-auto mt-3">
            <BestDeals productPromise={productPromise} />
        </div>
            <Footer />
        </div>
    );
};

export default BestDealsPage;
