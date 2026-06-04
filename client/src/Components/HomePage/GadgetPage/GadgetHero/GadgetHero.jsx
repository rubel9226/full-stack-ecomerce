import React, { useContext, useEffect, useState } from 'react';
import api from '../../../../API/Axios/api';
import { Link } from 'react-router';
import { AuthContext } from '../../../../Context/AuthProvider';



export default function GadgetHero() {
  const [categories, setCategories] = useState([]);
  const { user } = useContext(AuthContext);
  


  const handleGetCategories = async () => {
      try {
          const res = await api.get('/categories/popular/get-popular?section=gadget');
          setCategories(res?.data?.payload);
      } catch (error) {
          console.log(error);
      }
  };

  useEffect(() => {
    handleGetCategories();
  }, []);


  return (
    <div className='sm:mt-4 md:mt-5'>
        <h2 className='font-semibold text-xl md:text-2xl xl:text-3xl 2xl:text-[32px] capitalize mb-2'>Gadget Festive</h2>
        <div className="flex gap-3  overflow-x-auto no-scrollbar">
            {categories.map((category, index) => (
                <Link to={user ? `/dashboard/catalog/${category.slug}` : `/catalog/${category.slug}`} key={index} className="text-center shrink-0">
                  <img className="w-[288px] lg:w-[28vw] max-w-[588px] aspect-[2] mx-auto rounded-xl" 
                    src={category?.image} alt="" /> 
                </Link>
            ))}       
        </div>
    </div>
  );
}
