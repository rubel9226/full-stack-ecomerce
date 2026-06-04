import React, { useState, useEffect, useContext } from "react";
import HeaderTop from "./HeaderTop/HeaderTop";
import HeaderBottom from "./HeaderBottom/HeaderBottom";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdKeyboardArrowRight } from "react-icons/md";



import { Link, NavLink, useLocation } from 'react-router';
import { AuthContext } from './../../../../Context/AuthProvider';
import api from "../../../../API/Axios/api";


const Header = () => {
  const { user } = useContext(AuthContext);
      const [categories, setCategories] = useState([]);

      const location = useLocation();
      const isOrders = location.pathname.startsWith('/admin/users');
      const isUsers = location.pathname.startsWith('/admin/orders');
      const isProducts = location.pathname.startsWith('/admin/products');

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
    }, [])

  return (
    <div className=" bg-base-200 shadow-sm ">
        <HeaderTop />

        <div className="md:hidden">
          <HeaderBottom />
        </div> 

        <div className='hidden lg:text-lg xl:text-xl py-3 px-5 lg:px-7 lg:py-4 font-bold lg:flex items-center justify-between container mx-auto xl:!max-w-[1600px]'>
          <div className='group'>
            <Link to={'/admin/products'} className={`cursor-pointer flex gap-2 items-center ${isProducts ? 'text-[#1F5DA0]' : ''}`}>
              <GiHamburgerMenu className=' text-xl lg:text-2xl xl:text-3xl' />
              <span>Products</span>
            </Link> 
          </div>

          <div className='flex justify-center items-center gap-4 lg:gap-6'>            
            <NavLink to='' className={`cursor-pointer hover:link ${(isActive) => isActive ? 'text-[#1F5DA0]' : '' }`} end>Home</NavLink>
            <Link to={'/admin/orders'} className={`cursor-pointer hover:link ${isUsers ? 'text-[#1F5DA0]' : '' }`}>Orders</Link>
            <Link to={'/admin/users'} className={`cursor-pointer hover:link ${isOrders ? 'text-[#1F5DA0]' : '' }`}>Users</Link>
          </div>

          <div className='cursor-pointer'>
            
          </div>
        </div>
    </div>
           
  );
};

export default Header;
