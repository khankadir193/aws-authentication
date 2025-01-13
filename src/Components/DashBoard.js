import React from "react";
import "./dashboard.css";

const DashBoard = ({ signInData }) => {
  const { email, password, token } = signInData;

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-heading">Dashboard</h2>
      <div className="dashboard-info">
        <p>
          <strong>Email:</strong> {email}
        </p>
        <p>
          <strong>Password:</strong> {password}
        </p>
        <p>
          <strong>Token:</strong> {token}
        </p>
      </div>
    </div>
  );
};

export default DashBoard;
