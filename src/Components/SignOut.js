import React, { useState } from "react";
import { signOut } from "aws-amplify/auth";
import { useNavigate } from "react-router-dom";
import ChangePassword from "./ChangePassword";
import DashBoard from "./DashBoard";
import './signOut.css';
// import FileUpload from "./FileUpload";

const SignOut = ({ signInData }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      alert("Signout successful!");
      navigate("/");
    } catch (error) {
      alert(`Signout failed: ${error.message}`);
    }
  };

  return (
    <div className="signout-container">
      <h2>Welcome</h2>
      <p>You are signed in. Use the buttons below to sign out or update your password.</p>
      
      <button onClick={handleSignOut} className="btn signout-btn">
        Sign Out
      </button>
      <button onClick={() => navigate('/changepassword')} className="btn signout-btn">
        Update Password
      </button>

      <DashBoard signInData={signInData} />
      {/* <FileUpload /> */}
      {/* {isUpdating && <ChangePassword />} */}
    </div>
  );
};

export default SignOut;
