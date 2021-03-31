import React from 'react';
import Navbar from './components/Navbar';
import TutorInfo from './components/TutorInfo'
import './App.css';
import Home from './Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import BulletinBoard from './BulletinBoard';
import Nav from './Nav.js';
import SignupPage from "./SignupPage";

function App() {
  return (
    <div className="App">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
          integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
          crossorigin="anonymous"
        />
      </head>
      {/* <Home></Home> */}
      {/* <TutorInfo></TutorInfo> */}
      <SignupPage></SignupPage>
        {/* <Navbar fixed="top" />
        <TutorInfo /> */}
        {/* <BulletinBoard></BulletinBoard> */}
        
    </div>
  );
}



export default App;
