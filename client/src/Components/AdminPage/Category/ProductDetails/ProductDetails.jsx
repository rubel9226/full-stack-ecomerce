// import React, { useContext, useEffect, useState } from 'react';
// import { useParams } from 'react-router';
// import Footer from '../../Seared/Footer/Footer';

// // all icons
// import { FaPlus } from "react-icons/fa";
// import { FaMinus } from "react-icons/fa";

// import { AddToCartContext } from '../../../Context/AddToCartContext';


// const ProductDetails = () => {
//     const [product, setProduct] = useState();
//     const { productSlug } = useParams();


//     // add to cart data
//     const { addToCart, setAddToCart, handleLocalStorageData, cartQuantity, setQuantity, handleQuantity} = useContext(AddToCartContext)
//     // console.log(setAddToCart)

    
//     const  url = `${import.meta.env.VITE_API_URL}/products/${productSlug}`;
//     useEffect(() => {
//         fetch(url)
//             .then(res => res.json())
//             .then(data => setProduct(data?.payload))
//             .catch(err => console.log(err))
//     }, [url]);


//     const handleSetAddToCart = () => {
//         // const newProduct = {...product, quantity};
//         // console.log(newProduct);
//         handleLocalStorageData(product);
        
//     }
//     console.log(addToCart)

//     // console.log(product);
//     // console.log(product)

//     return (
//         <div className='w-11/12 md:container  mx-auto mt-5'>
//             <div>
//                 <div className='p-5 border rounded-xl'>
//                     <img className='w-full aspect-square' src={product?.image} alt="" />
//                 </div>

//                 <div className='py-5'>
//                     <div className='flex items-center gap-2'>
//                         <span className='h-12 w-2 bg-green-500 inline-block'></span>
//                         <p className='text-3xl font-bold'><span className='font-serif'>৳ </span>{product?.price}</p>
//                     </div>

//                     <div className='space-y-2 mt-2'>
//                         <div className='flex items-center gap-2'>
//                             <p className='capitalize'>Category: {product?.category?.name}</p>
//                         </div>
//                         <div>
//                             <p>In Stock: <span>{product?.quantity}</span> </p>
//                         </div>

//                     </div>



//                     <div className='flex items-center gap-3 mt-3'>
//                         <h3 className='text-[18px] font-medium'>Quantity: </h3>
//                         <div className='select-none px-4 py-1.5 rounded-full border-2 flex items-center gap-7 text-[#1F5DA0]'>
//                             <FaMinus className={`cursor-pointer ${cartQuantity === 1 ? 'text-black/30' : '' }`} onClick={() => handleQuantity(product, '-')} />
//                             <span className='font-bold text-[18px]'>{cartQuantity}</span>
//                             <FaPlus className={`cursor-pointer ${cartQuantity === product?.quantity ? 'text-black/50' : '' }`} onClick={() => handleQuantity(product, '+')} />
//                         </div>
//                     </div>

//                     <div className='flex w-full bg-green-50 gap-2 mt-2 mt-5'>
//                         <button onClick={() => handleSetAddToCart()} className="btn bg-[#7F7F7F] font-bold text-[16px] text-white flex-1 ">ADD TO CART</button>
//                         <button className='btn bg-[#1F5DA0] font-bold text-[16px] text-white flex-1 '>BUY NOW</button>
//                     </div>

//                     <div className='mt-5 shadow-sm rounded-md'>
//                         <p className='p-2'>Description: {product?.description}</p>
//                     </div>

//                 </div>
//             </div>


//             <div>
//                 <Footer />
//             </div>
//         </div>
//     );
// };

// export default ProductDetails;