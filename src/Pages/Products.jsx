import { useEffect, useState } from 'react';
import { useProductsStore } from '../api/products';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

export default function Products() {
  const { products, fetchProducts, createProduct, updateProduct, deleteProduct, meta, loading, error } =
    useProductsStore();

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    hpp: 0,
    stock: 0,
    status: 'Active',
    id: null,
  });

  useEffect(() => {
    fetchProducts(page, perPage, search);
  }, [page, perPage, search]);

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };

  const handleEdit = (product) => {
    setFormData({ ...product });
    setShowModal(true);
  };

  const handleAdd = () => {
    setFormData({ name: '', sku: '', hpp: 0, stock: 0, status: 'Active', id: null });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      updateProduct(formData.id, formData);
    } else {
      createProduct(formData);
    }
    setShowModal(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Products</h2>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow text-sm flex items-center space-x-1"
          onClick={handleAdd}
        >
          <FaPlus /> <span>Add Product</span>
        </button>
      </div>

      <div className="flex justify-between mb-2">
        <input
          type="text"
          placeholder="Search products..."
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
              <th className="px-4 py-3">SKU</th>
              <th className="px-4 py-3">Nama Produk</th>
              <th className="px-4 py-3">HPP</th>
              <th className="px-4 py-3">stock</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">{p.id}</td>
                <td className="px-4 py-3">{p.sku}</td>
                <td className="px-4 py-3">{p.name}</td>
                <td className="px-4 py-3">Rp {p.hpp}</td>
                <td className="px-4 py-3">{p.stock}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      p.status === 'available'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="px-4 py-3 flex justify-end space-x-2">
                  <button className="text-blue-600 hover:text-blue-800" onClick={() => handleEdit(p)}>
                    <FaEdit />
                  </button>
                  <button className="text-red-600 hover:text-red-800" onClick={() => handleDelete(p.id)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && !loading && (
              <tr>
                <td colSpan={7} className="text-center py-4">
                  No products found.
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

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow w-96">
            <h3 className="text-lg font-semibold mb-4">
              {formData.id ? 'Edit Product' : 'Add Product'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="SKU"
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                className="w-full border px-2 py-1 rounded"
                required
              />
              <input
                type="text"
                placeholder="Nama Produk"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border px-2 py-1 rounded"
                required
              />
              <input
                type="number"
                placeholder="HPP"
                value={formData.hpp}
                onChange={(e) => setFormData({ ...formData, hpp: Number(e.target.value) })}
                className="w-full border px-2 py-1 rounded"
                required
              />
              <input
                type="number"
                placeholder="stock"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
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
