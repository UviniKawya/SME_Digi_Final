import React, { useEffect, useState } from 'react';
import { api } from '../api/api.js';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

import {
  Bar,
  Doughnut,
  Pie
} from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);


/* =====================================================
   ADMIN DASHBOARD
===================================================== */

export function AdminDashboard() {

  const [data, setData] = useState(null);
  const [error, setError] = useState('');


  useEffect(() => {

    const loadDashboard = async () => {

      try {

        const result = await api.adminDashboard();

        setData(result);

      } catch (err) {

        setError(err.message);
      }
    };

    loadDashboard();

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
        Loading Admin Dashboard...
      </div>
    );
  }


  /* =============================
     BUSINESS TYPE CHART
  ============================= */

  const industryChart = {

    labels:
      data.industries?.map(
        item => item.business_type
      ) || [],

    datasets: [
      {
        label: 'SMEs',
        data:
          data.industries?.map(
            item => Number(item.count)
          ) || [],

        backgroundColor: [
          '#8b5cf6',
          '#22c55e',
          '#f97316',
          '#3b82f6',
          '#ec4899'
        ],

        borderRadius: 8
      }
    ]
  };


  /* =============================
     LOCATION CHART
  ============================= */

  const locationChart = {

    labels:
      data.locations?.map(
        item => item.location
      ) || [],

    datasets: [
      {
        data:
          data.locations?.map(
            item => Number(item.count)
          ) || [],

        backgroundColor: [
          '#06b6d4',
          '#f59e0b'
        ],

        borderWidth: 0
      }
    ]
  };


  /* =============================
     ASSESSMENT COUNTS
  ============================= */

  const assessmentChart = {

    labels:
      data.assessment_types?.map(
        item => item.assessment_type
      ) || [],

    datasets: [
      {
        label: 'Assessments',

        data:
          data.assessment_types?.map(
            item => Number(item.count)
          ) || [],

        backgroundColor: [
          '#22c55e',
          '#f97316',
          '#8b5cf6'
        ],

        borderRadius: 8
      }
    ]
  };


  /* =============================
     READINESS LEVEL CHART
  ============================= */

  const readinessChart = {

    labels:
      data.readiness_levels?.map(
        item => item.level
      ) || [],

    datasets: [
      {
        data:
          data.readiness_levels?.map(
            item => Number(item.count)
          ) || [],

        backgroundColor: [
          '#ef4444',
          '#f59e0b',
          '#22c55e'
        ],

        borderWidth: 0
      }
    ]
  };


  return (

    <div className="page admin-dashboard-page">


      {/* HEADER */}

      <div className="admin-dashboard-header">

        <div>

          <p className="admin-small-title">
            SME DIGI ADMINISTRATION
          </p>

          <h1>
            Admin Dashboard
          </h1>

          <p>
            Overall monitoring of registered SMEs,
            assessments and business activity.
          </p>

        </div>

        <div className="admin-live-badge">
          ● LIVE SYSTEM
        </div>

      </div>


      {/* KPI CARDS */}

      <div className="admin-kpi-grid">


        <div className="admin-kpi admin-purple">

          <span>Total SMEs</span>

          <strong>
            {data.total_smes}
          </strong>

          <small>
            {data.active_smes} active SMEs
          </small>

        </div>


        <div className="admin-kpi admin-green">

          <span>Total Assessments</span>

          <strong>
            {data.total_assessments}
          </strong>

          <small>
            Across all SMEs
          </small>

        </div>


        <div className="admin-kpi admin-orange">

          <span>Average Readiness</span>

          <strong>
            {Number(
              data.average_scores?.Readiness || 0
            ).toFixed(2)}
          </strong>

          <small>
            Out of 5
          </small>

        </div>


        <div className="admin-kpi admin-pink">

          <span>Total Sales</span>

          <strong>
            Rs. {Number(
              data.sales?.total_sales || 0
            ).toLocaleString()}
          </strong>

          <small>
            {data.sales?.sales_records || 0}
            {' '}sales records
          </small>

        </div>


      </div>


      {/* CHART ROW ONE */}

      <div className="admin-dashboard-grid">


        <div className="admin-dark-panel admin-wide-panel">

          <div className="admin-panel-title">

            <div>
              <h2>SMEs by Industry / Business Type</h2>
              <p>
                Distribution of registered businesses
              </p>
            </div>

          </div>

          <div className="admin-chart-box">

            <Bar
              data={industryChart}

              options={{
                responsive: true,
                maintainAspectRatio: false,

                plugins: {
                  legend: {
                    display: false
                  }
                },

                scales: {

                  y: {
                    beginAtZero: true,

                    ticks: {
                      color: '#94a3b8'
                    },

                    grid: {
                      color:
                        'rgba(148,163,184,.12)'
                    }
                  },

                  x: {
                    ticks: {
                      color: '#cbd5e1'
                    },

                    grid: {
                      display: false
                    }
                  }
                }
              }}
            />

          </div>

        </div>


        <div className="admin-dark-panel">

          <div className="admin-panel-title">

            <div>
              <h2>SME Location</h2>
              <p>Urban vs Rural</p>
            </div>

          </div>


          <div className="admin-chart-box admin-pie-box">

            <Pie
              data={locationChart}

              options={{
                responsive: true,
                maintainAspectRatio: false,

                plugins: {

                  legend: {
                    position: 'bottom',

                    labels: {
                      color: '#cbd5e1'
                    }
                  }
                }
              }}
            />

          </div>

        </div>

      </div>


      {/* SECOND CHART ROW */}

      <div className="admin-dashboard-grid">


        <div className="admin-dark-panel">

          <div className="admin-panel-title">

            <div>
              <h2>Assessment Activity</h2>
              <p>
                Number of completed assessments
              </p>
            </div>

          </div>


          <div className="admin-chart-box">

            <Bar
              data={assessmentChart}

              options={{
                responsive: true,
                maintainAspectRatio: false,

                plugins: {
                  legend: {
                    display: false
                  }
                },

                scales: {

                  y: {
                    beginAtZero: true,

                    ticks: {
                      color: '#94a3b8'
                    },

                    grid: {
                      color:
                        'rgba(148,163,184,.12)'
                    }
                  },

                  x: {
                    ticks: {
                      color: '#cbd5e1'
                    },

                    grid: {
                      display: false
                    }
                  }
                }
              }}
            />

          </div>

        </div>


        <div className="admin-dark-panel">

          <div className="admin-panel-title">

            <div>
              <h2>Readiness Levels</h2>
              <p>
                Low, Moderate and High
              </p>
            </div>

          </div>


          <div className="admin-chart-box admin-pie-box">

            <Doughnut
              data={readinessChart}

              options={{
                responsive: true,
                maintainAspectRatio: false,

                cutout: '67%',

                plugins: {

                  legend: {
                    position: 'bottom',

                    labels: {
                      color: '#cbd5e1'
                    }
                  }
                }
              }}
            />

          </div>

        </div>

      </div>


      {/* MINI SUMMARY */}

      <div className="admin-mini-grid">


        <div className="admin-mini-box">

          <span>
            Avg. Readiness
          </span>

          <strong>
            {Number(
              data.average_scores?.Readiness || 0
            ).toFixed(2)}
          </strong>

        </div>


        <div className="admin-mini-box">

          <span>
            Avg. Barriers
          </span>

          <strong className="orange-text">
            {Number(
              data.average_scores?.Barrier || 0
            ).toFixed(2)}
          </strong>

        </div>


        <div className="admin-mini-box">

          <span>
            Avg. Performance
          </span>

          <strong className="purple-text">
            {Number(
              data.average_scores?.Performance || 0
            ).toFixed(2)}
          </strong>

        </div>


        <div className="admin-mini-box">

          <span>
            Low-stock Products
          </span>

          <strong className="red-text">
            {data.inventory?.low_stock || 0}
          </strong>

        </div>


      </div>


      {/* RECENT TABLES */}

      <div className="admin-dashboard-grid">


        <div className="admin-dark-panel admin-wide-panel">

          <div className="admin-panel-title">

            <div>
              <h2>Recent Assessments</h2>
              <p>
                Latest assessment activity
              </p>
            </div>

          </div>


          <div className="admin-table-wrap">

            <table className="admin-table">

              <thead>

                <tr>
                  <th>SME</th>
                  <th>Industry</th>
                  <th>Assessment</th>
                  <th>Score</th>
                  <th>Level</th>
                </tr>

              </thead>


              <tbody>

                {data.recent_assessments?.map(
                  row => (

                    <tr key={row.id}>

                      <td>
                        {row.sme_name}
                      </td>

                      <td>
                        {row.business_type}
                      </td>

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
                          className={`admin-level admin-level-${row.level?.toLowerCase()}`}
                        >
                          {row.level}
                        </span>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        </div>


        <div className="admin-dark-panel">

          <div className="admin-panel-title">

            <div>
              <h2>Recent SMEs</h2>
              <p>
                Latest registrations
              </p>
            </div>

          </div>


          <div className="recent-sme-list">

            {data.recent_smes?.map(
              sme => (

                <div
                  className="recent-sme-row"
                  key={sme.id}
                >

                  <div>

                    <strong>
                      {sme.sme_name}
                    </strong>

                    <small>
                      {sme.business_type}
                      {' · '}
                      {sme.location}
                    </small>

                  </div>

                  <span className="admin-active-dot">
                    {sme.status}
                  </span>

                </div>

              )
            )}

          </div>

        </div>

      </div>

    </div>
  );
}


/* =====================================================
   SME USERS
===================================================== */

export function SMEUsers() {

  const [users, setUsers] = useState([]);

  useEffect(() => {

    const load = async () => {

      try {

        const result =
          await api.adminSmes();

        setUsers(result);

      } catch {}
    };

    load();

  }, []);


  return (

    <div className="page">

      <h1>SME Users</h1>

      <div className="card">

        <table>

          <thead>

            <tr>
              <th>SME</th>
              <th>Owner</th>
              <th>Industry</th>
              <th>Location</th>
              <th>Status</th>
            </tr>

          </thead>


          <tbody>

            {users.map(row => (

              <tr key={row.id}>

                <td>{row.sme_name}</td>

                <td>{row.owner_name}</td>

                <td>{row.business_type}</td>

                <td>{row.location}</td>

                <td>{row.status}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}


/* =====================================================
   ADMIN ASSESSMENT RESULTS
===================================================== */

export function AdminResults() {

  const [results, setResults] =
    useState([]);

  useEffect(() => {

    const load = async () => {

      try {

        const result =
          await api.adminResults();

        setResults(result);

      } catch {}
    };

    load();

  }, []);


  return (

    <div className="page">

      <h1>Assessment Results</h1>

      <div className="card">

        <table>

          <thead>

            <tr>
              <th>SME</th>
              <th>Industry</th>
              <th>Type</th>
              <th>Score</th>
              <th>Level</th>
              <th>Date</th>
            </tr>

          </thead>


          <tbody>

            {results.map(row => (

              <tr key={row.id}>

                <td>
                  {row.sme_name}
                </td>

                <td>
                  {row.business_type}
                </td>

                <td>
                  {row.assessment_type}
                </td>

                <td>
                  {row.overall_score}
                </td>

                <td>
                  {row.level}
                </td>

                <td>
                  {row.created_at}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}