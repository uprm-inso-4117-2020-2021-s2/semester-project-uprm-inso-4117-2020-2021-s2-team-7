import React from 'react';
import Navbar from './components/Navbar';
import TutorInfo from './components/TutorInfo'
import './App.css';
import Home from './Home';
import 'bootstrap/dist/css/bootstrap.min.css';

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
        <Navbar fixed="top" />
        <TutorInfo />
    </div>
  );
}

export default App;
