import React, { useState } from 'react';

import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Navigate,
  useNavigate,
  useLocation
} from 'react-router-dom';

import {
  SMERegister,
  SMELogin,
  AdminLogin
} from './components/AuthPages.jsx';

import AssessmentPage from './components/AssessmentPage.jsx';
import Dashboard from './components/Dashboard.jsx';
import Recommendations from './components/Recommendations.jsx';
import History from './components/History.jsx';
import Inventory from './components/Inventory.jsx';
import Sales from './components/Sales.jsx';
import Profile from './components/Profile.jsx';

import {
  AdminDashboard,
  SMEUsers,
  AdminResults
} from './components/AdminPages.jsx';

import { api } from './api/api.js';
import LandingPage from './components/LandingPage.jsx';

/* =========================================
   READ SAVED LOGIN
========================================= */

function safe(key) {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : null;
  } catch {
    return null;
  }
}


/* =========================================
   SIDEBAR
========================================= */

function Sidebar({ sme, admin, onLogout }) {
  return (
    <aside className="sidebar">

      {/* LOGO */}
      <div className="logo">
        <img
          src="/sme-digi-logo.png"
          alt="SME Digi"
        />

        <div>
          <b>SME Digi</b>
          <small>Decision Support Platform</small>
        </div>
      </div>


      {/* =========================
          SME USER MENU
      ========================= */}

      {sme && (
        <>
          <div className="nav-section">
            SME MENU
          </div>

          <NavLink
            className="nav-link"
            to="/dashboard"
          >
            Dashboard
          </NavLink>

          <NavLink
            className="nav-link"
            to="/readiness"
          >
            Digital Readiness
          </NavLink>

          <NavLink
            className="nav-link"
            to="/barriers"
          >
            Digital Barriers
          </NavLink>

          <NavLink
            className="nav-link"
            to="/performance"
          >
            Business Performance
          </NavLink>

          <NavLink
            className="nav-link"
            to="/recommendations"
          >
            Recommendations
          </NavLink>

          <NavLink
            className="nav-link"
            to="/history"
          >
            History
          </NavLink>

          <NavLink
            className="nav-link"
            to="/inventory"
          >
            Inventory
          </NavLink>

          <NavLink
            className="nav-link"
            to="/sales"
          >
            Sales
          </NavLink>

          <NavLink
            className="nav-link"
            to="/profile"
          >
            Profile
          </NavLink>
        </>
      )}


      {/* =========================
          ADMIN MENU
      ========================= */}

      {admin && (
        <>
          <div className="nav-section">
            ADMIN MENU
          </div>

          <NavLink
            className="nav-link"
            to="/admin-dashboard"
          >
            Admin Dashboard
          </NavLink>

          <NavLink
            className="nav-link"
            to="/admin/smes"
          >
            SME Management
          </NavLink>

          <NavLink
            className="nav-link"
            to="/admin/results"
          >
            Assessment Results
          </NavLink>
        </>
      )}


      {/* LOGOUT */}

      {(sme || admin) && (
        <button
          className="logout"
          onClick={onLogout}
        >
          Logout
        </button>
      )}


      {/* ACTIVE SME INFORMATION */}

      {sme && (
        <div className="who">
          Active SME
          <br />
          <b>{sme.sme_name}</b>
          <br />
          {sme.business_type}
        </div>
      )}


      {/* ACTIVE ADMIN INFORMATION */}

      {admin && (
        <div className="who">
          Administrator
          <br />
          <b>{admin.name}</b>
        </div>
      )}

    </aside>
  );
}


/* =========================================
   ACCESS RESTRICTED PAGE
========================================= */

function AccessRestricted({
  type,
  onLogout
}) {

  const navigate = useNavigate();

  const isAdminBlocked =
    type === 'admin';


  const logoutAndContinue = async () => {

    await onLogout(
      isAdminBlocked
        ? '/admin-login'
        : '/login'
    );

  };


  return (

    <div className="page access-page">

      <div className="access-card">

        <div className="access-icon">
          🔒
        </div>


        <h1>
          {isAdminBlocked
            ? 'Admin Access Only'
            : 'SME Access Only'}
        </h1>


        <p>

          {isAdminBlocked
            ? 'You are currently signed in as an SME user. Please log out from your SME account before accessing the Admin Portal.'
            : 'You are currently signed in as an Administrator. Please log out from your Admin account before accessing SME functions.'}

        </p>


        <div className="access-actions">

          <button
            className="access-back"
            onClick={() =>
              navigate(
                isAdminBlocked
                  ? '/'
                  : '/admin-dashboard'
              )
            }
          >
            {isAdminBlocked
              ? 'Back to SME Dashboard'
              : 'Back to Admin Dashboard'}
          </button>


          <button
            className="primary"
            onClick={logoutAndContinue}
          >
            {isAdminBlocked
              ? 'Logout & Go to Admin Login'
              : 'Logout & Go to SME Login'}
          </button>

        </div>

      </div>

    </div>
  );
}


/* =========================================
   SME GUARD
========================================= */

function SMEGuard({
  sme,
  admin,
  onLogout,
  children
}) {

  /* Correct SME logged in */

  if (sme) {
    return children;
  }


  /* Admin is logged in */

  if (admin) {

    return (
      <AccessRestricted
        type="sme"
        onLogout={onLogout}
      />
    );

  }


  /* Nobody logged in */

  return (
    <Navigate
      to="/login"
      replace
    />
  );
}


/* =========================================
   ADMIN GUARD
========================================= */

