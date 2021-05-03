import React from "react";
import "./App.css";
import "./Welcome.css"
import foto from "./assets/bg.png" 
import Search from "./Search";
import Login from "./Login";
import Signup from "./Signup";

class Welcome extends React.Component {
  
  render(){

  return (
    <div className="background">


 {/* <Search/> */}
 {/* <Login/> */}
 <Signup/>
  
    </div>
  );
}
}

export default Welcome;
