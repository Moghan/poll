import React from 'react';
import logo from './logo.svg';
import './App.css';
//import AWS from 'aws-sdk';
declare var gapi : any;

let auth2;

interface Window {
  onGlobalSignIn: any;
}
const App: React.FC = () => {
  
  const onGlobalSignIn = (googleUser: any) => {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }
  
  //@ts-ignore
  window.onGlobalSignIn = onGlobalSignIn;
    
  const init = React.useEffect(() => {
    gapi.load('auth2', () => {
      auth2 = gapi.auth2.init({
        client_id: '418574357913-ou3e20sjiip9ne4ilt0msp9khledhph2.apps.googleusercontent.com',
      })
    })
  });

  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Initial <code>GREEN</code> deploy.
        </p>
        <div className="g-signin2" data-onsuccess="onGlobalSignIn"></div>
        
        <button onClick={signOut}>Sign out</button>
      </header>
    </div>
  );
}

export default App;
