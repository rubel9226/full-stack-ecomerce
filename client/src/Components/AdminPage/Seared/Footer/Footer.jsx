import React from 'react';
import { MdLocationOn } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaFacebookF, FaLinkedinIn, FaYoutube, FaInstagram, FaTiktok, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
    return (
        <div className=' bg-base-200'>
            <footer className="footer sm:footer-horizontal text-base-content p-10 w-11/12 md:container mx-auto">

                <aside>
                    <h6 className="footer-title text-black">Contact Us</h6>
                    <div className='space-y-4'>
                        <div className='flex gap-1'>
                            <div className=''>
                                <MdLocationOn className='text-white p-0.75 rounded-full text-xl bg-gray-500' />
                            </div>
                            <p>Avenue #02, Road #14, House No #966, Mirpur DOHS, DHAKA-1216, Bangladesh,</p>
                        </div>

                        <div className='flex gap-1'>
                            <div className=''>
                                <IoCall className='text-white p-0.75 rounded-full text-xl bg-gray-500' />
                            </div>
                            <p> +88-01307743888</p>
                        </div>
                        
                        <div className='flex gap-1'>
                            <div className=''>
                                <MdEmail className='text-white p-0.75 rounded-full text-xl bg-gray-500' />
                            </div>
                            <p> trivonfashion.bd@gmail.com</p>
                        </div>
                    </div>
                </aside>

                <nav>
                    <h6 className="footer-title">Company</h6>
                    <a className="link link-hover">Blogs</a>
                    <a className="link link-hover">Outlets</a>
                    <a className="link link-hover">About Us</a>
                    <a className="link link-hover">Contact Us</a>
                </nav>

                <nav>
                    <h6 className="footer-title">Customer</h6>
                    <a className="link link-hover">Login</a>
                    <a className="link link-hover">Register</a>
                    <a className="link link-hover">Brands</a>
                    <a className="link link-hover">Category</a>
                </nav>

                <nav>
                    <h6 className="footer-title">Help</h6>
                    <a className="link link-hover">FAQs</a>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>
                    <a className="link link-hover">Terms & Conditions</a>
                    <a className="link link-hover">Replacement</a>
                    <a className="link link-hover">EMI Terms & Conditions</a>
                </nav>
                <nav>
                    <h6 className="footer-title capitalize">Social Media for Trivon Fassion</h6>

                    <div className='flex gap-4'>
                        <div className='bg-[#1877F2] p-2 rounded-full text-white text-xl'>
                            <FaFacebookF />
                        </div>

                        <div className="bg-[#0A66C2] p-2 rounded-full text-white text-xl">
                            <FaLinkedinIn />
                        </div>
                    
                        <div className="bg-[#FF0000] p-2 rounded-full text-white text-xl">
                            <FaYoutube />
                        </div>

                        <div className="bg-linear-to-tr from-yellow-400 via-pink-500 to-purple-600 p-2 rounded-full text-white text-xl">
                            <FaInstagram />
                        </div>

                        <div className="bg-black p-2 rounded-full text-white text-xl">
                            <FaTiktok />
                        </div>

                        <div className="bg-black p-2 rounded-full text-white text-xl">
                            <FaXTwitter />
                        </div>
                    </div>
                </nav>     
            </footer>
            <div>
                <p className="text-center pb-5 text-sm text-gray-500">
                    © {new Date().getFullYear()} 
                    <span className="font-semibold text-black"> SaRa Lifestyle Ltd.</span>. 
                    All Rights Reserved
                </p>
            </div>
        </div>
    );
};

export default Footer;