import React from 'react';
import Applogo from './assets/Applogo.png';
export function SignInPrompt({onClick}) {
  return (
    <main>
      <h3 style={{ textAlign: 'center' }}>
        NEAR - TO-DO LIST DAPP
      </h3>
      <img src={Applogo} style={{maxWidth:"350px", display:"flex", margin: "auto"}}/>
      <br/>
      <p style={{ textAlign: 'center' }}>
        <button onClick={onClick}>Sign in with NEAR Wallet</button>
      </p>
    </main>
  );
}

export function SignOutButton({accountId, onClick}) {
  const logout_btn_syle = {
    position: "fixed",
    top: "20px",
    right: "20px"
  };
  return (
    <button style={logout_btn_syle} onClick={onClick}>
      Sign out {accountId}
    </button>
  );
}