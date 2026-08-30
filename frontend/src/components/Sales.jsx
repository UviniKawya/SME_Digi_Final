import React, { useEffect, useState } from 'react';
import { api } from '../api/api.js';


const emptyForm = {
  id: null,
  product_name: '',
  quantity: '',
  unit_price: '',
  payment_method: 'Cash',
  sale_date: ''
};


export default function Sales() {

  const [salesData, setSalesData] =
    useState({
      sales: [],
      total: 0,
      count: 0,
      today_total: 0
    });


  const [form, setForm] =
    useState(emptyForm);

  const [editing, setEditing] =
    useState(false);

  const [error, setError] =
    useState('');

  const [success, setSuccess] =
    useState('');


  /* ============================
     LOAD SALES
  ============================ */

  const loadSales = async () => {

    try {

      const data =
        await api.getSales();


      setSalesData({

        sales:
          Array.isArray(data?.sales)
            ? data.sales
            : [],

        total:
          Number(data?.total || 0),

        count:
          Number(data?.count || 0),

        today_total:
          Number(data?.today_total || 0)

      });


      setError('');

    } catch (err) {

      setError(err.message);
    }
  };


  useEffect(() => {

    loadSales();

  }, []);


  /* ============================
     CALCULATED FORM TOTAL
  ============================ */

  const calculatedTotal =
    Number(form.quantity || 0) *
    Number(form.unit_price || 0);


  /* ============================
     AVERAGE SALE
  ============================ */

  const averageSale =
    salesData.count > 0
      ? salesData.total /
        salesData.count
      : 0;


  /* ============================
     SUBMIT SALE
  ============================ */

  const submitSale = async (event) => {

    event.preventDefault();

    setError('');
    setSuccess('');


    const payload = {

      product_name:
        form.product_name,

      quantity:
        Number(form.quantity),

      unit_price:
        Number(form.unit_price),

      payment_method:
        form.payment_method,

      sale_date:
        form.sale_date

    };


    try {

      if (editing) {

        await api.updateSale({
          ...payload,
          id: form.id
        });


        setSuccess(
          'Sale updated successfully.'
        );

      } else {

        await api.addSale(payload);


        setSuccess(
          'Sale recorded successfully.'
        );
      }


      setForm(emptyForm);

      setEditing(false);


      await loadSales();

    } catch (err) {

      setError(err.message);
    }
  };


  /* ============================
     EDIT SALE
  ============================ */

  const editSale = (sale) => {

    setForm({

      id:
        sale.id,

      product_name:
        sale.product_name || '',

      quantity:
        sale.quantity,

      unit_price:
        sale.unit_price,

      payment_method:
        sale.payment_method || 'Cash',

      sale_date:
        sale.sale_date ||
        sale.created_at?.slice(0, 10) ||
        ''

    });


    setEditing(true);

    setError('');

    setSuccess('');


    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };


  /* ============================
     CANCEL EDIT
  ============================ */

  const cancelEdit = () => {

    setForm(emptyForm);

    setEditing(false);

    setError('');

    setSuccess('');
  };


  /* ============================
     DELETE SALE
  ============================ */

  const deleteSale = async (id) => {

    const confirmed =
      window.confirm(
        'Delete this sale record?'
      );


    if (!confirmed) {

      return;
    }


    try {

      await api.deleteSale(id);


      setSuccess(
        'Sale deleted successfully.'
      );


      await loadSales();

    } catch (err) {

      setError(err.message);
    }
  };


  /* ============================
     PAGE
  ============================ */

  return (

    <div className="page">

      <h1>
        Sales Management
      </h1>


      <p className="muted">
        Record and manage business sales.
      </p>


      {/* ============================
          SALES SUMMARY
      ============================ */}

      <div className="grid3">


        <div className="card stat">

          <h3>
            Total Sales
          </h3>

          <strong>
            Rs. {salesData.total.toLocaleString()}
          </strong>

        </div>


        <div className="card stat">

          <h3>
            Number of Sales
          </h3>

          <strong>
            {salesData.count}
          </strong>

        </div>


        <div className="card stat">

          <h3>
            Today's Sales
          </h3>

          <strong>
            Rs. {salesData.today_total.toLocaleString()}
          </strong>

        </div>


        <div className="card stat">

          <h3>
            Average Sale
          </h3>

          <strong>
            Rs. {averageSale.toFixed(2)}
          </strong>

        </div>


      </div>


      {/* ============================
          MESSAGES
      ============================ */}

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


      {/* ============================
          RECORD / EDIT SALE
      ============================ */}

      <div className="card">

        <h2>

          {editing
            ? 'Edit Sale'
            : 'Record Sale'}

        </h2>


        <form
          className="inline-form"
          onSubmit={submitSale}
        >


          <input

            required

            placeholder="Product / Service"

            value={
              form.product_name
            }

            onChange={(e) =>
              setForm({
                ...form,
                product_name:
                  e.target.value
              })
            }

          />


          <input

            required

            type="number"

            min="0.01"

            step="0.01"

            placeholder="Quantity"

            value={
              form.quantity
            }

            onChange={(e) =>
              setForm({
                ...form,
                quantity:
                  e.target.value
              })
            }

          />


          <input

            required

            type="number"

            min="0"

            step="0.01"

            placeholder="Unit Price"

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


          <select

            value={
              form.payment_method
            }

            onChange={(e) =>
              setForm({
                ...form,
                payment_method:
                  e.target.value
              })
            }

          >

            <option>
              Cash
            </option>

            <option>
              Card
            </option>

            <option>
              Bank Transfer
            </option>

            <option>
              Digital Payment
            </option>

          </select>


          <input

            type="date"

            value={
              form.sale_date
            }

            onChange={(e) =>
              setForm({
                ...form,
                sale_date:
                  e.target.value
              })
            }

          />


          <div>

            <span className="muted">
              Total Amount
            </span>

            {' '}

            <strong>
              Rs. {calculatedTotal
                .toLocaleString()}
            </strong>

          </div>


          <button
            className="primary"
            type="submit"
          >

            {editing
              ? 'Update Sale'
              : 'Record Sale'}

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


      {/* ============================
          SALES HISTORY
      ============================ */}

      <div className="card">

        <h2>
          Sales History
        </h2>


        <table>

          <thead>

            <tr>

              <th>
                Product / Service
              </th>

              <th>
                Quantity
              </th>

              <th>
                Unit Price
              </th>

              <th>
                Total
              </th>

              <th>
                Payment
              </th>

              <th>
                Date
              </th>

              <th>
                Actions
              </th>

            </tr>

          </thead>


          <tbody>


            {salesData.sales.length === 0 ? (

              <tr>

                <td colSpan="7">

                  No sales recorded yet.

                </td>

              </tr>

            ) : (

              salesData.sales.map(
                (sale) => (

                  <tr key={sale.id}>


                    <td>

                      {sale.product_name}

                    </td>


                    <td>

                      {sale.quantity}

                    </td>


                    <td>

                      Rs. {Number(
                        sale.unit_price
                      ).toLocaleString()}

                    </td>


                    <td>

                      Rs. {Number(
                        sale.amount
                      ).toLocaleString()}

                    </td>


                    <td>

                      {sale.payment_method}

                    </td>


                    <td>

                      {sale.sale_date ||
                       sale.created_at?.slice(
                         0,
                         10
                       )}

                    </td>


                    <td>


                      <button

                        className="primary"

                        type="button"

                        onClick={() =>
                          editSale(sale)
                        }

                      >

                        Edit

                      </button>


                      {' '}


                      <button

                        className="danger"

                        type="button"

                        onClick={() =>
                          deleteSale(sale.id)
                        }

                      >

                        Delete

                      </button>


                    </td>


                  </tr>

                )
              )

            )}


          </tbody>

        </table>

      </div>


    </div>
  );
}