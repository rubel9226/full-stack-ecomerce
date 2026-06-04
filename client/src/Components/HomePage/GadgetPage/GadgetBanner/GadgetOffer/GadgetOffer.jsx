import React, { useEffect, useState } from 'react';
import GadgetHero from '../../GadgetHero/GadgetHero';
import api from '../../../../../API/Axios/api';

const GadgetOffer = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleGetImage = async () => {
        try {
            const res = await api.get('/images/get/bottomBanner');
            setImages(res?.data?.payload);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleGetImage();
    }, []); 

    return (
    <div>
        <div className='grid grid-cols-2 xl:grid-cols-4 gap-2 sm:gap-4 lg:gap-5 mt-2 sm:mt-4 md:mt-5'>
            {
                images.map((image, index) => {
                    return(<div key={index}>
                        <img 
                            className='rounded-xl w-full aspect-square' 
                            src={image?.image} alt="image" />  
                    </div>)
                })
            }
        </div>
    </div>
  );
};

export default GadgetOffer;