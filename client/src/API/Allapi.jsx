import React from 'react';
import api from './Axios/api';

export const getSingleCategory = async (cat) => {
    try {
        const category = await api.get(`/categories/${cat}`);
        return category.data.payload;
    } catch (error) {
        console.log(error);
    }
};

export const createNewProduct = async (data) => {
    try {
        const newProduct = await api.post('/products', data, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        return newProduct.data.payload;   
    } catch (error) {
        console.log(error);
        return error?.response?.data?.message
    }
}