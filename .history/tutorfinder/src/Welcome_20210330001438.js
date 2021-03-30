import React from "react";
import "./App.css";
import "./Welcome.css"
import foto from "./assets/bg.png" 
import Search from "./Search";
import Login from "./Login";

class Welcome extends React.Component {
  
  render(){

  return (
    <div className="background">


 <Search/>
 {/* <Login/> */}
  
    </div>
  );
}
}

export default Welcome;
