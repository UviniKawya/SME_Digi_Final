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
          <strong>{data.total_smes}</strong>
          <small>Registered SMEs</small>
        </div>

        <div className="admin-kpi admin-green">
          <span>Total Assessments</span>
          <strong>{data.total_assessments}</strong>
          <small>Across all SMEs</small>
        </div>

        <div className="admin-kpi admin-orange">
          <span>Pending Approvals</span>
          <strong>{data.pending_smes || 0}</strong>
          <small>Waiting for review</small>
        </div>

        <div className="admin-kpi admin-green">
          <span>Approved SMEs</span>
          <strong>{data.approved_smes || 0}</strong>
          <small>Approved accounts</small>
        </div>

        <div className="admin-kpi admin-pink">
          <span>Rejected SMEs</span>
          <strong>{data.rejected_smes || 0}</strong>
          <small>Rejected registrations</small>
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
   SME MANAGEMENT
===================================================== */

export function SMEUsers() {

  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState(null);
  const [editing, setEditing] = useState(null);
  const [message, setMessage] = useState('');

  const API_URL =
    'http://localhost/SME_Digi_Final/backend/api/admin_smes.php';


  const load = async () => {

    try {

      const result = await api.adminSmes();

      setUsers(result);

    } catch (err) {

      setMessage(err.message);

    }
  };


  useEffect(() => {

    load();

  }, []);


  /* =========================
     APPROVE / REJECT
  ========================= */

  const changeStatus = async (id, action) => {

    try {

      const response = await fetch(API_URL, {
        method: 'POST',

        credentials: 'include',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          id,
          action
        })
      });


      const result = await response.json();


      if (!response.ok) {
        throw new Error(
          result.error || 'Unable to update SME'
        );
      }


      setMessage(result.message);

      await load();

    } catch (err) {

      setMessage(err.message);

    }
  };


  /* =========================
     SAVE EDIT
  ========================= */

  const saveEdit = async () => {

    try {

      const response = await fetch(API_URL, {
        method: 'POST',

        credentials: 'include',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          ...editing,
          action: 'update'
        })
      });


      const result = await response.json();


      if (!response.ok) {
        throw new Error(
          result.error || 'Unable to update SME'
        );
      }


      setMessage(result.message);

      setEditing(null);

      await load();

    } catch (err) {

      setMessage(err.message);

    }
  };


  /* =========================
     FILTER
  ========================= */

  const filteredUsers =
    filter === 'All'
      ? users
      : users.filter(
        row => row.approval_status === filter
      );


  const count = status =>
    users.filter(
      row => row.approval_status === status
    ).length;


  return (

    <div className="page">

      <h1>SME Management</h1>

      <p className="muted">
        Review and manage registered SME accounts
      </p>

      {/* SME SUMMARY CARDS */}

      <div className="sme-summary-grid">

        <div className="sme-summary-card sme-summary-all">
          <div className="sme-summary-icon">●</div>
          <div>
            <span>All SMEs</span>
            <strong>{users.length}</strong>
            <small>Total registered SMEs</small>
          </div>
        </div>

        <div className="sme-summary-card sme-summary-pending">
          <div className="sme-summary-icon">◷</div>
          <div>
            <span>Pending</span>
            <strong>{count('Pending')}</strong>
            <small>Waiting for approval</small>
          </div>
        </div>

        <div className="sme-summary-card sme-summary-approved">
          <div className="sme-summary-icon">✓</div>
          <div>
            <span>Approved</span>
            <strong>{count('Approved')}</strong>
            <small>Approved SME accounts</small>
          </div>
        </div>

        <div className="sme-summary-card sme-summary-rejected">
          <div className="sme-summary-icon">×</div>
          <div>
            <span>Rejected</span>
            <strong>{count('Rejected')}</strong>
            <small>Rejected registrations</small>
          </div>
        </div>

      </div>
      {message && (
        <p className="success">
          {message}
        </p>
      )}


      {/* FILTER BUTTONS */}

      <div
        style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '20px',
          flexWrap: 'wrap'
        }}
      >

        {[
          ['All', users.length],
          ['Pending', count('Pending')],
          ['Approved', count('Approved')],
          ['Rejected', count('Rejected')]
        ].map(([name, total]) => (

          <button
            key={name}
            className={
              filter === name
                ? 'primary'
                : 'secondary'
            }
            onClick={() => setFilter(name)}
          >
            {name} ({total})
          </button>

        ))}

      </div>


      {/* SME TABLE */}

      <div className="card">

        <table>

          <thead>

            <tr>

              <th>SME</th>
              <th>Owner</th>
              <th>Industry</th>
              <th>Location</th>
              <th>Status</th>
              <th>Actions</th>

            </tr>

          </thead>


          <tbody>

            {filteredUsers.map(row => (

              <tr key={row.id}>

                <td>
                  {row.sme_name}
                </td>

                <td>
                  {row.owner_name}
                </td>

                <td>
                  {row.business_type}
                </td>

                <td>
                  {row.location}
                </td>

                <td>
                  <span
                    className={`approval-badge approval-${row.approval_status?.toLowerCase()}`}
                  >
                    {row.approval_status}
                  </span>
                </td>

                <td>

                  <div
                    style={{
                      display: 'flex',
                      gap: '6px',
                      flexWrap: 'wrap'
                    }}
                  >

                    <button
                      className="secondary"
                      onClick={() =>
                        setSelected(row)
                      }
                    >
                      View
                    </button>


                    <button
                      className="secondary"
                      onClick={() =>
                        setEditing({ ...row })
                      }
                    >
                      Edit
                    </button>


                    {row.approval_status !==
                      'Approved' && (

                        <button
                          className="primary"
                          onClick={() =>
                            changeStatus(
                              row.id,
                              'approve'
                            )
                          }
                        >
                          Approve
                        </button>

                      )}


                    {row.approval_status !==
                      'Rejected' && (

                        <button
                          className="danger"
                          onClick={() =>
                            changeStatus(
                              row.id,
                              'reject'
                            )
                          }
                        >
                          Reject
                        </button>

                      )}

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>


      {/* VIEW SME */}

      {selected && (

        <div className="card">

          <h2>SME Details</h2>

          <p>
            <strong>Business Name:</strong>{' '}
            {selected.sme_name}
          </p>

          <p>
            <strong>Owner:</strong>{' '}
            {selected.owner_name}
          </p>

          <p>
            <strong>Email:</strong>{' '}
            {selected.email}
          </p>

          <p>
            <strong>Business Type:</strong>{' '}
            {selected.business_type}
          </p>

          <p>
            <strong>Location:</strong>{' '}
            {selected.location}
          </p>

          <p>
            <strong>Employees:</strong>{' '}
            {selected.employees}
          </p>

          <p>
            <strong>Years in Operation:</strong>{' '}
            {selected.years_operation}
          </p>

          <p>
            <strong>Approval Status:</strong>{' '}
            {selected.approval_status}
          </p>


          <button
            className="secondary"
            onClick={() =>
              setSelected(null)
            }
          >
            Close
          </button>

        </div>

      )}


      {/* EDIT SME */}

      {editing && (

        <div className="card">

          <h2>Edit SME</h2>


          <label className="field">

            <span>Business Name</span>

            <input
              value={editing.sme_name}
              onChange={e =>
                setEditing({
                  ...editing,
                  sme_name: e.target.value
                })
              }
            />

          </label>


          <label className="field">

            <span>Owner Name</span>

            <input
              value={editing.owner_name}
              onChange={e =>
                setEditing({
                  ...editing,
                  owner_name: e.target.value
                })
              }
            />

          </label>


          <label className="field">

            <span>Email</span>

            <input
              type="email"
              value={editing.email}
              onChange={e =>
                setEditing({
                  ...editing,
                  email: e.target.value
                })
              }
            />

          </label>


          <label className="field">

            <span>Business Type</span>

            <select
              value={editing.business_type}
              onChange={e =>
                setEditing({
                  ...editing,
                  business_type:
                    e.target.value
                })
              }
            >

              <option>Retail</option>
              <option>Manufacturing</option>
              <option>Services</option>
              <option>Agriculture</option>
              <option>Industry</option>

            </select>

          </label>


          <label className="field">

            <span>Location</span>

            <select
              value={editing.location}
              onChange={e =>
                setEditing({
                  ...editing,
                  location: e.target.value
                })
              }
            >

              <option>Urban</option>
              <option>Rural</option>

            </select>

          </label>


          <label className="field">

            <span>Employees</span>

            <input
              type="number"
              value={editing.employees}
              onChange={e =>
                setEditing({
                  ...editing,
                  employees: e.target.value
                })
              }
            />

          </label>


          <label className="field">

            <span>Years in Operation</span>

            <input
              type="number"
              value={editing.years_operation}
              onChange={e =>
                setEditing({
                  ...editing,
                  years_operation:
                    e.target.value
                })
              }
            />

          </label>


          <label className="field">

            <span>Approval Status</span>

            <select
              value={editing.approval_status}
              onChange={e =>
                setEditing({
                  ...editing,
                  approval_status:
                    e.target.value
                })
              }
            >

              <option>Pending</option>
              <option>Approved</option>
              <option>Rejected</option>

            </select>

          </label>


          <div
            style={{
              display: 'flex',
              gap: '10px'
            }}
          >

            <button
              className="primary"
              onClick={saveEdit}
            >
              Save Changes
            </button>


            <button
              className="secondary"
              onClick={() =>
                setEditing(null)
              }
            >
              Cancel
            </button>

          </div>

        </div>

      )}

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

      } catch { }
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