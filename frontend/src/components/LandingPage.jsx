import React from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <div className="landing-container">

        <section className="landing-intro">
          <img
            src="/sme-digi-logo.png"
            alt="SME Digi Logo"
            className="landing-logo"
          />

          <h1 className="landing-brand">
            SME <span>Digi</span>
          </h1>

          <h2>
            Digital Readiness Assessment &amp;
            <br />
            SME Support System
          </h2>

          <div className="landing-line"></div>

          <p className="landing-description">
            A web-based decision support platform designed to help
            Sri Lankan SMEs assess their digital readiness, identify
            digital adoption barriers, evaluate business performance,
            and receive customized recommendations for digital
            improvement.
          </p>

          <div className="landing-tagline">
            <span>Assess</span>
            <b>•</b>
            <span>Understand</span>
            <b>•</b>
            <span>Improve</span>
          </div>
        </section>

        <section className="landing-access">

          <div className="landing-heading">
            <h1>Welcome to SME Digi</h1>
            <p>Select how you would like to continue.</p>
          </div>

          <div className="role-cards">

            <div className="role-card sme-role-card">
              <div className="role-icon">👥</div>

              <h2>SME User</h2>

              <p>
                Assess your business, understand your digital readiness
                and receive customized recommendations.
              </p>

              <button
                className="role-button sme-login-button"
                onClick={() => navigate("/login")}
              >
                SME Login
              </button>

              <button
                className="role-button sme-register-button"
                onClick={() => navigate("/register")}
              >
                SME Registration
              </button>
            </div>

            <div className="role-card admin-role-card">
              <div className="role-icon">🛡️</div>

              <h2>Administrator</h2>

              <p>
                Monitor registered SMEs and review assessment results
                through the administration portal.
              </p>

              <button
                className="role-button admin-login-button"
                onClick={() => navigate("/admin/login")}
              >
                Admin Login
              </button>

              <button
                className="role-button admin-register-button"
                onClick={() => navigate("/admin/register")}
              >
                Admin Registration
              </button>
            </div>

          </div>

          <div className="landing-bottom-text">
            Supporting the Digital Transformation of Sri Lankan SMEs
          </div>

        </section>

      </div>
    </div>
  );
}