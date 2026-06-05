import React, { useState, useEffect, useContext } from "react";
import HeaderTop from "./HeaderTop/HeaderTop";
import HeaderBottom from "./HeaderBottom/HeaderBottom";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdKeyboardArrowRight } from "react-icons/md";


import api from './../../../API/Axios/api';
import { Link, NavLink, useLocation } from 'react-router';
import { AuthContext } from './../../../Context/AuthProvider';


const Header = () => {
    const { user } = useContext(AuthContext);
      const [categories, setCategories] = useState([]);

      const location = useLocation();
      const isClothing = location.pathname.startsWith(user ? '/dashboard/catalog/clothing-and-fashion' : '/catalog/clothing-and-fashion');
      const isBeastDeals = location.pathname.startsWith(user ? '/dashboard/best-deals' : '/beast-deals');
      const isCategory = location.pathname.startsWith(user ? '/dashboard/catalog/:category' : '/catalog/:category');

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

        <div className='hidden lg:text-lg xl:text-xl py-3 px-5 lg:px-7 lg:py-4 font-bold lg:flex items-center justify-between container mx-auto xl:!max-w-[1600px]'>
          <div className='group'>
            <div className={`cursor-pointer flex gap-2 items-center ${isCategory ? 'bg-[#1F5DA0]' : ''}`}>
              <GiHamburgerMenu className=' text-xl lg:text-2xl xl:text-3xl' />
              <span>Shop by Category</span>
            </div>

            <div className='absolute group-hover:flex hidden justify-start h-auto -mt-2 w-[270px]'>

              <div className=' bg-white flex flex-col gap-1.75 px-5 py-2 z-30 text-base font-medium mt-6 shadow-xl shadow-black/30 w-[256px]'>
                {
                  categories.map((category, index) => (
                    <Link to={`catalog/${category.slug}`} className='capitalize flex items-center justify-between cursor-pointer hover:link'>
                      <p>{category.slug.replace(/-/g, " ")}</p>
                      <MdKeyboardArrowRight />
                    </Link>
                  ))
                }
              </div>


            </div>
          </div>

          <div className='flex justify-center items-center gap-4 lg:gap-6'>            
            <NavLink to='' className={`cursor-pointer hover:link ${(isActive) => isActive ? 'text-[#1F5DA0]' : '' }`} end>Home</NavLink>
            <Link to={user ? '/dashboard/best-deals' : '/beast-deals'} className={`cursor-pointer hover:link ${isBeastDeals ? 'text-[#1F5DA0]' : '' }`}>Best Deals</Link>
            <Link to={user ? '/dashboard/catalog/clothing-and-fashion' : '/catalog/clothing-and-fashion'} className={`cursor-pointer hover:link ${isClothing ? 'text-[#1F5DA0]' : '' }`}>Clothing & Fashion</Link>
          </div>

          <div className='cursor-pointer'>
            
          </div>
        </div>
    </div>
           
  );
};

export default Header;
