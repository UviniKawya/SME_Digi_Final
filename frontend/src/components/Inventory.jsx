import React, { useEffect, useState } from 'react';
import { api } from '../api/api.js';


const emptyForm = {
  id: null,
  product_name: '',
  category: 'Raw Material',
  quantity: '',
  unit: 'kg',
  reorder_level: '',
  unit_price: ''
};


export default function Inventory() {

  const [items, setItems] = useState([]);

  const [form, setForm] =
    useState(emptyForm);

  const [editing, setEditing] =
    useState(false);

  const [error, setError] =
    useState('');

  const [success, setSuccess] =
    useState('');


  /* =================================
     LOAD INVENTORY
  ================================= */

  const loadInventory = async () => {

    try {

      const data =
        await api.getInventory();

      setItems(
        Array.isArray(data)
          ? data
          : []
      );

      setError('');

    } catch (err) {

      setError(err.message);
    }
  };


  useEffect(() => {
    loadInventory();
  }, []);


  /* =================================
     SUMMARY VALUES
  ================================= */

  const totalItems =
    items.length;


  const lowStockItems =
    items.filter(
      item =>
        Number(item.quantity) <=
        Number(item.reorder_level)
    ).length;


  const inventoryValue =
    items.reduce(
      (total, item) =>
        total +
        (
          Number(item.quantity) *
          Number(item.unit_price)
        ),
      0
    );


  /* =================================
     SUBMIT ADD / UPDATE
  ================================= */

  const submitItem = async (event) => {

    event.preventDefault();

    setError('');
    setSuccess('');


    const payload = {

      product_name:
        form.product_name,

      category:
        form.category,

      quantity:
        Number(form.quantity),

      unit:
        form.unit,

      reorder_level:
        Number(form.reorder_level),

      unit_price:
        Number(form.unit_price)
    };


    try {

      if (editing) {

        await api.updateInventory({
          ...payload,
          id: form.id
        });

        setSuccess(
          'Inventory item updated successfully.'
        );

      } else {

        await api.addInventory(
          payload
        );

        setSuccess(
          'Inventory item added successfully.'
        );
      }


      setForm(emptyForm);

      setEditing(false);

      await loadInventory();


    } catch (err) {

      setError(err.message);
    }
  };


  /* =================================
     EDIT
  ================================= */

  const editItem = (item) => {

    setForm({

      id: item.id,

      product_name:
        item.product_name,

      category:
        item.category || 'Other',

      quantity:
        item.quantity,

      unit:
        item.unit || 'pcs',

      reorder_level:
        item.reorder_level,

      unit_price:
        item.unit_price
    });


    setEditing(true);

    setSuccess('');
    setError('');


    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };


  /* =================================
     CANCEL EDIT
  ================================= */

  const cancelEdit = () => {

    setForm(emptyForm);

    setEditing(false);

    setError('');
  };


  /* =================================
     DELETE
  ================================= */

  const deleteItem = async (id) => {

    const confirmDelete =
      window.confirm(
        'Delete this inventory item?'
      );


    if (!confirmDelete) {
      return;
    }


    try {

      await api.deleteInventory(id);

      setSuccess(
        'Inventory item deleted.'
      );

      await loadInventory();

    } catch (err) {

      setError(err.message);
    }
  };


  /* =================================
     STOCK STATUS
  ================================= */

  const getStatus = (item) => {

    const quantity =
      Number(item.quantity);

    const reorder =
      Number(item.reorder_level);


    if (quantity <= 0) {
      return 'Out of Stock';
    }


    if (quantity <= reorder) {
      return 'Low Stock';
    }


    return 'In Stock';
  };


  return (

    <div className="page">

      <h1>Inventory Management</h1>

      <p className="muted">
        Manage raw materials, finished products
        and packaging items.
      </p>


      {/* ==========================
          SUMMARY
      ========================== */}

      <div className="grid3">

        <div className="card stat">

          <h3>Total Items</h3>

          <strong>
            {totalItems}
          </strong>

        </div>


        <div className="card stat">

          <h3>Low Stock</h3>

          <strong>
            {lowStockItems}
          </strong>

        </div>


        <div className="card stat">

          <h3>Inventory Value</h3>

          <strong>
            Rs. {inventoryValue.toLocaleString()}
          </strong>

        </div>

      </div>


      {error && (
        <p className="error">
          {error}
        </p>
      )}


      {success && (
        <p className="success">
          {success}
        </p>
      )}


      {/* ==========================
          ADD / EDIT FORM
      ========================== */}

      <div className="card">

        <h2>
          {editing
            ? 'Edit Inventory Item'
            : 'Add Inventory Item'}
        </h2>


        <form
          className="inline-form"
          onSubmit={submitItem}
        >


          <input
            required
            placeholder="Item name"
            value={form.product_name}

            onChange={(e) =>
              setForm({
                ...form,
                product_name:
                  e.target.value
              })
            }
          />


          <select
            value={form.category}

            onChange={(e) =>
              setForm({
                ...form,
                category:
                  e.target.value
              })
            }
          >

            <option>
              Raw Material
            </option>

            <option>
              Finished Product
            </option>

            <option>
              Packaging
            </option>

            <option>
              Other
            </option>

          </select>


          <input
            required
            type="number"
            min="0"
            step="0.01"

            placeholder="Quantity"

            value={form.quantity}

            onChange={(e) =>
              setForm({
                ...form,
                quantity:
                  e.target.value
              })
            }
          />


          <select
            value={form.unit}

            onChange={(e) =>
              setForm({
                ...form,
                unit:
                  e.target.value
              })
            }
          >

            <option value="kg">
              kg
            </option>

            <option value="g">
              g
            </option>

            <option value="L">
              L
            </option>

            <option value="ml">
              ml
            </option>

            <option value="pcs">
              pcs
            </option>

            <option value="packs">
              packs
            </option>

          </select>


          <input
            required
            type="number"
            min="0"
            step="0.01"

            placeholder="Reorder level"

            value={
              form.reorder_level
            }

            onChange={(e) =>
              setForm({
                ...form,
                reorder_level:
                  e.target.value
              })
            }
          />


          <input
            required
            type="number"
            min="0"
            step="0.01"

            placeholder="Unit price"

            value={
              form.unit_price
            }

            onChange={(e) =>
              setForm({
                ...form,
                unit_price:
                  e.target.value
              })
            }
          />


          <button
            className="primary"
            type="submit"
          >

            {editing
              ? 'Update Item'
              : 'Add Item'}

          </button>


          {editing && (

            <button
              type="button"
              onClick={cancelEdit}
            >
              Cancel
            </button>

          )}

        </form>

      </div>


      {/* ==========================
          INVENTORY TABLE
      ========================== */}

      <div className="card">

        <h2>
          Current Inventory
        </h2>


        <table>

          <thead>

            <tr>

              <th>Item</th>

              <th>Category</th>

              <th>Quantity</th>

              <th>Reorder Level</th>

              <th>Unit Price</th>

              <th>Stock Value</th>

              <th>Status</th>

              <th>Actions</th>

            </tr>

          </thead>


          <tbody>

            {items.length === 0 ? (

              <tr>

                <td colSpan="8">
                  No inventory items yet.
                </td>

              </tr>

            ) : (

              items.map((item) => {

                const status =
                  getStatus(item);

                const value =
                  Number(item.quantity) *
                  Number(item.unit_price);


                return (

                  <tr key={item.id}>

                    <td>
                      {item.product_name}
                    </td>


                    <td>
                      {item.category}
                    </td>


                    <td>
                      {item.quantity}
                      {' '}
                      {item.unit}
                    </td>


                    <td>
                      {item.reorder_level}
                      {' '}
                      {item.unit}
                    </td>


                    <td>
                      Rs. {Number(
                        item.unit_price
                      ).toLocaleString()}
                    </td>


                    <td>
                      Rs. {value.toLocaleString()}
                    </td>


                    <td>

                      {status ===
                      'Out of Stock' ? (

                        <span className="badge warn">
                          Out of Stock
                        </span>

                      ) : status ===
                        'Low Stock' ? (

                        <span className="badge warn">
                          Low Stock
                        </span>

                      ) : (

                        <span className="badge">
                          In Stock
                        </span>

                      )}

                    </td>


                    <td>

                      <button
                        type="button"
                        className="primary"
                        onClick={() =>
                          editItem(item)
                        }
                      >
                        Edit
                      </button>

                      {' '}

                      <button
                        type="button"
                        className="danger"
                        onClick={() =>
                          deleteItem(item.id)
                        }
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                );

              })

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}