import React from 'react';
import { Amplify } from 'aws-amplify';

const FederatedLogin = () => {

    const handleFederatedLogin = ()=>{
        
    }

  return (
    <div>
        <h1>Login with Social Provider</h1> 
        <button onClick={()=> handleFederatedLogin("Google")}></button>
        <button onClick={()=> handleFederatedLogin("Facebook")}></button>
        <button onClick={()=> handleFederatedLogin("LoginWithAmazon")}></button>
    </div>
  )
};


export default FederatedLogin
