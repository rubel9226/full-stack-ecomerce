import React, { useContext, useEffect, useState } from 'react';
import GadgetOffer from '../GadgetOffer/GadgetOffer';
import { AuthContext } from '../../../../../Context/AuthProvider';
import api from '../../../../../API/Axios/api';
import { Link } from 'react-router';



export default function UnlimitedOffer() {
  const [categories, setCategories] = useState([]);
  const { user } = useContext(AuthContext);
  


  const handleGetCategories = async () => {
      try {
          const res = await api.get('/categories/popular/get-popular?section=unlimitedBottom');
          setCategories(res?.data?.payload);
      } catch (error) {
          console.log(error);
      }
  };

  useEffect(() => {
    handleGetCategories();
  }, []);
  return (
    <div className=''>
        <h2 className='font-semibold text-xl md:text-2xl xl:text-3xl 2xl:text-[32px] capitalize sm:my-4 md:my-5'>Unlimited Offer</h2>
        <div className="no-scrollbar flex gap-2 overflow-auto lg:gap-4 mt-2.5">
            {categories.map((data, index) => (
                <Link to={user ? `/dashboard/catalog/${data?.slug}` : `/catalog/${data?.slug}`} key={index} className="w-37.5 lg:w-[22vw] aspect-square mx-auto text-center shrink-0 cursor-pointer" >
                    <img 
                        className="w-37.5 lg:w-[22vw] aspect-square mx-auto rounded-xl hover:shadow-xl shadow-blue-400/40 group" 
                        src={data?.image} alt="" />
                    <p className='w-full overflow-hidden capitalize truncate mt-1 sm:mt-2 mb-4 font-semibold text-center sm:text-lg group-hover:text-blue-500 hover:text-blue-500'>{data.name}</p>
                </Link>
            ))}       
        </div>

        <div>
            <GadgetOffer />
        </div>
    </div>
  );
}
