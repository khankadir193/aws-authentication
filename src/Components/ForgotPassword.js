import React, { useState } from 'react';
import { resetPassword, confirmResetPassword } from 'aws-amplify/auth';
import './forgotpassword.css';

const ForgotPassword = () => {
  const [username, setUsername] = useState('');
  const [oldPassword, setOldPassword] = useState(''); // Old password input
  const [newPassword, setNewPassword] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [step, setStep] = useState('ENTER_USERNAME'); // Steps: ENTER_USERNAME, ENTER_CODE, DONE
  const [message, setMessage] = useState('');

  // Handle password reset initiation
  const handleResetPassword = async () => {
    if (!username) {
      setMessage('Username is required');
      return;
    }
    try {
      const output = await resetPassword({ username });
      handleResetPasswordNextSteps(output);
    } catch (error) {
      console.error('Error during reset password:', error);
      if (error.code === 'LimitExceededException') {
        setMessage('You have exceeded the maximum number of password reset attempts. Please try again later.');
      } else {
        setMessage('Failed to initiate password reset.');
      }
    }
  };

  // Handle the next steps based on AWS Amplify response
  const handleResetPasswordNextSteps = (output) => {
    const { nextStep } = output;
    switch (nextStep.resetPasswordStep) {
      case 'CONFIRM_RESET_PASSWORD_WITH_CODE':
        setMessage(
          `Confirmation code sent via ${nextStep.codeDeliveryDetails.deliveryMedium}`
        );
        setStep('ENTER_CODE');
        break;
      case 'DONE':
        setMessage('Successfully reset password.');
        setStep('DONE');
        break;
      default:
        setMessage('Unexpected step. Please try again.');
    }
  };

  // Confirm the reset password with the provided code, old password, and new password
  const handleConfirmResetPassword = async () => {
    if (!username) {
      setMessage('Username is required to confirm the password reset');
      return;
    }
    if (!confirmationCode || !newPassword || !oldPassword) {
      setMessage('All fields (Confirmation Code, Old Password, New Password) are required');
      return;
    }

    try {
      await confirmResetPassword({username, confirmationCode, oldPassword, newPassword});
      setMessage('Password successfully reset.');
      setStep('DONE');
    } catch (error) {
      console.error('Error during confirm reset password:', error);
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      {step === 'ENTER_USERNAME' && (
        <div className="user-name">
          <label>Enter your username:</label>
          <input
            type="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <button onClick={handleResetPassword}>Reset Password</button>
        </div>
      )}

      {step === 'ENTER_CODE' && (
        <div className="confirmation-code">
          <label>Enter the confirmation code:</label>
          <input
            type="text"
            value={confirmationCode}
            onChange={(e) => setConfirmationCode(e.target.value)}
            placeholder="Confirmation Code"
          />

          <label>Enter your old password:</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder="Old Password"
          />

          <label>Enter your new password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
          />
          <button onClick={handleConfirmResetPassword}>Confirm Reset</button>
        </div>
      )}

      {step === 'DONE' && <p>Password reset successfully. You can now log in.</p>}

      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPassword;
