const UserDetailsModal = ({ user, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-5 rounded w-[400px]">
        <h3 className="text-xl font-bold mb-3">User Details</h3>

        <p><b>Name:</b> {user.name}</p>
        <p><b>Email:</b> {user.email}</p>
        <p><b>Role:</b> {user.role}</p>
        <p><b>Status:</b> {user.isBanned ? "Banned" : "Active"}</p>

        <button
          onClick={onClose}
          className="btn btn-sm btn-primary mt-4"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default UserDetailsModal;