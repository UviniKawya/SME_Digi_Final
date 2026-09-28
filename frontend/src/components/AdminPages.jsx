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

        <div className="sme-modal-overlay">

          <div className="sme-modal sme-view-modal">

            <div className="sme-modal-header">

              <div>
                <h2>SME Details</h2>
                <p>Registered SME account information</p>
              </div>

              <button
                className="sme-modal-close"
                onClick={() => setSelected(null)}
                type="button"
              >
                ×
              </button>

            </div>


            <div className="sme-view-grid">

              <div className="sme-detail-item">
                <span>Business Name</span>
                <strong>{selected.sme_name}</strong>
              </div>

              <div className="sme-detail-item">
                <span>Owner Name</span>
                <strong>{selected.owner_name}</strong>
              </div>

              <div className="sme-detail-item">
                <span>Email</span>
                <strong>{selected.email}</strong>
              </div>

              <div className="sme-detail-item">
                <span>Business Type</span>
                <strong>{selected.business_type}</strong>
              </div>

              <div className="sme-detail-item">
                <span>Location</span>
                <strong>{selected.location}</strong>
              </div>

              <div className="sme-detail-item">
                <span>Employees</span>
                <strong>{selected.employees}</strong>
              </div>

              <div className="sme-detail-item">
                <span>Years in Operation</span>
                <strong>{selected.years_operation}</strong>
              </div>

              <div className="sme-detail-item">
                <span>Approval Status</span>

                <span
                  className={`approval-badge approval-${selected.approval_status?.toLowerCase()}`}
                >
                  {selected.approval_status}
                </span>
              </div>

            </div>


            <div className="sme-view-actions">

              <button
                className="secondary"
                onClick={() => setSelected(null)}
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}


      {/* EDIT SME */}

      {editing && (

        <div className="sme-modal-overlay">

          <div className="sme-modal sme-edit-modal">

            <div className="sme-modal-header">
              <div>
                <h2>Edit SME Information</h2>
                <p>Update the registered SME account details</p>
              </div>

              <button
                className="sme-modal-close"
                onClick={() => setEditing(null)}
                type="button"
              >
                ×
              </button>
            </div>

            <div className="sme-edit-grid">

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

/* =====================================================
   ADMIN REPORTS
===================================================== */

export function AdminReports() {

  const [reportType, setReportType] = useState('sme');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const generateReport = async () => {

    try {
      setLoading(true);
      setError('');

      const result = await api.adminReports();

      setData(result);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="page">

      <h1>Reports</h1>

      <p className="muted">
        Generate and review SME Digi administrative reports
      </p>


      {/* REPORT SELECTION */}

      <div className="card report-page-card report-controls">
        <h2>Generate Report</h2>

        <label className="field">

          <span>Report Type</span>

          <select
            value={reportType}
            onChange={(e) => {
              setReportType(e.target.value);
              setData(null);
            }}
          >

            <option value="sme">
              SME Registration Report
            </option>

            <option value="assessment">
              Assessment Summary Report
            </option>

          </select>

        </label>


        <button
          className="primary"
          onClick={generateReport}
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Report'}
        </button>

        {error && (
          <p className="error">
            {error}
          </p>
        )}

      </div>


      {/* SME REGISTRATION REPORT */}

      {data && reportType === 'sme' && (

        <div className="card report-page-card">

          <h2>SME Registration Report</h2>

          <p className="muted">
            Summary of registered SME accounts
          </p>


          <div className="report-summary">

            <div>
              <span>Total SMEs</span>
              <strong>{data.sme_summary.total}</strong>
            </div>

            <div>
              <span>Pending</span>
              <strong>{data.sme_summary.pending}</strong>
            </div>

            <div>
              <span>Approved</span>
              <strong>{data.sme_summary.approved}</strong>
            </div>

            <div>
              <span>Rejected</span>
              <strong>{data.sme_summary.rejected}</strong>
            </div>

          </div>


          <table className="report-table">
            <thead>
              <tr>
                <th>SME</th>
                <th>Owner</th>
                <th>Industry</th>
                <th>Location</th>
                <th>Employees</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {data.smes.map((row) => (

                <tr key={row.id}>

                  <td>{row.sme_name}</td>

                  <td>{row.owner_name}</td>

                  <td>{row.business_type}</td>

                  <td>{row.location}</td>

                  <td>{row.employees}</td>

                  <td>
                    <span
                      className={`approval-badge approval-${row.approval_status?.toLowerCase()}`}
                    >
                      {row.approval_status}
                    </span>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>


          <button
            className="secondary report-print-btn"
            onClick={() => window.print()}
            style={{ marginTop: '20px' }}
          >
            Print / Save as PDF
          </button>

        </div>

      )}


      {/* ASSESSMENT SUMMARY REPORT */}

      {data && reportType === 'assessment' && (

        <div className="card report-page-card">
          <h2>Assessment Summary Report</h2>

          <p className="muted">
            Summary of assessments completed in SME Digi
          </p>


          <div className="report-summary">

            <div>
              <span>Total Assessments</span>
              <strong>{data.total_assessments}</strong>
            </div>

          </div>


          <table className="report-table">
            <thead>
              <tr>
                <th>Assessment Type</th>
                <th>Total Completed</th>
              </tr>
            </thead>

            <tbody>

              {data.assessment_summary.map(
                (row, index) => (

                  <tr key={index}>
                    <td>{row.assessment_type}</td>
                    <td>{row.total}</td>
                  </tr>

                )
              )}

            </tbody>

          </table>


          <button
            className="secondary report-print-btn" onClick={() => window.print()}
            style={{ marginTop: '20px' }}
          >
            Print / Save as PDF
          </button>

        </div>

      )}

    </div>
  );
}
/* =====================================================
   ADMIN ANNOUNCEMENTS
===================================================== */

export function AdminAnnouncements() {

  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  /* Form state */
  const [title,   setTitle]   = useState('');
  const [message, setMessage] = useState('');
  const [saving,  setSaving]  = useState(false);
  const [formErr, setFormErr] = useState('');

  /* Editing state */
  const [editing, setEditing] = useState(null); // null or announcement object


  /* ----------------------------------------
     LOAD
  ---------------------------------------- */

  const load = async () => {
    try {
      const data = await api.getAnnouncements();
      setItems(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => { load(); }, []);


  /* ----------------------------------------
     CREATE
  ---------------------------------------- */

  const handleCreate = async (e) => {
    e.preventDefault();
    setFormErr('');

    if (!title.trim() || !message.trim()) {
      setFormErr('Title and message are required.');
      return;
    }

    try {
      setSaving(true);
      await api.createAnnouncement({ title: title.trim(), message: message.trim() });
      setTitle('');
      setMessage('');
      await load();
    } catch (err) {
      setFormErr(err.message);
    } finally {
      setSaving(false);
    }
  };


  /* ----------------------------------------
     SAVE EDIT
  ---------------------------------------- */

  const handleSaveEdit = async () => {
    setFormErr('');

    if (!editing.title.trim() || !editing.message.trim()) {
      setFormErr('Title and message are required.');
      return;
    }

    try {
      setSaving(true);
      await api.updateAnnouncement({
        id:      editing.id,
        title:   editing.title.trim(),
        message: editing.message.trim()
      });
      setEditing(null);
      await load();
    } catch (err) {
      setFormErr(err.message);
    } finally {
      setSaving(false);
    }
  };


  /* ----------------------------------------
     DELETE
  ---------------------------------------- */

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this announcement?')) return;
    try {
      await api.deleteAnnouncement(id);
      await load();
    } catch (err) {
      setError(err.message);
    }
  };


  /* ----------------------------------------
     RENDER
  ---------------------------------------- */

  return (
    <div className="page">

      <h1>Announcements</h1>

      <p className="muted">
        Post announcements that are visible to all SME users.
      </p>

      {error && <p className="error">{error}</p>}


      {/* CREATE FORM */}

      <div className="card ann-form-card">

        <h2>New Announcement</h2>

        <form onSubmit={handleCreate}>

          <label className="field">
            <span>Title</span>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Announcement title"
            />
          </label>

          <label className="field">
            <span>Message</span>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Announcement message..."
            />
          </label>

          {formErr && <p className="error">{formErr}</p>}

          <button
            className="primary"
            type="submit"
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Post Announcement'}
          </button>

        </form>

      </div>


      {/* ANNOUNCEMENT LIST */}

      {items.length === 0 && !error && (
        <p className="muted">No announcements yet.</p>
      )}

      {items.map((item) => (

        <div className="ann-item" key={item.id}>

          {editing && editing.id === item.id ? (

            /* EDIT FORM INLINE */

            <div className="ann-edit-form">

              <label className="field">
                <span>Title</span>
                <input
                  type="text"
                  value={editing.title}
                  onChange={(e) =>
                    setEditing({ ...editing, title: e.target.value })
                  }
                />
              </label>

              <label className="field">
                <span>Message</span>
                <textarea
                  rows={3}
                  value={editing.message}
                  onChange={(e) =>
                    setEditing({ ...editing, message: e.target.value })
                  }
                />
              </label>

              {formErr && <p className="error">{formErr}</p>}

              <div style={{ display: 'flex', gap: '10px' }}>

                <button
                  className="primary"
                  onClick={handleSaveEdit}
                  disabled={saving}
                >
                  {saving ? 'Saving...' : 'Save'}
                </button>

                <button
                  className="secondary"
                  onClick={() => { setEditing(null); setFormErr(''); }}
                >
                  Cancel
                </button>

              </div>

            </div>

          ) : (

            /* READ VIEW */

            <>
              <div className="ann-item-header">

                <h3>{item.title}</h3>

                <span className="muted ann-date">
                  {new Date(item.created_at).toLocaleString()}
                </span>

              </div>

              <p className="ann-message">{item.message}</p>

              <div className="ann-actions">

                <button
                  className="secondary"
                  onClick={() => {
                    setEditing({ ...item });
                    setFormErr('');
                  }}
                >
                  Edit
                </button>

                <button
                  className="danger"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>

              </div>

            </>

          )}

        </div>

      ))}

    </div>
  );
}
