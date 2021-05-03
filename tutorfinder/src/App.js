import React from 'react';
import Navbar from './components/Navbar';
import TutorInfo from './components/TutorInfo'
import './App.css';
import Home from './Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import BulletinBoard from './BulletinBoard';
import SignupPage from "./SignupPage";
import { Route, BrowserRouter, Switch } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
          integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
          crossOrigin="anonymous"
        />
      </head>
      <BrowserRouter>
        <Switch>

          <Route path="/home">
            <Home></Home>
          </Route>
          <Route path="/signup">
            <SignupPage></SignupPage>
          </Route>
          <Route path="/tutorInfo/:tid">
            <Navbar fixed="top" />
            <TutorInfo />
          </Route>
          <Route path="/bulletin">
            <BulletinBoard></BulletinBoard>
          </Route>
          <Route path="/">
            <Home />
          </Route>

        </Switch>
      </BrowserRouter>

    </div>
  );
}



export default App;