function AdminGuard({
  admin,
  sme,
  onLogout,
  children
}) {

  /* Correct Admin logged in */

  if (admin) {
    return children;
  }


  /* SME is logged in */

  if (sme) {

    return (
      <AccessRestricted
        type="admin"
        onLogout={onLogout}
      />
    );

  }


  /* Nobody logged in */

  return (
    <Navigate
      to="/admin-login"
      replace
    />
  );
}
function AppLayout({ sme, admin, onLogout, children }) {
  const location = useLocation();

  const publicPages = [
    '/',
    '/login',
    '/register',
    '/admin-login'
  ];

  const hideSidebar = publicPages.includes(
    location.pathname
  );

  return (
    <div
      className={
        hideSidebar
          ? 'app landing-app'
          : 'app'
      }
    >

      {!hideSidebar && (
        <Sidebar
          sme={sme}
          admin={admin}
          onLogout={onLogout}
        />
      )}

      <main
        className={
          hideSidebar
            ? 'landing-main'
            : 'main'
        }
      >
        {children}
      </main>

    </div>
  );
}

/* =========================================
   MAIN APP
========================================= */

export default function App() {

  const [sme, setSme] =
    useState(() => safe('activeSme'));

  const [admin, setAdmin] =
    useState(() => safe('adminUser'));


  /* =====================================
     LOGOUT
  ===================================== */

  const logout = async (
    redirectTo = '/'
  ) => {

    try {
      await api.logout();
    } catch {
      // Clear local login even if API logout fails
    }


    localStorage.removeItem(
      'activeSme'
    );

    localStorage.removeItem(
      'adminUser'
    );


    setSme(null);
    setAdmin(null);


    window.location.href =
      redirectTo;
  };


  return (

    <BrowserRouter>

      <AppLayout
        sme={sme}
        admin={admin}
        onLogout={() =>
          logout(admin ? '/admin-login' : '/')
        }
      >

        <Routes>
          <Route
            path="/"
            element={<LandingPage />}
          />

          {/* ==========================
                PUBLIC SME PAGES
            ========================== */}

          <Route
            path="/register"
            element={
              <SMERegister />
            }
          />


          <Route
            path="/login"
            element={
              <SMELogin
                onLogin={(x) => {

                  localStorage.removeItem(
                    'adminUser'
                  );

                  setSme(x);
                  setAdmin(null);

                }}
              />
            }
          />


          {/* ==========================
                SME PROTECTED PAGES
            ========================== */}



          <Route
            path="/dashboard"
            element={
              <SMEGuard
                sme={sme}
                admin={admin}
                onLogout={logout}
              >
                <Dashboard />
              </SMEGuard>
            }
          />

          <Route
            path="/readiness"
            element={
              <SMEGuard
                sme={sme}
                admin={admin}
                onLogout={logout}
              >
                <AssessmentPage type="Readiness" />
              </SMEGuard>
            }
          />


          <Route
            path="/barriers"
            element={
              <SMEGuard
                sme={sme}
                admin={admin}
                onLogout={logout}
              >
                <AssessmentPage
                  type="Barrier"
                />
              </SMEGuard>
            }
          />


          <Route
            path="/performance"
            element={
              <SMEGuard
                sme={sme}
                admin={admin}
                onLogout={logout}
              >
                <AssessmentPage
                  type="Performance"
                />
              </SMEGuard>
            }
          />


          <Route
            path="/recommendations"
            element={
              <SMEGuard
                sme={sme}
                admin={admin}
                onLogout={logout}
              >
                <Recommendations />
              </SMEGuard>
            }
          />


          <Route
            path="/history"
            element={
              <SMEGuard
                sme={sme}
                admin={admin}
                onLogout={logout}
              >
                <History />
              </SMEGuard>
            }
          />


          <Route
            path="/inventory"
            element={
              <SMEGuard
                sme={sme}
                admin={admin}
                onLogout={logout}
              >
                <Inventory />
              </SMEGuard>
            }
          />


          <Route
            path="/sales"
            element={
              <SMEGuard
                sme={sme}
                admin={admin}
                onLogout={logout}
              >
                <Sales />
              </SMEGuard>
            }
          />


          <Route
            path="/profile"
            element={
              <SMEGuard
                sme={sme}
                admin={admin}
                onLogout={logout}
              >
                <Profile />
              </SMEGuard>
            }
          />


          {/* ==========================
                PUBLIC ADMIN PAGES
            ========================== */}

          <Route
            path="/admin-login"
            element={
              sme
                ? (
                  <AccessRestricted
                    type="admin"
                    onLogout={logout}
                  />
                )
                : (
                  <AdminLogin
                    onLogin={(x) => {

                      localStorage.removeItem(
                        'activeSme'
                      );

                      setAdmin(x);
                      setSme(null);

                    }}
                  />
                )
            }
          />


          {/* ==========================
                ADMIN PROTECTED PAGES
            ========================== */}

          <Route
            path="/admin-dashboard"
            element={
              <AdminGuard
                admin={admin}
                sme={sme}
                onLogout={logout}
              >
                <AdminDashboard />
              </AdminGuard>
            }
          />


          <Route
            path="/admin/smes"
            element={
              <AdminGuard
                admin={admin}
                sme={sme}
                onLogout={logout}
              >
                <SMEUsers />
              </AdminGuard>
            }
          />


          <Route
            path="/admin/results"
            element={
              <AdminGuard
                admin={admin}
                sme={sme}
                onLogout={logout}
              >
                <AdminResults />
              </AdminGuard>
            }
          />


        </Routes>

      </AppLayout>

    </BrowserRouter>
  );
}