import React, { useContext, useRef, useState } from 'react';
import { AuthContext } from '../../../../Context/AuthProvider';
import { MdOutlineFileUpload } from 'react-icons/md';
import api from '../../../../API/Axios/api';

const UpdateProfile = ({setEditProfile}) => {
    const { user, getMe } = useContext(AuthContext);
    
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
 
    const [imageFile, setImageFile] = useState(null);
    const [value, setValue] = useState({
        name: user?.name || "",
        phone: user?.phone || "",
        image: user?.image || "",
    });

    const inputRef = useRef(null);

    // image upload preview
    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setImageFile(file);

            const imageUrl = URL.createObjectURL(file);

            setValue((prev) => ({
                ...prev,
                image: imageUrl
            }));
        }
    };

    // input change
    const handleChange = (e) => {
        const { name, value: inputValue } = e.target;

        setValue((prev) => ({
            ...prev,
            [name]: inputValue
        }));
    };

    // save profile
    const handleSaveProfile =async () => {
        console.log(value);
        setLoading(true);

        // api call here
        try {
            const formData = new FormData();
            
            formData.append('name', value.name);
            formData.append('phone', value.phone);

            if(imageFile){
                formData.append('image', imageFile);
            }
            const data = await api.put(`/users/${user._id}`, formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            setErrorMessage('');
            // update frontend
            getMe();

            setEditProfile(false);
        } catch (error) {
            setErrorMessage(error?.response?.data?.message);
            // console.log(error?.response?.data?.message);
        } finally{
            setLoading(false);
        }
    };



    return (
        <div>
            <div className='flex flex-col justify-center items-center gap-2 py-5'>
                <p className='text-[18px] font-medium text-[#1F5DA0]'> My Profile Information </p>
            </div>
        
            <div className='divider m-0' />
        
            <div className='mt-5'>
        
                {/* image upload */}
                <div className='flex flex-col justify-center items-center'>
        
                    <div className='border-[6px] border-gray-400 rounded-full w-[150px] h-[150px] bg-blue-300 overflow-hidden'>
                        <img
                            className='rounded-full w-full h-full object-cover'
                            src={value?.image}
                            alt="user image"
                        />
                    </div>
        
                    {/* hidden input */}
                    <input type="file" accept='image/*' ref={inputRef} onChange={handleImageChange} className='hidden' />
        
                    {/* upload button */}
                    <button onClick={() => inputRef.current.click()} className='flex gap-1 justify-center items-center mt-2 font-medium text-[#1F5DA0]' > <MdOutlineFileUpload className='text-2xl' /> <p>Upload Photo</p> </button>
        
                </div>
        
                {/* form */}
                <div className='px-8 mt-10 pb-10'>
        
                    <div>
                        <label className='text-black/80 font-medium'> Full Name <span className='text-red-600'> *</span> </label>
        
                        <input
                            type="text"
                            name='name'
                            value={value.name}
                            onChange={handleChange}
                            className='w-full border border-black/40 rounded-sm py-2 px-3 outline-none mt-1 capitalize'
                        />
                    </div>
        
                    <div className='mt-4'>
        
                        <label className='flex items-center gap-1 text-black/80 font-medium'>
                            Contact Number
                            <span className='text-red-600'> *</span>
                        </label>
        
                        <input
                            type="tel"
                            name='phone'
                            value={value.phone}
                            onChange={handleChange}
                            className='w-full border border-black/40 rounded-sm py-2 px-3 outline-none mt-1'
                        />
                    </div>
        
                    {/* buttons */}
                    <div className='flex gap-3 mt-8'>
        
                        <button
                            onClick={handleSaveProfile}
                            className='btn bg-[#026EE2] hover:bg-[#0257b3] text-white border-none flex-1'
                        >
                            {
                                loading ? 'Loading ...' : 'Save Changes'
                            }
                            
                        </button>
        
                        <button
                            onClick={() => setEditProfile(false)}
                            className='btn bg-gray-200 hover:bg-gray-300 text-black border-none flex-1'
                        >
                            Cancel
                        </button>
                        {/* error message */}
                    </div>
        
                    <div className={`mt-3 font-medium text-red-600 ${errorMessage === '' ? 'hidden' : 'block'}`}>
                        <p>{errorMessage}</p>
                    </div>
        
                </div>
        
            </div>
        
        </div>
    );
};

export default UpdateProfile;