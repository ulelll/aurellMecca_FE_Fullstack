import { useEffect, useState } from "react";
import { useTransactionsStore } from "../api/transactions";
import { useProductsStore } from "../api/products";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

export default function Transactions() {
  const {
    transactions,
    fetchTransactions,
    createTransaction,
    deleteTransaction,
    meta = { current_page: 1, last_page: 1 },
    loading,
    error,
  } = useTransactionsStore();
  const { products, fetchProducts } = useProductsStore();

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    items: [],
    discount_type: "percent",
    discount_value: 0,
    tax_value: 0,
    status: "completed",
  });

  // Format Rupiah
  const formatRupiah = (value) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);

  useEffect(() => {
    fetchTransactions(page, perPage, search);
    fetchProducts();
  }, [page, perPage, search]);

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this transaction?")) {
      deleteTransaction(id);
    }
  };

  const handleAdd = () => {
    setFormData({
      items: [],
      discount_type: "percent",
      discount_value: 0,
      tax_value: 0,
      status: "completed",
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createTransaction(formData);
    setShowModal(false);
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;
    setFormData({ ...formData, items: newItems });
  };

  const addItem = () =>
    setFormData({
      ...formData,
      items: [...formData.items, { product_id: "", qty: 1 }],
    });

  const removeItem = (index) => {
    const newItems = [...formData.items];
    newItems.splice(index, 1);
    setFormData({ ...formData, items: newItems });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Transactions</h2>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow text-sm flex items-center space-x-1"
          onClick={handleAdd}
        >
          <FaPlus /> <span>Add Transaction</span>
        </button>
      </div>

      <div className="flex justify-between mb-2">
        <input
          type="text"
          placeholder="Search transactions..."
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
              <th className="px-4 py-3">No Transaksi</th>
              <th className="px-4 py-3">Tanggal</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">{t.id}</td>
                <td className="px-4 py-3">{t.no_penjualan}</td>
                <td className="px-4 py-3">
                  {new Date(t.created_at).toLocaleDateString("id-ID")}
                </td>
                <td className="px-4 py-3">{formatRupiah(t.final_price)}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      t.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : t.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {t.status}
                  </span>
                </td>
                <td className="px-4 py-3 flex justify-end space-x-2">
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleDelete(t.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
            {transactions.length === 0 && !loading && (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-4 space-x-2">
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>
        <span>
          {meta?.current_page || 1} / {meta?.last_page || 1}
        </span>
        <button
          disabled={page >= (meta?.last_page || 1)}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow w-96 max-h-[90vh] overflow-auto">
            <h3 className="text-lg font-semibold mb-4">Add Transaction</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              {formData.items.map((item, idx) => (
                <div key={idx} className="flex space-x-2 items-center">
                  <select
                    className="border px-2 py-1 rounded flex-1"
                    value={item.product_id}
                    onChange={(e) =>
                      handleItemChange(idx, "product_id", e.target.value)
                    }
                  >
                    <option value="">Select product</option>
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} (stock: {p.stock})
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    min={1}
                    value={item.qty}
                    onChange={(e) =>
                      handleItemChange(idx, "qty", e.target.value)
                    }
                    className="border px-2 py-1 rounded w-20"
                  />
                  <button
                    type="button"
                    onClick={() => removeItem(idx)}
                    className="text-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addItem}
                className="text-blue-600 flex items-center space-x-1"
              >
                <FaPlus /> <span>Add Item</span>
              </button>

              {/* Diskon & PPN */}
              <div className="flex space-x-2">
                <select
                  value={formData.discount_type}
                  onChange={(e) =>
                    setFormData({ ...formData, discount_type: e.target.value })
                  }
                  className="border px-2 py-1 rounded"
                >
                  <option value="percent">Percent</option>
                  <option value="value">Value</option>
                </select>
                <input
                  type="number"
                  value={formData.discount_value}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      discount_value: Number(e.target.value),
                    })
                  }
                  className="border px-2 py-1 rounded flex-1"
                  placeholder="Discount"
                />
                <input
                  type="number"
                  value={formData.tax_value}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      tax_value: Number(e.target.value),
                    })
                  }
                  className="border px-2 py-1 rounded flex-1"
                  placeholder="PPN"
                />
              </div>

              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="w-full border px-2 py-1 rounded"
              >
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="canceled">Canceled</option>
              </select>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-3 py-1 border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 bg-blue-600 text-white rounded"
                >
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
