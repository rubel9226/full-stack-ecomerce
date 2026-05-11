import React from 'react';
// import BestDeals from '../../Components/BeastDeals/BestDeals';
// import Footer from '../../Components/Seared/Footer/Footer';
import ProductsAdmin from '../../../Components/AdminPage/ProductsAdmin/ProductsAdmin';
import Footer from '../../../Components/AdminPage/Seared/Footer/Footer';



const ProductsPageAdmin = () => {

    return (
        <div className=" min-h-screen">

            <div className="w-11/12 md:container mb-10 mx-auto mt-3">
                <ProductsAdmin />
            </div>
            <Footer />
        </div>
    );
};

export default ProductsPageAdmin;
