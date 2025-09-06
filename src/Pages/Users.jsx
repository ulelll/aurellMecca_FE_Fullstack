import { useEffect, useState } from 'react';
import { useUsersStore } from '../api/users';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

export default function Users() {
  const { users, fetchUsers, createUser, updateUser, deleteUser, meta, loading, error } =
    useUsersStore();

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ username: '', email: '', status: 'Active', id: null });

  useEffect(() => {
    fetchUsers(page, perPage, search);
  }, [page, perPage, search]);

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this user?')) {
      deleteUser(id);
    }
  };

  const handleEdit = (user) => {
    setFormData({ ...user });
    setShowModal(true);
  };

  const handleAdd = () => {
    setFormData({ username: '', email: '', status: 'Active', id: null });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      updateUser(formData.id, formData);
    } else {
      createUser(formData);
    }
    setShowModal(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Users</h2>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow text-sm flex items-center space-x-1"
          onClick={handleAdd}
        >
          <FaPlus /> <span>Add User</span>
        </button>
      </div>

      <div className="flex justify-between mb-2">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-2 py-1 rounded"
        />
        <select
          value={perPage}
          onChange={(e) => setPerPage(Number(e.target.value))}
          className="border px-2 py-1 rounded"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
        </select>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Username</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Last Login</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">{u.id}</td>
                <td className="px-4 py-3">{u.username}</td>
                <td className="px-4 py-3">{u.email}</td>
                <td className="px-4 py-3">{u.last_login || '-'}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      u.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {u.status}
                  </span>
                </td>
                <td className="px-4 py-3 flex justify-end space-x-2">
                  <button className="text-blue-600 hover:text-blue-800" onClick={() => handleEdit(u)}>
                    <FaEdit />
                  </button>
                  <button className="text-red-600 hover:text-red-800" onClick={() => handleDelete(u.id)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && !loading && (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-4 space-x-2">
        <button
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          {meta.current_page || 1} / {meta.last_page || 1}
        </span>
        <button
          disabled={page >= (meta.last_page || 1)}
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Modal Add/Edit */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow w-96">
            <h3 className="text-lg font-semibold mb-4">{formData.id ? 'Edit User' : 'Add User'}</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full border px-2 py-1 rounded"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full border px-2 py-1 rounded"
                required
              />
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full border px-2 py-1 rounded"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-3 py-1 border rounded"
                >
                  Cancel
                </button>
                <button type="submit" className="px-3 py-1 bg-blue-600 text-white rounded">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
