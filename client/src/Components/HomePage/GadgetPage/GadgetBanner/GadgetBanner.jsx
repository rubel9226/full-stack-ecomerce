import React, { useContext, useEffect, useState } from 'react';
import UnlimitedOffer from './UnlimitedOffer/UnlimitedOffer';
import { AuthContext } from '../../../../Context/AuthProvider';
import api from '../../../../API/Axios/api';
import { Link } from 'react-router';

const GadgetBanner = () => {
    const [categories, setCategories] = useState([]);
    const { user } = useContext(AuthContext);
    


    const handleGetCategories = async () => {
        try {
            const res = await api.get('/categories/popular/get-popular?section=unlimitedTop');
            setCategories(res?.data?.payload);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleGetCategories();
    }, []);

    console.log(categories, 'unlimited top')
    return (
        <div>
            <div className='grid grid-cols-2 gap-2.5 sm:gap-4 sm:grid-cols-4'>
                {
                    categories.map((category, index) => (
                        <Link to={user ? `/dashboard/catalog/${category.slug}` : `/catalog/${category.slug}`} key={index}>
                            <img 
                                className='rounded-xl aspect-square' 
                                src={category?.image} alt="" /> 
                        </Link>
                    ))
                }
            </div>
            <div className='py-2'>
                <UnlimitedOffer />
            </div>

        </div>
    );
};

export default GadgetBanner;