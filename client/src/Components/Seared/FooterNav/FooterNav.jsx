import React, { use, useContext, useEffect, useRef, useState } from 'react';
import { IoHomeSharp } from "react-icons/io5";
import { BsFillGridFill } from "react-icons/bs";
import { IoCartSharp } from "react-icons/io5";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa6";
import { Link, NavLink } from 'react-router';

import './FooterNav.css';
import { AddToCartContext } from '../../../Context/AddToCartContext';



const FooterNav = ({categoryPromise}) => {
    const drawerRef = useRef();

    const { addToCart } = useContext(AddToCartContext);
    // console.log(addToCart.length);

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/categories/')
        .then(res => res.json())
        .then(data => setCategories(data.payload))
        .catch(err => console.log(err));
    }, []);
    

    return (
        <div className='fixed w-full left-0 shadow-2xl border-t-2 border-gray-100 bottom-0 lg:hidden z-10000000'>
            <div className='bg-white shadow py-2'>
                <div className='w-11/12 sm:w-8/12 mx-auto flex justify-between select-none'>

                    <NavLink to='/' 
                        className={`hover:text-[#1F5DA0] flex flex-col items-center gap-0.5 transition-all duration-100 ease-in-out  text-[#ABABAB] font-semibold  
                            ${({isActive }) => isActive ? 'active': ''}`
                    }>
                        <IoHomeSharp className='w-6 h-6' />
                        <p className='text-[12px]'>Home</p>
                    </NavLink>

                    {/* category section. */}
                    <div>
                        <div className="drawer">
                            <input id="my-drawer-1" type="checkbox" className="drawer-toggle" ref={drawerRef} />
                            <div className="drawer-content">
                                {/* Page content here */}
                                <label htmlFor="my-drawer-1" className={ `hover:text-[#1F5DA0] flex flex-col items-center gap-0.5 transition-all duration-100 ease-in-out  text-[#ABABAB]  drawer-button cursor-pointer`}>
                                    <BsFillGridFill className='w-6 h-6' />
                                    <p className='font-semibold text-[12px]'>Category</p>
                                </label>

                            </div>

                            <div className="drawer-side">
                                <label htmlFor="my-drawer-1" aria-label="close sidebar" className="drawer-overlay"></label>
                                <ul className="menu bg-base-200 min-h-full w-80 p-0">
                                    {/* Sidebar content here */}
                                    <h2 className='text-xl bg-[#1F5DA0] text-white font-semibold px-4 py-3 leading-8'>All Categories</h2>
                                    {
                                        categories.map((category, index) => <Link 
                                                key={index}  
                                                to={`catalog/${category.slug}`} 
                                                className='pl-6 py-2 text-[16px] capitalize text-black'
                                                onClick={() => drawerRef.current ? drawerRef.current.checked = false : ''}>{category.name}</Link>)
                                    }
                                    {/* <Link to={`catalog/i-phone`}>I Phone.</Link> */}
                                </ul>
                            </div>
                            
                        </div>


                        
                    </div>

                    <NavLink 
                        to='best-deals'
                        className={ `hover:text-[#1F5DA0] flex flex-col items-center gap-0.5 transition-all duration-100 ease-in-out  text-[#ABABAB]  
                            ${({isActive}) => isActive ? 'active': ''}`
                    }>
                        {/* <svg className='w-5.5 h-5.5' width='22' viewBox='0 0 22 22' fill={`${bestDealsColor && '#0000FF'}`} xmlns='http://www.w3.org/2000/svg'>
                            <path fillRule='evenodd' clipRule='evenodd' d='M20.2391 7.85992L21.0314 8.65192C21.6586 9.26792 21.9997 10.1039 21.9997 10.9839C22.0107 11.8639 21.6696 12.701 21.0534 13.3269C21.0461 13.335 21.0387 13.3421 21.0314 13.3492C21.0277 13.3527 21.0241 13.3562 21.0204 13.3599L20.2391 14.1409C19.931 14.4489 19.7549 14.8669 19.7549 15.308V16.4399C19.7549 18.2659 18.2694 19.752 16.4427 19.752H15.3093C14.8692 19.752 14.451 19.9269 14.1429 20.2349L13.3506 21.0269C12.7014 21.677 11.8541 21.9949 11.0068 21.9949C10.1595 21.9949 9.31214 21.677 8.66291 21.039L7.85962 20.2349C7.55151 19.9269 7.13335 19.752 6.69319 19.752H5.55978C3.73312 19.752 2.24758 18.2659 2.24758 16.4399V15.308C2.24758 14.8669 2.07152 14.4489 1.76341 14.1299L0.97112 13.3489C-0.316347 12.063 -0.327351 9.96091 0.960116 8.66401L1.76341 7.85992C2.07152 7.55192 2.24758 7.13392 2.24758 6.68292V5.56092C2.24758 3.73492 3.73312 2.25102 5.55978 2.25102H6.69319C7.13335 2.25102 7.55151 2.07392 7.85962 1.76592L8.65191 0.973916C9.93937 -0.322984 12.0411 -0.322984 13.3396 0.964016L14.1429 1.76592C14.451 2.07392 14.8692 2.25102 15.3093 2.25102H16.4427C18.2694 2.25102 19.7549 3.73492 19.7549 5.56092V6.69502C19.7549 7.13392 19.931 7.55192 20.2391 7.85992ZM8.16773 14.7899C8.43182 14.7899 8.67391 14.6909 8.84998 14.5039L14.506 8.85102C14.8802 8.47702 14.8802 7.85992 14.506 7.48592C14.1319 7.11302 13.5267 7.11302 13.1525 7.48592L7.49648 13.1399C7.12235 13.5139 7.12235 14.1299 7.49648 14.5039C7.67255 14.6909 7.91464 14.7899 8.16773 14.7899ZM12.8664 13.8219C12.8664 14.3609 13.2956 14.7899 13.8348 14.7899C14.363 14.7899 14.7921 14.3609 14.7921 13.8219C14.7921 13.295 14.363 12.8649 13.8348 12.8649C13.2956 12.8649 12.8664 13.295 12.8664 13.8219ZM8.17873 7.21091C8.70692 7.21091 9.13608 7.63991 9.13608 8.16792C9.13608 8.70802 8.70692 9.13592 8.17873 9.13592C7.65054 9.13592 7.21038 8.70802 7.21038 8.16792C7.21038 7.63991 7.65054 7.21091 8.17873 7.21091Z'></path>
                        </svg> */}
                        <RiVerifiedBadgeFill className='w-6 h-6' />
                        <p className='font-semibold text-[12px]'>Beast Deals</p>
                    </NavLink>

                    <NavLink 
                        to='cart' 
                        className={ `relative hover:text-[#1F5DA0] flex flex-col items-center gap-0.5 transition-all duration-100 ease-in-out  text-[#ABABAB]  
                            ${({isActive}) => isActive ? 'active': ''}`
                    }>
                        <IoCartSharp className='w-6 h-6' />
                        <p className='font-semibold text-[12px]'>Cart</p>
                        <span className={`text-[9px] font-bold text-white bg-red-600 h-4 w-4 text-center content-center rounded-full absolute -top-2 -right-1 ${addToCart.length === 0 && 'hidden'}`}>{addToCart.length}</span>
                    </NavLink>

                    <NavLink 
                        to='dashboard' 
                        className={`hover:text-[#1F5DA0] flex flex-col items-center gap-0.5 transition-all duration-100 ease-in-out  text-[#ABABAB] 
                            ${({isActive}) => isActive ? 'active': ''}`
                    }>
                        <FaUser className='w-6 h-6' />
                        <p className='font-semibold text-[12px]'>Account</p>
                    </NavLink>

                </div>
            </div>
        </div>

    );
};

export default FooterNav;