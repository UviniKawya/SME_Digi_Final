 import React, { useEffect, useState } from 'react';
import { api } from '../api/api.js';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

import {
  Bar,
  Doughnut,
  Line
} from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler
);

export default function Dashboard() {
  console.log("DASHBOARD TEST");

  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.dashboard()
      .then(setData)
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return (
      <div className="page">
        <p className="error">{error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="page">
        Loading dashboard...
      </div>
    );
  }

  const readiness = data.latest?.Readiness;
  const barrier = data.latest?.Barrier;
  const performance = data.latest?.Performance;

  const readinessDimensions =
    data.dimensions?.Readiness || [];

const weeklySales =
  data.sales?.weekly_sales || [];

  /* ============================
     READINESS BAR CHART
  ============================ */

  const readinessChart = {
    labels: readinessDimensions.map(
      (item) => item.dimension
    ),

    datasets: [
      {
        label: 'Readiness Score',

        data: readinessDimensions.map(
          (item) => item.score
        ),

        backgroundColor: [
          '#22c55e',
          '#3b82f6',
          '#8b5cf6',
          '#f59e0b',
          '#14b8a6'
        ],

        borderRadius: 8
      }
    ]
  };

  /* ============================
     ASSESSMENT DOUGHNUT
  ============================ */

  const overallChart = {

    labels: [
      'Readiness',
      'Barriers',
      'Performance'
    ],

    datasets: [
      {
        data: [
          readiness?.overall_score || 0,
          barrier?.overall_score || 0,
          performance?.overall_score || 0
        ],

        backgroundColor: [
          '#22c55e',
          '#f97316',
          '#8b5cf6'
        ],

        borderColor: [
          '#22c55e',
          '#f97316',
          '#8b5cf6'
        ],

        borderWidth: 1
      }
    ]
  };

  /* ============================
     SALES LINE CHART
  ============================ */

const salesChart = {
  labels: weeklySales.map(
    (item) => item.week
  ),

  datasets: [
    {
      label: 'Weekly Sales',

      data: weeklySales.map(
        (item) => item.total
      ),

      borderColor: '#38bdf8',

      backgroundColor:
        'rgba(56,189,248,0.12)',

      pointBackgroundColor: '#38bdf8',

      pointBorderColor: '#38bdf8',

      pointRadius: 6,

      borderWidth: 3,

      tension: 0.4,

      fill: false,

      showLine: weeklySales.length > 1
    }
  ]
};

  const darkChartOptions = {

    responsive: true,

    maintainAspectRatio: false,

    plugins: {

      legend: {
        display: false
      },

      tooltip: {
        enabled: true
      }
    },

    scales: {

      x: {
        ticks: {
          color: '#94a3b8'
        },

        grid: {
          color: 'rgba(255,255,255,0.04)'
        }
      },

      y: {

        beginAtZero: true,

        ticks: {
          color: '#94a3b8'
        },

        grid: {
          color: 'rgba(255,255,255,0.06)'
        }
      }
    }
  };

  return (

    <div className="page sme-dashboard-page">

      {/* ============================
          HEADER
      ============================ */}

      <div className="sme-dashboard-header">

        <div>

          <p className="sme-dashboard-label">
            SME DIGITAL MANAGEMENT
          </p>

          <h1>
            Business Dashboard
          </h1>

          <p>
            Welcome back,{' '}
            <strong>
              {data.profile?.sme_name}
            </strong>
          </p>

          <span className="sme-type-badge">
            {data.profile?.business_type}
          </span>

        </div>

        <div className="sme-system-status">
          ● System Active
        </div>

      </div>


      {/* ============================
          KPI CARDS
      ============================ */}

      <div className="sme-kpi-grid">

        <div className="sme-kpi sme-readiness-card">

          <div className="sme-kpi-icon">
            ✓
          </div>

          <div>

            <span>
              DIGITAL READINESS
            </span>

            <strong>
              {readiness
                ? Number(
                    readiness.overall_score
                  ).toFixed(2)
                : '--'}
            </strong>

            <small>
              {readiness
                ? readiness.level
                : 'Not completed'}
            </small>

          </div>

        </div>


        <div className="sme-kpi sme-barrier-card">

          <div className="sme-kpi-icon">
            !
          </div>

          <div>

            <span>
              DIGITAL BARRIERS
            </span>

            <strong>
              {barrier
                ? Number(
                    barrier.overall_score
                  ).toFixed(2)
                : '--'}
            </strong>

            <small>
              {barrier
                ? barrier.level
                : 'Not completed'}
            </small>

          </div>

        </div>


        <div className="sme-kpi sme-performance-card">

          <div className="sme-kpi-icon">
            ↗
          </div>

          <div>

            <span>
              BUSINESS PERFORMANCE
            </span>

            <strong>
              {performance
                ? Number(
                    performance.overall_score
                  ).toFixed(2)
                : '--'}
            </strong>

            <small>
              {performance
                ? performance.level
                : 'Not completed'}
            </small>

          </div>

        </div>


        <div className="sme-kpi sme-stock-card">

          <div className="sme-kpi-icon">
            ▣
          </div>

          <div>

            <span>
              LOW STOCK
            </span>

            <strong>
              {data.inventory?.low_stock_count || 0}
            </strong>

            <small>
              Items require attention
            </small>

          </div>

        </div>

      </div>


      {/* ============================
          READINESS + OVERVIEW
      ============================ */}

      <div className="sme-dashboard-grid">

        <div className="sme-dark-panel">

          <div className="sme-panel-heading">

            <div>

              <h2>
                Digital Readiness
              </h2>

              <p>
                Readiness score by dimension
              </p>

            </div>

          </div>


          <div className="sme-chart-box">

            {readinessDimensions.length > 0 ? (

              <Bar
                data={readinessChart}

                options={{
                  ...darkChartOptions,

                  scales: {

                    x: {
                      ticks: {
                        color: '#94a3b8'
                      },

                      grid: {
                        display: false
                      }
                    },

                    y: {
                      beginAtZero: true,
                      max: 5,

                      ticks: {
                        color: '#94a3b8',
                        stepSize: 1
                      },

                      grid: {
                        color:
                          'rgba(255,255,255,0.06)'
                      }
                    }
                  }
                }}
              />

            ) : (

              <div className="sme-empty-state">

                Complete the Digital Readiness
                assessment to view your readiness
                chart.

              </div>

            )}

          </div>

        </div>


        <div className="sme-dark-panel">

          <div className="sme-panel-heading">

            <div>

              <h2>
                Assessment Overview
              </h2>

              <p>
                Latest assessment scores
              </p>

            </div>

          </div>


          <div className="sme-doughnut-box">

            <Doughnut
              data={overallChart}

              options={{

                responsive: true,

                maintainAspectRatio: false,

                cutout: '68%',

                plugins: {

                  legend: {

                    position: 'bottom',

                    labels: {
                      color: '#cbd5e1',
                      padding: 15
                    }
                  },

                  tooltip: {
                    enabled: true
                  }
                }
              }}
            />

          </div>

        </div>

      </div>


      {/* ============================
          SALES + INVENTORY
      ============================ */}

      <div className="sme-dashboard-grid">

        <div className="sme-dark-panel">

          <div className="sme-panel-heading">

            <div>

              <h2>
                Sales Performance
              </h2>

              <p>
                Recent weekly sales activity
              </p>

            </div>


            <div className="sme-sales-total">

              <span>
                TOTAL SALES
              </span>

              <strong>
                Rs. {Number(
                  data.sales?.total_sales || 0
                ).toLocaleString()}
              </strong>

            </div>

          </div>


          <div className="sme-chart-box">

            {weeklySales.length > 0 ? (

              <Line
                data={salesChart}
                options={darkChartOptions}
              />

            ) : (

              <div className="sme-empty-state">

                Record sales to view your
                sales performance chart.

              </div>

            )}

          </div>

        </div>


        <div className="sme-dark-panel">

          <div className="sme-panel-heading">

            <div>

              <h2>
                Inventory Overview
              </h2>

              <p>
                Current inventory condition
              </p>

            </div>

          </div>


          <div className="sme-inventory-grid">

            <div className="sme-inventory-box">

              <span>
                TOTAL PRODUCTS
              </span>

              <strong>
                {data.inventory?.total_products || 0}
              </strong>

            </div>


            <div className="sme-inventory-box">

              <span>
                INVENTORY VALUE
              </span>

              <strong>
                Rs. {Number(
                  data.inventory?.inventory_value || 0
                ).toLocaleString()}
              </strong>

            </div>


            <div className="sme-inventory-box sme-low-stock-box">

              <span>
                LOW STOCK
              </span>

              <strong>
                {data.inventory?.low_stock_count || 0}
              </strong>

            </div>

          </div>


          <div className="sme-low-stock-list">

            <h3>
              Low Stock Products
            </h3>

            {data.inventory?.low_stock_items?.length > 0 ? (

              data.inventory.low_stock_items.map(
                (item) => (

                  <div
                    className="sme-stock-row"
                    key={item.id}
                  >

                    <div>

                      <strong>
                        {item.product_name}
                      </strong>

                      <small>
                        Reorder level:{' '}
                        {item.reorder_level}
                      </small>

                    </div>

                    <span>
                      {item.quantity} left
                    </span>

                  </div>

                )
              )

            ) : (

              <p className="sme-muted">
                No low-stock products.
              </p>

            )}

          </div>

        </div>

      </div>


      {/* ============================
          HISTORY + RECENT SALES
      ============================ */}

      <div className="sme-dashboard-grid">

        <div className="sme-dark-panel">

          <div className="sme-panel-heading">

            <div>

              <h2>
                Recent Assessments
              </h2>

              <p>
                Latest assessment activity
              </p>

            </div>

          </div>


          <div className="sme-table-wrap">

            <table className="sme-dashboard-table">

              <thead>

                <tr>
                  <th>Assessment</th>
                  <th>Score</th>
                  <th>Level</th>
                  <th>Date</th>
                </tr>

              </thead>

              <tbody>

                {data.assessment_history?.length > 0 ? (

                  data.assessment_history.map(
                    (row, index) => (

                      <tr key={index}>

                        <td>
                          {row.assessment_type}
                        </td>

                        <td>
                          {Number(
                            row.overall_score
                          ).toFixed(2)}
                        </td>

                        <td>

                          <span
                            className={
                              `sme-level sme-level-${row.level
                                ?.toLowerCase()}`
                            }
                          >
                            {row.level}
                          </span>

                        </td>

                        <td>
                          {new Date(
                            row.created_at
                          ).toLocaleDateString()}
                        </td>

                      </tr>

                    )
                  )

                ) : (

                  <tr>

                    <td colSpan="4">
                      No assessment history yet.
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>


        <div className="sme-dark-panel">

          <div className="sme-panel-heading">

            <div>

              <h2>
                Recent Sales
              </h2>

              <p>
                Latest recorded transactions
              </p>

            </div>

          </div>


          <div className="sme-table-wrap">

            <table className="sme-dashboard-table">

              <thead>

                <tr>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>

              </thead>

              <tbody>

                {data.sales?.recent_sales?.length > 0 ? (

                  data.sales.recent_sales.map(
                    (sale) => (

                      <tr key={sale.id}>

                        <td>
                          Rs. {Number(
                            sale.amount
                          ).toLocaleString()}
                        </td>

                        <td>
                        {new Date(
  sale.sale_date
).toLocaleDateString()}
                        </td>

                      </tr>

                    )
                  )

                ) : (

                  <tr>

                    <td colSpan="2">
                      No sales recorded yet.
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>


      {/* ============================
          LATEST ANNOUNCEMENTS
      ============================ */}

      {data.announcements && data.announcements.length > 0 && (

        <div className="sme-dark-panel ann-dashboard-panel">

          <div className="sme-panel-heading">

            <div>
              <h2>Latest Announcements</h2>
              <p>Updates from the SME Digi team</p>
            </div>

          </div>


          <div className="ann-dashboard-list">

            {data.announcements.map((ann) => (

              <div className="ann-dashboard-item" key={ann.id}>

                <div className="ann-dashboard-item-header">

                  <strong>{ann.title}</strong>

                  <span className="sme-muted ann-dashboard-date">
                    {new Date(ann.created_at).toLocaleString()}
                  </span>

                </div>

                <p className="ann-dashboard-msg">{ann.message}</p>

              </div>

            ))}

          </div>

        </div>

      )}

    </div>
  );
}