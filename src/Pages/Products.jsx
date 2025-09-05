import ServerTable from "../components/ServerTable";

export default function Products() {
  const columns = [
    { key: "id", label: "ID" },
    { key: "sku", label: "SKU" },
    { key: "nama_produk", label: "Product Name" },
    { key: "hpp", label: "HPP" },
    { key: "stok", label: "Stock" },
    { key: "status", label: "Status" },
  ];

  const data = [
    { id: 1, sku: "PRD-001", nama_produk: "Laptop", hpp: "7,000,000", stok: 10, status: "active" },
    { id: 2, sku: "PRD-002", nama_produk: "Mouse", hpp: "150,000", stok: 50, status: "active" },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Products</h2>

      {/* Search bar */}
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="border px-3 py-2 rounded w-1/3"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          + Add Product
        </button>
      </div>

      <ServerTable columns={columns} data={data} />

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-600">Showing 1–2 of 2</p>
        <div className="space-x-2">
          <button className="px-3 py-1 border rounded bg-gray-100">Prev</button>
          <button className="px-3 py-1 border rounded bg-gray-100">Next</button>
        </div>
      </div>
    </div>
  );
}
