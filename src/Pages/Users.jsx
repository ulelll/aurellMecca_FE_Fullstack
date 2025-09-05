export default function Users() {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Users</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow text-sm">
          + Add User
        </button>
      </div>

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
            {/* Dummy rows contoh */}
            <tr className="border-t hover:bg-gray-50">
              <td className="px-4 py-3">1</td>
              <td className="px-4 py-3">john_doe</td>
              <td className="px-4 py-3">john@example.com</td>
              <td className="px-4 py-3">2025-09-05</td>
              <td className="px-4 py-3">
                <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-700">
                  Active
                </span>
              </td>
              <td className="px-4 py-3 flex justify-end space-x-2">
                <button className="text-blue-600 hover:underline">Edit</button>
                <button className="text-red-600 hover:underline">Delete</button>
              </td>
            </tr>
            <tr className="border-t hover:bg-gray-50">
              <td className="px-4 py-3">2</td>
              <td className="px-4 py-3">jane_doe</td>
              <td className="px-4 py-3">jane@example.com</td>
              <td className="px-4 py-3">2025-09-01</td>
              <td className="px-4 py-3">
                <span className="px-2 py-1 text-xs rounded bg-red-100 text-red-700">
                  Inactive
                </span>
              </td>
              <td className="px-4 py-3 flex justify-end space-x-2">
                <button className="text-blue-600 hover:underline">Edit</button>
                <button className="text-red-600 hover:underline">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
