import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updatePassword } from "aws-amplify/auth";
import "./changePassword.css";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleUpdatePassword = async () => {
    try {
      await updatePassword({ oldPassword, newPassword });
      setMessage("Password updated successfully.");
    } catch (error) {
      setMessage(`Error updating password: ${error.message}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleUpdatePassword();
  };

  return (
    <div className="change-password-container">
      <h2>Update Password</h2>
      <p>{message}</p>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter old password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit">Update Password</button>
      </form>
    </div>
  );
};

export default ChangePassword;
