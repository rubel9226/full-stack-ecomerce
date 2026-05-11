import React from 'react';

const getSessionStorageData = () => {
    const allData = sessionStorage.getItem('buyData');
    if(allData) return JSON.parse(allData);

    return [];
} 


const getSessionStorageId = () => {
    const allData = sessionStorage.getItem('ProductId');
    if(allData) return JSON.parse(allData);

    return [];
} 


const addSessionStorageData = (name, data) => {
    sessionStorage.setItem(name, JSON.stringify(data));
}


export { getSessionStorageData, addSessionStorageData, getSessionStorageId };