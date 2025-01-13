import React, { useState } from "react";
import "./signinStyle.css";
import { fetchAuthSession, signIn } from "aws-amplify/auth";
import { Amplify } from "aws-amplify";
import SignOut from "./SignOut";
import { useNavigate } from "react-router-dom";
import FederatedLogin from "./FederatedLogin";
import SignInWithGoogle from "./SignWithGoogle";

// import {Auth,Amplify} from "aws-amplify";

const SignIn = ({ setIsAuthenticated, setSignInData }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigned, setIsSigned] = useState(false);
  const [federatedLogin, isFederatedLogin] = useState(false);


  // Amplify.configure({
  //   Auth: {
  //     Cognito: {
  //       region: "us-west-2",
  //       userPoolId: "us-west-2_bNjNDak9q",
  //       userPoolClientId: "2b3drilgi6vb60andgj7q1cun4",
  //       signUpVerificationMethod: "code",
  //     },
  //   },
  // });

  const handleFederatedLogin = (event) => {
    isFederatedLogin(true);
    console.log("event.target.value", event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Attempting to sign in with:", { email, password });

    if (!email || !password) {
      console.warn("Email and password are required to sign in.");
      alert("Please enter both email and password.");
      return;
    }

    try {
      const user = await signIn({ username: email, password: password });
      //getting token
      const session = await fetchAuthSession();
      const token = session.tokens.idToken.toString();
      console.log("id token-:-", token);
      console.log("access token-:-", session.tokens.accessToken);
      // ----
      console.log("Sign-in successful:", user);
      setIsAuthenticated(true);
      setSignInData({ email, password, token });
      setIsSigned(true);
      navigate("/signout");
      alert("Sign-in successful!");
      // return <SignOut />
    } catch (err) {
      console.error("Error during sign-in:", err.message);
      setIsSigned(true);
      alert(`Sign-in failed: ${err.message}`);
    }
  };

  const handleReset = () => {
    navigate("/changepassword");
    console.log("handle Reset click...");
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <p onClick={() => navigate("/forgotpassword")}>Forget Password?</p>
        <button>SignIn</button>
      </form>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <button
          onClick={handleReset}
          style={{ marginTop: "1vw", position: "relative", zIndex: "1" }}
        >
          Reset
        </button>
        <button
          style={{ marginTop: "2vw", position: "relative", zIndex: "1" }}
          onClick={handleFederatedLogin}
        >
          Login another account
        </button>
      </div>
      {federatedLogin && <SignInWithGoogle />}
    </div>
  );
};

export default SignIn;
