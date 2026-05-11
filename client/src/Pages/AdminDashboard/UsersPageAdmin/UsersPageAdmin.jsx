import React, { useEffect, useState } from 'react';
import api from '../../../API/Axios/api';
import { RxDotsVertical } from 'react-icons/rx';

const UsersPageAdmin = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const allUsers = await api.get('/users');
        setUsers(allUsers?.data?.payload?.users || []);
      } catch (error) {
        console.log(error);
      }
    };
    getAllUsers();
  }, []);

  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="p-5">
      <h2 className="text-xl font-semibold mb-4">
        All Users ({users.length})
      </h2>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="overflow-x-auto hidden md:block">
        <table className="table w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="hover">
                <td>{index + 1}</td>

                <td>
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>

                <td className="max-w-[120px] truncate">{user.name}</td>
                <td className="max-w-[150px] truncate">{user.email}</td>
                <td className="capitalize">{user.role}</td>
                <td>{user.phone}</td>
                <td className="max-w-[150px] truncate">{user.address}</td>

                <td>
                  {user.isBanned ? (
                    <span className="text-red-500 font-semibold">Banned</span>
                  ) : (
                    <span className="text-green-600 font-semibold">Active</span>
                  )}
                </td>

                <td>
                  <button onClick={() => handleOpenModal(user)}>
                    <RxDotsVertical />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARD ================= */}
      <div className="block md:hidden space-y-4">
        {users.map((user) => (
          <div key={user._id} className="border rounded-md p-3 shadow-sm">

            <div className="flex items-center gap-3">
              <img
                src={user.image}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold">{user.name}</h3>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>

            <div className="mt-2 text-sm space-y-1">
              <p><span className="font-medium">Role:</span> {user.role}</p>
              <p><span className="font-medium">Phone:</span> {user.phone}</p>
              <p><span className="font-medium">Address:</span> {user.address}</p>
            </div>

            <div className="flex justify-between items-center mt-3">
              <span className={user.isBanned ? "text-red-500" : "text-green-600"}>
                {user.isBanned ? "Banned" : "Active"}
              </span>

              <button onClick={() => handleOpenModal(user)}>
                <RxDotsVertical />
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* ================= MODAL ================= */}
      {modalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-5 rounded-md w-72 text-center space-y-4">

            <h3 className="font-semibold">
              {selectedUser.name}
            </h3>

            <button className="btn btn-neutral w-full">
              {selectedUser.isBanned ? "Unban User" : "Ban User"}
            </button>

            <button className="btn btn-error w-full">
              Delete User
            </button>

            <button onClick={handleCloseModal} className="btn w-full">
              Cancel
            </button>

          </div>
        </div>
      )}

      {users.length === 0 && (
        <p className="text-center mt-5 text-gray-500">
          No Users Found
        </p>
      )}
    </div>
  );
};

export default UsersPageAdmin;