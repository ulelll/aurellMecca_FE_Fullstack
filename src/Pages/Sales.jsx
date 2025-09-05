import { useState } from "react";

export default function Sales() {
  const [items, setItems] = useState([
    // dummy 
    { id: 1, name: "Laptop A", qty: 1, price: 7500000 },
    { id: 2, name: "Mouse B", qty: 2, price: 200000 },
  ]);

  const subtotal = items.reduce((acc, item) => acc + item.qty * item.price, 0);
  const discount = 0; // dummy, nanti bisa input
  const ppn = subtotal * 0.11; // contoh 11%
  const total = subtotal - discount + ppn;

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Sales Transaction</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 bg-white shadow rounded-lg p-6">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Nomor Penjualan
          </label>
          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2"
            placeholder="AUTO-001"
            disabled
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Tanggal Penjualan
          </label>
          <input
            type="date"
            className="w-full border rounded-lg px-3 py-2"
            defaultValue="2025-09-05"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Diskon
          </label>
          <input
            type="number"
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Rp"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            PPN (%)
          </label>
          <input
            type="number"
            className="w-full border rounded-lg px-3 py-2"
            placeholder="11"
          />
        </div>
      </div>

      {/* Tabel produk */}
      <div className="overflow-x-auto bg-white shadow rounded-lg mb-6">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Produk</th>
              <th className="px-4 py-3">Qty</th>
              <th className="px-4 py-3">Harga</th>
              <th className="px-4 py-3">Subtotal</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">{item.name}</td>
                <td className="px-4 py-3">{item.qty}</td>
                <td className="px-4 py-3">
                  Rp {item.price.toLocaleString("id-ID")}
                </td>
                <td className="px-4 py-3">
                  Rp {(item.qty * item.price).toLocaleString("id-ID")}
                </td>
                <td className="px-4 py-3 flex justify-end">
                  <button className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary total */}
      <div className="bg-white shadow rounded-lg p-6 space-y-2 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span>Rp {subtotal.toLocaleString("id-ID")}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Diskon</span>
          <span>- Rp {discount.toLocaleString("id-ID")}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">PPN (11%)</span>
          <span>+ Rp {ppn.toLocaleString("id-ID")}</span>
        </div>
        <div className="flex justify-between font-semibold text-lg border-t pt-2">
          <span>Total</span>
          <span>Rp {total.toLocaleString("id-ID")}</span>
        </div>
      </div>

      <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow font-medium">
        Save Transaction
      </button>
    </div>
  );
}
