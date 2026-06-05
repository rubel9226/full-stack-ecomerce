import React, { useEffect, useState } from 'react';
import api from '../../../API/Axios/api';
import { RxDotsVertical } from 'react-icons/rx';
import { toast } from 'react-toastify';
import Pagination from '../../CategoryPage/CategoryPagination/Pagination';
import Footer from '../../../Components/AdminPage/Seared/Footer/Footer';

const UsersPageAdmin = () => {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllUsers = async () => {
      setLoading(true);
      try {
        const allUsers = await api.get(`/users?limit=20&page=${page}&search=${search}`);
        setUsers(allUsers?.data?.payload?.users || []);
        setPagination(allUsers?.data?.payload?.pagination || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getAllUsers();
  }, [search, page]);

  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedUser(null);
  };

  const handleBan = async (e, user) => {
    e.preventDefault();

    try {
      const res = await api.put(`/users/manage-user/${user._id}`);
      console.log(res?.data?.payload);
      
      toast.success("User updated");
    } catch (error) {
      console.log(error?.response?.data?.message);
      console.log(error);
    }
  }; 


  const handleSearch = (e) => {
    e.preventDefault();
    const searchValue = e.target.search.value;
    if(searchValue){
      setSearch(e.target.search.value);
    }
  }
  

  return (
    <div>
      <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen mb-15 lg:mb-0">

  {/* HEADER + SEARCH */}
  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">

    <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
      All Users <span className="text-gray-500">({users.length})</span>
    </h2>

    {/* SEARCH BOX + BUTTON */}
    <form onSubmit={handleSearch} className="flex w-full sm:w-96 gap-2">

      <input
        type="text"
        name='search'
        placeholder="Search by name or email..."
        className="flex-1 px-3 sm:px-4 py-1.5 sm:py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 bg-white text-sm sm:text-base"
      />

      <button 
        className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition text-sm sm:text-base"
      >
        Search
      </button>

    </form>

  </div>

        {/* 🔥 LOADING STATE */}
        {loading && (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {
              Array.from({ length: 10}).map((_, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 animate-pulse">

                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-gray-200"></div>

                    <div className="flex-1 space-y-2">
                      <div className="h-3 w-2/3 bg-gray-200 rounded"></div>
                      <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
                    </div>

                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                  </div>

                  <div className="mt-3 space-y-2">
                    <div className="h-3 w-full bg-gray-200 rounded"></div>
                    <div className="h-3 w-5/6 bg-gray-200 rounded"></div>
                    <div className="h-3 w-4/6 bg-gray-200 rounded"></div>
                  </div>

                  <div className="mt-3 flex justify-between">
                    <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
                  </div>

                </div>
              ))
            }
          </div> 
        )}

        {/* USERS GRID */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

            {users.map((user) => (
              <div
                key={user._id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-4 border border-gray-100"
              >

                <div className="flex items-center gap-3">
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-14 h-14 rounded-full object-cover border"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 capitalize truncate">{user.name}</h3>
                    {/* <p className="text-sm text-gray-500 truncate">{user.email}</p> */}
                  </div>

                  <button
                    onClick={() => handleOpenModal(user)}
                    className="btn btn-circle bg-black/5  hover:bg-black/7 cursor-pointer btn-sm"
                  >
                    <RxDotsVertical className='text-sm' />
                  </button>
                </div>

                <div className="mt-3 text-sm text-gray-600 space-y-1 w-full">
                  
                  <p className="whitespace-nowrap truncate">
                    <span className="font-medium">email:</span> {user?.email}
                  </p>

                  <p className="whitespace-nowrap overflow-hidden text-ellipsis">
                    <span className="font-medium">Phone:</span> {user.phone}
                  </p>

                  <p className="whitespace-nowrap overflow-hidden text-ellipsis">
                    <span className="font-medium">Address:</span> {user.address}
                  </p>

                </div>

                <div className="mt-3 flex justify-between items-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.isBanned
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {user.isBanned ? "Banned" : "Active"}
                  </span>
                </div>

              </div>
            ))}
          </div>
        )}

        

            <div className={users.length > 20 ? 'block' : 'hidden'}>
              <Pagination 
                pagination={pagination}  
                onPageChange={(newPage) => setPage(newPage)} />
            </div>


        {/* EMPTY STATE */}
        {!loading && users.length === 0 && (
          <p className="text-center mt-10 text-gray-500">
            No Users Found
          </p>
        )}

        {/* MODAL */}
        {modalOpen && selectedUser && (
          <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-102 px-4">

            <div className="bg-white w-full max-w-sm rounded-xl p-5 shadow-lg space-y-4">

              <h3 className="text-lg font-semibold text-center capitalize">
                {selectedUser.name}
              </h3>

              <button
                onClick={(e) => handleBan(e, selectedUser)}
                className="w-full cursor-pointer py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition"
              >
                {selectedUser.isBanned ? "Unban User" : "Ban User"}
              </button>

              <button className="w-full cursor-pointer py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition">
                Delete User
              </button>

              <button
                onClick={handleCloseModal}
                className="w-full cursor-pointer py-2 rounded-lg border hover:bg-gray-100 transition"
              >
                Cancel
              </button>

            </div>

          </div>
        )}

      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default UsersPageAdmin;