import React, { useEffect, useState } from "react";
// import ReactDOM from "react";
import ReactDOM from 'react-dom';
import { FaSearch } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { Link, useNavigate } from "react-router";
import api from "../../../../../API/Axios/api";

const SearchSuggestion = ({user}) => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [products, setProducts] = useState([]);

    // API CALL
    useEffect(() => {

        if (!search.trim()) {
            setProducts([]);
            return;
        }

        const currentSearch = search;

        const fetchProducts = async () => {
            try {
                const res = await api.get(`/products?search=${currentSearch}`);
                const data = res?.data?.payload;

                // jodi input already empty hoye jai
                // tahole products set korbe na
                if (currentSearch === search) {
                    setProducts(data.products);
                }

            } catch (error) {
                console.log(error);
            }
        };

        fetchProducts();

    }, [search]);

    const handleCloseSearch = () => {
        setSearch('');
    }

    const handleGoProduct = () => {
        setProducts([]);
    };

    const handleSearch = () => {
        if(!search)return;
        setProducts([]);
        navigate(`/admin/search?keywords=${search}`)
    };

    const handleClose = () => {
        setProducts([]);
    }

    return (
        <div className="w-full max-w-[550px] mx-auto relative">


            <div className="w-90 lg:w-110 xl:min-w-[550px] h-[40px] border  border-[#1F5DA0] rounded-md overflow-hidden flex items-center bg-[#f3f3f3]">
                <input
                    type="text"
                    placeholder="I’m shopping for ..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full h-full px-4 outline-none bg-transparent text-gray-700 placeholder:text-gray-500"
                    
                />
                {
                    search && <button onClick={handleCloseSearch} className="cursor-pointer h-full px-2 text-[#1a5ba0]">
                        <ImCross />
                    </button>
                }
                <button onClick={handleSearch} className="cursor-pointer min-w-[55px] lg:min-w-16 xl:min-w-18 h-full bg-[#1F5DA0] text-white flex items-center justify-center hover:bg-[#114883] duration-300">
                    <FaSearch size={18} />
                </button>
            
            </div>

            {/* Suggestions */}
{
  products.length > 0 &&
  ReactDOM.createPortal(
    <div className="w-full
        absolute
        top-15
        right-0
        md:flex justify-center
        hidden
        ">
            <div className="w-[752px] lg:w-[540px] xl:w-[660px] 2xl:w-[790px] mx-auto flex justify-end pr-7">
                <div
                    className="
                        
                        w-full
                        max-w-[550px]
                        lg:max-w-full
                        border
                        rounded-md
                        bg-white
                        shadow-lg
                        z-[999999]
                        max-h-[400px]
                        overflow-y-auto
                        relative
                    "
                >
                    <div className="p-4 pt-1 absolute top-0 right-0">
                        <p onClick={handleClose} className="btn btn-xs bg-[#114984] text-white">close</p>
                    </div>
                {
                    products.map(product => (
                    <Link onClick={handleGoProduct} to={user? `/dashboard/product/${product?.slug}` : `/product/${product?.slug}`} key={product.id} className="flex items-center gap-3 p-3 border-b hover:bg-gray-100 cursor-pointer">
                        <img
                            src={product?.image}
                            alt={product?.name}
                            className="w-12 h-12 object-cover rounded"
                        />

                        <div>
                            <h2 className="font-medium text-gray-700">
                                {product?.name}
                            </h2>

                            <p className="text-sm text-gray-500">
                                ${product.price}
                            </p>
                            <p>{product?.slug}</p>
                        </div>

                    </Link>
                    ))
                }

                </div>
            </div>
    </div>,

    document.getElementById("portal")
  )
}

        </div>
    );
};

export default SearchSuggestion;