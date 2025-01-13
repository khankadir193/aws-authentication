import React, { useEffect } from "react";
// import { Auth } from "aws-amplify";
import { fetchAuthSession, signIn } from "aws-amplify/auth";


const SignInWithGoogle = () => {
  useEffect(() => {
    // Load Google client script if not already loaded
    if (!window.google?.accounts) {
      loadGoogleScript();
    }
  }, []);

  // Load the Google API script dynamically
  const loadGoogleScript = () => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = initializeGoogleSignIn;
    document.body.appendChild(script);
  };

  // Initialize the Google Sign-In button
  const initializeGoogleSignIn = () => {
    if (window.google?.accounts) {
      window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID, // Ensure the client ID is stored in environment variables
        callback: handleGoogleCallback,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("googleSignInButton"),
        { theme: "outline", size: "large" }
      );
    }
  };

  // Handle the callback from Google Sign-In
  const handleGoogleCallback = async (response) => {
    try {
      const googleToken = response.credential;

      // Use Auth.federatedSignIn for federated login
      await signIn("google", {
        token: googleToken,
      });

      // Fetch the current session to verify the login
      const session = await fetchAuthSession();
      console.log("Auth Session:", session);
    } catch (error) {
      console.error("Error during Google Sign-In:", error);
    }
  };

  return (
    <div>
      <div id="googleSignInButton"></div>
    </div>
  );
};

export default SignInWithGoogle;
//aws authentication
//https://docs.amplify.aws/gen1/javascript/build-a-backend/graphqlapi/customize-authorization-rules/#using-amplify-graphql-client
