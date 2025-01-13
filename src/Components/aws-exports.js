import { Amplify } from 'aws-amplify';

Amplify.configure({
  Auth: {
    region: "us-west-2", // Replace with your AWS region
    userPoolId: "us-west-2_bNjNDak9q", // Replace with your Cognito User Pool ID
    userPoolWebClientId: "2b3drilgi6vb60andgj7q1cun4", // Replace with your App Client ID
    mandatorySignIn: false, // Set to true if you require users to be signed in before accessing the app
  },
});
