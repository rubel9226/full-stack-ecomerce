import { useState } from "react";
import api from "../../../API/Axios/api";
import { toast } from "react-toastify";
import { MdOutlineAdd } from "react-icons/md";

const AddHomeSection = ({product}) => {
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState('');

    
    const handleAddHomeSection =async (section) => {
        if(!confirm('are your sure?')) return ;
        setLoading(section);

        try {
            
            await api.put(`/products/home-sections/${product?.slug}?section=${section}`);
            setOpenModal(false);

            toast.success(<span className="capitalize">{`${product.name} added to ${section} section successfully`}</span>)
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }finally{
            setLoading('')
        }
    }
    return (
        <div>
            <label onClick={()=> setOpenModal(true)} className="btn btn-sm bg-cyan-500/20 w-full flex whitespace-nowrap text-green-700 transform transition-all hover:scale-105 duration-200 hover:cursor-pointer"> 
                <MdOutlineAdd className="text-[18px]" />
                <span className="font-semibold text-[12px] ">Add Home Section</span>
            </label>


            {openModal && (
              <div className="fixed inset-0 bg-black/5 flex justify-center items-center z-100">
                <div className="bg-white p-5 rounded-md w-72 text-center space-y-4">
                    <div>
                        <h3 className="text-lg font-bold text-gray-700">
                            Select Home Section
                        </h3> 
                    </div>

                    <button
                        onClick={() => handleAddHomeSection('dailyOffer')}
                        className="btn cursor-pointer w-full py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white   transition"
                        title="Add daily offer"
                    >
                        {loading === 'dailyOffer' ? "Adding..." : 'Add Daily Offer'}                        
                    </button>

                    <button
                        onClick={() => handleAddHomeSection('newCollection')}
                        className="btn cursor-pointer w-full py-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-white font-semibold transition"
                        title="Add new collection"
                    >
                        {loading === 'newCollection' ? "Adding..." : 'Add New Collection'} 
                    </button>

                    <button
                        onClick={() => handleAddHomeSection('bagsLuggage')}
                        className="btn cursor-pointer w-full py-2 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white font-semibold transition"
                        title="Add bugs luggage"
                    >
                        {loading === 'bagsLuggage' ? "Adding..." : 'Add Bags Luggage'}
                        
                    </button>

                    <button
                        onClick={() => handleAddHomeSection('watch')}
                        className="btn cursor-pointer w-full py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-semibold transition"
                        title="Add watch"
                    >
                        {loading === 'watch' ? "Adding..." : 'Add Watch'}
                        
                    </button>

                    <button
                        onClick={() => handleAddHomeSection('shavingTrimming')}
                        className="btn cursor-pointer w-full py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-semibold transition"
                        title="Add Shaving Trimming"
                    >
                        {loading === 'shavingTrimming' ? "Adding..." : 'Add Shaving Trimming'}
                    </button>

                    <button
                        onClick={() => handleAddHomeSection('headphones')}
                        className="btn cursor-pointer w-full py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-semibold transition"
                        title="Add HeadPhones"
                    >
                        {loading === 'watch' ? "Adding..." : 'Add Headphones'}
                    </button>

                    <button
                        onClick={() => setOpenModal(false)}
                        className="btn cursor-pointer w-full py-2 rounded-lg bg-gray-500 hover:bg-gray-600 text-white font-semibold transition"
                        title="Cancel"
                    >
                        Cancel
                    </button>

                </div>
              </div>
            )}
        </div>
    );
};

export default AddHomeSection;