import "./App.css";
import React, { useState } from "react";
import SignIn from "./Components/SignIn";
import { Amplify } from "aws-amplify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignOut from "./Components/SignOut";
import ChangePassword from "./Components/ChangePassword";
import ForgotPassword from "./Components/ForgotPassword";
import ProtectedRoute from "./Components/ProtectedRoute";
import DashBoard from "./Components/DashBoard";

Amplify.configure({
  Auth: {
    Cognito: {
      region: "us-west-2",
      userPoolId: "us-west-2_bNjNDak9q",
      userPoolClientId: "2b3drilgi6vb60andgj7q1cun4",
      signUpVerificationMethod: "code",
    },
  },
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Replace with real auth logic
  const [signInData, setSignInData] = useState({}); // Replace with real auth logic

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <SignIn
                setIsAuthenticated={setIsAuthenticated}
                setSignInData={setSignInData}
              />
            }
          ></Route>
          <Route
            path="/Signout"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <SignOut signInData={signInData} />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
          <Route
            path="/changepassword"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <ChangePassword />
              </ProtectedRoute>
            }
          ></Route>
          {/* <Route path="/dashboard" element={<DashBoard  />}></Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
