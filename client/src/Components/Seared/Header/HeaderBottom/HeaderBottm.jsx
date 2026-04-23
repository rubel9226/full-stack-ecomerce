import React from 'react';
import { IoSearch } from "react-icons/io5";

const HeaderBottom = () => {
    return (
        <div className='px-2 md:container  mx-auto py-1'>

            <div className='flex justify-between'>
                <div className='flex font-bold gap-4'>
                    <h1>Mans</h1>
                    <h1>Womens</h1>
                    <h1>Kids</h1>
                </div>
                <div>
                    <IoSearch />
                </div>
            </div>
        </div>
    );
};

export default HeaderBottom;