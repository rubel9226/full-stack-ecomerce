import React, { use, useContext, useEffect, useRef, useState } from 'react';
import { Link, Navigate, NavLink, useNavigate } from 'react-router';


// all icons
import { IoHomeSharp } from "react-icons/io5";
import { BsFillGridFill } from "react-icons/bs";
import { IoCartSharp } from "react-icons/io5";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa6";
import { FaClipboardList } from "react-icons/fa6";
import { FaWallet } from "react-icons/fa6";
import { MdGroups2 } from "react-icons/md";




import './FooterNav.css';
import { AddToCartContext } from '../../../../Context/AddToCartContext';
import { AuthContext } from '../../../../Context/AuthProvider';
import { logoutUser } from '../../../../API/authApi/authApi'; 

const FooterNavAdmin = () => {
    const drawerRef = useRef(null); 
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate(); 
    const isAccountActive = location.pathname.startsWith('/admin/account');

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/categories/')
        .then(res => res.json())
        .then(data => setCategories(data.payload))
        .catch(err => console.log(err));
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
        <div className='fixed w-full left-0 shadow-2xl border-t-2 border-gray-100 bottom-0 lg:hidden z-101'>
            <div className='bg-white shadow py-2'>
                <div className='w-11/12 sm:w-8/12 mx-auto flex justify-between select-none'>

                    <NavLink to='/admin' 
                        end
                        className={`hover:text-[#1F5DA0] flex flex-col items-center gap-0.5 transition-all duration-100 ease-in-out  text-[#ABABAB] font-semibold  
                            ${({isActive }) => isActive ? 'active': ''}`
                    }>
                        <IoHomeSharp className='w-6 h-6' />
                        <p className='text-[12px]'>Home</p>
                    </NavLink>
                    
                    <NavLink 
                        to='products'
                        className={`hover:text-[#1F5DA0] cursor-pointer flex flex-col items-center gap-0.5 transition-all duration-100 ease-in-out  text-[#ABABAB] font-semibold 
                            ${({isActive }) => isActive ? 'active': ''}`}>
                            <BsFillGridFill className='w-6 h-6' />
                            <p className='font-semibold text-[12px]'>Products</p>
                    </NavLink>



                    <NavLink 
                        to='orders'
                        className={ `hover:text-[#1F5DA0] flex flex-col items-center gap-0.5 transition-all duration-100 ease-in-out  text-[#ABABAB]  
                            ${({isActive}) => isActive ? 'active': ''}`
                    }>
                        <FaClipboardList className='w-6 h-6' />
                        <p className='font-semibold text-[12px]'>Orders</p>
                    </NavLink>

                    <NavLink 
                        to={'users'} 
                        className={ `relative hover:text-[#1F5DA0] flex flex-col items-center gap-0.5 transition-all duration-100 ease-in-out  text-[#ABABAB] ${({isActive}) => isActive ? 'active': ''}`
                    }>
                        <MdGroups2 className='w-6 h-6' />
                        <p className='font-semibold text-[12px]'>Users</p>
                    </NavLink>

                    <div onClick={() => drawerRef.current && (drawerRef.current.checked = true)} className={`hover:text-[#1F5DA0] cursor-pointer flex flex-col items-center gap-0.5 transition-all duration-100 ease-in-out  text-[#ABABAB] ${isAccountActive ? 'active': ''}`}>
                        <FaUser className='w-6 h-6' />
                        <p className='font-semibold text-[12px]'>Account</p>
                    </div>

                </div>
            </div>

            {/* drawer section work end */}
            <div className="drawer">
                <input id="my-drawer-1" type="checkbox" className="drawer-toggle" ref={drawerRef} />
                <div className="drawer-side">
                    <label htmlFor="my-drawer-1" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className=" menu bg-base-200 min-h-full w-80 p-0">
                        <h2 className='text-xl bg-[#1F5DA0] text-white font-semibold px-4 py-3 leading-8'>My Account</h2>
                        <div className=''>
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
                                    <Link to={'/admin/orders'} className='font-normal px-7 text-[15px] text-black/70 btn border-none w-full justify-start'>Users Order</Link>
                                    <Link to='/admin/account' className='font-normal px-7 text-[15px] text-black/70 btn border-none w-full justify-start'>My Profile</Link>
                                </div>
                                <div className='p-5 border-t border-black/10'>
                                    <div onClick={() => {
                                        handleLogout();
                                        drawerRef.current && (drawerRef.current.checked = false) }} className='active:translate-y-px cursor-pointer hover:bg-[#c01414] text-[18px] font-bold bg-[#D71110] text-white text-center inline-block w-full py-2.5 rounded-lg'>Logout</div>
                                </div>
                            </div>
                        </div>
                    </ul>
                </div>
            </div>
            {/* drawer section work end  */}
        </div>

    );
};

export default FooterNavAdmin;