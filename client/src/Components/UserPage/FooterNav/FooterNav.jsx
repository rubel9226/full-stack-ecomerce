import React, { use, useContext, useEffect, useRef, useState } from 'react';
import { IoHomeSharp } from "react-icons/io5";
import { BsFillGridFill } from "react-icons/bs";
import { IoCartSharp } from "react-icons/io5";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa6";
import { Link, Navigate, NavLink, useLocation, useNavigate } from 'react-router';

import './FooterNav.css';
import { AddToCartContext } from '../../../Context/AddToCartContext';
import { AuthContext } from './../../../Context/AuthProvider';
import { logoutUser } from './../../../API/authApi/authApi';
import api from './../../../API/Axios/api';




const FooterNavUser = () => {
    const drawerRef = useRef(null);
    const [menuType, setMenuType] = useState('category');
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const location = useLocation();
    const isAccountActive = location.pathname.startsWith('/dashboard/account');
    const isAccountCategory = location.pathname.startsWith('/dashboard/catalog');

    const { addToCart } = useContext(AddToCartContext); 
    const [categories, setCategories] = useState([]);


    const handleGetCategory = async () => {
        try {
            const res = await api.get('/categories');
            setCategories(res?.data?.payload)
        } catch (error) {
            // 
        }
    }

    useEffect(() => {
        handleGetCategory();
    }, []);

    const handleLogout = async () => {
        try {
            await logoutUser();
            setUser(null);
            navigate('/', {replace: true});
        } catch (error) {
            console.log(error)    
        }  
    }
    

    return (
        <div className='fixed w-full left-0 shadow-2xl border-t-2 border-gray-100 bottom-0 lg:hidden z-10000000'>
            <div className='bg-white shadow py-2'>
                <div className='w-11/12 sm:w-8/12 mx-auto flex justify-between select-none'>

                    <NavLink to='/dashboard' 
                        end
                        className={`hover:text-[#1F5DA0] flex flex-col items-center gap-0.5 transition-all duration-100 ease-in-out  text-[#ABABAB] font-semibold  
                            ${({isActive }) => isActive ? 'active': ''}`
                    }>
                        <IoHomeSharp className='w-6 h-6' />
                        <p className='text-[12px]'>Home</p>
                    </NavLink>
                    
                    <div 
                        onClick={() => {
                            setMenuType('category'); 
                            drawerRef.current && (drawerRef.current.checked = true) }
                        }
                        className={ `hover:text-[#1F5DA0] flex flex-col items-center gap-0.5 transition-all duration-100 ease-in-out  text-[#ABABAB]  
                            ${ isAccountCategory ? 'active': ''}`
                        }>
                            <BsFillGridFill className='w-6 h-6' />
                            <p className='font-semibold text-[12px]'>Category</p>
                    </div>

                    <NavLink 
                        to='/dashboard/best-deals'
                        className={ `hover:text-[#1F5DA0] flex flex-col items-center gap-0.5 transition-all duration-100 ease-in-out  text-[#ABABAB]  
                            ${({isActive}) => isActive ? 'active': ''}`
                    }>
                        <RiVerifiedBadgeFill className='w-6 h-6' />
                        <p className='font-semibold text-[12px]'>Beast Deals</p>
                    </NavLink>

                    <NavLink 
                        to={user? '/dashboard/cart' : '/login'} 
                        className={ `relative hover:text-[#1F5DA0] flex flex-col items-center gap-0.5 transition-all duration-100 ease-in-out  text-[#ABABAB]  
                            ${({isActive}) => isActive ? 'active': ''}`
                    }>
                        <IoCartSharp className='w-6 h-6' />
                        <p className='font-semibold text-[12px]'>Cart</p>
                        <span className={`text-[9px] font-bold text-white bg-red-600 h-4 w-4 text-center content-center rounded-full absolute -top-2 -right-1 ${addToCart.length === 0 && 'hidden'}`}>{addToCart.length}</span>
                    </NavLink>

                    <div
                         onClick={() => {
                            setMenuType('account'); 
                            drawerRef.current && (drawerRef.current.checked = true) }
                        }
                        className={`hover:text-[#1F5DA0] cursor-pointer flex flex-col items-center gap-0.5 transition-all duration-100 ease-in-out  text-[#ABABAB] 
                            ${isAccountActive ? 'active': ''}`
                    }>
                        <FaUser className='w-6 h-6' />
                        <p className='font-semibold text-[12px]'>Account</p>
                    </div>

                </div>
            </div>

            
                <div className="drawer">
                    <input id="my-drawer-1" type="checkbox" className="drawer-toggle" ref={drawerRef} />
                    <div className="drawer-content">

                    </div>

                    <div className="drawer-side">
                        <label htmlFor="my-drawer-1" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className=" menu bg-base-200 min-h-full w-80 p-0">

                            {menuType === 'category' ?
                                <div className='flex flex-col'>
                                    <h2 className='text-xl bg-[#1F5DA0] text-white font-semibold px-4 py-3 leading-8'>All Categories</h2>

                                    {categories.map((category, index) => 
                                        <Link 
                                            key={index}  
                                            to={`/dashboard/catalog/${category.slug}`} 
                                            className='pl-6 py-2 text-[16px] capitalize text-black font-normal px-7 btn border-none w-full justify-start'
                                            onClick={() => {
                                                setMenuType('category'); 
                                                drawerRef.current && (drawerRef.current.checked = false) }
                                            }>{category.name}</Link>
    
                                    )}

                                </div>
                            : menuType === 'account' &&
                                <div className=' '>
                                    <h2 className='text-xl bg-[#1F5DA0] text-white font-semibold px-4 py-3 leading-8'>My Account</h2>
                                    { user 
                                        && <div className=''>
                                            <div className='text-center pt-4 pb-6 border-b'>
                                                <div className='inline-block p-0.5 border h-16 w-16 rounded-full text-center'>
                                                    <img className='rounded-full w-full h-full' src={user.image === '' ? 'https://res.cloudinary.com/dext9i4ab/image/upload/v1776982579/user-circles-set_78370-4704_kxxfvq.png' : user.image} alt="" />
                                                </div>
                                                <div>
                                                    <h3 className='text-[15px] font-semibold'>{user.name}</h3>
                                                    <p>{user.phone}</p>
                                                </div>
                                            </div>
                                            <div className='select-none min-h-[75vh] flex flex-col justify-between'>
                                                <div className=' font-medium flex py-5 flex-col items-start'>
                                                    <Link to={'/dashboard'} className='font-normal px-7 text-[15px] text-black/70 btn border-none w-full justify-start'>Dashboard</Link>
                                                    <Link to={'/dashboard/account/my-orders'} className='font-normal px-7 text-[15px] text-black/70 btn border-none w-full justify-start'>My Order</Link>
                                                    <Link to='/dashboard/account' className='font-normal px-7 text-[15px] text-black/70 btn border-none w-full justify-start'>My Profile</Link>
                                                    {/* <Link to='order-tracking' className='font-normal px-7 text-[15px] text-black/70 btn border-none w-full justify-start'>Order Tracking</Link> */}
                                                </div>
                                                <div className='p-5 border-t border-black/10'>
                                                    <div onClick={() => {
                                                        handleLogout();
                                                        drawerRef.current && (drawerRef.current.checked = false) }} className='active:translate-y-px cursor-pointer hover:bg-[#c01414] text-[18px] font-bold bg-[#D71110] text-white text-center inline-block w-full py-2.5 rounded-lg'>Logout</div>
                                                </div>

                                            </div>
                                        </div>
                                    }
                                </div>}
                            
                        </ul>
                    </div>
                    
                </div>
        </div>

    );
};

export default FooterNavUser;