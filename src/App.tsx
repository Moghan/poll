import React from 'react';
import logo from './logo.svg';
import './App.css';
import AWS from 'aws-sdk';
declare var gapi : any;

const App: React.FC = () => {
  const init = React.useEffect(() => {
    gapi.signin2.render('g-signin2', {
      'scope': 'https://www.googleapis.com/auth/plus.login',
      'onsuccess': onSignIn
    });  
  });

  function onSignIn(googleUser: any) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }
  
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
        <div className="g-signin2" data-onsuccess="onSignIn"></div>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        
        <a href="#" onClick={signOut}>Sign out</a>
      </header>
    </div>
  );
}

export default App;
