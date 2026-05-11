import React from 'react';

const getLocalStorageData = (name) => {
    const allData = localStorage.getItem(name);
    if(allData) return JSON.parse(allData);

    return [];
}

const addLocalStorageData = (name, data) => {
    // const allData = getLocalStorageData();
    // allData.push(data);
    localStorage.setItem(name, JSON.stringify(data));
}


export {getLocalStorageData, addLocalStorageData};