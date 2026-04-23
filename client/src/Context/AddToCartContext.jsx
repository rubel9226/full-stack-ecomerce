import React, { createContext, useState } from 'react';
import { addLocalStorageData, getLocalStorageData } from '../Utils/LocalStorage';
import { toast } from 'react-toastify';



export const AddToCartContext = createContext();

const AddToCartProvider = ({children }) => {
    const [addToCart, setAddToCart] = useState(getLocalStorageData);
    
    
    const totalPriceAndDiscount = addToCart.reduce((acc, item) => {
        const price = item.cartQuantity * item.newPrice;
        const discount = item.cartQuantity * item.discount;

        return {
            totalPrice: acc.totalPrice + price,
            totalDiscount: acc.totalDiscount + discount
        };
    }, {totalPrice: 0, totalDiscount: 0});
    console.log(totalPriceAndDiscount)
    

    
    const handleLocalStorageData = (product, cartQuantity) => {
        const { slug } = product;
        let cart = [...addToCart];


        const exist = cart.find(item => item.slug === slug);
        // console.log();
        if(exist){
            cart = cart.map(item => {
                console.log(cartQuantity);

                return item.slug === slug
                     ? { ...item, cartQuantity: cartQuantity }
                     : item
                }
             );

        
        toast.success("Cart quantity updated successfully")
        }else{
            console.log(cartQuantity);
            cart.unshift({...product, cartQuantity});
            toast.success("Added to cart successfully")
        }
        
        addLocalStorageData(cart);
        setAddToCart(cart);
    }

    


    const data= {
        addToCart,
        setAddToCart,
        handleLocalStorageData,
        totalPriceAndDiscount
    }

    return (
        <AddToCartContext.Provider value={data}>
            {children}
        </AddToCartContext.Provider>
    );
};

export default AddToCartProvider;