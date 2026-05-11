import React, { createContext, useState } from 'react';
import { addLocalStorageData, getLocalStorageData } from '../Utils/LocalStorage'; 
import { addSessionStorageData, getSessionStorageData, getSessionStorageId } from '../Utils/SessionStorage';



export const AddToBuyContext = createContext();

const AddToBuyProvider = ({children }) => {
    const [addToBuyData, setAddToBuyData] = useState(getSessionStorageData());
    const [totalBillWithDiscount, setTotalBillWithDiscount] = useState(0);
    const [totalBill, setTotalBill] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [productId , setProductId] = useState([getSessionStorageId])
    
    const handleSessionStorageData = (product, cartQuantity) => {       
        console.log(cartQuantity);
        
        addSessionStorageData('buyData', {...product, cartQuantity});
        setAddToBuyData(getSessionStorageData);
    }
    
    const handleSessionStorageId = (productId) => {
        
        addSessionStorageData('ProductId', productId);
        setProductId(getSessionStorageId);
    }



    const data= {
        addToBuyData, 
        handleSessionStorageData,
        handleSessionStorageId, 
        totalBillWithDiscount, setTotalBillWithDiscount, 
        totalBill, setTotalBill, 
        discount, setDiscount, 
        productId , setProductId
    }

    return (
        <AddToBuyContext.Provider value={data}>
            {children}
        </AddToBuyContext.Provider>
    );
};

export default AddToBuyProvider;