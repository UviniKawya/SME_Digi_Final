import React, { useEffect, useState } from 'react';
import { api } from '../api/api.js';

export default function Sales() {
  const [salesData, setSalesData] = useState({
    sales: [],
    total: 0
  });

  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const loadSales = async () => {
    try {
      const data = await api.getSales();

      setSalesData({
        sales: Array.isArray(data?.sales) ? data.sales : [],
        total: data?.total ?? 0
      });

      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    loadSales();
  }, []);

  const addSale = async (event) => {
    event.preventDefault();

    try {
      await api.addSale({
        amount: Number(amount)
      });

      setAmount('');
      await loadSales();
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteSale = async (id) => {
    try {
      await api.deleteSale(id);
      await loadSales();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="page">
      <h1>Sales</h1>

      {error && <p className="error">{error}</p>}

      <div className="card">
        <form className="inline-form" onSubmit={addSale}>
          <input
            required
            type="number"
            min="0"
            step="0.01"
            placeholder="Sale amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <button className="primary" type="submit">
            Record Sale
          </button>
        </form>

        <h2>Total Sales: {Number(salesData.total).toFixed(2)}</h2>
      </div>

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {salesData.sales.length === 0 ? (
              <tr>
                <td colSpan="3">No sales recorded yet.</td>
              </tr>
            ) : (
              salesData.sales.map((sale) => (
                <tr key={sale.id}>
                  <td>{sale.amount}</td>
                  <td>{sale.created_at}</td>

                  <td>
                    <button
                      className="danger"
                      type="button"
                      onClick={() => deleteSale(sale.id)}
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