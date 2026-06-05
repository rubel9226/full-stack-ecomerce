import React, { useContext } from "react";
import { AddToCartContext } from "../../../../Context/AddToCartContext";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../../../Context/AuthProvider";
import { logoutUser } from "../../../../API/authApi/authApi";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import SearchSuggestion from "./search";
import { RiVerifiedBadgeFill } from 'react-icons/ri';
import { IoSearch } from "react-icons/io5";

const HeaderTop = () => {
    const { addToCart } = useContext(AddToCartContext);
    console.log(addToCart);
    
    const subtotal = addToCart.reduce(
        (total, item) => total + (item.newPrice * item.cartQuantity), 0 );

    
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    

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
    <div className=" bg-base-200 shadow-sm">
        <div className=" md:container mx-auto max-lg:collapse xl:!max-w-[1600px] rounded-md  overflow-visible">
            <input id="navbar-1-toggle" className="peer hidden" type="checkbox" />
            <label htmlFor="navbar-1-toggle" className="fixed inset-0 hidden max-lg:peer-checked:block" ></label>
            
            <div className="collapse-title navbar min-h-9 px-5 sm:px-6 sm:py-3 md:px-7 md:py-4 ">
                <div className="navbar-start ">
                    <Link to={user ? '/dashboard': '/'} className="text-[18px] md:text-xl lg:text-2xl font-extrabold cursor-pointer transform duration-75 active:translate-y-px text-[#135194]">Trivon Fashion</Link>
                </div>

                <div className="navbar-end md:hidden">
                    <IoSearch className="text-lg" />
                </div>

                {/* search */}
                <div className="hidden md:flex navbar-end lg:navbar-center lg:w-6/12">
                    

                    <div className="">
                        <SearchSuggestion user={user} />
                    </div>
                </div>
            
                <div className="navbar-end hidden lg:flex items-center gap-4">
                    
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" title="Cart Page" className="btn btn-ghost btn-circle">
                            <div className="indicator">
                                <FaShoppingCart className="text-[28px] text-[#1F5DA0]" /> 
                                <span className={`text-[9px] font-bold text-white bg-red-600 h-4 w-4 text-center content-center rounded-full absolute -top-2 -right-1 ${addToCart.length === 0 && 'hidden'}`}>{addToCart.length}</span>
                            </div>
                        </div>
                        <div
                            tabIndex={0}
                            className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow">
                            <div className="card-body">
                                <span className="text-lg font-bold">{addToCart.length} Items</span>
                                <span className="text-info">Subtotal: ৳{subtotal}</span>
                                <div className="card-actions">
                                    <Link to={user ? '/dashboard/cart' : '/login'} className="btn btn-primary btn-block">View cart</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                    user?<div className={`dropdown dropdown-end`}>
                        <div tabIndex={0} title="Account" role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img className='rounded-full w-full h-full' 
                                    src={!user? 'https://res.cloudinary.com/dext9i4ab/image/upload/v1776982579/user-circles-set_78370-4704_kxxfvq.png' : user.image === '' ? 'https://res.cloudinary.com/dext9i4ab/image/upload/v1776982579/user-circles-set_78370-4704_kxxfvq.png' : user.image}
                                    alt={user ? user.name : 'user image'}
                                /> 
                            </div>
                        </div>
                        <ul tabIndex="-1" className="select-none bg-base-200 py-3 font-bold text-black/50 menu menu-sm dropdown-content rounded-box z-1 mt-3 w-52 shadow" >
                            
                            <Link to={'/dashboard'} className="justify-between hover:bg-black/15 px-4 rounded-xs py-2 bg-black/3 mt-1">
                                Dashboard
                            </Link>
                            
                            <Link to={'/dashboard/account'} className="justify-between hover:bg-black/15 px-4 rounded-xs py-2 bg-black/3 mt-1">
                                My Profile
                            </Link>

                            <Link to={'/dashboard/account/my-orders'} className="justify-between hover:bg-black/15 px-4 rounded-xs py-2 bg-black/3 mt-1">
                                My Order
                            </Link>
                            
                            <button onClick={handleLogout} className="active:translate-y-px cursor-pointer hover:bg-[#c01414] bg-[#D71110] text-white text-center justify-between px-4 rounded py-2 mt-1">
                                <a>Logout</a>
                            </button>
                        </ul>
                    </div> 
                    : <div className="flex items-center gap-4">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img className='rounded-full w-full h-full'
                                    src={'https://res.cloudinary.com/dext9i4ab/image/upload/v1776982579/user-circles-set_78370-4704_kxxfvq.png'}
                                    alt={'user image'}
                                /> 
                            </div>
                        </div>

                        <Link to={'/login'} className={`bg-red-600 text-white font-bold btn px-3 h-8`}>
                            Login
                        </Link>
                    </div>
                    }
                    

                    

                </div>
            </div>
        </div>
        
    </div>
        
  );
};

export default HeaderTop;
