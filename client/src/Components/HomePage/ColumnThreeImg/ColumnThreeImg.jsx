import React, { useEffect, useState } from 'react';
import api from '../../../API/Axios/api';

const ColumnThreeImg = () => {
    const [images, setImages] = useState([]);

    
    const handleGetImage = async () => {
        try {
            const res = await api.get('/images/get/slideBottom');
            setImages(res?.data?.payload);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        handleGetImage();
    }, []);

    return (
        <div className='space-y-3 xl:space-y-4.5 2xl:space-y-5 md:w-4/6'>
            {
                images.map((image, index) => {
                    return (
                        <div>
                            <img 
                                className='rounded-md md:rounded-xl aspect-[3.886010362694301]' 
                                src={image?.image} 
                                alt="" 
                            />
                        </div>
                    )
                })
            }
        </div>
    );
};

export default ColumnThreeImg;