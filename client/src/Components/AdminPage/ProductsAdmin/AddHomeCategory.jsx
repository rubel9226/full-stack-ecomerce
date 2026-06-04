import { useState } from "react"; 
import { toast } from "react-toastify";
import { MdOutlineAdd } from "react-icons/md";
import api from "../../../API/Axios/api";

const AddHomeCategory = ({category, setCategories}) => {
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(null); 

    
    const handleAddPopular = async (section) => {
        setLoading(section);
        try { 
            const res = await api.put(
                `/categories/popular/add-popular/${category.slug}?section=${section}`
            );
            const newCategory = res?.data?.payload;

            let update = {};
            if(section === 'popular'){
                update = { isPopular: true };
            } 
            else if(section === 'gadget'){
                update = { isGadget: true };
            } 
            else if(section === 'unlimitedTop'){
                update = { isUnlimitedTop: true };
            } 
            else if(section === 'unlimitedBottom'){
                update = { isUnlimitedBottom: true };
            }

            setCategories(prev =>
                prev.map(item => item.slug === newCategory.slug ? {...item, section: {...item.section, ...update }}: item )
            );

            setOpenModal(false);

            toast.success(
                `${category?.slug?.replace(/-/g, " ")} category added successfully`
            );
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(null);
        }
    };


    const handleDeletePopular = async (section) => {
        setLoading(section); 
        try {
            const res = await api.put(`/categories/popular/delete-popular/${category.slug}?section=${section}`);
            console.log(res?.data?.payload);
            const newCategory = res?.data?.payload;

            let update = {};
            if(section === 'popular'){
                update = { isPopular: false };
            } 
            else if(section === 'gadget'){
                update = { isGadget: false };
            } 
            else if(section === 'unlimitedTop'){
                update = { isUnlimitedTop: false };
            } 
            else if(section === 'unlimitedBottom'){
                update = { isUnlimitedBottom: false };
            }

            setCategories(prev =>
                prev.map(item => item.slug === newCategory.slug ? {...item, section: {...item.section, ...update }}: item )
            );

            setOpenModal(false)

            toast.success(<span className='capitalize'>{category.slug.replace(/-/g, " "), 'category added to popular section'}</span>)            
        } catch (error) {
            // console.log(error?.response?.data?.message); 
            console.log(error); 
        } finally {
            setLoading(null);
        }
    } 
    return (
        <div>
            <button 
                onClick={()=> setOpenModal(true)}
                className="btn cursor-pointer py-2 rounded bg-[#02c5a5] hover:bg-[#04a086] text-white font-semibold transition"
                title="Add Category"
            > 
                Add Category
            </button>


            {openModal && (
              <div className="fixed inset-0 bg-black/5 flex justify-center items-center z-100">
                <div className="bg-white p-5 rounded-md w-72 text-center space-y-4">
                    <div>
                        <h3 className="text-lg font-bold text-gray-700">
                            Select Home Category
                        </h3> 
                    </div>

                    {
                        category?.section?.isPopular 
                        ?
                        <button
                            onClick={() => handleDeletePopular('popular')}
                            className="btn cursor-pointer w-full py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white   transition"
                            title="Delete popular category"
                        >
                            {loading === 'popular' ? "Deleting..." : 'Delete Popular Category'} {category?.section?.isPopular}
                        </button> 
                        :
                        <button
                            onClick={() => handleAddPopular('popular')}
                            className="btn cursor-pointer w-full py-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-white   transition"
                            title="Add popular category"
                        >
                            {loading === 'popular' ? "Adding..." : 'Add Popular Category'} 
                        </button>
                    }
                    {
                        category?.section?.isGadget 
                        ?
                        <button
                            onClick={() => handleDeletePopular('gadget')}
                            className="btn cursor-pointer w-full py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white   transition"
                            title="Delete gadget category"
                        >
                            {loading === 'gadget' ? "Deleting..." : 'Delete Gadget Category'} 
                        </button> 
                        :
                        <button
                            onClick={() => handleAddPopular('gadget')}
                            className="btn cursor-pointer w-full py-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-white   transition"
                            title="Add gadget category"
                        >
                            {loading === 'gadget' ? "Adding..." : 'Add Gadget Category'} 
                        </button>
                    }

                    {
                        category?.section?.isUnlimitedTop 
                        ? 
                        <button
                            onClick={() => handleDeletePopular('unlimitedTop')}
                            className="btn cursor-pointer w-full py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold transition"
                            title="Delete unlimited top"
                        >
                            {loading === 'unlimitedTop' ? "Deleting..." : 'Delete Unlimited Top'}
                            
                        </button>
                        :
                        <button
                            onClick={() => handleAddPopular('unlimitedTop')}
                            className="btn cursor-pointer w-full py-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-white font-semibold transition"
                            title="Add unlimited top"
                        >
                            {loading === 'unlimitedTop' ? "Adding..." : 'Add Unlimited Top'}
                            
                        </button>
                    }

                    {
                        category?.section?.isUnlimitedBottom 
                        ? 
                        <button
                            onClick={() => handleDeletePopular('unlimitedBottom')}
                            className="btn cursor-pointer w-full py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold transition"
                            title="Delete unlimited bottom"
                        >
                            {loading === 'unlimitedBottom' ? "Deleting..." : 'Delete Unlimited Bottom'} 
                        </button>
                        :
                        <button
                            onClick={() => handleAddPopular('unlimitedBottom')}
                            className="btn cursor-pointer w-full py-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-white font-semibold transition"
                            title="Add unlimited bottom"
                        >
                            {loading === 'unlimitedBottom' ? "Adding..." : 'Add Unlimited Bottom'} 
                        </button>
                    }


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

export default AddHomeCategory;