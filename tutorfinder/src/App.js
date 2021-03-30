import React from 'react';
import Navbar from './components/Navbar';
import TutorInfo from './components/TutorInfo'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
        <Navbar fixed="top" />
        <TutorInfo />
    </div>
  );
}

export default App;
