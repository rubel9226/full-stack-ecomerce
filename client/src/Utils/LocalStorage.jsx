import React from 'react';

const getLocalStorageData = () => {
    const allData = localStorage.getItem('cartData');
    if(allData) return JSON.parse(allData);

    return [];
}

const addLocalStorageData = (data) => {
    // const allData = getLocalStorageData();
    // allData.push(data);
    localStorage.setItem('cartData', JSON.stringify(data));
}


export {getLocalStorageData, addLocalStorageData};