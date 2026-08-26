import React, { useEffect, useState } from 'react';
import { api } from '../api/api.js';

export default function Inventory() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    product_name: '',
    quantity: 0,
    reorder_level: 0,
    unit_price: 0
  });
  const [error, setError] = useState('');

  const loadInventory = async () => {
    try {
      const data = await api.getInventory();
      setItems(Array.isArray(data) ? data : []);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    loadInventory();
  }, []);

  const addProduct = async (event) => {
    event.preventDefault();

    try {
      await api.addInventory({
        product_name: form.product_name,
        quantity: Number(form.quantity),
        reorder_level: Number(form.reorder_level),
        unit_price: Number(form.unit_price)
      });

      setForm({
        product_name: '',
        quantity: 0,
        reorder_level: 0,
        unit_price: 0
      });

      await loadInventory();
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await api.deleteInventory(id);
      await loadInventory();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="page">
      <h1>Inventory</h1>

      {error && <p className="error">{error}</p>}

      <div className="card">
        <form className="inline-form" onSubmit={addProduct}>
          <input
            required
            placeholder="Product name"
            value={form.product_name}
            onChange={(e) =>
              setForm({ ...form, product_name: e.target.value })
            }
          />

          <input
            required
            type="number"
            min="0"
            placeholder="Quantity"
            value={form.quantity}
            onChange={(e) =>
              setForm({ ...form, quantity: e.target.value })
            }
          />

          <input
            required
            type="number"
            min="0"
            placeholder="Reorder level"
            value={form.reorder_level}
            onChange={(e) =>
              setForm({ ...form, reorder_level: e.target.value })
            }
          />

          <input
            required
            type="number"
            min="0"
            step="0.01"
            placeholder="Unit price"
            value={form.unit_price}
            onChange={(e) =>
              setForm({ ...form, unit_price: e.target.value })
            }
          />

          <button className="primary" type="submit">
            Add Product
          </button>
        </form>
      </div>

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Qty</th>
              <th>Reorder</th>
              <th>Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan="6">No inventory items yet.</td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id}>
                  <td>{item.product_name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.reorder_level}</td>
                  <td>{item.unit_price}</td>

                  <td>
                    {Number(item.quantity) <= Number(item.reorder_level) ? (
                      <span className="badge warn">Low stock</span>
                    ) : (
                      <span className="badge">OK</span>
                    )}
                  </td>

                  <td>
                    <button
                      className="danger"
                      type="button"
                      onClick={() => deleteProduct(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}