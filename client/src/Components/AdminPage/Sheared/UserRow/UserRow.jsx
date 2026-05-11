const UserRow = ({ user, onDelete, onBan, onView }) => {
  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>

      <td>
        {
          user.isBanned
            ? <span className="text-red-500">Banned</span>
            : <span className="text-green-500">Active</span>
        }
      </td>

      <td className="space-x-2">
        <button
          onClick={() => onView(user)}
          className="btn btn-sm btn-info"
        >
          View
        </button>

        <button
          onClick={() => onBan(user._id)}
          className="btn btn-sm btn-warning"
        >
          {user.isBanned ? "Unban" : "Ban"}
        </button>

        <button
          onClick={() => onDelete(user._id)}
          className="btn btn-sm btn-error"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default UserRow;